# Variant Cart Implementation

## Summary
Updated the cart system to treat product variants as separate cart items, each with their own price and attributes. Variants now appear as individual line items in the order summary, similar to how they're displayed in the inventory management page.

## Frontend Changes Applied

### 1. Updated Cart Interfaces (`app/lib/ecommerce/api.ts`)
- Added `variantId?: number` to `CartItem` interface
- Added `variantAttributes?: Record<string, string>` to `CartItemSnapshot` interface
- Updated `addCartItem` function to accept optional `variantId` parameter

### 2. Updated Cart Context (`app/contexts/CartContext.tsx`)
- Updated `addItem` function signature to accept optional `variantId` parameter
- Passes `variantId` to `addCartItem` API call

### 3. Updated Order Summary Components
- **OrderSummarySection.tsx**: Displays variants with indentation, gray background, and variant attributes
- **CheckoutCartItems.tsx**: Shows variant information with visual distinction
- **Order Details Page**: Updated to display variant information in order history

### 4. Product Details Component
- Already passes `selectedVariant?.id` when adding to cart (no changes needed)

## Backend Changes Applied

### 1. Created DTOs and Interfaces
- **`src/cart/dto/add-cart-item.dto.ts`**: Added `variantId` as optional field
- **`src/cart/interfaces/cart.interface.ts`**: Added `variantId` to `CartItem` and `variantAttributes` to `CartItemSnapshot`

### 2. Updated Cart Service (`src/cart/cart.service.ts`)
- Added `HttpService` and `ConfigService` dependencies
- Updated `addItem` method to:
  - Fetch variant details when `variantId` is provided
  - Use variant price instead of product price for variants
  - Store variant attributes in `productSnapshot`
  - Treat variants as separate cart items (check both `productId` and `variantId` when finding existing items)
  - Use variant SKU when available

## Key Features

1. **Separate Cart Items**: Each variant creates a separate cart item, even if they're from the same product
2. **Variant Pricing**: Variants use their own prices (or discounted prices) instead of the base product price
3. **Variant Attributes**: Variant attributes (e.g., "color: red, size: large") are stored and displayed
4. **Visual Distinction**: Variants are displayed with:
   - Indentation (`pl-12`)
   - Gray background (`bg-gray-50`)
   - Left border (`border-l-4 border-gray-300`)
   - "Variant" label
   - Variant attributes instead of SKU

## Backend Module Requirements

Ensure that the module providing `CartService` imports `HttpModule` from `@nestjs/axios`:

```typescript
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [CartService],
  // ...
})
```

## API Endpoint Required

The backend expects a variant endpoint:
- `GET /products/{productId}/variants/{variantId}`

This endpoint should return variant data including:
- `id`: Variant ID
- `sku`: Variant SKU
- `price`: Variant price
- `discountedPrice`: Variant discounted price (optional)
- `attributes` or `specs`: Variant attributes/specifications
- `stockQuantity`: Variant stock quantity

## Testing Checklist

- [ ] Add product with variant - should create separate cart item
- [ ] Add same product with different variant - should create another separate cart item
- [ ] Add same variant twice - should increase quantity of existing variant item
- [ ] Variant prices display correctly in order summary
- [ ] Variant attributes display correctly in order summary
- [ ] Variants are visually distinguished (indented, gray background)
- [ ] Order history shows variant information correctly

## Notes

- The frontend already passes `selectedVariant?.id` from the product details page
- Variant information is stored in `productSnapshot.variantAttributes`
- The cart service fetches variant details from the API when `variantId` is provided
- If variant fetch fails, it falls back to using product price and continues normally

