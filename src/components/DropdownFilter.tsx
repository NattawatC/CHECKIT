import { Checkbox } from "./ui/checkbox"


export const DropdownFilter: React.FunctionComponent = () => {
    return (
        //no font apply yet
      <div className="bg-custom-white w-full h-full border-radius: 0.5rem; flex-col p-2 justify-center items-start gap-1 inline-flex ">

        <div className= "self-stretch justify-start gap-2.5 inline-flex items-center">
            <Checkbox />
            <div className="flex-col justify-start inline-flex gap-2.5">
                <div className="text-custom-black text-base font-medium break-words">Dates</div>
            </div>
        </div>

        <div className= "self-stretch justify-start items-center gap-2.5 inline-flex">
            <Checkbox />
            <div className="flex-col justify-start items-start inline-flex gap-2.5">
                <div className="text-custom-black text-base font-medium break-words">Priority</div>
            </div>
        </div>

        <div className= "self-stretch justify-start items-center gap-2.5 inline-flex">
            <Checkbox />
            <div className="flex-col justify-start items-start inline-flex gap-2.5">
                <div className="text-custom-black text-base font-medium break-words">Category</div>
            </div>
        </div>
        {/* bottom */}
        <div className="self-stretch justify-center items-center gap-2 inline-flex p-1">

            <div className="w-auto justify-start items-center gap-2.5 inline-flex">
                <Checkbox />
                <div className="flex-col justify-start items-center gap-2.5 inline-flex">
                    <div className="text-custom-black text-xs font-medium break-words">Work</div>
                </div>
            </div>

            <div className="w-auto justify-start items-center gap-2.5 inline-flex">
                <Checkbox />
                <div className="flex-col justify-start items-center gap-2.5 inline-flex">
                    <div className="text-custom-black text-xs font-medium break-words">Personal</div>
                </div>
            </div>

            <div className="w-auto justify-start items-center gap-2.5 inline-flex">
                <Checkbox />
                <div className="flex-col justify-start items-center gap-2.5 inline-flex">
                    <div className="text-custom-black text-xs font-medium break-words">Health</div>
                </div>
            </div>

            <div className="w-auto justify-start items-center gap-2.5 inline-flex">
                <Checkbox />
                <div className="flex-col justify-start items-center gap-2.5 inline-flex">
                    <div className="text-custom-black text-xs font-medium break-words">Others</div>
                </div>
            </div>

        </div>
        
      </div>
    )
  }