import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section className="py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Get in <span className="text-primary">Touch</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions or want to collaborate? We'd love to hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="p-6 text-center hover:shadow-medium transition-shadow animate-scale-in">
              <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Location</h3>
              <p className="text-sm text-muted-foreground">
                BECC Eco Centre, Okumu Market
                <br />
                Kakamega-Webuye Road
                <br />
                P.O Box 2451-50100, Kakamega, Kenya
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-medium transition-shadow animate-scale-in" style={{ animationDelay: "100ms" }}>
              <div className="w-14 h-14 bg-gradient-earth rounded-xl flex items-center justify-center mx-auto mb-4">
                <Mail className="w-7 h-7 text-secondary-foreground" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Email</h3>
              <a
                href="mailto:brightstarecckenya@gmail.com"
                className="text-sm text-primary hover:underline"
              >
                brightstarecckenya@gmail.com
              </a>
            </Card>

            <Card className="p-6 text-center hover:shadow-medium transition-shadow animate-scale-in" style={{ animationDelay: "200ms" }}>
              <div className="w-14 h-14 bg-accent rounded-xl flex items-center justify-center mx-auto mb-4">
                <Phone className="w-7 h-7 text-accent-foreground" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Phone</h3>
              <a href="tel:+254724390717" className="text-sm text-primary hover:underline">
                +254 724 390 717
              </a>
            </Card>
          </div>

          <Card className="p-8 animate-fade-in">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Name</label>
                  <Input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                  <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Subject</label>
                <Input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="How can we help?"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                <Textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us more about your inquiry..."
                  className="w-full min-h-32"
                />
              </div>

              <Button type="submit" size="lg" className="w-full bg-gradient-primary shadow-medium hover:opacity-90">
                Send Message
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
