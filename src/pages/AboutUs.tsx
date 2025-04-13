
import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Users, Heart, Award, Clock } from "lucide-react";

const AboutUs = () => {
  useEffect(() => {
    // Set page title
    document.title = "About Us - FitKraft Studio | Karve Nagar, Pune";
    
    // Initialize intersection observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="pt-28 pb-16 md:pt-32 md:pb-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <h1 className="font-display mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl opacity-0 animate-fade-in">
                About <span className="text-primary">FitKraft</span> Studio
              </h1>
              <p className="text-muted-foreground opacity-0 animate-fade-in animate-delay-100">
                Your premier fitness destination in Karve Nagar, Pune
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-16">
              <div className="opacity-0 animate-fade-in animate-delay-200">
                <h2 className="text-2xl font-bold text-foreground mb-4">Our Story</h2>
                <p className="text-muted-foreground mb-3">
                  Founded in 2018, FitKraft Studio grew from a small personal training service into one of Karve Nagar's most beloved fitness studios.
                </p>
                <p className="text-muted-foreground mb-3">
                  Our founder's 15+ years of experience in fitness training created a studio that combines scientific methods with a supportive community atmosphere.
                </p>
                <p className="text-muted-foreground">
                  Today, we offer comprehensive services including strength training, yoga, and aerobics, all designed to help our members achieve their fitness goals.
                </p>
              </div>
              <div className="glass-card overflow-hidden opacity-0 animate-fade-in animate-delay-300">
                <img 
                  src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80" 
                  alt="FitKraft Studio" 
                  className="w-full h-auto rounded-xl"
                />
              </div>
            </div>
            
            <div className="bg-secondary/30 rounded-xl p-6 md:p-8 mb-16 opacity-0 animate-fade-in animate-delay-400">
              <div className="grid md:grid-cols-2 gap-6 md:gap-12">
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-3">Our Mission</h2>
                  <p className="text-muted-foreground text-sm">
                    To empower individuals in Pune to lead healthier lives through accessible, effective fitness programs, creating a supportive community where everyone feels welcome.
                  </p>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-3">Our Values</h2>
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    <li className="flex items-start">
                      <Heart className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">Passion for health</span>
                    </li>
                    <li className="flex items-start">
                      <Users className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">Community support</span>
                    </li>
                    <li className="flex items-start">
                      <Award className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">Training excellence</span>
                    </li>
                    <li className="flex items-start">
                      <Clock className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">Results commitment</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="text-center mb-12 opacity-0 animate-fade-in animate-delay-500">
              <h2 className="text-2xl font-bold text-foreground mb-6">Why Choose FitKraft Studio?</h2>
              <div className="grid md:grid-cols-3 gap-5">
                <div className="glass-card p-5">
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Users className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Expert Trainers</h3>
                  <p className="text-muted-foreground text-sm">Certified professionals dedicated to your fitness success</p>
                </div>
                <div className="glass-card p-5">
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Award className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Modern Facility</h3>
                  <p className="text-muted-foreground text-sm">State-of-the-art equipment in a clean, welcoming environment</p>
                </div>
                <div className="glass-card p-5">
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Heart className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Supportive Community</h3>
                  <p className="text-muted-foreground text-sm">Join a family of fitness enthusiasts who motivate each other</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
