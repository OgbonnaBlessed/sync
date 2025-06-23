/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Header from '@/components/Header';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { BookOpen, DollarSign, Users2 } from 'lucide-react';
import axios from 'axios';

const Page = () => {
    const [teacherCount, setTeacherCount] = useState(0);
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/teacher/all`);
                const activeTeachers = res.data.teachers.filter((t: any) => t.status === 'active');
                setTeachers(activeTeachers);
                setTeacherCount(activeTeachers.length);
                
            } catch (error) {
                console.error('Failed to fetch teachers:', error);
            }
        };

        fetchTeachers();
    }, []);

    const topSection = [
        { icon: Users2, text: 'Team weight', size: `${teacherCount} teacher${teacherCount !== 1 ? 's' : ''}` },
        { icon: BookOpen, text: 'Enrolled classes', size: '6 classes' },
        { icon: DollarSign, text: 'Subscription', size: 'Basic plan' },
    ]

    return (
        <div className='flex flex-col gap-10 p-8'>
            <Header />

            <div className='flex flex-col gap-12'>
                <div className='flex items-center gap-5'>
                    {topSection.map((item, i) => (
                        <div 
                            key={i}
                            className='border rounded-lg p-5 flex flex-col gap-2 text-sm'
                        >
                            <div className='flex items-center gap-2 text-gray-500'>
                                <span><item.icon className='p-1' /></span>
                                <p>{item.text}</p>
                            </div>
                            <h2>{item.size}</h2>
                        </div>
                    ))}
                </div>
                <div className='flex flex-col border rounded-lg'>
                    <div className="flex justify-between items-center px-8 py-4">
                        <h2 className="text-xl font-semibold">Teachers</h2>
                        <Link 
                            href="/principal/teachers/addTeacher"
                            className="bg-[#6C5CE7] text-white px-4 py-2 rounded-md text-sm hover:bg-[#6C5CE7]/80 transition-all"
                        >
                            + Add teacher
                        </Link>
                    </div>
                    <div className="rounded-b-lg border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className='px-8 py-4'>Name</TableHead>
                                    <TableHead>Number of Classes</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Activity</TableHead>
                                    <TableHead className='pr-8 py-4 text-right'>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {teachers.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-6">
                                            No teachers available.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    teachers.map((teacher: any, index: number) => (
                                        <TableRow key={index}>
                                            <TableCell className='px-8 py-4'>{teacher.name}</TableCell>
                                            <TableCell>
                                                {teacher.classes?.length || 0} class{teacher.classes?.length !== 1 ? 'es' : ''}
                                            </TableCell>
                                            <TableCell>
                                            <span className={`inline-flex items-center gap-1`}>
                                                <span className={`w-2 h-2 rounded-full ${teacher.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`} />
                                                <span className={`text-sm ${teacher.status === 'active' ? 'text-green-700' : 'text-red-700'}`}>
                                                {teacher.status.charAt(0).toUpperCase() + teacher.status.slice(1)}
                                                </span>
                                            </span>
                                            </TableCell>
                                            <TableCell>
                                                {teacher.lastLogin ? (teacher.lastLogin).toLocaleString() : "No activity yet"}
                                            </TableCell>
                                            <TableCell className='pr-8 py-4 text-right'>
                                                <Link 
                                                    href={`/principal/teachers/${teacher._id}`} 
                                                    className="text-[#6C5CE7] text-sm font-medium"
                                                >
                                                    View
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page;