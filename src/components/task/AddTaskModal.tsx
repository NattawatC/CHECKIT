'use client'
import React, { useState } from 'react'
import { IoIosClose } from 'react-icons/io'
import { MainLayout } from '../layouts'
import { Button } from '../ui/button'

const AddTaskModal: React.FunctionComponent = () => {
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
    <MainLayout className="flex flex-col bg-custom-black gap-8">
      <div className="flex justify-end">
        <IoIosClose className="text-custom-white text-2xl" />
      </div>
      <div className="flex flex-col items-center gap-4">
        <input
          className="bg-custom-gray p-2 w-full h-auto focus:outline-custom-white rounded-lg text-custom-white "
          type="text"
          placeholder="Title"
        />
        <textarea
          className="bg-custom-gray p-2 w-full min-h-[172px] focus:outline-custom-white rounded-lg text-custom-white"
          placeholder="Notes"
        />
      </div>
      <div className="flex flex-col gap-3">
        <label className="text-custom-white">Date</label>
        <div className="flex flex-row w-full justify-between">
          <input
            className="bg-custom-gray px-4 py-2 h-auto text-custom-white focus:outline-custom-white rounded-lg"
            type="date"
            placeholder="20/09/2023"
          />
          <label className="text-custom-white">_</label>
          <input
            className="bg-custom-gray px-4 py-2 text-custom-white h-auto focus:outline-custom-white rounded-lg"
            type="date"
            placeholder="21/09/2023"
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
          />
          <label className="text-custom-white">_</label>
          <input
            className="bg-custom-gray px-4 py-2 text-custom-white h-auto w-auto focus:outline-custom-white rounded-lg"
            type="time"
            placeholder="21/09/2023"
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
            `}>
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
              selectedPriority === 'Low' ? 'bg-custom-orange' : 'bg-custom-gray'
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
                isRoleSelected('Team A') ? 'bg-custom-orange' : 'bg-custom-gray'
              }
            >
              Team A
            </Button>
            <Button
              onClick={() => handleRoleClick('Team B')}
              className={
                isRoleSelected('Team B') ? 'bg-custom-orange' : 'bg-custom-gray'
              }
            >
              Team B
            </Button>
          </div>
          <div className="flex flex-row gap-4">
            <Button
              onClick={() => handleRoleClick('Team C')}
              className={
                isRoleSelected('Team C') ? 'bg-custom-orange' : 'bg-custom-gray'
              }
            >
              Team C
            </Button>
            <Button
              onClick={() => handleRoleClick('Team D')}
              className={
                isRoleSelected('Team D') ? 'bg-custom-orange' : 'bg-custom-gray'
              }
            >
              Team D
            </Button>
          </div>
        </section>
      </div>
      <Button className="bg-custom-gray text-custom-white w-full h-auto">
        Add Task
      </Button>
    </MainLayout>
  )
}

export default AddTaskModal
