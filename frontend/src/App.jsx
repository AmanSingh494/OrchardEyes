import { useState } from 'react'
import './App.css'
import { BrowserRouter, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}
function AppContent() {
  const location = useLocation()
  const isOrchardRoute = location.pathname === '/orchard'
  return (
    <>
      <Navbar background={isOrchardRoute ? '#f4f4f4' : 'transparent'} />
    </>
  )
}
export default App
