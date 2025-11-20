// Admin API Client for NestJS Backend
const API_URL = process.env.NEXT_PUBLIC_ECOM_API_URL?.replace(/\/$/, '') || 'http://localhost:4000';

class ApiClient {
  private baseURL: string;

  constructor() {
    this.baseURL = API_URL;
  }

  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Add JWT token if available
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('admin_jwt');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const headers = this.getHeaders();

    const response = await fetch(url, {
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `API request failed: ${response.status} ${response.statusText}`;

      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.message || errorJson.error?.message || errorMessage;
      } catch {
        if (errorText) {
          errorMessage = errorText;
        }
      }

      const error: any = new Error(errorMessage);
      error.status = response.status;
      throw error;
    }

    return response.json();
  }

  // Products API
  async getProducts(params?: {
    pagination?: { page: number; pageSize: number };
    filters?: Record<string, any>;
    sort?: string;
  }) {
    const searchParams = new URLSearchParams();

    if (params?.pagination) {
      searchParams.append('page', params.pagination.page.toString());
      searchParams.append('pageSize', params.pagination.pageSize.toString());
    }

    if (params?.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          if (key === 'brand' && typeof value === 'object' && (value as any).id) {
            searchParams.append('brandId', (value as any).id.toString());
          } else if (key === 'subcategory' && typeof value === 'object' && (value as any).id) {
            searchParams.append('subcategoryId', (value as any).id.toString());
          } else {
            searchParams.append(key, value.toString());
          }
        }
      });
    }

    if (params?.sort) {
      searchParams.append('sort', params.sort);
    }

    const queryString = searchParams.toString();
    const endpoint = `/admin/products${queryString ? `?${queryString}` : ''}`;

    return this.request<{ data: any[]; meta: any }>(endpoint);
  }

  async getProduct(id: string | number) {
    return this.request<{ data: any }>(`/admin/products/${id}`);
  }

  async createProduct(data: any) {
    // Transform data to match NestJS DTO format
    const productData = {
      name: data.name,
      sku: data.SKU || data.sku,
      category: data.category,
      subcategoryId: data.subcategory ? (typeof data.subcategory === 'object' ? data.subcategory.id : data.subcategory) : undefined,
      brandId: data.brand ? (typeof data.brand === 'object' ? data.brand.id : data.brand) : undefined,
      tagline: data.tagline,
      description: data.description,
      specs: data.specs,
      specialFeature: data.specialFeature,
      images: data.images || [],
      dimensions: data.Dimensions || data.dimensions,
      sellingPrice: parseFloat(data.price || data.sellingPrice || 0),
      basePrice: parseFloat(data.basePrice || 0),
      discountedPrice: data.discountedPrice ? parseFloat(data.discountedPrice) : undefined,
      taxRate: data.taxRate ? parseFloat(data.taxRate) : undefined,
      weight: data.weight ? parseFloat(data.weight) : undefined,
      stockQuantity: parseInt(data.stockQuantity || 0),
      minStockLevel: data.minStockLevel ? parseInt(data.minStockLevel) : undefined,
      maxStockLevel: data.maxStockLevel ? parseInt(data.maxStockLevel) : undefined,
      isActive: data.isActive !== undefined ? data.isActive : true,
    };

    return this.request('/admin/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  }

  async updateProduct(id: string | number, productData: any) {
    // Transform data to match NestJS DTO format
    const updateData: any = {};

    if (productData.name !== undefined) updateData.name = productData.name;
    if (productData.SKU !== undefined || productData.sku !== undefined) updateData.sku = productData.SKU || productData.sku;
    if (productData.category !== undefined) updateData.category = productData.category;
    if (productData.subcategory !== undefined) {
      updateData.subcategoryId = typeof productData.subcategory === 'object' ? productData.subcategory.id : productData.subcategory;
    }
    if (productData.brand !== undefined) {
      updateData.brandId = typeof productData.brand === 'object' ? productData.brand.id : productData.brand;
    }
    if (productData.tagline !== undefined) updateData.tagline = productData.tagline;
    if (productData.description !== undefined) updateData.description = productData.description;
    if (productData.specs !== undefined) updateData.specs = productData.specs;
    if (productData.specialFeature !== undefined) updateData.specialFeature = productData.specialFeature;
    if (productData.images !== undefined) updateData.images = productData.images;
    if (productData.Dimensions !== undefined || productData.dimensions !== undefined) {
      updateData.dimensions = productData.Dimensions || productData.dimensions;
    }
    if (productData.price !== undefined || productData.sellingPrice !== undefined) {
      updateData.sellingPrice = parseFloat(productData.price || productData.sellingPrice);
    }
    if (productData.basePrice !== undefined) updateData.basePrice = parseFloat(productData.basePrice);
    if (productData.discountedPrice !== undefined) updateData.discountedPrice = parseFloat(productData.discountedPrice);
    if (productData.taxRate !== undefined) updateData.taxRate = parseFloat(productData.taxRate);
    if (productData.weight !== undefined) updateData.weight = parseFloat(productData.weight);
    if (productData.stockQuantity !== undefined) updateData.stockQuantity = parseInt(productData.stockQuantity);
    if (productData.minStockLevel !== undefined) updateData.minStockLevel = parseInt(productData.minStockLevel);
    if (productData.maxStockLevel !== undefined) updateData.maxStockLevel = parseInt(productData.maxStockLevel);
    if (productData.isActive !== undefined) updateData.isActive = productData.isActive;

    return this.request<{ data: any }>(`/admin/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });
  }

  async deleteProduct(id: string | number) {
    return this.request(`/admin/products/${id}`, {
      method: 'DELETE',
    });
  }

  // Brand API methods
  async getBrands(params?: {
    pagination?: { page: number; pageSize: number };
    populate?: string[];
  }) {
    return this.request<{ data: any[] }>('/admin/brands');
  }

  async getBrand(id: string | number) {
    return this.request<{ data: any }>(`/admin/brands/${id}`);
  }

  async createBrand(data: { name: string; logo?: number; logoUrl?: string; description?: string; website?: string }) {
    return this.request('/admin/brands', {
      method: 'POST',
      body: JSON.stringify({ name: data.name, logoUrl: data.logoUrl }),
    });
  }

  async updateBrand(id: string | number, data: { name?: string; logo?: number | null; logoUrl?: string; description?: string; website?: string }) {
    return this.request(`/admin/brands/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ name: data.name, logoUrl: data.logoUrl }),
    });
  }

  async deleteBrand(id: string | number) {
    return this.request(`/admin/brands/${id}`, {
      method: 'DELETE',
    });
  }

  // Subcategory API methods
  async getSubcategories(params?: {
    category?: number;
    pagination?: { page: number; pageSize: number };
    populate?: string[];
  }) {
    const searchParams = new URLSearchParams();
    if (params?.category) {
      searchParams.append('categoryId', params.category.toString());
    }
    const queryString = searchParams.toString();
    return this.request<{ data: any[] }>(`/admin/subcategories${queryString ? `?${queryString}` : ''}`);
  }

  async getSubcategory(id: string | number) {
    return this.request<{ data: any }>(`/admin/subcategories/${id}`);
  }

  async createSubcategory(data: { name: string; category?: number; slug?: string }) {
    return this.request('/admin/subcategories', {
      method: 'POST',
      body: JSON.stringify({ name: data.name, urlPath: data.slug }),
    });
  }

  async updateSubcategory(id: string | number, data: { name?: string; category?: number; slug?: string }) {
    return this.request(`/admin/subcategories/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ name: data.name, urlPath: data.slug }),
    });
  }

  async deleteSubcategory(id: string | number) {
    return this.request(`/admin/subcategories/${id}`, {
      method: 'DELETE',
    });
  }

  // Image Upload API - Use Next.js API route for file uploads
  async uploadImage(file: File): Promise<{ id: number; url: string; name: string }> {
    const formData = new FormData();
    formData.append('file', file);

    // Use Next.js API route for file uploads
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `Image upload failed: ${response.status} ${response.statusText}`;

      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.error?.message || errorJson.message || errorMessage;
      } catch {
        if (errorText) {
          errorMessage = errorText;
        }
      }

      const error: any = new Error(errorMessage);
      error.status = response.status;
      throw error;
    }

    const data = await response.json();
    return {
      id: data.id || Date.now(),
      url: data.url,
      name: data.name || file.name,
    };
  }

  async uploadImages(files: File[]): Promise<Array<{ id: number; url: string; name: string }>> {
    const uploadPromises = files.map((file) => this.uploadImage(file));
    return Promise.all(uploadPromises);
  }

  // Customers API
  async getCustomers(params?: {
    pagination?: { page: number; pageSize: number };
    filters?: Record<string, any>;
  }) {
    const searchParams = new URLSearchParams();

    if (params?.pagination) {
      searchParams.append('page', params.pagination.page.toString());
      searchParams.append('pageSize', params.pagination.pageSize.toString());
    }

    const queryString = searchParams.toString();
    const endpoint = `/admin/customers${queryString ? `?${queryString}` : ''}`;

    return this.request<{ data: any[] }>(endpoint);
  }

  async createCustomer(data: any) {
    // Customers are created via checkout, not directly in admin
    throw new Error('Use checkout endpoint to create customers');
  }

  async updateCustomer(id: string, data: any) {
    // TODO: Implement customer update endpoint in NestJS
    throw new Error('Customer update not yet implemented');
  }

  // Orders API
  async getOrders(params?: {
    pagination?: { page: number; pageSize: number };
    filters?: Record<string, any>;
    populate?: string[];
  }) {
    const searchParams = new URLSearchParams();

    if (params?.pagination) {
      searchParams.append('page', params.pagination.page.toString());
      searchParams.append('pageSize', params.pagination.pageSize.toString());
    }

    const queryString = searchParams.toString();
    const endpoint = `/admin/orders${queryString ? `?${queryString}` : ''}`;

    return this.request<{ data: any[] }>(endpoint);
  }

  async createOrder(data: any) {
    // Orders are created via checkout, not directly in admin
    throw new Error('Use checkout endpoint to create orders');
  }

  async updateOrder(id: string, data: any) {
    // TODO: Implement order update endpoint in NestJS
    throw new Error('Order update not yet implemented');
  }

  // Payments API
  async getPayments(params?: {
    pagination?: { page: number; pageSize: number };
    filters?: Record<string, any>;
  }) {
    // TODO: Implement payments endpoint in NestJS
    return { data: [], meta: { pagination: { total: 0 } } };
  }

  // Coupons API - Not yet implemented
  async getCoupons(params?: {
    pagination?: { page: number; pageSize: number };
    filters?: Record<string, any>;
  }) {
    return { data: [], meta: { pagination: { total: 0 } } };
  }

  async createCoupon(data: any) {
    throw new Error('Coupons not yet implemented');
  }

  async updateCoupon(id: string, data: any) {
    throw new Error('Coupons not yet implemented');
  }

  // Dashboard Statistics
  async getDashboardStats() {
    return this.request('/admin/dashboard/stats');
  }
}

export const api = new ApiClient();
export default api;
