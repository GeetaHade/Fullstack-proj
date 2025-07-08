const { MongoClient } = require('mongodb');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

// Load products from JSON file
const products = JSON.parse(fs.readFileSync(path.join(__dirname, '../app/product-data.json'), 'utf-8'));

async function seedDatabase() {
  const uri = process.env.MONGODB_URI;
  
  if (!uri) {
    console.error('MONGODB_URI is not defined in environment variables');
    console.log('Please create a .env.local file with your MongoDB connection string');
    console.log('Example: MONGODB_URI=mongodb://localhost:27017/ecommerce-nextjs');
    process.exit(1);
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('ecommerce-nextjs');
    const productsCollection = db.collection('products');

    // Clear existing products
    await productsCollection.deleteMany({});
    console.log('Cleared existing products');

    // Insert all products
    const result = await productsCollection.insertMany(products);
    console.log(`Successfully seeded database with ${result.insertedCount} products`);

    // Verify the seeding
    const count = await productsCollection.countDocuments();
    console.log(`Database now contains ${count} products`);

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await client.close();
    console.log('Database connection closed');
  }
}

seedDatabase(); 