'use client'
import { NavBar, SearchBar } from "@/components/common"
import { MainLayout } from "@/components/layouts"
import dataservices from "@/services/dataservices"
import { NextPage } from "next"

const data = new dataservices()
const taskNum = data.getUserInfo()
const personal_task = data.getAllTaskByCategory("Personal")
console.log(personal_task)

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
                        {/* <p className="text-base">{personal_task} Task</p> */}
                    </div>
                </div>
            </MainLayout>
        </div>
        </>
    )
}
export default Personal    