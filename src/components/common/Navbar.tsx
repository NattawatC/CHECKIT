import { useRouter } from 'next/router'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { BiSolidGroup } from 'react-icons/bi'
import { BsPersonVcardFill } from 'react-icons/bs'
import { LuClipboardList } from 'react-icons/lu'
import { MdTask } from 'react-icons/md'
import { NavItem } from './NavItem'
import Link from 'next/link'
import Image from 'next/image'
import logoMobile from 'src/assets/logoMobile.png'

const navItems = [
  { icon: LuClipboardList, text: 'Dashboard', href: '/dashboard' },
  { icon: BiSolidGroup, text: 'Task', href: '/task' },
  { icon: MdTask, text: 'Team', href: '/team' },
  { icon: BsPersonVcardFill, text: 'Profile', href: '/profile' },
]

export const NavBar: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(-1) // Initialize activeIndex state
  const router = useRouter()

  useEffect(() => {
    // Update the activeIndex state when the route changes
    const currentIndex = navItems.findIndex(
      (item) => item.href === router.pathname
    )

    if (currentIndex !== -1) {
      setActiveIndex(currentIndex)
    }
  }, [router.pathname])

  const handleNavItemClick = (index: number) => {
    setActiveIndex(index) // Set the active index when a NavItem is clicked
  }

  return (
    <>
      {/* Mobile */}
      <div className="flex flex-row justify-between lg:hidden">
        {navItems.map((item, index) => (
          <div onClick={() => handleNavItemClick(index)} key={index}>
            <NavItem
              Icon={item.icon}
              href={item.href}
              text={item.text}
              active={
                activeIndex === index ||
                ((router.pathname === '/personal' ||
                  router.pathname === '/health' ||
                  router.pathname === '/work' ||
                  router.pathname === '/others') &&
                  index === 0)
                  ? 'bg-custom-orange'
                  : 'bg-custom-gray hover:bg-custom-orange'
              }
            />
          </div>
        ))}
      </div>
      {/* Desktop */}
      <div className="hidden lg:block">
        <div className="flex flex-col gap-6">
          <Link href="/">
            <Image
              src={logoMobile}
              width="0"
              height="0"
              sizes="100vw"
              className="w-full h-auto pl-6"
              alt="logo mobile"
            />
          </Link>
          {navItems.map((item, index) => (
            <div onClick={() => handleNavItemClick(index)} key={index}>
              <NavItem
                Icon={item.icon}
                href={item.href}
                text={item.text}
                active={
                  activeIndex === index ||
                  ((router.pathname === '/personal' ||
                    router.pathname === '/health' ||
                    router.pathname === '/work' ||
                    router.pathname === '/others') &&
                    index === 0)
                    ? 'bg-custom-orange'
                    : 'bg-custom-gray lg:bg-custom-black hover:bg-custom-orange'
                }
              />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
