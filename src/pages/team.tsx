import { Footer, NavBar } from '@/components/common'
import { MainLayout } from '@/components/layouts'
import TeamItem from '@/components/teamPage/TeamItem'
import { Button } from '@/components/ui/button'
import dataservices from '@/services/dataservices'
import { NextPage } from 'next'

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
          <Button className="w-full py-2 px-4 bg-custom-orange hover:bg-custom-orangeHover text-base inline-flex">
            Create
          </Button>
        </div>
      </MainLayout>
      <Footer className="text-custom-white" />
    </div>
  )
}

export default Team
