
import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import CTASection from "../components/CTASection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import { initNavigation } from "../lib/navigation-utils";

const observeElements = () => {
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
};

const Index = () => {
  useEffect(() => {
    // Set page title
    document.title = "FitKraft Studio - Transform Your Fitness Journey";

    // Initialize intersection observer for scroll animations
    observeElements();

    // Initialize navigation (smooth scrolling and active section highlighting)
    const cleanupNavigation = initNavigation();

    // Clean up on component unmount
    return () => {
      cleanupNavigation();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Features />
        <Testimonials />
        <CTASection />
        <ContactSection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
