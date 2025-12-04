# Bank Transfer Payment Implementation Guide

This document describes the complete bank transfer payment implementation for the Shreeji ecommerce platform.

## Overview

The bank transfer feature allows customers to pay for orders via direct bank transfer. The system handles:
- Order creation with pending payment status
- Email notifications with bank transfer instructions
- Payment deadline tracking
- Automatic order cancellation for unpaid orders
- Payment verification by admins
- Payment proof upload by customers

## Backend Implementation

### 1. Payment Gateway

**File:** `src/payments/bank-transfer.gateway.ts`

The `BankTransferGateway` implements the `PaymentGateway` interface and always returns a `pending` status for bank transfers, as they require manual verification.

### 2. Payment Service

**File:** `src/payments/payments.service.ts`

Handles:
- Recording payments in Strapi
- Updating payment status
- Retrieving payments by order ID

### 3. Email Service

**File:** `src/email/email.service.ts`

Sends bank transfer instructions via email including:
- Bank account details
- Payment amount and currency
- Order reference number
- Payment deadline
- Instructions for uploading payment proof

### 4. Bank Details Configuration

**File:** `src/config/bank-details.config.ts`

Manages bank account details from environment variables:
- `BANK_NAME` - Bank name
- `BANK_ACCOUNT_NUMBER` - Account number
- `BANK_ACCOUNT_NAME` - Account holder name
- `BANK_SWIFT_CODE` - SWIFT code (optional)
- `BANK_IBAN` - IBAN (optional)
- `BANK_TRANSFER_DEADLINE_HOURS` - Payment deadline in hours (default: 24)

### 5. Checkout Service Updates

**File:** `src/checkout/checkout.service.ts`

Enhanced to:
- Handle bank transfer payment method
- Set payment deadlines on orders
- Send email notifications for bank transfers
- Return appropriate payment status

### 6. Orders Service Updates

**File:** `src/orders/orders.service.ts`

Added methods:
- `setPaymentDeadline()` - Sets payment deadline on order
- `cancelOrder()` - Cancels an order
- `getOrdersWithExpiredPaymentDeadline()` - Gets orders with expired deadlines

### 7. Background Job

**File:** `src/jobs/payment-deadline.job.ts`

Automatically cancels orders with expired payment deadlines. Runs every hour using `@nestjs/schedule`.

### 8. API Endpoints

**Payments Controller** (`src/payments/payments.controller.ts`):
- `GET /payments/bank-details` - Get bank account details
- `GET /payments/order/:orderId` - Get payment by order ID
- `PUT /payments/verify/:paymentId` - Verify payment (admin)

**Orders Controller** (`src/orders/orders.controller.ts`):
- `PUT /orders/:orderId/verify-payment` - Verify order payment (admin)
- `PUT /orders/:orderId/cancel` - Cancel order

**Payment Proof Controller** (`src/payments/payment-proof.controller.ts`):
- `POST /payments/:paymentId/upload-proof` - Upload payment proof

## Frontend Implementation

### 1. API Client

**File:** `app/lib/ecommerce/api.ts`

Added:
- `getBankDetails()` - Fetches bank details from backend

### 2. Payment Details Section

**File:** `app/components/checkout/PaymentDetailsSection.tsx`

Updated to:
- Fetch and display bank details when bank transfer is selected
- Show bank account information to customers before checkout

### 3. Checkout Alerts

**File:** `app/components/checkout/CheckoutAlerts.tsx`

Enhanced to:
- Fetch and display real bank details after order creation
- Show payment deadline
- Display instructions for uploading payment proof

## Environment Variables

Add these to your `.env` file:

```env
# Bank Transfer Configuration
BANK_NAME=Standard Chartered Bank
BANK_ACCOUNT_NUMBER=1234567890
BANK_ACCOUNT_NAME=Shreeji
BANK_SWIFT_CODE=SCBLZMLX (optional)
BANK_IBAN=ZM1234567890123456789 (optional)
BANK_TRANSFER_DEADLINE_HOURS=24

# Strapi Configuration
STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your_strapi_api_token

# Email Service (configure based on your email provider)
# For Resend:
RESEND_API_KEY=your_resend_api_key
# For SendGrid:
SENDGRID_API_KEY=your_sendgrid_api_key
```

## Strapi Schema Updates

Ensure your Strapi order schema includes:
- `paymentDeadline` (DateTime) - When payment must be received
- `paymentMethod` (String) - Payment method used
- `cancellationReason` (Text) - Reason for cancellation (optional)

Payment schema should include:
- `paymentProofUrl` (String) - URL to uploaded payment proof
- `status` (Enum) - Payment status (pending, completed, cancelled, failed)

## Setup Steps

1. **Configure Environment Variables**
   - Add bank details to `.env`
   - Configure email service credentials

2. **Update Strapi Schema**
   - Add `paymentDeadline` to orders
   - Add `paymentProofUrl` to payments

3. **Install Dependencies** (if needed)
   ```bash
   npm install @nestjs/schedule @nestjs/platform-express multer
   ```

4. **Register Services in NestJS Module**
   ```typescript
   // In your app.module.ts or checkout.module.ts
   import { BankTransferGateway } from './payments/bank-transfer.gateway';
   import { PAYMENT_GATEWAY } from './payments/payment.constants';
   import { PaymentDeadlineJob } from './jobs/payment-deadline.job';
   import { ScheduleModule } from '@nestjs/schedule';

   @Module({
     imports: [ScheduleModule.forRoot()],
     providers: [
       {
         provide: PAYMENT_GATEWAY,
         useClass: BankTransferGateway,
       },
       PaymentDeadlineJob,
       // ... other providers
     ],
   })
   ```

5. **Configure Email Service**
   - Update `EmailService` to use your preferred email provider (Resend, SendGrid, etc.)
   - Update email templates as needed

6. **Test the Flow**
   - Create an order with bank transfer
   - Verify email is sent
   - Test payment deadline expiration
   - Test payment verification

## Usage Flow

1. **Customer selects bank transfer** during checkout
2. **Order is created** with `paymentStatus: 'pending'`
3. **Email is sent** with bank transfer instructions
4. **Customer transfers money** to provided bank account
5. **Customer uploads payment proof** (optional)
6. **Admin verifies payment** and marks order as paid
7. **Order is processed** and customer receives confirmation

## Auto-Cancellation

Orders with expired payment deadlines are automatically cancelled by the background job that runs every hour. The job:
- Finds orders with `paymentStatus: 'pending'` and `paymentMethod: 'bank_transfer'`
- Checks if `paymentDeadline` has passed
- Cancels orders and updates payment status

## Admin Features

Admins can:
- View bank transfer orders in the admin panel
- Verify payments manually
- Cancel orders if needed
- View uploaded payment proofs

## Future Enhancements

- [ ] Bank API integration for automatic payment verification
- [ ] SMS notifications in addition to email
- [ ] Multiple bank account support
- [ ] Payment reminder emails before deadline
- [ ] Automated payment matching using reference numbers

