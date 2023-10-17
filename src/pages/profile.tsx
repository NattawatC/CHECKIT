import { Footer, NavBar } from '@/components/common'
import { MainLayout } from '@/components/layouts'
import { Button } from '@/components/ui/button'
import dataservices from '@/services/dataservices'

const data = new dataservices()



const Profile = () => {
  return (
    <>
    <div className="bg-custom-black">
      <MainLayout>
        <div className="flex flex-col gap-8">
          <NavBar />
          <div className="flex flex-col items-start font-medium text-custom-white">
            <p className="text-xs">{data.getUserInfo().date}</p>
            <p className="text-xl">See your Profile</p>
          </div>

          <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-5 text-base text-custom-white">
              <p>Name:</p>
              <p>{data.getUserInfo().username}</p>
            </div>
            <Button className="px-2 py-1 text-xs h-fit bg-custom-gray">Edit</Button>
            </div>
            
        </div>
      </MainLayout>
      <Footer className="text-custom-white"/>
    </div>
    </>
    
  )
}

export default Profile