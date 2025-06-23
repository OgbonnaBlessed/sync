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
import axios from 'axios'

const TeacherProfilePage = () => {
    const { teacherId } = useParams();
    const [teacher, setTeacher] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const detailsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchTeacher = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/teacher/${teacherId}`)
                setTeacher(res.data.teacher)

            } catch (error) {
                console.error('Error fetching teacher:', error)

            } finally {
                setLoading(false)
            }
        }

        if (teacherId) fetchTeacher()
    }, [teacherId])

    const handleToggleStatus = async () => {
        try {
            const res = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/teacher/toggle-status/${teacherId}`)
            setTeacher(res.data.teacher)

        } catch (error) {
            console.error('Failed to toggle status:', error)
        }
    }

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

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p>Loading teacher profile...</p>
            </div>
        )
    }

    if (!teacher) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p>Teacher not found.</p>
            </div>
        )
    }

    return (
        <div className='flex flex-col gap-10 p-8'>
            <Header />

            <div className='flex flex-col gap-4'>
                <h1 className="text-2xl font-semibold">Teacher&lsquo;s profile</h1>

                <div className='flex gap-10 items-start'>
                    <div className='bg-gray-200 p-2 rounded-xl h-96'>
                        <div className='relative w-64 h-40'>
                            <Image 
                                src={teacher.image || "/teacher.jpg"}
                                alt="Teacher image"
                                fill
                                className='object-cover rounded-xl'
                            />
                        </div>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <div className='flex flex-col gap-1'>
                            <h2 className='font-semibold text-xl'>{teacher.name}</h2>
                            <p className='text-sm text-gray-500'>{teacher.gender || "not specified"}</p>
                        </div>
                        <div>Status: {teacher.status} {teacher.lastLogin === undefined ? '' : `since ${teacher.lastLogin}`}</div>
                        <div>Enrolled classes:  {teacher.classes?.length || 0}</div>
                        <div className="grid gap-2 max-w-[15rem]">
                            <Label htmlFor="password" className='text-sm font-semibold'>Password</Label>
                            <div className='relative'>
                                <Input 
                                    type={passwordVisible ? 'text' : 'password'} 
                                    id="password"
                                    value={teacher.password}
                                    readOnly
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
                                    <ChevronDown className={`p-1 transition-transform duration-500 
                                        ${showDetails 
                                            ? 'transform rotate-180' 
                                            : ''
                                        }`} 
                                    />
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
                                                <p><strong>Date of Birth:</strong> {teacher.DOB}</p>
                                                <p><strong>Discipline:</strong> {teacher.discipline}</p>
                                                <p><strong>Certifications:</strong> {teacher.certification}</p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                            </div>
                            <Button
                                onClick={handleToggleStatus}
                                className={`w-full cursor-pointer transition-all duration-300 ease-in-out py-5 max-w-[15rem] 
                                    ${teacher.status === 'active' 
                                        ? 'bg-[#6C5CE7] hover:bg-[#6C5CE7]/80' 
                                        : 'bg-red-500 hover:bg-red-500/80'
                                    }`
                                }
                            >
                                {teacher.status === 'active' ? 'Deactivate Teacher' : 'Activate Teacher'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeacherProfilePage