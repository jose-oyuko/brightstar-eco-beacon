import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { TreeDeciduous, Wheat, Droplets, TrendingUp } from "lucide-react";

const pillarsData = [
  {
    icon: TreeDeciduous,
    title: "Environmental Protection, Conservation & Management",
    gradient: "bg-gradient-primary",
    description:
      "Promote environmental conservation through climate action initiatives that promote flora and fauna in healthy soil, water and air by enhancing green and blue economy technologies.",
    activities: [
      "Collaborative research and development of technologies",
      "Tree planting in marine and terrestrial lands",
      "Commercial nurseries for trees, fruits, and medicinal plants",
      "Collection and preservation of diverse plant germplasm",
      "Waste collection, reduction, recycling, and safe disposal",
      "Solar energy devices production and marketing",
      "Indigenous seed collection and banking",
      "Wildlife clubs and ethnobotany initiatives",
      "Environmental impact assessment and auditing",
    ],
  },
  {
    icon: Wheat,
    title: "Agriculture, Food & Nutrition Security",
    gradient: "bg-gradient-earth",
    description:
      "Promotion of agriculture, food and nutrition security through technical and financial capacity development for sustainable production, distribution and consumption of food and agro-industrial crops.",
    activities: [
      "Promoting organic farming practices",
      "Documenting experiential learning by farmers",
      "Hydroponics, floriculture, and olericulture",
      "Apiculture and meliponiculture (bee farming)",
      "Sericulture (silk production)",
      "Vermicomposting for soil enrichment",
      "Indigenous crop variety preservation",
      "Sustainable food production training",
    ],
  },
  {
    icon: Droplets,
    title: "Water, Sanitation & Health",
    gradient: "bg-gradient-sky",
    description:
      "Promote water, sanitation and health advancing technologies by engaging and working with communities for improved socio-economic status for all.",
    activities: [
      "Water works including supply of equipment and materials",
      "Water harvesting engineering works",
      "Safe water storage technologies (domestic and industrial)",
      "Spring protection initiatives",
      "Rooftop rainfall water harvesting systems",
      "Wetland restoration and rehabilitation",
      "Sustainable irrigation systems",
      "Aquaculture, mariculture, and aquaponics",
    ],
  },
  {
    icon: TrendingUp,
    title: "Entrepreneurship & Business Development",
    gradient: "bg-primary",
    description:
      "Promoting entrepreneurship and business development in environmental conservation activities and agribusiness for employment and wealth creation.",
    activities: [
      "Mobilizing financial resources and investment",
      "Establishment of community demonstration centers",
      "Capacity development through farm visits and exhibitions",
      "Resource mobilization for vulnerable groups",
      "Stakeholder forums for cooperation",
      "Agri and ecotourism ventures",
      "Energy-saving stoves production and marketing",
      "Ecotourism, tours, and travel services",
      "Talent promotion through games, sports, and arts",
      "Nature-based solutions development",
    ],
  },
];

const Pillars = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="pt-32 pb-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-6">
              Our Four Pillars
            </h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              BECC's comprehensive approach to environmental conservation and community empowerment
              through strategic focus areas.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-16">
            {pillarsData.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <Card
                  key={index}
                  className="p-8 md:p-12 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className={`w-20 h-20 ${pillar.gradient} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-10 h-10 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold text-foreground mb-4">{pillar.title}</h2>
                      <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                        {pillar.description}
                      </p>
                      <h3 className="text-xl font-bold text-foreground mb-4">Key Activities</h3>
                      <ul className="grid md:grid-cols-2 gap-3">
                        {pillar.activities.map((activity, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                            <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                            <span>{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pillars;
