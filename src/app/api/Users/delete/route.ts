import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConnection/dbConnection" 
import User from "@/Modules/userModule";
import bcrypt from 'bcryptjs';
export async function POST( request: NextRequest ){
    try {
        await connect();
        const reqData = await request.json();
        const {email, id , password} = reqData;
        // check if user exists
        const user = await User.findOne({email: email, _id: id});
        const comparePassword  = await bcrypt.compare(password, user.password);
        const status = user.status;

        if (!user){

            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }
        if (!comparePassword){
            return NextResponse.json({error: "Password is incorrect"}, {status: 400})
        }
        if ( status === 'deleted'){
            console.log("User has already been deleted")
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }
        // declaring the user to be deleted
        user.status = 'deleted';
        user.Updated_at = Date.now();
        user.username = user.username+" deleted";
        user.email = user.email+" deleted";
        //saving the acc deleted time
        user.Updated_at = Date.now();
        // saving the user to the database
        await user.save();
        return NextResponse.json({
            message: "User deleted successfully", 
            status: 200,
            user
        });

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500}) 
    }
}