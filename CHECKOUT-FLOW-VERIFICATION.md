# Checkout Flow Verification Guide

This document outlines how to verify that the complete checkout flow works correctly and updates both admin and customer dashboards.

## Flow Overview

1. **Customer adds items to cart** → Cart stored in backend
2. **Customer proceeds to checkout** → Fills in customer info, address, payment
3. **Checkout completes** → Order created in backend with payment status
4. **Admin dashboard updates** → Shows new order in orders list
5. **Customer portal updates** → Shows new order in customer's order history

## Testing Steps

### 1. Test Customer Checkout Flow

#### As a Guest User:
1. Navigate to products page
2. Add items to cart
3. Go to checkout (`/checkout`)
4. Complete checkout steps:
   - Step 1: Review order
   - Step 2: Select fulfillment (pickup/delivery) and address
   - Step 3: Select payment method and complete payment
5. Verify success message shows order number
6. Verify cart is cleared

#### As an Authenticated User:
1. Login to portal (`/portal/login`)
2. Add items to cart
3. Go to checkout
4. Verify user info is pre-filled
5. Select saved address (if delivery)
6. Complete checkout
7. Verify order appears in customer portal immediately

### 2. Verify Order Creation

#### Check Backend:
- Order should be created in Strapi/NestJS backend
- Order should have:
  - `orderNumber` (unique)
  - `customer` (linked to customer record)
  - `orderItems` (linked to cart items)
  - `shippingAddress` and `billingAddress`
  - `paymentStatus` (should be 'paid' if payment succeeded)
  - `status` (should be 'pending' initially)

### 3. Verify Admin Dashboard Updates

1. Login to admin dashboard (`/admin/login`)
2. Navigate to Orders page (`/admin/orders`)
3. Verify new order appears in the list
4. Check order details:
   - Order number matches
   - Customer name/email is correct
   - Total amount is correct
   - Payment status is correct
   - Order status is correct
5. Verify stats cards update:
   - Pending orders count increases
   - Revenue increases

### 4. Verify Customer Portal Updates

1. Login to customer portal (`/portal/login`)
2. Navigate to Dashboard (`/portal/dashboard`)
3. Verify new order appears in "Recent Orders"
4. Check order statistics update:
   - Total Orders increases
   - Total Spent increases
   - Average Order Value updates
5. Navigate to Orders page (`/portal/orders`)
6. Verify order appears in full orders list
7. Click on order to view details
8. Verify all order information is correct:
   - Order items with images
   - Shipping address
   - Order summary
   - Payment status

## Backend Endpoints Required

### Checkout
- `POST /checkout` - Creates order and processes payment
  - Returns: `{ orderNumber, orderId, paymentStatus, totals }`

### Admin Orders
- `GET /admin/orders` - Get all orders (admin only)
  - Query params: `page`, `pageSize`, `populate`
  - Returns: `{ data: Order[] }`

### Customer Orders
- `GET /orders/me` - Get current user's orders
  - Query params: `page`, `pageSize`
  - Returns: `{ data: Order[], meta: { pagination } }`

- `GET /orders/:id` - Get specific order (must belong to user)
  - Returns: `{ data: Order }`

## Expected Behavior

### After Successful Checkout:
1. ✅ Cart is cleared
2. ✅ Order is created in backend
3. ✅ Payment status is recorded
4. ✅ Order appears in admin dashboard within 30 seconds (auto-refresh)
5. ✅ Order appears in customer portal within 30 seconds (auto-refresh)
6. ✅ Order details are accessible from both dashboards

### Payment Status Flow:
- `pending` → Initial state
- `paid` → Payment successful (mock payment always succeeds)
- `failed` → Payment failed (shouldn't happen with mock)
- `refunded` → If order is refunded later

### Order Status Flow:
- `pending` → Order created, awaiting processing
- `confirmed` → Order confirmed by admin
- `processing` → Order being prepared
- `shipped` → Order shipped (if delivery)
- `delivered` → Order delivered
- `cancelled` → Order cancelled

## Troubleshooting

### Order doesn't appear in admin dashboard:
1. Check backend `/admin/orders` endpoint is working
2. Verify admin authentication token is valid
3. Check browser console for errors
4. Verify order was actually created in backend

### Order doesn't appear in customer portal:
1. Check backend `/orders/me` endpoint is working
2. Verify customer authentication token is valid
3. Verify order is linked to correct customer ID
4. Check browser console for errors

### Payment status incorrect:
1. Verify checkout response includes `paymentStatus`
2. Check backend payment processing logic
3. Verify payment gateway response is handled correctly

### Auto-refresh not working:
- Dashboards refresh every 30 seconds automatically
- Manual refresh button available in Order Management
- Can also manually refresh browser

## Notes

- Mock payment always succeeds (for testing)
- Real payment integration will need actual gateway setup
- Orders are stored in Strapi backend
- Customer linking happens via `ensureCustomer` in checkout service
- Guest orders can be linked to accounts if customer registers with same email

