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
      className={`fixed bottom-0 sm:top-0 left-0 h-auto sm:h-screen w-screen sm:w-40 sm:bg-[#ffffff] rounded-r-2xl z-50 text-gray-700 p-3 transition-transform duration-300 ease-in-out sm:border sm:border-[#e3e1e1] sm:pt-[15vh] sm:shadow`}
    >
      <nav className='flex-grow'>
        <ul className='flex flex-row sm:flex-col sm:items-start items-center justify-around border shadow sm:border-[0] rounded-xl bg-white mx-4 py-1'>
          <li className='flex items-center'>
            <a
              href='#'
              className='flex items-center p-2 hover:bg-green-100 rounded-md'
            >
              <Home size={22} />
              <span className='hidden sm:flex'>Home</span>
            </a>
          </li>
          <li>
            <a
              href='#'
              className='flex items-center p-2 bg-green-200 rounded-md'
            >
              <LayoutDashboard size={22} />
              <span className='hidden sm:flex'>Dashboard</span>
            </a>
          </li>
          <li>
            <a
              href='#'
              className='flex items-center p-2 hover:bg-green-100 rounded-md'
            >
              <User size={22} />
              <span className='hidden sm:flex'>Profile</span>
            </a>
          </li>
          <li>
            <a
              href='#'
              className='flex items-center p-2 hover:bg-green-100 rounded-md'
            >
              <Settings size={22} />
              <span className='hidden sm:flex'>Settings</span>
            </a>
          </li>
          <li>
            <a
              href='#'
              className='flex items-center p-2 hover:bg-green-100 rounded-md'
            >
              <HelpCircle size={22} />
              <span className='hidden sm:flex'>Help</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default SidebarLeft
