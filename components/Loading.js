"use client";

import Image from "next/image";
import { useEffect, useState } from 'react';

export default function Loading() {
    const [MotionDiv,setMotionDiv]=useState();

    useEffect(()=>{
        import('framer-motion').then((mod)=>
        setMotionDiv(mod.motion.div));
    },[]);

    if(!MotionDiv) return null;

    return (
        <MotionDiv
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{duration:0.4}}
        className="fixed z-[9999] flex items-center justify-center flex-col gap-y-0.5 w-screen h-screen bg-black/80">
            <Image draggable={false} unoptimized src={"/Images/loading.gif"} width={60} height={60} alt="EveryOneZone Initilizing..."/>
            <p className="text-xl text-gray-300 text-center font-semibold animate-pulse">Loading...</p>
        </MotionDiv>
    );
}