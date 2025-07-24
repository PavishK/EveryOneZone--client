import { verifyToken } from "@/middleware/JwtMiddleware";
import { NextResponse } from "next/server";


export async function POST(req) {
    try {
        const {token}=await req.json();
        if(!token)
            return NextResponse.json({message:"Missing token"},{status:400});
        const data=verifyToken(token);

        if(data.expired)
            return NextResponse.json({message:"Session expired. Please log in again."},{status:401});
        return NextResponse.json({message:"Valid session.",data},{status:200});
    } catch (error) {
        return NextResponse.json({message:"Internal server error"},{status:500});
    }
}