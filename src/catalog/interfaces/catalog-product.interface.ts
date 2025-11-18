export interface CatalogProduct {
  id: number;
  name: string;
  slug: string;
  sku: string;
  price: number;
  discountedPrice?: number | null;
  taxRate?: number | null;
  stockQuantity: number;
  stockStatus: string;
  isDigital: boolean;
  currency?: string;
}

