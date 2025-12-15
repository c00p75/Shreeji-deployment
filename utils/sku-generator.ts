/**
 * Generates a unique SKU based on product name and brand
 * Format: BRAND-PRODUCT-TIMESTAMP-RANDOM
 * Example: APP-IPHONE-1734567890123-A7B9C2
 * 
 * Uses full timestamp and random alphanumeric string for maximum uniqueness
 */
export function generateSKU(productName: string, brandName?: string | number): string {
  // Get brand code (first 3 characters, uppercase)
  let brandCode = 'GEN'; // Default to 'GEN' for generic products
  
  if (brandName) {
    const brandStr = typeof brandName === 'string' 
      ? brandName 
      : brandName.toString();
    brandCode = brandStr.substring(0, 3).toUpperCase().replace(/[^A-Z0-9]/g, '') || 'GEN';
  }
  
  // Get product code (first 6 alphanumeric characters from name, uppercase)
  const productCode = productName
    .replace(/[^a-zA-Z0-9]/g, '')
    .substring(0, 6)
    .toUpperCase() || 'PROD';
  
  // Use full timestamp for better uniqueness
  const timestamp = Date.now().toString();
  
  // Generate random alphanumeric suffix (6 characters) for additional uniqueness
  const randomChars = Math.random().toString(36).substring(2, 8).toUpperCase();
  
  return `${brandCode}-${productCode}-${timestamp}-${randomChars}`;
}

/**
 * Generates a simple SKU using timestamp (fallback)
 * Format: SKU-TIMESTAMP-RANDOM
 */
export function generateSimpleSKU(): string {
  const timestamp = Date.now().toString();
  const randomChars = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `SKU-${timestamp}-${randomChars}`;
}

/**
 * Generates a unique SKU with retry logic if SKU already exists
 * @param productName - Product name
 * @param brandName - Brand name (optional)
 * @param checkExists - Function to check if SKU exists (optional)
 * @param maxRetries - Maximum number of retry attempts (default: 5)
 * @returns Promise resolving to a unique SKU
 */
export async function generateUniqueSKU(
  productName: string,
  brandName?: string | number,
  checkExists?: (sku: string) => Promise<boolean>,
  maxRetries: number = 5
): Promise<string> {
  let sku = generateSKU(productName, brandName);
  let attempts = 0;

  // If no check function provided, return the generated SKU
  if (!checkExists) {
    return sku;
  }

  // Check and regenerate if SKU exists
  while (await checkExists(sku) && attempts < maxRetries) {
    attempts++;
    // Add a small delay to ensure different timestamp
    await new Promise(resolve => setTimeout(resolve, 1));
    sku = generateSKU(productName, brandName);
  }

  if (attempts >= maxRetries) {
    // If we've exhausted retries, use a more unique format
    const timestamp = Date.now().toString();
    const randomSuffix = Math.random().toString(36).substring(2, 12).toUpperCase();
    sku = generateSKU(productName, brandName) + `-${randomSuffix}`;
  }

  return sku;
}

/**
 * Generates a unique SKU for a product variant based on product name and variant attributes
 * Format: PRODUCT-ATTRS-TIMESTAMP-RANDOM
 * Example: IPHONE-L-RED-1734567890123-A7B9C2
 * 
 * @param productName - Product name
 * @param variantSpecs - Variant specifications/attributes (e.g., { Size: 'L', Color: 'Red' })
 * @returns Generated SKU string
 */
export function generateVariantSKU(
  productName: string,
  variantSpecs: Record<string, string>
): string {
  // Get product code (first 6 alphanumeric characters from name, uppercase)
  const productCode = productName
    .replace(/[^a-zA-Z0-9]/g, '')
    .substring(0, 6)
    .toUpperCase() || 'PROD';
  
  // Get variant attributes code (first 2-3 chars of each attribute value, joined by hyphens)
  const attrCodes: string[] = [];
  Object.entries(variantSpecs).forEach(([key, value]) => {
    if (value && value.trim()) {
      const code = value
        .replace(/[^a-zA-Z0-9]/g, '')
        .substring(0, 3)
        .toUpperCase();
      if (code) {
        attrCodes.push(code);
      }
    }
  });
  
  const attrsCode = attrCodes.length > 0 
    ? attrCodes.join('-') 
    : 'VAR';
  
  // Use full timestamp for better uniqueness
  const timestamp = Date.now().toString();
  
  // Generate random alphanumeric suffix (6 characters) for additional uniqueness
  const randomChars = Math.random().toString(36).substring(2, 8).toUpperCase();
  
  return `${productCode}-${attrsCode}-${timestamp}-${randomChars}`;
}

/**
 * Generates a unique variant SKU with retry logic if SKU already exists
 * @param productName - Product name
 * @param variantSpecs - Variant specifications/attributes
 * @param checkExists - Function to check if SKU exists (optional)
 * @param maxRetries - Maximum number of retry attempts (default: 5)
 * @returns Promise resolving to a unique SKU
 */
export async function generateUniqueVariantSKU(
  productName: string,
  variantSpecs: Record<string, string>,
  checkExists?: (sku: string) => Promise<boolean>,
  maxRetries: number = 5
): Promise<string> {
  let sku = generateVariantSKU(productName, variantSpecs);
  let attempts = 0;

  // If no check function provided, return the generated SKU
  if (!checkExists) {
    return sku;
  }

  // Check and regenerate if SKU exists
  while (await checkExists(sku) && attempts < maxRetries) {
    attempts++;
    // Add a small delay to ensure different timestamp
    await new Promise(resolve => setTimeout(resolve, 1));
    sku = generateVariantSKU(productName, variantSpecs);
  }

  if (attempts >= maxRetries) {
    // If we've exhausted retries, use a more unique format
    const timestamp = Date.now().toString();
    const randomSuffix = Math.random().toString(36).substring(2, 12).toUpperCase();
    sku = generateVariantSKU(productName, variantSpecs) + `-${randomSuffix}`;
  }

  return sku;
}

