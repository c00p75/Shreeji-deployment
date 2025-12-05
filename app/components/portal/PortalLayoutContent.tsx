'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useClientAuth } from '@/app/contexts/ClientAuthContext'
import PortalNav from '@/app/components/portal/PortalNav'
import PortalHeader from '@/app/components/portal/PortalHeader'

export default function PortalLayoutContent({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { isAuthenticated, loading } = useClientAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
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

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = (localStorage.getItem('portal-theme') as 'light' | 'dark' | 'auto') || 'light'
    setTheme(savedTheme)
    applyTheme(savedTheme)
  }, [])

  // Listen for theme changes from settings
  useEffect(() => {
    const handleThemeChange = (event: CustomEvent) => {
      const newTheme = event.detail as 'light' | 'dark' | 'auto'
      setTheme(newTheme)
      applyTheme(newTheme)
      localStorage.setItem('portal-theme', newTheme)
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

  // Show full-width layout for login and register pages when not authenticated
  const isAuthPage = pathname === '/portal/login' || pathname === '/portal/register'
  const showSidebar = isAuthenticated && !isAuthPage

  // Get page title from pathname
  const getPageTitle = () => {
    if (pathname === '/portal/dashboard') return 'Dashboard'
    if (pathname === '/portal/orders') return 'Order Management'
    if (pathname === '/portal/profile') return 'Profile'
    if (pathname === '/portal/settings') return 'Settings'
    if (pathname === '/portal/addresses') return 'Address Management'
    return 'Dashboard'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f1e8]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (isAuthPage && !isAuthenticated) {
    // Full-width layout for login/register pages - no sidebar or header
    return <div className="min-h-screen bg-[#f5f1e8]">{children}</div>
  }

  // Authenticated layout with sidebar and header
  return (
    <div className="flex h-screen bg-[whitesmoke] dark:bg-[#131313]">
      {/* Sidebar */}
      {showSidebar && (
        <>
          <PortalNav sidebarOpen={sidebarOpen} />
          {/* Sidebar overlay for mobile */}
          {sidebarOpen && (
            <div 
              className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden rounded-2xl m-2 ml-0">
        {/* Page content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white dark:bg-[whitesmoke]">
          {/* Header */}
          {showSidebar && (
            <PortalHeader 
              currentPage={getPageTitle()}
              pageTitle={getPageTitle()}
              onMenuClick={() => setSidebarOpen(true)}
            />
          )}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

