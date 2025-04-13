import React from "react";
import { Award, Users, Clock, Target } from "lucide-react";

const About = () => {
  const stats = [
    {
      icon: <Award className="h-6 w-6" />,
      value: "5+",
      label: "Years Experience",
    },
    {
      icon: <Users className="h-6 w-6" />,
      value: "500+",
      label: "Happy Clients",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      value: "6",
      label: "Training Programs",
    },
    {
      icon: <Target className="h-6 w-6" />,
      value: "4.9",
      label: "Client Rating",
    },
  ];

  return (
    <section id="about" className="pt-0 pb-6 md:py-16 bg-background relative mt-0">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-[300px] h-[300px] rounded-full bg-primary/5 blur-[60px]"></div>
        <div className="absolute bottom-20 right-20 w-[200px] h-[200px] rounded-full bg-primary/5 blur-[40px]"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6 -mt-4 md:mt-0">
        <div className="mx-auto max-w-3xl text-center mb-10">
          <h2 className="font-display mb-3 text-3xl font-extrabold text-foreground md:text-4xl opacity-0 animate-fade-in animate-on-scroll">
            <span className="text-primary drop-shadow-sm relative inline-block">
              About
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-primary/30"></span>
            </span> Us
          </h2>
          <p className="text-foreground/80 font-medium opacity-0 animate-fade-in animate-delay-100 animate-on-scroll">
            Your fitness journey starts with us
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center mb-8 md:mb-12 animate-on-scroll">
          <div className="glass-card p-0 overflow-hidden shadow-lg border-l-4 border-primary relative">
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent z-10 pointer-events-none"></div>

            <img
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80"
              alt="FitKraft Studio Team"
              className="w-full h-full object-cover transform hover:scale-[1.02] transition-transform duration-500"
              loading="lazy"
            />

            {/* Decorative element */}
            <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-primary/20 rounded-full z-0"></div>
            <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary/30 rounded-full z-0"></div>
          </div>

          <div className="flex flex-col space-y-6">
            <h3 className="text-2xl font-extrabold text-foreground">Our Story</h3>
            <p className="text-foreground/80 font-medium">
              Founded in 2018, FitKraft Studio has been transforming fitness journeys in Karve Nagar, Pune.
              Our mission is to provide personalized fitness solutions that fit your lifestyle and goals.
            </p>
            <p className="text-foreground/80 font-medium">
              We believe in building strong, sustainable habits rather than promoting quick fixes.
              Our expert trainers work closely with you to develop programs that evolve as you progress.
            </p>

            <div className="grid grid-cols-2 gap-3 md:gap-4 mt-4 stagger-children">
              {stats.map((stat, index) => (
                <div key={index} className="glass-card p-4 text-center border-t-4 border-primary relative group">
                  <div className="absolute inset-x-0 top-0 h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  <div className="text-3xl font-extrabold text-primary mb-1 drop-shadow-sm">{stat.value}</div>
                  <div className="text-sm font-medium text-foreground/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
