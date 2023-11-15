import Link from 'next/link'
import React from 'react'

interface CategoryProps {
  Icon: React.ElementType
  title: string
  taskNum: number
  href?: string
}

const CategoryItem: React.FunctionComponent<CategoryProps> = ({
  Icon,
  title,
  taskNum,
  href,
}) => {
  return (
    <button>
      <Link href={`${href}`}>
        <div className="bg-custom-gray rounded-t-lg text-custom-white px-3 py-2">
          {Icon && <Icon className="h-10 w-9" />}
        </div>
        <div className="flex flex-col bg-custom-white rounded-b-lg p-3 gap-6">
          <div className="text-left">
            <p className="text-custom-black text-xl lg:text-2xl">{title}</p>
          </div>
          <div className="text-right">
            <p className="text-custom-black text-xl lg:text-2xl">{taskNum}</p>
          </div>
        </div>
      </Link>
    </button>
  )
}

export default CategoryItem
