'use client'
import { MainLayout } from "@/components/layouts";
import { NextPage } from "next";

export default function Dashboard() {
    return(
        <>
            <div className="w-full h-full pl-4 pr-4 flex-col justify-start items-start gap-8 inline-flex bg-custom-black">
                <div className="self-stretch justify-start items-start gap-[18px] inline-flex">
                    <div className="flex-col justify-start items-start gap-2.5 inline-flex">
                        <div className="flex-col justify-center items-start gap-1 flex">
                            <div className="text-custom-white text-xs font-medium break-words">Wednesday,Sep13</div>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi, fuga error. Et praesentium iste at obcaecati perferendis inventore voluptas, quo ducimus necessitatibus iusto facere laborum officiis doloremque assumenda? Maxime, labore?</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

