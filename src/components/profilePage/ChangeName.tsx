'use client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { editUserProfile } from '@/services/userServices';
import { useState } from 'react'

interface DialogChangeNameProps {
  onSaveName: (name: string) => void; // Define the type for onSaveName
}

export function DialogChangeName({ onSaveName }: DialogChangeNameProps) {
  const [name, setName] = useState('');

  const handleUsername = () => {
    console.log(name);
    onSaveName(name); // Pass the entered name to the parent component
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="px-2 py-1 text-xs h-fit bg-custom-gray rounded-md lg:text-base">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-custom-gray rounded-lg">
        <DialogHeader>
          <DialogTitle className="flex text-custom-white items-start lg:text-lg">
            Change your name
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-row gap-5 relative">
          <input
            type="text"
            className="bg-custom-gray text-custom-white outline-none border-b border-custom-white w-full lg:text-lg"
            onChange={(e) => setName(e.target.value)}
          />
          <button
            className="rounded-lg px-2 bg-custom-orange text-custom-white font-medium text-xs lg:text-base"
            onClick={handleUsername}
          >
            Save
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
export default DialogChangeName
