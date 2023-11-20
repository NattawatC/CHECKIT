import { Footer, NavBar, SearchBar } from '@/components/common'
import { MainLayout } from '@/components/layouts'
import TaskItem from '@/components/taskPage/TaskItem'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  createUserTask,
  filterByCategory,
  filterByDate,
  filterByPriority,
  getAllTaskOfUser,
} from '@/services/userServices'
import { useEmail } from '@/components/EmailContext'

export default function Task() {
  const router = useRouter()
  const { email } = useEmail()
  const [selectedPriority, setSelectedPriority] = useState<string>('None')
  const [selectedCategory, setSelectedCategory] = useState<string>('None')
  const [selectedRoles, setSelectedRoles] = useState<string[]>([])
  const [allTasks, setAllTasks] = useState<Task[]>([])
  const [dateTasks, setDateTasks] = useState<any>([])
  const [priorityTasks, setPriorityTasks] = useState<Task[]>([])
  const [personalTasks, setPersonalTasks] = useState<Task[]>([])
  const [workTasks, setWorkTasks] = useState<Task[]>([])
  const [healthTasks, setHealthTasks] = useState<Task[]>([])
  const [othersTasks, setOthersTasks] = useState<Task[]>([])

  const handlePriorityClick = (priority: string) => {
    setSelectedPriority(priority)
  }

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category)
  }

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

  // Form Values
  const [formValues, setFormValues] = useState({
    title: '',
    notes: '',
    startDate: '2023-09-11',
    endDate: '2023-10-11',
    startTime: '09:00',
    endTime: '10:00',
  })

  const handleInputChange = (field: string, value: string) => {
    setFormValues((prevValues) => ({ ...prevValues, [field]: value }))
  }
  
  const handleSubmit = async () => {
    try {
      await createUserTask({
        task_id: 0,
        title: formValues.title,
        note: formValues.notes,
        date_start: formValues.startDate,
        date_end: formValues.endDate,
        time_start: formValues.startTime,
        time_end: formValues.endTime,
        priority: selectedPriority,
        category: selectedCategory,
        role: selectedRoles,
        status: false,
      }, email);
      // After adding the task, you can fetch tasks again
      fetchTasks();
      router.reload()
    } catch (error) {
      console.error('Error creating user task:', error);
    }
  }

  // Fetch tasks and update state variables
  const fetchTasks = async () => {
    try {
      const tasksData = await getAllTaskOfUser(email, 0);
      const filteredDateTasks = await filterByDate(email);
      const filteredPriorityTasks = await filterByPriority(email);
      const filteredPersonalTasks = await filterByCategory('Personal', email);
      const filteredWorkTasks = await filterByCategory('Work', email);
      const filteredHealthTasks = await filterByCategory('Health', email);
      const filteredOthersTasks = await filterByCategory('Others', email);
      setAllTasks(tasksData);
      setDateTasks(filteredDateTasks);
      setPriorityTasks(filteredPriorityTasks);
      setPersonalTasks(filteredPersonalTasks);
      setWorkTasks(filteredWorkTasks);
      setHealthTasks(filteredHealthTasks);
      setOthersTasks(filteredOthersTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  //Get the Filter Data
  const handleCheckboxToggle = (itemName: string) => {
    console.log(itemName)
    if (itemName === '') {
      router.reload()
    } else if (itemName === 'Date') {
      setAllTasks(dateTasks);
    } else if (itemName === 'Priority') {
      setAllTasks(priorityTasks);
    } else if (itemName === 'Personal') {
      setAllTasks(personalTasks);
    } else if (itemName === 'Work') {
      setAllTasks(workTasks);
    } else if (itemName === 'Health') {
      setAllTasks(healthTasks);
    } else if (itemName === 'Others') {
      setAllTasks(othersTasks);
    }
  }

  return (
    <div className="bg-custom-black min-h-screen">
      <MainLayout className="lg:hidden">
        <div className="flex flex-col gap-9">
          <NavBar />
          <div className="flex flex-col gap-6">
            <SearchBar onCheckboxToggle={handleCheckboxToggle} />
            <div className="flex flex-col justify-center items-center text-custom-white">
              <p className="text-xl">Task</p>
              <p className="text-base">{allTasks.length} tasks</p>
            </div>

            <div className="flex flex-col gap-4 p-4 bg-custom-white rounded-lg">
              {allTasks.map((item, index) => (
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
          <Dialog>
            <DialogTrigger asChild>
              <Button className="px-4 py-2 w-full h-fit inline-flex bg-custom-orange text-custom-white rounded-md hover:bg-custom-orangeHover text-base lg:text-lg">
                Add
              </Button>
            </DialogTrigger>
            {/* Add Scroll Area */}
            <DialogContent className="w-auto mx-auto max-w-md px-4 pt-16 pb-5 md:pb-5 md:pt-12 flex flex-col gap-8 bg-custom-black h-[700px] overflow-y-auto">
              <div className="flex flex-col items-center gap-4">
                <Input
                  className="bg-custom-gray p-2 w-full h-auto focus:outline-custom-white rounded-lg text-custom-white text-base"
                  type="text"
                  placeholder="Title"
                  onChange={(e) => handleInputChange('title', e.target.value)}
                />
                <textarea
                  className="bg-custom-gray p-2 w-full min-h-auto focus:outline-custom-white rounded-lg text-custom-white"
                  placeholder="Notes"
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-custom-white">Date</label>
                <div className="flex flex-row w-full justify-between">
                  <Input
                    className="bg-custom-gray px-4 py-2 h-auto text-custom-white focus:outline-custom-white rounded-lg"
                    type="date"
                    defaultValue="2023-09-11"
                    onChange={(e) =>
                      handleInputChange('startDate', e.target.value)
                    }
                  />
                  <label className="text-custom-white">_</label>
                  <Input
                    className="bg-custom-gray px-4 py-2 text-custom-white h-auto focus:outline-custom-white rounded-lg"
                    type="date"
                    defaultValue="2023-10-11"
                    onChange={(e) =>
                      handleInputChange('endDate', e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-custom-white">Time</label>
                <div className="flex flex-row gap-3">
                  <Input
                    className="bg-custom-gray px-4 py-2 h-auto w-auto text-custom-white focus:outline-custom-white rounded-lg"
                    type="time"
                    defaultValue="09:00"
                    onChange={(e) =>
                      handleInputChange('startTime', e.target.value)
                    }
                  />
                  <label className="text-custom-white">_</label>
                  <Input
                    className="bg-custom-gray px-4 py-2 text-custom-white h-auto w-auto focus:outline-custom-white rounded-lg"
                    type="time"
                    defaultValue="10:00"
                    onChange={(e) =>
                      handleInputChange('endTime', e.target.value)
                    }
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
                        selectedCategory === 'Personal'
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
                        selectedCategory === 'Work'
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
                        selectedCategory === 'Health'
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
                        selectedCategory === 'Others'
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
                  onClick={handleSubmit}
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
              <SearchBar onCheckboxToggle={handleCheckboxToggle} />
              <div className="flex flex-col justify-center items-center text-custom-white">
                <p className="text-2xl">Task</p>
                <p className="text-xl">{allTasks.length} tasks</p>
              </div>

              <div className="flex flex-col gap-4 p-4 bg-custom-white rounded-lg">
                {allTasks.map((item, index) => (
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
            <Dialog>
              <DialogTrigger asChild>
                <Button className="px-4 py-2 w-full h-fit inline-flex bg-custom-orange text-custom-white rounded-md hover:bg-custom-orangeHover text-base lg:text-lg">
                  Add
                </Button>
              </DialogTrigger>
              {/* Add Scroll Area */}
              <DialogContent className="w-auto mx-auto max-w-md px-4 pt-16 pb-5 md:pb-5 md:pt-12 flex flex-col gap-8 bg-custom-black h-[700px] overflow-y-auto">
                <div className="flex flex-col items-center gap-4">
                  <Input
                    className="bg-custom-gray p-2 w-full h-auto focus:outline-custom-white rounded-lg text-custom-white lg:text-lg"
                    type="text"
                    placeholder="Title"
                    onChange={(e) => handleInputChange('title', e.target.value)}
                  />
                  <textarea
                    className="bg-custom-gray p-2 w-full min-h-auto focus:outline-custom-white rounded-lg text-custom-white"
                    placeholder="Notes"
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-custom-white lg:text-base">Date</label>
                  <div className="flex flex-row w-full justify-between gap-2">
                    <Input
                      className="bg-custom-gray px-4 py-2 h-auto text-custom-white focus:outline-custom-white rounded-lg lg:text-base"
                      type="date"
                      defaultValue="2023-09-11"
                      onChange={(e) =>
                        handleInputChange('startDate', e.target.value)
                      }
                    />
                    <label className="text-custom-white">_</label>
                    <Input
                      className="bg-custom-gray px-4 py-2 text-custom-white h-auto focus:outline-custom-white rounded-lg lg:text-base"
                      type="date"
                      defaultValue="2023-10-11"
                      onChange={(e) =>
                        handleInputChange('endDate', e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-custom-white lg:text-base">Time</label>
                  <div className="flex flex-row gap-3">
                    <Input
                      className="bg-custom-gray px-4 py-2 h-auto w-auto text-custom-white focus:outline-custom-white rounded-lg lg:text-base"
                      type="time"
                      defaultValue="09:00"
                      onChange={(e) =>
                        handleInputChange('startTime', e.target.value)
                      }
                    />
                    <label className="text-custom-white">_</label>
                    <Input
                      className="bg-custom-gray px-4 py-2 text-custom-white h-auto w-auto focus:outline-custom-white rounded-lg lg:text-base"
                      type="time"
                      defaultValue="10:00"
                      onChange={(e) =>
                        handleInputChange('endTime', e.target.value)
                      }
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
                        selectedCategory === 'Personal'
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
                        selectedCategory === 'Work'
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
                        selectedCategory === 'Health'
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
                          selectedCategory === 'Others'
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
                    onClick={handleSubmit}
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
