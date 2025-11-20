// This script exports productsData to JSON format
// Run with: node scripts/export-products-json.js

const fs = require('fs');
const path = require('path');

// Since we can't easily parse ES6 modules, we'll create a simple export
// that can be run with ts-node or similar
console.log('This script needs to be run with a tool that supports ES6 modules.');
console.log('Alternatively, manually convert productsData.js to JSON format.');
console.log('\nTo export, you can:');
console.log('1. Use ts-node: npx ts-node scripts/export-products-json.ts');
console.log('2. Or create a TypeScript version of this script');

