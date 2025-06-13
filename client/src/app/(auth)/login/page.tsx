'use client';

import React, { useState } from 'react'
import { Eye, EyeClosed } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Image from 'next/image'
import Link from 'next/link';

const Page = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setPasswordVisible(!passwordVisible);
    }

    return (
        <div className='w-full h-full'>
            <div className='bg-white/20 w-full backdrop-blur-sm fixed z-50 flex justify-between px-20 py-5'>
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
            </div>
            <div className='h-full w-full flex items-center justify-center py-32 px-20'>
                <Tabs defaultValue="principal" className='w-full h-full'>
                    <TabsList>
                        <TabsTrigger value="principal">Principal</TabsTrigger>
                        <TabsTrigger value="teacher">Teacher</TabsTrigger>
                    </TabsList>
                    <TabsContent value="principal" className='w-full h-full'>
                        <div className='flex items-stretch justify-between w-full h-full'>
                            <Card className='w-[35rem] min-h-[35rem] flex items-center justify-center'>
                                <div className='flex flex-col gap-5 w-full'>
                                    <CardHeader>
                                        <CardTitle className='text-[28px] leading-tight'>
                                            Welcome back! Let&lsquo;s keep everything in perfect sync. 
                                        </CardTitle>
                                        <CardDescription className='text-[#121212] text-[16px] leading-tight'>
                                            Your gateway to streamlined communication and effortless collaboration.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="grid gap-6">
                                        <div className="grid gap-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input id="email" placeholder="Enter your email" />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="password">Password</Label>
                                            <div className='relative'>
                                                <Input 
                                                    type={passwordVisible ? 'text' : 'password'} 
                                                    id="password"
                                                    placeholder='Enter your password'
                                                />
                                                <span 
                                                    onClick={togglePasswordVisibility}
                                                    className='cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2'
                                                >
                                                    {passwordVisible ? <EyeClosed className='p-1'/> : <Eye className='p-1'/>}
                                                </span>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter className='flex flex-col items-center w-full gap-5'>
                                        <Button className='w-full cursor-pointer bg-[#6C5CE7] hover:bg-[#6C5CE7]/80 transition-all duration-300 ease-in-out py-5'>
                                            Log in
                                        </Button>
                                        <div className='text-sm flex items-center gap-1'>
                                            <p>Don&lsquo;t have an account?</p>
                                            <Link 
                                                href='/signup'
                                                className='text-[#6C5CE7]'
                                            >
                                                Register
                                            </Link>
                                        </div>
                                    </CardFooter>
                                </div>
                            </Card>
                            <div className='relative w-[35rem] overflow-hidden rounded-3xl'>
                                <div className='h-full'>
                                    <Image 
                                        src='/hero2.jpg'
                                        alt="Signup Banner"
                                        fill
                                        className='object-cover'
                                    />
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="teacher" className='w-full h-full'>
                        <div className='flex items-stretch justify-between w-full h-full'>
                            <Card className='w-[35rem] min-h-[35rem] flex items-center justify-center'>
                                <div className='flex flex-col gap-5 w-full'>
                                    <CardHeader>
                                        <CardTitle className='text-[28px] leading-tight'>
                                            Log in to keep your school in sync. 
                                        </CardTitle>
                                        <CardDescription className='text-[#121212] text-[16px] leading-tight'>
                                            Join your school&lsquo;s hub for seamless collaboration.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="grid gap-6">
                                        <div className="grid gap-2">
                                            <Label htmlFor="email">Teacher id</Label>
                                            <Input id="teacherId" placeholder="Enter your teacher id" />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="password">Password</Label>
                                            <div className='relative'>
                                                <Input 
                                                    type={passwordVisible ? 'text' : 'password'} 
                                                    id="password"
                                                    placeholder='Enter your password'
                                                />
                                                <span 
                                                    onClick={togglePasswordVisibility}
                                                    className='cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2'
                                                >
                                                    {passwordVisible ? <EyeClosed className='p-1'/> : <Eye className='p-1'/>}
                                                </span>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter className='flex flex-col items-center w-full gap-5'>
                                        <Button className='w-full cursor-pointer bg-[#6C5CE7] hover:bg-[#6C5CE7]/80 transition-all duration-300 ease-in-out py-5'>
                                            Log in
                                        </Button>
                                    </CardFooter>
                                </div>
                            </Card>
                            <div className='relative w-[35rem] overflow-hidden rounded-3xl'>
                                <div className='h-full'>
                                    <Image 
                                        src='/hero2.jpg'
                                        alt="Login Banner"
                                        fill
                                        className='object-cover'
                                    />
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

export default Page