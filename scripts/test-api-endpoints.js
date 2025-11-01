const axios = require('axios');

// Configuration
const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const API_KEY = process.env.API_KEY;

async function testEndpoints() {
  const strapi = axios.create({
    baseURL: `${STRAPI_URL}/api`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': API_KEY ? `Bearer ${API_KEY}` : '',
    },
  });

  try {
    console.log('🔍 Testing API endpoints...\n');

    // Test 1: Get products
    console.log('1. Testing GET /products');
    const getResponse = await strapi.get('/products');
    console.log(`✅ Found ${getResponse.data.data.length} products`);
    
    if (getResponse.data.data.length > 0) {
      const firstProduct = getResponse.data.data[0];
      console.log(`   First product: ${firstProduct.name} (ID: ${firstProduct.id}, DocumentID: ${firstProduct.documentId})`);
      
      // Test 2: Try updating with regular ID
      console.log('\n2. Testing PUT /products/{id}');
      try {
        const updateData = {
          data: {
            SKU: 'TEST-SKU-123'
          }
        };
        const updateResponse = await strapi.put(`/products/${firstProduct.id}`, updateData);
        console.log(`✅ Update with regular ID successful`);
        console.log(`   Updated product: ${updateResponse.data.data.name}`);
      } catch (error) {
        console.log(`❌ Update with regular ID failed: ${error.response?.status} ${error.response?.statusText}`);
        console.log(`   Error details: ${JSON.stringify(error.response?.data, null, 2)}`);
      }

      // Test 3: Try updating with documentId
      console.log('\n3. Testing PUT /products/{documentId}');
      try {
        const updateData = {
          data: {
            SKU: 'TEST-SKU-DOC-456'
          }
        };
        const updateResponse = await strapi.put(`/products/${firstProduct.documentId}`, updateData);
        console.log(`✅ Update with documentId successful`);
        console.log(`   Updated product: ${updateResponse.data.data.name}`);
      } catch (error) {
        console.log(`❌ Update with documentId failed: ${error.response?.status} ${error.response?.statusText}`);
        console.log(`   Error details: ${JSON.stringify(error.response?.data, null, 2)}`);
      }

      // Test 4: Check if we need different endpoint structure
      console.log('\n4. Testing different endpoint structures...');
      const endpoints = [
        `/products/${firstProduct.id}`,
        `/products/${firstProduct.documentId}`,
        `/products?documentId=${firstProduct.documentId}`,
        `/product/${firstProduct.id}`,
        `/product/${firstProduct.documentId}`
      ];

      for (const endpoint of endpoints) {
        try {
          const response = await strapi.get(endpoint);
          console.log(`✅ GET ${endpoint} - Success (${response.data.data?.length || 'single item'})`);
        } catch (error) {
          console.log(`❌ GET ${endpoint} - Failed (${error.response?.status})`);
        }
      }
    }

  } catch (error) {
    console.error('❌ Error testing endpoints:', error.message);
    if (error.response) {
      console.error('   Status:', error.response.status);
      console.error('   Data:', JSON.stringify(error.response.data, null, 2));
    }
  }
}

testEndpoints();
