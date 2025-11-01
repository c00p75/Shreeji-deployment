# Directory Structure

## Project Organization

This repository contains the **Shreeji frontend application** (Next.js).

### Related Projects

The Shreeji project is split into multiple directories at the `/Users/yxzuji/Desktop/Projects/` level:

```
/Users/yxzuji/Desktop/Projects/
├── Shreeji-deployment/    # This repository - Next.js frontend
└── shreeji-cms/           # Strapi CMS backend (separate project)
```

### Why Separate?

- **Strapi (shreeji-cms)** needs to be deployed to a different hosting platform (Railway, Render, etc.)
- **Next.js (Shreeji-deployment)** is deployed to Vercel
- Both projects are in separate directories for independent deployment and management

### Working with Both Projects

**Start Strapi:**
```bash
cd ../shreeji-cms
pnpm develop
```

**Start Next.js:**
```bash
cd Shreeji-deployment
npm run dev
```

**Start both together:**
```bash
cd Shreeji-deployment
npm run dev:all
```

This will automatically start both services from their respective directories.

### Deployment

- **Frontend (Next.js)**: Deploy to Vercel
- **Backend (Strapi)**: Deploy to Railway/Render/DigitalOcean (see `../shreeji-cms/DEPLOYMENT.md`)

