import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ImpactMetrics from "@/components/ImpactMetrics";
import AboutSection from "@/components/AboutSection";
import PillarsSection from "@/components/PillarsSection";
import ProjectsSection from "@/components/ProjectsSection";
import CTASection from "@/components/CTASection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <ImpactMetrics />
      <AboutSection />
      <PillarsSection />
      <ProjectsSection />
      <CTASection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
