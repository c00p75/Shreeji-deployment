# Migration Guide: costPrice → basePrice

This guide explains how to migrate all product data from `costPrice` to `basePrice`.

## Overview

The codebase has been updated to use `basePrice` consistently instead of `costPrice`. This migration ensures all existing data in the database is updated to match the new naming convention.

## Prerequisites

1. ✅ Frontend code has been updated to use `basePrice` everywhere
2. ✅ Backend Product entity uses `basePrice` field
3. ✅ API client handles both `basePrice` and `costPrice` (with `basePrice` as priority)

## Migration Steps

### Option 1: API-Based Migration (Recommended)

Use the Node.js script to migrate products via the API:

```bash
# Set your admin token (if required)
export ADMIN_TOKEN="your-admin-jwt-token"

# Set API URL (if different from default)
export NEXT_PUBLIC_API_URL="http://localhost:3001"

# Run the migration script
node scripts/migrate-cost-price-to-base-price.js
```

**What it does:**
- Fetches all products from the API
- Checks for products with `costPrice` values
- Updates them to use `basePrice` instead
- Provides a summary of migrated products

### Option 2: Database Migration (If needed)

If you need to run a direct database migration:

```bash
# Connect to your PostgreSQL database
psql -U your_username -d your_database

# Run the migration SQL
\i migrations/2025-01-XX-migrate-cost-price-to-base-price.sql
```

**Note:** The backend Product entity only has `basePrice` column, so this SQL migration is mainly for edge cases or if you had a `costPrice` column that needs to be removed.

## Verification

After running the migration, verify the results:

1. **Check API Response:**
   ```bash
   curl -H "Authorization: Bearer YOUR_TOKEN" \
        http://localhost:3001/admin/products
   ```
   Verify all products have `basePrice` and no `costPrice` fields.

2. **Check Frontend:**
   - Navigate to Admin → Products
   - Verify all products display "Base Price" correctly
   - Check Inventory Management page - verify cost calculations use `basePrice`

3. **Check Database (if direct access):**
   ```sql
   SELECT id, name, "basePrice", "costPrice" 
   FROM products 
   WHERE "costPrice" IS NOT NULL;
   ```
   This should return 0 rows (or only rows where `costPrice` is in a JSONB field).

## Rollback

If you need to rollback:

1. The API client still accepts `costPrice` as a fallback
2. You can manually update products via the admin panel
3. Or run a reverse migration script (not provided, but can be created if needed)

## Notes

- The API client prioritizes `basePrice` but accepts `costPrice` as fallback for backward compatibility
- All frontend components now use `basePrice` exclusively
- The backend Product entity only has `basePrice` field
- This migration is safe to run multiple times (idempotent)

## Troubleshooting

### Issue: Migration script fails with authentication error

**Solution:** Ensure you have a valid admin JWT token:
```bash
export ADMIN_TOKEN="your-jwt-token-here"
```

### Issue: Some products still show costPrice

**Solution:** 
1. Check if the product has both `costPrice` and `basePrice` - the migration prioritizes `basePrice`
2. Manually update via admin panel if needed
3. Verify the API is returning `basePrice` correctly

### Issue: Database migration fails

**Solution:**
- The Product entity only has `basePrice` column, so SQL migration may not be needed
- If you see a `costPrice` column, it's likely from an old schema and should be removed
- Contact database admin to review schema

## Post-Migration Checklist

- [ ] All products have `basePrice` values
- [ ] No `costPrice` fields in API responses
- [ ] Frontend displays "Base Price" correctly
- [ ] Inventory calculations use `basePrice`
- [ ] Product creation/editing uses `basePrice`
- [ ] Reports and analytics use `basePrice`

## Support

If you encounter issues during migration:
1. Check the migration script output for specific errors
2. Verify API connectivity and authentication
3. Review product data in the database
4. Check backend logs for any errors

