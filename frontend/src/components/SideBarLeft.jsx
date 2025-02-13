import { useState } from 'react'
import { Home, LayoutDashboard, HelpCircle, Zap } from 'lucide-react'
import logo from '../assets/img/logo.png'
import droneTabIcon from '../assets/img/drone-tab-icon.png'
import botTabIcon from '../assets/img/bot-tab-icon.png'
const SidebarLeft = ({ activeTab, setActiveTab }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div
      className={`fixed bottom-0 sm:top-0 left-0 h-auto sm:h-screen w-screen sm:w-40 sm:bg-[#ffffff] rounded-r-2xl z-50 text-gray-700 p-3 transition-transform duration-300 ease-in-out sm:border sm:border-[#e3e1e1] sm:pt-[15vh] sm:shadow`}
    >
      <nav className='flex-grow'>
        <ul className='flex flex-row sm:flex-col sm:items-start items-center justify-around border shadow sm:border-[0] rounded-xl bg-white mx-4 py-1'>
          <li className='flex items-center'>
            <span
              onClick={() => {
                setActiveTab('Home')
              }}
              className={`flex items-center p-2 rounded-md ${activeTab === 'Home' ? 'bg-green-200' : ''}`}
            >
              <Home size={22} />
              <span className='hidden sm:flex'>Home</span>
            </span>
          </li>
          <li>
            <span
              onClick={() => {
                setActiveTab('Dashboard')
              }}
              className={`flex items-center p-2 rounded-md ${activeTab === 'Dashboard' ? 'bg-green-200' : ''}`}
            >
              <LayoutDashboard size={22} />
              <span className='hidden sm:flex'>Dashboard</span>
            </span>
          </li>

          <li>
            <span
              onClick={() => {
                setActiveTab('Quick Actions')
              }}
              className={`flex items-center p-2 rounded-md ${activeTab === 'Quick Actions' ? 'bg-green-200' : ''}`}
            >
              <Zap size={22} />
              <span className='hidden sm:flex'>Settings</span>
            </span>
          </li>
          <li>
            <span
              onClick={() => {
                setActiveTab('Profile')
              }}
              className={`flex items-center p-2 rounded-md ${activeTab === 'Profile' ? 'bg-green-200' : ''}`}
            >
              <img
                src={droneTabIcon}
                alt='Drone Tab Icon'
                className='w-9 h-9'
              />
              <span className='hidden sm:flex'>Profile</span>
            </span>
          </li>
          <li>
            <span
              onClick={() => {
                setActiveTab('Orchard Ai')
              }}
              className={`flex items-center p-2 rounded-md ${activeTab === 'Orchard Ai' ? 'bg-green-200' : ''}`}
            >
              <img src={botTabIcon} alt='Bot Tab Icon' className='w-7 h-7' />
              <span className='hidden sm:flex'>Help</span>
            </span>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default SidebarLeft
