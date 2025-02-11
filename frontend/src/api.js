const API_BASE_URL = 'http://127.0.0.1:8000/api'
import { Client } from '@gradio/client'

const client = await Client.connect('4darsh-Dev/orchard_eyes-chatbot')

export const register = async (userData) => {
  console.log('userData : ')
  console.log(userData)
  const response = await fetch(`${API_BASE_URL}/register/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.detail || 'Registration failed')
  }
  return response.json()
}

export const login = async (credentials) => {
  const response = await fetch(`${API_BASE_URL}/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.detail || 'Login failed')
  }
  return response.json()
}

// You can also add a function to refresh the JWT token
export const refreshToken = async (refreshToken) => {
  const response = await fetch(`${API_BASE_URL}/login/refresh/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ refresh: refreshToken })
  })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.detail || 'Token refresh failed')
  }
  return response.json()
}

// Function to get chatbot response from server
export const getChatbotResponse = async (message) => {
  try {
    const response = await client.predict('/chat', {
      message: message
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.detail || 'Failed to get chatbot response')
    }

    return response.json()
  } catch (error) {
    console.error('Error fetching chatbot response:', error)
    throw error
  }
}
