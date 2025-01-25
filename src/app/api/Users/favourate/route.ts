import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        console.log(reqBody)
    } catch (error: any) {
        NextResponse.json({error: error.message}, {status: 500})
    }
}