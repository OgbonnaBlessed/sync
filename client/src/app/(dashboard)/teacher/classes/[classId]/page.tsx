/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Header from '@/components/Header';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Link from 'next/link';
import { useParams } from 'next/navigation'
import React from 'react'

const Page = () => {
    const { classId } = useParams();

    const students = [
        {
            name: 'Ogbonna Blessed',
            parentEmail: 'blessedlyrics11@gmail.com',
            status: 'active',
        },
        {
            name: 'Ogbonna Blessed',
            parentEmail: 'blessedlyrics11@gmail.com',
            status: 'active',
        },
        {
            name: 'Ogbonna Blessed',
            parentEmail: 'blessedlyrics11@gmail.com',
            status: 'active',
        },
        {
            name: 'Ogbonna Blessed',
            parentEmail: 'blessedlyrics11@gmail.com',
            status: 'active',
        },
        {
            name: 'Ogbonna Blessed',
            parentEmail: 'blessedlyrics11@gmail.com',
            status: 'active',
        },
    ]

    return (
        <div className='flex flex-col gap-10 p-8 w-full'>
            <Header />

            <div className='flex flex-col gap-8 w-full'>
                <div className='flex justify-between items-start'>
                    <div className='flex flex-col gap-1'>
                        <h2 className='text-2xl font-semibold'>Basic Science (JS3)</h2>
                        <div className='flex flex-col text-gray-500'>
                            <p>Students: 3D Students</p>
                            <p>Last Report: 20th June, 2025</p>
                        </div>
                    </div>
                    <Link 
                        href="/teacher/classes/addstudent"
                        className="bg-[#6C5CE7] text-white px-4 py-2 rounded-md text-sm hover:bg-[#6C5CE7]/80 transition-all"
                    >
                        + Add student
                    </Link>
                </div>

                <div className="rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className='px-8 py-4'>Name</TableHead>
                                <TableHead>Parent&lsquo;s email</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className='pr-8 py-4 text-right'>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {students.length === 0 ?(
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-6">
                                        No active teachers available.
                                    </TableCell>
                                </TableRow>
                            ): (
                                students.map((student: any, index: number) => (
                                    <TableRow key={index}>
                                        <TableCell className='px-8 py-4'>{student.name}</TableCell>
                                        <TableCell>
                                            {student.parentEmail}
                                        </TableCell>
                                        <TableCell>
                                            <span className="inline-flex items-center gap-1">
                                                <span className="w-2 h-2 rounded-full bg-green-500" />
                                                <span className="text-green-700 text-sm">{student.status}</span>
                                            </span>
                                        </TableCell>
                                        <TableCell className='pr-8 py-4 text-right'>
                                            <div className="text-[#6C5CE7] text-sm font-medium cursor-pointer">
                                                Fill and send report
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default Page