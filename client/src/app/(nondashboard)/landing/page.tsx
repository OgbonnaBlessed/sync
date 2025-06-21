'use client';

import React, { useRef } from 'react'
import HeroSection from './HeroSection'
import KeyBenefits from './KeyBenefits'
import Testimonials from './Testimonials'
import Brands from './Brands'
import Footer from './Footer'

const Page = () => {
    const benefitsRef = useRef<HTMLDivElement>(null)

    const scrollToBenefits = () => {
        benefitsRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
    
    return (
        <div>
            <HeroSection scrollToBenefits={scrollToBenefits}/>
            <KeyBenefits ref={benefitsRef}/>
            <Testimonials />
            <Brands />
            <Footer />
        </div>
    )
}

export default Page