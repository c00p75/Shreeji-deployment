const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Configuration
const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337/api';
const STRAPI_API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_KEY;

const strapi = axios.create({
  baseURL: STRAPI_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
  },
});

class StrapiImporter {
  constructor() {
    this.importedCount = 0;
    this.errorCount = 0;
    this.errors = [];
  }

  async importProducts() {
    console.log('🚀 Starting Strapi import from productsData.js...\n');

    // Read the migrated data
    const dataPath = path.join(__dirname, '../strapi-migration-output/products-from-productsData.json');
    if (!fs.existsSync(dataPath)) {
      console.error('❌ No migrated data found. Please run the migration script first.');
      return;
    }

    const products = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    console.log(`📦 Found ${products.length} products to import\n`);

    // Check if products already exist
    try {
      const existingResponse = await strapi.get('/products?pagination[pageSize]=1');
      if (existingResponse.data.data.length > 0) {
        console.log('⚠️  Products already exist in Strapi. This will create duplicates.');
        console.log('   Consider clearing existing products first.\n');
      }
    } catch (error) {
      console.log('✅ No existing products found. Ready to import.\n');
    }

    // Import each product
    for (const product of products) {
      await this.importProduct(product);
    }

    this.printSummary();
  }

  async importProduct(product) {
    try {
      const productData = {
        data: {
          name: product.name,
          slug: product.slug,
          category: product.category,
          subcategory: product.subcategory,
          brand: product.brand,
          tagline: product.tagline,
          description: product.description,
          price: product.price,
          discountedPrice: product.discountedPrice,
          specs: product.specs,
          images: product.images,
          dateAdded: product.dateAdded,
          isActive: product.isActive,
        }
      };

      await strapi.post('/products', productData);
      console.log(`✅ Imported: ${product.name}`);
      this.importedCount++;

    } catch (error) {
      console.error(`❌ Failed to import ${product.name}:`, error.message);
      this.errorCount++;
      this.errors.push({
        product: product.name,
        error: error.message,
        details: error.response?.data || null
      });
    }
  }

  printSummary() {
    console.log('\n🎉 Import completed!');
    console.log('==================');
    console.log(`✅ Successfully imported: ${this.importedCount} products`);
    console.log(`❌ Failed imports: ${this.errorCount} products`);
    
    if (this.errors.length > 0) {
      console.log('\n📋 Error details:');
      this.errors.forEach((error, index) => {
        console.log(`${index + 1}. ${error.product}: ${error.error}`);
      });
    }

    console.log('\n🚀 Next steps:');
    console.log('1. Visit your admin dashboard: http://localhost:3002');
    console.log('2. Check the Products page to see imported data');
    console.log('3. Verify images are displaying correctly');
    console.log('4. Test the inventory management features');
    
    if (this.importedCount > 0) {
      console.log('\n✅ Your Strapi CMS now contains:');
      console.log(`   - ${this.importedCount} products with complete data`);
      console.log('   - Multiple images per product');
      console.log('   - Complete specifications');
      console.log('   - Category and brand information');
      console.log('   - Ready for admin dashboard use!');
    }
  }
}

// Test connection first
async function testConnection() {
  try {
    console.log('🔍 Testing Strapi connection...');
    const response = await strapi.get('/products?pagination[pageSize]=1');
    console.log('✅ Connected to Strapi successfully\n');
    return true;
  } catch (error) {
    console.error('❌ Failed to connect to Strapi:');
    console.error(`   Error: ${error.message}`);
    if (error.response) {
      console.error(`   Status: ${error.response.status}`);
      console.error(`   Details: ${JSON.stringify(error.response.data, null, 2)}`);
    }
    console.log('\n💡 Please ensure:');
    console.log('   1. Strapi is running on http://localhost:1337');
    console.log('   2. Your API token is correct');
    console.log('   3. Product content type exists in Strapi');
    console.log('   4. API permissions are set correctly');
    return false;
  }
}

// Main execution
async function main() {
  console.log('📦 STRAPI PRODUCT IMPORT');
  console.log('========================\n');

  const connected = await testConnection();
  if (!connected) {
    process.exit(1);
  }

  const importer = new StrapiImporter();
  await importer.importProducts();
}

main().catch(console.error);