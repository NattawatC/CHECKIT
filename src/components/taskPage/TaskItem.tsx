import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'

interface TaskProps {
  priority: string // Create Priority function
  title: string
  date: string
  time: string
  note: string[]
}

const TaskItem: React.FunctionComponent<TaskProps> = ({
  priority,
  title,
  date,
  time,
  note,
}) => {
  const [isChecked, setIsChecked] = useState(false)
  const priorityContent = getPriorityContent(priority)

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
            <p className="text-custom-black text-sm">{date}</p>
            <p className="text-custom-black text-sm">{time}</p>
            {note.map((noteItem, index) => (
              <p key={index} className="text-custom-black text-sm">
                {noteItem}
              </p>
            ))}
            <p className="text-custom-black text-sm"></p>
          </div>
        </div>
      </div>
      <Button className="px-2 py-1 text-xs h-fit bg-custom-gray">Edit</Button>
    </div>
  )
}

export default TaskItem
