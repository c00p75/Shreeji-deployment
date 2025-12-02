'use client'

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

  // Show full-width layout for login and register pages when not authenticated
  const isAuthPage = pathname === '/portal/login' || pathname === '/portal/register'
  const showSidebar = isAuthenticated && !isAuthPage

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
    <div className="flex min-h-screen bg-[#f5f1e8]">
      {showSidebar && <PortalNav />}
      <div className={`flex-1 ${showSidebar ? 'ml-64' : ''}`}>
        {showSidebar && <PortalHeader />}
        <main className={showSidebar ? 'pt-16' : ''}>{children}</main>
      </div>
    </div>
  )
}

