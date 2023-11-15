'use client'
import CategoryItem from '@/components/CategoryItem'
import { UpcomingTask } from '@/components/UpcomingTask'
import { Footer, NavBar } from '@/components/common'
import { MainLayout } from '@/components/layouts'
import { getUserInfo } from '@/services/userServices'
import { NextPage } from 'next'
import { BsHeartPulse, BsPerson } from 'react-icons/bs'
import { PiDotsThreeCircleLight, PiSuitcaseSimpleLight } from 'react-icons/pi'

//Initialize taskNum
const userInfo = await getUserInfo()

// Define categories with taskNum properties
const categories = [
  {
    index: 0,
    icon: BsPerson,
    title: 'Personal',
    taskNum: userInfo.personal_task.length,
    href: '/personal',
  },
  {
    index: 1,
    icon: PiSuitcaseSimpleLight,
    title: 'Work',
    taskNum: userInfo.work_task.length,
    href: '/work',
  },
  {
    index: 2,
    icon: BsHeartPulse,
    title: 'Health',
    taskNum: userInfo.health_task.length,
    href: '/health',
  },
  {
    index: 3,
    icon: PiDotsThreeCircleLight,
    title: 'Others',
    taskNum: userInfo.others_task.length,
    href: '/others',
  },
]

const Dashboard: NextPage = () => {
  return (
    <div className="bg-custom-black">
      <MainLayout className="lg:hidden">
        <div className="flex-col flex gap-8">
          <NavBar />
          <div className="flex flex-col gap-1 text-custom-white font-medium">
            <p className="text-xs">{userInfo.date}</p>
            <p className="text-xl">Welcome, {userInfo.username}</p>
          </div>
          <UpcomingTask
            taskNum={userInfo.upcoming_task.length}
            href="/upcoming"
          />
          {/* Mobile */}
          <div className="grid grid-cols-2 gap-4 lg:hidden">
            {categories.map((category) => (
              <CategoryItem
                key={category.index}
                Icon={category.icon}
                title={category.title}
                taskNum={category.taskNum}
                href={category.href}
              />
            ))}
          </div>
        </div>
      </MainLayout>
      {/* Desktop */}
      <div className="hidden lg:block min-h-screen">
        <div className="flex flex-row gap-10 py-10">
          <NavBar />
          <div className="flex flex-col gap-8 w-full px-10">
            <div className="flex flex-col gap-2 text-custom-white font-medium">
              <p className="text-xl">{userInfo.date}</p>
              <p className="text-3xl">Welcome, {userInfo.username}</p>
            </div>
            <UpcomingTask
              taskNum={userInfo.upcoming_task.length}
              href="/upcoming"
            />
            <div className="grid grid-cols-4 gap-4 max-w-full">
              {categories.map((category) => (
                <CategoryItem
                  key={category.index}
                  Icon={category.icon}
                  title={category.title}
                  taskNum={category.taskNum}
                  href={category.href}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer className="text-custom-white" />
    </div>
  )
}

export default Dashboard
