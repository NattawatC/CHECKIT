import { useRouter } from 'next/router'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { NavItem } from './NavItem'

const navItems = [
  { text: 'Dashboard', href: '/dashboard' },
  { text: 'Task', href: '/task' },
  { text: 'Team', href: '/team' },
  { text: 'Profile', href: '/profile' },
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
    <div className="flex flex-row justify-between">
      {navItems.map((item, index) => (
        <div onClick={() => handleNavItemClick(index)} key={index}>
          <NavItem
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
  )
}
