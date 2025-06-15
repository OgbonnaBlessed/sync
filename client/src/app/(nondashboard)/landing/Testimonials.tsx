/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useState, useEffect } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const testimonials = [
    {
        text: 'Sync has been a game-changer for our classroom. Parents feel included, and I can finally focus on what matters—my students’ growth.',
        name: 'Mrs. Amina, secondary school teacher',
        image: '/testimonial1.jpg',
    },
    {
        text: 'I love how I can see my child’s progress in real-time, without having to wait for report cards. It’s been a game-changer for our family!',
        name: 'Mrs. Fadipe, Parent',
        image: '/testimonial2.jpg',
    },
    {
        text: 'Sync has been a game-changer for our classroom. Parents feel included, and I can finally focus on what matters—my students’ growth.',
        name: 'Mr. Damina, Secondary school teacher',
        image: '/testimonial3.jpg',
    },
]

export default function Testimonials() {
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    const count = testimonials.length

    useEffect(() => {
        if (!api) return
        const update = () => setCurrent(api.selectedScrollSnap())
        update()
        api.on('select', update)
        return () => {
            api.off('select', update)
        }
    }, [api])

    return (
        <div className='min-h-screen flex items-center justify-center w-full'>
            <div className="flex flex-col px-20 py-10 bg-gray-100">
                <h2 className="text-3xl font-semibold text-[40px] mb-6">Testimonials</h2>
                <div className="relative w-full">
                    <Carousel 
                        setApi={setApi} 
                        opts={{ loop: false }}
                    >
                        <CarouselContent className="-ml-4">
                            {testimonials.map((t, idx) => (
                                <CarouselItem 
                                    key={idx} 
                                    className="pl-4 basis-full"
                                >
                                    <div className="flex flex-col md:flex-row gap-6 bg-gray-100 rounded-lg">
                                        <div className="flex-1 flex flex-col justify-center space-y-4">
                                            <p className="text-[#121212] leading-relaxed text-[30px]">{t.text}</p>
                                            <h3 className="font-semibold text-[20px]">{t.name}</h3>
                                        </div>
                                        <div className="relative h-64 w-full md:w-1/3 rounded-lg overflow-hidden">
                                            <img
                                                src={t.image}
                                                alt={t.name}
                                                className="object-cover object-top"
                                            />
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        {/* Correct usage: wrap button inline inside CarouselPrevious/Next */}
                        <div className='flex items-center gap-5 mt-2'>
                            <CarouselPrevious className='cursor-pointer disabled:cursor-not-allowed disabled:bg-[#6C5CE71A] bg-[#6C5CE7] hover:bg-[#6C5CE7]'>
                                <button
                                    disabled={current === 0}
                                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full p-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#6C5CE71A] bg-[#6C5CE7] cursor-pointer"
                                >
                                    <ArrowLeft />
                                </button>
                            </CarouselPrevious>
                            <CarouselNext className='cursor-pointer disabled:cursor-not-allowed disabled:bg-[#6C5CE71A] bg-[#6C5CE7] hover:bg-[#6C5CE7]'>
                                <button
                                    disabled={current === count - 1}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                >
                                    <ArrowRight />
                                </button>
                            </CarouselNext>
                        </div>
                    </Carousel>
                </div>
            </div>
        </div>
    )
}