
import { HeroSection } from "@/components/ui/hero-section";
import { FeaturesSection } from "@/components/ui/features-section";
import { PopularMeals } from "@/components/ui/popular-meals";
import { Testimonials } from "@/components/ui/testimonials";
import { Layout } from "@/components/layout";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturesSection />
      <PopularMeals />
      <Testimonials />
    </Layout>
  );
};

export default Index;
