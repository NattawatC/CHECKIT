import { Footer, NavBar, SearchBar } from '@/components/common'
import { MainLayout } from '@/components/layouts'
import TaskItem from '@/components/taskPage/TaskItem'
import { Button } from '@/components/ui/button'
import dataservices from '@/services/dataservices'

//Apply Non's Function
const data = new dataservices()
const all_task = data.all_task

export default function Task() {

  return (
    <div className="bg-custom-black h-max-screen">
      <MainLayout>
        <div className="flex flex-col gap-9">
          <NavBar />
          <div className="flex flex-col gap-6">
            <SearchBar />
            <div className="flex flex-col justify-center items-center text-custom-white">
              <p className="text-xl">Task</p>
              <p className="text-base">10 tasks</p> {/* Changeable */}
            </div>

            <div className="flex flex-col gap-4 p-4 bg-custom-white rounded-lg">
              {all_task.map((item, index) => (
                <TaskItem
                  key={index}
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
