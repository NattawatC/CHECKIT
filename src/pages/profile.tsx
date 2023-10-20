'use client'
import { Footer, NavBar } from '@/components/common'
import { MainLayout } from '@/components/layouts'
import { Button } from '@/components/ui/button'
import dataservices from '@/services/dataservices'
import { IoIosInformationCircle } from 'react-icons/io'
import React, { useState } from 'react';
import ChangeName from '@/components/ChangeName'
import ChangeEmail from '@/components/ChangeEmail'


const data = new dataservices()


const Profile = () => {
  const [isHovering, setIsHovering] = useState(false)
  const onMouseEnter = () => setIsHovering(true);
  const onMouseLeave = () => setIsHovering(false);
  return (
    <>
    <div className="bg-custom-black">
      <MainLayout>
        <div className="flex flex-col gap-8">
          <NavBar />
          <div className="flex flex-col items-start font-medium text-custom-white">
            <p className="text-xs">{data.getUserInfo().date}</p>
            <p className="text-xl">See your Profile</p>
          </div>

          <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-5 text-base text-custom-white">
              <p>Name:</p>
              <p>{data.getUserInfo().username}</p>
            </div>
            <ChangeName />
          </div>

          <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-5 text-base text-custom-white">
              <p>Email:</p>
              <p>{data.getUserInfo().email}</p>
            </div>
            <ChangeEmail />
          </div>
          

          <div className="flex flex-col gap-3">
            <div className="flex flex-row gap-4 items-center">
              <p className="text-custom-white text-base font-medium">Done</p>
              <p className="flex flex-row text-custom-white hover:text-custom-orange cursor-pointer items-center gap-2" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                <IoIosInformationCircle />
                {isHovering ? (
                  <span className="text-xs font-medium">This will be delete after 7 days</span>
                ):(
                  <span className="text-custom-black">hidden</span>
                )}
              </p>
              
            </div>
            <div className="flex flex-col rounded-lg gap-2 bg-custom-gray text-custom-white p-4">
              <p>deleted task</p>
              <p>deleted task</p>
            </div>
          </div>
        
        </div>
        
      </MainLayout>
      <Footer className="text-custom-white"/>
    </div>
    </>
    
  )
}

export default Profile