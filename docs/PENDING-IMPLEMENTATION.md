# Pending Implementation Tasks - Ecommerce Platform

This document tracks all pending tasks and next steps required to make the ecommerce platform fully functional. Use this as a reference for future development work.

## Table of Contents
- [Payment & Checkout](#payment--checkout)
- [Saved Cards Feature](#saved-cards-feature)
- [Order Management](#order-management)
- [Customer Features](#customer-features)
- [Product Management](#product-management)
- [Inventory Management](#inventory-management)
- [Notifications & Communications](#notifications--communications)
- [Admin Features](#admin-features)
- [Security & Performance](#security--performance)
- [Testing & Quality Assurance](#testing--quality-assurance)

---

## Payment & Checkout

### ✅ Completed
- [x] Basic checkout flow implementation
- [x] Payment method selection (Card, Mobile Money, Bank Transfer, COP)
- [x] Payment gateway integration (DPO)
- [x] Order creation and confirmation
- [x] VAT percentage display in order details

### 🔄 Pending
- [ ] **Payment Gateway Webhooks**
  - [ ] Implement webhook endpoint for payment status updates
  - [ ] Handle payment callbacks from DPO gateway
  - [ ] Auto-update order status based on payment webhooks
  - [ ] Verify webhook signatures for security
- [ ] **Secure Payment Configuration Setup**
  - [ ] Run `POST /admin/settings/initialize` once after deploying settings module to seed defaults
  - [ ] Add `ENCRYPTION_KEY` (32 chars) to `.env` and restart backend
  - [ ] Populate DPO credentials and bank details via new admin settings dashboard
  - [ ] Document process for rotating encrypted settings and restricting access

- [ ] **Payment Retry Logic**
  - [ ] Allow customers to retry failed payments
  - [ ] Implement payment retry UI in order details
  - [ ] Track payment retry attempts

- [ ] **Payment Refunds**
  - [ ] Implement refund functionality in admin panel
  - [ ] Integrate with payment gateway refund API
  - [ ] Handle partial refunds
  - [ ] Refund notifications to customers

- [ ] **Payment Security**
  - [ ] PCI DSS compliance review
  - [ ] Card data encryption at rest
  - [ ] Secure card tokenization
  - [ ] 3D Secure authentication support

---

## Saved Cards Feature

### ✅ Completed
- [x] Frontend UI for "Save this card" checkbox
- [x] Frontend sends `saveCard` flag to backend
- [x] Backend DTO accepts `saveCard` field
- [x] Backend passes `saveCard` to payment gateway
- [x] **Database Schema**
  - [x] Create `SavedCard` entity with all required fields
  - [x] Add relationship to Customer entity
  - [x] Add entity to DatabaseModule

- [x] **Saved Cards Service**
  - [x] Create `SavedCardsService` with methods:
    - [x] `saveCard(customerId, cardDetails, token)` - Save new card with encryption
    - [x] `getCustomerCards(customerId)` - Get all customer's saved cards
    - [x] `getCardById(cardId, customerId)` - Get specific card
    - [x] `deleteCard(cardId, customerId)` - Soft delete card
    - [x] `setDefaultCard(customerId, cardId)` - Set default card
    - [x] `getCardToken(cardId, customerId)` - Get decrypted token for payment

- [x] **API Endpoints**
  - [x] `GET /customers/:customerId/cards` - Get all saved cards
  - [x] `GET /customers/:customerId/cards/:cardId` - Get specific card
  - [x] `PUT /customers/:customerId/cards/:cardId/default` - Set as default
  - [x] `DELETE /customers/:customerId/cards/:cardId` - Delete card

- [x] **Checkout Integration**
  - [x] Update checkout service to save card when `saveCard: true` and payment succeeds
  - [x] Use saved card token when `cardId` is provided
  - [x] Handle card saving errors gracefully (non-blocking)
  - [x] Extract card type from card number
  - [x] Set first saved card as default automatically

### 🔄 Pending
- [ ] **Card Tokenization Service**
  - [ ] Research DPO API for card tokenization
  - [ ] Implement proper tokenization with DPO (currently using transaction ID as fallback)
  - [ ] Handle token expiration
  - [ ] Verify token format from DPO gateway response

- [ ] **Frontend Implementation**
  - [ ] Display saved cards in checkout payment section
  - [ ] Allow selection of saved card for payment
  - [ ] Show card management UI in customer portal
  - [ ] Add/Edit/Delete saved cards from customer portal
  - [ ] Set default card functionality in UI
  - [ ] CVV input for saved card payments

- [ ] **Security Enhancements**
  - [ ] Use environment variable for encryption key (CARD_ENCRYPTION_KEY)
  - [ ] Consider using a more secure encryption method (AES-256-GCM)
  - [ ] Implement key rotation strategy
  - [ ] Add audit logging for card operations

---

## Order Management

### ✅ Completed
- [x] Order creation during checkout
- [x] Order number generation
- [x] Order status tracking
- [x] Order items association

### ✅ Completed
- [x] **Order Status Workflow**
  - [x] Implement complete order status lifecycle:
    - `pending` → `confirmed` → `processing` → `shipped` → `delivered`
    - `pending` → `cancelled` (customer/admin)
    - `pending` → `refunded`
  - [x] Status transition validation (OrderStatusTransitionService)
  - [x] Status change notifications (email, SMS, in-app)
  - [x] Admin-only status update endpoint (`PUT /orders/admin/:orderId/status`)
  - [x] OrderStatusWorkflowService for managing status transitions
  - [x] SMS service integration for status notifications
  - [x] Enhanced notification preferences with SMS support

### 🔄 Pending

- [ ] **Order Tracking**
  - [x] Add tracking number field to orders
  - [ ] Integration with shipping providers (if applicable)
  - [x] Tracking number input in admin panel
  - [x] Display tracking info in customer portal
  - [x] Email tracking updates to customers
  - [x] Auto-set shippedAt timestamp when tracking is added
  - [x] Enhanced shipping notification email template
  - [x] Edit order modal for admin to manage tracking

- [ ] **Order Cancellation**
  - [ ] Customer-initiated cancellation (within time limit)
  - [ ] Admin-initiated cancellation
  - [ ] Automatic refund processing on cancellation
  - [ ] Cancellation reason tracking
  - [ ] Inventory restoration on cancellation

- [ ] **Order Returns/Refunds**
  - [ ] Return request functionality
  - [ ] Return reason selection
  - [ ] Return approval workflow
  - [ ] Return shipping label generation
  - [ ] Refund processing on return approval

- [ ] **Order History & Search**
  - [ ] Advanced order filtering in admin
  - [ ] Order search by number, customer, date range
  - [ ] Order export functionality (CSV/PDF)
  - [ ] Order analytics dashboard

---

## Customer Features

### ✅ Completed
- [x] Customer registration and authentication
- [x] Customer profile management
- [x] Address management
- [x] Order history view

### 🔄 Pending
- [ ] **Customer Portal Enhancements**
  - [ ] Wishlist functionality
  - [ ] Product reviews and ratings
  - [ ] Recently viewed products
  - [ ] Saved payment methods (see Saved Cards section)
  - [ ] Subscription management (if applicable)

- [ ] **Account Security**
  - [ ] Password reset via email
  - [ ] Two-factor authentication (2FA)
  - [ ] Login history tracking
  - [ ] Account activity notifications
  - [ ] Session management

- [ ] **Customer Communication**
  - [ ] Email preferences management
  - [ ] SMS notification preferences
  - [ ] Marketing email opt-in/opt-out
  - [ ] Communication history log

- [ ] **Loyalty & Rewards**
  - [ ] Points/rewards system (if applicable)
  - [ ] Referral program (if applicable)
  - [ ] Discount code management

---

## Product Management

### ✅ Completed
- [x] Product CRUD operations
- [x] Product image upload
- [x] Product categories and subcategories
- [x] Brand management
- [x] Product search and filtering

### 🔄 Pending
- [ ] **Product Variants**
  - [ ] Size variants (if applicable)
  - [ ] Color variants (if applicable)
  - [ ] Other attribute variants
  - [ ] Variant-specific pricing
  - [ ] Variant inventory tracking

- [ ] **Product Reviews & Ratings**
  - [ ] Customer review submission
  - [ ] Review moderation (admin approval)
  - [ ] Rating aggregation and display
  - [ ] Review helpfulness voting
  - [ ] Review reporting/flagging

- [ ] **Product Recommendations**
  - [ ] "Customers also bought" suggestions
  - [ ] "You may also like" recommendations
  - [ ] Related products
  - [ ] Recently viewed products

- [ ] **Product Bulk Operations**
  - [ ] Bulk product import (CSV/Excel)
  - [ ] Bulk price updates
  - [ ] Bulk status changes
  - [ ] Bulk image upload

- [ ] **Product SEO**
  - [ ] SEO-friendly URLs
  - [ ] Meta descriptions
  - [ ] Open Graph tags
  - [ ] Schema.org markup
  - [ ] Sitemap generation

---

## Inventory Management

### ✅ Completed
- [x] Stock quantity tracking
- [x] Low stock alerts
- [x] Out of stock status
- [x] Inventory value calculation

### 🔄 Pending
- [ ] **Advanced Inventory Features**
  - [ ] Multi-location inventory (warehouses)
  - [ ] Inventory reservations (hold stock during checkout)
  - [ ] Inventory movement history
  - [ ] Stock adjustment reasons
  - [ ] Automated reorder points

- [ ] **Inventory Alerts**
  - [ ] Email alerts for low stock
  - [ ] Dashboard notifications
  - [ ] Configurable threshold levels
  - [ ] Alert frequency settings

- [ ] **Inventory Reports**
  - [ ] Stock level reports
  - [ ] Inventory valuation reports
  - [ ] Stock movement reports
  - [ ] Slow-moving items report

---

## Notifications & Communications

### ✅ Completed
- [x] Order confirmation emails
- [x] Payment confirmation notifications
- [x] In-app notifications
- [x] Order status change notifications (email, SMS, in-app)
- [x] SMS service with Twilio/AWS SNS support (mock implementation ready)
- [x] Notification preferences with SMS support

### 🔄 Pending
- [ ] **Email Templates**
  - [ ] Order confirmation email template
  - [ ] Shipping confirmation email
  - [ ] Delivery confirmation email
  - [ ] Order cancellation email
  - [ ] Refund confirmation email
  - [ ] Password reset email
  - [ ] Welcome email for new customers

- [ ] **SMS Notifications** (Backend implemented, needs frontend integration)
  - [x] SMS service with phone validation
  - [x] Order status change SMS notifications
  - [ ] Order confirmation SMS (frontend integration)
  - [ ] Shipping updates SMS (frontend integration)
  - [ ] Payment reminders SMS
  - [ ] Delivery notifications SMS (frontend integration)

- [ ] **Push Notifications**
  - [ ] Browser push notifications
  - [ ] Mobile app push notifications (if applicable)
  - [ ] Notification preferences

- [ ] **Notification Preferences**
  - [ ] Customer notification settings
  - [ ] Email vs SMS preferences
  - [ ] Marketing communication opt-in/opt-out

---

## Admin Features

### ✅ Completed
- [x] Admin authentication
- [x] Product management
- [x] Order management
- [x] Customer management
- [x] Dashboard with statistics

### 🔄 Pending
- [ ] **Admin Dashboard Enhancements**
  - [ ] Sales analytics and charts
  - [ ] Revenue trends
  - [ ] Top-selling products
  - [ ] Customer acquisition metrics
  - [ ] Conversion rate tracking

- [ ] **Admin Reports**
  - [ ] Sales reports (daily, weekly, monthly)
  - [ ] Product performance reports
  - [ ] Customer lifetime value reports
  - [ ] Inventory reports
- [ ] **Settings Management**
  - [ ] Build UI in admin portal for editing payment/bank settings created in backend
  - [ ] Add audit logging for configuration changes (who/when/what)
  - [ ] Validation rules + test coverage for settings API
  - [ ] Documentation for ops handoff (how to update DPO/bank configs safely)
  - [ ] Financial reports

- [ ] **Admin User Management**
  - [ ] Role-based access control (RBAC)
  - [ ] Admin user roles (Super Admin, Manager, Support)
  - [ ] Permission management
  - [ ] Admin activity logging

- [ ] **Coupon Management**
  - [ ] Create/edit/delete coupons
  - [ ] Coupon usage tracking
  - [ ] Coupon expiration management
  - [ ] Bulk coupon generation

- [ ] **Content Management**
  - [ ] Homepage banner management
  - [ ] Promotional content management
  - [ ] Blog/news management (if applicable)
  - [ ] FAQ management

---

## Security & Performance

### 🔄 Pending
- [ ] **Security Enhancements**
  - [ ] Rate limiting on API endpoints
  - [ ] CSRF protection
  - [ ] XSS prevention
  - [ ] SQL injection prevention (verify all queries)
  - [ ] Input validation and sanitization
  - [ ] Security headers (CSP, HSTS, etc.)
  - [ ] Regular security audits

- [ ] **Performance Optimization**
  - [ ] Database query optimization
  - [ ] Caching strategy (Redis)
  - [ ] Image optimization and CDN
  - [ ] API response caching
  - [ ] Frontend code splitting
  - [ ] Lazy loading for images
  - [ ] Database indexing review

- [ ] **Monitoring & Logging**
  - [ ] Error tracking (Sentry or similar)
  - [ ] Application performance monitoring (APM)
  - [ ] Log aggregation and analysis
  - [ ] Uptime monitoring
  - [ ] Alert system for critical issues

- [ ] **Backup & Recovery**
  - [ ] Automated database backups
  - [ ] Backup verification
  - [ ] Disaster recovery plan
  - [ ] Data retention policies

---

## Testing & Quality Assurance

### 🔄 Pending
- [ ] **Unit Tests**
  - [ ] Backend service unit tests
  - [ ] Frontend component unit tests
  - [ ] Utility function tests
  - [ ] Minimum 80% code coverage

- [ ] **Integration Tests**
  - [ ] API endpoint tests
  - [ ] Database integration tests
  - [ ] Payment gateway integration tests
  - [ ] Email service integration tests

- [ ] **End-to-End Tests**
  - [ ] Complete checkout flow
  - [ ] User registration and login
  - [ ] Product search and filtering
  - [ ] Admin product management
  - [ ] Order management workflow

- [ ] **Performance Tests**
  - [ ] Load testing
  - [ ] Stress testing
  - [ ] Database performance tests
  - [ ] API response time benchmarks

- [ ] **Security Tests**
  - [ ] Penetration testing
  - [ ] Vulnerability scanning
  - [ ] Security code review

---

## Documentation

### 🔄 Pending
- [ ] **API Documentation**
  - [ ] Complete API endpoint documentation
  - [ ] Request/response examples
  - [ ] Authentication documentation
  - [ ] Error code reference

- [ ] **User Documentation**
  - [ ] Customer user guide
  - [ ] Admin user guide
  - [ ] FAQ section
  - [ ] Video tutorials (if applicable)

- [ ] **Developer Documentation**
  - [ ] Setup and installation guide
  - [ ] Architecture documentation
  - [ ] Database schema documentation
  - [ ] Deployment guide

---

## Deployment & DevOps

### 🔄 Pending
- [ ] **CI/CD Pipeline**
  - [ ] Automated testing in CI
  - [ ] Automated deployment
  - [ ] Staging environment
  - [ ] Production deployment process

- [ ] **Environment Configuration**
  - [ ] Environment variable documentation
  - [ ] Configuration management
  - [ ] Secrets management

- [ ] **Scaling Considerations**
  - [ ] Horizontal scaling strategy
  - [ ] Database scaling
  - [ ] CDN configuration
  - [ ] Load balancing

---

## Priority Levels

### 🔴 High Priority (Critical for Launch)
1. Payment Gateway Webhooks
2. ~~Order Status Workflow~~ ✅ Completed
3. Email Templates
4. Security Enhancements
5. Basic Testing Suite

### 🟡 Medium Priority (Important for UX)
1. Saved Cards Feature (Full Implementation)
2. Order Tracking
3. Product Reviews
4. Admin Dashboard Enhancements
5. Performance Optimization

### 🟢 Low Priority (Nice to Have)
1. Wishlist Functionality
2. Loyalty & Rewards
3. Product Recommendations
4. Advanced Analytics
5. Push Notifications

---

## Notes

- This document should be updated as tasks are completed
- Add new tasks as they are identified
- Review and prioritize tasks regularly
- Consider dependencies between tasks when planning implementation order

---

**Last Updated:** December 5, 2024
**Maintained By:** Development Team

---

## Recent Updates

### December 5, 2024 - Order Tracking Implementation
- ✅ Implemented Order Tracking feature:
  - Added shippedAt field to Order entity and UpdateOrderDto
  - Created EditOrderModal component for admin to manage order tracking
  - Integrated tracking number input in admin panel (OrderManagement)
  - Added tracking number column to orders table
  - Enhanced shipping notification email template with better formatting and order summary
  - Auto-set shippedAt timestamp and order status to "shipped" when tracking is added
  - Email notifications sent when tracking is added or updated
  - Customer portal already displays tracking information (existing feature)

### December 5, 2024
- ✅ Implemented Order Status Workflow (TDD approach):
  - Created OrderStatusTransitionService with complete transition validation
  - Implemented OrderStatusWorkflowService for managing status updates
  - Added SMS service with phone validation and multi-provider support
  - Enhanced NotificationsService with order status change notifications (email, SMS, in-app)
  - Added admin endpoint `PUT /orders/admin/:orderId/status` for status updates
  - Added SMS support to NotificationPreference entity
  - Comprehensive unit tests for all services (28 tests passing)
  - E2E test structure created (Jest config needs adjustment for uuid module)

### December 4, 2024
- ✅ Implemented Saved Cards backend functionality:
  - Created SavedCard entity with encryption support
  - Implemented SavedCardsService with full CRUD operations
  - Added API endpoints for card management
  - Integrated card saving into checkout flow
  - Added support for using saved cards in payments

