#!/usr/bin/env node

/**
 * Setup script to create Product content type in Strapi
 */

const fs = require('fs');
const path = require('path');

// Configuration
const STRAPI_URL = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const API_KEY = process.env.API_KEY || process.env.NEXT_PUBLIC_STRAPI_API_KEY;

class StrapiSetup {
  constructor() {
    this.baseURL = `${STRAPI_URL}/api`;
    this.headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    };
  }

  // Test connection
  async testConnection() {
    try {
      const response = await fetch(`${this.baseURL}/products`, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`
        }
      });
      
      console.log(`🔗 Testing API connection... Status: ${response.status}`);
      
      if (response.status === 404) {
        console.log('📝 Product content type needs to be created');
        return 'needs_setup';
      } else if (response.ok) {
        console.log('✅ Product content type already exists');
        return 'ready';
      } else {
        console.log(`❌ API error: ${response.status}`);
        return 'error';
      }
    } catch (error) {
      console.error('❌ Connection error:', error.message);
      return 'error';
    }
  }

  // Check if we can access the admin panel
  async checkAdminAccess() {
    try {
      const response = await fetch(`${STRAPI_URL}/admin`);
      if (response.ok) {
        console.log('✅ Strapi admin panel is accessible');
        return true;
      } else {
        console.log(`❌ Admin panel returned: ${response.status}`);
        return false;
      }
    } catch (error) {
      console.error('❌ Cannot access admin panel:', error.message);
      return false;
    }
  }

  // Show setup instructions
  showSetupInstructions() {
    console.log('\n📋 Manual Setup Required:');
    console.log('========================');
    console.log('1. Open your browser and go to: http://localhost:1337/admin');
    console.log('2. If you haven\'t created an admin account yet:');
    console.log('   - Fill in the admin registration form');
    console.log('   - Choose a strong password');
    console.log('   - Complete the setup');
    console.log('');
    console.log('3. Create the Product content type:');
    console.log('   - Go to Content-Type Builder');
    console.log('   - Click "Create new collection type"');
    console.log('   - Name: "Product"');
    console.log('   - Click "Continue"');
    console.log('');
    console.log('4. Add the following fields:');
    console.log('   - name (Text, Required, Unique)');
    console.log('   - slug (UID, Target field: name)');
    console.log('   - category (Text, Required)');
    console.log('   - subcategory (Text, Required)');
    console.log('   - brand (Text, Required)');
    console.log('   - tagline (Text)');
    console.log('   - description (Rich text)');
    console.log('   - price (Text, Required)');
    console.log('   - discountedPrice (Text)');
    console.log('   - specs (JSON)');
    console.log('   - specialFeature (JSON)');
    console.log('   - images (JSON)');
    console.log('   - isActive (Boolean, Default: true)');
    console.log('   - featured (Boolean, Default: false)');
    console.log('   - stock (Enumeration: in-stock, out-of-stock, limited)');
    console.log('');
    console.log('5. Save the content type');
    console.log('');
    console.log('6. Set permissions:');
    console.log('   - Go to Settings → Users & Permissions Plugin → Roles');
    console.log('   - Click on "Public"');
    console.log('   - Enable "find" and "findOne" for Products');
    console.log('   - Click on "Authenticated"');
    console.log('   - Enable all permissions for Products');
    console.log('   - Save');
    console.log('');
    console.log('7. Run the import script again:');
    console.log('   node scripts/import-products.js');
  }

  // Run setup check
  async run() {
    console.log('🚀 Checking Strapi setup...\n');
    
    // Check admin access
    const adminAccess = await this.checkAdminAccess();
    if (!adminAccess) {
      console.log('\n❌ Cannot access Strapi admin panel');
      console.log('   Make sure Strapi is running: cd ../shreeji-cms && pnpm develop');
      return;
    }

    // Test API connection
    const status = await this.testConnection();
    
    if (status === 'needs_setup') {
      this.showSetupInstructions();
    } else if (status === 'ready') {
      console.log('\n🎉 Strapi is ready for product import!');
      console.log('   Run: node scripts/import-products.js');
    } else {
      console.log('\n❌ Setup failed. Please check your configuration.');
    }
  }
}

// Run setup
if (require.main === module) {
  const setup = new StrapiSetup();
  setup.run().catch(console.error);
}

module.exports = StrapiSetup;
