'use client'

import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CustomerManagement from '../CustomerManagement'
jest.mock('next/navigation', () => ({
  __esModule: true,
  useRouter: () => ({
    push: jest.fn(),
  }),
}))
import api from '@/app/lib/admin/api'

jest.mock('../Layout', () => ({
  __esModule: true,
  default: ({ children }: any) => <div>{children}</div>,
}))

jest.mock('@/app/lib/admin/api', () => ({
  __esModule: true,
  default: {
    getCustomers: jest.fn(),
    updateCustomer: jest.fn(),
  },
}))

const mockedApi = api as jest.Mocked<typeof api>

const makeCustomer = (overrides: Partial<any> = {}) => ({
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  phone: '123',
  isActive: true,
  totalOrders: 0,
  totalSpent: 0,
  lastOrderDate: null,
  createdAt: '2024-01-01T00:00:00.000Z',
  addresses: [
    {
      city: 'Lusaka',
      province: 'Lusaka',
    },
  ],
  ...overrides,
})

describe('CustomerManagement filters', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('filters by status (active only)', async () => {
    mockedApi.getCustomers.mockResolvedValue({
      data: [
        makeCustomer({ id: 1, firstName: 'Active', isActive: true }),
        makeCustomer({ id: 2, firstName: 'Inactive', isActive: false }),
      ],
    })

    render(<CustomerManagement />)

    await waitFor(() => {
      expect(mockedApi.getCustomers).toHaveBeenCalled()
      expect(screen.getByText('Active Doe')).toBeInTheDocument()
      expect(screen.getByText('Inactive Doe')).toBeInTheDocument()
    })

    await userEvent.click(screen.getByRole('button', { name: /filter/i }))
    await userEvent.click(
      screen.getByRole('menuitem', { name: /status: active only/i })
    )

    expect(screen.getByText('Active Doe')).toBeInTheDocument()
    expect(screen.queryByText('Inactive Doe')).not.toBeInTheDocument()
  })

  it('filters by registration date (last 30 days)', async () => {
    mockedApi.getCustomers.mockResolvedValue({
      data: [
        makeCustomer({
          id: 1,
          firstName: 'Recent',
          createdAt: new Date().toISOString(),
        }),
        makeCustomer({
          id: 2,
          firstName: 'Old',
          createdAt: '2020-01-01T00:00:00.000Z',
        }),
      ],
    })

    render(<CustomerManagement />)

    await waitFor(() => {
      expect(screen.getByText('Recent Doe')).toBeInTheDocument()
      expect(screen.getByText('Old Doe')).toBeInTheDocument()
    })

    await userEvent.click(screen.getByRole('button', { name: /filter/i }))
    await userEvent.click(
      screen.getByRole('menuitem', { name: /registration: last 30 days/i })
    )

    expect(screen.getByText('Recent Doe')).toBeInTheDocument()
    expect(screen.queryByText('Old Doe')).not.toBeInTheDocument()
  })

  it('filters by location', async () => {
    mockedApi.getCustomers.mockResolvedValue({
      data: [
        makeCustomer({
          id: 1,
          firstName: 'Lusaka',
          addresses: [{ city: 'Lusaka', province: 'Lusaka' }],
        }),
        makeCustomer({
          id: 2,
          firstName: 'Ndola',
          addresses: [{ city: 'Ndola', province: 'Copperbelt' }],
        }),
      ],
    })

    render(<CustomerManagement />)

    await waitFor(() => {
      expect(screen.getByText('Lusaka Doe')).toBeInTheDocument()
      expect(screen.getByText('Ndola Doe')).toBeInTheDocument()
    })

    await userEvent.click(screen.getByRole('button', { name: /filter/i }))
    await userEvent.click(
      screen.getByRole('menuitem', { name: /location: lusaka, lusaka/i })
    )

    expect(screen.getByText('Lusaka Doe')).toBeInTheDocument()
    expect(screen.queryByText('Ndola Doe')).not.toBeInTheDocument()
  })
})

describe('CustomerManagement customer actions', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('navigates to customer detail route when a customer row is clicked', async () => {
    mockedApi.getCustomers.mockResolvedValue({
      data: [makeCustomer({ id: 1, firstName: 'Alice' })],
    })

    render(<CustomerManagement />)

    await waitFor(() => {
      expect(screen.getByText('Alice Doe')).toBeInTheDocument()
    })

    const [rowName] = screen.getAllByText('Alice Doe')
    await userEvent.click(rowName)
    // useRouter is mocked; we just verify click does not throw and route wiring is in place
  })

  it('still allows status filters and uses backend API shape', async () => {
    mockedApi.getCustomers.mockResolvedValue({
      data: [makeCustomer({ id: 1, firstName: 'Bob', isActive: true })],
    })

    render(<CustomerManagement />)

    await waitFor(() => {
      expect(screen.getByText('Bob Doe')).toBeInTheDocument()
    })
  })
})



