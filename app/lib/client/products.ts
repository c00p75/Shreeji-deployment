// Client-side product fetching and transformation utilities
// Replaces productsData.js functions with NestJS API calls

import clientApi from './api';
import { processProductImages } from '@/app/lib/admin/image-mapping';

// Transform NestJS product format to match local productsData.js format
function transformProduct(nestProduct: any): any {
  if (!nestProduct) return null;

  // NestJS returns product directly (not wrapped in attributes)
  const productData = nestProduct;
  const productId = productData.id;

  // Debug: Log raw category data for first few products
  if (productId <= 3) {
    console.log(`[DEBUG] Product ${productId} raw category:`, productData.category, typeof productData.category);
  }

  // Process images using existing utility (handles local mapping and backend images)
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
          // If it's from backend/Imghippo, it should already be absolute
          // Convert @/public paths if present
          if (url.startsWith('@/public')) {
            url = url.replace('@/public', '');
          }
          // Ensure absolute URLs from backend work (they should already be absolute)
          return url;
        })
        .filter((url): url is string => url !== null && url !== undefined) // Remove any null/undefined values
    : []; // Fallback to empty array if no images

  // Format date-added from dateAdded or createdAt
  const dateAdded = productData.dateAdded 
    ? new Date(productData.dateAdded).toISOString().split('T')[0] // YYYY-MM-DD format
    : productData.createdAt
    ? new Date(productData.createdAt).toISOString().split('T')[0]
    : new Date().toISOString().split('T')[0];

      // Extract brand information from relation
      let brandName = '';
      let brandLogo: string | null = null;
      
      if (productData.brand) {
        // NestJS returns brand as object directly
        brandName = productData.brand.name || '';
        brandLogo = productData.brand.logoUrl || null;
      }

      // Extract category - handle both string and object cases
      let categoryName = '';
      if (productData.category) {
        if (typeof productData.category === 'object') {
          categoryName = productData.category.name || productData.category || '';
        } else {
          categoryName = String(productData.category).trim();
        }
      }
      
      // Debug: Log if category is empty but productData.category exists
      if (!categoryName && productData.category !== undefined && productData.category !== null) {
        console.log(`[DEBUG] Empty category extracted for product ${productId}:`, {
          rawCategory: productData.category,
          type: typeof productData.category,
          stringified: String(productData.category)
        });
      }

      // Extract subcategory - handle both string and object cases
      let subcategoryName = '';
      if (productData.subcategory) {
        if (typeof productData.subcategory === 'object' && productData.subcategory !== null) {
          // Handle object with name property (from relation)
          subcategoryName = productData.subcategory.name || '';
        } else {
          // Handle string
          subcategoryName = String(productData.subcategory);
        }
      }

      return {
        id: productId,
        documentId: productData.documentId || String(productId),
        name: productData.name || '',
        category: categoryName,
        subcategory: subcategoryName,
        images: imageUrls, // Array of image URLs for compatibility
        brand: brandName,
        'brand logo': brandLogo,
        price: String(productData.price || productData.sellingPrice || ''),
        'discounted price': productData.discountedPrice ? String(productData.discountedPrice) : '',
        tagline: productData.tagline || '',
        description: productData.description || '',
        specs: productData.specs || {},
        'date-added': dateAdded,
        slug: productData.slug || '',
        isActive: productData.isActive !== false,
        SKU: productData.sku || '',
        stockQuantity: productData.stockQuantity || 0,
        // Keep images array format for components that need it
        backendImages: processedImages,
      };
}

// Transform array of backend products
function transformProducts(backendProducts: any[]): any[] {
  const transformed = backendProducts
    .map(product => transformProduct(product))
    .filter(product => product !== null && product.isActive !== false); // Only active products
  
  // Debug: Log unique categories to understand the data structure
  if (transformed.length > 0) {
    const uniqueCategories = new Set(transformed.map(p => {
      const cat = p.category;
      return typeof cat === 'object' ? JSON.stringify(cat) : cat;
    }).filter(Boolean));
    console.log('Unique categories found:', Array.from(uniqueCategories));
    console.log('Sample product category (raw):', transformed[0]?.category, typeof transformed[0]?.category);
    
    // Show detailed category info for first 5 products
    const sampleProducts = transformed.slice(0, 5).map(p => ({ 
      name: p.name, 
      category: p.category, 
      categoryLength: p.category?.length || 0,
      categoryType: typeof p.category,
      isEmpty: !p.category || p.category.trim() === ''
    }));
    console.log('Sample product categories (detailed):', sampleProducts);
    
    // Also log raw backend data for first product
    if (backendProducts.length > 0) {
      console.log('Raw backend product[0] category field:', backendProducts[0]?.category, typeof backendProducts[0]?.category);
      console.log('Raw backend product[0] keys:', Object.keys(backendProducts[0] || {}));
    }
  }
  
  return transformed;
}

// Cache for all products to avoid multiple API calls
let productsCache: any[] | null = null;
let productsCacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Get all products (with caching and pagination)
async function getAllProducts(forceRefresh = false): Promise<any[]> {
  const now = Date.now();
  
  // Return cached products if still valid and not forcing refresh
  if (!forceRefresh && productsCache && (now - productsCacheTimestamp) < CACHE_DURATION) {
    return productsCache;
  }

  try {
    let allProducts: any[] = [];
    let page = 1;
    const pageSize = 100; // Backend default max is usually 100
    let hasMore = true;

    // Fetch all pages of products
    while (hasMore) {
      const response = await clientApi.getProducts({
        pagination: { page, pageSize },
      });

      const products = response.data || [];
      allProducts = [...allProducts, ...products];

      // Check if there are more pages
      const total = response.meta?.pagination?.total ?? products.length;
      const inferredTotal = response.meta?.pagination?.total ?? products.length;
      const pageCount =
        response.meta?.pagination?.pageCount ??
        Math.max(1, Math.ceil(inferredTotal / pageSize));
      hasMore = page < pageCount;

      console.log(`Fetched page ${page}/${pageCount}: ${products.length} products (total: ${allProducts.length}/${total})`);

      if (hasMore) {
        page++;
      }
    }

    console.log(`Total products fetched: ${allProducts.length}`);
    
    // Debug: Log raw category data from backend for first 3 products
    if (allProducts.length > 0) {
      console.log('[DEBUG] Raw backend categories (first 3):', allProducts.slice(0, 3).map(p => ({
        id: p.id,
        name: p.name,
        category: p.category,
        categoryType: typeof p.category,
        categoryKeys: typeof p.category === 'object' ? Object.keys(p.category || {}) : null
      })));
    }

    const transformed = transformProducts(allProducts);
    console.log(`Total products after transformation: ${transformed.length}`);
    
    productsCache = transformed;
    productsCacheTimestamp = now;
    return transformed;
  } catch (error) {
    console.error('Error fetching products from backend:', error);
    // Return cached products if available, even if expired
    if (productsCache) {
      console.log('Returning cached products due to error');
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
    const normalizedFilterBy = typeof filterBy === 'string' ? filterBy.trim() : '';
    const normalizedFilter = typeof filter === 'string' ? filter.trim() : '';
    
    // If no filter provided, return all products (optionally limited by count)
    if (!normalizedFilterBy || !normalizedFilter) {
      if (count && count > 0) {
        return allProducts.slice(0, count);
      }
      return allProducts;
    }
    
    console.log(`Filtering products by ${filterBy}="${filter}" from ${allProducts.length} total products`);
    
    // Debug: Show sample category values with more detail
    if (normalizedFilterBy === 'category' && allProducts.length > 0) {
      const sampleCategories = allProducts
        .slice(0, 5)
        .map(p => ({ 
          name: p.name, 
          category: p.category, 
          categoryType: typeof p.category,
          categoryValue: JSON.stringify(p.category),
          isEmpty: !p.category || String(p.category).trim() === ''
        }));
      console.log('Sample product categories (filtering):', sampleCategories);
      
      // Show all unique category values
      const allCategories = allProducts
        .map(p => p.category)
        .filter(cat => cat !== null && cat !== undefined && String(cat).trim() !== '');
      const uniqueCats = [...new Set(allCategories.map(c => String(c).toLowerCase()))];
      console.log(`All unique non-empty categories (${uniqueCats.length}):`, uniqueCats);
    }
    
    let filtered = allProducts.filter(product => {
      const value = product[normalizedFilterBy];
      // Handle both string and ensure case-insensitive comparison
      const productValue = value ? String(value).trim().toLowerCase() : '';
      const filterValue = normalizedFilter.trim().toLowerCase();
      const matches = productValue === filterValue;
      
      if (!matches && value) {
        // Debug: log products that don't match (for troubleshooting)
        console.log(`Product "${product.name}" has ${filterBy}="${value}" (expected "${filter}")`);
      }
      return matches;
    });

    console.log(`Found ${filtered.length} products matching ${filterBy}="${filter}"`);

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
    // NestJS returns product directly, not wrapped in data array
    if (response) {
      return transformProduct(response);
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
    const normalizedFilterBy = typeof filterBy === 'string' ? filterBy.trim() : '';
    const normalizedFilter = typeof filter === 'string' ? filter.trim() : '';

    let pool: any[] = [];

    if (!normalizedFilterBy || !normalizedFilter) {
      pool = await getAllProducts();
    } else {
      const productCount = count || 10;
      pool = await filterProducts(normalizedFilterBy, normalizedFilter, productCount);
    }

    if (pool.length === 0) {
      return null;
    }

    const randomIndex = Math.floor(Math.random() * pool.length);
    return pool[randomIndex];
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

