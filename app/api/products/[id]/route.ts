import { NextRequest, NextResponse } from 'next/server';
import { connectToDb } from '../../db';

// GET /api/products/[id] - Fetch a single product by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { db } = await connectToDb();
    const productsCollection = db.collection('products');
    
    const product = await productsCollection.findOne({ id: params.id });
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

