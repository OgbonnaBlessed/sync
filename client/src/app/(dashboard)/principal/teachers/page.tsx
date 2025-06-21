import Header from '@/components/Header'
import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from 'next/link';

const activeTeachers = [
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

const deactivatedTeachers = [
    {
        name: 'Bolaji OyewoIe',
        numberOfClasses: '2 classes',
        status: 'Inactive',
        activity: '******',
    },
    {
        name: 'Bolaji OyewoIe',
        numberOfClasses: '2 classes',
        status: 'Inactive',
        activity: '******',
    },
    {
        name: 'Bolaji OyewoIe',
        numberOfClasses: '2 classes',
        status: 'Inactive',
        activity: '******',
    },
    {
        name: 'Bolaji OyewoIe',
        numberOfClasses: '2 classes',
        status: 'Inactive',
        activity: '******',
    },
    {
        name: 'Bolaji OyewoIe',
        numberOfClasses: '2 classes',
        status: 'Inactive',
        activity: '******',
    },
];

const page = () => {
    return (
        <div className='flex flex-col gap-10 p-8'>
            <Header />

            <div className='flex flex-col gap-12'>
                <div className='flex flex-col border rounded-lg'>
                    <div className="flex justify-between items-center px-8 py-4">
                        <h2 className="text-xl font-semibold">Teachers</h2>
                        <button className="bg-[#6C5CE7] text-white px-4 py-2 rounded-md text-sm hover:bg-[#6C5CE7]/80 transition-all">
                            + Add teachers
                        </button>
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
                                {activeTeachers.map((teacher, index) => (
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
                <div className='flex flex-col border rounded-lg'>
                    <div className="flex justify-between items-center px-8 py-4">
                        <h2 className="text-xl font-semibold">Deactivated Teachers</h2>
                        <button className="bg-[#6C5CE7] text-white px-4 py-2 rounded-md text-sm hover:bg-[#6C5CE7]/80 transition-all">
                            View all
                        </button>
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
                                {deactivatedTeachers.map((teacher, index) => (
                                    <TableRow key={index}>
                                        <TableCell className='px-8 py-4'>{teacher.name}</TableCell>
                                        <TableCell>{teacher.numberOfClasses}</TableCell>
                                        <TableCell>
                                            <span className="inline-flex items-center gap-1">
                                                <span className="w-2 h-2 rounded-full bg-red-500" />
                                                <span className="text-red-700 text-sm">{teacher.status}</span>
                                            </span>
                                        </TableCell>
                                        <TableCell>{teacher.activity}</TableCell>
                                        <TableCell className='pr-8 py-4 text-right'>
                                            <Link 
                                                href="#" 
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

export default page