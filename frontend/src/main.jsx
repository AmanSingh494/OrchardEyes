import 'regenerator-runtime/runtime'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Auth0Provider } from '@auth0/auth0-react'

const redirectUrl = import.meta.env.VITE_REDIRECT_URL
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth0Provider
      domain='dev-h7oni1avnzc37fk7.us.auth0.com'
      clientId='BCYRUBfd9PLBjvn60NwTFKhsAf7dffr7'
      authorizationParams={{
        redirect_uri: redirectUrl
      }}
    >
      <App />
    </Auth0Provider>
  </StrictMode>
)
