import { Checkbox } from "@radix-ui/react-checkbox"

export const DropdownFilter: React.FunctionComponent = () => {
    return (
      <div className="bg-custom-white w-auto h-auto border-radius: 0.5rem; flex">
        <li>
            <Checkbox />
            <p>Date</p>    
        </li>
        
      </div>
    )
  }