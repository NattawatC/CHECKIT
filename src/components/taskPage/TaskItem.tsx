import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
import dataservices from '@/services/dataservices'

const data = new dataservices()

interface TaskProps {
  priority: string // Create Priority function
  id: string
  title: string
  date_start: string
  date_end: string
  time_start: string
  time_end: string
  note: string
}

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

const TaskItem: React.FunctionComponent<TaskProps> = ({
  id,
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

  const [dateStart, setDateStart] = useState(date_start);

  //Checkbox state
  const toggleCheckbox = () => {
    setIsChecked(!isChecked)
  }

  // Determine the content to display for the priority
  function getPriorityContent(priority: string): string {
    switch (priority) {
      case 'high' || 'High':
        return '!!!'
      case 'medium' || 'Medium':
        return '!!'
      case 'low' || 'Low':
        return '!'
      default:
        return priority
    }
  }

  return (
    <div className="flex flex-row justify-between bg-custom-white">
      <div className="flex flex-row gap-5">
        <Checkbox
          className="border-custom-purple data-[state=checked]:bg-custom-purple"
          checked={isChecked}
          onClick={toggleCheckbox}
        />
        <div className="flex flex-col gap-2">
          {isChecked ? (
            <span className="flex flex-row gap-2 text-base/4">
              <p className="text-custom-orange">{priorityContent}</p>
              <p className="text-custom-black line-through">{title}</p>
            </span>
          ) : (
            <span className="flex flex-row gap-2 text-base/4">
              <p className="text-custom-orange">{priorityContent}</p>
              <p className="text-custom-black">{title}</p>
            </span>
          )}
          <div className="flex flex-col rounded-2xl text-left">
            <p className="text-custom-black text-sm">
              {date_start} - {date_end}
            </p>
            <p className="text-custom-black text-sm">
              {time_start} - {time_end}
            </p>
            <p className="text-custom-black text-sm">{note}</p>
            <p className="text-custom-black text-sm"></p>
          </div>
        </div>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="px-2 py-1 text-xs h-fit bg-custom-gray text-custom-white"
            onClick={() => data.getTaskInfo(id)}
          >
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent className="w-auto mx-auto max-w-md px-4 py-12 md:py-12 flex flex-col gap-5 bg-custom-black">
          <div className="flex flex-col items-center gap-4">
            <input
              className="bg-custom-gray p-2 w-full h-auto focus:outline-custom-white rounded-lg text-custom-white "
              type="text"
              placeholder="Title"
              defaultValue={title}
            />
            <textarea
              className="bg-custom-gray p-2 w-full min-h-auto focus:outline-custom-white rounded-lg text-custom-white"
              placeholder="Notes"
              defaultValue={note}
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
              {/* <p className='text-custom-white'> {date_start}</p> */}
              <label className="text-custom-white">_</label>
              <input
                className="bg-custom-gray px-4 py-2 text-custom-white h-auto focus:outline-custom-white rounded-lg"
                type="date"
                placeholder="21/09/2023"
                defaultValue={date_end}
              />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-custom-white">Time</label>
            <div className="flex flex-row gap-3">
              <input
                className="bg-custom-gray px-4 py-2 h-auto w-auto text-custom-white focus:outline-custom-white rounded-lg"
                type="time"
                placeholder="20/09/2023"
                defaultValue={time_start}
              />
              <label className="text-custom-white">_</label>
              <input
                className="bg-custom-gray px-4 py-2 text-custom-white h-auto w-auto focus:outline-custom-white rounded-lg"
                type="time"
                placeholder="21/09/2023"
                defaultValue={time_end}
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
          <DialogFooter className="flex flex-row gap-8 justify-between">
            <Button
              type="submit"
              className="bg-custom-gray text-custom-white w-full"
            >
              Delete
            </Button>
            <Button
              type="submit"
              className="bg-custom-purple text-custom-white w-full"
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
