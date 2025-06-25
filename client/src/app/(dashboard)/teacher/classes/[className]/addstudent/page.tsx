/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Header from '@/components/Header'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

const Page = () => {
    const { className } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
    })
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem('userInfo');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
        }
    }, []);

    const isValidEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = async(e: { preventDefault: () => void }) => {
        e.preventDefault();

        if (!formData.name || !formData.email) {
            toast.error("Please fill in all fields.");
            return;
        }

        if (!isValidEmail(formData.email)) {
            toast.error("Please enter a valid email address.");
            return;
        }

        setLoading(true);
        
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/class/${user?.user?.teacherId}/classes/${className}/students`,
                { 
                    name: formData.name,
                    parentEmail: formData.email 
                }
            );
            toast.success(response.data.message);
            setFormData({ 
                name: '' ,
                email: ''
            }); // Reset form

            setTimeout(() => {
                router.push(`/teacher/classes/${className}`)
            }, 2000);

        } catch (error: any) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to add student.");
        } finally {
            setLoading(false);
        }
    }
    
    return (
        <div className='flex flex-col gap-10 p-8 w-full'>
            <Header />

            <div className='flex flex-col gap-8 w-full'>
                <h1 className="text-2xl font-semibold">Enroll Students in <span className='uppercase'>{className}</span></h1>
                <div className='flex flex-col gap-5 w-full max-w-lg items-center justify-center mx-auto'>
                    <div className="grid gap-2 w-full">
                        <Label htmlFor="name">Student&lsquo;s Name</Label>
                        <Input
                            id="name" 
                            placeholder="Enter student's name" 
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div className="grid gap-2 w-full">
                        <Label htmlFor="email">Parent&lsquo;s email</Label>
                        <Input 
                            id="email" 
                            type="email"
                            placeholder="Enter parent's mail" 
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <Button
                        className='w-full cursor-pointer bg-[#6C5CE7] hover:bg-[#6C5CE7]/80 transition-all duration-300 ease-in-out py-5 mt-5'
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? 'Adding student...' : 'Add student'}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Page