import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectToDb } from '../../db';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function GET(request: NextRequest) {
    try {
        // Get token from cookie
        const token = request.cookies.get('auth-token')?.value;

        if (!token) {
            return NextResponse.json(
                { error: 'No token provided' },
                { status: 401 }
            );
        }

        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET) as any;
        
        const { db } = await connectToDb();

        // Get user from database
        const user = await db.collection('users').findOne(
            { _id: new (db as any).constructor.ObjectId(decoded.userId) },
            { projection: { password: 0 } }
        );

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ user });

    } catch (error) {
        console.error('Auth check error:', error);
        return NextResponse.json(
            { error: 'Invalid token' },
            { status: 401 }
        );
    }
} 