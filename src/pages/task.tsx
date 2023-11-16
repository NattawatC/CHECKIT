import { Footer, NavBar, SearchBar } from '@/components/common'
import { MainLayout } from '@/components/layouts'
import TaskItem from '@/components/taskPage/TaskItem'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog'
import { getAllTaskOfUser } from '@/services/userServices'

const mockData = [
  {
    id: '1',
    priority: 'High',
    title: 'Task 1',
    date_start: '2021-11-20',
    date_end: '2021-12-20',
    time_start: '12:00',
    time_end: '13:00',
    note: 'Note 1',
  },
  {
    id: '2',
    priority: 'Medium',
    title: 'Task 2',
    date_start: '2021-11-20',
    date_end: '2021-12-20',
    time_start: '12:00',
    time_end: '13:00',
    note: 'Note 2',
  },
  {
    id: '3',
    priority: 'Low',
    title: 'Task 3',
    date_start: '2021-11-20',
    date_end: '2021-12-20',
    time_start: '12:00',
    time_end: '13:00',
    note: 'Note 3',
  },
  {
    id: '4',
    priority: 'None',
    title: 'Task 4',
    date_start: '2021-11-20',
    date_end: '2021-12-20',
    time_start: '12:00',
    time_end: '13:00',
    note: 'Note 4',
  },
]

//Apply Non's Function
const tasks: Task[] = await getAllTaskOfUser()

console.log(tasks)

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
      <MainLayout className="lg:hidden">
        <div className="flex flex-col gap-9">
          <NavBar />
          <div className="flex flex-col gap-6">
            <SearchBar />
            <div className="flex flex-col justify-center items-center text-custom-white">
              <p className="text-xl">Task</p>
              <p className="text-base">{tasks.length} tasks</p>
            </div>

            <div className="flex flex-col gap-4 p-4 bg-custom-white rounded-lg">
              {tasks.map((item, index) => (
                <TaskItem
                  key={index}
                  // id={item.id}
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
              <Button className="px-4 py-2 w-full h-fit inline-flex bg-custom-orange text-custom-white rounded-md hover:bg-custom-orangeHover text-base lg:text-lg">
                Add
              </Button>
            </DialogTrigger>
            //Add Scroll Area
            <DialogContent className="w-auto mx-auto max-w-md px-4 pt-16 pb-5 md:pb-5 md:pt-12 flex flex-col gap-8 bg-custom-black h-[700px] overflow-y-auto">
              <div className="flex flex-col items-center gap-4">
                <Input
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
                  <Input
                    className="bg-custom-gray px-4 py-2 h-auto text-custom-white focus:outline-custom-white rounded-lg"
                    type="date"
                    defaultValue="2023-11-20"
                  />
                  <label className="text-custom-white">_</label>
                  <Input
                    className="bg-custom-gray px-4 py-2 text-custom-white h-auto focus:outline-custom-white rounded-lg"
                    type="date"
                    defaultValue="2023-12-20"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-custom-white">Time</label>
                <div className="flex flex-row gap-3">
                  <Input
                    className="bg-custom-gray px-4 py-2 h-auto w-auto text-custom-white focus:outline-custom-white rounded-lg"
                    type="time"
                    defaultValue="12:00"
                  />
                  <label className="text-custom-white">_</label>
                  <Input
                    className="bg-custom-gray px-4 py-2 text-custom-white h-auto w-auto focus:outline-custom-white rounded-lg"
                    type="time"
                    defaultValue="13:00"
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
                        } rounded-md`}
                  >
                    High
                  </Button>
                  <Button
                    onClick={() => handlePriorityClick('Medium')}
                    className={`
                    ${
                      selectedPriority === 'Medium'
                        ? 'bg-custom-orange hover:bg-none'
                        : 'bg-custom-gray'
                    } rounded-md`}
                  >
                    Medium
                  </Button>
                  <Button
                    onClick={() => handlePriorityClick('Low')}
                    className={`
                    ${
                      selectedPriority === 'Low'
                        ? 'bg-custom-orange hover:bg-none'
                        : 'bg-custom-gray'
                    } rounded-md`}
                  >
                    Low
                  </Button>
                  <Button
                    onClick={() => handlePriorityClick('None')}
                    className={`
                    ${
                      selectedPriority === 'None'
                        ? 'bg-custom-orange hover:bg-none'
                        : 'bg-custom-gray'
                    } rounded-md`}
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
                      className={`
                      ${
                        isCategorySelected('Personal')
                          ? 'bg-custom-orange hover:bg-none'
                          : 'bg-custom-gray'
                      } rounded-md`}
                    >
                      Personal
                    </Button>
                    <Button
                      onClick={() => handleCategoryClick('Work')}
                      className={`
                      ${
                        isCategorySelected('Work')
                          ? 'bg-custom-orange hover:bg-none'
                          : 'bg-custom-gray'
                      } rounded-md`}
                    >
                      Work
                    </Button>
                    <Button
                      onClick={() => handleCategoryClick('Health')}
                      className={`
                      ${
                        isCategorySelected('Health')
                          ? 'bg-custom-orange hover:bg-none'
                          : 'bg-custom-gray'
                      } rounded-md`}
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
                      } rounded-md`}
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
                      className={`
                      ${
                        isRoleSelected('Personal')
                          ? 'bg-custom-orange'
                          : 'bg-custom-gray'
                      } rounded-md`}
                    >
                      Personal
                    </Button>
                    <Button
                      onClick={() => handleRoleClick('Team A')}
                      className={`
                      ${
                        isRoleSelected('Team A')
                          ? 'bg-custom-orange'
                          : 'bg-custom-gray'
                      } rounded-md`}
                    >
                      Team A
                    </Button>
                    <Button
                      onClick={() => handleRoleClick('Team B')}
                      className={`
                      ${
                        isRoleSelected('Team B')
                          ? 'bg-custom-orange'
                          : 'bg-custom-gray'
                      } rounded-md`}
                    >
                      Team B
                    </Button>
                  </div>
                  <div className="flex flex-row gap-4">
                    <Button
                      onClick={() => handleRoleClick('Team C')}
                      className={`
                      ${
                        isRoleSelected('Team C')
                          ? 'bg-custom-orange'
                          : 'bg-custom-gray'
                      } rounded-md`}
                    >
                      Team C
                    </Button>
                    <Button
                      onClick={() => handleRoleClick('Team D')}
                      className={`
                      ${
                        isRoleSelected('Team D')
                          ? 'bg-custom-orange'
                          : 'bg-custom-gray'
                      } rounded-md`}
                    >
                      Team D
                    </Button>
                  </div>
                </section>
              </div>
              <DialogFooter className="flex flex-row gap-8 justify-between">
                <Button
                  type="submit"
                  className="bg-custom-gray text-custom-white w-full h-auto text-base hover:bg-custom-orangeHover rounded-md"
                >
                  Add Task
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </MainLayout>

      {/* Desktop */}
      <div className="hidden lg:block min-h-screen">
        <div className="flex flex-row gap-10 py-10">
          <NavBar />
          <div className="flex flex-col gap-6 w-full px-52">
            <div className="flex flex-col gap-6">
              <SearchBar />
              <div className="flex flex-col justify-center items-center text-custom-white">
                <p className="text-2xl">Task</p>
                <p className="text-xl">{tasks.length} tasks</p>
              </div>

              <div className="flex flex-col gap-4 p-4 bg-custom-white rounded-lg">
                {tasks.map((item, index) => (
                  <TaskItem
                    key={index}
                    // id={item.id}
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
                <Button className="px-4 py-2 w-full h-fit inline-flex bg-custom-orange text-custom-white rounded-md hover:bg-custom-orangeHover text-base lg:text-lg">
                  Add
                </Button>
              </DialogTrigger>
              //Add Scroll Area
              <DialogContent className="w-auto mx-auto max-w-md px-4 pt-16 pb-5 md:pb-5 md:pt-12 flex flex-col gap-8 bg-custom-black h-[700px] overflow-y-auto">
                <div className="flex flex-col items-center gap-4">
                  <Input
                    className="bg-custom-gray p-2 w-full h-auto focus:outline-custom-white rounded-lg text-custom-white lg:text-base"
                    type="text"
                    placeholder="Title"
                  />
                  <textarea
                    className="bg-custom-gray p-2 w-full min-h-auto focus:outline-custom-white rounded-lg text-custom-white"
                    placeholder="Notes"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-custom-white lg:text-base">Date</label>
                  <div className="flex flex-row w-full justify-between gap-2">
                    <Input
                      className="bg-custom-gray px-4 py-2 h-auto text-custom-white focus:outline-custom-white rounded-lg lg:text-base"
                      type="date"
                      defaultValue="2023-11-20"
                    />
                    <label className="text-custom-white">_</label>
                    <Input
                      className="bg-custom-gray px-4 py-2 text-custom-white h-auto focus:outline-custom-white rounded-lg lg:text-base"
                      type="date"
                      defaultValue="2023-12-20"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-custom-white lg:text-base">Time</label>
                  <div className="flex flex-row gap-3">
                    <Input
                      className="bg-custom-gray px-4 py-2 h-auto w-auto text-custom-white focus:outline-custom-white rounded-lg lg:text-base"
                      type="time"
                      defaultValue="12:00"
                    />
                    <label className="text-custom-white">_</label>
                    <Input
                      className="bg-custom-gray px-4 py-2 text-custom-white h-auto w-auto focus:outline-custom-white rounded-lg lg:text-base"
                      type="time"
                      defaultValue="13:00"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-custom-white lg:text-base">
                    Priority
                  </label>
                  <div className="flex flex-row gap-4">
                    <Button
                      onClick={() => handlePriorityClick('High')}
                      className={`
                        ${
                          selectedPriority === 'High'
                            ? 'bg-custom-orange hover:bg-none'
                            : 'bg-custom-gray'
                        } rounded-md lg:text-base`}
                    >
                      High
                    </Button>
                    <Button
                      onClick={() => handlePriorityClick('Medium')}
                      className={`
                    ${
                      selectedPriority === 'Medium'
                        ? 'bg-custom-orange hover:bg-none'
                        : 'bg-custom-gray'
                    } rounded-md lg:text-base`}
                    >
                      Medium
                    </Button>
                    <Button
                      onClick={() => handlePriorityClick('Low')}
                      className={`
                    ${
                      selectedPriority === 'Low'
                        ? 'bg-custom-orange hover:bg-none'
                        : 'bg-custom-gray'
                    } rounded-md lg:text-base`}
                    >
                      Low
                    </Button>
                    <Button
                      onClick={() => handlePriorityClick('None')}
                      className={`
                    ${
                      selectedPriority === 'None'
                        ? 'bg-custom-orange hover:bg-none'
                        : 'bg-custom-gray'
                    } rounded-md lg:text-base`}
                    >
                      None
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-custom-white lg:text-base">
                    Category
                  </label>
                  <section className="flex flex-col gap-4">
                    <div className="flex flex-row gap-4">
                      <Button
                        onClick={() => handleCategoryClick('Personal')}
                        className={`
                      ${
                        isCategorySelected('Personal')
                          ? 'bg-custom-orange hover:bg-none'
                          : 'bg-custom-gray'
                      } rounded-md lg:text-base`}
                      >
                        Personal
                      </Button>
                      <Button
                        onClick={() => handleCategoryClick('Work')}
                        className={`
                      ${
                        isCategorySelected('Work')
                          ? 'bg-custom-orange hover:bg-none'
                          : 'bg-custom-gray'
                      } rounded-md lg:text-base`}
                      >
                        Work
                      </Button>
                      <Button
                        onClick={() => handleCategoryClick('Health')}
                        className={`
                      ${
                        isCategorySelected('Health')
                          ? 'bg-custom-orange hover:bg-none'
                          : 'bg-custom-gray'
                      } rounded-md lg:text-base`}
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
                        } rounded-md lg:text-base`}
                      >
                        Others
                      </Button>
                    </div>
                  </section>
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-custom-white lg:text-base">Role</label>
                  <section className="flex flex-col gap-4">
                    <div className="flex flex-row gap-4">
                      <Button
                        onClick={() => handleRoleClick('Personal')}
                        className={`
                      ${
                        isRoleSelected('Personal')
                          ? 'bg-custom-orange'
                          : 'bg-custom-gray'
                      } rounded-md lg:text-base`}
                      >
                        Personal
                      </Button>
                      <Button
                        onClick={() => handleRoleClick('Team A')}
                        className={`
                      ${
                        isRoleSelected('Team A')
                          ? 'bg-custom-orange'
                          : 'bg-custom-gray'
                      } rounded-md lg:text-base`}
                      >
                        Team A
                      </Button>
                      <Button
                        onClick={() => handleRoleClick('Team B')}
                        className={`
                      ${
                        isRoleSelected('Team B')
                          ? 'bg-custom-orange'
                          : 'bg-custom-gray'
                      } rounded-md lg:text-base`}
                      >
                        Team B
                      </Button>
                    </div>
                    <div className="flex flex-row gap-4">
                      <Button
                        onClick={() => handleRoleClick('Team C')}
                        className={`
                      ${
                        isRoleSelected('Team C')
                          ? 'bg-custom-orange'
                          : 'bg-custom-gray'
                      } rounded-md lg:text-base`}
                      >
                        Team C
                      </Button>
                      <Button
                        onClick={() => handleRoleClick('Team D')}
                        className={`
                      ${
                        isRoleSelected('Team D')
                          ? 'bg-custom-orange'
                          : 'bg-custom-gray'
                      } rounded-md lg:text-base`}
                      >
                        Team D
                      </Button>
                    </div>
                  </section>
                </div>
                <DialogFooter className="flex flex-row gap-8 justify-between">
                  <Button
                    type="submit"
                    className="bg-custom-gray text-custom-white w-full h-auto text-base hover:bg-custom-orangeHover rounded-md lg:text-base"
                  >
                    Add Task
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      <Footer className="text-custom-white" />
    </div>
  )
}
