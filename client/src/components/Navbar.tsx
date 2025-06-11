import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'

const Navbar = () => {
    return (
        <div className='bg-white/20 w-full backdrop-blur-sm fixed flex justify-between px-20 py-5'>
            <Link
                href="/"
            >
                <Image 
                    src="/Logo.png"
                    alt="Logo"
                    width={100}
                    height={60}
                />
            </Link>
            <div className='flex items-center gap-5'>
                <Link
                    href='/login'
                >
                    Login
                </Link>
                <Link
                    href='/signup'
                    className='bg-[#6C5CE7] py-3 px-5 rounded-[8px] text-white text-sm' 
                >
                    Create Account
                </Link>
            </div>
        </div>
    )
}

export default Navbar