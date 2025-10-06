import React from 'react'
import Footer from '../Footer/Footer'
import Hero from '../Hero/Hero'
import Navbar from '../Navbar/Navbar'
import WorkingProcess from '../Process/Process'
import ServicesSection from '../Services/Services'
import Ctasection from '../Call/Call'

const Home = () => {
  return (
    <div>
      
      <Hero />
      <ServicesSection />
      <WorkingProcess />
      <Ctasection/>
      <Footer />
    </div>
  );
}

export default Home
