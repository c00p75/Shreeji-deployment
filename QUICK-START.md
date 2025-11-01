# Quick Start Guide

## Starting the Admin Dashboard

The admin dashboard requires **Strapi CMS to be running** before you can log in.

### Option 1: Start Strapi and Next.js Separately

**Terminal 1 - Start Strapi:**
```bash
npm run dev:strapi
# OR
cd ../shreeji-cms && pnpm develop
```

**Terminal 2 - Start Next.js:**
```bash
npm run dev
```

### Option 2: Start Both Together

```bash
npm run dev:all
```

This will start both Strapi and Next.js concurrently.

### Verify Strapi is Running

Once Strapi starts, you should see:
- Strapi admin panel available at: `http://localhost:1337/admin`
- API available at: `http://localhost:1337/api`

### Access Admin Dashboard

1. Make sure Strapi is running (check port 1337)
2. Navigate to: `http://localhost:3000/admin/login`
3. Use your Strapi admin credentials to log in

### Troubleshooting

**Error: `ERR_CONNECTION_REFUSED` on port 1337**
- **Solution**: Start Strapi first using `npm run dev:strapi` or `npm run dev:all`

**Error: `Network Error`**
- Check if Strapi is running: Visit `http://localhost:1337/admin` in your browser
- Verify environment variables (if using custom Strapi URL)

### Environment Variables

If your Strapi is running on a different URL, create a `.env.local` file:

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337/api
NEXT_PUBLIC_STRAPI_ADMIN_URL=http://localhost:1337
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

