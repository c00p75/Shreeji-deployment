'use client'

import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SettingsPage from '@/app/portal/settings/page'

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  useSearchParams: () => new URLSearchParams(),
}))

jest.mock('@/app/contexts/ClientAuthContext', () => ({
  useClientAuth: () => ({
    loading: false,
    isAuthenticated: true,
    user: {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      phone: '+26000000000',
    },
  }),
}))

jest.mock('@/app/components/notifications/NotificationPreferences', () => () => (
  <div data-testid="notification-preferences" />
))

jest.mock('lucide-react', () => {
  const React = require('react')
  return new Proxy(
    {},
    {
      get: () => (props: any) => React.createElement('svg', props, null),
    }
  )
})

jest.mock('@/app/lib/client/api', () => ({
  __esModule: true,
  default: {
    get2FAStatus: jest.fn().mockResolvedValue({
      isEnabled: false,
      isVerified: false,
      enabledAt: null,
    }),
    generate2FASecret: jest.fn(),
    enable2FA: jest.fn(),
    disable2FA: jest.fn(),
    regenerate2FABackupCodes: jest.fn(),
    changePassword: jest.fn(),
    updateProfile: jest.fn(),
  },
}))

describe('SettingsPage security tab', () => {
  it('shows two-factor authentication controls inside the security tab', async () => {
    render(<SettingsPage />)

    await userEvent.click(screen.getByRole('button', { name: /security/i }))

    await waitFor(() => {
      expect(
        screen.getByText(/Two-Factor Authentication/i)
      ).toBeInTheDocument()
    })

    expect(screen.getByRole('button', { name: /enable 2fa/i })).toBeInTheDocument()
  })
})

