"use client";

import Loading from "@/components/Loading";
import axios from "axios";
import { Lock, LockKeyhole, Pencil, User2 } from "lucide-react";
import { useState } from "react";
import {toast} from 'react-hot-toast';
import { setToken } from "@/services/store";
import { useRouter } from "next/navigation";

export default function Signup() {

    const router=useRouter();
    const [signupData,setSignupData]=useState({username:"",password:"",confirm_password:""});
    const [visible,setVisible]=useState(false);
    const [makeLoading,setMakeLoading]=useState(false);

    const onInputChange=(e)=>{
        setSignupData({...signupData,[e.target.name]:e.target.value});
    }

    const registerHandler=async({username,password})=>{
        setMakeLoading(true);
        try {
            const res=await axios.post("/api/auth/signup",{username,password});
            setToken(res.data.token);
            toast.success(res.data?.message);
            router.replace("/chat_room");
        } catch (error) {
            toast.error(error.response?.data?.message);
        } finally {
            setMakeLoading(false);
        }
    }

    const onSubmitBtnClicked=(e)=>{
        e.preventDefault();
        
        if(signupData.username.trim()=="" || signupData.password.trim()=="" || signupData.confirm_password.trim()==""){
            toast.error("Please fill out fields.");
            return;
        }
        else if(!/^[a-zA-Z][a-zA-Z0-9]{5,}$/.test(signupData.username)){
            toast.error("Invalid username. Eg: eoz2991.");
            return;
        }
        else if(signupData.password.length<6 || signupData.password.length>15){
            toast.error("Password length should between 6 and 15.");
            return;
        }
        else if(signupData.password!==signupData.confirm_password){
            toast.error("Password not matching.");
            return;
        }
        registerHandler(signupData); 
    }

    return (
        <div className="flex items-center justify-center flex-col gap-y-6">
            <h1 className="text-2xl font-semibold">Create an account.</h1>
            <form className="flex items-start justify-normal flex-col gap-y-1"
            onSubmit={onSubmitBtnClicked}
            >
                <div className="flex items-center justify-normal gap-x-1.5 bg-black/80 p-1 rounded-lg">
                    <User2 size={28} className="text-white"/>
                    <input type="text" name="username" value={signupData.username} placeholder=" Ex.EoZ2991" autoComplete="username" onChange={onInputChange} className="text-xl px-1 bg-white focus:outline-0 rounded-s-sm"/>
                </div>

                <div className="flex mt-3 items-center justify-normal gap-x-1.5 bg-black/80 p-1 rounded-lg">
                    <Lock size={28} className="text-white"/>
                    <input type={visible?"text":"password"} name="password" autoComplete="current-password" value={signupData.password} onChange={onInputChange} className="text-xl px-1 bg-white focus:outline-0 rounded-s-sm"/>
                </div>

                <div className="flex mt-3 items-center justify-normal gap-x-1.5 bg-black/80 p-1 rounded-lg">
                    <LockKeyhole size={28} className="text-white"/>
                    <input type={visible?"text":"password"} name="confirm_password" autoComplete="current-password" value={signupData.confirm_password} onChange={onInputChange} className="text-xl px-1 bg-white focus:outline-0 rounded-s-sm"/>
                </div>

                <div className="p-1 flex items-center justify-normal gap-x-1">
                    <input type="checkbox" className="scale-110 accent-black" onChange={(e)=>setVisible(e.target.checked)}/>
                    <span>Show password</span>
                </div>
                <button className="mt-1 w-full bg-black/80 flex gap-x-1 text-white items-center justify-center rounded-lg font-semibold text-xl p-1">
                <Pencil/> 
                Register</button>
            </form>
            {makeLoading && <Loading/>}
        </div>
    );
}