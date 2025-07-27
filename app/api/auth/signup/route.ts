import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDb } from '../../db';

export async function POST(request: NextRequest) {
    try {
        const { name, email, password } = await request.json();

        // Validation
        if (!name || !email || !password) {
            return NextResponse.json(
                { error: 'Name, email, and password are required' },
                { status: 400 }
            );
        }

        if (password.length < 6) {
            return NextResponse.json(
                { error: 'Password must be at least 6 characters long' },
                { status: 400 }
            );
        }

        const { db } = await connectToDb();

        // Check if user already exists
        const existingUser = await db.collection('users').findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { error: 'User with this email already exists' },
                { status: 409 }
            );
        }

        // Hash password
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create user
        const user = {
            name,
            email,
            password: hashedPassword,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const result = await db.collection('users').insertOne(user);

        // Return user data without password
        const { password: _, ...userWithoutPassword } = user;

        return NextResponse.json(
            { 
                message: 'User created successfully',
                user: { ...userWithoutPassword, _id: result.insertedId }
            },
            { status: 201 }
        );

    } catch (error) {
        console.error('Signup error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
} 