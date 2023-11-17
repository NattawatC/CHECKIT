import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
import { Input } from '../ui/input'
import { getAllTaskOfUser } from '@/services/userServices'

const data = await getAllTaskOfUser()

interface TaskProps {
  priority: string // Create Priority function
  task_id: number
  title: string
  date_start: string
  date_end: string
  time_start: string
  time_end: string
  note: string
}

const TaskItem: React.FunctionComponent<TaskProps> = ({
  task_id,
  priority,
  title,
  date_start,
  date_end,
  time_start,
  time_end,
  note,
}) => {
  const [isChecked, setIsChecked] = useState(false)
  const priorityContent = getPriorityContent(priority)

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

  const [dateStart, setDateStart] = useState(date_start)

  //Checkbox state
  const toggleCheckbox = () => {
    setIsChecked(!isChecked)
  }

  // Determine the content to display for the priority
  function getPriorityContent(priority: string): string {
    switch (priority) {
      case 'High' || 'high':
        return '!!!'
      case 'Medium' || 'medium':
        return '!!'
      case 'Low' || 'low':
        return '!'
      default:
        return priority
    }
  }

  return (
    <div className="flex flex-row justify-between bg-custom-white">
      <div className="flex flex-row gap-5">
        <Checkbox
          className="border-custom-purple data-[state=checked]:bg-custom-purple lg:h-5 lg:w-5"
          checked={isChecked}
          onClick={toggleCheckbox}
        />
        <div className="flex flex-col gap-2">
          {isChecked ? (
            <span className="flex flex-row gap-2 text-base/4 lg:text-xl/5 font-medium">
              <p className="text-custom-orange">{priorityContent}</p>
              <p className="text-custom-black line-through">{title}</p>
            </span>
          ) : (
            <span className="flex flex-row gap-2 text-base/4 lg:text-xl/5 font-medium">
              <p className="text-custom-orange">{priorityContent}</p>
              <p className="text-custom-black">{title}</p>
            </span>
          )}
          <div className="flex flex-col rounded-2xl text-left text-sm lg:text-lg">
            <p className="text-custom-black">
              {date_start} - {date_end}
            </p>
            <p className="text-custom-black">
              {time_start} - {time_end}
            </p>
            <p className="text-custom-black">{note}</p>
            <p className="text-custom-black"></p>
          </div>
        </div>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="px-2 py-1 text-xs h-fit bg-custom-gray text-custom-white lg:text-base rounded-md "
            // onClick={() => data.getTaskInfo(id)}
          >
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent className="w-auto mx-auto max-w-md px-4 pt-16 pb-5 md:pb-5 md:pt-12 flex flex-col gap-5 bg-custom-black">
          <div className="flex flex-col items-center gap-4">
            <Input
              className="bg-custom-gray p-2 w-full h-auto focus:outline-custom-white rounded-lg text-custom-white  lg:text-base"
              type="text"
              placeholder="Title"
              defaultValue={title}
            />
            <textarea
              className="bg-custom-gray p-2 w-full min-h-auto focus:outline-custom-white ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-lg text-custom-white  lg:text-base"
              placeholder="Notes"
              defaultValue={note}
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-custom-white lg:text-base">Date</label>
            <div className="flex flex-row w-full justify-between gap-2">
              <Input
                className="bg-custom-gray px-4 py-2 h-auto text-custom-white focus:outline-custom-white rounded-lg lg:text-base"
                type="date"
                defaultValue="2023-09-20"
              />
              <label className="text-custom-white lg:text-base">_</label>
              <Input
                className="bg-custom-gray px-4 py-2 text-custom-white h-auto focus:outline-custom-white rounded-lg lg:text-base"
                type="date"
                defaultValue="2023-09-21"
              />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-custom-white lg:text-base">Time</label>
            <div className="flex flex-row gap-3">
              <Input
                className="bg-custom-gray px-4 py-2 h-auto w-auto text-custom-white focus:outline-custom-white rounded-lg lg:text-base"
                type="time"
                defaultValue="10:00"
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
            <label className="text-custom-white lg:text-base">Priority</label>
            <div className="flex flex-row gap-4">
              <Button
                onClick={() => handlePriorityClick('High')}
                className={`
            ${
              selectedPriority === 'High'
                ? 'bg-custom-orange hover:bg-none'
                : 'bg-custom-gray'
            } 
            rounded-md lg:text-base`}
              >
                High
              </Button>
              <Button
                onClick={() => handlePriorityClick('Medium')}
                className={`${
                  selectedPriority === 'Medium'
                    ? 'bg-custom-orange'
                    : 'bg-custom-gray'
                } rounded-md lg:text-base`}
              >
                Medium
              </Button>
              <Button
                onClick={() => handlePriorityClick('Low')}
                className={`${
                  selectedPriority === 'Low'
                    ? 'bg-custom-orange'
                    : 'bg-custom-gray'
                }
                rounded-md lg:text-base`}
              >
                Low
              </Button>
              <Button
                onClick={() => handlePriorityClick('None')}
                className={`${
                  selectedPriority === 'None'
                    ? 'bg-custom-orange'
                    : 'bg-custom-gray'
                } rounded-md lg:text-base`}
              >
                None
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-custom-white lg:text-base">Category</label>
            <section className="flex flex-col gap-4">
              <div className="flex flex-row gap-4">
                <Button
                  onClick={() => handleCategoryClick('Personal')}
                  className={`${
                    isCategorySelected('Personal')
                      ? 'bg-custom-orange'
                      : 'bg-custom-gray'
                  } rounded-md lg:text-base`}
                >
                  Personal
                </Button>
                <Button
                  onClick={() => handleCategoryClick('Work')}
                  className={`${
                    isCategorySelected('Work')
                      ? 'bg-custom-orange'
                      : 'bg-custom-gray'
                  } rounded-md lg:text-base`}
                >
                  Work
                </Button>
                <Button
                  onClick={() => handleCategoryClick('Health')}
                  className={`${
                    isCategorySelected('Health')
                      ? 'bg-custom-orange'
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
          <DialogFooter className="flex flex-row gap-8 justify-between lg:gap-4">
            <Button
              type="submit"
              className="bg-custom-gray text-custom-white w-full hover:bg-custom-orangeHover rounded-md lg:text-base"
            >
              Delete
            </Button>
            <Button
              type="submit"
              className="bg-custom-purple text-custom-white w-full hover:bg-custom-purpleHover rounded-md lg:text-base"
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default TaskItem
