#!/usr/bin/env node

/**
 * Automated product import script for Strapi
 * Uses the API key from environment variables
 */

const fs = require('fs');
const path = require('path');

// Configuration
const STRAPI_URL = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const API_KEY = process.env.API_KEY || process.env.NEXT_PUBLIC_STRAPI_API_KEY;
const PRODUCTS_FILE = path.join(__dirname, '../strapi-migration-output/products.json');

class AutomatedImporter {
  constructor() {
    this.products = [];
    this.importedCount = 0;
    this.errorCount = 0;
    this.skippedCount = 0;
  }

  // Check if API key is available
  checkAPIKey() {
    if (!API_KEY) {
      console.error('❌ API key not found in environment variables');
      console.error('   Make sure NEXT_PUBLIC_STRAPI_API_KEY is set in your .env.local file');
      return false;
    }
    return true;
  }

  // Load products from migration file
  loadProducts() {
    try {
      const data = fs.readFileSync(PRODUCTS_FILE, 'utf8');
      this.products = JSON.parse(data);
      console.log(`📦 Loaded ${this.products.length} products from migration file`);
    } catch (error) {
      console.error('❌ Error loading products file:', error.message);
      process.exit(1);
    }
  }

  // Check if product already exists
  async checkProductExists(slug) {
    try {
      const response = await fetch(`${STRAPI_URL}/api/products?filters[slug][$eq]=${slug}`, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        return data.data && data.data.length > 0;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  // Create a product in Strapi
  async createProduct(productData) {
    try {
      const response = await fetch(`${STRAPI_URL}/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          data: {
            name: productData.name,
            slug: productData.slug,
            category: productData.category,
            subcategory: productData.subcategory,
            brand: productData.brand,
            tagline: productData.tagline,
            description: productData.description,
            price: productData.price,
            discountedPrice: productData.discountedPrice,
            specs: productData.specs,
            specialFeature: productData.specialFeature,
            images: productData.images,
            isActive: productData.isActive,
            featured: productData.featured,
            stock: productData.stock
          }
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      console.log(`✅ Imported: ${productData.name}`);
      this.importedCount++;
      return result;
    } catch (error) {
      console.error(`❌ Failed to import ${productData.name}:`, error.message);
      this.errorCount++;
      return null;
    }
  }

  // Test Strapi connection
  async testConnection() {
    try {
      const response = await fetch(`${STRAPI_URL}/api/products`, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`
        }
      });
      
      if (response.ok) {
        console.log('✅ Successfully connected to Strapi API');
        return true;
      } else {
        console.error(`❌ Strapi API returned status: ${response.status}`);
        return false;
      }
    } catch (error) {
      console.error('❌ Cannot connect to Strapi API:', error.message);
      return false;
    }
  }

  // Import all products
  async importProducts() {
    console.log('🚀 Starting automated product import to Strapi...\n');
    
    // Check API key
    if (!this.checkAPIKey()) {
      return;
    }

    // Load products
    this.loadProducts();

    // Test connection
    console.log('🔗 Testing Strapi API connection...');
    if (!(await this.testConnection())) {
      console.log('\n💡 Make sure:');
      console.log('1. Strapi is running on http://localhost:1337');
      console.log('2. You have created an admin account');
      console.log('3. You have created an API token');
      console.log('4. Your API token has full access permissions');
      return;
    }

    console.log('\n🔄 Starting import process...\n');
    
    for (let i = 0; i < this.products.length; i++) {
      const product = this.products[i];
      console.log(`[${i + 1}/${this.products.length}] Processing: ${product.name}`);
      
      // Check if product already exists
      const exists = await this.checkProductExists(product.slug);
      if (exists) {
        console.log(`⏭️  Skipped (already exists): ${product.name}`);
        this.skippedCount++;
        continue;
      }

      // Import the product
      await this.createProduct(product);
      
      // Add a small delay to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log('\n🎉 Import completed!');
    console.log(`✅ Successfully imported: ${this.importedCount} products`);
    console.log(`⏭️  Skipped (already exists): ${this.skippedCount} products`);
    console.log(`❌ Failed imports: ${this.errorCount} products`);
    
    if (this.importedCount > 0) {
      console.log('\n🌐 Your products are now available at:');
      console.log(`   Dashboard: http://localhost:3001`);
      console.log(`   Strapi Admin: http://localhost:1337/admin`);
      console.log(`   API: http://localhost:1337/api/products`);
    }
  }
}

// Run the importer
if (require.main === module) {
  const importer = new AutomatedImporter();
  importer.importProducts().catch(console.error);
}

module.exports = AutomatedImporter;
