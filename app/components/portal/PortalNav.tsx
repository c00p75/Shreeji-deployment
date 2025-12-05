'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { 
  LayoutDashboard, 
  Package, 
  User, 
  MapPin, 
  Settings
} from 'lucide-react'

interface PortalNavProps {
  sidebarOpen?: boolean
}

export default function PortalNav({ sidebarOpen = false }: PortalNavProps) {
  const pathname = usePathname()

  const navItems = [
    { href: '/portal/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/portal/orders', label: 'Orders', icon: Package },
    { href: '/portal/addresses', label: 'Addresses', icon: MapPin },
    { href: '/portal/profile', label: 'Profile', icon: User },
    { href: '/portal/settings', label: 'Settings', icon: Settings },
  ]

  const isActive = (href: string) => {
    if (href === '/portal/dashboard') {
      return pathname === '/portal/dashboard'
    }
    return pathname?.startsWith(href)
  }

  return (
    <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
      <div className="flex items-center justify-center h-16 px-4 dark:border-gray-800">
        <div className="flex items-center space-x-3">
          <Image
            src="/images/Shreeji icon.png"
            alt="Shreeji Logo"
            width={32}
            height={32}
            className="object-contain"
          />
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Client Portal</h1>
        </div>
      </div>
      
      <nav className="mt-8">
        <div className="px-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  'group flex items-center px-4 py-3 text-sm font-medium rounded-2xl transition-all duration-200',
                  active
                    ? 'bg-[var(--shreeji-primary)] text-white shadow-md'
                    : 'text-gray-700 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'
                )}
              >
                <Icon className={clsx(
                  'w-5 h-5 mr-3 flex-shrink-0',
                  active ? 'text-white' : 'text-gray-500 dark:text-white/60 group-hover:text-gray-700 dark:group-hover:text-white/80'
                )} />
                {item.label}
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}

