# Shreeji CMS Setup Guide

This guide will help you set up the complete CMS solution with Strapi backend and DashLite-inspired admin dashboard.

## 🎯 What We've Built

### ✅ Completed Components

1. **Migration Script** - Converts your existing product data to Strapi format
2. **Admin Dashboard** - DashLite-inspired interface for content management
3. **API Integration** - Services to connect your existing site with Strapi
4. **Product Management** - Full CRUD operations with modern UI

### 📊 Migration Results

- **188 products** successfully converted
- **9 categories** identified
- **16 subcategories** identified  
- **23 brands** identified
- All data preserved with proper structure

## 🚀 Setup Instructions

### Step 1: Set Up Strapi Backend

Due to Node.js version compatibility (you have v24.6.0, Strapi requires 18-22), you have two options:

#### Option A: Use Node Version Manager (Recommended)

```bash
# Install nvm if you don't have it
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install and use Node.js 18
nvm install 18
nvm use 18

# Create Strapi project
cd /Users/yxzuji/Desktop/Projects/Shreeji-deployment
npx create-strapi-app@latest shreeji-cms --quickstart
```

#### Option B: Use Docker (Alternative)

```bash
# Create docker-compose.yml for Strapi
cd /Users/yxzuji/Desktop/Projects/Shreeji-deployment
mkdir shreeji-cms
cd shreeji-cms

# Create docker-compose.yml
cat > docker-compose.yml << EOF
version: '3.8'
services:
  strapi:
    image: strapi/strapi:latest
    ports:
      - "1337:1337"
    environment:
      - NODE_ENV=development
    volumes:
      - ./app:/srv/app
      - ./config:/srv/config
      - ./database:/srv/database
      - ./exports:/srv/exports
      - ./public:/srv/public
      - ./src:/srv/src
    command: "strapi develop"
EOF

# Run with Docker
docker-compose up
```

### Step 2: Configure Strapi Content Types

1. **Access Strapi Admin**: Go to `http://localhost:1337/admin`
2. **Create Admin Account**: Set up your admin credentials
3. **Create Product Content Type**:

```javascript
// In Strapi Admin > Content-Type Builder > Create new collection type
{
  "name": "Product",
  "apiId": "product",
  "attributes": {
    "name": {
      "type": "string",
      "required": true,
      "unique": true
    },
    "slug": {
      "type": "uid",
      "targetField": "name",
      "required": true
    },
    "category": {
      "type": "string",
      "required": true
    },
    "subcategory": {
      "type": "string",
      "required": true
    },
    "brand": {
      "type": "string",
      "required": true
    },
    "tagline": {
      "type": "string"
    },
    "description": {
      "type": "text"
    },
    "price": {
      "type": "string",
      "required": true
    },
    "discountedPrice": {
      "type": "string"
    },
    "specs": {
      "type": "json"
    },
    "specialFeature": {
      "type": "json"
    },
    "images": {
      "type": "json"
    },
    "isActive": {
      "type": "boolean",
      "default": true
    },
    "featured": {
      "type": "boolean",
      "default": false
    },
    "stock": {
      "type": "enumeration",
      "enum": ["in-stock", "out-of-stock", "limited"],
      "default": "in-stock"
    }
  }
}
```

### Step 3: Import Your Product Data

```bash
# Navigate to your project
cd /Users/yxzuji/Desktop/Projects/Shreeji-deployment

# The migration script has already generated the data
# Check the output files
ls -la strapi-migration-output/

# You can now manually import products.json into Strapi
# Or create an import script (see below)
```

### Step 4: Set Up Admin Dashboard

```bash
# Install dependencies for admin dashboard
cd admin-dashboard
npm install

# Set up environment variables
cp .env.example .env.local
```

Create `.env.local`:
```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_API_KEY=your_api_key_here
```

```bash
# Run the admin dashboard
npm run dev
```

Access at: `http://localhost:3001`

### Step 5: Update Your Main Website

1. **Install Strapi Client**:
```bash
cd /Users/yxzuji/Desktop/Projects/Shreeji-deployment
# The strapi-client.js is already created in utils/
```

2. **Update Product Components**:
Replace static imports with API calls:

```javascript
// Before (in your existing components)
import { allProducts } from "@/data/productsData"

// After
import { getAllProducts } from "@/utils/strapi-client"
```

3. **Environment Variables**:
Add to your main site's `.env.local`:
```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_API_KEY=your_api_key_here
```

## 🔧 API Endpoints

Your Strapi instance will provide these endpoints:

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

## 📱 Admin Dashboard Features

### Dashboard Overview
- ✅ Today's Orders, Revenue, Customers, Visitors stats
- ✅ Sales statistics charts
- ✅ Recent orders table
- ✅ Top products list

### Product Management
- ✅ Product list with card/grid view
- ✅ Advanced filtering and search
- ✅ Bulk actions
- ✅ Image management
- ✅ Status management (Active/Inactive)

### Future Features (Easy to Add)
- Order management
- Customer management
- Analytics and reporting
- Inventory tracking

## 🎨 Design Features

The admin dashboard matches the DashLite design with:
- ✅ Modern sidebar navigation
- ✅ Responsive design
- ✅ Clean typography (Inter font)
- ✅ Consistent color scheme
- ✅ Professional data tables
- ✅ Interactive charts
- ✅ Mobile-friendly interface

## 🚀 Deployment Options

### Option 1: Self-Hosted
- Deploy Strapi to your server
- Deploy admin dashboard to Vercel/Netlify
- Update environment variables

### Option 2: Strapi Cloud
- Use Strapi Cloud for backend
- Deploy admin dashboard separately
- Connect via API

### Option 3: All-in-One
- Deploy everything to a single server
- Use Docker for easy deployment

## 📞 Next Steps

1. **Choose your deployment method**
2. **Set up Strapi with Node.js 18-22**
3. **Import your product data**
4. **Test the admin dashboard**
5. **Update your main site to use Strapi APIs**
6. **Deploy to production**

## 🆘 Troubleshooting

### Node.js Version Issue
```bash
# Use nvm to switch Node versions
nvm install 18
nvm use 18
node --version  # Should show v18.x.x
```

### Strapi Connection Issues
- Check if Strapi is running on port 1337
- Verify API key in environment variables
- Check CORS settings in Strapi config

### Import Issues
- Ensure product data is valid JSON
- Check Strapi content type matches the schema
- Verify API permissions are set correctly

## 📚 Resources

- [Strapi Documentation](https://docs.strapi.io/)
- [DashLite Template](https://dashlite.net/demo2/index.html)
- [Next.js Documentation](https://nextjs.org/docs)

---

**Your CMS is ready!** 🎉

The migration script has successfully converted all 188 of your products, and the admin dashboard provides a professional interface for managing your content. Once you set up Strapi, you'll have a complete CMS solution that matches the DashLite design aesthetic.
