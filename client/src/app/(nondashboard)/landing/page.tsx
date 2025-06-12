import React from 'react'
import HeroSection from './HeroSection'
import KeyBenefits from './KeyBenefits'
import Testimonials from './Testimonials'
import Brands from './Brands'

const page = () => {
    return (
        <div>
            <HeroSection />
            <KeyBenefits />
            <Testimonials />
            <Brands />
        </div>
    )
}

export default page