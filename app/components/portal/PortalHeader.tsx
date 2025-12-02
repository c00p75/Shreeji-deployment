'use client'

import Link from 'next/link'
import { useClientAuth } from '@/app/contexts/ClientAuthContext'
import { ShoppingBag } from 'lucide-react'
import NotificationBell from '../notifications/NotificationBell'

export default function PortalHeader() {
  const { user } = useClientAuth()

  return (
    <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-40 h-16">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold text-[var(--shreeji-primary)]">
            <ShoppingBag className="h-6 w-6" />
            <span>Shreeji</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <NotificationBell />
          <span className="text-sm text-gray-600">
            {user?.firstName && user?.lastName
              ? `${user.firstName} ${user.lastName}`
              : user?.email}
          </span>
        </div>
      </div>
    </header>
  )
}

