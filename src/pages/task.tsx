import { DropdownFilter } from '@/components/DropdownFilter'
import { Navbar } from '@/components/common'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AiOutlineSearch } from 'react-icons/ai'

export default function SearchBar() {
  return (
    <>
        <Navbar />
      <div className="relative w-80">
        <AiOutlineSearch className="absolute top-0 bottom-0 w-6 h-6 my-auto text-custom-white left-3" />
        <Input
          type="text"
          placeholder="Search"
          className="pl-12 pr-12 rounded-lg bg-custom-gray text-custom-white border-custom-white focus-visible:ring-custom-orange focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        />
        <Button className="absolute top-0 bottom-0 w-6 h-6 my-auto text-custom-orange bg-transparent right-3">
          <AiOutlineSearch className="text-custom-white" />
        </Button>
      </div>
      <DropdownFilter />
    </>
  )
}
