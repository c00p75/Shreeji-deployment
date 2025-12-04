// Client API - Connects to NestJS backend for orders, profile, and addresses
import clientAuth from './auth';

const API_URL = process.env.NEXT_PUBLIC_ECOM_API_URL?.replace(/\/$/, '') || 'http://localhost:4000';

class ClientApiClient {
  private baseURL: string;

  constructor() {
    this.baseURL = API_URL;
  }

  private getAuthHeaders(): Record<string, string> {
    const token = clientAuth.getStoredToken();
    return {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const headers = {
      ...this.getAuthHeaders(),
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

    const queryString = searchParams.toString();
    const endpoint = `/catalog/products${queryString ? `?${queryString}` : ''}`;

    return this.request<{ data: any[]; meta: any }>(endpoint);
  }

  async getProduct(slug: string) {
    // Get product by slug - handle URL encoding
    const encodedSlug = encodeURIComponent(slug);
    try {
      const response = await this.request<any>(`/catalog/products/${encodedSlug}`);
      // NestJS may return product directly or wrapped in data
      return response.data || response;
    } catch (error: any) {
      // If 404, try without encoding (some backends handle it automatically)
      if (error.message?.includes('404') || error.message?.includes('not found')) {
        try {
          const response = await this.request<any>(`/catalog/products/${slug}`);
          return response.data || response;
        } catch {
          throw error; // Re-throw original error
        }
      }
      throw error;
    }
  }

  async getProductById(id: string | number) {
    return this.request<{ data: any }>(`/catalog/products/${id}`);
  }

  // Client orders - Get orders for authenticated user
  async getOrders(params?: {
    pagination?: { page: number; pageSize: number };
    populate?: string[];
  }) {
    const user = await clientAuth.getCurrentUser();
    if (!user) {
      return { data: [], meta: { pagination: { total: 0, page: 1, pageSize: 10 } } };
    }

    const searchParams = new URLSearchParams();
    
    // Add pagination
    if (params?.pagination) {
      searchParams.append('page', params.pagination.page.toString());
      searchParams.append('pageSize', params.pagination.pageSize.toString());
    } else {
      searchParams.append('page', '1');
      searchParams.append('pageSize', '10');
    }

    // Get orders for current user (backend should filter by authenticated user)
    const response = await this.request<{
      data: any[];
      meta?: { pagination?: { page: number; pageSize: number; total: number } };
    }>(`/orders/me${searchParams.toString() ? `?${searchParams.toString()}` : ''}`);

    // Transform response to match expected format
    // Handle both array response and object with data property
    const dataArray = Array.isArray(response) 
      ? response 
      : (response.data || []);
    
    return {
      data: dataArray.map((item: any) => ({
        id: item.id,
        orderNumber: item.orderNumber || item.order_number,
        orderStatus: item.status || item.orderStatus || 'pending',
        paymentStatus: item.paymentStatus || item.payment_status || 'pending',
        totalAmount: item.totalAmount || item.total_amount || 0,
        subtotal: item.subtotal || 0,
        taxAmount: item.taxAmount || item.tax_amount || 0,
        shippingAmount: item.shippingAmount || item.shipping_amount || 0,
        discountAmount: item.discountAmount || item.discount_amount || 0,
        currency: item.currency || 'ZMW',
        notes: item.notes,
        trackingNumber: item.trackingNumber || item.tracking_number,
        estimatedDelivery: item.estimatedDelivery || item.estimated_delivery,
        shippedAt: item.shippedAt || item.shipped_at,
        deliveredAt: item.deliveredAt || item.delivered_at,
        createdAt: item.createdAt || item.created_at,
        updatedAt: item.updatedAt || item.updated_at,
        orderItems: item.orderItems || item.order_items || [],
        shippingAddress: item.shippingAddress || item.shipping_address,
        billingAddress: item.billingAddress || item.billing_address,
      })),
      meta: response.meta || { pagination: { total: response.data?.length || 0, page: 1, pageSize: 10 } },
    };
  }

  async getOrder(id: string) {
    const user = await clientAuth.getCurrentUser();
    if (!user) {
      throw new Error('User not authenticated');
    }

    const response = await this.request<any>(`/orders/${id}`);

    // Backend should verify order belongs to user, but we can double-check
    return {
      data: {
        id: response.id || response.data?.id,
        orderNumber: response.orderNumber || response.order_number || response.data?.orderNumber,
        orderStatus: response.status || response.orderStatus || response.data?.status || 'pending',
        paymentStatus: response.paymentStatus || response.payment_status || response.data?.paymentStatus || 'pending',
        totalAmount: response.totalAmount || response.total_amount || response.data?.totalAmount || 0,
        subtotal: response.subtotal || response.data?.subtotal || 0,
        taxAmount: response.taxAmount || response.tax_amount || response.data?.taxAmount || 0,
        shippingAmount: response.shippingAmount || response.shipping_amount || response.data?.shippingAmount || 0,
        discountAmount: response.discountAmount || response.discount_amount || response.data?.discountAmount || 0,
        currency: response.currency || response.data?.currency || 'ZMW',
        notes: response.notes || response.data?.notes,
        trackingNumber: response.trackingNumber || response.tracking_number || response.data?.trackingNumber,
        estimatedDelivery: response.estimatedDelivery || response.estimated_delivery || response.data?.estimatedDelivery,
        shippedAt: response.shippedAt || response.shipped_at || response.data?.shippedAt,
        deliveredAt: response.deliveredAt || response.delivered_at || response.data?.deliveredAt,
        createdAt: response.createdAt || response.created_at || response.data?.createdAt,
        updatedAt: response.updatedAt || response.updated_at || response.data?.updatedAt,
        orderItems: response.orderItems || response.order_items || response.data?.orderItems || [],
        shippingAddress: response.shippingAddress || response.shipping_address || response.data?.shippingAddress,
        billingAddress: response.billingAddress || response.billing_address || response.data?.billingAddress,
        customer: response.customer || response.data?.customer,
        // Add payment data mapping
        payments: (response.payments || response.data?.payments || []).map((payment: any) => ({
          id: payment.id,
          amount: payment.amount,
          currency: payment.currency || 'ZMW',
          paymentStatus: payment.paymentStatus || payment.payment_status,
          paymentMethod: payment.paymentMethod || payment.payment_method,
          transactionId: payment.transactionId || payment.transaction_id,
          processedAt: payment.processedAt || payment.processed_at,
          createdAt: payment.createdAt || payment.created_at,
        })),
      },
    };
  }

  // Client profile - Get and update user profile
  async getProfile() {
    const user = await clientAuth.getCurrentUser();
    if (!user) {
      throw new Error('User not authenticated');
    }

    // Get customer/profile data from backend
    try {
      const customerResponse = await this.request<any>('/customers/me');
      
      return {
        data: {
          id: user.id,
          email: user.email,
          firstName: customerResponse.firstName || customerResponse.first_name || user.firstName || '',
          lastName: customerResponse.lastName || customerResponse.last_name || user.lastName || '',
          phone: customerResponse.phone || '',
          username: user.username,
          confirmed: user.confirmed,
          blocked: user.blocked,
          addresses: customerResponse.addresses || [],
        },
      };
    } catch (error) {
      // If customer endpoint doesn't exist, return user data
      return {
        data: {
          id: user.id,
          email: user.email,
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          phone: user.phone || '',
          username: user.username,
          confirmed: user.confirmed,
          blocked: user.blocked,
        },
      };
    }
  }

  async updateProfile(data: {
    firstName?: string;
    lastName?: string;
    phone?: string;
  }) {
    const user = await clientAuth.getCurrentUser();
    if (!user) {
      throw new Error('User not authenticated');
    }

    // Update profile via backend
    await this.request('/customers/me', {
      method: 'PUT',
      body: JSON.stringify(data),
    });

    return { success: true };
  }

  // Change password
  async changePassword(data: {
    currentPassword: string;
    newPassword: string;
  }) {
    const user = await clientAuth.getCurrentUser();
    if (!user) {
      throw new Error('User not authenticated');
    }

    // Change password via backend
    await this.request('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    return { success: true };
  }

  // Client addresses - Manage addresses
  async getAddresses() {
    const user = await clientAuth.getCurrentUser();
    if (!user) {
      return { data: [] };
    }

    try {
      const response = await this.request<any[] | { data: any[] }>('/addresses/me');
      
      const addresses = Array.isArray(response) ? response : (response.data || []);
      
      return {
        data: addresses.map((item: any) => ({
          id: item.id,
          type: item.type,
          firstName: item.firstName || item.first_name,
          lastName: item.lastName || item.last_name,
          company: item.company,
          addressLine1: item.addressLine1 || item.address_line1,
          addressLine2: item.addressLine2 || item.address_line2,
          city: item.city,
          state: item.state,
          postalCode: item.postalCode || item.postal_code,
          country: item.country,
          phone: item.phone,
          isDefault: item.isDefault || item.is_default || false,
        })),
      };
    } catch (error) {
      // If endpoint doesn't exist, return empty array
      return { data: [] };
    }
  }

  async createAddress(data: {
    type: 'shipping' | 'billing' | 'both';
    firstName: string;
    lastName: string;
    company?: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state?: string;
    postalCode: string;
    country: string;
    phone?: string;
    isDefault?: boolean;
  }) {
    const user = await clientAuth.getCurrentUser();
    if (!user) {
      throw new Error('User not authenticated');
    }

    // If setting as default, unset other defaults
    if (data.isDefault) {
      const addresses = await this.getAddresses();
      for (const addr of addresses.data) {
        if (addr.isDefault) {
          await this.updateAddress(addr.id.toString(), { isDefault: false });
        }
      }
    }

    const response = await this.request<{ id: number }>('/addresses', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    return { data: { id: response.id, ...data } };
  }

  async updateAddress(id: string, data: Partial<{
    type: 'shipping' | 'billing' | 'both';
    firstName: string;
    lastName: string;
    company?: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state?: string;
    postalCode: string;
    country: string;
    phone?: string;
    isDefault?: boolean;
  }>) {
    const user = await clientAuth.getCurrentUser();
    if (!user) {
      throw new Error('User not authenticated');
    }

    // If setting as default, unset other defaults
    if (data.isDefault) {
      const addresses = await this.getAddresses();
      for (const addr of addresses.data) {
        if (addr.id.toString() !== id && addr.isDefault) {
          await this.updateAddress(addr.id.toString(), { isDefault: false });
        }
      }
    }

    await this.request(`/addresses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });

    return { success: true };
  }

  async deleteAddress(id: string) {
    const user = await clientAuth.getCurrentUser();
    if (!user) {
      throw new Error('User not authenticated');
    }

    await this.request(`/addresses/${id}`, {
      method: 'DELETE',
    });

    return { success: true };
  }

  // Coupon validation
  async validateCoupon(code: string, orderAmount: number, productIds?: number[]) {
    return this.request<{ valid: boolean; coupon?: any; discount?: number; error?: string }>('/coupons/validate', {
      method: 'POST',
      body: JSON.stringify({ code, orderAmount, productIds }),
    });
  }
}

export const clientApi = new ClientApiClient();
export default clientApi;
