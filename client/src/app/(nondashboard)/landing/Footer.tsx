/* eslint-disable @next/next/no-img-element */
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <div className='w-full flex items-center justify-center px-20 py-10'>
            <div className='flex flex-col items-center justify-center gap-20 w-full'>
                <div className='relative max-w-5xl w-full h-80 bg-black rounded-2xl overflow-hidden flex items-center justify-center'>
                    <img 
                        src='/footer.jpg'
                        alt='Footer image'
                        className='object-cover absolute top-0 left-0 w-full h-full'
                    />
                    <div className='absolute flex flex-col items-center gap-4 text-white max-w-xl'>
                        <h1 className='text-[40px] font-semibold'>Experience Sync Now</h1>
                        <p className='max-w-xl text-[28px] text-center'>
                            Take the first step towards seamless collaboration with Sync.
                        </p>
                        <Button className='bg-[#6C5CE7] px-8 py-6 rounded-[8px] text-white text-sm cursor-pointer hover:bg-[#6C5CE7]'>
                            Experience Sync
                        </Button>
                    </div>
                </div>
                <div className='flex items-center justify-between w-full'>
                    <Link
                        href="/"
                    >
                        <img 
                            src="/Logo.png"
                            alt="Logo"
                            className='w-[100px] h-[60px] object-contain'
                        />
                    </Link>
                    <p className='text-[20px]'>
                        © 2025 Sync. All rights reserved
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Footer