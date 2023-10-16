import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

interface NavItemProps {
  href: string
  text: string
  active: string
}

export const NavItem: React.FC<NavItemProps> = ({ href, text, active }) => {
  return (
    <>
      <Link className="text-custom-white" href={href}>
        <Button className={`text-base ${active}`}>{text}</Button>
      </Link>
    </>
  )
}
