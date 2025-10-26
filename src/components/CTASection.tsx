import { Button } from "@/components/ui/button";
import { HandHeart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-24 bg-gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary-foreground rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-foreground/20 backdrop-blur-sm rounded-2xl mb-8">
            <HandHeart className="w-10 h-10 text-primary-foreground" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Join Us in Empowering Communities
          </h2>

          <p className="text-xl text-primary-foreground/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Partner with BECC to create lasting environmental impact. Together, we can build
            sustainable ecosystems and improve livelihoods across Kenya.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-strong text-lg px-8"
            >
              <Link to="/contact">
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 backdrop-blur-sm text-lg px-8"
            >
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
