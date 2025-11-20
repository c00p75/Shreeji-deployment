// ES6 module version - run with: node scripts/export-products-json.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mock productImages and brandLogo since we only need the structure
const productImages = {};
const brandLogo = {};

// Read and evaluate the productsData.js file
const productsDataPath = path.join(__dirname, '../data/productsData.js');
const fileContent = fs.readFileSync(productsDataPath, 'utf8');

// Replace the import with our mock
const modifiedContent = fileContent.replace(
  /import\s+.*from\s+['"]\.\/productImages['"]/,
  '// import replaced with mock'
);

// Create a module context with mocks
const moduleCode = `
  const productImages = {};
  const brandLogo = {};
  ${modifiedContent}
  export { allProducts };
`;

// Extract just the array definition
const arrayStartMatch = fileContent.match(/export\s+const\s+allProducts\s*=\s*\[/);
if (!arrayStartMatch) {
  console.error('Could not find allProducts array');
  process.exit(1);
}

const arrayStart = arrayStartMatch.index + arrayStartMatch[0].length;

// Find the matching closing bracket
let bracketCount = 1; // Start at 1 because we're already past the opening [
let inString = false;
let stringChar = null;
let escapeNext = false;
let arrayEnd = arrayStart;

for (let i = arrayStart; i < fileContent.length; i++) {
  const char = fileContent[i];
  
  if (escapeNext) {
    escapeNext = false;
    continue;
  }
  
  if (char === '\\') {
    escapeNext = true;
    continue;
  }
  
  // Handle string literals
  if (!inString && (char === '"' || char === "'" || char === '`')) {
    inString = true;
    stringChar = char;
  } else if (inString && char === stringChar) {
    inString = false;
    stringChar = null;
  }
  
  if (!inString) {
    if (char === '[') bracketCount++;
    if (char === ']') {
      bracketCount--;
      if (bracketCount === 0) {
        arrayEnd = i;
        break;
      }
    }
  }
}

// Extract the array content (without the closing bracket, we'll add it)
let arrayContent = fileContent.substring(arrayStart, arrayEnd);

// Replace image references with placeholder strings
arrayContent = arrayContent.replace(/productImages\.\w+/g, (match) => {
  const imageName = match.replace('productImages.', '');
  return `"/products/${imageName}.png"`;
});

arrayContent = arrayContent.replace(/brandLogo\.\w+/g, (match) => {
  const logoName = match.replace('brandLogo.', '');
  return `"/logos/${logoName}.png"`;
});

// Evaluate the array
const allProducts = eval(`[${arrayContent}]`);

// Export to JSON
const outputPath = path.join(__dirname, '../data/products-export.json');
fs.writeFileSync(outputPath, JSON.stringify(allProducts, null, 2), 'utf8');

console.log(`✅ Exported ${allProducts.length} products to ${outputPath}`);

