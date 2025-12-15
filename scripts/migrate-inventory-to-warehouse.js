/**
 * Migration Script: Migrate existing product inventory to Shreeji House warehouse
 * 
 * This script migrates all products that have stockQuantity > 0 to the "Shreeji House" warehouse.
 * It uses the adjustStock API with type 'SET' to create warehouse inventory records.
 * 
 * Usage: 
 *   node scripts/migrate-inventory-to-warehouse.js
 *   node scripts/migrate-inventory-to-warehouse.js <admin_token>
 *   ADMIN_TOKEN=your_token node scripts/migrate-inventory-to-warehouse.js
 */

const axios = require('axios');
require('dotenv').config({ path: '.env.local' });

const API_BASE_URL = process.env.NEXT_PUBLIC_ECOM_API_URL?.replace(/\/$/, '') || 'http://localhost:4000';
// Accept token from command line argument, environment variable, or .env.local
const ADMIN_TOKEN = process.argv[2] || process.env.ADMIN_TOKEN || '';

// Helper function to get auth headers
function getAuthHeaders() {
  const headers = {
    'Content-Type': 'application/json',
  };
  
  if (ADMIN_TOKEN) {
    headers['Authorization'] = `Bearer ${ADMIN_TOKEN}`;
  }
  
  return headers;
}

/**
 * Find or create the "Shreeji House" warehouse
 */
async function findOrCreateShreejiHouseWarehouse() {
  try {
    console.log('🏢 Looking for "Shreeji House" warehouse...');
    
    // Fetch all warehouses
    const response = await axios.get(`${API_BASE_URL}/inventory/warehouses`, {
      params: { isActive: true },
      headers: getAuthHeaders()
    });

    const warehouses = response.data?.data || response.data || [];
    
    // Try to find "Shreeji House" (case-insensitive)
    let warehouse = warehouses.find(w => 
      w.name && w.name.toLowerCase().includes('shreeji house')
    );

    if (warehouse) {
      console.log(`✅ Found existing warehouse: "${warehouse.name}" (ID: ${warehouse.id})\n`);
      return warehouse;
    }

    // If not found, create it
    console.log('📦 Creating "Shreeji House" warehouse...');
    const createResponse = await axios.post(
      `${API_BASE_URL}/inventory/warehouses`,
      {
        name: 'Shreeji House',
        address: 'Shreeji House Warehouse',
        city: 'Lusaka',
        country: 'Zambia',
        isActive: true,
      },
      { headers: getAuthHeaders() }
    );

    warehouse = createResponse.data?.data || createResponse.data;
    console.log(`✅ Created warehouse: "${warehouse.name}" (ID: ${warehouse.id})\n`);
    return warehouse;
  } catch (error) {
    console.error('❌ Error finding/creating warehouse:', error.message);
    if (error.response) {
      console.error('Response:', JSON.stringify(error.response.data, null, 2));
    }
    throw error;
  }
}

/**
 * Get product variants
 */
async function getProductVariants(productId) {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/admin/products/${productId}/variants`,
      { headers: getAuthHeaders() }
    );
    return response.data?.data || response.data || [];
  } catch (error) {
    // Variants are optional, return empty array if not found
    return [];
  }
}

/**
 * Migrate inventory for a single product
 */
async function migrateProductInventory(product, warehouseId) {
  const results = {
    productMigrated: false,
    variantsMigrated: 0,
    errors: []
  };

  try {
    // Check if product has stock
    const stockQuantity = product.stockQuantity || 0;
    
    if (stockQuantity <= 0) {
      return results; // Skip products with no stock
    }

    // Check if inventory already exists in warehouse
    try {
      const inventoryResponse = await axios.get(
        `${API_BASE_URL}/inventory/warehouses/${warehouseId}/inventory`,
        {
          params: { productId: product.id },
          headers: getAuthHeaders()
        }
      );

      const existingInventory = inventoryResponse.data?.data || inventoryResponse.data || [];
      const productInventory = existingInventory.find(
        inv => inv.productId === product.id && !inv.variantId
      );

      if (productInventory && productInventory.quantity === stockQuantity) {
        console.log(`  ⏭️  Product "${product.name}" already has correct inventory in warehouse`);
        results.productMigrated = true;
      } else {
        // Set inventory using adjustStock with type 'SET'
        console.log(`  📦 Migrating product "${product.name}" (ID: ${product.id}): ${stockQuantity} units`);
        
        await axios.post(
          `${API_BASE_URL}/inventory/adjust`,
          {
            productId: product.id,
            warehouseId: warehouseId,
            adjustmentType: 'SET',
            quantity: stockQuantity,
            notes: 'Migrated from product stockQuantity to warehouse inventory',
          },
          { headers: getAuthHeaders() }
        );

        results.productMigrated = true;
        console.log(`    ✅ Product inventory migrated successfully`);
      }
    } catch (error) {
      const errorMsg = `Failed to migrate product ${product.id}: ${error.message}`;
      console.error(`    ❌ ${errorMsg}`);
      if (error.response) {
        console.error(`    Response: ${JSON.stringify(error.response.data)}`);
      }
      results.errors.push(errorMsg);
    }

    // Handle variants
    try {
      const variants = await getProductVariants(product.id);
      
      if (variants.length > 0) {
        console.log(`    📋 Found ${variants.length} variant(s) for product "${product.name}"`);
        
        for (const variant of variants) {
          const variantStock = variant.stockQuantity || 0;
          
          if (variantStock <= 0) {
            continue; // Skip variants with no stock
          }

          try {
            // Check if variant inventory already exists
            const inventoryResponse = await axios.get(
              `${API_BASE_URL}/inventory/warehouses/${warehouseId}/inventory`,
              {
                params: { productId: product.id },
                headers: getAuthHeaders()
              }
            );

            const existingInventory = inventoryResponse.data?.data || inventoryResponse.data || [];
            const variantInventory = existingInventory.find(
              inv => inv.productId === product.id && inv.variantId === variant.id
            );

            if (variantInventory && variantInventory.quantity === variantStock) {
              console.log(`      ⏭️  Variant ${variant.id} already has correct inventory`);
              results.variantsMigrated++;
            } else {
              // Set variant inventory
              console.log(`      📦 Migrating variant ${variant.id} (SKU: ${variant.sku || 'N/A'}): ${variantStock} units`);
              
              await axios.post(
                `${API_BASE_URL}/inventory/adjust`,
                {
                  productId: product.id,
                  variantId: variant.id,
                  warehouseId: warehouseId,
                  adjustmentType: 'SET',
                  quantity: variantStock,
                  notes: 'Migrated from variant stockQuantity to warehouse inventory',
                },
                { headers: getAuthHeaders() }
              );

              results.variantsMigrated++;
              console.log(`        ✅ Variant inventory migrated successfully`);
            }
          } catch (error) {
            const errorMsg = `Failed to migrate variant ${variant.id}: ${error.message}`;
            console.error(`        ❌ ${errorMsg}`);
            if (error.response) {
              console.error(`        Response: ${JSON.stringify(error.response.data)}`);
            }
            results.errors.push(errorMsg);
          }
        }
      }
    } catch (error) {
      console.error(`    ⚠️  Error fetching variants for product ${product.id}:`, error.message);
    }

  } catch (error) {
    const errorMsg = `Error processing product ${product.id}: ${error.message}`;
    console.error(`  ❌ ${errorMsg}`);
    results.errors.push(errorMsg);
  }

  return results;
}

/**
 * Main migration function
 */
async function migrateInventoryToWarehouse() {
  try {
    console.log('🚀 Starting inventory migration to Shreeji House warehouse\n');
    console.log(`API Base URL: ${API_BASE_URL}\n`);

    if (!ADMIN_TOKEN) {
      console.warn('⚠️  WARNING: ADMIN_TOKEN not set in .env.local');
      console.warn('   The script will attempt to use session-based auth if available.\n');
    }

    // Step 1: Find or create Shreeji House warehouse
    const warehouse = await findOrCreateShreejiHouseWarehouse();
    const warehouseId = warehouse.id;

    // Step 2: Fetch all products
    console.log('📦 Fetching all products...');
    let allProducts = [];
    let page = 1;
    const pageSize = 100;
    let hasMore = true;

    while (hasMore) {
      const response = await axios.get(`${API_BASE_URL}/admin/products`, {
        params: {
          pagination: { page, pageSize }
        },
        headers: getAuthHeaders()
      });

      const products = response.data?.data || [];
      const meta = response.data?.meta || {};
      
      allProducts = allProducts.concat(products);
      
      hasMore = meta.pagination && page < meta.pagination.pageCount;
      page++;
    }

    console.log(`Found ${allProducts.length} products\n`);

    // Step 3: Filter products with stock
    const productsWithStock = allProducts.filter(p => (p.stockQuantity || 0) > 0);
    console.log(`📊 Products with stock: ${productsWithStock.length}`);
    console.log(`⏭️  Products without stock: ${allProducts.length - productsWithStock.length}\n`);

    if (productsWithStock.length === 0) {
      console.log('✅ No products with stock to migrate.');
      return;
    }

    // Step 4: Migrate each product
    let migratedProducts = 0;
    let migratedVariants = 0;
    let skippedProducts = 0;
    let errorCount = 0;
    const allErrors = [];

    console.log('🔄 Starting migration...\n');

    for (const product of productsWithStock) {
      try {
        const results = await migrateProductInventory(product, warehouseId);
        
        if (results.productMigrated) {
          migratedProducts++;
        } else {
          skippedProducts++;
        }
        
        migratedVariants += results.variantsMigrated;
        allErrors.push(...results.errors);
        
        if (results.errors.length > 0) {
          errorCount++;
        }

        // Small delay to avoid overwhelming the API
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        errorCount++;
        const errorMsg = `Failed to process product ${product.id} (${product.name}): ${error.message}`;
        console.error(`  ❌ ${errorMsg}`);
        allErrors.push(errorMsg);
      }
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 Migration Summary:');
    console.log('='.repeat(60));
    console.log(`✅ Products migrated: ${migratedProducts}`);
    console.log(`📋 Variants migrated: ${migratedVariants}`);
    console.log(`⏭️  Products skipped: ${skippedProducts}`);
    console.log(`❌ Products with errors: ${errorCount}`);
    console.log(`📦 Total products processed: ${productsWithStock.length}`);
    console.log(`🏢 Warehouse: "${warehouse.name}" (ID: ${warehouse.id})`);
    console.log('='.repeat(60) + '\n');

    if (allErrors.length > 0) {
      console.log('⚠️  Errors encountered:');
      allErrors.forEach((error, index) => {
        console.log(`  ${index + 1}. ${error}`);
      });
      console.log('');
    }

    if (errorCount > 0) {
      console.log('⚠️  Some products failed to migrate. Please review the errors above.');
      process.exit(1);
    } else {
      console.log('✅ Migration completed successfully!');
      console.log(`\n💡 Next steps:`);
      console.log(`   1. Verify inventory in the admin panel`);
      console.log(`   2. Check warehouse inventory for "Shreeji House"`);
      console.log(`   3. Product stockQuantity fields can remain as-is (they're now warehouse-specific)`);
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
  migrateInventoryToWarehouse();
}

module.exports = { migrateInventoryToWarehouse, findOrCreateShreejiHouseWarehouse };

