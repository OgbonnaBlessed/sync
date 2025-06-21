/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, LogOut, Mail, User, Search, Bell, Home } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const Header = () => {
    const [user, setUser] = useState<any>(null);
    const [menu, setMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const storedUser = localStorage.getItem('userInfo');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        setMenu(false);
        localStorage.removeItem('loginToken');
        localStorage.removeItem('userInfo');
        setUser(null);
    };
    
    useEffect(() => {
        const handleOutsideClick = (event: { target: any; }) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenu(false);
            }
        }

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    return (
        <div className='flex items-center justify-between gap-48'>
            <div className='flex items-center gap-2 bg-gray-200 rounded-lg px-3 py-1 h-12 flex-1'>
                <Search className='p-1'/>
                <input 
                    type='text'
                    placeholder='Search'
                    className='outline-none focus:ring-0 w-full'
                />
            </div>

            <div className='flex items-center gap-3'>
                <div className='relative'>
                    <Bell className='p-1' fill='#000'/>
                    <span className='absolute w-1.5 h-1.5 bg-red-500 top-0 right-1 rounded-full'></span>
                </div>
                <div className='flex items-center gap-5'>
                    <div 
                        className='relative'
                        ref={menuRef}
                    >
                        <div 
                            className='flex items-center gap-2 cursor-pointer text-sm text-black font-medium'
                            onClick={() => setMenu(!menu)}
                        >
                            <div>
                                <img 
                                    src='/user.png'
                                    alt="user image"
                                    className='rounded-full w-[30px] h-[30px]'
                                />
                            </div>
                            <ChevronDown className='w-4 h-4' />
                        </div>
                        <AnimatePresence mode="popLayout">
                            {menu && (
                                <motion.div 
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className='absolute right-0 top-10 bg-white rounded-lg shadow-md p-3 z-50 min-w-48'
                                >
                                    <div className='flex items-center gap-1 text-sm'>
                                        <User className='p-1'/>
                                        <p>{user?.user?.name}</p>
                                    </div>
                                    <div className='flex items-center gap-1 text-sm'>
                                        <Mail className='p-1'/>
                                        <p>{user?.user?.email}</p>
                                    </div>
                                    <Link 
                                        href='/'
                                        className='flex items-center gap-1 text-sm'
                                    >
                                        <Home className='p-1'/>
                                        <p>Home</p>
                                    </Link>
                                    <button 
                                        onClick={handleLogout}
                                        className='flex items-center gap-1 text-red-600 text-sm mt-2 hover:underline cursor-pointer'
                                    >
                                        <LogOut className='p-1' />
                                        Logout
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header