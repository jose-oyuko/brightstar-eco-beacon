import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { CheckCircle, Users, Target, Globe } from "lucide-react";

const coreValues = [
  {
    title: "Cooperation",
    description: "Working together with stakeholders and clients to achieve common environmental goals.",
  },
  {
    title: "Inclusivity",
    description: "Putting ecosystem interests at heart and ensuring all communities benefit.",
  },
  {
    title: "Holistic Approaches",
    description: "Taking a broad view to address environmental challenges comprehensively.",
  },
  {
    title: "Circularity & Regeneration",
    description: "Eliminating wastage through sustainable and regenerative practices.",
  },
  {
    title: "Sustainable Technologies",
    description: "Implementing solutions that benefit current and future generations.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="pt-32 pb-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-6">
              About BECC
            </h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Brightstar Environmental Conservation Centre is dedicated to creating sustainable
              ecosystems through community-driven conservation initiatives.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none mb-16 animate-fade-in">
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Background</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Brightstar Environmental Conservation Centre is registered by the Registrar of
                Companies in Kenya as a company limited by guarantee. We are committed to promoting
                sustainable environmental conservation across diverse ecosystems in Kenya and beyond.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Through practice and knowledge sharing, we work towards clean air, biodiversity
                preservation, and sustainable land use management. Our approach integrates
                traditional wisdom with modern sustainable technologies to create lasting impact.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <Card className="p-8 text-center animate-scale-in">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Target className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Our Goal</h3>
                <p className="text-muted-foreground">Self-sustaining ecosystems that benefit all communities</p>
              </Card>

              <Card className="p-8 text-center animate-scale-in" style={{ animationDelay: "100ms" }}>
                <div className="w-16 h-16 bg-gradient-earth rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-secondary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Our Motto</h3>
                <p className="text-muted-foreground">Inclusive Environmental Conservation</p>
              </Card>

              <Card className="p-8 text-center animate-scale-in" style={{ animationDelay: "200ms" }}>
                <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Globe className="w-8 h-8 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Our Slogan</h3>
                <p className="text-muted-foreground">"Mazingira Bora" - Better Environment</p>
              </Card>
            </div>

            <div className="animate-fade-in">
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Core Values</h2>
              <div className="space-y-4">
                {coreValues.map((value, index) => (
                  <Card key={index} className="p-6 flex items-start gap-4 hover:shadow-medium transition-shadow">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-2">{value.title}</h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
