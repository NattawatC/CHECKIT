import React from 'react'
import { Button } from '../ui/button'

interface TeamProps {
  teamName: string
  members: {
    name: string
    status: string
  }[]
}

const TeamItem: React.FunctionComponent<TeamProps> = ({
  teamName,
  members,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row justify-between items-center">
        <p className="text-custom-white text-xl">{teamName}</p>
        <Button className="px-2 py-1 text-xs h-fit bg-custom-gray">Edit</Button>
      </div>
      <div className="flex flex-col rounded-lg bg-custom-white px-4 py-2">
        <div className="flex flex-col gap-3 justify-between">
          {members.map((item, index) => (
            <div className="flex flex-row justify-between items-center">
              <p key={index} className="text-custom-black text-base">
                {item.name}
              </p>
              {item.status === 'Pending' ? (
                <p className="bg-custom-gray px-3 py-2 text-xs rounded-2xl text-custom-white">
                  {item.status}
                </p>
              ) : (
                <p className="bg-custom-purple px-3 py-2 text-xs rounded-2xl text-custom-white">
                  {item.status}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default TeamItem
