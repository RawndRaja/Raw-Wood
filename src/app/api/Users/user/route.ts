import { connect } from "@/dbConnection/dbConnection";
import { NextRequest, NextResponse } from "next/server";
import getToken from '@/helper/getTokenData'
import User from "@/Modules/userModule";
export async function GET(request: NextRequest){
    try {
        await connect();
        const id = getToken(request);
        const user = await User.findOne({_id: id}).select("-password");
        return NextResponse.json({
            message: "User found",
            user
        })
        
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
        
    }
}