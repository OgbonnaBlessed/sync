'use client';

import Header from '@/components/Header'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useState } from 'react'

const Page = () => {
    const [formData, setFormData] = useState({ className: '', classLevel: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setLoading(true);
    }

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
                    <div className="grid gap-2 w-full">
                        <Label htmlFor="classLevel">Class Level</Label>
                        <Input 
                            id="classLevel" 
                            placeholder="Enter class level" 
                            value={formData.classLevel}
                            onChange={(e) => setFormData({ ...formData, classLevel: e.target.value })}
                        />
                    </div>
                    <Button
                        className='w-full cursor-pointer bg-[#6C5CE7] hover:bg-[#6C5CE7]/80 transition-all duration-300 ease-in-out py-5 mt-8'
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? 'Creating account...' : 'Create account'}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Page