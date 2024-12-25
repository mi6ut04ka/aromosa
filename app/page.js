import HeroBanner from './components/HeroBanner';
import HeroSection from './components/HeroSection';
import BestSellers from './components/BestSellers';
import NewProducts from './components/NewProducts';
import HeroAbout from './components/HeroAbout';

export default function Home() {
  return (
    <>
      <HeroBanner />
      <HeroAbout/>
      <HeroSection/>
      <NewProducts/>
      <BestSellers/>
      
    </>
  );
}
