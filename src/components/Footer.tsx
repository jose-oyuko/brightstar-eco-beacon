import { Link } from "react-router-dom";
import { Leaf, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                <Leaf className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <span className="text-xl font-bold">BECC</span>
                <p className="text-xs text-background/70">Mazingira Bora</p>
              </div>
            </Link>
            <p className="text-sm text-background/70 leading-relaxed">
              Centre of excellence promoting sustainable environmental conservation through
              practice and knowledge sharing.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-background/70 hover:text-background transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/pillars" className="text-sm text-background/70 hover:text-background transition-colors">
                  Our Pillars
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-sm text-background/70 hover:text-background transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-sm text-background/70 hover:text-background transition-colors">
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-background/70">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>BECC Eco Centre, Kakamega-Webuye Road, Kenya</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-background/70">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a href="tel:+254724390717" className="hover:text-background transition-colors">
                  +254 724 390 717
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-background/70">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a
                  href="mailto:brightstarecckenya@gmail.com"
                  className="hover:text-background transition-colors break-all"
                >
                  brightstarecckenya@gmail.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Follow Us</h3>
            <div className="flex gap-3 mb-6">
              <a
                href="#"
                className="w-10 h-10 bg-background/10 hover:bg-primary rounded-full flex items-center justify-center transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-background/10 hover:bg-primary rounded-full flex items-center justify-center transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-background/10 hover:bg-primary rounded-full flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-background/10 hover:bg-primary rounded-full flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
            <p className="text-sm text-background/70">
              Join our community and stay updated on our conservation initiatives.
            </p>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 text-center">
          <p className="text-sm text-background/60">
            © {new Date().getFullYear()} Brightstar Environmental Conservation Centre. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
