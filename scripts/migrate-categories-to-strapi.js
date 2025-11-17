const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Configuration
const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337/api';
const STRAPI_API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_KEY || '';

const strapi = axios.create({
  baseURL: STRAPI_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': STRAPI_API_TOKEN ? `Bearer ${STRAPI_API_TOKEN}` : '',
  },
});

class CategoryMigrator {
  constructor() {
    this.categoriesMap = new Map(); // category name -> category id
    this.subcategoriesMap = new Map(); // subcategory name -> subcategory id
    this.createdCategories = 0;
    this.createdSubcategories = 0;
    this.errors = [];
  }

  // Helper to create a slug
  createSlug(name) {
    if (!name) return '';
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  }

  // Extract unique categories and subcategories from productsData.js
  extractCategoriesFromProducts() {
    console.log('📖 Reading productsData.js...');
    
    const productsDataPath = path.join(__dirname, '../data/productsData.js');
    const content = fs.readFileSync(productsDataPath, 'utf8');
    
    // Extract all product objects
    const products = [];
    const productRegex = /\{\s*"name":\s*"([^"]+)",[\s\S]*?\}/g;
    let match;
    
    while ((match = productRegex.exec(content)) !== null) {
      const productBlock = match[0];
      const nameMatch = productBlock.match(/"name":\s*"([^"]+)"/);
      const categoryMatch = productBlock.match(/"category":\s*"([^"]+)"/);
      const subcategoryMatch = productBlock.match(/"subcategory":\s*"([^"]+)"/);
      
      if (nameMatch && categoryMatch) {
        products.push({
          name: nameMatch[1],
          category: categoryMatch[1],
          subcategory: subcategoryMatch ? subcategoryMatch[1].trim() : null
        });
      }
    }

    // Extract unique categories and subcategories
    const categories = new Set();
    const subcategoriesByCategory = new Map();

    products.forEach(product => {
      if (product.category) {
        categories.add(product.category);
        
        if (product.subcategory && product.subcategory.trim()) {
          if (!subcategoriesByCategory.has(product.category)) {
            subcategoriesByCategory.set(product.category, new Set());
          }
          subcategoriesByCategory.get(product.category).add(product.subcategory);
        }
      }
    });

    console.log(`✅ Found ${categories.size} unique categories`);
    console.log(`✅ Found subcategories in ${subcategoriesByCategory.size} categories\n`);
    
    return { categories, subcategoriesByCategory };
  }

  // Test Strapi connection
  async testConnection() {
    try {
      // First, test if Strapi is running
      await strapi.get('/');
      console.log('✅ Connected to Strapi successfully');
    } catch (error) {
      console.error('❌ Failed to connect to Strapi:');
      console.error(`   Error: ${error.message}`);
      if (error.response) {
        console.error(`   Status: ${error.response.status}`);
      }
      console.log('\n💡 Please ensure Strapi is running on http://localhost:1337');
      return false;
    }

    // Check if Category content type exists
    try {
      await strapi.get('/categories?pagination[pageSize]=1');
      console.log('✅ Category content type is accessible');
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error('\n❌ Category content type not found!');
        console.error('   The API returned 404, which means:');
        console.error('   1. Category content type may not exist in Strapi');
        console.error('   2. Or it hasn\'t been saved after creation');
        console.error('   3. Or API permissions are not set');
        console.log('\n📋 Steps to fix:');
        console.log('   1. Go to Strapi Admin: http://localhost:1337/admin');
        console.log('   2. Navigate to Content-Type Builder');
        console.log('   3. Make sure "Category" collection type exists');
        console.log('   4. Click "Save" if you see unsaved changes');
        console.log('   5. Go to Settings → Users & Permissions Plugin → Roles');
        console.log('   6. Click "Public" role');
        console.log('   7. Enable "find" and "findOne" for Category');
        console.log('   8. Click "Authenticated" role');
        console.log('   9. Enable all permissions for Category');
        console.log('   10. Repeat steps 5-9 for Subcategory');
        console.log('   11. Save and restart Strapi if needed');
        return false;
      }
      throw error;
    }

    // Check if Subcategory content type exists
    try {
      await strapi.get('/subcategories?pagination[pageSize]=1');
      console.log('✅ Subcategory content type is accessible\n');
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error('\n❌ Subcategory content type not found!');
        console.error('   Follow the same steps above for Subcategory');
        return false;
      }
      throw error;
    }

    return true;
  }

  // Create a category in Strapi
  async createCategory(categoryName) {
    try {
      // Check if category already exists
      const existing = await strapi.get('/categories', {
        params: {
          'filters[name][$eq]': categoryName,
          'pagination[pageSize]': 1
        }
      });

      if (existing.data.data.length > 0) {
        const categoryId = existing.data.data[0].id;
        this.categoriesMap.set(categoryName, categoryId);
        console.log(`   ✓ Category "${categoryName}" already exists (ID: ${categoryId})`);
        return categoryId;
      }

      // Create new category
      const categoryData = {
        data: {
          name: categoryName,
          slug: this.createSlug(categoryName),
        }
      };

      const response = await strapi.post('/categories', categoryData);
      const categoryId = response.data.data.id;
      this.categoriesMap.set(categoryName, categoryId);
      this.createdCategories++;
      
      console.log(`   ✅ Created category: "${categoryName}" (ID: ${categoryId})`);
      return categoryId;

    } catch (error) {
      const errorMsg = `Failed to create category "${categoryName}": ${error.message}`;
      console.error(`   ❌ ${errorMsg}`);
      if (error.response) {
        console.error(`      Details: ${JSON.stringify(error.response.data, null, 2)}`);
      }
      this.errors.push({ type: 'category', name: categoryName, error: errorMsg });
      throw error;
    }
  }

  // Create a subcategory in Strapi
  async createSubcategory(subcategoryName, categoryId) {
    try {
      // Check if subcategory already exists
      const existing = await strapi.get('/subcategories', {
        params: {
          'filters[name][$eq]': subcategoryName,
          'filters[category][id][$eq]': categoryId,
          'pagination[pageSize]': 1
        }
      });

      if (existing.data.data.length > 0) {
        const subcategoryId = existing.data.data[0].id;
        this.subcategoriesMap.set(subcategoryName, subcategoryId);
        console.log(`      ✓ Subcategory "${subcategoryName}" already exists (ID: ${subcategoryId})`);
        return subcategoryId;
      }

      // Create new subcategory
      const subcategoryData = {
        data: {
          name: subcategoryName,
          slug: this.createSlug(subcategoryName),
          category: categoryId,
        }
      };

      const response = await strapi.post('/subcategories', subcategoryData);
      const subcategoryId = response.data.data.id;
      this.subcategoriesMap.set(subcategoryName, subcategoryId);
      this.createdSubcategories++;
      
      console.log(`      ✅ Created subcategory: "${subcategoryName}" (ID: ${subcategoryId})`);
      return subcategoryId;

    } catch (error) {
      const errorMsg = `Failed to create subcategory "${subcategoryName}": ${error.message}`;
      console.error(`      ❌ ${errorMsg}`);
      if (error.response) {
        console.error(`         Details: ${JSON.stringify(error.response.data, null, 2)}`);
      }
      this.errors.push({ type: 'subcategory', name: subcategoryName, error: errorMsg });
      throw error;
    }
  }

  // Main migration function
  async migrate() {
    console.log('🚀 Starting Category & Subcategory Migration to Strapi\n');
    console.log('='.repeat(60));

    // Test connection
    const connected = await this.testConnection();
    if (!connected) {
      process.exit(1);
    }

    // Extract categories and subcategories
    const { categories, subcategoriesByCategory } = this.extractCategoriesFromProducts();

    console.log('\n📦 Creating Categories...');
    console.log('-'.repeat(60));

    // Create all categories first
    for (const categoryName of categories) {
      try {
        await this.createCategory(categoryName);
        // Small delay to avoid overwhelming the API
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        // Error already logged in createCategory
        continue;
      }
    }

    console.log('\n📦 Creating Subcategories...');
    console.log('-'.repeat(60));

    // Create subcategories and link to categories
    for (const [categoryName, subcategories] of subcategoriesByCategory) {
      const categoryId = this.categoriesMap.get(categoryName);
      
      if (!categoryId) {
        console.error(`   ⚠️  Category "${categoryName}" not found, skipping subcategories`);
        continue;
      }

      console.log(`\n   📁 Category: ${categoryName}`);
      
      for (const subcategoryName of subcategories) {
        if (subcategoryName && subcategoryName.trim()) {
          try {
            await this.createSubcategory(subcategoryName, categoryId);
            // Small delay to avoid overwhelming the API
            await new Promise(resolve => setTimeout(resolve, 100));
          } catch (error) {
            // Error already logged in createSubcategory
            continue;
          }
        }
      }
    }

    // Print summary
    this.printSummary();
  }

  printSummary() {
    console.log('\n' + '='.repeat(60));
    console.log('🎉 Migration Summary');
    console.log('='.repeat(60));
    console.log(`✅ Created Categories: ${this.createdCategories}`);
    console.log(`✅ Created Subcategories: ${this.createdSubcategories}`);
    console.log(`📊 Total Categories: ${this.categoriesMap.size}`);
    console.log(`📊 Total Subcategories: ${this.subcategoriesMap.size}`);
    
    if (this.errors.length > 0) {
      console.log(`\n❌ Errors: ${this.errors.length}`);
      this.errors.forEach((error, index) => {
        console.log(`   ${index + 1}. [${error.type}] ${error.name}: ${error.error}`);
      });
    }

    console.log('\n📋 Category IDs:');
    for (const [name, id] of this.categoriesMap) {
      console.log(`   - ${name}: ${id}`);
    }

    console.log('\n🚀 Next Steps:');
    console.log('1. Verify categories and subcategories in Strapi admin (http://localhost:1337/admin)');
    console.log('2. Check that subcategories are properly linked to their parent categories');
    console.log('3. Update products to link to categories/subcategories (run product migration if needed)');
    console.log('4. Test the admin dashboard to ensure categories appear correctly');
    
    if (this.createdCategories > 0 || this.createdSubcategories > 0) {
      console.log('\n✅ Migration completed successfully!');
    }
  }
}

// Main execution
async function main() {
  const migrator = new CategoryMigrator();
  await migrator.migrate();
}

main().catch(console.error);

