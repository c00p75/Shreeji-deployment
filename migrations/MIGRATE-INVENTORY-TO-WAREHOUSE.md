# Inventory to Warehouse Migration Guide

## Overview

This migration script migrates all existing product inventory (from the `stockQuantity` field on products) to the "Shreeji House" warehouse. This is necessary because warehouses were introduced later in the project, and existing inventory needs to be associated with a warehouse.

## What This Script Does

1. **Finds or creates "Shreeji House" warehouse** - If the warehouse doesn't exist, it creates it
2. **Fetches all products** - Retrieves all products from the backend API
3. **Filters products with stock** - Only processes products that have `stockQuantity > 0`
4. **Migrates product inventory** - Uses the `adjustStock` API with type `'SET'` to create warehouse inventory records
5. **Handles product variants** - Also migrates inventory for product variants if they exist
6. **Skips duplicates** - Checks if inventory already exists before migrating

## Prerequisites

1. **Backend API running** - Ensure your NestJS backend is running on the configured port (default: `http://localhost:4000`)
2. **Environment variables** - Set up `.env.local` with the following:
   ```env
   NEXT_PUBLIC_ECOM_API_URL=http://localhost:4000
   ADMIN_TOKEN=your_admin_jwt_token_here
   ```

## Getting the Admin Token

You can get the admin token by:

1. **From browser console** (after logging into admin):
   ```javascript
   localStorage.getItem('admin_jwt')
   ```

2. **Or login via API** and extract the token from the response

## Running the Migration

1. **Navigate to project root**:
   ```bash
   cd /Users/yxzuji/Desktop/Projects/Shreeji-deployment
   ```

2. **Run the migration script**:
   ```bash
   node scripts/migrate-inventory-to-warehouse.js
   ```

## Expected Output

The script will:
- Show progress for each product being migrated
- Display a summary at the end with:
  - Number of products migrated
  - Number of variants migrated
  - Number of products skipped
  - Any errors encountered

Example output:
```
🚀 Starting inventory migration to Shreeji House warehouse

API Base URL: http://localhost:4000

🏢 Looking for "Shreeji House" warehouse...
✅ Found existing warehouse: "Shreeji House" (ID: 1)

📦 Fetching all products...
Found 150 products

📊 Products with stock: 45
⏭️  Products without stock: 105

🔄 Starting migration...

  📦 Migrating product "Product Name" (ID: 1): 50 units
    ✅ Product inventory migrated successfully

...

============================================================
📊 Migration Summary:
============================================================
✅ Products migrated: 45
📋 Variants migrated: 12
⏭️  Products skipped: 0
❌ Products with errors: 0
📦 Total products processed: 45
🏢 Warehouse: "Shreeji House" (ID: 1)
============================================================

✅ Migration completed successfully!
```

## After Migration

1. **Verify in Admin Panel**:
   - Go to Inventory Management
   - Filter by "Shreeji House" warehouse
   - Verify that all products show the correct inventory

2. **Check Warehouse Inventory**:
   - Navigate to Warehouse Management
   - View "Shreeji House" warehouse details
   - Verify inventory counts match product stockQuantity values

3. **Product stockQuantity fields**:
   - These can remain as-is (they're now warehouse-specific)
   - The warehouse inventory system is the source of truth going forward

## Troubleshooting

### Error: "ADMIN_TOKEN not set"
- **Solution**: Add `ADMIN_TOKEN=your_token` to `.env.local`

### Error: "Connection refused" or "Network error"
- **Solution**: Ensure the backend API is running on the configured port

### Error: "Unauthorized" or "401"
- **Solution**: Get a fresh admin token and update `.env.local`

### Some products failed to migrate
- **Solution**: Review the error messages in the output
- Common issues:
  - Product doesn't exist
  - Warehouse doesn't exist (script should create it)
  - API validation errors

### Products show 0 inventory after migration
- **Solution**: Check if products actually have `stockQuantity > 0` in the database
- Verify the migration script output for those specific products

## Rollback

If you need to rollback the migration:

1. **Delete warehouse inventory** (via API or admin panel):
   ```bash
   # This would need to be done via API calls or admin panel
   # Delete inventory records for "Shreeji House" warehouse
   ```

2. **Or manually adjust** inventory back to 0 in the warehouse

## Notes

- The script uses `adjustStock` with type `'SET'` to set exact quantities
- It checks for existing inventory to avoid duplicates
- Small delays (100ms) are added between API calls to avoid rate limiting
- Product variants are handled separately from main products
- The script is idempotent - you can run it multiple times safely

## Related Files

- Migration script: `scripts/migrate-inventory-to-warehouse.js`
- API client: `app/lib/admin/api.ts`
- Inventory management: `app/components/admin/InventoryManagement.tsx`
- Warehouse management: `app/components/admin/WarehouseManagement.tsx`

