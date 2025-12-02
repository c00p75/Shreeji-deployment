'use client'

import { usePathname } from 'next/navigation'
import Navbar from "@/components/Navbar"
import ContactCard from "@/components/contact card/ContactCard"
import Footer from "@/components/footer"
import { CartProvider } from '@/app/contexts/CartContext'
import { ClientAuthProvider } from '@/app/contexts/ClientAuthContext'
import { NotificationProvider } from '@/app/contexts/NotificationContext'

export default function ConditionalLayout({ children }) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith('/admin')
  const isPortalRoute = pathname?.startsWith('/portal')

  // Admin and Portal routes have their own layouts
  if (isAdminRoute || isPortalRoute) {
    return (
      <ClientAuthProvider>
        <NotificationProvider>
          {children}
        </NotificationProvider>
      </ClientAuthProvider>
    )
  }

  // Main site layout - wrap with ClientAuthProvider so CartProvider can use auth
  return (
    <ClientAuthProvider>
      <NotificationProvider>
        <CartProvider>
          <Navbar />
          <main className="text-lg text-center md:text-start">{children}</main>
          <ContactCard />
          <Footer />
        </CartProvider>
      </NotificationProvider>
    </ClientAuthProvider>
  )
}

