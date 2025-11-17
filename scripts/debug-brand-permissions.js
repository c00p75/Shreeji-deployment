const axios = require('axios');

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

async function checkBrandContentType() {
  console.log('🔍 Debugging Brand Content Type Issues\n');
  console.log(`Strapi URL: ${STRAPI_URL}\n`);

  // Test 1: Check if brands endpoint works
  console.log('📡 Test 1: Check /api/brands endpoint');
  console.log('-----------------------------------');
  try {
    const response = await axios.get(`${STRAPI_URL}/api/brands`);
    console.log('✅ Brands endpoint is accessible');
    console.log(`   Status: ${response.status}`);
    console.log(`   Data: ${JSON.stringify(response.data, null, 2).substring(0, 200)}...`);
  } catch (error) {
    if (error.response) {
      console.log(`❌ Error: ${error.response.status} ${error.response.statusText}`);
      console.log(`   Details: ${JSON.stringify(error.response.data, null, 2)}`);
    } else {
      console.log(`❌ Error: ${error.message}`);
    }
  }

  // Test 2: Check content types API (if available)
  console.log('\n📡 Test 2: Check content types');
  console.log('-----------------------------------');
  try {
    const response = await axios.get(`${STRAPI_URL}/api/products?pagination[pageSize]=1`);
    console.log('✅ Products endpoint works - Strapi API is functional');
  } catch (error) {
    console.log(`❌ Products endpoint error: ${error.message}`);
  }

  // Test 3: Check admin API health
  console.log('\n📡 Test 3: Check admin API');
  console.log('-----------------------------------');
  try {
    const response = await axios.get(`${STRAPI_URL}/admin`);
    console.log('✅ Admin panel is accessible');
  } catch (error) {
    console.log(`⚠️  Admin check: ${error.message}`);
  }

  console.log('\n📋 DIAGNOSIS');
  console.log('============');
  console.log('The 500 error on /users-permissions/routes suggests:');
  console.log('1. There might be a configuration issue with the Brand content type');
  console.log('2. The relation field might be causing issues');
  console.log('3. Strapi might need a full restart');
  console.log('4. There could be a database schema mismatch');
  console.log('');
  console.log('🔧 RECOMMENDED FIXES:');
  console.log('');
  console.log('1. Check Strapi server logs for detailed error messages');
  console.log('   → Look at the terminal where Strapi is running');
  console.log('   → Look for error messages related to "brand" or "users-permissions"');
  console.log('');
  console.log('2. Verify Brand content type relation:');
  console.log('   → Go to Content-Type Builder → Brand');
  console.log('   → Check the "products" relation field');
  console.log('   → Ensure it\'s configured correctly:');
  console.log('     - Relation type: Brand has many Products');
  console.log('     - Target: Product (api::product.product)');
  console.log('     - Inverse field: brand');
  console.log('');
  console.log('3. Try removing and re-adding the relation:');
  console.log('   → Delete the "products" relation field from Brand');
  console.log('   → Save the content type');
  console.log('   → Restart Strapi');
  console.log('   → Add the relation back');
  console.log('   → Save and restart again');
  console.log('');
  console.log('4. Check if Product content type has brand relation:');
  console.log('   → Go to Content-Type Builder → Product');
  console.log('   → Verify the "brand" field exists');
  console.log('   → If it\'s a string field, you might need to change it to a relation');
  console.log('');
  console.log('5. Full restart:');
  console.log('   → Stop Strapi completely');
  console.log('   → Clear .cache folder (if exists)');
  console.log('   → Restart Strapi');
  console.log('   → Wait for full startup');
  console.log('');
}

checkBrandContentType().catch(console.error);

