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
import React from 'react'
import Link from 'next/link';
import { BookOpen, DollarSign, Users2 } from 'lucide-react';

const teachers = [
    {
        name: 'Bolaji OyewoIe',
        numberOfClasses: '2 classes',
        status: 'Active',
        activity: 'Seen today',
    },
    {
        name: 'Bolaji OyewoIe',
        numberOfClasses: '2 classes',
        status: 'Active',
        activity: 'Seen today',
    },
    {
        name: 'Bolaji OyewoIe',
        numberOfClasses: '2 classes',
        status: 'Active',
        activity: 'Seen today',
    },
    {
        name: 'Bolaji OyewoIe',
        numberOfClasses: '2 classes',
        status: 'Active',
        activity: 'Seen today',
    },
    {
        name: 'Bolaji OyewoIe',
        numberOfClasses: '2 classes',
        status: 'Active',
        activity: 'Seen today',
    },
];

const topSection = [
    { icon: Users2, text: 'Team weight', size: '4 teachers' },
    { icon: BookOpen, text: 'Enrolled classes', size: '6 classes' },
    { icon: DollarSign, text: 'Subscription', size: 'Basic plan' },
]

const page = () => {

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
                                {teachers.map((teacher, index) => (
                                    <TableRow key={index}>
                                        <TableCell className='px-8 py-4'>{teacher.name}</TableCell>
                                        <TableCell>{teacher.numberOfClasses}</TableCell>
                                        <TableCell>
                                            <span className="inline-flex items-center gap-1">
                                                <span className="w-2 h-2 rounded-full bg-green-500" />
                                                <span className="text-green-700 text-sm">{teacher.status}</span>
                                            </span>
                                        </TableCell>
                                        <TableCell>{teacher.activity}</TableCell>
                                        <TableCell className='pr-8 py-4 text-right'>
                                            <Link 
                                                href={`/principal/teachers/${index}`} 
                                                className="text-[#6C5CE7] text-sm font-medium"
                                            >
                                                View
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page;