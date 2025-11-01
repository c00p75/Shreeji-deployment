const axios = require('axios');

// Configuration
const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const API_KEY = process.env.API_KEY;

class ApiTester {
  constructor() {
    this.strapi = axios.create({
      baseURL: `${STRAPI_URL}/api`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': API_KEY ? `Bearer ${API_KEY}` : '',
      },
    });
  }

  async testEndpoint(endpoint, description) {
    try {
      const response = await this.strapi.get(endpoint);
      console.log(`✅ ${description}: ${response.data.data.length} records`);
      return { success: true, count: response.data.data.length };
    } catch (error) {
      console.log(`❌ ${description}: ${error.response?.status} ${error.response?.statusText}`);
      return { success: false, error: error.response?.status };
    }
  }

  async testAllApis() {
    console.log('🧪 TESTING ALL E-COMMERCE APIs');
    console.log('================================\n');

    const endpoints = [
      { endpoint: '/products', description: 'Products API' },
      { endpoint: '/customers', description: 'Customers API' },
      { endpoint: '/addresses', description: 'Addresses API' },
      { endpoint: '/orders', description: 'Orders API' },
      { endpoint: '/order-items', description: 'Order Items API' },
      { endpoint: '/payments', description: 'Payments API' },
      { endpoint: '/coupons', description: 'Coupons API' },
      { endpoint: '/reviews', description: 'Reviews API' }
    ];

    const results = [];
    
    for (const { endpoint, description } of endpoints) {
      const result = await this.testEndpoint(endpoint, description);
      results.push({ endpoint, description, ...result });
    }

    console.log('\n📊 SUMMARY:');
    console.log('============');
    
    const successful = results.filter(r => r.success);
    const failed = results.filter(r => !r.success);
    
    console.log(`✅ Working APIs: ${successful.length}/${results.length}`);
    console.log(`❌ Failed APIs: ${failed.length}/${results.length}`);
    
    if (successful.length > 0) {
      console.log('\n✅ Working APIs:');
      successful.forEach(r => {
        console.log(`   - ${r.description}: ${r.count} records`);
      });
    }
    
    if (failed.length > 0) {
      console.log('\n❌ Failed APIs:');
      failed.forEach(r => {
        console.log(`   - ${r.description}: Error ${r.error}`);
      });
    }

    console.log('\n🎯 NEXT STEPS:');
    if (failed.length === 0) {
      console.log('🎉 All APIs are working! Your e-commerce system is ready!');
      console.log('\n📋 You can now:');
      console.log('1. Visit admin dashboard: http://localhost:3002');
      console.log('2. Create sample customers, orders, and payments');
      console.log('3. Test the inventory management');
      console.log('4. Integrate with your main website');
    } else {
      console.log('⚠️  Some APIs failed. Please check:');
      console.log('1. Make sure all collection types are created');
      console.log('2. Check API permissions are set correctly');
      console.log('3. Ensure Strapi is running on http://localhost:1337');
    }
  }
}

// Run the test
const tester = new ApiTester();
tester.testAllApis();
