import { PiSuitcaseSimpleLight } from 'react-icons/pi'
import React from 'react'

interface CategoryProps{
    icon?: string
    title: string
    taskNum: string
}

const CategoryItem: React.FunctionComponent<CategoryProps> = ({icon,title,taskNum}) => {
    return(    
        <div className="flex-col flex w-full">
            <div className="bg-custom-gray rounded-t-lg text-custom-white w-[164px] h-[62px]">
               Icon
            </div>
            <div className="bg-custom-white rounded-b-lg w-[164px] h-[102px] relative">
                <p className="text-custom-black text-xl">{title}</p>
                <div className="absolute bottom-0 right-2">
                 <p className="text-custom-black text-xl">{taskNum}</p>
                </div>

            </div>
        </div>
            


    )
}

export default CategoryItem