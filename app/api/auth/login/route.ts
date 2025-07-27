import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectToDb } from '../../db';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        // Validation
        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 }
            );
        }

        const { db } = await connectToDb();

        // Find user by email
        const user = await db.collection('users').findOne({ email });
        if (!user) {
            return NextResponse.json(
                { error: 'Invalid email or password' },
                { status: 401 }
            );
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json(
                { error: 'Invalid email or password' },
                { status: 401 }
            );
        }

        // Generate JWT token
        const token = jwt.sign(
            { 
                userId: user._id.toString(),
                email: user.email,
                name: user.name
            },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        // Return user data without password
        const { password: _, ...userWithoutPassword } = user;

        const response = NextResponse.json(
            { 
                message: 'Login successful',
                user: userWithoutPassword,
                token
            },
            { status: 200 }
        );

        // Set HTTP-only cookie
        response.cookies.set('auth-token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 // 7 days
        });

        return response;

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
} 