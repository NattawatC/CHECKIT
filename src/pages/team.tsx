import { Footer, NavBar } from '@/components/common'
import { MainLayout } from '@/components/layouts'
import TeamItem from '@/components/teamPage/TeamItem'
import { Button } from '@/components/ui/button'
import dataservices from '@/services/dataservices'
import { NextPage } from 'next'
import { Input } from '@/components/ui/input'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import MemberItem from '@/components/teamPage/MemberItem'

//hard code the email example (MemberItem)
const features = [
  {
    email: 'Easy to use for people who are asdasdaas',
  },
  {
    email: 'Trusted App',
  },
  {
    email: 'Sharing',
  },
  {
    email: '100% Free',
  },
]

const data = new dataservices()
const team_info = data.getAllTeamOfUser()

const Team: NextPage = () => {
  return (
    <div className="bg-custom-black h-max-screen">
      <MainLayout>
        <div className="flex flex-col gap-8">
          <NavBar />
          <div className="flex flex-col gap-1 text-custom-white font-medium">
            <p className="text-xs">{data.getUserInfo().date}</p>
            <p className="text-xl">See all your Team</p>
          </div>

          <div className="flex flex-col gap-4">
            {team_info.map((item) => (
              <TeamItem
                key={item.id}
                teamName={item.name}
                members={item.members}
              />
            ))}
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="rounded-lg text-custom-white border-custom-orange w-full py-2 px-4 bg-custom-orange hover:bg-custom-orangeHover text-base inline-flex"
              >
                Create
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] flex flex-col gap-8 mx-auto w-full max-w-md px-4 py-14 md:py-24 bg-custom-black ">
              <DialogHeader>
                <DialogTitle className="text-custom-white text-left">
                  Collaborate with Friends
                </DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-5">
                <label className="text-custom-white">Team Name</label>
                <Input
                  className="bg-custom-black p-2 w-full h-auto text-custom-white outline-none border-b border-x-0 border-t-0 rounded-none"
                  type="text"
                  placeholder="Placeholder text"
                />
              </div>
              <div className="flex flex-col gap-4 w-full">
                <label className="text-custom-white">Email</label>
                <div className="flex flex-row gap-5">
                  <Input
                    className="bg-custom-black p-2 w-full h-auto text-custom-white outline-none border-b border-x-0 border-t-0 rounded-none"
                    type="text"
                    placeholder="abc@gmail.com"
                  />
                  <Button className="rounded-lg text-custom-white border-custom-orange py-1 px-4 bg-custom-orange hover:bg-custom-orangeHover inline-flex">
                    Add
                  </Button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {features.map((feature) => (
                  <MemberItem key={feature.email} email={feature.email} />
                ))}
              </div>
              <Button className="rounded-lg text-custom-white w-full bg-custom-gray inline-flex hover:bg-custom-orangeHover">
                Finish Construct
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      </MainLayout>
      <Footer className="text-custom-white" />
    </div>
  )
}

export default Team
