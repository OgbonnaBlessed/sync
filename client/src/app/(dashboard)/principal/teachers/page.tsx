'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import Header from '@/components/Header'
import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from 'next/link';
import axios from 'axios';

const Page = () => {
    const [activeTeachers, setActiveTeachers] = useState([]);
    const [deactivatedTeachers, setDeactivatedTeachers] = useState([]);

        useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/teacher/all`);
                const _activeTeachers = res.data.teachers.filter((t: any) => t.status === 'active');
                const _deactivatedTeachers = res.data.teachers.filter((t: any) => t.status === 'inactive');
                setActiveTeachers(_activeTeachers);
                setDeactivatedTeachers(_deactivatedTeachers);
                
            } catch (error) {
                console.error('Failed to fetch teachers:', error);
            }
        };

        fetchTeachers();
    }, []);

    return (
        <div className='flex flex-col gap-10 p-8'>
            <Header />

            <div className='flex flex-col gap-12'>
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
                                {activeTeachers.length === 0 ?(
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-6">
                                            No active teachers available.
                                        </TableCell>
                                    </TableRow>
                                ): (
                                    activeTeachers.map((teacher: any, index: number) => (
                                        <TableRow key={index}>
                                            <TableCell className='px-8 py-4'>{teacher.name}</TableCell>
                                            <TableCell>
                                                {teacher.classes?.length || 0} class{teacher.classes?.length !== 1 ? 'es' : ''}
                                            </TableCell>
                                            <TableCell>
                                                <span className="inline-flex items-center gap-1">
                                                    <span className="w-2 h-2 rounded-full bg-green-500" />
                                                    <span className="text-green-700 text-sm">{teacher.status}</span>
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
                <div className='flex flex-col border rounded-lg'>
                    <div className="flex px-8 py-4">
                        <h2 className="text-xl font-semibold">Deactivated Teachers</h2>
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
                                {deactivatedTeachers.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-6">
                                            No deactivated teachers available.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    deactivatedTeachers.map((teacher: any, index: number) => (
                                        <TableRow key={index}>
                                            <TableCell className='px-8 py-4'>{teacher.name}</TableCell>
                                            <TableCell>
                                                {teacher.classes?.length || 0} class{teacher.classes?.length !== 1 ? 'es' : ''}
                                            </TableCell>
                                            <TableCell>
                                                <span className="inline-flex items-center gap-1">
                                                    <span className="w-2 h-2 rounded-full bg-red-500" />
                                                    <span className="text-red-700 text-sm">{teacher.status}</span>
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

export default Page