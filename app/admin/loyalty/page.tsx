'use client'

import LoyaltyProgramSettings from '@/app/components/admin/LoyaltyProgramSettings'
import ProtectedRoute from '@/app/components/admin/ProtectedRoute'

export default function LoyaltyPage() {
  return (
    <ProtectedRoute>
      <LoyaltyProgramSettings />
    </ProtectedRoute>
  )
}

