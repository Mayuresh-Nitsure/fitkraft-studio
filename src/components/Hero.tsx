
import React, { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
const Hero = () => {
  const spotlightRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current) return;
      const {
        clientX,
        clientY
      } = e;
      const x = clientX - window.innerWidth / 2;
      const y = clientY - window.innerHeight / 2;
      spotlightRef.current.style.transform = `translate(${x * 0.05}px, ${y * 0.05}px)`;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section id="hero" className="relative overflow-hidden pt-16 pb-0 md:pt-28 md:pb-8">
      <div className="spotlight animate-spotlight" />
      <div ref={spotlightRef} className="absolute inset-0 z-0">
        <div className="absolute -top-40 -right-40 h-[40rem] w-[40rem] rounded-full bg-primary/10 blur-[80px]"></div>
        <div className="absolute -bottom-40 -left-40 h-[40rem] w-[40rem] rounded-full bg-primary/5 blur-[80px]"></div>
        <div className="absolute top-1/4 left-1/4 h-[30rem] w-[30rem] rounded-full bg-primary/5 blur-[60px]"></div>
      </div>

      {/* Diagonal accent line */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-10 -right-10 w-[150px] h-[600px] bg-primary/10 rotate-[30deg] transform-gpu"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
          {/* Left Column - Text Content */}
          <div className="flex flex-col justify-center order-1 mt-0 mb-6 md:mb-0 md:ml-24">
            <div className="flex mb-6 opacity-0 animate-fade-in">
              <img src="/lovable-uploads/d2b4f7f0-95f2-46c7-b725-7cf9df54b0ac.png" alt="FitKraft Studio" className="h-14" />
            </div>

            <div className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground mb-6 w-fit opacity-0 animate-fade-in">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
              Karve Nagar, Pune
            </div>

            <h1 className="font-display mb-4 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl opacity-0 animate-fade-in animate-delay-100">
              <span className="text-primary drop-shadow-sm relative inline-block">
                FitKraft
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-primary/30"></span>
              </span> Studio
            </h1>

            <p className="mb-6 text-foreground/90 font-medium opacity-0 animate-fade-in animate-delay-200">
              Strong over skinny. Sustainable habits over crash diets.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4 opacity-0 animate-fade-in animate-delay-300">
              <a href="#contact" className="btn-primary">
                Book a Free Class
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a href="#pricing" className="btn-secondary">
                Training Programs
              </a>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="order-2 opacity-0 animate-fade-in animate-delay-200">
            <div className="glass-panel rounded-xl overflow-hidden shadow-lg border-l-4 border-primary relative h-[200px] md:h-[400px] max-w-[404px] md:max-w-none mx-auto">
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent z-10 pointer-events-none"></div>

              <img
                src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=404&h=300&q=80"
                alt="FitKraft Studio in Pune"
                className="w-full h-full object-cover rounded transform hover:scale-[1.02] transition-transform duration-500"
                loading="lazy"
                srcSet="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=404&h=300&q=80 404w, https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2675&h=1600&q=80 2675w"
                sizes="(max-width: 768px) 404px, 2675px"
              />

              {/* Decorative element */}
              <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-primary/20 rounded-full z-0"></div>
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary/30 rounded-full z-0"></div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mt-0 md:mt-4 mb-0 opacity-0 animate-fade-in animate-delay-400 stagger-children">
          <div className="glass-card p-4 text-center border-t-4 border-primary relative group">
            <div className="absolute inset-x-0 top-0 h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            <div className="text-3xl font-extrabold text-primary mb-1 drop-shadow-sm">5+</div>
            <div className="text-sm font-medium text-foreground/80">Years Experience</div>
          </div>
          <div className="glass-card p-4 text-center border-t-4 border-primary relative group">
            <div className="absolute inset-x-0 top-0 h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            <div className="text-3xl font-extrabold text-primary mb-1 drop-shadow-sm">500+</div>
            <div className="text-sm font-medium text-foreground/80">Happy Clients</div>
          </div>
          <div className="glass-card p-4 text-center border-t-4 border-primary relative group">
            <div className="absolute inset-x-0 top-0 h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            <div className="text-3xl font-extrabold text-primary mb-1 drop-shadow-sm">6</div>
            <div className="text-sm font-medium text-foreground/80">Training Programs</div>
          </div>
          <div className="glass-card p-4 text-center border-t-4 border-primary relative group">
            <div className="absolute inset-x-0 top-0 h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            <div className="text-3xl font-extrabold text-primary mb-1 drop-shadow-sm">4.9</div>
            <div className="text-sm font-medium text-foreground/80">Client Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;