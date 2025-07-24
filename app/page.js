"use client";

import Loading from '@/components/Loading';
import {toast} from 'react-hot-toast';
import Login from './login/page';
import Signup from './signup/page';
import { useEffect, useState } from 'react';
import NavBar from '@/components/NavBar';
import { getToken, clearToken } from '@/services/store';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Page() {

  const router=useRouter();
  const [toggeForm,setToggleForm]=useState(!false);
  const [makeLoading,setMakeLoading]=useState(false);

  const Session_Check=async(token)=>{
    setMakeLoading(true);
    try {
      await axios.post("/api/session_check",{token});
      toast.success("Session in use.");
      router.replace("/chat_room");
    } catch (error) {
      if(error.status===401)
        toast.error(error.response.data.message);
      clearToken()
    } finally {
      setMakeLoading(false);
    }
  }

  useEffect(()=>{
    const token=getToken();
    if(token!==null)
      Session_Check(token);

  },[]);


  return (
    <>
      <NavBar isLoggedIn={false}/>
      <div className='w-full h-screen bg-black/70 flex items-center justify-center'>

        <div className='bg-white w-full sm:w-96 h-fit rounded-lg p-4'>
          {toggeForm?(
            <Login/>
          ):(
            <Signup/>
          )}
          
          <div className=' z-[1000] w-full text-center mt-4'>            
          {toggeForm?(
            <p>Don&apos;t have an account? <b className='cursor-pointer hover:underline' onClick={()=>setToggleForm(prev=>!prev)}>register</b></p>
          ):(
            <p>Already have an account? <b className='cursor-pointer hover:underline' onClick={()=>setToggleForm(prev=>!prev)}>login</b></p>
          )}
          </div>
          
        </div>
        {makeLoading && <Loading/>}

      </div>
    </>
  );
}