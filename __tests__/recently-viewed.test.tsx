'use client'

import { render, screen, waitFor } from '@testing-library/react'
import RecentlyViewed from '@/app/components/products/RecentlyViewed'

jest.mock('next/image', () => {
  return ({ fill, unoptimized, sizes, ...rest }: any) => <img {...rest} />
})
jest.mock('next/link', () => {
  return ({ href, children, ...rest }: any) => (
    <a href={href} {...rest}>
      {children}
    </a>
  )
})

const mockGetRecentlyViewed = jest.fn()

jest.mock('@/app/lib/client/api', () => ({
  __esModule: true,
  default: {
    getRecentlyViewed: (...args: any[]) => mockGetRecentlyViewed(...args),
  },
}))

const mockUseClientAuth = jest.fn()

jest.mock('@/app/contexts/ClientAuthContext', () => ({
  useClientAuth: () => mockUseClientAuth(),
}))

describe('RecentlyViewed', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders nothing when user is not authenticated', () => {
    mockUseClientAuth.mockReturnValue({
      isAuthenticated: false,
      loading: false,
    })

    const { container } = render(<RecentlyViewed />)
    expect(container.firstChild).toBeNull()
  })

  it('renders empty state when authenticated but no items returned', async () => {
    mockUseClientAuth.mockReturnValue({
      isAuthenticated: true,
      loading: false,
    })
    mockGetRecentlyViewed.mockResolvedValue({ data: [] })

    render(<RecentlyViewed />)

    await waitFor(() => {
      expect(screen.getByText(/No recently viewed products yet/i)).toBeInTheDocument()
    })
  })

  it('shows recently viewed products with normalized image paths', async () => {
    mockUseClientAuth.mockReturnValue({
      isAuthenticated: true,
      loading: false,
    })
    mockGetRecentlyViewed.mockResolvedValue({
      data: [
        {
          id: 1,
          productId: 10,
          viewedAt: '2024-01-01',
          product: {
            id: 10,
            name: 'Lenovo IdeaPad 3',
            slug: 'lenovo-ideapad-3',
            price: 9999,
            currency: 'K',
            images: [{ url: '/products/LenovoIdeaPad3_1.png', isMain: true }],
          },
        },
      ],
    })

    render(<RecentlyViewed />)

    await waitFor(() => {
      expect(screen.getByText('Lenovo IdeaPad 3')).toBeInTheDocument()
    })

    const img = screen.getByRole('img', { name: 'Lenovo IdeaPad 3' }) as HTMLImageElement
    expect(decodeURIComponent(new URL(img.src).pathname)).toBe('/products/LenovoIdeaPad3_1.png')
    expect(screen.getByText(/K 9,999/i)).toBeInTheDocument()
  })
})


