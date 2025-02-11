import { useState } from 'react'
import './App.css'
import { Routes, useLocation, Route } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import ProfilePage from './components/OwnerPage'

import OrchardManagement from './pages/FarmManagement'
import ModelsReport from './pages/ModelsReport'
import ConnectDrone from './components/connectDrone'
import ProtectedRoute from './components/ProtectedRoute'
import OrchardPage from './pages/OrchardPage'

function App() {
  return <AppContent />
}
function AppContent() {
  const location = useLocation()
  const { isAuthenticated } = useAuth0()
  const isOrchardRoute = location.pathname === '/orchard'
  return (
    <>
      <Navbar
        background={isOrchardRoute ? '#f4f4f4' : 'transparent'}
        isAuthenticated={isAuthenticated}
      />
      <div className='sm:mt-20'>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/ownerPage' element={<ProfilePage />} />

          <Route path='/farm-management' element={<OrchardManagement />} />

          <Route path='/models-report' element={<ModelsReport />} />
          <Route
            path='/connect'
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <ConnectDrone />
              </ProtectedRoute>
            }
          />
          <Route path='/orchard' element={<OrchardPage />} />
        </Routes>
      </div>
    </>
  )
}
export default App
