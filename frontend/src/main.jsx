import 'regenerator-runtime/runtime'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Auth0Provider } from '@auth0/auth0-react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth0Provider
      domain='dev-h7oni1avnzc37fk7.us.auth0.com'
      clientId='BCYRUBfd9PLBjvn60NwTFKhsAf7dffr7'
      authorizationParams={{
        redirect_uri: 'http://localhost:5173/'
      }}
    >
      <App />
    </Auth0Provider>
  </StrictMode>
)
