// Client API for NestJS Backend
const API_URL = process.env.NEXT_PUBLIC_ECOM_API_URL?.replace(/\/$/, '') || 'http://localhost:4000';

class ClientApiClient {
  private baseURL: string;

  constructor() {
    this.baseURL = API_URL;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {}),
    };

    const response = await fetch(url, {
      ...options,
      headers,
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

      throw new Error(errorMessage);
    }

    return response.json();
  }

  // Products API - Public access (only active products)
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
          searchParams.append(key, value.toString());
        }
      });
    }

    if (params?.sort) {
      searchParams.append('sort', params.sort);
    }

    const queryString = searchParams.toString();
    const endpoint = `/catalog/products${queryString ? `?${queryString}` : ''}`;

    return this.request<{ data: any[]; meta: any }>(endpoint);
  }

  async getProduct(slug: string) {
    // Get product by slug
    return this.request<{ data: any }>(`/catalog/products/${slug}`);
  }

  async getProductById(id: string | number) {
    return this.request<{ data: any }>(`/catalog/products/${id}`);
  }

  // Client orders - TODO: Implement in NestJS
  async getOrders(params?: {
    pagination?: { page: number; pageSize: number };
    populate?: string[];
  }) {
    // TODO: Implement client orders endpoint
    return { data: [], meta: { pagination: { total: 0 } } };
  }

  async getOrder(id: string) {
    // TODO: Implement client order endpoint
    throw new Error('Client orders not yet implemented');
  }

  // Client profile - TODO: Implement in NestJS
  async getProfile() {
    // TODO: Implement client profile endpoint
    throw new Error('Client profile not yet implemented');
  }

  async updateProfile(data: any) {
    // TODO: Implement client profile update
    throw new Error('Client profile update not yet implemented');
  }

  // Client addresses - TODO: Implement in NestJS
  async getAddresses() {
    // TODO: Implement client addresses endpoint
    return { data: [] };
  }

  async createAddress(data: any) {
    // TODO: Implement client address creation
    throw new Error('Client address creation not yet implemented');
  }

  async updateAddress(id: string, data: any) {
    // TODO: Implement client address update
    throw new Error('Client address update not yet implemented');
  }

  async deleteAddress(id: string) {
    // TODO: Implement client address deletion
    throw new Error('Client address deletion not yet implemented');
  }
}

export const clientApi = new ClientApiClient();
export default clientApi;
