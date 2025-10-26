import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TreeDeciduous, Wheat, Droplets, TrendingUp, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const pillars = [
  {
    icon: TreeDeciduous,
    title: "Environmental Protection",
    description:
      "Climate action initiatives promoting flora and fauna in healthy soil, water, and air through green and blue economy technologies.",
    gradient: "bg-gradient-primary",
    activities: ["Tree planting", "Waste management", "Indigenous seed conservation"],
  },
  {
    icon: Wheat,
    title: "Agriculture & Food Security",
    description:
      "Technical and financial capacity development for sustainable production, distribution, and consumption of food and agro-industrial crops.",
    gradient: "bg-gradient-earth",
    activities: ["Organic farming", "Hydroponics", "Apiculture"],
  },
  {
    icon: Droplets,
    title: "Water, Sanitation & Health",
    description:
      "Advancing technologies by engaging with communities for improved socio-economic status through sustainable water solutions.",
    gradient: "bg-gradient-sky",
    activities: ["Water harvesting", "Spring protection", "Aquaculture"],
  },
  {
    icon: TrendingUp,
    title: "Entrepreneurship & Business",
    description:
      "Promoting business development in environmental conservation and agribusiness for employment and wealth creation.",
    gradient: "bg-primary",
    activities: ["Ecotourism", "Community centers", "Resource mobilization"],
  },
];

const PillarsSection = () => {
  return (
    <section className="py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our Four <span className="text-primary">Pillars</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            BECC's comprehensive approach to environmental conservation and community empowerment
            through four strategic focus areas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <Card
                key={index}
                className="p-8 hover:shadow-strong transition-all duration-300 animate-scale-in border-none"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-16 h-16 ${pillar.gradient} rounded-2xl flex items-center justify-center mb-6`}>
                  <Icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">{pillar.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">{pillar.description}</p>
                <div className="space-y-2">
                  {pillar.activities.map((activity, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {activity}
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>

        <div className="text-center animate-fade-in">
          <Button asChild size="lg" className="bg-gradient-primary shadow-medium hover:opacity-90">
            <Link to="/pillars">
              Explore All Pillars
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PillarsSection;
