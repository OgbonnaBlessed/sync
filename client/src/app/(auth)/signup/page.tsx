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
                <Tabs defaultValue="principal" className='w-full'>
                    <TabsList>
                        <TabsTrigger value="principal">Principal</TabsTrigger>
                        <TabsTrigger value="teacher">Teacher</TabsTrigger>
                    </TabsList>
                    <TabsContent value="principal" className='w-full'>
                        <div className='flex items-stretch justify-between w-full'>
                            <Card className='w-[32rem] h-full'>
                                <CardHeader>
                                    <CardTitle className='text-[20px] leading-tight'>
                                        Register your school and automate collaboration 
                                    </CardTitle>
                                    <CardDescription className='text-[#121212] text-[16px] leading-tight'>
                                        Bring your teachers and parents into perfect sync effortlessly.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="grid gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input id="name" placeholder="Enter your name" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" placeholder="Enter your email" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="schoolName">School name</Label>
                                        <Input id="schoolName" placeholder="Enter your school name" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="schoolLocation">School Location</Label>
                                        <Input id="schoolLocation" placeholder="Enter your school location" />
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
                                        Sign up
                                    </Button>
                                    <div className='text-sm flex items-center gap-1'>
                                        <p>Already have an account?</p>
                                        <Link 
                                            href='/login'
                                            className='text-[#6C5CE7]'
                                        >
                                            Login
                                        </Link>
                                    </div>
                                </CardFooter>
                            </Card>
                            <div className='relative w-[650px] overflow-hidden rounded-3xl'>
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
                    <TabsContent value="teacher">
                        <div className='flex items-stretch gap-10'>
                            <Card className='w-[30rem] h-full'>
                                <CardHeader>
                                    <CardTitle className='text-[20px] leading-tight'>
                                        Register your class and automate collaboration 
                                    </CardTitle>
                                    <CardDescription className='text-[#121212] text-[16px] leading-tight'>
                                        Bring your students and parents into perfect sync effortlessly.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="grid gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input id="name" placeholder="Enter your name" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" placeholder="Enter your email" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="className">Class name</Label>
                                        <Input id="className" placeholder="Enter your class name" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="schoolLocation">School Location</Label>
                                        <Input id="schoolLocation" placeholder="Enter your school location" />
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
                                        Sign up
                                    </Button>
                                    <div className='text-sm flex items-center gap-1'>
                                        <p>Already have an account?</p>
                                        <Link 
                                            href='/login'
                                            className='text-[#6C5CE7]'
                                        >
                                            Login
                                        </Link>
                                    </div>
                                </CardFooter>
                            </Card>
                            <div className='relative w-[600px] overflow-hidden rounded-3xl'>
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
                </Tabs>
            </div>
        </div>
    )
}

export default Page