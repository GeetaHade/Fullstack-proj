import { NextResponse } from 'next/server';
import { connectToDb } from '../db';
import { products } from '../../product-data';

// POST /api/seed - Seed the database with products
export async function POST() {
  try {
    const { db } = await connectToDb();
    const productsCollection = db.collection('products');
    
    // Clear existing products
    await productsCollection.deleteMany({});
    
    // Insert all products from product-data.ts
    const result = await productsCollection.insertMany(products);
    
    return NextResponse.json({
      message: `Successfully seeded database with ${result.insertedCount} products`,
      insertedCount: result.insertedCount,
      products: result.insertedIds
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json(
      { error: 'Failed to seed database' },
      { status: 500 }
    );
  }
}

// GET /api/seed - Check if database is seeded
export async function GET() {
  try {
    const { db } = await connectToDb();
    const productsCollection = db.collection('products');
    
    const count = await productsCollection.countDocuments();
    
    return NextResponse.json({
      message: `Database contains ${count} products`,
      count: count,
      isSeeded: count > 0
    });
  } catch (error) {
    console.error('Error checking database:', error);
    return NextResponse.json(
      { error: 'Failed to check database' },
      { status: 500 }
    );
  }
} 