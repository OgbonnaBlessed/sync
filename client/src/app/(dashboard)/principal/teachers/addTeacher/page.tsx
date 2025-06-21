/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Header from '@/components/Header'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Eye, EyeClosed, ImagePlus } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const AddTeacher = () => {
    const [formData, setFormData] = useState({
        name: '',
        DOB: '',
        discipline: '',
        certification: '',
        password: '',
        id: '',
    })
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const filePickerRef = useRef<HTMLInputElement | null>(null)

    const togglePasswordVisibility = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setPasswordVisible(!passwordVisible);
    }

    const generateTeacherId = () => {
        const id = `TCH-${uuidv4().slice(0, 6).toUpperCase()}`;
        setFormData({ ...formData, id });
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formPayload = new FormData();
            formPayload.append('name', formData.name);
            formPayload.append('DOB', formData.DOB);
            formPayload.append('discipline', formData.discipline);
            formPayload.append('certification', formData.certification);
            formPayload.append('password', formData.password);
            formPayload.append('teacherId', formData.id);
            if (imageFile) {
                formPayload.append('image', imageFile);
            }

            const response = await axios.post(
            `http://localhost:5000/api/teacher/create`,
                formPayload,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            console.log(response);

            alert('Teacher added successfully.');
            setFormData({
                name: '',
                DOB: '',
                discipline: '',
                certification: '',
                password: '',
                id: '',
            });
            setImageFile(null);

        } catch (error: any) {
            console.error(error);
            alert(error.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex flex-col gap-10 p-8 w-full'>
            <Header />

            <div className='flex flex-col gap-8 w-full'>
                <h1 className="text-2xl font-semibold">Add teacher</h1>
                <div className='flex flex-col gap-5 w-full max-w-lg items-center justify-center mx-auto'>
                    <div className='w-lg h-64 rounded-md flex items-center justify-center border hover:bg-gray-300 transition-all duration-300'>
                        <div 
                            onClick={() => filePickerRef.current?.click()}
                            className='flex flex-col gap-2 cursor-pointer items-center text-sm'
                        >
                            {imageFile ? (
                                <img
                                    src={URL.createObjectURL(imageFile)}
                                    alt='Preview'
                                    className='w-full h-full object-cover'
                                />
                            ) : (
                                <div className='flex flex-col gap-2 cursor-pointer items-center text-sm'>
                                    <ImagePlus />
                                    <div className='flex flex-col items-center gap-1'>
                                        <p>Add image</p>
                                        <p className='text-xs'>Browse or drop image</p>
                                    </div>
                                </div>
                            )}
                        </div>
                        <input
                            ref={filePickerRef}
                            type='file'
                            id='image'
                            accept='image/*'
                            onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                    setImageFile(e.target.files[0])
                                }
                            }}
                            className='hidden'
                        />
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
                        <Label 
                            onClick={generateTeacherId}
                            className='absolute -bottom-6 right-0 text-sm cursor-pointer'
                        >
                            Generate id
                        </Label>
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

export default AddTeacher