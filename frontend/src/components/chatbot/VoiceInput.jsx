import { useState, useEffect, useCallback } from 'react'
import SpeechRecognition, {
  useSpeechRecognition
} from 'react-speech-recognition'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import '../../styles/voiceInput.css'
const MicBtn = styled.span`
  position: relative;
`
const Pulse = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isListening'].includes(prop)
})`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid #007bff;
  animation: pulse 1.5s ease-out infinite;
  transition: all 0.2s;
`

const VoiceInput = ({ onTranscript, onLanguageDetected }) => {
  const [isListening, setIsListening] = useState(false)
  const [language, setLanguage] = useState('en-US')
  const { transcript, browserSupportsSpeechRecognition, resetTranscript } =
    useSpeechRecognition()
  // const [text,setText] = useState('')
  useEffect(() => {
    if (transcript) {
      onTranscript(transcript)
    }
  }, [transcript, onTranscript])
  const startListening = () => {
    SpeechRecognition.startListening({
      continuous: true,
      language
    })
  }
  const stopListening = () => {
    SpeechRecognition.stopListening().then(() => {
      resetTranscript()
    })
  }

  if (!browserSupportsSpeechRecognition) {
    return null
  }

  const handleStartStop = () => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
    setIsListening((prevState) => !prevState)
  }
  return (
    <>
      <MicBtn onClick={handleStartStop}>
        {isListening ? (
          <>
            <Pulse />
            <span
              style={{ display: 'flex', alignItems: 'center' }}
              className='material-symbols-outlined'
              onClick={stopListening}
            >
              mic
            </span>
          </>
        ) : (
          <span
            className='material-symbols-outlined'
            onClick={() => {
              startListening()
            }}
          >
            mic_off
          </span>
        )}
      </MicBtn>
    </>
  )
}
VoiceInput.propTypes = {
  onTranscript: PropTypes.func.isRequired,
  onLanguageDetected: PropTypes.func.isRequired
}
export default VoiceInput
