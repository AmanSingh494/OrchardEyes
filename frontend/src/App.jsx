import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, useLocation, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import ProfilePage from './components/OwnerPage'

import OrchardManagement from './pages/FarmManagement'
import ModelsReport from './pages/ModelsReport'

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
        <Route path='/ownerPage' element={<ProfilePage />} />

        <Route path='/farm-management' element={<OrchardManagement />} />

        <Route path='/models-report' element={<ModelsReport />} />
      </Routes>
    </>
  )
}
export default App
