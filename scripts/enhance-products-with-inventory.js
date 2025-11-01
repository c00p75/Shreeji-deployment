const axios = require('axios');

// Configuration
const STRAPI_URL = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const API_KEY = process.env.API_KEY || process.env.NEXT_PUBLIC_STRAPI_API_KEY;

class ProductInventoryEnhancer {
  constructor() {
    this.strapi = axios.create({
      baseURL: `${STRAPI_URL}/api`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': API_KEY ? `Bearer ${API_KEY}` : '',
      },
    });
  }

  async testConnection() {
    try {
      const response = await this.strapi.get('/products');
      console.log(`✅ Connected to Strapi. Found ${response.data.data.length} products.`);
      return true;
    } catch (error) {
      console.error('❌ Failed to connect to Strapi:', error.message);
      return false;
    }
  }

  async enhanceProductsWithInventory() {
    console.log('🚀 Starting product inventory enhancement...');

    if (!(await this.testConnection())) {
      return;
    }

    try {
      // Fetch all products
      const response = await this.strapi.get('/products');
      const products = response.data.data;

      console.log(`📦 Found ${products.length} products to enhance`);

      let enhanced = 0;
      let errors = 0;

      for (const product of products) {
        try {
          // Skip if already has inventory data
          if (product.SKU) {
            console.log(`⏭️  Skipping ${product.name} - already has inventory data`);
            continue;
          }
          
          // Generate SKU if not exists
          const sku = product.sku || this.generateSKU(product.name, product.brand);
          
          // Set random inventory data (you can customize this)
          const stockQuantity = this.generateRandomStock();
          const minStockLevel = Math.max(5, Math.floor(stockQuantity * 0.3));
          const maxStockLevel = Math.max(50, Math.floor(stockQuantity * 2));
          const stockStatus = this.determineStockStatus(stockQuantity, minStockLevel);
          
          // Generate cost price (70-85% of selling price)
          const priceStr = product.price || '0';
          const price = parseFloat(priceStr.replace(/[^0-9.]/g, '')) || 0;
          const costPrice = price > 0 ? Math.round(price * (0.7 + Math.random() * 0.15)) : 0;

          const updateData = {
            data: {
              SKU: sku,
              stockQuantity: stockQuantity,
              minStockLevel: minStockLevel,
              maxStockLevel: maxStockLevel,
              stockStatus: stockStatus,
              costPrice: costPrice,
              taxRate: 16, // 16% VAT (Zambia)
              weight: this.generateRandomWeight(),
              Dimensions: this.generateRandomDimensions(),
            }
          };

          await this.strapi.put(`/products/${product.documentId}`, updateData);
          
          console.log(`✅ Enhanced: ${product.name} (SKU: ${sku}, Stock: ${stockQuantity})`);
          enhanced++;
          
        } catch (error) {
          console.error(`❌ Failed to enhance product ${product.name || 'Unknown'}:`, error.message);
          errors++;
        }
      }

      console.log(`\n🎉 Enhancement completed!`);
      console.log(`✅ Enhanced: ${enhanced} products`);
      console.log(`❌ Errors: ${errors} products`);
      
    } catch (error) {
      console.error('❌ Error fetching products:', error.message);
    }
  }

  generateSKU(name, brand) {
    const brandCode = (brand || 'GEN').substring(0, 3).toUpperCase();
    const productCode = name
      .replace(/[^a-zA-Z0-9]/g, '')
      .substring(0, 6)
      .toUpperCase();
    const randomSuffix = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${brandCode}-${productCode}-${randomSuffix}`;
  }

  generateRandomStock() {
    // Generate realistic stock levels
    const categories = [0, 5, 10, 15, 20, 25, 30, 40, 50, 75, 100];
    const weights = [0.05, 0.1, 0.15, 0.2, 0.15, 0.1, 0.1, 0.05, 0.05, 0.03, 0.02];
    
    const random = Math.random();
    let cumulative = 0;
    
    for (let i = 0; i < categories.length; i++) {
      cumulative += weights[i];
      if (random <= cumulative) {
        return categories[i];
      }
    }
    
    return 10; // Default fallback
  }

  determineStockStatus(quantity, minLevel) {
    if (quantity === 0) return 'out-of-stock';
    if (quantity <= minLevel) return 'low-stock';
    return 'in-stock';
  }

  generateRandomWeight() {
    // Weight in kg (0.1kg to 50kg)
    return Math.round((Math.random() * 49.9 + 0.1) * 100) / 100;
  }

  generateRandomDimensions() {
    // Dimensions in cm (Length x Width x Height)
    const length = Math.round((Math.random() * 80 + 10) * 10) / 10;
    const width = Math.round((Math.random() * 60 + 5) * 10) / 10;
    const height = Math.round((Math.random() * 40 + 2) * 10) / 10;
    
    return {
      length: length,
      width: width,
      height: height,
      unit: 'cm'
    };
  }
}

// Run the enhancement
const enhancer = new ProductInventoryEnhancer();
enhancer.enhanceProductsWithInventory();
