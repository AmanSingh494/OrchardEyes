
import streamlit as st
import torch
import torchvision.transforms as transforms
from PIL import Image
import os

# Change the import statement
from leaf_disease_predict import ResNet9, load_model, predict_image, CLASS_NAMES

# Set page config
st.set_page_config(page_title="Plant Disease Predictor", page_icon="🍃", layout="wide")

# Load the model
@st.cache_resource
def load_model_cached():
    model_path = '/home/kalie/work/projects/OrchardEyes/experiments/models/leaf_disease_res50_model_epoch_10.pth'
    model = load_model(model_path)
    return model

model = load_model_cached()

# Streamlit app
st.title("Plant Disease Predictor")

st.write("Upload an image of a plant leaf to predict if it has a disease.")

uploaded_file = st.file_uploader("Choose an image...", type=["jpg", "jpeg", "png"])

if uploaded_file is not None:
    image = Image.open(uploaded_file).convert('RGB')
    st.image(image, caption='Uploaded Image', use_column_width=True)
    
    if st.button('Predict'):
        # Save the uploaded file temporarily
        with open("temp_image.jpg", "wb") as f:
            f.write(uploaded_file.getbuffer())
        
        # Make prediction
        prediction = predict_image("temp_image.jpg", model)
        
        # Remove temporary file
        os.remove("temp_image.jpg")
        
        # Display result
        st.success(f"Prediction: {prediction}")
        
        # Display confidence scores
        with torch.no_grad():
            transform = transforms.Compose([
                transforms.Resize((256, 256)),
                transforms.ToTensor(),
            ])
            img_tensor = transform(image).unsqueeze(0)
            outputs = model(img_tensor)
            probabilities = torch.nn.functional.softmax(outputs[0], dim=0)
        
        # Display top 5 predictions
        top5_prob, top5_catid = torch.topk(probabilities, 5)
        st.write("Top 5 Predictions:")
        for i in range(top5_prob.size(0)):
            st.write(f"{CLASS_NAMES[top5_catid[i]]}: {top5_prob[i].item()*100:.2f}%")

st.write("## List of Detectable Plant Diseases")
st.write("This model can detect the following plant diseases:")
for disease in CLASS_NAMES:
    st.write(f"- {disease.replace('___', ' - ')}")