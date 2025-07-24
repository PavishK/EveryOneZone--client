"use client";

import { clearToken } from '@/services/store';
import { Link, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {toast} from 'react-hot-toast';

export default function NavBar({isLoggedIn}) {
    
    const router=useRouter();

    const onClickLink=()=>{
    window.open("https://personal-portfolio-rdxc.onrender.com", "_blank", "width=900,height=800")
    }

    const onCliclLogOut=()=>{
        clearToken();
        toast.success("Logout successfull!");
        router.replace('/');
    }
    
    return (
        <nav className='w-full p-6 bg-white'>
            <ul className='w-full flex items-center justify-between'>
                <li className='sm:text-3xl text-2xl font-semibold bg-gradient-to-r from-black via-gray-300 to-gray-500 bg-clip-text text-transparent'>
                EveryOneZone
                </li>
                <li className='flex items-center justify-normal sm:gap-x-7.5 gap-x-4.5'>
                <Link size={23} onClick={onClickLink} className='cursor-pointer text-gray-400'/>
                {isLoggedIn &&
                <div className='relative group'>
                 <LogOut size={23} className='cursor-pointer text-gray-400 ' onClick={onCliclLogOut}/>
                 <p className='absolute -left-4 top-8 hidden group-hover:block'>Logout</p>
                </div>}
                </li>
            </ul>
        </nav>
    );
}