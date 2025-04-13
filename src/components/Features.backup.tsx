import React from "react";
import { Dumbbell, FlameIcon, Users, Clock, Target, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const FeatureCard = ({
  icon,
  title,
  description,
  image,
  index
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  image?: string;
  index: number;
}) => {
  return (
    <div
      className="glass-card p-0 overflow-hidden opacity-0 animate-fade-in flex flex-col h-full group"
      style={{ animationDelay: `${index * 100 + 200}ms` }}
    >
      {image && (
        <div className="w-full h-56 overflow-hidden relative">
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>

          {/* Decorative corner accent */}
          <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-r-[40px] border-t-primary/30 border-r-transparent z-10"></div>

          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 shadow-inner"
          />
        </div>
      )}

      <div className="p-4 md:p-6 flex flex-col flex-grow">
        <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-primary shadow-md group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="mb-2 text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">{title}</h3>
        <p className="text-foreground/80 text-sm font-medium">{description}</p>

        {/* Subtle indicator for interaction */}
        <div className="mt-4 h-0.5 w-6 bg-primary/30 group-hover:w-12 transition-all duration-300"></div>
      </div>
    </div>
  );
};

const Features = () => {
  const features = [
    {
      icon: <Dumbbell className="h-6 w-6" />,
      title: "Goal Training",
      description: "Custom programs for your specific fitness targets",
      image: "/images/goal_training.png"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Buddy Training",
      description: "Train with friends for better motivation",
      image: "/images/buddy_training.png"
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Personal Training",
      description: "One-on-one sessions tailored to your needs",
      image: "/images/personal_training.png"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Health Focus",
      description: "Programs for health concerns or rehabilitation",
      image: "/images/health_focus.png"
    },
    {
      icon: <FlameIcon className="h-6 w-6" />,
      title: "Diverse Workouts",
      description: "Strength, cardio, yoga, HIIT, and more",
      image: "/images/diverse_workouts.png"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Flexible Schedule",
      description: "Morning, evening, and online options",
      image: "/images/flexible_schedule.png"
    }
  ];

  return (
    <section id="features" className="py-6 md:py-16 bg-secondary/30 relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -bottom-10 -left-10 w-[200px] h-[200px] rounded-full bg-primary/5"></div>
        <div className="absolute top-1/4 right-0 w-[150px] h-[500px] bg-primary/5 -rotate-45"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center mb-10">
          <h2 className="font-display mb-3 text-3xl font-extrabold text-foreground md:text-4xl opacity-0 animate-fade-in animate-on-scroll">
            Our <span className="text-primary drop-shadow-sm relative inline-block">
              Services
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-primary/30"></span>
            </span>
          </h2>
          <p className="text-foreground/80 font-medium opacity-0 animate-fade-in animate-delay-100 animate-on-scroll">
            Transform your fitness journey with expert guidance
          </p>
        </div>

        <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 animate-on-scroll stagger-children">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              image={feature.image}
              index={index}
            />
          ))}
        </div>

        {/* Decorative divider */}
        <div className="mt-16 max-w-md mx-auto flex items-center gap-4">
          <div className="h-0.5 flex-grow bg-primary/20"></div>
          <div className="h-2 w-2 rounded-full bg-primary/40"></div>
          <div className="h-0.5 flex-grow bg-primary/20"></div>
        </div>
      </div>
    </section>
  );
};

export default Features;
