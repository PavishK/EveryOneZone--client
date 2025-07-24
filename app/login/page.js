"use client";

import { Lock, LogIn, User2 } from "lucide-react";
import { useState } from "react";
import {toast} from 'react-hot-toast';
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import { setToken } from "@/services/store";
import axios from "axios";

export default function Login() {
    
    const router=useRouter();
    const [loginData,setLoginData]=useState({username:"",password:""});
    const [makeLoading,setMakeLoading]=useState(false);
    const [visible,setVisible]=useState(false);

    const onInputChange=(e)=>{
        setLoginData({...loginData,[e.target.name]:e.target.value});
    }

    const loginHandler=async(data)=>{
        try {
            const res=await axios.post("/api/auth/login",data);
            toast.success(res.data?.message);
            setToken(res.data.token);
            router.replace("/chat_room");
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message);
        }
    }

    const onSubmitBtnClicked=async(e)=>{
        e.preventDefault();
        setMakeLoading(true);
        try {
            if(loginData.username.trim()=="" || loginData.password.trim()==""){
            toast.error("Please fill out the fields.");
            return;
        }
        await loginHandler(loginData);
        } catch (error) {
            toast.error("Server error please try again.");
        } finally {
            setMakeLoading(false);
        }
    }

    return (
        <div className="flex items-center justify-center flex-col gap-y-6">
            <h1 className="text-2xl font-semibold">Welcome back.</h1>
            <form className="flex items-start justify-normal flex-col gap-y-1"
            onSubmit={onSubmitBtnClicked}
            >
                <div className="flex items-center justify-normal gap-x-1.5 bg-black/80 p-1 rounded-lg">
                    <User2 size={28} className="text-white"/>
                    <input type="text" name="username" value={loginData.username || ""} autoComplete="username" onChange={onInputChange} className="text-xl px-1 bg-white focus:outline-0 rounded-s-sm"/>
                </div>

                <div className="flex mt-3 items-center justify-normal gap-x-1.5 bg-black/80 p-1 rounded-lg">
                    <Lock size={28} className="text-white"/>
                    <input type={visible?"text":"password"} name="password" autoComplete="current-password" value={loginData.password || ""} onChange={onInputChange} className="text-xl px-1 bg-white focus:outline-0 rounded-s-sm"/>
                </div>
                <div className="p-1 flex items-center justify-normal gap-x-1">
                    <input type="checkbox" className="scale-110 accent-black" onChange={(e)=>setVisible(e.target.checked)}/>
                    <span>Show password</span>
                </div>
                <button className="mt-1 w-full bg-black/80 flex gap-x-1 text-white items-center justify-center rounded-lg font-semibold text-xl p-1">
                <LogIn/> 
                Login</button>
            </form>
            {makeLoading && <Loading/>}
        </div>
    );
}