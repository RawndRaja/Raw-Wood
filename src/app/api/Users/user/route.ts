import { connect } from "@/dbConnection/dbConnection";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from '@/helper/getTokenData'
import User from "@/Modules/userModule";
export async function GET(request: NextRequest){
    try {
        await connect();
        const id = getDataFromToken(request);
        const user = await User.findOne({_id: id}).select("-password");
        if (!user) {
          return NextResponse.json({error: "User  not found"}, {status: 404})
        }
        return NextResponse.json({
          message: "User found",
          user
        })
      } catch (error: any) {
        console.error(error);
        return NextResponse.json({error: "Internal Server Error"}, {status: 400})
      }
}