import React from "react";


const ChangeName: React.FunctionComponent = () => {
    return(
        <div className="flex flex-col gap-3 rounded-lg justify-center bg-custom-gray px-2 py-2">
            <p className="text-custom-white text-base font-medium">Change your name</p>
            <div className="flex flex-row gap-5 relative">
                <input type="text" className="bg-custom-gray text-custom-white outline-none border-b border-custom-white w-full" />
                <button className="rounded-lg px-2 bg-custom-orange text-custom-white font-medium text-xs">Save</button>
            </div>
        </div>
    )
}

export default ChangeName