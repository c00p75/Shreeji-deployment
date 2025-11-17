const axios = require('axios');

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_KEY;

async function checkBrandsEndpoint() {
  console.log('🔍 Checking Brands Endpoint Availability\n');
  console.log(`Strapi URL: ${STRAPI_URL}`);
  console.log(`API Key: ${API_KEY ? 'Set' : 'Not set'}\n`);

  const headers = {};
  if (API_KEY) {
    headers['Authorization'] = `Bearer ${API_KEY}`;
  }

  // Test 1: Check if endpoint exists (GET request)
  console.log('📡 Test 1: GET /api/brands');
  console.log('-----------------------------------');
  try {
    const response = await axios.get(`${STRAPI_URL}/api/brands`, { headers });
    console.log('✅ Endpoint exists!');
    console.log(`   Status: ${response.status}`);
    console.log(`   Data count: ${response.data?.data?.length || 0}`);
    console.log(`   Response structure:`, JSON.stringify(Object.keys(response.data || {}), null, 2));
    return true;
  } catch (error) {
    if (error.response) {
      console.log(`❌ Endpoint returned error: ${error.response.status} ${error.response.statusText}`);
      if (error.response.status === 404) {
        console.log('   → Brand content type does not exist in Strapi');
        console.log('   → Run: node scripts/setup-brand-content-type.js for setup instructions');
      } else if (error.response.status === 401 || error.response.status === 403) {
        console.log('   → Authentication failed');
        console.log('   → Check if you are logged in or API key is valid');
      } else {
        console.log('   → Error details:', error.response.data);
      }
    } else if (error.request) {
      console.log('❌ No response received');
      console.log('   → Strapi server might not be running');
      console.log(`   → Check if Strapi is running on ${STRAPI_URL}`);
    } else {
      console.log('❌ Error:', error.message);
    }
    return false;
  }
}

async function checkWithAuth() {
  console.log('\n📡 Test 2: GET /api/brands (with Admin JWT)');
  console.log('-----------------------------------');
  
  // Try to get stored token from localStorage simulation
  // In a real scenario, this would check browser localStorage
  console.log('   Note: Admin JWT token check requires browser context');
  console.log('   → Make sure you are logged into the admin dashboard');
  console.log('   → The token should be stored in localStorage as "strapi_admin_jwt"');
}

async function checkContentTypes() {
  console.log('\n📡 Test 3: Check Content Types');
  console.log('-----------------------------------');
  
  const headers = {};
  if (API_KEY) {
    headers['Authorization'] = `Bearer ${API_KEY}`;
  }

  try {
    // Try to access content-type-builder or admin API to list content types
    // Note: This might require admin authentication
    const response = await axios.get(`${STRAPI_URL}/api/products?pagination[pageSize]=1`, { headers });
    console.log('✅ Products endpoint is accessible');
    console.log('   → This confirms Strapi API is working');
    console.log('   → If brands endpoint fails, Brand content type needs to be created');
  } catch (error) {
    console.log('⚠️  Could not verify products endpoint');
    console.log('   → This might indicate Strapi is not running or not accessible');
  }
}

async function run() {
  const endpointExists = await checkBrandsEndpoint();
  await checkWithAuth();
  await checkContentTypes();

  console.log('\n📋 SUMMARY');
  console.log('==========');
  if (endpointExists) {
    console.log('✅ Brands endpoint is available and working!');
    console.log('   → You can now add brands from the admin dashboard');
  } else {
    console.log('❌ Brands endpoint is not available');
    console.log('   → Follow these steps:');
    console.log('   1. Run: node scripts/setup-brand-content-type.js');
    console.log('   2. Create Brand content type in Strapi Admin');
    console.log('   3. Set up permissions');
    console.log('   4. Restart Strapi');
    console.log('   5. Run this script again to verify');
  }
  console.log('');
}

run().catch(console.error);

