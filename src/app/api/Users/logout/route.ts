import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers'

export async function GET(req: NextRequest){
    try {
        
        const token = await req.cookies.get("token");
        if (!token) {
            return NextResponse.json({error: "No token found"}, {status: 401})
        }
        await req.cookies.clear()
        return NextResponse.json({message: "Logged out successfully"}, {status: 200})
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}