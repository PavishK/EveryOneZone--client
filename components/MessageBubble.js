"use client";

import { convertJP } from "./katakanaMap";
import { useEffect, useState } from "react";

export default function MessageBubble({ messageData, currentUser, index }) {

  const [MotionDiv,setMotionDiv]=useState();

  useEffect(()=>{
    import('framer-motion').then((mod)=>
    setMotionDiv(mod.motion.div));
  },[]);

  if(!MotionDiv) return null;

  if (!messageData || !messageData.username || !messageData.text || !messageData.color) {
    return null; // or a fallback UI
  }
  const isCurrentUser = currentUser === messageData.username;

  return (
    <MotionDiv
      initial={{opacity:0}}
      animate={{opacity:1}}
      transition={{duration:(0.2*index)%0.5}}
      className={`flex items-start space-x-4 space-y-4 ${
        isCurrentUser ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <div className="flex flex-col items-center">
        <div
          className={`w-12 h-12 text-2xl font-bold rounded-md flex items-center justify-center border-2 border-white text-white ${
            isCurrentUser ? "ml-4" : "mr-0"
          }`}
          style={{ backgroundColor: messageData.color }}
        >
          {convertJP(messageData.username)}
        </div>
        <p className="text-white font-semibold w-12 text-xs self-end text-center text-ellipsis overflow-hidden">
          {messageData.username}
        </p>
      </div>

      <div className="relative">
        <svg
          className={`absolute w-4 h-5 ${
            isCurrentUser ? "right-[-9px] bottom-2 rotate-90" : "left-[-9px] top-2"
          }`}
          viewBox="0 0 16 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d={isCurrentUser ? "M0 0C9 4 10 10 16 20H0V0Z" : "M16 0C7 4 6 10 0 20H16V0Z"}
            fill={messageData.color}
          />
        </svg>
        <div
          className="text-white px-4 py-2 rounded-2xl relative z-10 max-w-sm w-fit"
          style={{ backgroundColor: messageData.color }}
        >
          {messageData.text}
        </div>
      </div>
    </MotionDiv>
  );
}