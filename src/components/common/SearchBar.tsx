import { Filter } from '@/components/Filter'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { IoFilter } from 'react-icons/io5'
import { searchTask } from '@/services/userServices'
import { useEmail } from '@/components/EmailContext'

interface SearchBarProps {
  onCheckboxToggle: (itemName: string) => void
  onSearch: (searchQuery: string) => void
  updateTasks: (tasks: Task[]) => void
}

export const SearchBar:  React.FC<SearchBarProps> = ({ onCheckboxToggle, onSearch, updateTasks }) => {
  const {email} = useEmail()
  const [isFilter, setIsFilter] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const toggleFilter = () => {
    setIsFilter(!isFilter)
  }

  const handleSearch = async (query: string) => {
    setSearchQuery(query)
    onSearch(query)
    try {
      const results = await searchTask(query, email);
      // Instead of setting search results state, update tasks directly
      updateTasks(results);
    } catch (error) {
      console.error('Error searching task:', error);
    }
  };

  
  return (
    <div className="flex flex-col gap-4">
      <div className="relative w-full">
        <AiOutlineSearch className="absolute top-0 bottom-0 w-6 h-6 my-auto text-custom-white left-3" />
        <Input
          type="text"
          placeholder="Search"
          className="w-full pl-12 pr-12 rounded-lg bg-custom-gray text-custom-white border-custom-white focus-visible:ring-custom-orange focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none lg:text-lg"
          onChange={(e) => handleSearch(e.target.value)}
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
          <Filter onCheckboxToggle={onCheckboxToggle}/>
        </div>
      )}
    </div>
  )
}
