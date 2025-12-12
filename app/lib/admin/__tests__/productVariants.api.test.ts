import api from '../api'

const mockFetch = jest.fn()

const okResponse = (data: any = {}) =>
  Promise.resolve({
    ok: true,
    json: async () => data,
  } as Response)

describe('ApiClient product variant endpoints', () => {
  beforeEach(() => {
    mockFetch.mockReset()
    // @ts-expect-error overwrite global fetch for tests
    global.fetch = mockFetch
  })

  it('calls admin route for getProductVariants', async () => {
    mockFetch.mockReturnValue(okResponse([]))

    await api.getProductVariants(42)

    expect(mockFetch).toHaveBeenCalled()
    expect(mockFetch.mock.calls[0][0]).toBe('http://localhost:4000/admin/products/42/variants')
  })

  it('calls admin route for createProductVariant', async () => {
    mockFetch.mockReturnValue(okResponse({}))

    await api.createProductVariant(99, { sku: 'SKU-99' })

    expect(mockFetch).toHaveBeenCalled()
    expect(mockFetch.mock.calls[0][0]).toBe('http://localhost:4000/admin/products/99/variants')
    expect(mockFetch.mock.calls[0][1]).toEqual(expect.objectContaining({ method: 'POST' }))
  })

  it('calls admin route for updateProductVariant', async () => {
    mockFetch.mockReturnValue(okResponse({}))

    await api.updateProductVariant(7, 3, { price: 10 })

    expect(mockFetch).toHaveBeenCalled()
    expect(mockFetch.mock.calls[0][0]).toBe('http://localhost:4000/admin/products/7/variants/3')
    expect(mockFetch.mock.calls[0][1]).toEqual(expect.objectContaining({ method: 'PUT' }))
  })

  it('calls admin route for deleteProductVariant', async () => {
    mockFetch.mockReturnValue(okResponse({}))

    await api.deleteProductVariant(5, 2)

    expect(mockFetch).toHaveBeenCalled()
    expect(mockFetch.mock.calls[0][0]).toBe('http://localhost:4000/admin/products/5/variants/2')
    expect(mockFetch.mock.calls[0][1]).toEqual(expect.objectContaining({ method: 'DELETE' }))
  })
})

