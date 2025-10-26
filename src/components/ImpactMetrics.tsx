import { Users, Leaf, Droplets, Award } from "lucide-react";

const metrics = [
  {
    icon: Leaf,
    value: "4",
    label: "Core Pillars",
    color: "text-primary",
  },
  {
    icon: Users,
    value: "1000+",
    label: "Community Members",
    color: "text-secondary",
  },
  {
    icon: Droplets,
    value: "50+",
    label: "Active Projects",
    color: "text-accent",
  },
  {
    icon: Award,
    value: "15+",
    label: "Partners",
    color: "text-highlight",
  },
];

const ImpactMetrics = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div
                key={index}
                className="text-center animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`inline-flex p-4 rounded-2xl bg-background shadow-soft mb-4 ${metric.color}`}>
                  <Icon className="w-8 h-8" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                  {metric.value}
                </div>
                <div className="text-sm md:text-base text-muted-foreground font-medium">
                  {metric.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ImpactMetrics;
