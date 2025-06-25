'use client';

import Header from '@/components/Header'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useState } from 'react'

const Page = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
    })
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setLoading(true);
    }
    
    return (
        <div className='flex flex-col gap-10 p-8 w-full'>
            <Header />

            <div className='flex flex-col gap-8 w-full'>
                <h1 className="text-2xl font-semibold">Enroll Students in Basic Science (JS3)</h1>
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