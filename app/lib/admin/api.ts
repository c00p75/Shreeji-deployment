import strapiAuth from './auth';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_KEY;
// IMGHIPPO_API_KEY is now server-side only, accessed via API route

class ApiClient {
  private baseURL: string;

  constructor() {
    // Normalize URL - remove trailing /api if present, then add it
    const baseUrl = STRAPI_URL.replace(/\/api\/?$/, '');
    this.baseURL = `${baseUrl}/api`;
  }

  /**
   * Get headers dynamically before each request
   * @param useApiToken - Force using API token instead of Admin JWT
   */
  private getHeaders(useApiToken: boolean = false): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // For Content API, prefer API token if available and forced, otherwise try Admin JWT first
    if (useApiToken && API_KEY) {
      headers['Authorization'] = `Bearer ${API_KEY}`;
    } else {
      // Try Admin JWT token first (from login)
      const userToken = strapiAuth.getStoredToken();
      if (userToken) {
        headers['Authorization'] = `Bearer ${userToken}`;
      } else if (API_KEY) {
        // Fallback to API token if no user token
        headers['Authorization'] = `Bearer ${API_KEY}`;
      }
    }

    return headers;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}, retryWithApiToken: boolean = true): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    // Try with Admin JWT first (or API token if no JWT)
    const headers = this.getHeaders(false);
    
    let response = await fetch(url, {
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      },
    });

    // If authentication fails and we have an API token, retry with API token
    if (!response.ok && (response.status === 401 || response.status === 403) && retryWithApiToken && API_KEY) {
      console.warn(`Admin JWT token failed for ${endpoint}, retrying with API token...`);
      
      // Retry with API token
      const apiTokenHeaders = this.getHeaders(true);
      response = await fetch(url, {
        ...options,
        headers: {
          ...apiTokenHeaders,
          ...options.headers,
        },
      });
    }

    if (!response.ok) {
      // Provide more detailed error information
      const errorText = await response.text();
      let errorMessage = `API request failed: ${response.status} ${response.statusText}`;
      
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.error?.message || errorJson.message || errorMessage;
      } catch {
        // If error response is not JSON, use the text
        if (errorText) {
          errorMessage = errorText;
        }
      }
      
      // Add specific error for authentication issues
      if (response.status === 401 || response.status === 403) {
        const authMethod = this.getHeaders(false)['Authorization'] ? 'Admin JWT' : 'API Token';
        errorMessage = `Authentication failed (${authMethod}): ${errorMessage}. `;
        
        if (!API_KEY) {
          errorMessage += 'Please configure NEXT_PUBLIC_STRAPI_API_KEY in your environment variables. ';
        }
        
        if (!strapiAuth.getStoredToken() && !API_KEY) {
          errorMessage += 'Either log in to the admin dashboard or configure an API token.';
        } else if (!strapiAuth.getStoredToken()) {
          errorMessage += 'Consider creating an API token in Strapi Admin (Settings → API Tokens) for Content API access.';
        }
      }
      
      // Log detailed error for debugging
      console.error('API Request Error:', {
        url,
        status: response.status,
        statusText: response.statusText,
        errorMessage,
        hasUserToken: !!strapiAuth.getStoredToken(),
        hasApiKey: !!API_KEY,
      });
      
      const error: any = new Error(errorMessage);
      error.status = response.status;
      error.response = response;
      throw error;
    }

    return response.json();
  }

  // Products API
  async getProducts(params?: {
    pagination?: { page: number; pageSize: number };
    filters?: Record<string, any>;
    sort?: string;
    populate?: string[];
  }) {
    const searchParams = new URLSearchParams();
    
    if (params?.pagination) {
      searchParams.append('pagination[page]', params.pagination.page.toString());
      searchParams.append('pagination[pageSize]', params.pagination.pageSize.toString());
    }
    
        if (params?.filters) {
          Object.entries(params.filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
              if (key === 'brand' && typeof value === 'object' && (value as any).id) {
                // Handle brand relation filter
                searchParams.append(`filters[brand][id][$eq]`, (value as any).id.toString());
              } else {
                searchParams.append(`filters[${key}][$eq]`, value.toString());
              }
            }
          });
        }
        
        if (params?.sort) {
          searchParams.append('sort', params.sort);
        }

        if (params?.populate) {
          params.populate.forEach(field => {
            searchParams.append('populate', field);
          });
        } else {
          // Default populate everything - Strapi will populate all relations including nested ones
          searchParams.append('populate', '*');
        }

        // Include draft products for admin dashboard (show all products regardless of publication status)
        searchParams.append('publicationState', 'preview');
        searchParams.append('sort', 'createdAt:desc');

        const queryString = searchParams.toString();
        const endpoint = `/products${queryString ? `?${queryString}` : ''}`;
        
        return this.request<{ data: any[]; meta: any }>(endpoint);
      }

  async getProduct(id: string) {
    return this.request<{ data: any }>(`/products/${id}`);
  }

  async createProduct(data: any) {
    // Handle brand: convert string to ID if needed (backward compatibility)
    if (data.brand && typeof data.brand === 'string') {
      // Try to find brand by name
      const brands = await this.getBrands({ populate: [] });
      const matchingBrand = brands.data.find((b: any) => 
        (b.attributes?.name || b.name)?.toLowerCase() === data.brand.toLowerCase()
      );
      if (matchingBrand) {
        data.brand = matchingBrand.id || matchingBrand.documentId;
      } else {
        // If brand doesn't exist, set to null (brand is optional)
        data.brand = null;
      }
    }
    
    return this.request('/products', {
      method: 'POST',
      body: JSON.stringify({ data }),
    });
  }

  async updateProduct(id: string, productData: any) {
    // Handle brand: convert string to ID if needed (backward compatibility)
    if (productData.brand && typeof productData.brand === 'string') {
      // Try to find brand by name
      const brands = await this.getBrands({ populate: [] });
      const matchingBrand = brands.data.find((b: any) => 
        (b.attributes?.name || b.name)?.toLowerCase() === productData.brand.toLowerCase()
      );
      if (matchingBrand) {
        productData.brand = matchingBrand.id || matchingBrand.documentId;
      } else {
        // If brand doesn't exist, set to null (brand is optional)
        productData.brand = null;
      }
    }
    
    return this.request<{ data: any }>(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ data: productData }),
    });
  }

  async deleteProduct(id: string) {
    return this.request(`/products/${id}`, {
      method: 'DELETE',
    });
  }

  // Brand API methods
  async getBrands(params?: {
    pagination?: { page: number; pageSize: number };
    populate?: string[];
  }) {
    const searchParams = new URLSearchParams();
    
    if (params?.pagination) {
      searchParams.append('pagination[page]', params.pagination.page.toString());
      searchParams.append('pagination[pageSize]', params.pagination.pageSize.toString());
    }
    
    if (params?.populate) {
      params.populate.forEach(field => {
        searchParams.append('populate', field);
      });
    } else {
      // Default populate logo
      searchParams.append('populate', 'logo');
    }

    const queryString = searchParams.toString();
    const endpoint = `/brands${queryString ? `?${queryString}` : ''}`;
    
    return this.request<{ data: any[]; meta: any }>(endpoint);
  }

  async getBrand(id: string | number) {
    return this.request<{ data: any }>(`/brands/${id}?populate=logo`);
  }

  async createBrand(data: { name: string; logo?: number; logoUrl?: string; description?: string; website?: string }) {
    return this.request('/brands', {
      method: 'POST',
      body: JSON.stringify({ data }),
    });
  }

  async updateBrand(id: string | number, data: { name?: string; logo?: number | null; logoUrl?: string; description?: string; website?: string }) {
    return this.request(`/brands/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ data }),
    });
  }

  async deleteBrand(id: string | number) {
    // Check if brand is used by any products
    const products = await this.getProducts({
      filters: { brand: { id: { $eq: id } } },
      pagination: { page: 1, pageSize: 1 }
    });
    
    if (products.data && products.data.length > 0) {
      throw new Error('Cannot delete brand: It is being used by one or more products');
    }
    
    return this.request(`/brands/${id}`, {
      method: 'DELETE',
    });
  }

  // Image Upload API
  async uploadImage(file: File): Promise<{ id: number; url: string; name: string }> {
    const formData = new FormData();
    formData.append('files', file);

    // Get auth headers (without Content-Type for FormData - browser will set it with boundary)
    const headers: Record<string, string> = {};
    const userToken = strapiAuth.getStoredToken();
    if (userToken) {
      headers['Authorization'] = `Bearer ${userToken}`;
    } else if (API_KEY) {
      headers['Authorization'] = `Bearer ${API_KEY}`;
    }

    const url = `${this.baseURL}/upload`;
    const response = await fetch(url, {
      method: 'POST',
      headers,
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

      if (response.status === 401 || response.status === 403) {
        // Retry with API token if Admin JWT failed
        if (userToken && API_KEY) {
          console.warn('Admin JWT failed for image upload, retrying with API token...');
          const apiTokenHeaders: Record<string, string> = {
            'Authorization': `Bearer ${API_KEY}`,
          };
          
          const retryResponse = await fetch(url, {
            method: 'POST',
            headers: apiTokenHeaders,
            body: formData,
          });

          if (retryResponse.ok) {
            const data = await retryResponse.json();
            const uploadedFile = data[0];
            return {
              id: uploadedFile.id,
              url: `${STRAPI_URL.replace(/\/api\/?$/, '')}${uploadedFile.url}`,
              name: uploadedFile.name,
            };
          }
        }
        
        errorMessage = `Authentication failed: ${errorMessage}. Please check your login credentials or API token.`;
      }

      const error: any = new Error(errorMessage);
      error.status = response.status;
      throw error;
    }

    const data = await response.json();
    const uploadedFile = data[0]; // Strapi returns array of uploaded files
    
    return {
      id: uploadedFile.id,
      url: `${STRAPI_URL.replace(/\/api\/?$/, '')}${uploadedFile.url}`,
      name: uploadedFile.name,
    };
  }

  async uploadImages(files: File[]): Promise<Array<{ id: number; url: string; name: string }>> {
    const uploadPromises = files.map(file => this.uploadImage(file));
    return Promise.all(uploadPromises);
  }

  // Imghippo Image Upload API (via Next.js API route proxy to avoid CORS)
  async uploadImageToImghippo(file: File, retries: number = 2): Promise<{ url: string; view_url: string; name: string }> {
    let lastError: Error | null = null;
    
    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload/imghippo', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: 'Upload failed' }));
          const error: any = new Error(errorData.error || 'Upload failed');
          error.status = response.status;
          throw error;
        }

        return response.json();
      } catch (error: any) {
        lastError = error;
        // If not the last attempt, wait before retrying
        if (attempt < retries - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
    }
    
    // All retries failed
    throw lastError || new Error('Upload failed after retries');
  }

  async uploadImagesToImghippo(files: File[]): Promise<Array<{ url: string; view_url: string; name: string }>> {
    const uploadedImages: Array<{ url: string; view_url: string; name: string }> = [];
    
    // Upload sequentially to avoid overwhelming the API
    // Retry logic is handled in uploadImageToImghippo
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const result = await this.uploadImageToImghippo(file);
        uploadedImages.push(result);
      } catch (error: any) {
        // Re-throw with file name for better error reporting
        throw new Error(`Failed to upload "${file.name}": ${error.message}`);
      }
    }
    
    return uploadedImages;
  }

  // Customers API
  async getCustomers(params?: {
    pagination?: { page: number; pageSize: number };
    filters?: Record<string, any>;
  }) {
    const searchParams = new URLSearchParams();
    
    if (params?.pagination) {
      searchParams.append('pagination[page]', params.pagination.page.toString());
      searchParams.append('pagination[pageSize]', params.pagination.pageSize.toString());
    }
    
    if (params?.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        searchParams.append(`filters[${key}][$eq]`, value);
      });
    }

    const queryString = searchParams.toString();
    const endpoint = `/customers${queryString ? `?${queryString}` : ''}`;
    
    return this.request<{ data: any[]; meta: any }>(endpoint);
  }

  async createCustomer(data: any) {
    return this.request('/customers', {
      method: 'POST',
      body: JSON.stringify({ data }),
    });
  }

  async updateCustomer(id: string, data: any) {
    return this.request(`/customers/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ data }),
    });
  }

  // Orders API
  async getOrders(params?: {
    pagination?: { page: number; pageSize: number };
    filters?: Record<string, any>;
    populate?: string[];
  }) {
    const searchParams = new URLSearchParams();
    
    if (params?.pagination) {
      searchParams.append('pagination[page]', params.pagination.page.toString());
      searchParams.append('pagination[pageSize]', params.pagination.pageSize.toString());
    }
    
    if (params?.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        searchParams.append(`filters[${key}][$eq]`, value);
      });
    }

    if (params?.populate) {
      params.populate.forEach(field => {
        searchParams.append('populate', field);
      });
    }

    const queryString = searchParams.toString();
    const endpoint = `/orders${queryString ? `?${queryString}` : ''}`;
    
    return this.request<{ data: any[]; meta: any }>(endpoint);
  }

  async createOrder(data: any) {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify({ data }),
    });
  }

  async updateOrder(id: string, data: any) {
    return this.request(`/orders/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ data }),
    });
  }

  // Payments API
  async getPayments(params?: {
    pagination?: { page: number; pageSize: number };
    filters?: Record<string, any>;
  }) {
    const searchParams = new URLSearchParams();
    
    if (params?.pagination) {
      searchParams.append('pagination[page]', params.pagination.page.toString());
      searchParams.append('pagination[pageSize]', params.pagination.pageSize.toString());
    }
    
    if (params?.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        searchParams.append(`filters[${key}][$eq]`, value);
      });
    }

    const queryString = searchParams.toString();
    const endpoint = `/payments${queryString ? `?${queryString}` : ''}`;
    
    return this.request<{ data: any[]; meta: any }>(endpoint);
  }

  // Coupons API
  async getCoupons(params?: {
    pagination?: { page: number; pageSize: number };
    filters?: Record<string, any>;
  }) {
    const searchParams = new URLSearchParams();
    
    if (params?.pagination) {
      searchParams.append('pagination[page]', params.pagination.page.toString());
      searchParams.append('pagination[pageSize]', params.pagination.pageSize.toString());
    }
    
    if (params?.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        searchParams.append(`filters[${key}][$eq]`, value);
      });
    }

    const queryString = searchParams.toString();
    const endpoint = `/coupons${queryString ? `?${queryString}` : ''}`;
    
    return this.request<{ data: any[]; meta: any }>(endpoint);
  }

  async createCoupon(data: any) {
    return this.request('/coupons', {
      method: 'POST',
      body: JSON.stringify({ data }),
    });
  }

  async updateCoupon(id: string, data: any) {
    return this.request(`/coupons/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ data }),
    });
  }

  // Dashboard Statistics
  async getDashboardStats() {
    try {
      const [productsRes, customersRes, ordersRes, paymentsRes] = await Promise.all([
        this.getProducts({ pagination: { page: 1, pageSize: 1000 } }),
        this.getCustomers({ pagination: { page: 1, pageSize: 1000 } }),
        this.getOrders({ pagination: { page: 1, pageSize: 1000 } }),
        this.getPayments({ pagination: { page: 1, pageSize: 1000 } })
      ]);

      // Calculate statistics
      const totalProducts = productsRes.meta?.pagination?.total || productsRes.data?.length || 0;
      const totalCustomers = customersRes.meta?.pagination?.total || customersRes.data?.length || 0;
      const totalOrders = ordersRes.meta?.pagination?.total || ordersRes.data?.length || 0;
      
      // Calculate total revenue
      const totalRevenue = paymentsRes.data?.reduce((sum: number, payment: any) => {
        return sum + (parseFloat(payment.amount) || 0);
      }, 0) || 0;

      // Calculate inventory value
      const inventoryValue = productsRes.data?.reduce((sum: number, product: any) => {
        const stockQuantity = product.stockQuantity || 0;
        const costPrice = product.costPrice || 0;
        return sum + (stockQuantity * costPrice);
      }, 0) || 0;

      // Count low stock products
      const lowStockProducts = productsRes.data?.filter((product: any) => 
        product.stockStatus === 'low-stock' || product.stockStatus === 'out-of-stock'
      ).length || 0;

      // Count out of stock products
      const outOfStockProducts = productsRes.data?.filter((product: any) => 
        product.stockStatus === 'out-of-stock'
      ).length || 0;

      return {
        totalProducts,
        totalCustomers,
        totalOrders,
        totalRevenue,
        inventoryValue,
        lowStockProducts,
        outOfStockProducts,
      };
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      return {
        totalProducts: 0,
        totalCustomers: 0,
        totalOrders: 0,
        totalRevenue: 0,
        inventoryValue: 0,
        lowStockProducts: 0,
        outOfStockProducts: 0,
      };
    }
  }
}

export const api = new ApiClient();
export default api;
