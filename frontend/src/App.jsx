import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, useLocation, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'

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
      <Routes>
        <Route path='/' element={<LandingPage />} />
      </Routes>
    </>
  )
}
export default App
