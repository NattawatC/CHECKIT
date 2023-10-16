'use client'
import CategoryItem from "@/components/CategoryItem";
import { UpcomingTask } from "@/components/UpcomingTask";
import { Footer, NavBar } from "@/components/common";
import { MainLayout } from "@/components/layouts";
import dataservices from "@/services/dataservices";
import { NextPage } from "next";
import { BsHeartPulse, BsPerson } from 'react-icons/bs';
import { PiSuitcaseSimpleLight } from 'react-icons/pi';
import {PiDotsThreeCircleLight} from 'react-icons/pi'
import Link from "next/link";

const data = new dataservices()
const taskNum = data.getUserInfo()

const categories = [
    {
        icon: BsPerson,
        title: 'Personal',
        taskNum: taskNum.personal_task.length,
    },
    {
        icon: PiSuitcaseSimpleLight,
        title: 'Work',
        taskNum: taskNum.work_task.length,
    },
    {
        icon: BsHeartPulse,
        title: 'Health',
        taskNum: taskNum.health_task.length,
    },
    {
        icon: PiDotsThreeCircleLight,
        title: 'Others',
        taskNum: taskNum.others_task.length,
    },
]

const Dashboard: NextPage= () => {
    return(
        <div className="bg-custom-black">
            
            <MainLayout>
                <div className="flex-col flex gap-8">
                    <NavBar />  

                    <div className="flex-col justify-center flex text-custom-white font-medium gap-1">
                        <p className="text-xs">{data.getUserInfo().date}</p>
                        <p className="text-xl">Welcome, {data.getUserInfo().username}</p>   
                    </div>
                    <UpcomingTask 
                    taskNum = {taskNum.upcoming_task.length}/>
            
            
                    <button className="grid grid-cols-2 gap-4">
                        {categories.map((category) => (
                    
                            <CategoryItem
                                key={category.title}
                                Icon={category.icon}  
                                title={category.title}
                                taskNum={category.taskNum}           
                             />
                           
                            ))}
                    </button>
                </div>
                

                
                   
            </MainLayout>
                    <Footer className="text-custom-white"/>
            
        </div>
    )
}
export default Dashboard

