import { Button } from "@/components/ui/button";
import { ArrowRight, TreePine } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-landscape.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/70 to-accent/60" />
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary-foreground/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
            <TreePine className="w-5 h-5 text-primary-foreground" />
            <span className="text-sm font-medium text-primary-foreground">
              Inclusive Environmental Conservation
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
            Brightstar Environmental
            <br />
            <span className="text-highlight">Conservation Centre</span>
          </h1>

          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-4 font-medium">
            Mazingira Bora — Better Environment
          </p>

          <p className="text-lg md:text-xl text-primary-foreground/80 mb-12 max-w-3xl mx-auto leading-relaxed">
            Environmental conservation through practice and knowledge sharing for clean air,
            biodiversity, and sustainable land use management in diverse ecosystems.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-strong text-lg px-8"
            >
              <Link to="/about">
                Learn More
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 backdrop-blur-sm text-lg px-8"
            >
              <Link to="/contact">Get Involved</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-8 h-12 border-2 border-primary-foreground/50 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-primary-foreground/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
