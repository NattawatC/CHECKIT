import { Footer, NavBar, SearchBar } from '@/components/common'
import { MainLayout } from '@/components/layouts'
import TaskItem from '@/components/taskPage/TaskItem'
import { Button } from '@/components/ui/button'
import dataservices from '@/services/dataservices'
import { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog'

//Apply Non's Function
const data = new dataservices()
const all_task = data.all_task

export default function Task() {
  const [selectedPriority, setSelectedPriority] = useState<string>('None')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const handlePriorityClick = (priority: string) => {
    setSelectedPriority(priority)
  }

  const handleCategoryClick = (category: string) => {
    setSelectedCategories((prevCategories) => {
      if (prevCategories.includes(category)) {
        return prevCategories.filter((c) => c !== category)
      } else {
        return [...prevCategories, category]
      }
    })
  }

  const isCategorySelected = (category: string) => {
    return selectedCategories.includes(category)
  }

  const [selectedRoles, setSelectedRoles] = useState<string[]>([])

  const handleRoleClick = (role: string) => {
    setSelectedRoles((prevRoles) => {
      if (prevRoles.includes(role)) {
        return prevRoles.filter((r) => r !== role)
      } else {
        return [...prevRoles, role]
      }
    })
  }

  const isRoleSelected = (role: string) => {
    return selectedRoles.includes(role)
  }

  return (
    <div className="bg-custom-black h-max-screen">
      <MainLayout>
        <div className="flex flex-col gap-9">
          <NavBar />
          <div className="flex flex-col gap-6">
            <SearchBar />
            <div className="flex flex-col justify-center items-center text-custom-white">
              <p className="text-xl">Task</p>
              <p className="text-base">10 tasks</p>
            </div>

            <div className="flex flex-col gap-4 p-4 bg-custom-white rounded-lg">
              {all_task.map((item, index) => (
                <TaskItem
                  key={index}
                  id={item.id}
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
          <Dialog>
            <DialogTrigger asChild>
              <Button className="px-4 py-2 w-full h-fit inline-flex bg-custom-orange text-custom-white hover:bg-custom-orangeHover text-base"> 
                Add
              </Button>
            </DialogTrigger>
            //Add Scroll Area
            <DialogContent className="w-auto mx-auto max-w-md px-4 py-10 md:py-10 flex flex-col gap-5 bg-custom-black h-[700px] overflow-y-auto">
              <div className="flex flex-col items-center gap-4">
                <input
                  className="bg-custom-gray p-2 w-full h-auto focus:outline-custom-white rounded-lg text-custom-white "
                  type="text"
                  placeholder="Title"
                />
                <textarea
                  className="bg-custom-gray p-2 w-full min-h-auto focus:outline-custom-white rounded-lg text-custom-white"
                  placeholder="Notes"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-custom-white">Date</label>
                <div className="flex flex-row w-full justify-between">
                  <input
                    className="bg-custom-gray px-4 py-2 h-auto text-custom-white focus:outline-custom-white rounded-lg"
                    type="date"
                    placeholder="2023-09-20"
                    defaultValue="2023-09-20"
                  />
                  <label className="text-custom-white">_</label>
                  <input
                    className="bg-custom-gray px-4 py-2 text-custom-white h-auto focus:outline-custom-white rounded-lg"
                    type="date"
                    placeholder="21/09/2023"
                    defaultValue="21/09/2023"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-custom-white">Time</label>
                <div className="flex flex-row gap-3">
                  <input
                    className="bg-custom-gray px-4 py-2 h-auto w-auto text-custom-white focus:outline-custom-white rounded-lg"
                    type="time"
                    placeholder="12:00"
                  />
                  <label className="text-custom-white">_</label>
                  <input
                    className="bg-custom-gray px-4 py-2 text-custom-white h-auto w-auto focus:outline-custom-white rounded-lg"
                    type="time"
                    placeholder="13:00"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-custom-white">Priority</label>
                <div className="flex flex-row gap-4">
                  <Button
                    onClick={() => handlePriorityClick('High')}
                    className={`
            ${
              selectedPriority === 'High'
                ? 'bg-custom-orange hover:bg-none'
                : 'bg-custom-gray'
            } 
            `}
                  >
                    High
                  </Button>
                  <Button
                    onClick={() => handlePriorityClick('Medium')}
                    className={
                      selectedPriority === 'Medium'
                        ? 'bg-custom-orange'
                        : 'bg-custom-gray'
                    }
                  >
                    Medium
                  </Button>
                  <Button
                    onClick={() => handlePriorityClick('Low')}
                    className={
                      selectedPriority === 'Low'
                        ? 'bg-custom-orange'
                        : 'bg-custom-gray'
                    }
                  >
                    Low
                  </Button>
                  <Button
                    onClick={() => handlePriorityClick('None')}
                    className={
                      selectedPriority === 'None'
                        ? 'bg-custom-orange'
                        : 'bg-custom-gray'
                    }
                  >
                    None
                  </Button>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-custom-white">Category</label>
                <section className="flex flex-col gap-4">
                  <div className="flex flex-row gap-4">
                    <Button
                      onClick={() => handleCategoryClick('Personal')}
                      className={
                        isCategorySelected('Personal')
                          ? 'bg-custom-orange'
                          : 'bg-custom-gray'
                      }
                    >
                      Personal
                    </Button>
                    <Button
                      onClick={() => handleCategoryClick('Work')}
                      className={
                        isCategorySelected('Work')
                          ? 'bg-custom-orange'
                          : 'bg-custom-gray'
                      }
                    >
                      Work
                    </Button>
                    <Button
                      onClick={() => handleCategoryClick('Health')}
                      className={
                        isCategorySelected('Health')
                          ? 'bg-custom-orange'
                          : 'bg-custom-gray'
                      }
                    >
                      Health
                    </Button>
                    s
                  </div>
                  <div className="flex flex-row gap-4">
                    <Button
                      onClick={() => handleCategoryClick('Others')}
                      className={`${
                        isCategorySelected('Others')
                          ? 'bg-custom-orange'
                          : 'bg-custom-gray'
                      }`}
                    >
                      Others
                    </Button>
                  </div>
                </section>
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-custom-white">Role</label>
                <section className="flex flex-col gap-4">
                  <div className="flex flex-row gap-4">
                    <Button
                      onClick={() => handleRoleClick('Personal')}
                      className={
                        isRoleSelected('Personal')
                          ? 'bg-custom-orange'
                          : 'bg-custom-gray'
                      }
                    >
                      Personal
                    </Button>
                    <Button
                      onClick={() => handleRoleClick('Team A')}
                      className={
                        isRoleSelected('Team A')
                          ? 'bg-custom-orange'
                          : 'bg-custom-gray'
                      }
                    >
                      Team A
                    </Button>
                    <Button
                      onClick={() => handleRoleClick('Team B')}
                      className={
                        isRoleSelected('Team B')
                          ? 'bg-custom-orange'
                          : 'bg-custom-gray'
                      }
                    >
                      Team B
                    </Button>
                  </div>
                  <div className="flex flex-row gap-4">
                    <Button
                      onClick={() => handleRoleClick('Team C')}
                      className={
                        isRoleSelected('Team C')
                          ? 'bg-custom-orange'
                          : 'bg-custom-gray'
                      }
                    >
                      Team C
                    </Button>
                    <Button
                      onClick={() => handleRoleClick('Team D')}
                      className={
                        isRoleSelected('Team D')
                          ? 'bg-custom-orange'
                          : 'bg-custom-gray'
                      }
                    >
                      Team D
                    </Button>
                  </div>
                </section>
              </div>
              <DialogFooter className="flex flex-row gap-8 justify-between">
                <Button
                  type="submit"
                  className="bg-custom-gray text-custom-white w-full h-auto"
                >
                  Add Task
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </MainLayout>
      <Footer className="text-custom-white" />
    </div>
  )
}
