/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { BadgeCheck, ChevronDown, LayoutDashboard, LogOut, Mail, User } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '@/app/context/AuthContext';

const Navbar = () => {
    const [user, setUser] = useState<any>(null);
    console.log(user)
    const [menu, setMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const { authUser } = useAuth();
    console.log(authUser?.userRole)

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
        <div className='bg-white/20 w-full backdrop-blur-sm fixed z-50 flex justify-between px-20 py-5'>
            <Link href='/'>
                <Image src='/Logo.png' alt='Logo' width={100} height={60} />
            </Link>

            <div className='flex items-center gap-5'>
                {user ? (
                    <div 
                        className='relative'
                        ref={menuRef}
                    >
                        <div 
                            className='flex items-center gap-2 cursor-pointer text-sm text-black font-medium'
                            onClick={() => setMenu(!menu)}
                        >
                            <div>
                                <Image 
                                    src='/user.png'
                                    alt="user image"
                                    width={30}
                                    height={30}
                                    className='rounded-full'
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
                                    className='absolute right-0 bg-white rounded-lg shadow-md p-3 z-50 min-w-48'
                                >
                                    <div className='flex items-center gap-1 text-sm'>
                                        <User className='p-1'/>
                                        <p>{user?.user?.name}</p>
                                    </div>
                                    {authUser?.userRole === "principal" ? (
                                        <>
                                            <div className='flex items-center gap-1 text-sm'>
                                                <Mail className='p-1'/>
                                                <p>{user?.user?.email}</p>
                                            </div>
                                            <Link 
                                                href='/principal/dashboard'
                                                className='flex items-center gap-1 text-sm'
                                            >
                                                <LayoutDashboard className='p-1'/>
                                                <p>Dashboard</p>
                                            </Link>
                                        </>
                                    ) : (
                                        <>
                                            <div className='flex items-center gap-1 text-sm'>
                                                <BadgeCheck className='p-1'/>
                                                <p>{user?.user?.teacherId}</p>
                                            </div>
                                            <Link 
                                                href='/teacher/dashboard'
                                                className='flex items-center gap-1 text-sm'
                                            >
                                                <LayoutDashboard className='p-1'/>
                                                <p>Dashboard</p>
                                            </Link>
                                        </>
                                    )}
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
                ) : (
                    <>
                        <Link href='/login'>Login</Link>
                        <Link
                            href='/signup'
                            className='bg-[#6C5CE7] py-3 px-5 rounded-[8px] text-white text-sm'
                        >
                            Create Account
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;