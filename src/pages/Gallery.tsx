import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import communityImage from "@/assets/community-planting.jpg";
import soilImage from "@/assets/soil-seedling.jpg";
import waterImage from "@/assets/water-conservation.jpg";
import heroImage from "@/assets/hero-landscape.jpg";

const galleryImages = [
  {
    src: heroImage,
    title: "African Landscape Conservation",
    category: "Nature",
  },
  {
    src: communityImage,
    title: "Community Tree Planting",
    category: "Community",
  },
  {
    src: soilImage,
    title: "Sustainable Agriculture",
    category: "Agriculture",
  },
  {
    src: waterImage,
    title: "Water Conservation Project",
    category: "Water",
  },
  {
    src: communityImage,
    title: "Environmental Education",
    category: "Education",
  },
  {
    src: waterImage,
    title: "Spring Protection Initiative",
    category: "Water",
  },
];

const Gallery = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="pt-32 pb-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-6">
              Gallery
            </h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Visual stories of our environmental conservation work and community impact.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {galleryImages.map((image, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-strong transition-all duration-300 animate-scale-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <span className="inline-block bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium mb-2">
                        {image.category}
                      </span>
                      <h3 className="text-xl font-bold text-background">{image.title}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Gallery;
