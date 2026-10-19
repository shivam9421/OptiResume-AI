import React from 'react'
import Banner from '../components/Home/Banner'
import Hero from '../components/Home/Hero'
import Navbar from '../components/Home/Navbar'
import BackgroundGrid from '../components/Home/BackgroundGrid'
import Features from '../components/Home/Feature'
import Testimonial from '../components/Home/Testimonial'
import CalltoAction from '../components/Home/CalltoAction'
import Footer from '../components/Home/Footer'

const Home = () => {
  return (
    <div>
        <BackgroundGrid/>
        <Banner/>
        <Navbar/>
        <Hero/>
        <Features/>
        <Testimonial/>
        <CalltoAction/>
        <Footer/>
    </div>
  )
}

export default Home