import React from 'react'
import HeroSection from './HeroSection'
import KeyBenefits from './KeyBenefits'
import Testimonials from './Testimonials'
import Brands from './Brands'
import Footer from './Footer'

const page = () => {
    return (
        <div>
            <HeroSection />
            <KeyBenefits />
            <Testimonials />
            <Brands />
            <Footer />
        </div>
    )
}

export default page