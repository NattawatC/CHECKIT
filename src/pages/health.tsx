'use client'
import { Footer, NavBar, SearchBar } from "@/components/common"
import { MainLayout } from "@/components/layouts"
import TaskItem from "@/components/taskPage/TaskItem"
import dataservices from "@/services/dataservices"
import { NextPage } from "next"

const data = new dataservices()
const health_task = data.getAllTaskByCategory('Health')
const health_task_length = health_task.length

const Health: NextPage = () => {
    return(
        <>
        <div className="bg-custom-black">
        <MainLayout>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-8">
                        <NavBar />
                        <SearchBar />
                </div>
                <div className=" gap-1 items-center flex flex-col text-custom-white font-medium">
                    <p className="text-xl">Health</p>
                    <p className="text-base">{health_task_length} Tasks</p>
                </div>

                <div className="flex flex-col gap-4 bg-custom-white rounded-lg p-4">

                    {health_task.map((item,index) => (
                        <TaskItem
                        key={index}
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
        </MainLayout>
        <Footer className="text-custom-white"/>
        </div>
        </>
    )
}

export default Health