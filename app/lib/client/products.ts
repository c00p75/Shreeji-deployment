// Client-side product fetching and transformation utilities
// Replaces productsData.js functions with Strapi API calls

import clientApi from './api';
import { processProductImages } from '@/app/lib/admin/image-mapping';

// Transform Strapi product format to match local productsData.js format
function transformProduct(strapiProduct: any): any {
  if (!strapiProduct) return null;

  // Handle Strapi v4+ structure where attributes are nested
  const productData = strapiProduct.attributes || strapiProduct;
  const productId = strapiProduct.id || productData.id;

  // Process images using existing utility (handles local mapping and Strapi images)
  const processedImages = processProductImages(productData);
  
  // Convert images array format: [{url, alt, isMain}] to [url, url, ...] for compatibility
  // Ensure URLs are absolute or properly formatted for Next.js Image component
  const imageUrls = processedImages && Array.isArray(processedImages) && processedImages.length > 0
    ? processedImages
        .map(img => {
          if (!img || typeof img !== 'object') {
            return null;
          }
          
          let url = img?.url;
          
          // Ensure url is a string
          if (!url || typeof url !== 'string') {
            return null;
          }
          
          // If URL is relative and starts with /, it should work with Next.js
          // If it's from Strapi/Imghippo, it should already be absolute
          // Convert @/public paths if present
          if (url.startsWith('@/public')) {
            url = url.replace('@/public', '');
          }
          // Ensure absolute URLs from Strapi work (they should already be absolute)
          return url;
        })
        .filter((url): url is string => url !== null && url !== undefined) // Remove any null/undefined values
    : []; // Fallback to empty array if no images

  // Format date-added from createdAt
  const dateAdded = productData.createdAt 
    ? new Date(productData.createdAt).toISOString().split('T')[0] // YYYY-MM-DD format
    : new Date().toISOString().split('T')[0];

  return {
    id: productId,
    documentId: strapiProduct.documentId || productData.documentId,
    name: productData.name || '',
    category: productData.category || '',
    subcategory: productData.subcategory || '',
    images: imageUrls, // Array of image URLs for compatibility
    brand: productData.brand || '',
    'brand logo': null, // Not in Strapi, can be added later
    price: productData.price || '',
    'discounted price': productData.discountedPrice || '',
    tagline: productData.tagline || '',
    description: productData.description || '',
    specs: productData.specs || {},
    'date-added': dateAdded,
    slug: productData.slug || '',
    isActive: productData.isActive !== false,
    SKU: productData.SKU || productData.sku || '',
    stockQuantity: productData.stockQuantity || 0,
    // Keep Strapi images array format for components that need it
    strapiImages: processedImages,
  };
}

// Transform array of Strapi products
function transformProducts(strapiProducts: any[]): any[] {
  return strapiProducts
    .map(product => transformProduct(product))
    .filter(product => product !== null && product.isActive !== false); // Only active products
}

// Cache for all products to avoid multiple API calls
let productsCache: any[] | null = null;
let productsCacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Get all products (with caching)
async function getAllProducts(forceRefresh = false): Promise<any[]> {
  const now = Date.now();
  
  // Return cached products if still valid and not forcing refresh
  if (!forceRefresh && productsCache && (now - productsCacheTimestamp) < CACHE_DURATION) {
    return productsCache;
  }

  try {
    const response = await clientApi.getProducts({
      pagination: { page: 1, pageSize: 1000 }, // Get all products
      sort: 'createdAt:desc',
    });

    const transformed = transformProducts(response.data || []);
    productsCache = transformed;
    productsCacheTimestamp = now;
    return transformed;
  } catch (error) {
    console.error('Error fetching products from Strapi:', error);
    // Return cached products if available, even if expired
    if (productsCache) {
      return productsCache;
    }
    return [];
  }
}

// Replace filterProducts() from productsData.js
export async function filterProducts(
  filterBy: string, // 'category' or 'subcategory'
  filter: string,   // name of category or subcategory
  count?: number    // specific number of items to be returned
): Promise<any[]> {
  try {
    const allProducts = await getAllProducts();
    
    let filtered = allProducts.filter(product => {
      const value = product[filterBy];
      return value && value.toLowerCase() === filter.toLowerCase();
    });

    // Sort by date-added (newest first)
    filtered = filtered.sort((a, b) => {
      const dateA = new Date(a['date-added'] || 0).getTime();
      const dateB = new Date(b['date-added'] || 0).getTime();
      return dateB - dateA;
    });

    // If count is 1, return random product (for banner items)
    if (count === 1 && filtered.length > 0) {
      const randomIndex = Math.floor(Math.random() * filtered.length);
      return [filtered[randomIndex]];
    }

    // If count is specified, return slice
    if (count && count > 0) {
      return filtered.slice(0, count);
    }

    return filtered;
  } catch (error) {
    console.error('Error filtering products:', error);
    return [];
  }
}

// Replace getProductByName() from productsData.js
export async function getProductByName(name: string): Promise<any | null> {
  try {
    const allProducts = await getAllProducts();
    return allProducts.find(
      product => product.name.toLowerCase() === name.toLowerCase()
    ) || null;
  } catch (error) {
    console.error('Error getting product by name:', error);
    return null;
  }
}

// Replace getProductBySlug() - new function for slug-based lookup
export async function getProductBySlug(slug: string): Promise<any | null> {
  try {
    const response = await clientApi.getProduct(slug);
    if (response.data && response.data.length > 0) {
      return transformProduct(response.data[0]);
    }
    return null;
  } catch (error) {
    console.error('Error getting product by slug:', error);
    return null;
  }
}

// Replace randomProduct() from productsData.js
export async function randomProduct(
  filterBy: string,
  filter: string,
  count?: number
): Promise<any | null> {
  try {
    // Get more products to choose from if count not specified
    const productCount = count || 10;
    const filteredProducts = await filterProducts(filterBy, filter, productCount);
    if (filteredProducts.length === 0) {
      return null;
    }
    const randomIndex = Math.floor(Math.random() * filteredProducts.length);
    return filteredProducts[randomIndex];
  } catch (error) {
    console.error('Error getting random product:', error);
    return null;
  }
}

// Replace subcategoryExists() from productsData.js
export async function subcategoryExists(subcategory: string): Promise<boolean> {
  try {
    const allProducts = await getAllProducts();
    return allProducts.some(
      product => product.subcategory && 
      product.subcategory.toLowerCase() === subcategory.toLowerCase()
    );
  } catch (error) {
    console.error('Error checking subcategory existence:', error);
    return false;
  }
}

// Get all products (for components that need the full list)
export async function getAllProductsList(): Promise<any[]> {
  return getAllProducts();
}

// Clear cache (useful after product updates)
export function clearProductsCache(): void {
  productsCache = null;
  productsCacheTimestamp = 0;
}

// Export transform function for use in other modules
export { transformProduct };

