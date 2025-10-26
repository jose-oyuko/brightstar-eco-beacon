import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import communityImage from "@/assets/community-planting.jpg";
import soilImage from "@/assets/soil-seedling.jpg";
import waterImage from "@/assets/water-conservation.jpg";

const projects = [
  {
    title: "Community Tree Planting",
    description: "Restoration of degraded forests and lands through collaborative community tree planting initiatives.",
    image: communityImage,
    category: "Environmental Protection",
  },
  {
    title: "Sustainable Agriculture",
    description: "Promoting organic farming and indigenous seed conservation for food security.",
    image: soilImage,
    category: "Agriculture",
  },
  {
    title: "Water Harvesting Systems",
    description: "Installing rainwater harvesting and spring protection systems in rural communities.",
    image: waterImage,
    category: "Water & Sanitation",
  },
];

const ProjectsSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Explore our impactful initiatives creating sustainable change in communities across Kenya.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-strong transition-all duration-300 animate-scale-in border-none group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                <span className="absolute bottom-4 left-4 bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-sm font-medium">
                  {project.category}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-3">{project.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{project.description}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center animate-fade-in">
          <Button asChild size="lg" className="bg-gradient-primary shadow-medium hover:opacity-90">
            <Link to="/projects">
              View All Projects
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
