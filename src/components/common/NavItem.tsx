import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

interface NavItemProps {
  Icon: React.ElementType
  href: string
  text: string
  active: string
}

export const NavItem: React.FC<NavItemProps> = ({
  href,
  text,
  active,
  Icon,
}) => {
  return (
    <>
      {/* Mobile */}
      <Link className="text-custom-white lg:hidden" href={href}>
        <Button className={`text-base ${active} rounded-md`}>{text}</Button>
      </Link>
      {/* Website */}
      <Link className="text-custom-white hidden lg:block" href={href}>
        <Button
          className={`text-base ${active} rounded-r-md w-full flex flex-row justify-start gap-2 pl-10`}
        >
          <div className="flex rounded-t-lg text-custom-white px-3 py-2">
            {Icon && <Icon className="h-6 w-6" />}
          </div>
          <p className='text-xl pr-2'>{text}</p>
        </Button>
      </Link>
    </>
  )
}
