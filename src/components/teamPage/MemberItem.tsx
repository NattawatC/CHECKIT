import React from 'react'
import {RxCross2} from 'react-icons/rx'

interface MemberItemProps {
    email: string
}

const MemberItem : React.FunctionComponent<MemberItemProps> = ({email}) => {
  return (
    <div className='flex flex-row gap-2 px-3 py-2 bg-custom-gray rounded-2xl w-fit items-center '>
        <label className='text-custom-white'>
            {email}
        </label>
        <RxCross2 className='text-custom-white' size='20' />
    </div>
  )
}

export default MemberItem
