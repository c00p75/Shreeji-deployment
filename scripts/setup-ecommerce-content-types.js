const axios = require('axios');

// Configuration
const STRAPI_URL = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const API_KEY = process.env.API_KEY || process.env.NEXT_PUBLIC_STRAPI_API_KEY;

class EcommerceSetup {
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

  async checkContentTypes() {
    console.log('🔍 Checking existing content types...');
    
    const contentTypes = [
      'products',
      'customers', 
      'orders',
      'order-items',
      'addresses',
      'payments',
      'coupons',
      'reviews'
    ];

    for (const contentType of contentTypes) {
      try {
        const response = await this.strapi.get(`/${contentType}`);
        console.log(`✅ ${contentType}: Found (${response.data.data.length} records)`);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.log(`❌ ${contentType}: Not found - needs to be created`);
        } else {
          console.log(`⚠️  ${contentType}: Error checking - ${error.message}`);
        }
      }
    }
  }

  async addInventoryFieldsToProducts() {
    console.log('\n📦 Adding inventory fields to existing products...');
    
    try {
      const response = await this.strapi.get('/products');
      const products = response.data.data;
      
      console.log(`Found ${products.length} products to enhance with inventory data`);
      
      let enhanced = 0;
      let errors = 0;

      for (const product of products) {
        try {
          // Skip if already has inventory data
          if (product.sku) {
            console.log(`⏭️  Skipping ${product.name} - already has inventory data`);
            continue;
          }

          const sku = this.generateSKU(product.name, product.brand);
          const stockQuantity = this.generateRandomStock();
          const minStockLevel = Math.max(5, Math.floor(stockQuantity * 0.3));
          const maxStockLevel = Math.max(50, Math.floor(stockQuantity * 2));
          const stockStatus = this.determineStockStatus(stockQuantity, minStockLevel);
          
          const priceStr = product.price || '0';
          const price = parseFloat(priceStr.replace(/[^0-9.]/g, '')) || 0;
          const costPrice = Math.round(price * (0.7 + Math.random() * 0.15));

          const updateData = {
            data: {
              sku: sku,
              stockQuantity: stockQuantity,
              minStockLevel: minStockLevel,
              maxStockLevel: maxStockLevel,
              stockStatus: stockStatus,
              costPrice: costPrice,
              taxRate: 16,
              weight: this.generateRandomWeight(),
              dimensions: this.generateRandomDimensions(),
              isDigital: false,
            }
          };

          await this.strapi.put(`/products/${product.id}`, updateData);
          console.log(`✅ Enhanced: ${product.name} (SKU: ${sku}, Stock: ${stockQuantity})`);
          enhanced++;
          
        } catch (error) {
          console.error(`❌ Failed to enhance ${product.name}:`, error.response?.data || error.message);
          errors++;
        }
      }

      console.log(`\n🎉 Product enhancement completed!`);
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
    
    return 10;
  }

  determineStockStatus(quantity, minLevel) {
    if (quantity === 0) return 'out-of-stock';
    if (quantity <= minLevel) return 'low-stock';
    return 'in-stock';
  }

  generateRandomWeight() {
    return Math.round((Math.random() * 49.9 + 0.1) * 100) / 100;
  }

  generateRandomDimensions() {
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

  printSetupInstructions() {
    console.log('\n📋 E-COMMERCE SETUP INSTRUCTIONS');
    console.log('=====================================');
    console.log('\n🔧 STEP 1: Add Inventory Fields to Product Content Type');
    console.log('1. Go to http://localhost:1337/admin');
    console.log('2. Navigate to Content-Type Builder');
    console.log('3. Click on "Product" collection type');
    console.log('4. Add these fields:');
    console.log('   - SKU (Text, Required, Unique)');
    console.log('   - Stock Quantity (Number, Required, Default: 0)');
    console.log('   - Min Stock Level (Number, Default: 5)');
    console.log('   - Max Stock Level (Number, Default: 100)');
    console.log('   - Stock Status (Enumeration: in-stock, low-stock, out-of-stock, discontinued)');
    console.log('   - Cost Price (Number, Default: 0)');
    console.log('   - Tax Rate (Number, Default: 16)');
    console.log('   - Weight (Number, Default: 0)');
    console.log('   - Dimensions (JSON)');
    console.log('   - Is Digital (Boolean, Default: false)');
    console.log('5. Save the content type');

    console.log('\n🔧 STEP 2: Create New Content Types');
    console.log('Create these collection types in Content-Type Builder:');
    console.log('1. Customer - Customer accounts and profiles');
    console.log('2. Order - Customer orders with tracking');
    console.log('3. Order Item - Individual products in orders');
    console.log('4. Address - Shipping and billing addresses');
    console.log('5. Payment - Payment records and transactions');
    console.log('6. Coupon - Discount codes and promotions');
    console.log('7. Review - Product reviews and ratings');

    console.log('\n🔧 STEP 3: Set Permissions');
    console.log('For each content type, set permissions:');
    console.log('- Public: find, findOne (for products and reviews)');
    console.log('- Authenticated: Full access');
    console.log('- Admin: Full access');

    console.log('\n🔧 STEP 4: Run Product Enhancement');
    console.log('After adding inventory fields, run:');
    console.log('node scripts/enhance-products-with-inventory.js');

    console.log('\n🚀 STEP 5: Test Your Setup');
    console.log('- Visit http://localhost:3001 (Admin Dashboard)');
    console.log('- Check inventory management page');
    console.log('- Verify products have inventory data');
    console.log('- Test API endpoints');

    console.log('\n📚 Documentation:');
    console.log('- Full setup guide: ECOMMERCE-SETUP-GUIDE.md');
    console.log('- Content type schemas: strapi-content-types/');
  }

  async run() {
    console.log('🛒 E-COMMERCE CMS SETUP');
    console.log('========================\n');

    if (!(await this.testConnection())) {
      console.log('\n❌ Cannot proceed without Strapi connection.');
      console.log('Make sure Strapi is running on http://localhost:1337');
      return;
    }

    await this.checkContentTypes();
    
    console.log('\n📋 SETUP INSTRUCTIONS:');
    this.printSetupInstructions();

    console.log('\n⏳ Waiting for you to complete the manual setup steps...');
    console.log('Once you\'ve added the inventory fields to the Product content type,');
    console.log('run this script again to enhance your products with inventory data.');
  }
}

// Run the setup
const setup = new EcommerceSetup();
setup.run();
