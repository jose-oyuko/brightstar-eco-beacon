import { Target, Eye, Heart } from "lucide-react";

const AboutSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              About <span className="text-primary">BECC</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Brightstar Environmental Conservation Centre is registered by the Registrar of
              Companies in Kenya as a company limited by guarantee, dedicated to promoting
              sustainable environmental conservation across diverse ecosystems.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card rounded-2xl p-8 shadow-soft hover:shadow-medium transition-shadow animate-slide-in">
              <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                Centre of excellence promoting sustainable environmental conservation.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-8 shadow-soft hover:shadow-medium transition-shadow animate-slide-in" style={{ animationDelay: "100ms" }}>
              <div className="w-14 h-14 bg-gradient-earth rounded-xl flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-secondary-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                Environmental conservation through practice and knowledge sharing for clean air,
                biodiversity, and sustainable land use management in diverse ecosystems.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-8 shadow-soft hover:shadow-medium transition-shadow animate-slide-in" style={{ animationDelay: "200ms" }}>
              <div className="w-14 h-14 bg-accent rounded-xl flex items-center justify-center mb-6">
                <Heart className="w-7 h-7 text-accent-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Motto</h3>
              <p className="text-muted-foreground leading-relaxed">
                Inclusive Environmental Conservation — working together for self-sustaining
                ecosystems that benefit all communities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
