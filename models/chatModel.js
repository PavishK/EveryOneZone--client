import mongoose from "mongoose";

const Chat= new mongoose.Schema(
    {
        text:{
            type:String,
            require:true,
        },
        username:{
            type:String,
            require:true,
        },
        color:{
            type:String,
            default:'yellow',
        },
        created_at:{
            type:Date,
            default:Date.now,
            expires:259200,
        },
    });

    export default mongoose.models.chats || mongoose.model("chats",Chat);