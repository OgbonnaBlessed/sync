/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'next/navigation'
import Header from '@/components/Header'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { ChevronDown, Eye, EyeClosed } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnimatePresence, motion } from 'framer-motion'

const TeacherProfilePage = () => {
    const { teacherId } = useParams()
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const detailsRef = useRef<HTMLDivElement>(null);

    const togglePasswordVisibility = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setPasswordVisible(!passwordVisible);
    }

    useEffect(() => {
        const handleOutsideClick = (event: { target: any; }) => {
            if (detailsRef.current && !detailsRef.current.contains(event.target)) {
                setShowDetails(false);
            }
        }

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    return (
        <div className='flex flex-col gap-10 p-8'>
            <Header />

            <div className='flex flex-col gap-4'>
                <h1 className="text-2xl font-semibold">Teacher</h1>
                <p>Showing profile for teacher ID: <strong>{teacherId}</strong></p>

                <div className='flex gap-10 items-start'>
                    <div className='bg-gray-200 p-2 rounded-xl h-96'>
                        <div className='relative w-64 h-40'>
                            <Image 
                                src="/teacher.jpg"
                                alt="Teacher image"
                                fill
                                className='object-cover rounded-xl'
                            />
                        </div>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <div className='flex flex-col gap-1'>
                            <h2 className='font-semibold text-xl'>Akingbade Abidemi Moses</h2>
                            <p className='text-sm text-gray-500'>Male</p>
                        </div>
                        <div>Status: Active since Feb 2021</div>
                        <div>Enrolled classes: 2</div>
                        <div className="grid gap-2 max-w-[15rem]">
                            <Label htmlFor="password" className='text-sm font-semibold'>Password</Label>
                            <div className='relative'>
                                <Input 
                                    type={passwordVisible ? 'text' : 'password'} 
                                    id="password"
                                    placeholder='Enter your password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}

                                />
                                <span 
                                    onClick={togglePasswordVisibility}
                                    className='cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2'
                                >
                                    {passwordVisible ? <EyeClosed className='p-1'/> : <Eye className='p-1'/>}
                                </span>
                            </div>
                        </div>
                        <div className='flex flex-col gap-3 mt-2'>
                            <div ref={detailsRef} className='relative flex flex-col gap-0'>
                                <div 
                                    onClick={() => setShowDetails(!showDetails)} 
                                    className='flex items-center cursor-pointer text-gray-500 text-sm'
                                >
                                    <p>see more details</p>
                                    <ChevronDown className={`p-1 transition-transform duration-500 ${showDetails ? 'transform rotate-180' : ''}`} />
                                </div>
                                    <AnimatePresence mode="popLayout">
                                        {showDetails && (
                                            <motion.div 
                                                key="details"
                                                initial={{ opacity: 0, y: -20 }}
                                                animate={{ opacity: 1, y: 20 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                                className='flex flex-col gap-1 text-sm absolute top-2 left-0 bg-gray-200 rounded-xl p-3'
                                            >
                                                <p><strong>Date of Birth:</strong> 14th June, 1990</p>
                                                <p><strong>Discipline:</strong> Mathematics</p>
                                                <p><strong>Certifications:</strong> Bsc Mathematics, Msc. Mathematics and Computer science</p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                            </div>
                            <Button className='w-full cursor-pointer bg-[#6C5CE7] hover:bg-[#6C5CE7]/80 transition-all duration-300 ease-in-out py-5 max-w-[15rem]'>
                                Deactivate teacher
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeacherProfilePage