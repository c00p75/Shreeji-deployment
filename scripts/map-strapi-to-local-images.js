const fs = require('fs');
const path = require('path');

// Read the productsData.js file to extract image mappings
const productsDataPath = path.join(__dirname, '../data/productsData.js');
const productsDataContent = fs.readFileSync(productsDataPath, 'utf8');

// Read the productImages.js file to understand image paths
const productImagesPath = path.join(__dirname, '../data/productImages.js');
const productImagesContent = fs.readFileSync(productImagesPath, 'utf8');

console.log('🔍 Analyzing product image structure...\n');

// Extract image import mappings from productImages.js
const imageImports = {};
const importRegex = /import\s+(\w+)\s+from\s+["']([^"']+)["'];/g;
let match;

while ((match = importRegex.exec(productImagesContent)) !== null) {
  const [, importName, importPath] = match;
  imageImports[importName] = importPath;
}

console.log('📸 Found image imports:', Object.keys(imageImports).length);

// Extract product data structure from productsData.js
// This is a simplified approach - in a real scenario, you'd need to parse the JS file properly
const productMatches = productsDataContent.match(/\{\s*"name":\s*"([^"]+)",[\s\S]*?"images":\s*\[([^\]]+)\]/g);

console.log('\n🛍️  Creating image mapping for Strapi products...\n');

// Create a mapping object that maps product names to their image arrays
const productImageMapping = {};

// Parse productsData.js to extract image mappings
// This is a simplified parser - you might need a more sophisticated approach
const productBlocks = productsDataContent.split(/(?=\{\s*"name":)/);
let mappingCount = 0;

for (const block of productBlocks) {
  if (block.includes('"name":')) {
    try {
      // Extract product name
      const nameMatch = block.match(/"name":\s*"([^"]+)"/);
      if (!nameMatch) continue;
      
      const productName = nameMatch[1];
      
      // Extract images array
      const imagesMatch = block.match(/"images":\s*\[([^\]]+)\]/);
      if (!imagesMatch) continue;
      
      const imagesContent = imagesMatch[1];
      
      // Extract image references
      const imageRefs = imagesContent.match(/productImages\.(\w+)/g);
      if (!imageRefs) continue;
      
      // Convert image references to actual paths
      const imagePaths = imageRefs.map(ref => {
        const imageName = ref.replace('productImages.', '');
        return imageImports[imageName] || null;
      }).filter(Boolean);
      
      if (imagePaths.length > 0) {
        productImageMapping[productName] = imagePaths;
        mappingCount++;
        console.log(`✅ ${productName}: ${imagePaths.length} images`);
      }
    } catch (error) {
      console.log(`⚠️  Error parsing block: ${error.message}`);
    }
  }
}

console.log(`\n📊 Created mappings for ${mappingCount} products`);

// Create a mapping file for use in the admin dashboard
const mappingOutput = {
  generatedAt: new Date().toISOString(),
  totalProducts: mappingCount,
  mappings: productImageMapping
};

// Write the mapping to a JSON file
const mappingPath = path.join(__dirname, '../data/product-image-mapping.json');
fs.writeFileSync(mappingPath, JSON.stringify(mappingOutput, null, 2));

console.log(`\n💾 Image mapping saved to: ${mappingPath}`);

// Create a sample of the first few mappings
console.log('\n📋 Sample mappings:');
Object.entries(productImageMapping).slice(0, 3).forEach(([name, images]) => {
  console.log(`\n${name}:`);
  images.forEach((image, index) => {
    console.log(`  ${index + 1}. ${image}`);
  });
});

console.log('\n🎯 Next steps:');
console.log('1. Use this mapping in your admin dashboard');
console.log('2. Update the image handling logic to use local images');
console.log('3. Test the image display in the admin panel');

console.log('\n✅ Image mapping generation completed!');
