'use client'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { useEmail } from '@/components/EmailContext'
import { IoIosNotifications } from 'react-icons/io'
import { useEffect, useState } from 'react'
import { addMemberToTeam, checkTeamPendingOfUser, removeMemberFromTeam } from '@/services/teamServices'
import { useRouter } from 'next/router'



export function Notification() {
  const {email} = useEmail();
  const { toast, toasts } = useToast()
  const [notification, setNotification] = useState([])
  const router = useRouter()
  
  const notiLength = notification.length

  const handleAccept = async (team_id: number) => {
    try{
      await addMemberToTeam(team_id, email)
      router.reload()
    }
    catch(error){
      console.log(error);
    }
  }

  const handleDecline = async (team_id: number) => {
    try{
      await removeMemberFromTeam(team_id, email)
      router.reload()
    }
    catch(error){
      console.log(error);
    }
  }

  const fetchNotification = async () => {
    try{
      const res = await checkTeamPendingOfUser(email)
      setNotification(res)
    }
    catch(error){
      console.log(error);
    }
  }

  useEffect(() => {
    fetchNotification()
  }, [])

  return (
    <Button
      onClick={() => {
        // toast({
        //   title: 'Uh oh! Something went wrong.',
        //   description: 'There was a problem with your request.',
        //   action: (
        //     <div className='flex flex-col items-center gap-2'>
        //         <Button className='bg-custom-orange text-xs w-fit rounded-lg'>ACCEPT</Button>
        //         <Button className='bg-custom-gray text-xs w-fit rounded-lg'>DECLINE</Button>
        //     </div>
        //   ),
        // })
        notification.forEach((item) => {
          toast({
            title: item.name,
            description: item.owner,
            action: (
              <div className='flex flex-col items-center gap-2'>
                <Button className='bg-custom-orange text-xs w-fit rounded-lg' onClick={() => handleAccept(item.team_id)}>ACCEPT</Button>
                <Button className='bg-custom-gray text-xs w-fit rounded-lg' onClick={() => handleDecline(item.team_id)}>DECLINE</Button>
              </div>
            ),
          });
        });
      }}
      className="bg-transparent p-0 w-auto h-auto"
    >
      <IoIosNotifications
        size={25}
        className={notiLength === 1 ? 'text-custom-orange' : 'text-custom-white'}
      />
    </Button>
  )
}
