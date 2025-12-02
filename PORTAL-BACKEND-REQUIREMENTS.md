# Client Portal Backend Requirements

This document outlines the backend API endpoints required for the client portal features.

## Authentication Endpoints

### Already Implemented
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /auth/me` - Get current authenticated user

### Required
- `POST /auth/change-password` - Change user password
  ```json
  Request Body:
  {
    "currentPassword": "string",
    "newPassword": "string"
  }
  
  Response:
  {
    "success": true,
    "message": "Password changed successfully"
  }
  ```

## Customer Profile Endpoints

### Already Implemented
- `GET /customers/me` - Get current customer profile
- `PUT /customers/me` - Update customer profile
  ```json
  Request Body:
  {
    "firstName": "string",
    "lastName": "string",
    "phone": "string"
  }
  ```

## Order Endpoints

### Already Implemented
- `GET /orders/me` - Get current user's orders
  - Query params: `page`, `pageSize`
  - Returns: Array of orders with pagination metadata
  
- `GET /orders/:id` - Get specific order details
  - Should verify order belongs to authenticated user
  - Returns: Full order details with items, addresses, tracking info

### Order Response Format
```json
{
  "id": "number",
  "orderNumber": "string",
  "status": "pending|confirmed|processing|shipped|delivered|cancelled|refunded",
  "paymentStatus": "pending|paid|failed|refunded|partially-refunded",
  "subtotal": "number",
  "taxAmount": "number",
  "shippingAmount": "number",
  "discountAmount": "number",
  "totalAmount": "number",
  "currency": "string",
  "notes": "string",
  "trackingNumber": "string",
  "estimatedDelivery": "datetime",
  "shippedAt": "datetime",
  "deliveredAt": "datetime",
  "createdAt": "datetime",
  "updatedAt": "datetime",
  "orderItems": [
    {
      "id": "number",
      "quantity": "number",
      "unitPrice": "number",
      "product": {
        "id": "number",
        "name": "string",
        "sku": "string",
        "images": [
          {
            "url": "string",
            "alt": "string",
            "isMain": "boolean"
          }
        ]
      }
    }
  ],
  "shippingAddress": {
    "firstName": "string",
    "lastName": "string",
    "addressLine1": "string",
    "addressLine2": "string",
    "city": "string",
    "state": "string",
    "postalCode": "string",
    "country": "string",
    "phone": "string"
  },
  "billingAddress": {
    // Same structure as shippingAddress
  }
}
```

## Address Endpoints

### Already Implemented (via API client)
- `GET /addresses/me` - Get current user's addresses
- `POST /addresses` - Create new address
- `PUT /addresses/:id` - Update address
- `DELETE /addresses/:id` - Delete address

### Address Request/Response Format
```json
// Create/Update Request
{
  "type": "shipping|billing|both",
  "firstName": "string",
  "lastName": "string",
  "company": "string (optional)",
  "addressLine1": "string",
  "addressLine2": "string (optional)",
  "city": "string",
  "state": "string (optional)",
  "postalCode": "string",
  "country": "string",
  "phone": "string (optional)",
  "isDefault": "boolean"
}

// Response
{
  "id": "number",
  // ... same fields as request
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

## Security Requirements

1. **Authentication**: All endpoints (except login/register) require JWT token in Authorization header
   ```
   Authorization: Bearer <token>
   ```

2. **Authorization**: 
   - Users can only access their own data
   - Orders endpoint should filter by authenticated user
   - Address endpoints should verify ownership
   - Order details should verify order belongs to user

3. **Validation**:
   - Password must be at least 6 characters
   - Email validation
   - Required field validation
   - Address format validation

## Error Responses

All endpoints should return consistent error format:
```json
{
  "message": "Error description",
  "error": "Error code (optional)",
  "statusCode": 400|401|403|404|500
}
```

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (missing/invalid token)
- `403` - Forbidden (access denied)
- `404` - Not Found
- `500` - Internal Server Error

## Notes

- All endpoints should handle CORS properly
- Rate limiting recommended for authentication endpoints
- Password should be hashed before storage
- Sensitive data should not be logged
- Consider implementing refresh tokens for better security

