const fs = require('fs');
const path = require('path');

// Read the brand schema
const brandSchemaPath = path.join(__dirname, '../strapi-content-types/brand-schema.json');
const brandSchema = JSON.parse(fs.readFileSync(brandSchemaPath, 'utf8'));

console.log('\n📦 BRAND CONTENT TYPE SETUP GUIDE');
console.log('===================================\n');

console.log('The Brand content type needs to be created manually in Strapi Admin.\n');

console.log('📋 STEP 1: Create Brand Content Type');
console.log('-------------------------------------');
console.log('1. Open Strapi Admin: http://localhost:1337/admin');
console.log('2. Navigate to: Content-Type Builder');
console.log('3. Click: "Create new collection type"');
console.log('4. Enter Display Name: Brand');
console.log('5. Click: "Continue"\n');

console.log('📋 STEP 2: Add Fields');
console.log('---------------------');
console.log('Add the following fields in order:\n');

const fieldInstructions = [
  {
    name: 'name',
    type: 'Text',
    config: {
      'Field name': 'name',
      'Type': 'Text',
      'Required': '✓ Yes',
      'Unique': '✓ Yes',
      'Default value': '(leave empty)'
    }
  },
  {
    name: 'logo',
    type: 'Media',
    config: {
      'Field name': 'logo',
      'Type': 'Media',
      'Multiple media': '✗ No',
      'Allowed types': 'Images only',
      'Required': '✗ No'
    }
  },
  {
    name: 'logoUrl',
    type: 'Text',
    config: {
      'Field name': 'logoUrl',
      'Type': 'Text',
      'Required': '✗ No',
      'Unique': '✗ No'
    }
  },
  {
    name: 'description',
    type: 'Long text',
    config: {
      'Field name': 'description',
      'Type': 'Long text',
      'Required': '✗ No'
    }
  },
  {
    name: 'website',
    type: 'Text',
    config: {
      'Field name': 'website',
      'Type': 'Text',
      'Required': '✗ No',
      'Unique': '✗ No'
    }
  }
];

fieldInstructions.forEach((field, index) => {
  console.log(`${index + 1}. ${field.name.toUpperCase()} (${field.type})`);
  Object.entries(field.config).forEach(([key, value]) => {
    console.log(`   ${key}: ${value}`);
  });
  console.log('');
});

console.log('📋 STEP 3: Add Relation to Products');
console.log('------------------------------------');
console.log('After adding the above fields, add a relation:');
console.log('1. Click: "Add another field"');
console.log('2. Select: "Relation"');
console.log('3. Configure:');
console.log('   - Field name: products');
console.log('   - Relation type: Brand has and belongs to many Products');
console.log('   - OR: Brand has many Products (one-to-many)');
console.log('   - Select: Product (api::product.product)');
console.log('   - Inverse relation field name: brand');
console.log('4. Click: "Finish"\n');

console.log('📋 STEP 4: Configure Content Type Settings');
console.log('-------------------------------------------');
console.log('1. Click: "Save" button');
console.log('2. In the settings, ensure:');
console.log('   - Draft & Publish: DISABLED (unchecked)');
console.log('   - This matches: "draftAndPublish": false in the schema\n');

console.log('📋 STEP 5: Set Permissions');
console.log('--------------------------');
console.log('1. Navigate to: Settings → Users & Permissions Plugin → Roles');
console.log('2. Click on: "Authenticated" role');
console.log('3. Find: "Brand" in the permissions list');
console.log('4. Enable these permissions:');
console.log('   ✓ create');
console.log('   ✓ find');
console.log('   ✓ findOne');
console.log('   ✓ update');
console.log('   ✓ delete');
console.log('5. Click: "Save"\n');

console.log('📋 STEP 6: Set Public Permissions (Optional)');
console.log('---------------------------------------------');
console.log('If you want public access to read brands:');
console.log('1. Click on: "Public" role');
console.log('2. Find: "Brand" in the permissions list');
console.log('3. Enable:');
console.log('   ✓ find');
console.log('   ✓ findOne');
console.log('4. Click: "Save"\n');

console.log('📋 STEP 7: Restart Strapi');
console.log('--------------------------');
console.log('After creating the content type:');
console.log('1. Restart your Strapi server');
console.log('2. The /api/brands endpoint will be available\n');

console.log('✅ VERIFICATION');
console.log('----------------');
console.log('After setup, test the endpoint:');
console.log('  GET http://localhost:1337/api/brands');
console.log('  Should return: { "data": [], "meta": { ... } }\n');

console.log('📄 SCHEMA REFERENCE');
console.log('-------------------');
console.log('Full schema available at: strapi-content-types/brand-schema.json');
console.log(JSON.stringify(brandSchema, null, 2));
console.log('');

