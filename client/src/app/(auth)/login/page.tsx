/* eslint-disable @next/next/no-img-element */
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
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useAuth } from '@/app/context/AuthContext';
import Image from 'next/image';
import { toast } from "sonner";

const Page = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [teacherFormData, setTeacherFormData] = useState({
        teacherId: '',
        password: ''
    })
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { setAuthUser } = useAuth();

    const togglePasswordVisibility = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setPasswordVisible(!passwordVisible);
    }

    const isValidEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleLogin = async () => {
        if (!formData.email || !formData.password) {
            toast.error('Please fill in all fields.');
            return;
        }

        if (!isValidEmail(formData.email)) {
            toast.error("Please enter a valid email address.");
            return;
        }

        try {
            setLoading(true);

            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, formData);

            // Save token in localStorage or cookie
            localStorage.setItem('loginToken', response.data.token);
            localStorage.setItem(
                'userInfo',
                JSON.stringify({
                    user: {
                        name: response.data.user.name,
                        email: response.data.user.email,
                        schoolName: response.data.user.schoolName,
                        schoolLocation: response.data.user.schoolLocation,
                    },
                    userRole: response.data.user.userRole,
                })
            );

            // Set authUser
            setAuthUser({
                userInfo: {
                    name: response.data.user.name,
                    email: response.data.user.email,
                    schoolName: response.data.user.schoolName,
                    schoolLocation: response.data.user.schoolLocation,
                },
                userRole: response.data.user.userRole,
            });

            toast.success('Login successful!');
            setTimeout(() => {
                router.push('/');
            }, 2000);

            setLoading(false);

        } catch (err: any) {
            toast.error(err?.response?.data?.message || 'Login failed. Try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleTeacherLogin = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (!teacherFormData.teacherId || !teacherFormData.password) {
            toast.error('Please fill in all fields');
            return;
        }
        
        try {
            setLoading(true);

            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/teacher/login`, teacherFormData);

            localStorage.setItem('loginToken', response.data.token);
            localStorage.setItem(
                'userInfo',
                JSON.stringify({
                    user: {
                        name: response.data.teacher.name,
                        teacherId: response.data.teacher.teacherId,
                    },
                    userRole: response.data.teacher.userRole,
                })
            );
            console.log(response);

            setAuthUser({
                userInfo: {
                    name: response.data.teacher.name,
                    teacherId: response.data.teacher.teacherId,
                },
                userRole: response.data.teacher.userRole,
            });

            toast.success('Login successful!');
            setTimeout(() => {
                router.push('/');
            }, 2000);
        } catch (err: any) {
            toast.error(err?.response?.data?.message || 'Login failed. Try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='w-full h-full'>
            <div className='bg-white/20 w-full backdrop-blur-sm fixed z-50 flex justify-between px-20 py-5'>
                <Link href="/">
                    <Image src='/Logo.png' alt='Logo' width={100} height={60} />
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
                            <Card className='relative w-[35rem] min-h-[35rem] flex items-center justify-center'>
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
                                            <Input 
                                                id="email" 
                                                placeholder="Enter your email" 
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                                            onClick={handleLogin}
                                            disabled={loading}
                                        >
                                            {loading ? 'Loging in...' : 'Log in'}
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
                                    <img 
                                        src='/hero2.jpg'
                                        alt="Signup Banner"
                                        className='object-cover absolute top-0 left-0 w-full h-full'
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
                                            <Input 
                                                id="teacherId" 
                                                placeholder="Enter your teacher id" 
                                                value={teacherFormData.teacherId}
                                                onChange={(e) =>
                                                    setTeacherFormData({ ...teacherFormData, teacherId: e.target.value })
                                                }
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="password">Password</Label>
                                            <div className='relative'>
                                                <Input 
                                                    type={passwordVisible ? 'text' : 'password'} 
                                                    id="password"
                                                    placeholder='Enter your password'
                                                    value={teacherFormData.password}
                                                    onChange={(e) =>
                                                        setTeacherFormData({ ...teacherFormData, password: e.target.value })
                                                    }
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
                                            onClick={handleTeacherLogin}
                                            disabled={loading}
                                            className='w-full cursor-pointer bg-[#6C5CE7] hover:bg-[#6C5CE7]/80 transition-all duration-300 ease-in-out py-5'
                                        >
                                            {loading ? 'Loging in...' : 'Log in'}
                                        </Button>
                                    </CardFooter>
                                </div>
                            </Card>
                            <div className='relative w-[35rem] overflow-hidden rounded-3xl'>
                                <div className='h-full'>
                                    <img 
                                        src='/hero2.jpg'
                                        alt="Login Banner"
                                        className='object-cover absolute top-0 left-0 w-full h-full'
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