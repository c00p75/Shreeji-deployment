#!/usr/bin/env node

/**
 * Migration script to convert existing product data to Strapi format
 * This script reads from your existing productsData.js and products.json files
 * and creates Strapi-compatible data structure
 */

const fs = require('fs');
const path = require('path');

// Read existing product data from JSON file
const productsJsonPath = path.join(__dirname, '../data/products.json');
const allProducts = JSON.parse(fs.readFileSync(productsJsonPath, 'utf8'));

class ProductMigrator {
  constructor() {
    this.strapiData = {
      products: [],
      categories: new Set(),
      subcategories: new Set(),
      brands: new Set()
    };
  }

  // Extract unique categories, subcategories, and brands
  extractMetadata() {
    allProducts.forEach(product => {
      if (product.category) this.strapiData.categories.add(product.category);
      if (product.subcategory) this.strapiData.subcategories.add(product.subcategory);
      if (product.brand) this.strapiData.brands.add(product.brand);
    });

    console.log(`Found ${this.strapiData.categories.size} categories`);
    console.log(`Found ${this.strapiData.subcategories.size} subcategories`);
    console.log(`Found ${this.strapiData.brands.size} brands`);
  }

  // Convert product to Strapi format
  convertProduct(product, index) {
    return {
      id: index + 1,
      name: product.name,
      slug: this.createSlug(product.name),
      category: product.category,
      subcategory: product.subcategory,
      brand: product.brand,
      tagline: product.tagline || '',
      description: product.description || '',
      price: product.price || '',
      discountedPrice: product['discounted price'] || product.discountedPrice || '',
      specs: product.specs || {},
      specialFeature: product['special feature'] || product.specialFeature || null,
      images: this.processImages(product.images || [product.image]),
      dateAdded: product['date-added'] || product.dateAdded || new Date().toISOString(),
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }

  // Create URL-friendly slug
  createSlug(name) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  }

  // Process images array
  processImages(images) {
    if (!images) return [];
    
    if (!Array.isArray(images)) {
      images = [images];
    }
    
    return images.map((image, index) => {
      let imageUrl = '';
      
      if (typeof image === 'string') {
        imageUrl = image;
      } else if (image && typeof image === 'object') {
        imageUrl = image.src || image.url || image;
      } else {
        imageUrl = String(image || '');
      }
      
      return {
        id: index + 1,
        url: imageUrl,
        alt: `Product image ${index + 1}`,
        isMain: index === 0
      };
    });
  }

  // Generate Strapi content types schema
  generateContentTypes() {
    return {
      product: {
        kind: 'collectionType',
        collectionName: 'products',
        info: {
          singularName: 'product',
          pluralName: 'products',
          displayName: 'Product',
          description: 'Shreeji products catalog'
        },
        options: {
          draftAndPublish: true
        },
        pluginOptions: {},
        attributes: {
          name: {
            type: 'string',
            required: true,
            unique: true
          },
          slug: {
            type: 'uid',
            targetField: 'name',
            required: true,
            unique: true
          },
          category: {
            type: 'string',
            required: true
          },
          subcategory: {
            type: 'string',
            required: true
          },
          brand: {
            type: 'string',
            required: true
          },
          tagline: {
            type: 'string'
          },
          description: {
            type: 'text'
          },
          price: {
            type: 'string',
            required: true
          },
          discountedPrice: {
            type: 'string'
          },
          specs: {
            type: 'json'
          },
          specialFeature: {
            type: 'json'
          },
          images: {
            type: 'json'
          },
          isActive: {
            type: 'boolean',
            default: true
          }
        }
      }
    };
  }

  // Generate API endpoints for Strapi
  generateAPIEndpoints() {
    return {
      'GET /api/products': 'Get all products with filtering and pagination',
      'GET /api/products/:id': 'Get single product by ID',
      'GET /api/products/slug/:slug': 'Get product by slug',
      'POST /api/products': 'Create new product',
      'PUT /api/products/:id': 'Update product',
      'DELETE /api/products/:id': 'Delete product',
      'GET /api/categories': 'Get all categories',
      'GET /api/brands': 'Get all brands'
    };
  }

  // Run migration
  async migrate() {
    console.log('🚀 Starting product migration to Strapi format...\n');
    
    this.extractMetadata();
    
    console.log('\n📦 Converting products...');
    allProducts.forEach((product, index) => {
      const strapiProduct = this.convertProduct(product, index);
      this.strapiData.products.push(strapiProduct);
    });

    console.log(`✅ Converted ${this.strapiData.products.length} products`);

    // Generate output files
    this.generateOutputFiles();
    
    console.log('\n🎉 Migration completed successfully!');
    console.log('\nNext steps:');
    console.log('1. Set up Strapi with Node.js 18-22');
    console.log('2. Import the generated schema');
    console.log('3. Use the API endpoints to populate your Strapi instance');
    console.log('4. Update your Next.js app to use Strapi APIs');
  }

  generateOutputFiles() {
    const outputDir = path.join(__dirname, '../strapi-migration-output');
    
    // Create output directory
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write products data
    fs.writeFileSync(
      path.join(outputDir, 'products.json'),
      JSON.stringify(this.strapiData.products, null, 2)
    );

    // Write categories
    fs.writeFileSync(
      path.join(outputDir, 'categories.json'),
      JSON.stringify(Array.from(this.strapiData.categories), null, 2)
    );

    // Write brands
    fs.writeFileSync(
      path.join(outputDir, 'brands.json'),
      JSON.stringify(Array.from(this.strapiData.brands), null, 2)
    );

    // Write content types schema
    fs.writeFileSync(
      path.join(outputDir, 'content-types.json'),
      JSON.stringify(this.generateContentTypes(), null, 2)
    );

    // Write API endpoints documentation
    fs.writeFileSync(
      path.join(outputDir, 'api-endpoints.json'),
      JSON.stringify(this.generateAPIEndpoints(), null, 2)
    );

    // Write migration report
    const report = {
      migrationDate: new Date().toISOString(),
      totalProducts: this.strapiData.products.length,
      totalCategories: this.strapiData.categories.size,
      totalSubcategories: this.strapiData.subcategories.size,
      totalBrands: this.strapiData.brands.size,
      categories: Array.from(this.strapiData.categories),
      subcategories: Array.from(this.strapiData.subcategories),
      brands: Array.from(this.strapiData.brands)
    };

    fs.writeFileSync(
      path.join(outputDir, 'migration-report.json'),
      JSON.stringify(report, null, 2)
    );

    console.log(`\n📁 Output files generated in: ${outputDir}`);
    console.log('   - products.json (all products in Strapi format)');
    console.log('   - categories.json (unique categories)');
    console.log('   - brands.json (unique brands)');
    console.log('   - content-types.json (Strapi schema)');
    console.log('   - api-endpoints.json (API documentation)');
    console.log('   - migration-report.json (migration summary)');
  }
}

// Run migration if called directly
if (require.main === module) {
  const migrator = new ProductMigrator();
  migrator.migrate().catch(console.error);
}

module.exports = ProductMigrator;
