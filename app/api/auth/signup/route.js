import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/userModel";
import { hashPassword } from "@/middleware/passwordMiddleware";
import { generateToken } from "@/middleware/JwtMiddleware";

const bgColors = [
  "#EF4444", // red-500
  "#D97706", // amber-600
  "#059669", // emerald-600
  "#3B82F6", // blue-500
  "#8B5CF6", // violet-500
  "#EC4899", // pink-500
  "#0F766E", // teal-600
  "#EA580C", // orange-600
  "#6366F1", // indigo-500
  "#0284C7"  // sky-600
];

const getRandomColor=()=>{
    const randomIndex = Math.floor(Math.random() * bgColors.length);
    return bgColors[randomIndex];
}

async function RegisterUserData(username,password) {
    await connectDB();
    const existUser=await User.findOne({username});
    if(existUser)
        return {data:{message:"User already exists!"},status:401};
    const hash=await hashPassword(password);
    const newUser=await User({username,password:hash,color:getRandomColor()}).save();
    const payload={username,_id:newUser._id,color:newUser.color};
    const token=generateToken(payload);
    return {data:{message:"Registered successfully!",token},status:201};
}



export async function POST(req) {
    try {
        const {username,password}=await req.json();
        if(!username || !password)
            return NextResponse.json({message:"Missing data"},{status:400});
        const {data,status}=await RegisterUserData(username,password);
        return NextResponse.json(data,{status});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:"Internal server error"},{status:500});
    }
}