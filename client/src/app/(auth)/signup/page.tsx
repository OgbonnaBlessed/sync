/* eslint-disable @typescript-eslint/no-explicit-any */
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
} from "@/components/ui/tabs"
import Image from 'next/image'
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Page = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        schoolName: '',
        schoolLocation: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();

    const togglePasswordVisibility = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setPasswordVisible(!passwordVisible);
    }

    const handleSignup = async () => {
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/api/auth/signup', formData);

            setSuccess('Account created successfully!');
            
            // Optional: Save token if returned
            // localStorage.setItem('token', response.data.token);

            // Redirect to homepage
            router.push('/login');
        } catch (err: any) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('Something went wrong');
            }
        } finally {
            setLoading(false);
        }
    };

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
                    <TabsContent value="principal" className='w-full h-full'>
                        <div className='flex items-stretch justify-between w-full h-full'>
                            <Card className='w-[35rem] min-h-[35rem] flex items-center justify-center'>
                                <div className='flex flex-col gap-5 w-full'>
                                    <CardHeader>
                                        <CardTitle className='text-[28px] leading-tight'>
                                            Register your school and automate collaboration 
                                        </CardTitle>
                                        <CardDescription className='text-[#121212] text-[16px] leading-tight'>
                                            Bring your teachers and parents into perfect sync effortlessly.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="grid gap-6">
                                        <div className="grid gap-2">
                                            <Label htmlFor="name">Name</Label>
                                            <Input 
                                                id="name" 
                                                placeholder="Enter your name" 
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input 
                                                id="email" 
                                                placeholder="Enter your email" 
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="schoolName">School name</Label>
                                            <Input 
                                                id="schoolName" 
                                                placeholder="Enter your school name" 
                                                value={formData.schoolName}
                                                onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="schoolLocation">School Location</Label>
                                            <Input 
                                                id="schoolLocation" 
                                                placeholder="Enter your school location" 
                                                value={formData.schoolLocation}
                                                onChange={(e) => setFormData({ ...formData, schoolLocation: e.target.value })}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="password">Password</Label>
                                            <div className='relative'>
                                                <Input 
                                                    type={passwordVisible ? 'text' : 'password'} 
                                                    id="password"
                                                    placeholder='Enter your password'
                                                    value={formData.password}
                                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
                                        <Button 
                                            className='w-full cursor-pointer bg-[#6C5CE7] hover:bg-[#6C5CE7]/80 transition-all duration-300 ease-in-out py-5'
                                            onClick={handleSignup}
                                            disabled={loading}
                                        >
                                            {loading ? 'Sign up...' : 'Sign up'}
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
                </Tabs>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-600 text-sm">{success}</p>}
        </div>
    )
}

export default Page