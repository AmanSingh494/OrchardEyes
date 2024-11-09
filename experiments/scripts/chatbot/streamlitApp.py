

import streamlit as st
from langchain.prompts import PromptTemplate
from langchain_community.llms import CTransformers
from langchain.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import Pinecone as LangchainPinecone
import os
from dotenv import load_dotenv

from langchain.chains import RetrievalQA
import time
from pinecone import Pinecone
import requests
from pathlib import Path

# Load environment variables
load_dotenv()

# PINECONE_API_KEY = os.getenv('PINECONE_API_KEY')
PINECONE_API_KEY = '5fc36b10-f133-49bb-914b-8819eb4b903a'
index_name = "apple-chatbot"

# Download Hugging Face embeddings
def download_hf_embeddings(model_name: str = "sentence-transformers/all-MiniLM-L6-v2") -> HuggingFaceEmbeddings:
    """
    Download and initialize Hugging Face embeddings model
    
    Args:
        model_name (str): Name of the Hugging Face model to use for embeddings
        
    Returns:
        HuggingFaceEmbeddings: Initialized embeddings model
    """
    embeddings = HuggingFaceEmbeddings(
        model_name=model_name,
        model_kwargs={'device': 'cpu'},
        encode_kwargs={'normalize_embeddings': True}
    )
    return embeddings


# prompt template
prompt_template = """
Helpful Answer for Farmer:
Use the following pieces of information to answer the farmer's question about apple orchard management:

    Context: {context}
    Question: {question}

If you don't know the answer, say "I'm not sure, but I can try to find more information for you."
Only return the helpful answer below and nothing else.
Helpful Answer:
"""


# Initialize the chatbot components
@st.cache_resource
def initialize_chatbot(k, max_tokens, temp):
    embeddings = download_hf_embeddings()
    
    # Get the local model path
    model_path = "/home/kalie/work/projects/OrchardEyes/experiments/scripts/chatbot/models/Llama-3.2-1B-Instruct-Q6_K.gguf"
    
    if not model_path.exists():
        st.error("Model file not found. Please ensure the GGUF model is in the 'models' directory.")
        st.stop()
    
    # Initialize the model with local path
    llm = CTransformers(
        model=str(model_path),
        model_type="llama",
        config={
            'max_new_tokens': max_tokens,
            'temperature': temp,
            'context_length': 2048,
            'gpu_layers': 0,
            'threads': 4,
            'batch_size': 1,
            'top_k': 40,
            'top_p': 0.95,
            'stream': True,
        }
    )
    
    # Initialize pinecone
    pc = Pinecone(api_key=PINECONE_API_KEY)
    index = pc.Index(index_name)

    PROMPT = PromptTemplate(template=prompt_template, input_variables=["context", "question"])
    chain_type_kwargs = {"prompt": PROMPT}
    docsearch = LangchainPinecone(index, embeddings.embed_query, "text")
    qa = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=docsearch.as_retriever(search_kwargs={'k': k}),
        return_source_documents=True,
        chain_type_kwargs=chain_type_kwargs
    )
    return qa

# Set page configuration
st.set_page_config(page_title="Apple Orchard Chatbot", page_icon="🍎", layout="wide")

# Display welcome message and model status
st.title("🍎Apple Orchard RAG Chatbot")

# Check if model exists
model_path = "/home/kalie/work/projects/OrchardEyes/experiments/scripts/chatbot/models/Llama-3.2-1B-Instruct-Q6_K.gguf"
if not model_path.exists():
    st.warning("Model not found locally. Please place your GGUF model in the 'models' directory.")
    st.info("The model file should be named 'llama-3.2-1b-instruct.gguf'")
    st.stop()

# Parameters section
st.sidebar.header("Parameters")
k_value = st.sidebar.slider("Number of relevant documents (k)", min_value=1, max_value=3, value=2)
max_new_tokens = st.sidebar.slider("Max new tokens", min_value=64, max_value=1024, value=512)
temperature = st.sidebar.slider("Temperature", min_value=0.1, max_value=1.0, value=0.8, step=0.1)

# Initialize session state
if 'chat_history' not in st.session_state:
    st.session_state.chat_history = []

# Initialize chatbot
try:
    qa = initialize_chatbot(k_value, max_new_tokens, temperature)
except Exception as e:
    st.error(f"Error initializing chatbot: {str(e)}")
    st.stop()

# Chat interface
user_input = st.text_input("Ask your question:")
if st.button("Send", key="send"):
    if user_input:
        with st.spinner("Thinking..."):
            try:
                result = qa({"query": user_input})
                response = result["result"]
                st.session_state.chat_history.append(("You", user_input))
                st.session_state.chat_history.append(("Bot", response))
            except Exception as e:
                st.error(f"Error generating response: {str(e)}")

# Display chat history
st.subheader("Chat History")
for role, message in st.session_state.chat_history:
    if role == "You":
        st.markdown(f"**You:** {message}")
    else:
        st.markdown(f"**Bot:** {message}")


