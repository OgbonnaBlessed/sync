import { Button } from '@/components/ui/button'
import WaveCard from '@/components/WaveCard'
import React from 'react'

const HeroSection = ({ scrollToBenefits }: { scrollToBenefits: () => void }) => {
    return (
        <div className='min-h-screen w-full bg-white flex flex-col items-center justify-center gap-8'>
            <div className='flex flex-col gap-3 items-center'>
                <div className='flex flex-col gap-1 items-center'>
                    <h1 className='font-semibold font-stretch-200% text-[40px] max-w-[600px] max-h-[108px] text-center leading-tight'>
                        Track Student Progress. Bridge The Gap. Empower Growth.
                    </h1>
                    <p className='max-w-[454px] text-center'>
                        Our platform seamlessly connects teachers and
                        parents to support every student’s journey.
                    </p>
                </div>
                <Button 
                    onClick={scrollToBenefits}
                    className='bg-[#6C5CE7] px-8 py-6 rounded-[8px] text-white text-sm cursor-pointer hover:bg-[#6C5CE7]'
                >
                    Explore Sync
                </Button>
            </div>
            <div className="relative flex justify-between items-center w-full max-w-6xl">
                {/* LEFT image */}
                <div className='transform rotate-12'>
                    <WaveCard
                        src="/hero1.jpg"
                        alt="Teacher in class"
                        size="w-[300px] h-[200px]"
                    />
                </div>

                {/* CENTRE image – notice the larger size */}
                <WaveCard
                    src="/hero2.jpg"
                    alt="Kids with teacher"
                    size="w-[420px] h-[220px]"
                />

                {/* RIGHT image */}
                <div className='transform -rotate-12 border border-white bg-white'>
                    <WaveCard
                        src="/hero3.jpg"
                        alt="Reading in library"
                        size="w-[300px] h-[200px]"
                    />
                </div>
            </div>
        </div>
    )
}

export default HeroSection