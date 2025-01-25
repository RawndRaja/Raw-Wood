import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
export default async function GET(request: NextRequest){
    try {
        const token = request.cookies.get("token")?.value || '';
        if (!token) {
          return NextResponse.json({error: "Token not found"}, {status: 401})
        }
        const tokenData = jwt.verify(token, process.env.TOKEN_SECRET!);
        if (!tokenData) {
          return NextResponse.json({error: "Invalid token"}, {status: 401})
        }
        if (typeof tokenData === 'object' && 'id' in tokenData) {
          return NextResponse.json({id: tokenData.id})
        } else {
          return NextResponse.json({error: "Invalid token data"}, {status: 401})
        }
      } catch (error: any) {
        console.error(error);
        return NextResponse.json({error: "Internal Server Error"}, {status: 500})
      }
}