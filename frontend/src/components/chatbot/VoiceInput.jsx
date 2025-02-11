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
  z-index: -1000;
`

const VoiceInput = ({ onTranscript, onLanguageDetected }) => {
  const [isListening, setIsListening] = useState(false)
  // const [text,setText] = useState('')
  const startListening = () => {
    console.log('start listening')
    SpeechRecognition.startListening({ continuous: true, language: 'hi-IN' })
  }
  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition()

  if (!browserSupportsSpeechRecognition) {
    return null
  }

  const handleStartStop = () => {
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
              onClick={() => {
                console.log('stop listening')
                SpeechRecognition.stopListening
                console.log(transcript)
                onTranscript(transcript)
              }}
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
