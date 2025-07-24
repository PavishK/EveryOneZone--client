import mongoose from "mongoose";

const User= new mongoose.Schema(
    {
        username:{
            require:true,
            type:String,
            unique:true,
        },
        password:{
            require:true,
            type:String,
        },
        color:{
            type:String,
        },
        last_active:{
            type:Date,
            default:Date.now,
            expires:2592000,
        },
        created_at:{
            type:Date,
            default:Date.now,
        },
    }
);

export default mongoose.models.users || mongoose.model('users',User);