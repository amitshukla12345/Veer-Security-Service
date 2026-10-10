import React from 'react';
import HeroSlider from '../components/HeroSlider';
import About from '../components/About';
import Services from '../components/Services';
import CtaBand from '../components/CtaBand';
import WhyChooseUs from '../components/WhyChooseUs';

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <CtaBand />
      <WhyChooseUs />
    </>
  );
}
