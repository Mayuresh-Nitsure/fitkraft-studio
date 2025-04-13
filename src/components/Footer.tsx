
import React from "react";
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer id="contact" className="bg-secondary/70 text-foreground py-16 border-t-4 border-primary relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-[300px] h-[300px] rounded-full bg-primary/5 blur-[60px]"></div>
        <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] rounded-full bg-primary/5 blur-[60px]"></div>
      </div>
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="text-2xl font-display font-extrabold mb-6 relative inline-block">
              FitKraft<span className="text-primary drop-shadow-sm">.</span>studio
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-primary/30"></span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-xs">
              Transforming fitness journeys in Karve Nagar, Pune through expert training, supportive community, and world-class facilities.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/fitkraft.shubhangi/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary hover:scale-110 transition-all duration-300 shadow-sm"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/fitkraftstudio"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary hover:scale-110 transition-all duration-300 shadow-sm"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.youtube.com/fitkraftstudio"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary hover:scale-110 transition-all duration-300 shadow-sm"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 relative inline-block">
              Quick Links
              <span className="absolute -bottom-1 left-0 w-1/2 h-1 bg-primary/30"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#hero" className="text-muted-foreground hover:text-primary transition-colors duration-300">Home</a>
              </li>
              <li>
                <a href="#about" className="text-muted-foreground hover:text-primary transition-colors duration-300">About Us</a>
              </li>
              <li>
                <a href="#features" className="text-muted-foreground hover:text-primary transition-colors duration-300">Key Features</a>
              </li>
              <li>
                <a href="#testimonials" className="text-muted-foreground hover:text-primary transition-colors duration-300">Testimonials</a>
              </li>
              <li>
                <a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors duration-300">Training Programs</a>
              </li>
              <li>
                <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors duration-300">Contact</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 relative inline-block">
              Services
              <span className="absolute -bottom-1 left-0 w-1/2 h-1 bg-primary/30"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <span className="text-muted-foreground">Strength Training</span>
              </li>
              <li>
                <span className="text-muted-foreground">Yoga Classes</span>
              </li>
              <li>
                <span className="text-muted-foreground">Aerobics & Dance</span>
              </li>
              <li>
                <span className="text-muted-foreground">Personal Training</span>
              </li>
              <li>
                <span className="text-muted-foreground">Nutrition Guidance</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 relative inline-block">
              Contact Us
              <span className="absolute -bottom-1 left-0 w-1/2 h-1 bg-primary/30"></span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-3 text-primary drop-shadow-sm" />
                <span className="text-muted-foreground">info@fitkraft.studio</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-3 text-primary drop-shadow-sm" />
                <span className="text-muted-foreground">+91 9699088367</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-primary drop-shadow-sm" />
                <span className="text-muted-foreground">
                  Plot no 41, no 4, gaurav, Alankar Society Rd,<br />
                  opp. shailesh Sabhagruha, Alankar Society,<br />
                  Ganesh Nagar, Karvenagar, Pune, Maharashtra 411052
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border text-center text-foreground/70 font-medium text-sm">
          <p className="relative inline-block">
            &copy; {new Date().getFullYear()} FitKraft Studio. All rights reserved.
            <span className="absolute -bottom-1 left-1/4 w-1/2 h-0.5 bg-primary/20"></span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
