import HeroSection from '../components/home/HeroSection';
import StatsSection from '../components/home/StatsSection';
import FeaturedProperties from '../components/home/FeaturedProperties';
import NeighborhoodsCarousel from '../components/home/NeighborhoodsCarousel';
import WhyChooseUs from '../components/home/WhyChooseUs';
import AgentsSection from '../components/home/AgentsSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import NewsletterSection from '../components/home/NewsletterSection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <FeaturedProperties />
      <NeighborhoodsCarousel />
      <WhyChooseUs />
      <AgentsSection />
      <TestimonialsSection />
      <NewsletterSection />
    </main>
  );
}