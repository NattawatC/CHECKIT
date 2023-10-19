'use client'
import { Button } from "@/components/ui/button"
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


export function DialogChangeName() {
  const [name,setName] = useState('');

  const handleSaveClick = () => {
    console.log('Name:', name);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="px-4 py-1 text-xs h-fit bg-custom-gray">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-custom-gray rounded-lg">
        <DialogHeader>
          <DialogTitle className="flex text-custom-white items-start">Change your name</DialogTitle>
        </DialogHeader>
        <div className="flex flex-row gap-5 relative">
                <input type="text" value={name} onChange={handleInputChange} className="bg-custom-gray text-custom-white outline-none border-b border-custom-white w-full" />
                <button onClick={handleSaveClick} className="rounded-lg px-2 bg-custom-orange text-custom-white font-medium text-xs">Save</button>
        </div>
    
      </DialogContent>
    </Dialog>
  )
}
export default DialogChangeName









