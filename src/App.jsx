import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhatWeProvide from './components/WhatWeProvide';
import HowItWorks from './components/HowItWorks';
import WhyCrazyTrail from './components/WhyCrazyTrail';
import EngagementShowcase from './components/EngagementShowcase';
import SubmitForm from './components/SubmitForm';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <WhatWeProvide />
      <HowItWorks />
      <WhyCrazyTrail />
      <EngagementShowcase />
      <SubmitForm />
      <Footer />
      <Analytics />
    </>
  );
}
