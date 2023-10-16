'use client'
import { NavBar, SearchBar } from "@/components/common"
import { MainLayout } from "@/components/layouts"
import { NextPage } from "next"
import dataservices from "@/services/dataservices"

const data = new dataservices()
const taskNum = data.getUserInfo()


const Personal: NextPage = () => {
    return(
        <div className="bg-custom-black">
            <MainLayout>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-8">
                        <NavBar />
                        <SearchBar />
                    </div>
                    <div className="gap-1 items-center flex flex-col text-custom-white font-medium">
                        <p className="text-xl">Personal</p>
                        <p className="text-base">{}</p>
                    </div>
                </div>
            </MainLayout>

        </div>
    )
}
export default Personal    