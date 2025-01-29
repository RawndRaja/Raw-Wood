import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    try {
        
        const token = await req.cookies.get("token");
        if (!token) {
            return NextResponse.json({error: "No token found"}, {status: 401})
        }
        const response = NextResponse.json({message: "Logged out successfully"}, {status: 200})
        await response.cookies.delete("token");
        return response;
       
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}