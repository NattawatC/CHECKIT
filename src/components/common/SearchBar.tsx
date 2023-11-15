import { Filter } from '@/components/Filter'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { IoFilter } from 'react-icons/io5'

export const SearchBar: React.FC = () => {
  const [isFilter, setIsFilter] = useState(false)

  const toggleFilter = () => {
    setIsFilter(!isFilter)
  }
  return (
    <div className="flex flex-col gap-4 px-20">
      <div className="relative w-full">
        <AiOutlineSearch className="absolute top-0 bottom-0 w-6 h-6 my-auto text-custom-white left-3" />
        <Input
          type="text"
          placeholder="Search"
          className="w-full pl-12 pr-12 rounded-lg bg-custom-gray text-custom-white border-custom-white focus-visible:ring-custom-orange focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none lg:text-lg"
        />
        <Button
          className="absolute top-0 bottom-0 my-auto bg-transparent right-0 focus:bg-transparent"
          onClick={toggleFilter}
        >
          <IoFilter className="w-6 h-6" />
        </Button>
      </div>
      {isFilter && (
        <div>
          <Filter />
        </div>
      )}
    </div>
  )
}
