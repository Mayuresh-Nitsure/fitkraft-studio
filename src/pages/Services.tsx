
import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ChevronRight, Dumbbell, Users, Target, Shield, MapPin } from "lucide-react";

const ServiceCard = ({
  title,
  description,
  icon,
  benefits,
  image,
  delay = 0
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  benefits: string[];
  image?: string;
  delay?: number;
}) => {
  return (
    <div
      className="glass-card overflow-hidden opacity-0 animate-fade-in flex flex-col h-full"
      style={{ animationDelay: `${delay}ms` }}
    >
      {image && (
        <div className="w-full h-56 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      )}

      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4">{description}</p>

        <div className="mt-auto">
          <h4 className="text-md font-semibold text-foreground mb-2">Key Benefits:</h4>
          <ul className="grid grid-cols-1 gap-y-2 text-sm">
            {benefits.slice(0, 3).map((benefit, index) => (
              <li key={index} className="flex items-start">
                <ChevronRight className="h-4 w-4 text-primary mr-1 mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const Services = () => {
  useEffect(() => {
    // Set page title
    document.title = "Our Services - Fitkraft Studio";
  }, []);

  const services = [
    {
      title: "Goal-Oriented Training",
      description: "Customized programs for your specific fitness targets.",
      icon: <Target className="h-6 w-6" />,
      benefits: [
        "Personalized workouts",
        "Nutrition guidance",
        "Progress tracking"
      ],
      image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      delay: 200
    },
    {
      title: "Buddy Training",
      description: "Train with friends for better motivation and results.",
      icon: <Users className="h-6 w-6" />,
      benefits: [
        "Group motivation",
        "Cost-effective training",
        "Scheduled accountability"
      ],
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      delay: 300
    },
    {
      title: "Personalized Training",
      description: "One-on-one sessions focused exclusively on you.",
      icon: <Dumbbell className="h-6 w-6" />,
      benefits: [
        "Custom programming",
        "Technique improvement",
        "Faster progress"
      ],
      image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      delay: 400
    },
    {
      title: "Health-Focused Training",
      description: "Programs designed around specific health needs.",
      icon: <Shield className="h-6 w-6" />,
      benefits: [
        "Safe exercise programs",
        "Rehabilitation support",
        "Improved quality of life"
      ],
      image: "https://images.unsplash.com/photo-1547919307-1ecb10702e6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      delay: 450
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="pt-28 pb-16 md:pt-32 md:pb-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <h1 className="font-display mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl opacity-0 animate-fade-in">
                Our <span className="text-primary">Services</span>
              </h1>
              <p className="text-muted-foreground opacity-0 animate-fade-in animate-delay-100">
                Transform your fitness with expert guidance
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-16">
              {services.map((service, index) => (
                <ServiceCard
                  key={index}
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  benefits={service.benefits}
                  image={service.image}
                  delay={service.delay}
                />
              ))}
            </div>

            <div className="glass-card p-6 md:p-8 mb-16 overflow-hidden opacity-0 animate-fade-in animate-delay-600">
              <div className="text-center mb-4">
                <h2 className="text-xl font-bold text-foreground mb-2">
                  <MapPin className="h-5 w-5 inline mr-2 text-primary" /> Our Location
                </h2>
                <p className="text-muted-foreground text-sm max-w-2xl mx-auto mb-4">
                  Plot no 41, no 4, gaurav, Alankar Society Rd, Karve Nagar, Pune, Maharashtra 411052
                </p>
              </div>

              <div className="w-full h-[300px] rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.7583363104007!2d73.81252807532395!3d18.49236408259097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bfb3a4119b77%3A0x16c006b37b1cca18!2sFITKRAFT!5e0!3m2!1sen!2sin!4v1719066642302!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="FitKraft Studio Location"
                  referrerPolicy="no-referrer-when-downgrade">
                </iframe>
              </div>
            </div>

            <div className="text-center max-w-2xl mx-auto opacity-0 animate-fade-in animate-delay-600">
              <h2 className="text-xl font-bold text-foreground mb-4">Ready to Transform Your Fitness?</h2>
              <p className="text-muted-foreground text-sm mb-6">
                Take the first step toward a healthier, stronger you.
              </p>
              <a href="/contact" className="btn-primary">
                Book a Free Trial Class
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
