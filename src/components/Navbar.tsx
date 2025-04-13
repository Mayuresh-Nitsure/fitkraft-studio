
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

import { useTheme } from "../providers/ThemeProvider";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Adapt navbar background based on theme
  const getNavbarBackground = () => {
    const scrolledClass = isScrolled ? "py-2 md:py-4 shadow-md border-b" : "py-3 md:py-6";

    if (theme === 'dark') {
      return `${scrolledClass} bg-gray-900/95 backdrop-blur-md border-gray-800`;
    } else if (theme === 'light') {
      return `${scrolledClass} bg-white/95 backdrop-blur-md border-gray-200`;
    } else if (theme === 'gold') {
      return `${scrolledClass} bg-amber-50/95 backdrop-blur-md border-amber-200`;
    }

    return `${scrolledClass} bg-gray-900/95 backdrop-blur-md border-gray-800`;
  };

  // Mobile menu background based on theme
  const getMobileMenuBackground = () => {
    if (theme === 'dark') {
      return "bg-gray-900/95 border-gray-800";
    } else if (theme === 'light') {
      return "bg-white/95 border-gray-200";
    } else if (theme === 'gold') {
      return "bg-amber-50/95 border-amber-200";
    }

    return "bg-gray-900/95 border-gray-800";
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${getNavbarBackground()}`}
    >
      <div className="container mx-auto px-3 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl md:text-2xl font-display font-bold text-primary flex items-center">
            <img
              alt="FitKraft Logo"
              className="h-6 md:h-8 w-auto mr-2"
              src="/lovable-uploads/d2b4f7f0-95f2-46c7-b725-7cf9df54b0ac.png"
            />
            FitKraft<span className="text-primary">.</span>studio
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex items-center space-x-6">
              <a href="#hero" className="nav-link">
                Home
              </a>
              <a href="#about" className="nav-link">
                About Us
              </a>
              <a href="#features" className="nav-link">
                Key Features
              </a>
              <a href="#testimonials" className="nav-link">
                Testimonials
              </a>
              <a href="#pricing" className="nav-link">
                Programs
              </a>
              <a href="#contact" className="nav-link">
                Contact
              </a>
            </nav>
            <div className="flex items-center space-x-4">
              <a href="#contact" className="btn-primary">
                Book a Free Class
              </a>
            </div>
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-primary" />
              ) : (
                <Menu className="h-6 w-6 text-primary" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className={`md:hidden absolute top-full left-0 right-0 shadow-lg border-t animate-fade-in ${getMobileMenuBackground()}`}>
          <nav className="flex flex-col space-y-4 px-6 py-8">
            <a
              href="#hero"
              className="text-foreground hover:text-primary py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </a>
            <a
              href="#about"
              className="text-foreground hover:text-primary py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About Us
            </a>
            <a
              href="#features"
              className="text-foreground hover:text-primary py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Key Features
            </a>
            <a
              href="#testimonials"
              className="text-foreground hover:text-primary py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Testimonials
            </a>
            <a
              href="#pricing"
              className="text-foreground hover:text-primary py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Programs
            </a>
            <a
              href="#contact"
              className="text-foreground hover:text-primary py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </a>
            <a
              href="#contact"
              className="btn-primary w-full text-center mt-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Book a Free Class
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
