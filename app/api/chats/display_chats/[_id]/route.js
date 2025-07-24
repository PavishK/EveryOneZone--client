import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/userModel";
import Chats from "@/models/chatModel";

async function GetChats(_id) {
    await connectDB();
    const verifyUser=await User.findById(_id);
    if(!verifyUser)
        return {data:{message:"Invalid user. Access blocked!"},status:401};
    const chatHistory=await Chats.find();
    return {data:{message:"Chats fetched!",chats:chatHistory},status:200};
}

export async function GET(req,{params}) {
    try {
        const {_id}=await params;
        if(!_id)
            return NextResponse.json({message:"Missing data"},{status:400});
        const {data,status}=await GetChats(_id);
        return NextResponse.json(data,{status});
    } catch (error) {
        return NextResponse.json({message:"Invalid user. Access blocked!"},{status:403});
    }
}