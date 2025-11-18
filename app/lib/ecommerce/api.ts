export interface CartItemSnapshot {
  id: number;
  name: string;
  sku: string;
  slug: string;
  price: number;
  discountedPrice?: number | null;
  taxRate?: number | null;
  isDigital: boolean;
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
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    let message = 'Something went wrong';
    try {
      const error = await response.json();
      message = error.message || error.error || message;
    } catch {
      message = await response.text();
    }
    throw new Error(message || 'Request failed');
  }

  return response.json();
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

export async function addCartItem(cartId: string, productId: number, quantity: number): Promise<Cart> {
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
