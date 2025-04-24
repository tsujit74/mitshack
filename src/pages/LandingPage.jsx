import React from "react";
import HeroSection from "../components/Home/HeroSection";
import Events from "../components/Home/EventsSection";
import Services from "../components/Home/ServicesSection";
import HowItWorks from "../components/Home/HowItWorksSection";
import Testimonials from "../components/Home/TestimonialsSection";
const LandingPage = () => {
  return (
    <>
      
      <HeroSection />
      <Events />
      <Services />
      <HowItWorks />
      <Testimonials />
      
    </>
  );
};

export default LandingPage;
