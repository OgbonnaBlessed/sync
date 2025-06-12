import Image from 'next/image'
import React from 'react'

const Brands = () => {
    const brands = [
        {
            image: '/brands/first-brand.png',
            text: 'First Brand'
        },
        {
            image: '/brands/third-brand.png',
            text: 'Second Brand'
        },
        {
            image: '/brands/fifth-brand.png',
            text: 'Third Brand'
        },
        {
            image: '/brands/first-brand.png',
            text: 'Fourth Brand'
        },
        {
            image: '/brands/fifth-brand.png',
            text: 'Fifth Brand'
        }
    ]

    return (
        <div className='min-h-screen w-full flex items-center justify-center'>
            <div className='flex flex-col gap-14 items-center'>
                <h1 className='font-semibold text-[40px] max-w-4xl text-center leading-tight'>
                    Join the network of schools, teachers, and parents who rely on Sync
                </h1>
                <div className='flex items-center gap-20'>
                    {brands.map((brand, i) => (
                        <div 
                            key={i}
                            className='flex items-center gap-2'
                        >
                            <Image 
                                src={brand.image}
                                alt={`Brand-${i + 1}`}
                                width={30}
                                height={30}
                            />
                            <p>{brand.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Brands