# Quick Start Guide

## Starting the Admin Dashboard

The admin dashboard requires **NestJS Backend to be running** before you can log in.

### Option 1: Start Backend and Next.js Separately

**Terminal 1 - Start NestJS Backend:**
```bash
npm run dev:backend
# OR
cd ../shreeji-ecommerce-backend && npm run start:dev
```

**Terminal 2 - Start Next.js:**
```bash
npm run dev
```

### Option 2: Start Both Together

```bash
npm run dev:all
```

This will start both NestJS backend and Next.js concurrently.

### Verify Backend is Running

Once the backend starts, you should see:
- Backend API available at: `http://localhost:4000`
- API documentation at: `http://localhost:4000/api` (if Swagger is enabled)

### Access Admin Dashboard

1. Make sure the backend is running (check port 4000)
2. Navigate to: `http://localhost:3000/admin/login`
3. Use your admin credentials to log in

### Troubleshooting

**Error: `ERR_CONNECTION_REFUSED` on port 4000**
- **Solution**: Start the backend first using `npm run dev:backend` or `npm run dev:all`

**Error: `Network Error`**
- Check if the backend is running: Visit `http://localhost:4000` in your browser
- Verify environment variables (if using custom backend URL)

### Environment Variables

If your backend is running on a different URL, create a `.env.local` file:

```env
NEXT_PUBLIC_ECOM_API_URL=http://localhost:4000
```

## Admin Dashboard Routes

- `/admin/login` - Login page
- `/admin` - Dashboard
- `/admin/products` - Product management
- `/admin/inventory` - Inventory management
- `/admin/orders` - Order management
- `/admin/customers` - Customer management
- `/admin/settings` - Settings

## Client Portal Routes

- `/portal/login` - Client login
- `/portal/dashboard` - Client dashboard
- `/portal/orders` - Client orders
- `/portal/profile` - Client profile

