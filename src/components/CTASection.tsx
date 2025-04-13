
import React from "react";
import { Check, ArrowRight, MessageCircle } from "lucide-react";

const PricingCard = ({
  title,
  price,
  description,
  features,
  isPopular = false,
  showPopularBadge = true,
  delay = 0,
  showPrice = true
}: {
  title: string;
  price?: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  showPopularBadge?: boolean;
  delay?: number;
  showPrice?: boolean;
}) => {
  return (
    <div
      className={`glass-card p-6 relative opacity-0 animate-fade-in h-full flex flex-col group ${isPopular ? 'border-t-4 border-primary pt-7' : ''}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-0 h-0 border-t-[30px] border-r-[30px] border-t-primary/10 border-r-transparent z-0"></div>

      {isPopular && showPopularBadge && (
        <div className="absolute -top-2 right-6 bg-primary text-primary-foreground text-xs font-bold py-1 px-3 rounded-full shadow-md z-20">
          Popular
        </div>
      )}
      <h3 className="text-xl font-extrabold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">{title}</h3>
      {showPrice && price ? (
        <div className="mb-3">
          <span className="text-2xl font-extrabold text-primary">₹{price}</span>
          <span className="text-foreground/70 text-sm font-medium">/month</span>
        </div>
      ) : (
        <div className="mb-3 h-8 flex items-center">
          <span className="text-foreground/70 text-sm font-medium">Contact for pricing</span>
        </div>
      )}
      <p className="text-foreground/80 text-sm font-medium mb-3">{description}</p>
      <ul className="mb-5 space-y-2 text-sm flex-grow">
        {features.slice(0, 4).map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-foreground/80 font-medium">{feature}</span>
          </li>
        ))}
      </ul>
      <a
        href="#contact"
        className={`w-full text-center py-2 px-4 rounded-full text-sm font-bold transition-all duration-300 relative overflow-hidden ${
          isPopular
            ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg"
            : "bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:shadow-md"
        }`}
        onClick={() => {
          // Store the selected program in localStorage
          localStorage.setItem('selectedProgram', title);
          console.log('Stored in localStorage:', title);

          // Create a custom event to notify the ContactSection
          const event = new CustomEvent('programSelected', { detail: { program: title } });
          document.dispatchEvent(event);
          console.log('Dispatched event with program:', title);

          // Scroll to contact section
          const contactSection = document.getElementById('contact');
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      >
        <span className="relative z-10">Get Started</span>
        <span className="absolute inset-0 h-full w-full bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
      </a>
    </div>
  );
};

const CTASection = () => {
  const pricingPlans = [
    {
      title: "Batch Training",
      price: "2,500",
      description: "Group training sessions",
      features: [
        "5 days weekly workouts",
        "Strength & cardio training",
        "Morning & evening batches",
        "Community motivation"
      ],
      isPopular: true,
      showPopularBadge: true,
      delay: 200,
      showPrice: true
    },
    {
      title: "Buddy Training",
      description: "Train with friends",
      features: [
        "Small group (2-3 people)",
        "Custom workout plans",
        "Flexible scheduling",
        "Mutual accountability"
      ],
      isPopular: true,
      showPopularBadge: false,
      delay: 300,
      showPrice: false
    },
    {
      title: "Personal Training",
      description: "One-on-one sessions",
      features: [
        "45-60 minute sessions",
        "Personalized attention",
        "Custom programming",
        "Nutrition guidance"
      ],
      isPopular: true,
      showPopularBadge: false,
      delay: 400,
      showPrice: false
    }
  ];

  return (
    <section id="pricing" className="py-6 md:py-16 bg-secondary/30 relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-0 w-[300px] h-[300px] rounded-full bg-primary/5 blur-[60px]"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[80px]"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center mb-10">
          <h2 className="font-display mb-3 text-3xl font-extrabold text-foreground md:text-4xl opacity-0 animate-fade-in animate-on-scroll">
            Training <span className="text-primary drop-shadow-sm relative inline-block">
              Programs
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-primary/30"></span>
            </span>
          </h2>
          <p className="text-foreground/80 font-medium opacity-0 animate-fade-in animate-delay-100 animate-on-scroll">
            Choose your fitness path
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto animate-on-scroll stagger-children">
          {pricingPlans.map((plan, index) => (
            <PricingCard
              key={index}
              title={plan.title}
              price={plan.price}
              description={plan.description}
              features={plan.features}
              isPopular={plan.isPopular}
              showPopularBadge={plan.showPopularBadge}
              delay={plan.delay}
              showPrice={plan.showPrice}
            />
          ))}
        </div>

        {/* Start Your Journey section removed */}
      </div>
    </section>
  );
};

export default CTASection;
