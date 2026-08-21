import Hero from '@/components/hero/Hero';
import Intro from '@/components/sections/Intro';
import Journey from '@/components/sections/Journey';
import WorldSection from '@/components/sections/WorldSection';
import CaseStudies from '@/components/sections/CaseStudies';
import Numbers from '@/components/sections/Numbers';
import SocialProof from '@/components/sections/SocialProof';
import FAQ from '@/components/sections/FAQ';
import FinalCTA from '@/components/sections/FinalCTA';
import Footer from '@/components/Footer';
import { WORLDS } from '@/lib/content';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <Journey />
      {WORLDS.map((world) => (
        <WorldSection key={world.key} world={world} />
      ))}
      <CaseStudies />
      <Numbers />
      <SocialProof />
      <FAQ />
      <FinalCTA />
      <Footer />
    </>
  );
}
