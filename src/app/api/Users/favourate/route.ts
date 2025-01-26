import User from "@/Modules/userModule";
import {connect} from "@/dbConnection/dbConnection";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
    try {
        await connect();
        const reqBody = await request.json()
        console.log(reqBody);
        
        const {email, title, id , genre, action} = reqBody
        const user = await User.findOne({email: email})
        if (!user) {
            return NextResponse.json({error: "User not found"}, {status: 404})
        }
        if (user.favourate.map((item: any) => item.id).includes(id)){
            return NextResponse.json({error: "User already favourited"}, {status: 400})
        }
        if(action === 'add'){
        await user.favourate.push({name: title, id: id, genre: {id: genre.id, name: genre.name}})
        
        await user.save()
        return NextResponse.json({message: "Favourited successfully"}, {status: 200})
        }
        if (action === 'remove'){
            await user.favourate.filter((item:any) => item.id !== id)
            await user.save()
        }        

    } catch (error: any) {
        NextResponse.json({error: error.message}, {status: 500})
    }
}