"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from 'react-hot-toast';
import axios from "axios";
import { getToken, clearToken } from "@/services/store";
import { io } from 'socket.io-client';
import NavBar from "@/components/NavBar";
import MessageBubble from "@/components/MessageBubble";
import { UserMinusIcon, UserPlusIcon } from "lucide-react";
import '../globals.css';

export default function Chat_Room() {
  const router = useRouter();
  const [userData, setUserData] = useState({});
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const [MotionDiv, setMotionDiv] = useState();
  const messagesEndRef = useRef(null);

  // ✅ Avoid multiple socket instances
  const socketRef = useRef(null);

  const SAPI=process.env.NEXT_PUBLIC_SERVER_API;

  const chatHistory = async (id) => {
    try {
      const res = await axios.get(`/api/chats/display_chats/${id}`);
      setChats(res.data?.chats || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching chat history");
      router.push("/");
    }
  };

  const sessionCheck = async (token) => {
    try {
      const res = await axios.post("/api/session_check", { token });
      setUserData(res.data?.data || {});
      chatHistory(res.data?.data._id);
    } catch (error) {
      toast.error(error.response?.data?.message || "Session expired");
      clearToken();
      router.push("/");
    }
  };

  useEffect(() => {
    const token = getToken();
    if (token) {
      sessionCheck(token);
    } else {
      toast.error("Please login to continue");
      router.push("/");
    }
  }, []);

  useEffect(() => {

  if (userData?.username) {
    socketRef.current = io(SAPI, {
      autoConnect: true,
      transports: ['websocket']
    });

    socketRef.current.emit('setUsername', userData.username);

    socketRef.current.on('chatMessage', (newMessage) => {
      setChats((prevChats) => [...prevChats, newMessage]);
    });

    // ✅ Toast when a user connects (excluding yourself)
    socketRef.current.on('user-connected', (username) => {
      if (username !== userData.username) {
        toast(`-- ${username} joined the chat --`,{
                style:{
                    background:'#16a34a',
                    color:"#fff"
                },
                duration:3000,
            });
      }
    });

    // ✅ Toast when a user disconnects
    socketRef.current.on('user-disconnected', (username) => {
      if (username !== userData.username) {
          toast(`-- ${username} left the chat --`,{
            style:{
                background:'#dc2626',
                color:"#fff"
            },
            duration:3000,
        });
      }
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }
}, [userData]);


  useEffect(() => {
    import('framer-motion').then((mod) => {
      setMotionDiv(() => mod.motion.div);
    });
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats]);

  const sendMessage = () => {
    if (message.trim() === "") {
      toast.error("Message cannot be empty");
      return;
    }

    const newMessage = {
      text: message,
      username: userData.username,
      color: userData.color
    };

    socketRef.current?.emit('chatMessage', newMessage);
    setMessage("");
  };

  if (!MotionDiv) return null;

  return (
    <>
      <NavBar isLoggedIn={true} />
      <div className="w-full bg-black/60 text-white p-2 flex items-center gap-x-4">
        <textarea
          name="message"
          value={message}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          onChange={(e) => setMessage(e.target.value)}
          className="bg-white text-black text-lg px-2 rounded-lg focus:outline-none resize-none w-full h-20"
          placeholder="Write something..."
        />
        <button
          onClick={sendMessage}
          className="text-xl font-semibold bg-black p-2 rounded-lg cursor-pointer"
        >
          Send
        </button>
      </div>
      <div className="w-full h-[78.5vh] bg-black/70 py-4 overflow-auto custom-scrollbar">
        {chats.map((chat, i) => (
          <MotionDiv
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="px-4"
          >
            <MessageBubble 
              messageData={chat} 
              index={i} 
              currentUser={userData.username}
            />
          </MotionDiv>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </>
  );
}
