'use client'

import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CustomerAnalyticsPage from '../CustomerAnalyticsPage'
import api from '@/app/lib/admin/api'

jest.mock('../Layout', () => ({
  __esModule: true,
  default: ({ children }: any) => <div>{children}</div>,
}))

jest.mock('@/app/lib/admin/api', () => ({
  __esModule: true,
  default: {
    getCustomer: jest.fn(),
    getOrders: jest.fn(),
    updateCustomer: jest.fn(),
  },
}))

const mockedApi = api as jest.Mocked<typeof api>

describe('CustomerAnalyticsPage admin controls', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const baseCustomer = {
    id: 1,
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane@example.com',
    phone: '123456789',
    isActive: true,
    isVerified: false,
    customerType: 'individual',
    companyName: '',
    taxId: '',
    marketingConsent: false,
  }

  it('shows admin controls and toggles marketing consent', async () => {
    mockedApi.getCustomer.mockResolvedValue({ data: baseCustomer } as any)
    mockedApi.getOrders.mockResolvedValue({ data: [] } as any)

    render(<CustomerAnalyticsPage customerId="1" />)

    await waitFor(() => {
      expect(mockedApi.getCustomer).toHaveBeenCalledWith('1')
      expect(screen.getByText(/jane doe/i)).toBeInTheDocument()
    })

    // Switch to admin tab
    await userEvent.click(screen.getByRole('button', { name: /admin controls/i }))

    const marketingButton = await screen.findByRole('button', {
      name: /enable marketing/i,
    })
    await userEvent.click(marketingButton)

    expect(mockedApi.updateCustomer).toHaveBeenCalledWith(1, {
      marketingConsent: true,
    })
  })

  it('updates customer type and company profile', async () => {
    mockedApi.getCustomer.mockResolvedValue({
      data: {
        ...baseCustomer,
        customerType: 'individual',
        companyName: 'Old Co',
        taxId: 'OLD123',
      },
    } as any)
    mockedApi.getOrders.mockResolvedValue({ data: [] } as any)

    render(<CustomerAnalyticsPage customerId="1" />)

    await waitFor(() => {
      expect(screen.getByText(/jane doe/i)).toBeInTheDocument()
    })

    await userEvent.click(screen.getByRole('button', { name: /admin controls/i }))

    // Change customer type to Business
    const businessButton = await screen.findByRole('button', { name: /business/i })
    await userEvent.click(businessButton)

    expect(mockedApi.updateCustomer).toHaveBeenCalledWith(1, {
      customerType: 'business',
    })

    // Update company profile and save
    const companyInput = await screen.findByLabelText(/company name/i)
    const taxIdInput = await screen.findByLabelText(/tax id/i)
    const saveButton = await screen.findByRole('button', { name: /save profile/i })

    await userEvent.clear(companyInput)
    await userEvent.type(companyInput, 'New Co')
    await userEvent.clear(taxIdInput)
    await userEvent.type(taxIdInput, 'NEW-999')
    await userEvent.click(saveButton)

    expect(mockedApi.updateCustomer).toHaveBeenCalledWith(1, {
      companyName: 'New Co',
      taxId: 'NEW-999',
    })
  })
})


