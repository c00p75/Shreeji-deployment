'use client'

import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProductVariantsManager from '../ProductVariantsManager'
import api from '@/app/lib/admin/api'

jest.mock('react-hot-toast', () => ({
  __esModule: true,
  default: {
    success: jest.fn(),
    error: jest.fn(),
  },
}))

jest.mock('@/app/lib/admin/api', () => ({
  __esModule: true,
  default: {
    getProductVariants: jest.fn(),
    createProductVariant: jest.fn(),
    updateProductVariant: jest.fn(),
    deleteProductVariant: jest.fn(),
  },
}))

const mockedApi = api as jest.Mocked<typeof api>

describe('ProductVariantsManager', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('prefills minStockLevel when editing an existing variant', async () => {
    mockedApi.getProductVariants.mockResolvedValue({
      data: [
        {
          id: 1,
          sku: 'SKU-1',
          attributes: { Size: 'M' },
          price: 100,
          discountedPrice: 90,
          stockQuantity: 10,
          minStockLevel: 7,
          stockStatus: 'in-stock',
          isActive: true,
        },
      ],
    })

    render(<ProductVariantsManager productId={123} productName="Test Product" />)

    await waitFor(() => expect(mockedApi.getProductVariants).toHaveBeenCalled())

    const editButton = await screen.findByTitle('Edit variant')
    await userEvent.click(editButton)

    const minStockInput = await screen.findByLabelText(/Min Stock Level/i)
    expect(minStockInput).toHaveValue(7)
  })
})

