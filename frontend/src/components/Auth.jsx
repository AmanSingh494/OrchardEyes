import { useAuth0 } from '@auth0/auth0-react'
import styled from 'styled-components'

const LoginBtn = styled.button`
  color: black;
  background-color: #e3e3e3;
  padding: 0.5rem 1rem;
  margin-left: 1rem;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: #9f9e9e;
  }
`

const RegisterBtn = styled.button`
  color: white;
  background-color: #7c0a0a;
  padding: 0.5rem 1rem;
  margin-left: 1rem;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    color:;
    background-color: red;
  }
`

const Auth = () => {
  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0()
  return isAuthenticated ? (
    <div className='flex items-center gap-3'>
      <RegisterBtn
        onClick={() => {
          logout({
            logoutParams: {
              returnTo: import.meta.env.VITE_REDIRECT_URL,
              clientId: 'BCYRUBfd9PLBjvn60NwTFKhsAf7dffr7'
            }
          })
        }}
      >
        Log Out
      </RegisterBtn>
      <img
        src={user.picture}
        alt={user.name}
        className='rounded-full h-[7vh]'
      />
    </div>
  ) : (
    <div>
      <RegisterBtn
        onClick={() => {
          loginWithRedirect({
            screen_hint: 'signup'
          })
        }}
      >
        Register
      </RegisterBtn>
      <LoginBtn
        onClick={() => {
          loginWithRedirect()
        }}
      >
        Login
      </LoginBtn>
    </div>
  )
}

export default Auth
