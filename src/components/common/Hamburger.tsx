'use client'

import Link from 'next/link'
import { RxHamburgerMenu } from 'react-icons/rx'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet'

interface hamburgerProps {
  className: string
}

const hamburgerItems = [
  { title: 'Login', href: '/login' },
  { title: 'About', href: '/' },
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Contact Us', href: '/contact' },
]

export const Hamburger: React.FunctionComponent<hamburgerProps> = ({
  className,
}) => {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <RxHamburgerMenu size={30} classname={`${className}`} />
        </SheetTrigger>
          <SheetContent side={'right'} className='flex flex-col gap-4'>
            <SheetHeader>
              <SheetTitle>CHECKIT</SheetTitle>
              <SheetDescription>
                Make your day more productive with Checkit
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col gap-4 justify-center items-center">
              {hamburgerItems.map((item, index) => (
                <ul key={index} className=" text-lg">
                  <Link
                    className="hover:underline hover:text-custom-orangeHover"
                    href={item.href}
                  >
                    {item.title}
                  </Link>
                </ul>
              ))}
            </div>
          </SheetContent>
      </Sheet>
    </>
  )
}
