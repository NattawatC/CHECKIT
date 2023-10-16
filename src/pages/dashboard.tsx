'use client'
import CategoryItem from "@/components/CategoryItem";
import { UpcomingTask } from "@/components/UpcomingTask";
import { Footer, NavBar } from "@/components/common";
import { MainLayout } from "@/components/layouts";
import { NextPage } from "next";

const categories = [
    {
        title: 'Personal',
        taskNum: '10',
    },
    {
        title: 'Work',
        taskNum: '10',
    },
    {
        title: 'Health',
        taskNum: '10',
    },
    {
        title: 'Others',
        taskNum: '10',
    },
]

const Dashboard: NextPage= () => {
    return(
        <div className="bg-custom-black">
            
            <MainLayout>
                <div className="flex-col flex gap-8">
                    <NavBar />  

                    <div className="flex-col justify-center flex text-custom-white font-medium gap-1">
                        <p className="text-xs">Wednesday,Sep 13</p>
                        <p className="text-xl">Welcome, Putthipat</p>   
                    </div>
                    <UpcomingTask />
            
            
                    <div className="grid grid-cols-2 gap-4">
                        {categories.map((category) => (
                    
                            <CategoryItem
                            key={category.title}
                            title={category.title}
                            taskNum ={category.taskNum}        
                            />
                           
                            ))}
                    </div>
                </div>
                

                
                   
            </MainLayout>
            <div className="text-white">
                    <Footer />
            </div>   
            
        </div>
    )
}
export default Dashboard

