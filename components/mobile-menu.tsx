"use client"

import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface MobileMenuProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  navItems: Array<{ label: string; href: string }>
}

const MobileMenu = ({ isOpen, setIsOpen, navItems }: MobileMenuProps) => {
  const pathname = usePathname()

  useEffect(() => {
    // Close mobile menu when route changes
    setIsOpen(false)
  }, [pathname, setIsOpen])

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-white z-40 pt-20 px-6 pb-6 flex flex-col md:hidden animated-fade-in">
      <nav className="flex flex-col gap-6 mt-8">
        {navItems.map((item) => (
          <Link 
            key={item.href} 
            href={item.href}
            className={cn(
              'text-lg font-medium py-2 border-b border-salon-100',
              pathname === item.href 
                ? 'text-salon-700 border-salon-700' 
                : 'text-salon-600'
            )}
            onClick={() => setIsOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="mt-auto">
        <Button asChild variant="default" className="w-full bg-salon-700 hover:bg-salon-800 mt-6">
          <Link href="/booking">Book Appointment</Link>
        </Button>
      </div>
    </div>
  )
}

export default MobileMenu