import landingPageBackground from '../assets/img/landing-page-background.png'
import styled, { createGlobalStyle } from 'styled-components'
import PreferedOrchs from '../components/PreferredOrchs'
import FooterSection from '../components/FooterSection'
import Chatbot from '../components/Chatbot'
const GlobalStyle = createGlobalStyle`
  * {
    /* Add your global styles here */
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: var(--font-tertiary);
  }
`
const MainContainer = styled.main``
const WelcomeContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 500px;
  padding: 0 10vw;
`
const WelcomeImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;

  /* Add a dark overlay */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5); /* Adjust the opacity as needed */
    z-index: 1;
  }
`
const WelcomeText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  width: 55vw;
`
const LandingPage = () => {
  return (
    <>
      <GlobalStyle />
      <MainContainer>
        <WelcomeContainer>
          <WelcomeImage src={landingPageBackground} />
          <WelcomeText>
            <h1 className='font-ex-large'>
              A <span className='text-highlight font-bold'>DRONE</span> POWERED
              SOLUTION FOR <span className='text-red-700'></span> ORCHARDS
            </h1>
          </WelcomeText>
        </WelcomeContainer>
        <Chatbot />
        <PreferedOrchs />
        <FooterSection />
      </MainContainer>
    </>
  )
}

export default LandingPage
