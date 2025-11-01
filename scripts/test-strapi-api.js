#!/usr/bin/env node

/**
 * Test script to debug Strapi API issues
 */

const STRAPI_URL = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const API_KEY = process.env.API_KEY || process.env.NEXT_PUBLIC_STRAPI_API_KEY;

console.log('🔍 Testing Strapi API...\n');

// Test 1: Check if Strapi is accessible
async function testStrapiAccess() {
  try {
    const response = await fetch(`${STRAPI_URL}/admin`);
    console.log(`✅ Strapi admin accessible (Status: ${response.status})`);
    return true;
  } catch (error) {
    console.log(`❌ Strapi admin not accessible: ${error.message}`);
    return false;
  }
}

// Test 2: Test API without authentication
async function testAPIWithoutAuth() {
  try {
    const response = await fetch(`${STRAPI_URL}/api/products`);
    console.log(`📡 API without auth (Status: ${response.status})`);
    
    if (response.status === 403) {
      console.log('   → API requires authentication (expected)');
      return true;
    } else if (response.status === 404) {
      console.log('   → Product content type not found or not published');
      return false;
    } else {
      console.log('   → Unexpected status');
      return false;
    }
  } catch (error) {
    console.log(`❌ API test failed: ${error.message}`);
    return false;
  }
}

// Test 3: Test API with authentication
async function testAPIWithAuth() {
  if (!API_KEY) {
    console.log('❌ No API key provided');
    return false;
  }
  
  try {
    const response = await fetch(`${STRAPI_URL}/api/products`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`
      }
    });
    
    console.log(`🔑 API with auth (Status: ${response.status})`);
    
    if (response.ok) {
      const data = await response.json();
      console.log(`✅ API working! Found ${data.data ? data.data.length : 0} products`);
      return true;
    } else if (response.status === 404) {
      console.log('   → Product content type not found or not published');
      return false;
    } else if (response.status === 403) {
      console.log('   → API key lacks permissions');
      return false;
    } else {
      const errorText = await response.text();
      console.log(`   → Error: ${errorText}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ API with auth failed: ${error.message}`);
    return false;
  }
}

// Test 4: Check content types
async function checkContentTypes() {
  try {
    const response = await fetch(`${STRAPI_URL}/api/content-manager/content-types`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('\n📋 Available content types:');
      data.data.forEach(ct => {
        console.log(`   - ${ct.uid} (${ct.info.displayName})`);
      });
      
      const productType = data.data.find(ct => ct.uid === 'api::product.product');
      if (productType) {
        console.log('✅ Product content type found');
        return true;
      } else {
        console.log('❌ Product content type not found');
        return false;
      }
    } else {
      console.log(`❌ Cannot fetch content types (Status: ${response.status})`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Content types check failed: ${error.message}`);
    return false;
  }
}

// Run all tests
async function runTests() {
  console.log(`🔗 Testing: ${STRAPI_URL}`);
  console.log(`🔑 API Key: ${API_KEY ? 'Provided' : 'Not provided'}\n`);
  
  const tests = [
    { name: 'Strapi Access', fn: testStrapiAccess },
    { name: 'API Without Auth', fn: testAPIWithoutAuth },
    { name: 'API With Auth', fn: testAPIWithAuth },
    { name: 'Content Types', fn: checkContentTypes }
  ];
  
  for (const test of tests) {
    console.log(`\n🧪 ${test.name}:`);
    await test.fn();
  }
  
  console.log('\n💡 Next steps:');
  console.log('1. If Product content type not found: Check Content-Type Builder');
  console.log('2. If permissions issue: Check Users & Permissions Plugin → Roles');
  console.log('3. If content type exists but 404: Try restarting Strapi');
}

runTests().catch(console.error);
