'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import clsx from 'clsx'
import { useAuth } from '@/app/contexts/AuthContext'
import api from '@/app/lib/admin/api'
import { 
  HomeIcon, 
  ShoppingBagIcon, 
  UsersIcon, 
  ChartBarIcon,
  CogIcon,
  Bars3Icon,
  XMarkIcon,
  CubeIcon,
  ArrowRightOnRectangleIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline'
import NotificationBell from '../notifications/NotificationBell'

interface LayoutProps {
  children: React.ReactNode
  currentPage?: string
  pageTitle?: string
}

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: HomeIcon, current: true },
  { name: 'Products', href: '/admin/products', icon: ShoppingBagIcon, current: false },
  { name: 'Inventory', href: '/admin/inventory', icon: CubeIcon, current: false },
  { name: 'Orders', href: '/admin/orders', icon: ChartBarIcon, current: false },
  { name: 'Payments', href: '/admin/payments', icon: CurrencyDollarIcon, current: false },
  { name: 'Customers', href: '/admin/customers', icon: UsersIcon, current: false },
  { name: 'Settings', href: '/admin/settings', icon: CogIcon, current: false },
]

export default function Layout({ children, currentPage = 'Dashboard', pageTitle }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { user, logout } = useAuth()
  const router = useRouter()
  const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>('light')

  // Apply theme to HTML element
  const applyTheme = (themeValue: 'light' | 'dark' | 'auto') => {
    if (typeof window === 'undefined') return
    
    const htmlElement = document.documentElement
    
    if (themeValue === 'dark') {
      htmlElement.classList.add('dark')
    } else if (themeValue === 'light') {
      htmlElement.classList.remove('dark')
    } else if (themeValue === 'auto') {
      // Use system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      if (prefersDark) {
        htmlElement.classList.add('dark')
      } else {
        htmlElement.classList.remove('dark')
      }
    }
  }

  // Load theme from settings and apply it
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const generalSettings = await api.getSettingsByCategory('general')
        const savedTheme = (generalSettings?.data || generalSettings)?.theme || 'light'
        setTheme(savedTheme)
        applyTheme(savedTheme)
      } catch (error) {
        console.error('Failed to load theme:', error)
        applyTheme('light')
      }
    }

    loadTheme()
  }, [])

  // Listen for theme changes from settings
  useEffect(() => {
    const handleThemeChange = (event: CustomEvent) => {
      const newTheme = event.detail as 'light' | 'dark' | 'auto'
      setTheme(newTheme)
      applyTheme(newTheme)
    }

    window.addEventListener('themeChanged' as any, handleThemeChange as EventListener)
    return () => {
      window.removeEventListener('themeChanged' as any, handleThemeChange as EventListener)
    }
  }, [])

  // Listen for system theme changes when in auto mode
  useEffect(() => {
    if (theme === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handleChange = (e: MediaQueryListEvent) => {
        const htmlElement = document.documentElement
        if (e.matches) {
          htmlElement.classList.add('dark')
        } else {
          htmlElement.classList.remove('dark')
        }
      }

      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
  }, [theme])

  const handleLogout = () => {
    logout()
    setShowUserMenu(false)
    router.replace('/admin/login')
  }

  return (
    <div className="flex h-screen bg-[whitesmoke] dark:bg-[#131313]">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-center h-16 px-4  dark:border-gray-800">
          <div className="flex items-center space-x-3">
            <Image
              src="/images/Shreeji icon.png"
              alt="Shreeji Logo"
              width={32}
              height={32}
              className="object-contain"
            />
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Shreeji Admin</h1>
          </div>
        </div>
        
        <nav className="mt-8">
          <div className="px-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = item.name === currentPage
              
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={clsx(
                    'group flex items-center px-4 py-3 text-sm font-medium rounded-2xl transition-all duration-200',
                    isActive
                      ? 'bg-[var(--shreeji-primary)] text-white shadow-md'
                      : 'text-gray-700 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'
                  )}
                >
                  <Icon className={clsx(
                    'w-5 h-5 mr-3 flex-shrink-0',
                    isActive ? 'text-white' : 'text-gray-500 dark:text-white/60 group-hover:text-gray-700 dark:group-hover:text-white/80'
                  )} />
                  {item.name}
                </a>
              )
            })}
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden rounded-2xl m-2 ml-0">
        {/* Page content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white dark:bg-[whitesmoke]">
        {/* Header */}
        <header className="shadow-sm">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <button
                type="button"
                className="lg:hidden p-2 rounded-xl text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                onClick={() => setSidebarOpen(true)}
              >
                <Bars3Icon className="w-6 h-6" />
              </button>
              <h2 className="ml-4 text-lg font-semibold text-gray-900 lg:ml-0">
                {pageTitle || currentPage}
              </h2>
            </div>
            
            <div className="flex items-center space-x-4">
              <NotificationBell />
              
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-3 hover:bg-gray-100 rounded-2xl p-2 transition-all"
                >
                  <div className="w-8 h-8 bg-[var(--shreeji-primary)] rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-white">
                      {user?.firstName?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'A'}
                    </span>
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium text-gray-900">
                      {user?.firstName && user?.lastName 
                        ? `${user.firstName} ${user.lastName}` 
                        : user?.firstName || user?.email || 'Admin User'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {user?.email || 'admin@shreeji.com'}
                    </p>
                  </div>
                </button>

                {/* User dropdown menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-lg py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        {user?.firstName && user?.lastName 
                          ? `${user.firstName} ${user.lastName}` 
                          : user?.firstName || user?.email || 'Admin User'}
                      </p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
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
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>

      {/* Sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
