'use client';

import Header from '@/components/Header'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Eye, EyeClosed, ImagePlus } from 'lucide-react'
import React, { useState } from 'react'

const AddTeacher = () => {
    const [formData, setFormData] = useState({
        name: '',
        DOB: '',
        discipline: '',
        certification: '',
        password: '',
        id: ''
    })
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const togglePasswordVisibility = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setPasswordVisible(!passwordVisible);
    }

    return (
        <div className='flex flex-col gap-10 p-8 w-full'>
            <Header />

            <div className='flex flex-col gap-4 w-full'>
                <h1 className="text-2xl font-semibold">New teacher&lsquo;s profile</h1>
                <div className='flex flex-col gap-5 w-full max-w-lg items-center justify-center mx-auto'>
                    <div className='w-lg h-64 rounded-md flex items-center justify-center border hover:bg-gray-300 transition-all duration-300'>
                        <div className='flex flex-col gap-2 cursor-pointer items-center text-sm'>
                            <ImagePlus />
                            <div className='flex flex-col items-center gap-1'>
                                <p>Add image</p>
                                <p className='text-xs'>Browse or drop image</p>
                            </div>
                        </div>
                    </div>
                    <div className="grid gap-2 w-full">
                        <Label htmlFor="name">Name</Label>
                        <Input 
                            id="name" 
                            placeholder="Enter teacher's name" 
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div className="grid gap-2 w-full">
                        <Label htmlFor="DOB">Date of Birth</Label>
                        <Input 
                            id="DOB" 
                            placeholder="Enter teacher's date of birth" 
                            value={formData.DOB}
                            onChange={(e) => setFormData({ ...formData, DOB: e.target.value })}
                        />
                    </div>
                    <div className="grid gap-2 w-full">
                        <Label htmlFor="discipline">Discipline</Label>
                        <Input 
                            id="discipline" 
                            placeholder="Enter teacher's discipline" 
                            value={formData.discipline}
                            onChange={(e) => setFormData({ ...formData, discipline: e.target.value })}
                        />
                    </div>
                    <div className="grid gap-2 w-full">
                        <Label htmlFor="certification">Certification</Label>
                        <Input 
                            id="certification" 
                            placeholder="Enter teacher's certification" 
                            value={formData.certification}
                            onChange={(e) => setFormData({ ...formData, certification: e.target.value })}
                        />
                    </div>
                    <div className="grid gap-2 w-full">
                        <Label htmlFor="password">Password</Label>
                        <div className='relative'>
                            <Input 
                                type={passwordVisible ? 'text' : 'password'} 
                                id="password"
                                placeholder='Enter your password'
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                            <span 
                                onClick={togglePasswordVisibility}
                                className='cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2'
                            >
                                {passwordVisible ? <EyeClosed className='p-1'/> : <Eye className='p-1'/>}
                            </span>
                        </div>
                    </div>
                    <div className="grid gap-2 w-full relative">
                        <Label htmlFor="id">Assign id</Label>
                        <Input 
                            id="id" 
                            placeholder="Assign unique id for teacher" 
                            value={formData.id}
                            onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                        />
                        <Label className='absolute -bottom-6 right-0 text-sm cursor-pointer'>Generate id</Label>
                    </div>
                    <Button
                        className='w-full cursor-pointer bg-[#6C5CE7] hover:bg-[#6C5CE7]/80 transition-all duration-300 ease-in-out py-5 mt-8'
                        disabled={loading}
                    >
                        {loading ? 'Creating account...' : 'Create account'}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AddTeacher