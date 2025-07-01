'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import Header from '@/components/Header'
import axios from 'axios'
import { BookOpen } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

const Page = () => {
    const [classes, setClasses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [classCount, setClassCount] = useState(0);

    useEffect(() => {
        const storedUser = localStorage.getItem('userInfo');
        const parsedUser = storedUser ? JSON.parse(storedUser) : null;
        const id = parsedUser?.user?.teacherId;

        if (id) {
            axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/class/${id}/classes`)
                .then((res) => {
                    setClasses(res.data.classes || []);
                    setClassCount(res.data.count);
                    toast.success(res?.data?.message);
                })
                .catch((err) => {
                    console.error('Failed to fetch classes:', err);
                    toast.error('Failed to fetch classes');
                })
                .finally(() => setLoading(false));
        }
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <div className='flex flex-col gap-10 p-8'>
            <Header />
            
            <div className='flex flex-col gap-12'>
                <div className='border rounded-lg p-5 flex flex-col gap-2 text-sm w-fit'>
                    <div className='flex items-center gap-2 text-gray-500'>
                        <span><BookOpen className='p-1' /></span>
                        <p>Enrolled Classes</p>
                    </div>
                    <h2>{classCount} class{classCount != 1 ? 'es' : ''}</h2>
                </div>

                <div className='flex flex-col border rounded-lg'>
                    <div className="flex justify-between items-center border-b px-8 py-4">
                        <h2 className="text-xl font-semibold">Classes</h2>
                        <div className='flex items-center gap-5'>
                            <Link
                                href="/teacher/classes/createclass"
                                className="text-black px-4 py-2 rounded-md text-sm transition-all border border-[#6C5CE7]"
                            >
                                Create new class
                            </Link>
                        </div>
                    </div>

                    {classes.length === 0 ? (
                        <div className='w-full h-20 py-5 flex justify-center items-center'>
                            <p>You have no class yet.</p>
                        </div>
                    ) : (
                        <div className="w-full flex flex-col gap-5 px-8 py-5">
                            {classes.map((cls, index) => (
                                <div 
                                    key={index}
                                    className='w-full flex justify-between items-start rounded-lg border p-5'
                                >
                                    <div className='flex flex-col gap-2 w-64'>
                                        <div className='flex items-center justify-between w-full font-medium'>
                                            <h3 className='uppercase'>{cls.className}</h3>
                                        </div>
                                        <p>Students: {cls.students?.length || 0}</p>
                                        <p>Last Report: {cls.lastReportDate 
                                                ? new Date(cls.lastReportDate).toLocaleDateString() 
                                                : 'No report yet'}
                                        </p>
                                    </div>
                                    <Link
                                        href={`/teacher/classes/${cls.className}`}
                                        className="bg-[#6C5CE7] text-white px-4 py-2 rounded-md text-sm hover:bg-[#6C5CE7]/80 transition-all"
                                    >
                                        View details
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Page