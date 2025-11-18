export interface ProductImage {
  id?: number;
  url: string;
  alt?: string;
  isMain?: boolean;
}

export interface CartItemSnapshot {
  id: number;
  name: string;
  sku: string;
  slug: string;
  price: number;
  discountedPrice?: number | null;
  taxRate?: number | null;
  isDigital: boolean;
  images?: ProductImage[];
}

export interface CartItem {
  id: string;
  productId: number;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  taxRate?: number;
  productSnapshot: CartItemSnapshot;
}

export interface Cart {
  id: string;
  currency: string;
  items: CartItem[];
  subtotal: number;
  taxTotal: number;
  total: number;
  updatedAt: string;
}

export interface CheckoutCustomerInput {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface CheckoutAddressInput {
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
  phone?: string;
}

export interface CheckoutRequest {
  cartId: string;
  customer: CheckoutCustomerInput;
  shippingAddress: CheckoutAddressInput;
  billingAddress?: CheckoutAddressInput;
  paymentMethod: string;
  notes?: string;
}

export interface CheckoutResponse {
  orderNumber: string;
  orderId: number;
  paymentStatus: string;
  totals: {
    subtotal: number;
    taxAmount: number;
    shippingAmount?: number;
    discountAmount?: number;
    totalAmount: number;
    currency: string;
  };
}

const API_URL = process.env.NEXT_PUBLIC_ECOM_API_URL?.replace(/\/$/, '') || 'http://localhost:3001';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${API_URL}${path}`
  
  if (!API_URL || API_URL === 'http://localhost:3001') {
    console.warn('E-commerce API URL not configured. Using default:', API_URL)
  }

  try {
    const response = await fetch(url, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...(init?.headers || {}),
      },
      cache: 'no-store',
    })

    if (!response.ok) {
      let message = 'Something went wrong'
      try {
        const error = await response.json()
        message = error.message || error.error || message
      } catch {
        message = await response.text()
      }
      console.error(`API request failed: ${response.status} ${response.statusText}`, { url, message })
      throw new Error(message || `Request failed: ${response.status} ${response.statusText}`)
    }

    return response.json()
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      console.error('Network error - is the backend running?', { url, API_URL })
      throw new Error('Unable to connect to the server. Please ensure the backend is running.')
    }
    throw error
  }
}

export async function createCart(currency = 'USD'): Promise<Cart> {
  return request<Cart>('/cart', {
    method: 'POST',
    body: JSON.stringify({ currency }),
  });
}

export async function getCart(cartId: string): Promise<Cart> {
  return request<Cart>(`/cart/${cartId}`);
}

export async function addCartItem(cartId: string, productId: number | string, quantity: number): Promise<Cart> {
  return request<Cart>(`/cart/${cartId}/items`, {
    method: 'POST',
    body: JSON.stringify({ productId, quantity }),
  });
}

export async function updateCartItem(cartId: string, itemId: string, quantity: number): Promise<Cart> {
  return request<Cart>(`/cart/${cartId}/items/${itemId}`, {
    method: 'PUT',
    body: JSON.stringify({ quantity }),
  });
}

export async function removeCartItem(cartId: string, itemId: string): Promise<Cart> {
  return request<Cart>(`/cart/${cartId}/items/${itemId}`, {
    method: 'DELETE',
  });
}

export async function clearCart(cartId: string): Promise<Cart> {
  return request<Cart>(`/cart/${cartId}`, {
    method: 'DELETE',
  });
}

export async function checkoutCart(payload: CheckoutRequest): Promise<CheckoutResponse> {
  return request<CheckoutResponse>('/checkout', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
