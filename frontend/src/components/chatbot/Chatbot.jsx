import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import VoiceInput from './VoiceInput'
import ChatBotImg from '../../assets/img/chatbot-img.png'
import { getPrediction } from '../../utils/gradioConfig'
import { SyncLoader } from 'react-spinners'
import { Mic, MicOff } from 'lucide-react'
const Main = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isOpened'].includes(prop)
})`
  z-index: ${({ isOpened }) => (isOpened ? 50 : -100)};
`
const ChatbotContainer = styled.div`
  padding: 10px;
  width: 300px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const MessagesContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
  flex-direction: column;
  align-items: flex-end;
  height: 40vh;
  overflow-y: scroll;
  letter-spacing: 1px;
`

const Message = styled.div.withConfig({
  shouldForwardProp: (prop) => !['sender'].includes(prop)
})`
  display: inline-block;
  padding: 5px;
  margin: 5px 0;
  align-self: ${({ sender }) =>
    sender === 'user' ? 'flex-end' : 'flex-start'};
  text-align: ${({ sender }) => (sender === 'user' ? 'right' : 'left')};
  background-color: ${({ sender }) =>
    sender === 'user' ? '#e0f7fa' : '#f1f8e9'};
  border-radius: 10px;
`

const Button = styled.button`
  padding: 5px;
`

const Chatbot = () => {
  const [isOpened, setIsOpened] = useState(true)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [detectedLanguage, setDetectedLanguage] = useState('')
  const [gettingPrediction, setGettingPrediction] = useState(false)
  const [windowHeight, setWindowHeight] = useState(window.innerHeight)
  const textAreaRef = useRef(null)
  const handleSend = async () => {
    if (input.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: input, sender: 'user' }
      ])
      setInput('')
      await botResponse()
    }
  }
  const botResponse = async () => {
    try {
      setGettingPrediction(true)
      const response = await getPrediction(input)
      setGettingPrediction(false)
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: response, sender: 'bot' }
      ])
    } catch (error) {
      console.error('Error fetching chatbot response:', error)
      setGettingPrediction(false)
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: 'Sorry, something went wrong. Please try again.',
          sender: 'bot'
        }
      ])
    }
  }
  //to submit input on enter
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleSend()
    }
  }

  //voice input function
  const handleVoiceInput = (transcript) => {
    setInput(transcript)
    // You can also automatically send the transcript to your AI chatbot here
  }
  const handleLanguageDetected = (language) => {
    console.log('Detected language:', language)
    setDetectedLanguage(language)
    // You might want to update your UI or inform your chatbot about the detected language
  }
  // Function to adjust the height of the textarea
  const adjustTextareaHeight = () => {
    const textarea = textAreaRef.current
    if (textarea) {
      // Reset the height to auto to calculate the new height
      textarea.style.height = 'auto'
      // Set the height to the scrollHeight (content height)
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }
  useEffect(() => {
    adjustTextareaHeight()
  }, [input])
  useEffect(() => {
    console.log(window.innerHeight)
  }, [])
  return (
    <>
      <Main
        className='sm:fixed right-0 bottom-0 sm:bottom-24 sm:right-4 flex flex-col gap-6 items-end transition-all duration-500'
        isOpened={isOpened}
      >
        {/* {isOpened && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"></div>
            )} */}
        <div
          className={`p-2 w-[100vw] h-[${windowHeight}px] sm:w-72 sm:h-96 flex flex-col justify-between bg-white ${isOpened ? 'scale-100' : 'scale-0'} transition-transform duration-500 rounded-xl sm:shadow-xl`}
        >
          <div className='flex bg-red-800 h-10 rounded-md flex items-center px-2 justify-between'>
            <h3 className='text-white text-lg'>Orchard AI</h3>
            <i className='fa-solid fa-ellipsis text-white'></i>
          </div>
          <MessagesContainer className='custom-scrollbar text-sm'>
            {messages.map((msg, index) => (
              <Message key={index} sender={msg.sender}>
                {msg.text}
              </Message>
            ))}
            <Message sender='bot'>
              <SyncLoader
                color='#7c0a0a'
                size={10}
                speedMultiplier={0.5}
                loading={gettingPrediction}
              />
            </Message>
          </MessagesContainer>
          <div className='fixed bottom-0 left-0 right-0 bg-white p-4'>
            <div className='max-w-4xl mx-auto'>
              <div className='relative flex items-center space-x-2'>
                <textarea
                  className='w-full bg-gray-100 rounded-full py-3 px-6 pr-24 text-gray-700 
                     placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 
                     focus:border-transparent resize-none min-h-[42px] max-h-[200px] overflow-hidden'
                  rows={1}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder='Type a message...'
                  onInput={adjustTextareaHeight}
                  ref={textAreaRef}
                />

                <div className='absolute right-2 flex items-center space-x-2'>
                  <VoiceInput
                    onTranscript={handleVoiceInput}
                    onLanguageDetected={handleLanguageDetected}
                    className='p-2 hover:bg-gray-200 rounded-full transition-colors duration-200'
                  />
                  <Button
                    onClick={handleSend}
                    className='p-2 hover:bg-gray-200 rounded-full transition-colors duration-200'
                  >
                    <span className='material-symbols-outlined text-gray-600'>
                      send
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Main>
      <div
        className='hidden sm:flex w-16 h-16 bg-red-800 rounded-full items-center justify-center z-110 fixed bottom-5 right-5 cursor-pointer'
        onClick={() => {
          setIsOpened((prevIsOpened) => !prevIsOpened)
        }}
      >
        {!isOpened ? (
          <img src={ChatBotImg} alt='chatbot' className='h-12' />
        ) : (
          <i className='fa-solid fa-x text-lg text-white'></i>
        )}
      </div>
    </>
  )
}

export default Chatbot
