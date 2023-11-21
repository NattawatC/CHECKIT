'use client'
import { Footer, NavBar, SearchBar } from '@/components/common'
import { MainLayout } from '@/components/layouts'
import TaskItem from '@/components/taskPage/TaskItem'
import { filterByCategory } from '@/services/userServices'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useEmail } from '@/components/EmailContext'

const Health: NextPage = () => {
  const {email} = useEmail()
  const [health_task, setHealth_task] = useState<Task[]>([])

  const fetchHealthTask = async () => {
    try {
      const health_task = await filterByCategory('Health', email)
      setHealth_task(health_task)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchHealthTask()
  }, [])

  return (
    <>
      <div className="bg-custom-black min-h-screen">
        <MainLayout className="lg:hidden">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-8">
              <NavBar />
              {/* <SearchBar /> */}
            </div>
            <div className=" gap-1 items-center flex flex-col text-custom-white font-medium">
              <p className="text-xl">Health</p>
              <p className="text-base">{health_task.length} Tasks</p>
            </div>

            <div className="flex flex-col gap-4 bg-custom-white rounded-lg p-4">
              {health_task.map((item, index) => (
                <TaskItem
                  key={index}
                  task_id={item.task_id}
                  priority={item.priority}
                  title={item.title}
                  date_start={item.date_start}
                  date_end={item.date_end}
                  note={item.note}
                  time_start={item.time_start}
                  time_end={item.time_end}
                />
              ))}
            </div>
          </div>
        </MainLayout>

        {/* Desktop */}
        <div className="hidden lg:block min-h-screen">
          <div className="flex flex-row gap-10 py-10">
            <NavBar />
            <div className="flex flex-col w-full px-52 gap-8">
              {/* <SearchBar /> */}
              <div className="gap-1 items-center flex flex-col text-custom-white font-medium">
                <p className="text-2xl">Health</p>
                <p className="text-xl">{health_task.length} Tasks</p>
              </div>
              <div className="flex flex-col gap-4 bg-custom-white rounded-lg p-4">
                {health_task.map((item, index) => (
                  <TaskItem
                    key={index}
                    task_id={item.task_id}
                    priority={item.priority}
                    title={item.title}
                    date_start={item.date_start}
                    date_end={item.date_end}
                    note={item.note}
                    time_start={item.time_start}
                    time_end={item.time_end}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer className="text-custom-white" />
      </div>
    </>
  )
}

export default Health
