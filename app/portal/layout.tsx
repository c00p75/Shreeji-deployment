import type { Metadata } from 'next'
import { ClientAuthProvider } from '@/app/contexts/ClientAuthContext'
import '../globals.css'

export const metadata: Metadata = {
  title: 'Client Portal - Shreeji',
  description: 'Your personal client portal',
  robots: {
    index: false,
    follow: false,
  },
}

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClientAuthProvider>
      {children}
    </ClientAuthProvider>
  )
}

