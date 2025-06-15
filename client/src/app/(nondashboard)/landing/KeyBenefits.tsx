/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { Activity, Handshake, MessageSquareText } from 'lucide-react'

const KeyBenefits = () => {
    return (
        <div className='min-h-screen w-full flex items-center justify-center px-20'>
            <div className='flex flex-col gap-5 w-full'>
                <h1 className='text-[40px] font-semibold'>Key Benefits</h1>
                <div className='flex flex-col gap-3 w-full'>
                    <div className='flex items-center gap-3 w-full h-[200px]'>
                        <div className='bg-[#6C5CE71A] flex flex-col flex-1 h-full gap-5 rounded-lg p-5 border-2 border-[#6C5CE7]'>
                            <img 
                                src='/bulb.png'
                                alt='Bulb icon'
                                className='w-[15px] min-h-[15px]'
                            />
                            <div className='flex flex-col'>
                                <h2 className='font-semibold'>Clear & Actionable Insights</h2>
                                <p className='text-base'>
                                    No more guesswork. Get easy-to-understand visuals and reports that help you spot trends, celebrate growth, and address challenges.
                                </p>
                            </div>
                        </div>
                        <div className='bg-[#6C5CE71A] w-[30rem] h-full flex flex-col gap-5 rounded-lg p-5 border-2 border-[#6C5CE7]'>
                            <Activity className='text-[#6C5CE7]'/>
                            <div className='flex flex-col'>
                                <h2 className='font-semibold'>Real-Time Progress Updates</h2>
                                <p className='text-base'>
                                    Stay on top of every milestone. Teachers update once—parents see it instantly. No more gaps in communication.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center gap-3 w-full h-[200px]'>
                        <div className='bg-[#6C5CE71A] w-[30rem] h-full flex flex-col gap-5 rounded-lg p-5 border-2 border-[#6C5CE7]'>
                            <MessageSquareText className='text-[#6C5CE7]'/>
                            <div className='flex flex-col'>
                                <h2 className='font-semibold'>One Seamless Platform</h2>
                                <p className='text-base'>
                                    Sync brings everyone students, teachers, and parents together in one intuitive space.
                                </p>
                            </div>
                        </div>
                        <div className='bg-[#6C5CE71A] flex flex-col flex-1 h-full gap-5 rounded-lg p-5 border-2 border-[#6C5CE7]'>
                            <Handshake className='text-[#6C5CE7]'/>
                            <div className='flex flex-col'>
                                <h2 className='font-semibold'>Built for Growth & Collaboration</h2>
                                <p className='text-base'>
                                    Empower students, involve parents, and support teachers—because progress is a team effort.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default KeyBenefits