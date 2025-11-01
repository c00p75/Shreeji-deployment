/**
 * Strapi API client for the main Shreeji website
 * This will replace the static product data imports
 */

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
const STRAPI_API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_KEY || ''

class StrapiClient {
  constructor() {
    this.baseURL = `${STRAPI_URL}/api`
    this.headers = {
      'Content-Type': 'application/json',
      ...(STRAPI_API_KEY && { 'Authorization': `Bearer ${STRAPI_API_KEY}` })
    }
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    const config = {
      headers: this.headers,
      ...options
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('Strapi API Error:', error)
      throw error
    }
  }

  // Get all products with optional filters
  async getProducts(filters = {}, pagination = {}) {
    const searchParams = new URLSearchParams()
    
    // Add filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        searchParams.append(`filters[${key}][$eq]`, value)
      }
    })
    
    // Add pagination
    Object.entries(pagination).forEach(([key, value]) => {
      if (value) {
        searchParams.append(`pagination[${key}]`, value)
      }
    })

    const endpoint = `/products?${searchParams.toString()}`
    return this.request(endpoint)
  }

  // Get single product by ID
  async getProduct(id) {
    return this.request(`/products/${id}`)
  }

  // Get product by slug (for dynamic routes)
  async getProductBySlug(slug) {
    const response = await this.request(`/products?filters[slug][$eq]=${slug}`)
    return response.data?.[0] || null
  }

  // Get product by name (for backward compatibility)
  async getProductByName(name) {
    const response = await this.request(`/products?filters[name][$eq]=${encodeURIComponent(name)}`)
    return response.data?.[0] || null
  }

  // Get products by category
  async getProductsByCategory(category) {
    return this.getProducts({ category })
  }

  // Get products by subcategory
  async getProductsBySubcategory(subcategory) {
    return this.getProducts({ subcategory })
  }

  // Get products by brand
  async getProductsByBrand(brand) {
    return this.getProducts({ brand })
  }

  // Get all categories
  async getCategories() {
    const products = await this.getProducts({}, { pageSize: 1000 })
    const categories = new Set()
    
    products.data?.forEach(product => {
      if (product.attributes?.category) {
        categories.add(product.attributes.category)
      }
    })
    
    return Array.from(categories)
  }

  // Get all subcategories
  async getSubcategories(category = null) {
    const filters = category ? { category } : {}
    const products = await this.getProducts(filters, { pageSize: 1000 })
    const subcategories = new Set()
    
    products.data?.forEach(product => {
      if (product.attributes?.subcategory) {
        subcategories.add(product.attributes.subcategory)
      }
    })
    
    return Array.from(subcategories)
  }

  // Get all brands
  async getBrands() {
    const products = await this.getProducts({}, { pageSize: 1000 })
    const brands = new Set()
    
    products.data?.forEach(product => {
      if (product.attributes?.brand) {
        brands.add(product.attributes.brand)
      }
    })
    
    return Array.from(brands)
  }

  // Check if subcategory exists
  async subcategoryExists(subcategoryName) {
    const subcategories = await this.getSubcategories()
    return subcategories.includes(subcategoryName)
  }

  // Get random products (for recommendations)
  async getRandomProducts(count = 4) {
    const products = await this.getProducts({}, { pageSize: 100 })
    const shuffled = products.data?.sort(() => 0.5 - Math.random())
    return shuffled?.slice(0, count) || []
  }

  // Get featured products
  async getFeaturedProducts() {
    return this.getProducts({ featured: true })
  }

  // Get active products only
  async getActiveProducts(filters = {}) {
    return this.getProducts({ ...filters, isActive: true })
  }
}

// Create singleton instance
const strapiClient = new StrapiClient()

// Export both the class and instance
export default strapiClient
export { StrapiClient }

// Legacy compatibility functions (to replace existing imports)
export const getProductByName = (name) => strapiClient.getProductByName(name)
export const randomProduct = (count) => strapiClient.getRandomProducts(count)
export const subcategoryExists = (name) => strapiClient.subcategoryExists(name)

// New comprehensive data fetcher
export const getAllProducts = () => strapiClient.getActiveProducts({}, { pageSize: 1000 })

// Categories and subcategories
export const getAllCategories = () => strapiClient.getCategories()
export const getAllSubcategories = (category) => strapiClient.getSubcategories(category)
export const getAllBrands = () => strapiClient.getBrands()
