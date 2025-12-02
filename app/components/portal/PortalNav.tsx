'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Package, 
  User, 
  MapPin, 
  LogOut,
  Settings,
  Store,
  Bell
} from 'lucide-react'
import { useClientAuth } from '@/app/contexts/ClientAuthContext'

export default function PortalNav() {
  const pathname = usePathname()
  const { user, logout } = useClientAuth()

  const navItems = [
    { href: '/portal/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/portal/orders', label: 'Orders', icon: Package },
    { href: '/portal/notifications', label: 'Notifications', icon: Bell },
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
    <nav className="bg-white border-r border-gray-200 w-64 min-h-screen fixed left-0 top-0 pt-16">
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Client Portal</h2>
          <p className="text-sm text-gray-500 mt-1">{user?.email}</p>
        </div>

        <div className="p-4 border-b border-gray-200">
          <Link
            href="/products"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-white bg-[var(--shreeji-primary)] hover:opacity-90 transition-opacity"
          >
            <Store className="h-5 w-5" />
            Back to Store
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      active
                        ? 'bg-[var(--shreeji-primary)] text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => {
              logout()
              window.location.href = '/portal/login'
            }}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

