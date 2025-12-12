/**
 * Migration Script: Migrate costPrice to basePrice
 * 
 * This script migrates all products that have costPrice values to use basePrice instead.
 * Run this script after updating the frontend to use basePrice.
 * 
 * Usage: node scripts/migrate-cost-price-to-base-price.js
 */

const axios = require('axios');
require('dotenv').config({ path: '.env.local' });

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || ''; // You may need to set this

async function migrateProducts() {
  try {
    console.log('🚀 Starting migration: costPrice → basePrice\n');
    console.log(`API Base URL: ${API_BASE_URL}\n`);

    // Fetch all products
    console.log('📦 Fetching all products...');
    const response = await axios.get(`${API_BASE_URL}/admin/products`, {
      params: {
        pagination: { page: 1, pageSize: 1000 }
      },
      headers: {
        'Authorization': `Bearer ${ADMIN_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    const products = response.data?.data || [];
    console.log(`Found ${products.length} products\n`);

    let migratedCount = 0;
    let skippedCount = 0;
    let errorCount = 0;

    // Process each product
    for (const product of products) {
      try {
        // Check if product has costPrice that needs migration
        const hasCostPrice = product.costPrice !== undefined && product.costPrice !== null;
        const hasBasePrice = product.basePrice !== undefined && product.basePrice !== null;

        if (hasCostPrice && !hasBasePrice) {
          // Migrate costPrice to basePrice
          console.log(`  Migrating product: ${product.name} (ID: ${product.id})`);
          console.log(`    costPrice: ${product.costPrice} → basePrice: ${product.costPrice}`);

          const updateData = {
            basePrice: parseFloat(product.costPrice) || 0
          };

          await axios.put(
            `${API_BASE_URL}/admin/products/${product.id}`,
            updateData,
            {
              headers: {
                'Authorization': `Bearer ${ADMIN_TOKEN}`,
                'Content-Type': 'application/json'
              }
            }
          );

          migratedCount++;
          console.log(`    ✅ Migrated successfully\n`);
        } else if (hasCostPrice && hasBasePrice) {
          // Both exist - use basePrice if it's different, otherwise skip
          if (product.costPrice !== product.basePrice) {
            console.log(`  Updating product: ${product.name} (ID: ${product.id})`);
            console.log(`    costPrice: ${product.costPrice}, basePrice: ${product.basePrice}`);
            console.log(`    → Setting basePrice to: ${product.costPrice}`);

            const updateData = {
              basePrice: parseFloat(product.costPrice) || product.basePrice
            };

            await axios.put(
              `${API_BASE_URL}/admin/products/${product.id}`,
              updateData,
              {
                headers: {
                  'Authorization': `Bearer ${ADMIN_TOKEN}`,
                  'Content-Type': 'application/json'
                }
              }
            );

            migratedCount++;
            console.log(`    ✅ Updated successfully\n`);
          } else {
            skippedCount++;
            console.log(`  ⏭️  Skipped product: ${product.name} (ID: ${product.id}) - basePrice already set\n`);
          }
        } else {
          skippedCount++;
        }
      } catch (error) {
        errorCount++;
        console.error(`  ❌ Error migrating product ${product.id} (${product.name}):`, error.message);
        if (error.response) {
          console.error(`    Response: ${JSON.stringify(error.response.data)}\n`);
        }
      }
    }

    // Summary
    console.log('\n' + '='.repeat(50));
    console.log('📊 Migration Summary:');
    console.log('='.repeat(50));
    console.log(`✅ Successfully migrated: ${migratedCount} products`);
    console.log(`⏭️  Skipped: ${skippedCount} products`);
    console.log(`❌ Errors: ${errorCount} products`);
    console.log(`📦 Total products processed: ${products.length}`);
    console.log('='.repeat(50) + '\n');

    if (errorCount > 0) {
      console.log('⚠️  Some products failed to migrate. Please review the errors above.');
      process.exit(1);
    } else {
      console.log('✅ Migration completed successfully!');
      process.exit(0);
    }
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    if (error.response) {
      console.error('Response:', JSON.stringify(error.response.data, null, 2));
    }
    process.exit(1);
  }
}

// Run migration
if (require.main === module) {
  migrateProducts();
}

module.exports = { migrateProducts };

