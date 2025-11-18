'use client'

import { usePathname } from 'next/navigation'
import Navbar from "@/components/Navbar"
import ContactCard from "@/components/contact card/ContactCard"
import Footer from "@/components/footer"
import { CartProvider } from '@/app/contexts/CartContext'

export default function ConditionalLayout({ children }) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith('/admin')
  const isPortalRoute = pathname?.startsWith('/portal')

  // Admin and Portal routes have their own layouts
  if (isAdminRoute || isPortalRoute) {
    return <>{children}</>
  }

  // Main site layout
  return (
    <CartProvider>
      <Navbar />
      <main className="text-lg text-center md:text-start">{children}</main>
      <ContactCard />
      <Footer />
    </CartProvider>
  )
}

