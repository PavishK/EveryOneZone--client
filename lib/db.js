import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config({path:'.env.local', quiet:true});

let cached=global.mongoose || {conn:null,promise:null};

async function connectDB() {
    if(cached.conn) return cached.conn;

    if(!cached.promise) cached.promise= (mongoose.connect(process.env.MONGODB_URL)).
    then((mongoose)=>mongoose);

    cached.conn=await cached.promise;
    global.mongoose=cached;

    return cached.conn;
}

export default connectDB;