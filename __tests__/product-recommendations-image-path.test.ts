jest.mock('lucide-react', () => ({
  ChevronLeft: () => null,
  ChevronRight: () => null,
  ShoppingCart: () => null,
}))

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => children,
}))

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => JSON.stringify(props),
}))

import React from 'react'
import { convertImagePath } from '@/app/components/products/ProductRecommendations'

describe('convertImagePath', () => {
  it('normalizes camelCase with trailing underscore number to spaced filename', () => {
    const result = convertImagePath('/products/HPEliteDesk800G4MiniPC_1.png')
    expect(result).toBe('/products/HP EliteDesk 800 G4 Mini PC_1.png')
  })

  it('normalizes compact Dell filename to spaced filename with underscore suffix', () => {
    const result = convertImagePath('/products/DellOptiPlex7020MiniDesktop_1.png')
    expect(result).toBe('/products/Dell OptiPlex 7020 Mini Desktop_1.png')
  })

  it('leaves already normalized product paths unchanged', () => {
    const path = '/products/HP EliteDesk 800 G4 Mini PC_1.png'
    expect(convertImagePath(path)).toBe(path)
  })

  it('leaves external URLs unchanged', () => {
    const path = 'https://example.com/image.png'
    expect(convertImagePath(path)).toBe(path)
  })

  it('normalizes bare filename by prefixing /products and spacing', () => {
    const result = convertImagePath('/products/HPEliteDesk800G4MiniPC_1.png')
    expect(result).toBe('/products/HP EliteDesk 800 G4 Mini PC_1.png')
  })

  it('handles bare filename with leading slash by prefixing products', () => {
    const result = convertImagePath('/products/DellOptiPlex7020MiniDesktop_1.png')
    expect(result).toBe('/products/Dell OptiPlex 7020 Mini Desktop_1.png')
  })

  it('converts spaced Pro Book names with underscore suffix to ProBook with parentheses', () => {
    const result = convertImagePath('/products/HP Pro Book 465 G7_1.png')
    expect(result).toBe('/products/HP ProBook 465 G7 (1).png')
  })
})
