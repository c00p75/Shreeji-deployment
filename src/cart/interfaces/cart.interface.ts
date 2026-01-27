export interface CartItemSnapshot {
  id: number;
  name: string;
  sku: string;
  slug: string;
  price: number;
  discountedPrice?: number | null;
  taxRate?: number | null;
  isDigital: boolean;
  variantAttributes?: Record<string, string>;
}

export interface CartItem {
  id: string;
  productId: number;
  variantId?: number;
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

