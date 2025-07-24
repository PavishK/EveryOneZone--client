import db from "@/lib/db";
import { hashPassword } from "@/middleware/passwordMiddleware";
import User from "@/models/userModel";

export async function RegisterUserData(username,password) {
    await db();

    const existUser=await User.findOne({username});
    if(existUser)
        return {data:{message:"User already exists!"},status:400};
    const hash=await hashPassword(password);
    await User.create({username,password:hash});
    return {data:{message:"Registered successfully!"},status:201};
}