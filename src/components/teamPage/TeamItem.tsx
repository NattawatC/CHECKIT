import React from 'react'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { Input } from '../ui/input'

interface TeamProps {
  teamName: string
  members: {
    team_id: number
    email: string
    user_status: string
  }[]
}

const TeamItem: React.FunctionComponent<TeamProps> = ({
  teamName,
  members,
}) => {
  return (
    <div className="flex flex-col gap-2 lg:gap-4">
      <div className="flex flex-row justify-between items-center">
        <p className="text-custom-white text-xl">{teamName}</p>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="rounded-lg text-custom-white border-custom-gray px-2 py-1 text-xs h-fit bg-custom-gray inline-flex lg:text-base">
              Edit
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] flex flex-col gap-8 mx-auto w-full max-w-md px-4 py-14 md:py-24 bg-custom-black lg:gap-12">
            <div className="flex flex-col gap-5">
              <label className="text-custom-white lg:text-base">New Team Name</label>
              <Input
                className="bg-custom-black p-2 w-full h-auto text-custom-white outline-none border-b border-x-0 border-t-0 rounded-none lg:text-base ring-offset-white focus-within:rounded"
                type="text"
                placeholder="Placeholder text"
              />
            </div>
            <div className="flex flex-col gap-4 w-full">
              <label className="text-custom-white lg:text-base">Email</label>
              <div className="flex flex-row gap-5">
                <Input
                  className="bg-custom-black p-2 w-full h-auto text-custom-white outline-none border-b border-x-0 border-t-0 rounded-none lg:text-base ring-offset-white focus-within:rounded"
                  type="text"
                  placeholder="abc@gmail.com"
                />
                <Button
                  className="rounded-lg text-custom-white border-custom-orange py-1 px-4 bg-custom-orange inline-flex
                hover:bg-custom-orangeHover lg:text-base"
                >
                  Add
                </Button>
              </div>
            </div>
            <div className="flex flex-row gap-8 justify-between lg:gap-4">
              <Button className="rounded-lg text-custom-white w-full bg-custom-gray inline-flex hover:bg-custom-orangeHover lg:text-base">
                Delete Team
              </Button>
              <Button className="rounded-lg text-custom-white w-full bg-custom-purple inline-flex hover:bg-custom-purpleHover lg:text-base">
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex flex-col rounded-lg bg-custom-white px-4 py-2">
        <div className="flex flex-col gap-3 justify-between">
          {members.map((item, index) => (
            <div className="flex flex-row justify-between items-center">
              <p key={index} className="text-custom-black text-base lg:text-lg">
                {item.email}
              </p>
              {item.user_status === "Pending" ? (
                <p className="bg-custom-gray px-3 py-2 text-xs rounded-2xl text-custom-white lg:text-base">
                  {item.user_status}
                </p>
              ) : (
                <p className="bg-custom-purple px-3 py-2 text-xs rounded-2xl text-custom-white lg:text-base">
                  {item.user_status}
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
