import React from 'react'
import { Footprints, Heart, Droplets, Moon, ArrowRight } from 'lucide-react'
import Card from './Card'

const FarmDashboard = () => {
  return (
    <div className='p-4 md:p-6 max-w-xl mx-auto'>
      <div className='grid grid-cols-2 gap-4'>
        {/* Farm Health Card */}
        <Card
          margin='mb-0'
          bgColor='bg-green-100'
          otherStyles='relative overflow-hidden'
        >
          <div className='w-full h-full'>
            <h3 className='text-sky-900 text-small mb-2'>Farm Health</h3>
            <p className='text-3xl font-semibold text-sky-900 mb-1'>95%</p>
            {/* <div className='absolute bottom-4 right-4 w-16 h-16 bg-sky-200 rounded-full flex items-center justify-center'>
              <Footprints className='text-sky-600' size={24} />
            </div> */}
          </div>
        </Card>

        {/* Crop Vitals Card */}
        <Card
          margin='mb-0'
          bgColor='bg-rose-100'
          otherStyles='relative overflow-hidden'
        >
          <div className='w-full h-full'>
            <h3 className='text-rose-900 font-medium mb-2'>Crop Vitals</h3>
            <p className='text-2xl font-semibold text-rose-900 mb-1'>Healthy</p>
            <div className='text-sm text-rose-700'>
              <p>Growth: 85%</p>
              <p>Yield: 92%</p>
            </div>
            {/* <div className='absolute bottom-4 right-4 w-16 h-16 bg-rose-200 rounded-full flex items-center justify-center'>
              <Heart className='text-rose-600' size={24} />
            </div> */}
          </div>
        </Card>

        {/* Irrigation Card */}
        <Card
          margin='mb-0'
          bgColor='bg-violet-100'
          otherStyles='relative overflow-hidden'
        >
          <div className='w-full h-full'>
            <h3 className='text-violet-900 font-medium mb-2'>Irrigation</h3>
            <p className='text-2xl font-semibold text-violet-900 mb-1'>
              4/6 Zones
            </p>
            <p className='text-sm text-violet-700'>Next: Zone 5 in 2h</p>
            <div className='absolute bottom-4 right-4 w-16 h-16 bg-violet-200 rounded-full flex items-center justify-center'>
              <Droplets className='text-violet-600' size={24} />
            </div>
          </div>
        </Card>

        {/* Weather Card */}
        <Card
          margin='mb-0'
          bgColor='bg-orange-100'
          otherStyles='relative overflow-hidden'
        >
          <div className='w-full h-full'>
            <h3 className='text-orange-900 font-medium mb-2'>Weather</h3>
            <p className='text-2xl font-semibold text-orange-900 mb-1'>28°C</p>
            <p className='text-sm text-orange-700'>Sunny • No Rain</p>
            <div className='absolute bottom-4 right-4 w-16 h-16 bg-orange-200 rounded-full flex items-center justify-center'>
              <Moon className='text-orange-600' size={24} />
            </div>
          </div>
        </Card>
      </div>

      {/* Today's Tasks Section */}
      <div className='mt-8'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-lg font-semibold'>Today&apos;s Tasks</h2>
          <button className='text-sky-500 text-sm'>See all</button>
        </div>

        <div className='space-y-3'>
          <div className='bg-white p-4 rounded-xl flex items-center justify-between shadow-sm'>
            <div className='flex items-center space-x-3'>
              <div className='w-8 h-8 bg-green-100 rounded-full flex items-center justify-center'>
                <div className='w-2 h-2 bg-green-500 rounded-full'></div>
              </div>
              <div>
                <p className='font-medium'>Check Irrigation System</p>
                <p className='text-sm text-gray-500'>Completed</p>
              </div>
            </div>
            <ArrowRight className='text-gray-400' size={20} />
          </div>

          <div className='bg-white p-4 rounded-xl flex items-center justify-between shadow-sm'>
            <div className='flex items-center space-x-3'>
              <div className='w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center'>
                <div className='w-2 h-2 bg-yellow-500 rounded-full'></div>
              </div>
              <div>
                <p className='font-medium'>Apply Fertilizer</p>
                <p className='text-sm text-gray-500'>2 of 4 zones done</p>
              </div>
            </div>
            <ArrowRight className='text-gray-400' size={20} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FarmDashboard
