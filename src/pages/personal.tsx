'use client'
import { Footer, NavBar, SearchBar } from "@/components/common"
import { MainLayout } from "@/components/layouts"
import TaskItem from "@/components/taskPage/TaskItem"
import {filterByCategory} from "@/services/userServices"
import { NextPage } from "next"

const personal_task = await filterByCategory('Personal')


const Personal: NextPage = () => {
    return(
        <>
        <div className="bg-custom-black">
            <MainLayout>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-8">
                        <NavBar />
                        <SearchBar />
                    </div>
                    <div className="gap-1 items-center flex flex-col text-custom-white font-medium">
                        <p className="text-xl">Personal</p>
                        <p className="text-base">{personal_task.length} Task</p>
                    </div>

                    
                    <div className="flex flex-col gap-4 bg-custom-white rounded-lg p-4">

                        {personal_task.map((item: any,index: any) => (
                            <TaskItem
                            key={index}
                            task_id={item.task_id}
                            priority={item.priority}
                            category={item.category}
                            title={item.title}
                            date_start={item.date_start}
                            date_end={item.date_end}
                            note={item.note}
                            time_start={item.time_start}
                            time_end={item.time_end}
                            role={item.role}
                            status={item.status}
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
export default Personal    