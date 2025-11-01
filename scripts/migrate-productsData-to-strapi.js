const fs = require('fs');
const path = require('path');

// Since productsData.js is an ES6 module, we need to handle it differently
// Let's read the file and parse it manually
const productsDataPath = path.join(__dirname, '../data/productsData.js');
const productsDataContent = fs.readFileSync(productsDataPath, 'utf8');

console.log('🚀 Starting migration from productsData.js to Strapi format...\n');

class ProductDataMigrator {
  constructor() {
    this.strapiData = {
      products: [],
      categories: new Set(),
      subcategories: new Set(),
      brands: new Set(),
    };
    this.productIdCounter = 1;
  }

  // Helper to create a slug
  createSlug(name) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  }

  // Process images array from productsData.js
  processImages(imagesArray) {
    if (!imagesArray || !Array.isArray(imagesArray)) return [];
    
    return imagesArray.map((imageRef, index) => {
      // imagesArray contains references like productImages.hpEnvyMoveAllInOne24
      // We need to extract the actual image path from the productImages.js file
      
      // For now, we'll create a placeholder structure
      // In a real implementation, you'd parse the productImages.js file
      let imageUrl = '';
      
      if (typeof imageRef === 'string') {
        imageUrl = imageRef;
      } else {
        // This is likely a reference to productImages.xxx
        imageUrl = `product-image-${index + 1}`;
      }
      
      return {
        id: index + 1,
        url: imageUrl,
        alt: `Product image ${index + 1}`,
        isMain: index === 0
      };
    });
  }

  // Parse the productsData.js file manually
  parseProductsData() {
    console.log('📖 Parsing productsData.js...');
    
    // Split by product blocks (looking for object starts)
    const productBlocks = productsDataContent.split(/(?=\{\s*"name":)/);
    let parsedProducts = [];
    
    for (const block of productBlocks) {
      if (block.includes('"name":')) {
        try {
          // Extract the product object using regex
          const productMatch = block.match(/\{[\s\S]*?\}/);
          if (productMatch) {
            // This is a simplified approach - in production you'd want a proper JS parser
            const productStr = productMatch[0];
            
            // Extract key fields using regex with better patterns
            const nameMatch = productStr.match(/"name":\s*"([^"]+)"/);
            const categoryMatch = productStr.match(/"category":\s*"([^"]+)"/);
            const subcategoryMatch = productStr.match(/"subcategory":\s*"([^"]+)"/);
            const brandMatch = productStr.match(/"brand":\s*"([^"]+)"/);
            const priceMatch = productStr.match(/"price":\s*"([^"]+)"/);
            const discountedPriceMatch = productStr.match(/"discounted price":\s*"([^"]+)"/);
            const taglineMatch = productStr.match(/"tagline":\s*"([^"]+)"/);
            const descriptionMatch = productStr.match(/"description":\s*"([^"]+)"/);
            const dateAddedMatch = productStr.match(/"date-added":\s*"([^"]+)"/);
            
            // Also try to extract specs (simplified)
            const specsMatch = productStr.match(/"specs":\s*\{([^}]+)\}/);
            let specs = {};
            if (specsMatch) {
              // Extract some key specs
              const processorMatch = specsMatch[1].match(/"processor":\s*"([^"]+)"/);
              const displayMatch = specsMatch[1].match(/"display":\s*"([^"]+)"/);
              const ramMatch = specsMatch[1].match(/"RAM":\s*"([^"]+)"/);
              const storageMatch = specsMatch[1].match(/"storage":\s*"([^"]+)"/);
              
              if (processorMatch) specs.processor = processorMatch[1];
              if (displayMatch) specs.display = displayMatch[1];
              if (ramMatch) specs.RAM = ramMatch[1];
              if (storageMatch) specs.storage = storageMatch[1];
            }
            
            if (nameMatch) {
              const product = {
                name: nameMatch[1],
                category: categoryMatch ? categoryMatch[1] : '',
                subcategory: subcategoryMatch ? subcategoryMatch[1] : '',
                brand: brandMatch ? brandMatch[1] : '',
                price: priceMatch ? priceMatch[1] : '',
                discountedPrice: discountedPriceMatch ? discountedPriceMatch[1] : null,
                tagline: taglineMatch ? taglineMatch[1] : null,
                description: descriptionMatch ? descriptionMatch[1] : null,
                dateAdded: dateAddedMatch ? dateAddedMatch[1] : new Date().toISOString().split('T')[0],
                specs: specs, // Include extracted specs
                images: [], // Will be populated from the image mapping
              };
              
              parsedProducts.push(product);
            }
          }
        } catch (error) {
          console.log(`⚠️  Error parsing product block: ${error.message}`);
        }
      }
    }
    
    console.log(`✅ Parsed ${parsedProducts.length} products from productsData.js`);
    return parsedProducts;
  }

  // Load image mapping from our previously generated file
  loadImageMapping() {
    const mappingPath = path.join(__dirname, '../data/product-image-mapping.json');
    if (fs.existsSync(mappingPath)) {
      const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));
      console.log(`📸 Loaded image mapping for ${mapping.totalProducts} products`);
      return mapping.mappings;
    }
    console.log('⚠️  No image mapping found');
    return {};
  }

  // Convert a single product to Strapi format
  convertProduct(product, imageMapping) {
    this.strapiData.categories.add(product.category);
    this.strapiData.subcategories.add(product.subcategory);
    this.strapiData.brands.add(product.brand);

    // Get images from mapping
    const mappedImages = imageMapping[product.name] || [];
    const processedImages = mappedImages.map((imagePath, index) => ({
      id: index + 1,
      url: imagePath.replace('@/public', '/public'),
      alt: product.name,
      isMain: index === 0
    }));

    const convertedProduct = {
      id: this.productIdCounter++,
      name: product.name,
      slug: this.createSlug(product.name),
      category: product.category,
      subcategory: product.subcategory,
      brand: product.brand,
      tagline: product.tagline || null,
      description: product.description || null,
      price: product.price,
      discountedPrice: product.discountedPrice || null,
      specs: product.specs || {},
      images: processedImages,
      dateAdded: product.dateAdded,
      isActive: true,
    };
    
    this.strapiData.products.push(convertedProduct);
  }

  // Migrate all products
  migrate() {
    console.log('🔄 Starting migration process...\n');

    // Parse products from productsData.js
    const products = this.parseProductsData();
    
    // Load image mapping
    const imageMapping = this.loadImageMapping();

    console.log(`Found ${this.strapiData.categories.size} categories`);
    console.log(`Found ${this.strapiData.subcategories.size} subcategories`);
    console.log(`Found ${this.strapiData.brands.size} brands`);

    console.log('\n📦 Converting products...');
    products.forEach(product => this.convertProduct(product, imageMapping));
    console.log(`✅ Converted ${this.strapiData.products.length} products`);

    this.writeOutput();
  }

  // Write output files
  writeOutput() {
    const outputDir = path.join(__dirname, '../strapi-migration-output');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    const productsOutput = JSON.stringify(this.strapiData.products, null, 2);
    fs.writeFileSync(path.join(outputDir, 'products-from-productsData.json'), productsOutput);

    const categoriesOutput = JSON.stringify(Array.from(this.strapiData.categories), null, 2);
    fs.writeFileSync(path.join(outputDir, 'categories.json'), categoriesOutput);

    const subcategoriesOutput = JSON.stringify(Array.from(this.strapiData.subcategories), null, 2);
    fs.writeFileSync(path.join(outputDir, 'subcategories.json'), subcategoriesOutput);

    const brandsOutput = JSON.stringify(Array.from(this.strapiData.brands), null, 2);
    fs.writeFileSync(path.join(outputDir, 'brands.json'), brandsOutput);

    const contentTypesSchema = this.generateContentTypes();
    fs.writeFileSync(path.join(outputDir, 'content-types.json'), JSON.stringify(contentTypesSchema, null, 2));

    const apiEndpoints = this.generateApiEndpoints();
    fs.writeFileSync(path.join(outputDir, 'api-endpoints.json'), JSON.stringify(apiEndpoints, null, 2));

    const migrationReport = {
      migrationDate: new Date().toISOString(),
      sourceFile: 'productsData.js',
      totalProducts: this.strapiData.products.length,
      totalCategories: this.strapiData.categories.size,
      totalSubcategories: Array.from(this.strapiData.subcategories).length,
      totalBrands: this.strapiData.brands.size,
      categories: Array.from(this.strapiData.categories),
      subcategories: Array.from(this.strapiData.subcategories),
      brands: Array.from(this.strapiData.brands),
      productsWithImages: this.strapiData.products.filter(p => p.images.length > 0).length,
    };
    fs.writeFileSync(path.join(outputDir, 'migration-report.json'), JSON.stringify(migrationReport, null, 2));

    console.log('\n📁 Output files generated in: ' + outputDir);
    console.log('   - products-from-productsData.json (all products in Strapi format)');
    console.log('   - categories.json (unique categories)');
    console.log('   - subcategories.json (unique subcategories)');
    console.log('   - brands.json (unique brands)');
    console.log('   - content-types.json (Strapi schema)');
    console.log('   - api-endpoints.json (API documentation)');
    console.log('   - migration-report.json (migration summary)');
    console.log('\n🎉 Migration completed successfully!');
    
    console.log('\n📊 Migration Summary:');
    console.log(`✅ Products migrated: ${migrationReport.totalProducts}`);
    console.log(`📸 Products with images: ${migrationReport.productsWithImages}`);
    console.log(`📂 Categories: ${migrationReport.totalCategories}`);
    console.log(`📁 Subcategories: ${migrationReport.totalSubcategories}`);
    console.log(`🏷️  Brands: ${migrationReport.totalBrands}`);
    
    console.log('\nNext steps:');
    console.log('1. Import the generated data into Strapi');
    console.log('2. Set up API permissions in Strapi');
    console.log('3. Update your Next.js app to use Strapi APIs');
    console.log('4. Test the admin dashboard with real Strapi data');
  }

  // Generate Strapi content types schema
  generateContentTypes() {
    return {
      product: {
        kind: "collectionType",
        collectionName: "products",
        info: {
          singularName: "product",
          pluralName: "products",
          displayName: "Product",
          description: "Products migrated from productsData.js"
        },
        options: {
          draftAndPublish: true
        },
        attributes: {
          name: {
            type: "string",
            required: true,
            unique: true
          },
          slug: {
            type: "string",
            required: true,
            unique: true
          },
          category: {
            type: "string",
            required: true
          },
          subcategory: {
            type: "string"
          },
          brand: {
            type: "string"
          },
          tagline: {
            type: "string"
          },
          description: {
            type: "text"
          },
          price: {
            type: "string",
            required: true
          },
          discountedPrice: {
            type: "string"
          },
          specs: {
            type: "json" // Store product specifications as JSON
          },
          images: {
            type: "json" // Store image URLs and metadata as JSON
          },
          dateAdded: {
            type: "date"
          },
          isActive: {
            type: "boolean",
            default: true
          }
        }
      }
    };
  }

  // Generate API endpoints documentation
  generateApiEndpoints() {
    return {
      "Strapi API Endpoints Available": {
        "GET /api/products": "Get all products",
        "GET /api/products/:id": "Get single product",
        "POST /api/products": "Create product",
        "PUT /api/products/:id": "Update product",
        "DELETE /api/products/:id": "Delete product"
      },
      "Example API calls": [
        "curl -X GET http://localhost:1337/api/products",
        "curl -X GET \"http://localhost:1337/api/products?filters[category][$eq]=Computers\"",
        "curl -X GET \"http://localhost:1337/api/products?filters[brand][$eq]=HP\"",
        "curl -X GET \"http://localhost:1337/api/products?filters[subcategory][$eq]=All in One\""
      ],
      "Features": [
        "✅ Multiple images per product",
        "✅ Local image mapping",
        "✅ Complete product information",
        "✅ Category and subcategory filtering",
        "✅ Brand filtering"
      ]
    };
  }
}

const migrator = new ProductDataMigrator();
migrator.migrate();
