/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Header from '@/components/Header';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';
import { Send } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const Page = () => {
    const { className } = useParams();
    const [teacherId, setTeacherId] = useState<any>(null);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [reports, setReports] = useState<{ [key: number]: string }>({});
    const [sentIndexes, setSentIndexes] = useState<number[]>([]);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('userInfo');
        const parsedUser = storedUser ? JSON.parse(storedUser) : null;
        const id = parsedUser?.user?.teacherId;
        setTeacherId(id);

        if (id) {
            axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/class/${id}/classes/${className}`)
                .then((res) => {
                    setStudents(res.data?.class?.students || []);
                })
                .catch((err) => {
                    console.error('Failed to fetch classes:', err);
                })
                .finally(() => setLoading(false));
        }
    }, []);

    const handleReportClick = (index: number) => {
        if (sentIndexes.includes(index)) return;
        setActiveIndex(activeIndex === index ? null : index);
    };

    const handleReportChange = (index: number, value: string) => {
        setReports(prev => ({ ...prev, [index]: value }));
    };

    const sendReport = async (student: any, index: number) => {
        const reportText = reports[index];
        if (!reportText) return toast.error("Please enter a report");

        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/class/${teacherId}/classes/${className}/students/${student.parentEmail}/report`,
                { report: reportText }
            );

            setSentIndexes(prev => [...prev, index]);
            setActiveIndex(null);
            toast.success("Report sent!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to send report");
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <div className='flex flex-col gap-10 p-8 w-full'>
            <Header />

            <div className='flex flex-col gap-8 w-full'>
                <div className='flex justify-between items-start'>
                    <div className='flex flex-col gap-1'>
                        <h2 className='text-2xl font-semibold uppercase'>{className}</h2>
                        <div className='flex flex-col text-gray-500'>
                            <p>Students: {students.length}</p>
                            <p>Last Report: 20th June, 2025</p>
                        </div>
                    </div>
                    <Link 
                        href={`/teacher/classes/${className}/addstudent`}
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
                            {students.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-6">
                                        No student available.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                students.map((student: any, index: number) => (
                                    <React.Fragment key={index}>
                                        <TableRow>
                                            <TableCell className='px-8 py-4'>{student.name}</TableCell>
                                            <TableCell>{student.parentEmail}</TableCell>
                                            <TableCell>
                                                <span className="inline-flex items-center gap-1">
                                                    <span className="w-2 h-2 rounded-full bg-green-500" />
                                                    <span className="text-green-700 text-sm">{student.status}</span>
                                                </span>
                                            </TableCell>
                                            <TableCell className='pr-8 py-4 text-right'>
                                                <div
                                                    className={`text-sm font-medium cursor-pointer ${
                                                        sentIndexes.includes(index) ? 'text-gray-500' : 'text-[#6C5CE7]'
                                                    }`}
                                                    onClick={() => handleReportClick(index)}
                                                >
                                                    {sentIndexes.includes(index) ? 'Sent' : 'Fill and send report'}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                        {activeIndex === index && (
                                            <TableRow>
                                                <TableCell colSpan={4} className="px-8 py-4 bg-gray-50">
                                                    <div className='flex flex-col gap-3'>
                                                        <Textarea
                                                            placeholder="Enter report..."
                                                            value={reports[index] || ''}
                                                            onChange={(e) => handleReportChange(index, e.target.value)}
                                                            className="min-h-[100px]"
                                                        />
                                                        <button
                                                            className="self-end text-[#6C5CE7] hover:text-[#4b3bc7] flex items-center gap-1"
                                                            onClick={() => sendReport(student, index)}
                                                        >
                                                            <Send className="h-4 w-4" /> Send
                                                        </button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </React.Fragment>
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