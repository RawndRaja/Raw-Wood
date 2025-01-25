import User from '@/Modules/userModule';
import { connect } from '@/dbConnection/dbConnection';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
    try {
        await connect();

        const reqBody = await request.json();
        const { email, password, remember } = reqBody;

        // Validate required fields
        if (!email || !password) {
            return NextResponse.json({ error: "Email and password are required", success: false }, { status: 400 });
        }

        // Check if token secret exists
        if (!process.env.TOKEN_SECRET) {
            throw new Error("Token secret is not defined in environment variables");
        }

        // Check if user exists
        const user = await User.findOne({ email: email }); // Using lean() for better performance
        if (!user) {
            return NextResponse.json({ error: "User does not exist", success: false }, { status: 400 });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ error: "Invalid password", success: false }, { status: 400 });
        }

        // Check user role
        if (user.role === 'guest') {
            return NextResponse.json({ error: "User is not authorized", success: false }, { status: 403 });
        }

        // Prepare token payload
        const tokenData = {
            id: user._id,
            role: user.role,
        };

        // Create token with expiration
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
            expiresIn: remember ? '30d' : '1d', // Adjust token expiration based on "remember"
        });

        // Set token as a cookie
        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        });

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: true,
            priority: "high",
            maxAge: 30 * 24 * 60 * 60, // 30 days
            sameSite: "strict", // Or "lax" depending on your needs
        });

        return response;
    } catch (error: any) {
        // Handle errors
        return NextResponse.json({ error: error.message, success: false }, { status: 500 });
    }
}
