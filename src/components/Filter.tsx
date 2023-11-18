import { useState } from 'react'
import { Checkbox } from './ui/checkbox'

const filterItems = [
  { id: 'date', name: 'Date' },
  { id: 'priority', name: 'Priority' },
  { id: 'category', name: 'Category' },
]

const categoryItems = [
  { id: 'work', name: 'Work' },
  { id: 'personal', name: 'Personal' },
  { id: 'health', name: 'Health' },
  { id: 'others', name: 'Others' },
]

interface FilterProps {
  onCheckboxToggle: (itemName: string) => void
}

export const Filter: React.FunctionComponent<FilterProps> = ({
  onCheckboxToggle,
}) => {
  const [isOpenCategoryChecked, setOpenIsCategoryChecked] = useState(true)
  const [isChecked, setIsChecked] = useState(true)
  const [isCategoryChecked, setCategoryIsChecked] = useState(true)

  const openCategoryBox = () => {
    setOpenIsCategoryChecked(!isOpenCategoryChecked)
    console.log(isOpenCategoryChecked)
  }

  const toggleCategory = (itemName: string) => {
    setCategoryIsChecked(!isCategoryChecked)
    if (isCategoryChecked) {
      onCheckboxToggle(itemName)
    }
    else{
      onCheckboxToggle('')
    }
  }

  const toggle = (itemName: string) => {
    setIsChecked(!isChecked)
    if (isChecked) {
      onCheckboxToggle(itemName)
    }
    else{
      onCheckboxToggle('')
    }
  }

  //Function to sent the filter data to the backend

  return (
    <>
      <div className="flex flex-col bg-custom-white px-4 py-2 rounded-lg">
        <div className="flex flex-col justify-left gap-1">
          {filterItems.map((item) =>
            item.name === 'Category' ? (
              <>
                <div
                  className="flex flex-row items-center justify-left gap-3"
                  key={item.id}
                >
                  <Checkbox
                    className="border-custom-purple data-[state=checked]:bg-custom-purple"
                    checked={isOpenCategoryChecked}
                    onClick={openCategoryBox}
                  />
                  <p className="text-base lg:text-xl">{item.name}</p>
                </div>
                {isOpenCategoryChecked && (
                  <div className="flex flex-row justify-between mx-2 bg-custom-white">
                    {categoryItems.map((item) => (
                      <div
                        className="flex flex-row items-center justify-center gap-2"
                        key={item.id}
                      >
                        <Checkbox
                          className="border-custom-purple data-[state=checked]:bg-custom-purple"
                          onClick={() => toggleCategory(item.name)}
                        />
                        <p className="text-sm lg:text-lg">{item.name}</p>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div
                className="flex flex-row items-center justify-left gap-3"
                key={item.id}
              >
                <Checkbox
                  className="border-custom-purple data-[state=checked]:bg-custom-purple"
                  onClick={() => toggle(item.name)}
                />
                <p className="text-base lg:text-xl">{item.name}</p>
              </div>
            )
          )}
        </div>
      </div>
    </>
  )
}
