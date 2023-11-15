import { useState } from 'react'
import { Checkbox } from './ui/checkbox'

const filterItems = [
  { name: 'Date' },
  { name: 'Priority' },
  { name: 'Category' },
]

const categoryItems = [
  { name: 'Work' },
  { name: 'Personal' },
  { name: 'Health' },
  { name: 'Others' },
]

export const Filter: React.FunctionComponent = () => {
  const [isCategoryChecked, setIsCategoryChecked] = useState(false)
  const [isChecked, setIsChecked] = useState(false)

  const toggleCategory = () => {
    setIsCategoryChecked(!isCategoryChecked)
  }

  //Function to sent the filter data to the backend
  const handleFilterItemClick = (event: any, itemName: string) => {
    console.log(event.target.checked)
    // if (event.target.checked) {
    // console.log(`Filter Item Clicked: ${itemName}`);
    // }
    // else{
    // console.log(`Filter Item Unchecked: ${itemName}`);
    // }
  }

  return (
    <>
      <div className="flex flex-col bg-custom-white px-4 py-2 rounded-lg">
        <div className="flex flex-col justify-left gap-1">
          {filterItems.map((item) =>
            item.name === 'Category' ? (
              <>
                <div className="flex flex-row items-center justify-left gap-3">
                  <Checkbox
                    className="border-custom-purple data-[state=checked]:bg-custom-purple"
                    checked={isCategoryChecked}
                    onClick={toggleCategory}
                  />
                  <p className="text-base lg:text-xl">{item.name}</p>
                </div>
                {isCategoryChecked && (
                  <div className="flex flex-row justify-between mx-2 bg-custom-white">
                    {categoryItems.map((item) => (
                      <div className="flex flex-row items-center justify-center gap-2">
                        <Checkbox className="border-custom-purple data-[state=checked]:bg-custom-purple" />
                        <p className="text-sm lg:text-lg">{item.name}</p>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-row items-center justify-left gap-3">
                <Checkbox
                  className="border-custom-purple data-[state=checked]:bg-custom-purple"
                  onClick={(e) => handleFilterItemClick(e, item.name)}
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
