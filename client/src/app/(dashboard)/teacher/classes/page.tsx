import Header from '@/components/Header'
import { EthernetPort } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const page = () => {
    const classes = [
        {
            subject: "Basic Science",
            students: "3D students",
            lastReport: "20th June, 2025",
            class: "JS1"
        },
        {
            subject: "Basic Science",
            students: "3D students",
            lastReport: "20th June, 2025",
            class: "JS1"
        },
    ]

    return (
        <div className='flex flex-col gap-10 p-8'>
            <Header />
            
            <div className='flex flex-col gap-12'>
                <div className='border rounded-lg p-5 flex flex-col gap-2 text-sm w-fit'>
                    <div className='flex items-center gap-2 text-gray-500'>
                        <span><EthernetPort className='p-1' /></span>
                        <p>Enrolled Classes</p>
                    </div>
                    <h2>2 classes</h2>
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
                            <Link
                                href="#"
                                className="bg-[#6C5CE7] text-white px-4 py-2 rounded-md text-sm hover:bg-[#6C5CE7]/80 transition-all"
                            >
                                Open all classes
                            </Link>
                        </div>
                    </div>

                    <div className="w-full flex flex-col gap-5 px-8 py-5">
                        {classes.map((cls, index) => (
                            <div 
                                key={index}
                                className='w-full flex justify-between items-start rounded-lg border p-5'
                            >
                                <div className='flex flex-col gap-2 w-64'>
                                    <div className='flex items-center justify-between w-full font-medium'>
                                        <h3>{cls.subject}</h3>
                                        <h3>{cls.class}</h3>
                                    </div>
                                    <p>Student: {cls.students}</p>
                                    <p>Last Report: {cls.lastReport}</p>
                                </div>
                                <Link
                                    href={`/teacher/classes/${index}`}
                                    className="bg-[#6C5CE7] text-white px-4 py-2 rounded-md text-sm hover:bg-[#6C5CE7]/80 transition-all"
                                >
                                    View details
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page