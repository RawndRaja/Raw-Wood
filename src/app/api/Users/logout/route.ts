import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    try {
        const token = req.cookies.get('token')
        if (!token) {
            return NextResponse.json({error: "No token found"}, {status: 401})
        }
        req.cookies.delete('token');
        return NextResponse.json({message: "Logged out successfully"}, {status: 200})
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}