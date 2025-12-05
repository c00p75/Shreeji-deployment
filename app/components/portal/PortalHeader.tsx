'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useClientAuth } from '@/app/contexts/ClientAuthContext'
import { Bars3Icon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import { ShoppingBag } from 'lucide-react'
import NotificationBell from '../notifications/NotificationBell'

interface PortalHeaderProps {
  currentPage?: string
  pageTitle?: string
  onMenuClick?: () => void
}

export default function PortalHeader({ currentPage = 'Dashboard', pageTitle, onMenuClick }: PortalHeaderProps) {
  const { user, logout } = useClientAuth()
  const router = useRouter()
  const [showUserMenu, setShowUserMenu] = useState(false)

  const handleLogout = () => {
    logout()
    setShowUserMenu(false)
    router.replace('/portal/login')
  }

  return (
    <header className="shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          {onMenuClick && (
            <button
              type="button"
              className="lg:hidden p-2 rounded-xl text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              onClick={onMenuClick}
            >
              <Bars3Icon className="w-6 h-6" />
            </button>
          )}
          <h2 className="ml-4 text-lg font-semibold text-gray-900 lg:ml-0">
            {pageTitle || currentPage}
          </h2>
        </div>
        
        <div className="flex items-center space-x-4">
          <Link
            href="/products"
            className="hidden sm:flex items-center gap-2 rounded-full border p-2 px-4 transition-colors hover:bg-[var(--shreeji-primary)] hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <ShoppingBag className="h-5 w-5" />
            <span className="text-sm font-medium">Back to Store</span>
          </Link>
          <NotificationBell />
          
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 hover:bg-gray-100 dark:hover:bg-white/5 rounded-2xl p-2 transition-all"
            >
              <div className="w-8 h-8 bg-[var(--shreeji-primary)] rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-white">
                  {user?.firstName?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'C'}
                </span>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {user?.firstName && user?.lastName 
                    ? `${user.firstName} ${user.lastName}` 
                    : user?.email || 'Customer'}
                </p>
                <p className="text-xs text-gray-500 dark:text-white/70">
                  {user?.email || ''}
                </p>
              </div>
            </button>

            {/* User dropdown menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#131313] rounded-2xl shadow-lg py-1 z-50">
                <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-800">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {user?.firstName && user?.lastName 
                      ? `${user.firstName} ${user.lastName}` 
                      : user?.email || 'Customer'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-white/70">{user?.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-white/70 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg"
                >
                  <ArrowRightOnRectangleIcon className="w-4 h-4 mr-3" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

