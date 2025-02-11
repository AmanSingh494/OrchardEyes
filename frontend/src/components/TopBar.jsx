import React from 'react'
import { Bell, User } from 'lucide-react'

const TopBar = () => {
  return (
    <div className='w-full bg-white'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='h-12 flex items-center justify-between'>
          {/* Left side - Notification Icon */}
          <div className='flex items-center'>
            <button className='p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100'>
              <Bell size={20} />
            </button>
          </div>

          {/* Center - Page Name */}
          <h1 className='text-lg font-semibold text-gray-900 absolute left-1/2 -translate-x-1/2'>
            Dashboard
          </h1>

          {/* Right side - Profile Icon */}
          <div className='flex items-center'>
            <button className='p-1 text-gray-600 hover:text-gray-900 rounded-full bg-gray-100 hover:bg-gray-200'>
              <User size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopBar
