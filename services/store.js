"use client";
const key="SldUdG9rZW4=";

export const setToken=(token)=>{
    localStorage.setItem(key,btoa(token));
}

export const getToken=()=>{
    const token=localStorage.getItem(key);
    if(token)
        return atob(token);
    return null;
}

export const clearToken=()=>{
    localStorage.removeItem(key);
}