import { NextRequest, NextResponse } from 'next/server';
import { connectToDb } from '../db';
import { products } from '../../product-data';

// GET /api/products - Fetch all products from database
export async function GET() {
  try {
    const { db } = await connectToDb();
    const productsCollection = db.collection('products');
    
    const productsFromDb = await productsCollection.find({}).toArray();
    
    return NextResponse.json(productsFromDb);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST /api/products - Add products to database (for seeding)
export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDb();
    const productsCollection = db.collection('products');
    
    // Clear existing products
    await productsCollection.deleteMany({});
    
    // Insert all products from product-data.ts
    const result = await productsCollection.insertMany(products);
    
    return NextResponse.json({
      message: `Successfully added ${result.insertedCount} products to database`,
      insertedCount: result.insertedCount
    });
  } catch (error) {
    console.error('Error adding products:', error);
    return NextResponse.json(
      { error: 'Failed to add products' },
      { status: 500 }
    );
  }
}