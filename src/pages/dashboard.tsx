'use client'
import CategoryItem from '@/components/CategoryItem'
import { UpcomingTask } from '@/components/UpcomingTask'
import { Footer, NavBar } from '@/components/common'
import { MainLayout } from '@/components/layouts'
import dataservices from '@/services/dataservices'
import { NextPage } from 'next'
import { BsHeartPulse, BsPerson } from 'react-icons/bs'
import { PiDotsThreeCircleLight, PiSuitcaseSimpleLight } from 'react-icons/pi'

// Fetch user information and task data
const data = new dataservices()
const taskNum = await data.getUserInfo()

// Define categories with taskNum properties
const categories = [
  {
    icon: BsPerson,
    title: 'Personal',
    taskNum: taskNum.personal_task.length,
    href: '/personal',
  },
  {
    icon: PiSuitcaseSimpleLight,
    title: 'Work',
    taskNum: taskNum.work_task.length,
    href: '/works',
  },
  {
    icon: BsHeartPulse,
    title: 'Health',
    taskNum: taskNum.health_task.length,
    href: '/health',
  },
  {
    icon: PiDotsThreeCircleLight,
    title: 'Others',
    taskNum: taskNum.others_task.length,
    href: '/others',
  },
]
const Dashboard: NextPage = () => {
  return (
    <div className="bg-custom-black">
      <MainLayout>
        <div className="flex-col flex gap-8">
          <NavBar />

          <div className="flex flex-col gap-1 text-custom-white font-medium">
            <p className="text-xs">{taskNum.date}</p>
            <p className="text-xl">Welcome, {taskNum.username}</p>
          </div>
          <UpcomingTask taskNum={taskNum.upcoming_task.length} />

          <div className="grid grid-cols-2 gap-4">
            {categories.map((category, index) => (
              <CategoryItem
                key={index}
                Icon={category.icon}
                title={category.title}
                taskNum={category.taskNum}
                href={category.href}
              />
            ))}
          </div>
        </div>
      </MainLayout>
      <Footer className="text-custom-white" />
    </div>
  )
}

export default Dashboard
