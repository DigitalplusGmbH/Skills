import Hero from '@/components/hero/Hero';
import Intro from '@/components/sections/Intro';
import WorldSection from '@/components/sections/WorldSection';
import CaseStudies from '@/components/sections/CaseStudies';
import Numbers from '@/components/sections/Numbers';
import Process from '@/components/sections/Process';
import SocialProof from '@/components/sections/SocialProof';
import FinalCTA from '@/components/sections/FinalCTA';
import Footer from '@/components/Footer';
import { WORLDS } from '@/lib/content';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      {WORLDS.map((world) => (
        <WorldSection key={world.key} world={world} />
      ))}
      <CaseStudies />
      <Numbers />
      <Process />
      <SocialProof />
      <FinalCTA />
      <Footer />
    </>
  );
}
