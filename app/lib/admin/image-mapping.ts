// Image mapping utility for mapping Strapi products to local images
import imageMapping from '@/data/product-image-mapping.json';

export interface ImageMapping {
  generatedAt: string;
  totalProducts: number;
  mappings: Record<string, string[]>;
}

// Convert @/public path to /public path for Next.js
function convertImagePath(path: string): string {
  return path.replace('@/public', '/public');
}

// Get images for a product by name
export function getProductImages(productName: string): string[] {
  const mappedImages = imageMapping.mappings[productName];
  if (mappedImages && mappedImages.length > 0) {
    return mappedImages.map(convertImagePath);
  }
  return [];
}

// Get the main (first) image for a product
export function getMainProductImage(productName: string): string {
  const images = getProductImages(productName);
  return images.length > 0 ? images[0] : '/public/products/placeholder.png';
}

// Check if a product has mapped images
export function hasProductImages(productName: string): boolean {
  return imageMapping.mappings[productName] && imageMapping.mappings[productName].length > 0;
}

// Get all available product names with images
export function getAvailableProducts(): string[] {
  return Object.keys(imageMapping.mappings);
}

// Enhanced image processing that prioritizes local images
export function processProductImages(product: any): Array<{ url: string; alt: string; isMain?: boolean }> {
  const productName = product.name;
  
  // First, try to get local images from mapping
  const localImages = getProductImages(productName);
  if (localImages.length > 0) {
    return localImages.map((imagePath, index) => ({
      url: imagePath,
      alt: productName,
      isMain: index === 0
    }));
  }
  
  // Fallback to Strapi images if no local mapping found
  let images = [];
  
  if (product.images && Array.isArray(product.images) && product.images.length > 0) {
    // Case 1: images is an array
    images = product.images.map((img: any) => ({
      url: typeof img === 'string' ? img : (img.url || img.src || img),
      alt: typeof img === 'string' ? productName : (img.alt || productName),
      isMain: true
    }));
  } else if (product.image) {
    // Case 2: image is a single string URL
    images = [{ url: product.image, alt: productName, isMain: true }];
  } else if (product.media) {
    // Case 3: media field (Strapi media)
    if (Array.isArray(product.media)) {
      images = product.media.map((media: any) => ({
        url: media.url || media.attributes?.url || media,
        alt: media.alt || productName,
        isMain: true
      }));
    } else {
      images = [{ url: product.media.url || product.media, alt: productName, isMain: true }];
    }
  } else {
    // Case 4: No image found, use placeholder
    images = [{ url: '/public/products/placeholder.png', alt: productName, isMain: true }];
  }

  return images;
}

export default imageMapping;
