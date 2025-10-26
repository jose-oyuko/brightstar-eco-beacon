import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import communityImage from "@/assets/community-planting.jpg";
import soilImage from "@/assets/soil-seedling.jpg";
import waterImage from "@/assets/water-conservation.jpg";

const projects = [
  {
    title: "Community Tree Planting Initiative",
    category: "Environmental Protection",
    image: communityImage,
    description:
      "Large-scale tree planting program restoring degraded forests and lands through collaborative community engagement. We work with local communities to plant indigenous tree species, creating sustainable forests for future generations.",
    impact: ["5,000+ trees planted", "10 communities involved", "50 hectares restored"],
    status: "Active",
  },
  {
    title: "Sustainable Organic Farming Program",
    category: "Agriculture",
    image: soilImage,
    description:
      "Training farmers in organic farming techniques, indigenous seed conservation, and sustainable agricultural practices. This program promotes food security while protecting soil health and biodiversity.",
    impact: ["200+ farmers trained", "15 organic farms established", "30 seed varieties preserved"],
    status: "Active",
  },
  {
    title: "Water Harvesting & Spring Protection",
    category: "Water & Sanitation",
    image: waterImage,
    description:
      "Installing rainwater harvesting systems and protecting natural springs in rural communities. This initiative ensures clean water access while promoting sustainable water resource management.",
    impact: ["25 springs protected", "100+ households with harvesting systems", "500,000L water capacity"],
    status: "Active",
  },
  {
    title: "Solar Energy Distribution",
    category: "Entrepreneurship",
    image: soilImage,
    description:
      "Producing and distributing solar energy devices to communities, promoting clean energy adoption and reducing reliance on fossil fuels.",
    impact: ["150 solar units distributed", "50 businesses supported", "200+ households powered"],
    status: "Active",
  },
  {
    title: "Waste Management & Recycling",
    category: "Environmental Protection",
    image: communityImage,
    description:
      "Community-based waste collection, recycling, and safe disposal programs. Teaching communities about waste reduction and circular economy principles.",
    impact: ["5 tons waste recycled monthly", "8 communities served", "30 jobs created"],
    status: "Active",
  },
  {
    title: "Apiculture Development",
    category: "Agriculture",
    image: waterImage,
    description:
      "Supporting communities in beekeeping for honey production and pollination services, promoting biodiversity and creating sustainable income sources.",
    impact: ["80 beehives established", "40 beekeepers trained", "500kg honey produced annually"],
    status: "Active",
  },
];

const Projects = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="pt-32 pb-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-6">
              Our Projects
            </h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Impactful initiatives creating sustainable change in communities across Kenya.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-strong transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <Badge className="bg-primary text-primary-foreground">{project.category}</Badge>
                    <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                      {project.status}
                    </Badge>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-foreground mb-4">{project.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {project.description}
                  </p>
                  <div>
                    <h4 className="text-sm font-bold text-foreground mb-3">Impact Metrics</h4>
                    <ul className="space-y-2">
                      {project.impact.map((metric, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {metric}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Projects;
