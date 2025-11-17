# Fix Brand Permissions in Strapi

## Issue
Brand content type exists in Content-Type Builder and Content Manager, but doesn't appear in Roles permissions.

## Solutions

### Solution 1: Restart Strapi (Most Common Fix)

After creating a new content type, Strapi needs to be restarted for it to appear in permissions:

1. **Stop Strapi** (Ctrl+C in the terminal where it's running)
2. **Start Strapi again**
3. **Wait for it to fully start** (you'll see "Server started" message)
4. **Go to Settings → Users & Permissions Plugin → Roles**
5. **Check again** - Brand should now appear

### Solution 2: Check API ID

The permission name might be different from the display name:

1. Go to **Content-Type Builder**
2. Click on **Brand** content type
3. Check the **API ID** (usually shown at the top or in settings)
4. It might be:
   - `brand` (lowercase)
   - `api::brand.brand` (full API path)
   - Something else if you customized it

5. In **Roles**, look for the permission using this API ID

### Solution 3: Check All Permissions Sections

Sometimes permissions are organized differently:

1. Go to **Settings → Users & Permissions Plugin → Roles**
2. Click on **Authenticated** role
3. Scroll through **ALL** sections - look for:
   - A section with "Brand" or "brand"
   - A section with "api::brand" or "api::brand.brand"
   - Any new/unfamiliar sections

4. If you see it but it's collapsed, expand it

### Solution 4: Re-save the Content Type

Sometimes re-saving triggers permission registration:

1. Go to **Content-Type Builder**
2. Click on **Brand**
3. Make a small change (like adding a space in description, then removing it)
4. Click **Save**
5. **Restart Strapi**
6. Check permissions again

### Solution 5: Check Strapi Version

If you're using Strapi v4+, permissions should appear automatically. If not:

1. Check your Strapi version: Look at package.json or the admin panel footer
2. Ensure you're using a recent version (v4.0+)
3. Older versions might have different permission structures

### Solution 6: Manual Permission Check via API

You can check if the endpoint is accessible with different authentication:

1. Try accessing: `http://localhost:1337/api/brands` in your browser
2. If you get a 403 (Forbidden), the endpoint exists but permissions aren't set
3. If you get a 404 (Not Found), Strapi needs to be restarted

### Solution 7: Clear Strapi Cache

Sometimes cache issues prevent permissions from appearing:

1. Stop Strapi
2. Delete `.cache` folder in your Strapi project (if it exists)
3. Restart Strapi
4. Check permissions again

## Verification Steps

After trying the solutions above:

1. **Restart Strapi** (always do this first!)
2. Go to **Settings → Users & Permissions Plugin → Roles**
3. Click **Authenticated** role
4. Look for **Brand** in the permissions list
5. Enable:
   - ✅ create
   - ✅ find
   - ✅ findOne
   - ✅ update
   - ✅ delete
6. Click **Save**
7. Test the endpoint: `node scripts/check-brands-endpoint.js`

## Expected Result

After fixing permissions, you should be able to:
- See Brand in Roles → Authenticated permissions
- Access `/api/brands` endpoint
- Create brands from the admin dashboard
- Add brands when editing products

