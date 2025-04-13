
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    content: "Fitkraft is your space of positive energy where progress meets support, and every step of your fitness journey feels right.",
    author: "Priya Sharma",
    role: "Member since 2022",
    avatar: "https://randomuser.me/api/portraits/women/42.jpg",
    rating: 5
  },
  {
    id: 2,
    content: "FitKraft keeps workouts fresh, personal, and highly motivating.",
    author: "Rahul Desai",
    role: "Software Engineer",
    avatar: "https://randomuser.me/api/portraits/men/76.jpg",
    rating: 5
  },
  {
    id: 3,
    content: "It's been two months; loving the energy here.",
    author: "Anjali Patil",
    role: "Yoga Enthusiast",
    avatar: "https://randomuser.me/api/portraits/women/63.jpg",
    rating: 5
  },
  {
    id: 4,
    content: "FitKraft reform program worked - 12 kgs gone!",
    author: "Vikram Joshi",
    role: "Regular Member",
    avatar: "https://randomuser.me/api/portraits/men/69.jpg",
    rating: 5
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section id="testimonials" className="py-6 md:py-16 bg-background relative">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-[300px] h-[300px] rounded-full bg-primary/5 blur-[60px]"></div>
        <div className="absolute bottom-20 left-20 w-[200px] h-[200px] rounded-full bg-primary/5 blur-[40px]"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center mb-10">
          <h2 className="font-display mb-3 text-3xl font-extrabold text-foreground md:text-4xl opacity-0 animate-fade-in animate-on-scroll">
            <span className="text-primary drop-shadow-sm relative inline-block">
              Testimonials
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-primary/30"></span>
            </span>
          </h2>
          <p className="text-foreground/80 font-medium opacity-0 animate-fade-in animate-delay-100 animate-on-scroll">
            Hear from our community members
          </p>

          {/* Decorative quote marks */}
          <div className="relative mt-8 mb-4 opacity-0 animate-fade-in animate-delay-150 animate-on-scroll">
            <Quote className="h-8 w-8 text-primary/20 absolute -top-4 left-1/2 -translate-x-1/2" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 opacity-0 animate-fade-in animate-delay-200 animate-on-scroll stagger-children">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id} className="glass-card p-4 md:p-6 flex flex-col h-full border-t-4 border-primary group hover:translate-y-[-5px] transition-transform duration-300">
              <div className="flex items-center mb-4">
                <div className="relative mr-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover border-2 border-primary shadow-md group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-sm">
                    <Quote className="h-3 w-3" />
                  </div>
                </div>
                <div>
                  <p className="font-bold text-foreground text-sm group-hover:text-primary transition-colors duration-300">{testimonial.author}</p>
                  <p className="text-foreground/70 text-xs">{testimonial.role}</p>
                </div>
              </div>

              <blockquote className="text-sm text-foreground leading-relaxed flex-grow font-medium">
                "{testimonial.content}"
              </blockquote>

              <div className="flex mt-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
            </div>
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

export default Testimonials;
