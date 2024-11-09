import { useState } from 'react'
import {
  Home,
  LayoutDashboard,
  User,
  Settings,
  HelpCircle,
  ChevronRight
} from 'lucide-react'
import logo from '../assets/img/logo.png'
const SidebarLeft = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className={`fixed top-0 left-0 h-screen w-64 bg-[#E2F0E2]  rounded-r-2xl z-50 text-gray-700 p-4 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-60'} border border-green-500`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='absolute -right-4 top-1/2 bg-green-500 text-white p-1 rounded-full shadow-lg'
      >
        <ChevronRight
          size={20}
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <div className='flex items-center mb-8'>
        <img src={logo} alt='orchard eyes logo' className='w-[15vw]' />
      </div>

      <nav className='flex-grow'>
        <ul className='space-y-2'>
          <li>
            <a
              href='#'
              className='flex items-center p-2 hover:bg-green-100 rounded-md'
            >
              <Home className='mr-3' size={20} />
              <span>Home</span>
            </a>
          </li>
          <li>
            <a
              href='#'
              className='flex items-center p-2 bg-green-200 rounded-md'
            >
              <LayoutDashboard className='mr-3' size={20} />
              <span>Dashboard</span>
            </a>
          </li>
          <li>
            <a
              href='#'
              className='flex items-center p-2 hover:bg-green-100 rounded-md'
            >
              <User className='mr-3' size={20} />
              <span>Profile</span>
            </a>
          </li>
          <li>
            <a
              href='#'
              className='flex items-center p-2 hover:bg-green-100 rounded-md'
            >
              <Settings className='mr-3' size={20} />
              <span>Settings</span>
            </a>
          </li>
          <li>
            <a
              href='#'
              className='flex items-center p-2 hover:bg-green-100 rounded-md'
            >
              <HelpCircle className='mr-3' size={20} />
              <span>Help</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default SidebarLeft
