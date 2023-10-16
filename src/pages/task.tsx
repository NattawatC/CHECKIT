import { Filter } from '@/components/Filter'
import { Footer, NavBar } from '@/components/common'
import { MainLayout } from '@/components/layouts'
import TaskItem from '@/components/taskPage/TaskItem'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { IoFilter } from 'react-icons/io5'

const taskItem = [
  {
    priority: 'high',
    title: 'Do Dishwashing',
    note: ['- clean the plate', '- clean the glass'],
    date: '12/12/2021',
    time: '12:00 - 13:00',
  },
  {
    priority: 'medium',
    title: 'Do Laundry',
    note: ['wash clothes', 'dry clothes', 'fold clothes'],
    date: '12/13/2021',
    time: '14:00 - 15:30',
  },
  {
    priority: 'low',
    title: 'Grocery Shopping',
    note: ['buy milk', 'buy eggs', 'buy bread'],
    date: '12/14/2021',
    time: '10:00 - 11:00',
  },
]

export default function Task() {
  const [isFilter, setIsFilter] = useState(false)

  const toggleFilter = () => {
    setIsFilter(!isFilter)
  }

  return (
    <div className="bg-custom-black h-max-screen">
      <MainLayout>
        <div className="flex flex-col gap-9">
          <NavBar />
          {/* Search Bar */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <div className="relative w-full">
                <AiOutlineSearch className="absolute top-0 bottom-0 w-6 h-6 my-auto text-custom-white left-3" />
                <Input
                  type="text"
                  placeholder="Search"
                  className="w-full pl-12 pr-12 rounded-lg bg-custom-gray text-custom-white border-custom-white focus-visible:ring-custom-orange focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                />
                <Button
                  className="absolute top-0 bottom-0 my-auto bg-transparent right-0 focus:bg-transparent"
                  onClick={toggleFilter}
                >
                  <IoFilter className="w-6 h-6" />
                </Button>
              </div>
              {isFilter && (
                <div>
                  <Filter />
                </div>
              )}
            </div>

            <div className="flex flex-col justify-center items-center text-custom-white">
              <p className="text-xl">Task</p>
              <p className="text-base">10 tasks</p> {/* Changeable */}
            </div>

            <div className="flex flex-col gap-4 p-4 bg-custom-white rounded-lg">
              {taskItem.map((item) => (
                <TaskItem
                  key={item.title}
                  priority={item.priority}
                  title={item.title}
                  date={item.date}
                  note={item.note}
                  time={item.time}
                />
              ))}
            </div>
          </div>
          <Button className="w-full py-2 px-4 bg-custom-orange hover:bg-custom-orangeHover text-base inline-flex">
            Add
          </Button>
        </div>
      </MainLayout>
      <Footer 
      className='text-custom-white'/>
    </div>
  )
}
