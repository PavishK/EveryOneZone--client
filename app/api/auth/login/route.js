import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/userModel";
import { verifyPassword } from "@/middleware/passwordMiddleware";
import { generateToken } from "@/middleware/JwtMiddleware";

async function LoginUserData(username,password) {
    await connectDB();
    const verifyUser=await User.findOne({username:username});
    if(verifyUser!=null){
        const payload={username,_id:verifyUser._id,color:verifyUser.color};
        if(await verifyPassword(verifyUser.password,password)){
            const token=generateToken(payload);
            
            await User.findByIdAndUpdate(payload._id,{last_active:Date.now()});

            return {data:{message:"Login successfull",token},status:200};
        }
        return {data:{message:"Invalid password"},status:401};
    }
    return {data:{message:"Invalid username"},status:401};
}

export async function POST(req) {
    try {
        const {username,password}=await req.json();
        if(!username || !password)
            return NextResponse.json({message:"Missing data"},{status:401});
        const {data,status}=await LoginUserData(username,password);
        return NextResponse.json(data,{status});
    } catch (error) {
        return NextResponse.json({message:"Internal server error"},{status:500});
    }
}