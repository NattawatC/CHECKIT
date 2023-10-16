import dataservices from "@/services/dataservices"

interface UpcomingTaskProps{
    taskNum: number
}

export const UpcomingTask: React.FunctionComponent<UpcomingTaskProps> = ({taskNum}) =>{
    return(
        <button className= "w-full h-full bg-custom-white p-2 rounded-lg flex-col justify-center items-center gap-1 inline-flex">
            <div className="text-custom-black text-base font-medium break-words">
                Upcoming
            </div>
            <div className="text-custom-black text-base font-medium break-words">
                {taskNum} Task
            </div>
        </button>



    )
}