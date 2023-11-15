import React from 'react'

interface CardProps {
  title: string
  description: string
  Icon: React.ElementType
}

const Card: React.FunctionComponent<CardProps> = ({
  title,
  description,
  Icon,
}) => {
  return (
    <>
      {/* Mobile */}
      <div className="flex flex-col p-4 gap-2 bg-custom-black rounded-2xl lg:hidden">
        <p className="text-custom-white text-center text-xl">{title}</p>
        <p className="text-custom-white text-center text-base">{description}</p>
      </div>
      {/* Desktop */}
      <div className="hidden lg:block">
        <div className="flex flex-col items-center py-8 px-4 gap-2 bg-custom-black rounded-2xl w-64 h-full">
          {Icon && <Icon className="text-custom-white" size={50} />}
          <p className="text-custom-white text-center text-2xl">{title}</p>
          <p className="text-custom-white text-center text-base">
            {description}
          </p>
        </div>
      </div>
    </>
  )
}

export default Card
