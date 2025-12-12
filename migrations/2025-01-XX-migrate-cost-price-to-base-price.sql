-- Migration: Migrate costPrice to basePrice
-- Description: This migration ensures all products use basePrice instead of costPrice
-- Date: 2025-01-XX
-- 
-- Note: The products table should only have basePrice column.
-- This migration handles any edge cases where costPrice might exist in JSONB fields
-- or ensures data consistency.

-- If there's a costPrice column (which shouldn't exist in the current schema),
-- migrate its values to basePrice
DO $$
BEGIN
    -- Check if costPrice column exists and migrate data
    IF EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'products' 
        AND column_name = 'costPrice'
    ) THEN
        -- Update basePrice from costPrice where basePrice is 0 or NULL
        UPDATE products
        SET "basePrice" = "costPrice"
        WHERE ("basePrice" IS NULL OR "basePrice" = 0)
        AND "costPrice" IS NOT NULL
        AND "costPrice" > 0;

        -- Log the migration
        RAISE NOTICE 'Migrated costPrice values to basePrice';
    ELSE
        RAISE NOTICE 'No costPrice column found - migration not needed';
    END IF;
END $$;

-- If products have costPrice in JSONB fields (like in specs or other JSON columns),
-- this would need to be handled application-side, not in SQL
-- The application should read from basePrice field only

-- Verify migration
SELECT 
    COUNT(*) as total_products,
    COUNT(CASE WHEN "basePrice" > 0 THEN 1 END) as products_with_base_price,
    COUNT(CASE WHEN "basePrice" IS NULL OR "basePrice" = 0 THEN 1 END) as products_without_base_price
FROM products;

