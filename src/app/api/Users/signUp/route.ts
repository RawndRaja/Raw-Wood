import User from "@/Modules/userModule";
import {connect} from '@/dbConnection/dbConnection'
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import { sendEmail } from "@/helper/sendEmail";

export async function POST(request: NextRequest){
    try {
        await connect();
        const reqbody = await request.json();
        const {username, FullName, email, password} = reqbody;
    
        //check if user exists
        const user = await User.findOne({email: email})
        const userData = await User.findOne({username: username})
    
        if (user){
           return NextResponse.json({error: "User already exists"}, {status: 400})
        }
        if (userData){
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }
        const SaltPassword = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, SaltPassword);



        //create new user
        const newUser = new User({
            username: username,
            Full_Name: FullName,
            email: email,
            password: hashedPassword
        });
    
        const savedUser  = await newUser.save();
        await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });
    
        return NextResponse.json({message: "User created successfully", savedUser}, {status: 201})
        
        
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }

}