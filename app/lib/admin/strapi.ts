/**
 * @deprecated This file is deprecated. The project no longer uses Strapi CMS.
 * Please use app/lib/admin/api.ts instead, which connects to the NestJS backend.
 * This file is kept for reference only and may be removed in a future version.
 */

import axios from 'axios'

// Strapi API configuration (DEPRECATED - not used)
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
const STRAPI_API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_KEY || ''

// Create axios instance
const strapiApi = axios.create({
  baseURL: `${STRAPI_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': STRAPI_API_KEY ? `Bearer ${STRAPI_API_KEY}` : '',
  },
})

// Types
export interface StrapiProduct {
  id: number
  attributes: {
    name: string
    slug: string
    category: string
    subcategory: string
    brand: string
    tagline?: string
    description?: string
    price: string
    discountedPrice?: string
    specs?: any
    specialFeature?: any
    images?: any[]
    isActive: boolean
    featured: boolean
    stock: 'in-stock' | 'out-of-stock' | 'limited'
    createdAt: string
    updatedAt: string
  }
}

export interface StrapiResponse<T> {
  data: T
  meta: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface StrapiCollectionResponse<T> {
  data: T[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

// Product API functions
export const productApi = {
  // Get all products with pagination and filters
  async getProducts(params?: {
    page?: number
    pageSize?: number
    filters?: Record<string, any>
    sort?: string
  }) {
    const searchParams = new URLSearchParams()
    
    if (params?.page) searchParams.append('pagination[page]', params.page.toString())
    if (params?.pageSize) searchParams.append('pagination[pageSize]', params.pageSize.toString())
    if (params?.sort) searchParams.append('sort', params.sort)
    
    // Add filters
    if (params?.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        if (value) {
          searchParams.append(`filters[${key}][$eq]`, value)
        }
      })
    }
    
    const response = await strapiApi.get<StrapiCollectionResponse<StrapiProduct>>(
      `/products?${searchParams.toString()}`
    )
    return response.data
  },

  // Get single product by ID
  async getProduct(id: number) {
    const response = await strapiApi.get<StrapiResponse<StrapiProduct>>(`/products/${id}`)
    return response.data
  },

  // Get product by slug
  async getProductBySlug(slug: string) {
    const response = await strapiApi.get<StrapiCollectionResponse<StrapiProduct>>(
      `/products?filters[slug][$eq]=${slug}`
    )
    return response.data.data[0] || null
  },

  // Create new product
  async createProduct(productData: Partial<StrapiProduct['attributes']>) {
    const response = await strapiApi.post<StrapiResponse<StrapiProduct>>('/products', {
      data: productData
    })
    return response.data
  },

  // Update product
  async updateProduct(id: number, productData: Partial<StrapiProduct['attributes']>) {
    const response = await strapiApi.put<StrapiResponse<StrapiProduct>>(`/products/${id}`, {
      data: productData
    })
    return response.data
  },

  // Delete product
  async deleteProduct(id: number) {
    await strapiApi.delete(`/products/${id}`)
  },

  // Upload image
  async uploadImage(file: File) {
    const formData = new FormData()
    formData.append('files', file)
    
    const response = await strapiApi.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  }
}

// Category and Brand API functions
export const categoryApi = {
  async getCategories() {
    const response = await strapiApi.get<StrapiCollectionResponse<any>>('/products')
    const categories = new Set<string>()
    
    response.data.data.forEach(product => {
      if (product.attributes.category) {
        categories.add(product.attributes.category)
      }
    })
    
    return Array.from(categories)
  },

  async getSubcategories(category?: string) {
    const filters = category ? { category } : {}
    const response = await productApi.getProducts({ filters })
    const subcategories = new Set<string>()
    
    response.data.forEach(product => {
      if (product.attributes.subcategory) {
        subcategories.add(product.attributes.subcategory)
      }
    })
    
    return Array.from(subcategories)
  }
}

export const brandApi = {
  async getBrands() {
    const response = await strapiApi.get<StrapiCollectionResponse<any>>('/products')
    const brands = new Set<string>()
    
    response.data.data.forEach(product => {
      if (product.attributes.brand) {
        brands.add(product.attributes.brand)
      }
    })
    
    return Array.from(brands)
  }
}

// Dashboard statistics
export const dashboardApi = {
  async getStats() {
    // This would typically come from a separate analytics API
    // For now, we'll calculate from products
    const products = await productApi.getProducts({ pageSize: 1000 })
    
    const totalProducts = products.meta.pagination.total
    const activeProducts = products.data.filter(p => p.attributes.isActive).length
    const featuredProducts = products.data.filter(p => p.attributes.featured).length
    
    return {
      totalProducts,
      activeProducts,
      featuredProducts,
      categories: await categoryApi.getCategories(),
      brands: await brandApi.getBrands(),
    }
  }
}

export default strapiApi
