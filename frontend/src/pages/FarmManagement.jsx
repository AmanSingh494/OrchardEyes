import { useEffect, useState } from 'react'
import { Bell, ChevronDown, RotateCw } from 'lucide-react'
import Card from '../components/Card'
import DoughnutChartWithImage from '../components/charts/DoughnutChartWithImage'
import leafForChart from '../assets/img/leaf_for_chart.svg'
import appleForChart from '../assets/img/apple_for_chart.png'
import sunCloud from '../assets/img/sun_cloud.svg'
import SidebarLeft from '../components/SideBarLeft'
import PieChart from '../components/charts/PieChart'
import SideBarRight from '../components/SideBarRight'
import LineChart from '../components/charts/LineChart'
import PrecisionMap from '../components/charts/PrecisonMap'
import TopBar from '../components/TopBar'
import FarmCard from '../components/FarmCard'
import QuickActions from './QuickActions'
import Chatbot from '../components/chatbot/Chatbot'

const OrchardManagement = () => {
  const [farmMetrics, setFarmMetrics] = useState(null)
  const [activeTab, setActiveTab] = useState('Dashboard')
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

  // Destructure farmMetrics
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
    <>
      <TopBar classname='sm:hidden' activeTab={activeTab} />
      <SidebarLeft activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'Dashboard' && <FarmCard />}
      {activeTab === 'Profile' && <h1>Profile</h1>}
      {activeTab === 'Quick Actions' && <QuickActions />}
      {activeTab === 'Orchard Ai' && <Chatbot />}
      {activeTab === 'Home' && <h1>Home</h1>}
      <div className='hidden sm:flex  bg-white p-4 sm:pl-48 flex flex-col gap-6 bg-[#dedede]'>
        <header className='flex justify-between items-start mb-4'>
          <div className='flex items-center'>
            <h1 className='text-lg font-semibold text-gray-800'>
              Orchard Management
            </h1>
          </div>
        </header>

        {farmMetrics ? (
          <>
            <div className='flex gap-4 items-start'>
              <Card
                className='p-4'
                bgColor={'bg-[#EBFAEB]'}
                otherStyles={'border border-[#81ec81]'}
              >
                <h2 className='font-semibold mb-2 text-lg'>
                  Leaves and Fruits
                </h2>
                <div className='flex flex-col gap-4'>
                  <div className='flex space-x-4'>
                    <DoughnutChartWithImage
                      img={leafForChart}
                      label1='Healthy leaves'
                      label2='Diseased Leaves'
                      data1={healthyLeaves}
                      data2={unhealthyLeaves}
                    />
                    <div className='mt-2 flex flex-col'>
                      <div className='flex items-center'>
                        <span className='w-3 h-3 bg-teal-500 rounded-full mr-2'></span>
                        <span className='text-sm'>Healthy Leaves</span>
                      </div>
                      <div className='flex items-center'>
                        <span className='w-3 h-3 bg-red-500 rounded-full mr-2'></span>
                        <span className='text-sm'>Leaves with disease</span>
                      </div>
                    </div>
                  </div>
                  <div className='flex space-x-4'>
                    <DoughnutChartWithImage
                      img={appleForChart}
                      label1='Healthy Apples'
                      label2='Diseased Apples'
                      data1={healthyFruits}
                      data2={unhealthyFruits}
                    />
                    <div className='mt-2 flex flex-col'>
                      <div className='flex items-center'>
                        <span className='w-3 h-3 bg-teal-500 rounded-full mr-2'></span>
                        <span className='text-sm'>Healthy Apples</span>
                      </div>
                      <div className='flex items-center'>
                        <span className='w-3 h-3 bg-red-500 rounded-full mr-2'></span>
                        <span className='text-sm'>Apples with disease</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card
                className='p-4 col-span-2 '
                bgColor={'bg-[#B7F1B7]'}
                otherStyles={'border border-[#48bc48]'}
              >
                <h2 className='font-semibold mb-2 w-[25vw]'>Overall</h2>
                <div className='text-lg'>
                  <span>Esitimated Yield :</span>
                  <span> 87 Tonnes</span>
                </div>
                <div className='text-lg'>
                  <span>Pest Outbreak : </span>
                  <span> Codling Moth</span>
                </div>
                {/* Content for Overall card */}
              </Card>

              <Card
                bgColor={'bg-[#D6F2EE]'}
                otherStyles={'border border-[#71c9bd]'}
              >
                <div className='flex items-center justify-between gap-4'>
                  <div className='flex items-center'>
                    <img src={sunCloud} alt='sun behing clouds' />
                  </div>
                  <div className='flex flex-col'>
                    <div className='text-right flex gap-2  items-center'>
                      <span className='text-2xl font-light'>
                        {temperature}&#176;
                      </span>
                      <span className='block text-l font-light'>
                        {prediction}
                      </span>
                    </div>
                    <div className='border-t border-black my-2'></div>
                    <div className='flex flex-col'>
                      <div className='text-right flex gap-2  items-center'>
                        <span className='text-md font-light'>{humidity}%</span>
                        <span className='block text-sm font-light'>
                          humidity
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            <div className='flex gap-4 items-start'>
              <Card className='p-4 bg-yellow-50' bgColor={'bg-[#EDF9DA]'}>
                <div className='flex justify-between items-center'>
                  <h2 className='font-semibold'>Pests and Diseases</h2>
                  <ChevronDown />
                </div>
                <div className='mt-2 bg-yellow-200 rounded-full h-2'></div>
              </Card>

              <Card className='p-4' bgColor={'bg-white'}>
                <div className='flex justify-between items-center mb-2'>
                  <h2 className='font-semibold'>Production</h2>
                </div>

                <LineChart
                  labels={[0, 15, 30, 45, 60, 75]}
                  data={farmMetrics.estimatedAppleYield}
                  title='Estimated Apple Count (tonnes)'
                />
              </Card>
              <Card bgColor={'bg-[#FAEBEB]'}>
                <PieChart dataSet={chance} labels={disease} />
              </Card>
              {/* <Card bgColor={'bg-[#FAEBEB]'}>
                <PrecisionMap
                  data={farmMetrics.precisionMapData}
                  title='2D Precision Map'
                />
              </Card> */}
            </div>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  )
}

export default OrchardManagement
