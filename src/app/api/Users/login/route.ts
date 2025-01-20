import User from '@/Modules/userModule'
import {connect} from '@/dbConnection/dbConnection'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function POST(request: NextRequest){
try {
    await connect();

    const reqBody = await request.json();
    const {email, password, remember} = reqBody;

    //check if user exists
    const user = await User.findOne({email})

    if (!user){
        return NextResponse.json({error: "User does not exist"}, {status: 400})

    }
    if (remember){
        user.remember = true;
        await user.save()
    }
   const Password = await bcrypt.compare(password, user.password)

   if (!Password){
    return NextResponse.json({error: "Invalid password"}, {status: 400})
   }
   if(user.role === 'user'){
    return NextResponse.json({error: "User is not authorized"}, {status: 403})
   }

   const tokenData = {
    id: user._id,
    username: user.username,
    email: user.email
}

//create token
const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "30d"})

const response = NextResponse.json({
    message: "Login successful",
    success: true,
})
response.cookies.set("token", token, {
    httpOnly: true, 
    secure: true,
    
})
// return response;
if(user.isAdmin){
    const tokenData = {
        verified: user.isAdmin
    }
    const isVerifiedAdmin = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: user.remember ? "30d" : "1d"})
    response.cookies.set("IsAdmin", isVerifiedAdmin, {
        httpOnly: true, 
        secure: true,
        
    })
}
user.remember = false;
await user.save()
return response;


} catch (error: any) {
return NextResponse.json({error: error.message}, {status: 500})
}
}