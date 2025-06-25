/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Header from '@/components/Header'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const Page = () => {
    const [formData, setFormData] = useState({ className: '' });
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<any>(null);
    const router = useRouter();
    
    useEffect(() => {
        const storedUser = localStorage.getItem('userInfo');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/class/${user?.user?.teacherId}/classes`,
                { className: formData.className }
            );
            toast.success(response.data.message);
            setFormData({ className: '' }); // Reset form
            setTimeout(() => {
                router.push('/teacher/classes')
            }, 2000);

        } catch (error: any) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to create class.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex flex-col gap-10 p-8 w-full'>
            <Header />

            <div className='flex flex-col gap-8 w-full'>
                <h1 className="text-2xl font-semibold">Create new class</h1>
                <div className='flex flex-col gap-5 w-full max-w-lg items-center justify-center mx-auto'>
                    <div className="grid gap-2 w-full">
                        <Label htmlFor="className">Class Name</Label>
                        <Input
                            id="className" 
                            placeholder="Enter class name" 
                            value={formData.className}
                            onChange={(e) => setFormData({ ...formData, className: e.target.value })}
                        />
                    </div>
                    <Button
                        className='w-full cursor-pointer bg-[#6C5CE7] hover:bg-[#6C5CE7]/80 transition-all duration-300 ease-in-out py-5 mt-5'
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? 'Creating class...' : 'Create class'}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Page