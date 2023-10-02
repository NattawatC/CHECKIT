import { PiSuitcaseSimpleLight } from 'react-icons/pi'

export const CategoryItemPersonal: React.FunctionComponent = () =>{
    return(
        <div className="w-[164px] h-[164px] relative">
            <div className="w-[164px] h-[62.05px] left-0 top-0 absolute bg-custom-black rounded-t-lg"></div>
            <div className="w-[164px] h-[101.95px] left-0 top-[62.05px] absolute bg-custom-white rounded-t-lg"></div>
            <div className="left-[13.30px] top-[70.92px] absolute text-custom-black text-xl font-medium break-words">Personal</div>
            <div className="w-[23.27px] h-[28.81] left-[127.43px] top-[121.89px] absolute text-custom-black text-xl font-medium break-words">10</div>
            <PiSuitcaseSimpleLight className="w-[44.32px] h-[44.32px] left-[13.30px] top-[8.86px] absolute text-custom-white" />

        </div>


    )
}