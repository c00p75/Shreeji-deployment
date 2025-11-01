import clientAuth from './auth';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

class ClientApiClient {
  private baseURL: string;

  constructor() {
    const baseUrl = STRAPI_URL.replace(/\/api\/?$/, '');
    this.baseURL = `${baseUrl}/api`;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...this.getHeaders(),
      ...(options.headers as Record<string, string> || {}),
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  private getHeaders(): Record<string, string> {
    return clientAuth.getAuthHeaders();
  }

  // Get client's orders
  async getOrders(params?: {
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
    }

    const queryString = searchParams.toString();
    const endpoint = `/orders${queryString ? `?${queryString}` : ''}`;
    
    return this.request<{ data: any[]; meta: any }>(endpoint);
  }

  // Get single order
  async getOrder(id: string) {
    return this.request<{ data: any }>(`/orders/${id}?populate=*`);
  }

  // Get client profile
  async getProfile() {
    return this.request<{ data: any }>('/users/me');
  }

  // Update client profile
  async updateProfile(data: any) {
    return this.request('/users/me', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Get client addresses
  async getAddresses() {
    return this.request<{ data: any[] }>('/addresses');
  }

  // Create address
  async createAddress(data: any) {
    return this.request('/addresses', {
      method: 'POST',
      body: JSON.stringify({ data }),
    });
  }

  // Update address
  async updateAddress(id: string, data: any) {
    return this.request(`/addresses/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ data }),
    });
  }

  // Delete address
  async deleteAddress(id: string) {
    return this.request(`/addresses/${id}`, {
      method: 'DELETE',
    });
  }
}

export const clientApi = new ClientApiClient();
export default clientApi;

