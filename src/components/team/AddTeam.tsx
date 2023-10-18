import React from 'react'
import { MainLayout } from '../layouts'
import { IoIosClose } from 'react-icons/io'

const AddTeam = () => {
  return (
    <MainLayout className="flex flex-col bg-custom-black gap-8">
      <div className="flex justify-end">
        <IoIosClose className="text-custom-white text-2xl" />
      </div>
      
    </MainLayout>
  )
}

export default AddTeam
