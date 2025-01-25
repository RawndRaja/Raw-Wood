import { getDataFromToken } from "@/helper/getTokenData";

import { NextRequest, NextResponse } from "next/server";
import User from "@/Modules/userModule";
import { connect } from "@/dbConnection/dbConnection";

connect();

export async function GET(request:NextRequest){

    try {
        await connect();
        const userId = await getDataFromToken(request);
        const user = await User.findOne({_id: userId}).select("-password");
        return NextResponse.json({
            mesaaage: "User found",
            data: user
        })
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }

}