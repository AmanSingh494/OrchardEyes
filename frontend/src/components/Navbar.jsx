import styled from 'styled-components'
import PropTypes from 'prop-types'
import LogoImg from '../assets/img/logo.png'
import { useNavigate } from 'react-router-dom'
import Auth from './Auth'
const NavbarContainer = styled.nav.withConfig({
  shouldForwardProp: (prop) => !['background'].includes(prop)
})`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 1rem 4rem;

  box-sizing: border-box;
  background-color: ${({ background }) => background || 'transparent'};
`

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.5rem;
  font-weight: bold;
`
const LogoImage = styled.img`
  height: 50px;
`
const NavLinks = styled.ul`
  display: flex;
  list-style: none;

  align-items: center;
`

const NavLink = styled.li`
  margin: 0 1rem;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

const Navbar = ({ background, isAuthenticated }) => {
  const navigate = useNavigate()
  return (
    <NavbarContainer background={background}>
      <Logo>
        <LogoImage src={LogoImg} alt='apple-orchard-logo' />
      </Logo>
      <NavLinks className='font-mid-bold'>
        <NavLink
          onClick={() => {
            navigate('/')
          }}
        >
          Home
        </NavLink>
        <NavLink
          onClick={() => {
            navigate('/models-report')
          }}
        >
          Models
        </NavLink>
        <NavLink
          onClick={() => {
            navigate('/about')
          }}
        >
          About
        </NavLink>
        <NavLink
          onClick={() => {
            navigate('/contact')
          }}
        >
          Contact
        </NavLink>
        <Auth isAuthenticated={isAuthenticated} />
      </NavLinks>
    </NavbarContainer>
  )
}

export default Navbar
Navbar.propTypes = {
  background: PropTypes.string.isRequired
}
