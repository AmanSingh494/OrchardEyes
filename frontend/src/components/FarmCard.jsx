import React, { useEffect, useState } from 'react'
import { Footprints, Heart, Droplets, Moon, ArrowRight } from 'lucide-react'
import Card from './Card'
import DoughnutChartWithImage from '../components/charts/DoughnutChartWithImage'
import leafForChart from '../assets/img/leaf_for_chart.svg'
import appleForChart from '../assets/img/apple_for_chart.png'

const FarmDashboard = () => {
  const [farmMetrics, setFarmMetrics] = useState(null)

  // Dummy data for development
  const data = {
    health: {
      fruit: {
        healthy: 86,
        unhealthy: 14
      },
      leaves: {
        healthy: 90,
        unhealthy: 10
      }
    },
    weather: {
      temperature: 32, // in degrees Celsius
      humidity: 50, // in percentage
      prediction: 'Rainy' // could be "cloudy", "sunny", or "rain"
    },
    pestSeverity: 35, // on a scale of 1-100
    predictedDiseases: {
      disease: ['Apple scab', 'Fire blight', 'No Disease'],
      chance: [10, 43, 47] // percentages
    },
    appleCount: 1200, // total number of apples
    estimatedAppleYield: [0, 3.2, 5.5, 2.3, 4.1, 6.7, 3.8], // in tonnes
    precisionMapData: {
      pestDisease: [
        [1.1, 1.2],
        [1.3, 2.1],
        [1.5, 3.3],
        [2.2, 1.4],
        [2.5, 2.6],
        [2.8, 3.1]
      ],
      lowWater: [
        [3.1, 1.2],
        [3.3, 2.4],
        [3.5, 3.6],
        [4.2, 1.1],
        [4.5, 2.3],
        [4.8, 3.5]
      ],
      nutrientDeficiency: [
        [5.1, 1.3],
        [5.3, 2.5],
        [5.5, 3.7],
        [6.2, 1.4],
        [6.5, 2.6],
        [6.8, 3.8]
      ],
      healthy: [
        // Fill the rest of the area with green points
        ...Array.from({ length: 20 }, (_, x) =>
          Array.from({ length: 20 }, (_, y) => [(x + 1) / 2, (y + 1) / 2])
        )
          .flat()
          .filter(
            ([x, y]) =>
              !(
                (x <= 2.8 && y <= 3.8) ||
                (x >= 3.1 && x <= 4.8 && y <= 3.8) ||
                (x >= 5.1 && x <= 6.8 && y <= 3.8)
              )
          )
      ]
    }
  }

  useEffect(() => {
    setFarmMetrics(data)
  }, [])
  const {
    health: {
      fruit: { healthy: healthyFruits, unhealthy: unhealthyFruits } = {},
      leaves: { healthy: healthyLeaves, unhealthy: unhealthyLeaves } = {}
    } = {},
    weather: { temperature, humidity, prediction } = {},
    pestSeverity,
    predictedDiseases: { disease, chance } = {},
    appleCount,
    production
  } = farmMetrics || {}
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
            <h3 className='text-sky-900 text-xl font-bold mb-2'>Farm Health</h3>
            <p className='text-xl font-semibold text-sky-900 mb-1'>95%</p>
            {/* <div className='absolute bottom-4 right-4 w-16 h-16 bg-sky-200 rounded-full flex items-center justify-center'>
              <Footprints className='text-sky-600' size={24} />
            </div> */}
          </div>
        </Card>

        {/* Crop Vitals Card */}
        <Card
          className='p-4'
          bgColor={'bg-[#EBFAEB]'}
          otherStyles={
            'border border-[#81ec81] flex items-center justify-between'
          }
        >
          <h2 className='font-semibold mb-2 text-lg'>Leaves and Fruits</h2>
          <div className='flex flex-col gap-4'>
            <div className='flex space-x-4'>
              <DoughnutChartWithImage
                img={leafForChart}
                label1='Healthy leaves'
                label2='Diseased Leaves'
                data1={healthyLeaves}
                data2={unhealthyLeaves}
              />
            </div>
            <div className='flex space-x-4'>
              <DoughnutChartWithImage
                img={appleForChart}
                label1='Healthy Apples'
                label2='Diseased Apples'
                data1={healthyFruits}
                data2={unhealthyFruits}
              />
            </div>
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
