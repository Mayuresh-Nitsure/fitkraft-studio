import React, { useState } from "react";
import { MapPin, Mail, Phone, Send, Clock } from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { supabase } from "../integrations/supabase/client";
import { toast } from "../hooks/use-toast";
import { Button } from "./ui/button";

const ContactSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [interests, setInterests] = useState({
    buddyTraining: false,
    personalTraining: false,
    batchTraining: false,
    nutritionGuidance: false,
    yoga: false,
    aerobics: false
  });

  // Function to handle program selection
  const handleProgramSelection = (program: string) => {
    console.log('Handling program selection:', program);
    // Convert program name to interest key
    const programToInterestMap: Record<string, keyof typeof interests> = {
      'Personal Training': 'personalTraining',
      'Buddy Training': 'buddyTraining',
      'Batch Training': 'batchTraining',  // Match the exact title from CTASection
      'Nutrition Guidance': 'nutritionGuidance',
      'Yoga Classes': 'yoga',
      'Aerobics': 'aerobics'
    };

    const interestKey = programToInterestMap[program];
    console.log('Interest key:', interestKey);
    if (interestKey) {
      console.log('Setting interest:', interestKey, 'to true');
      setInterests(prev => {
        const newInterests = {
          ...prev,
          [interestKey]: true
        };
        console.log('New interests:', newInterests);
        return newInterests;
      });
    }
  };

  // Check for selected program from localStorage and listen for custom events
  React.useEffect(() => {
    // Check localStorage for selected program
    const selectedProgram = localStorage.getItem('selectedProgram');
    console.log('Selected program from localStorage:', selectedProgram);
    if (selectedProgram) {
      handleProgramSelection(selectedProgram);
      // Clear localStorage after using it
      localStorage.removeItem('selectedProgram');
    }

    // Listen for custom events
    const handleEvent = (event: CustomEvent<{program: string}>) => {
      console.log('Received custom event with program:', event.detail.program);
      handleProgramSelection(event.detail.program);
    };

    // Add event listener
    document.addEventListener('programSelected', handleEvent as EventListener);

    // Clean up
    return () => {
      document.removeEventListener('programSelected', handleEvent as EventListener);
    };
  }, []);

  const handleInterestChange = (interest: string) => {
    setInterests(prev => ({
      ...prev,
      [interest]: !prev[interest as keyof typeof prev]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if at least one interest is selected
    const hasSelectedInterest = Object.values(interests).some(value => value === true);
    if (!hasSelectedInterest) {
      toast({
        title: "Please select at least one interest",
        description: "Let us know what you're interested in.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Get selected interests as a string
      const selectedInterests = Object.entries(interests)
        .filter(([_, isSelected]) => isSelected)
        .map(([interest, _]) => {
          // Convert camelCase to readable format
          return interest
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase());
        })
        .join(', ');

      // Send form data to Supabase
      const { error } = await supabase
        .from('contact_submissions')
        .insert([
          { name, email, phone, message, interests: selectedInterests }
        ]);

      if (error) {
        throw error;
      }

      // Show success toast
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });

      setSubmitted(true);

      // Reset form
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");

      // Reset submission status after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error sending message",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-6 md:py-16 bg-background relative">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-[300px] h-[300px] rounded-full bg-primary/5 blur-[60px]"></div>
        <div className="absolute bottom-20 right-20 w-[200px] h-[200px] rounded-full bg-primary/5 blur-[40px]"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center mb-10">
          <h2 className="font-display mb-3 text-3xl font-extrabold text-foreground md:text-4xl opacity-0 animate-fade-in animate-on-scroll">
            <span className="text-primary drop-shadow-sm relative inline-block">
              Contact
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-primary/30"></span>
            </span> Us
          </h2>
          <p className="text-foreground/80 font-medium opacity-0 animate-fade-in animate-delay-100 animate-on-scroll">
            Get in touch with our team to start your fitness journey
          </p>
        </div>

        <div className="mb-8 md:mb-12 animate-on-scroll">
          {/* Contact Info and Form Row (desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
            {/* Contact Info Card - Left side on desktop */}
            <div className="glass-card p-6 md:p-8 opacity-0 animate-fade-in animate-delay-200 border-l-4 border-primary h-full">
              <h3 className="text-xl font-bold text-foreground mb-6">Reach Out to Us</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mr-4 mt-1 h-10 w-10 flex-shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground">Visit Us</h4>
                    <p className="text-foreground/80 font-medium">
                      Plot no 41, no 4, gaurav, Alankar Society Rd,<br/>
                      opp. shailesh Sabhagruha, Alankar Society,<br/>
                      Ganesh Nagar, Karvenagar, Pune, Maharashtra 411052
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 mt-1 h-10 w-10 flex-shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground">Email Us</h4>
                    <p className="text-foreground/80 font-medium">
                      info@fitkraft.studio<br/>
                      support@fitkraft.studio
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 mt-1 h-10 w-10 flex-shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground">Call Us</h4>
                    <p className="text-foreground/80 font-medium">
                      +91 9699088367
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 mt-1 h-10 w-10 flex-shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground">Opening Hours</h4>
                    <p className="text-foreground/80 font-medium">
                      Monday to Friday: 6:00 AM - 10:00 AM, 7:00 PM - 8:00 PM
                    </p>
                  </div>
                </div>


              </div>
            </div>

            {/* Contact Form Card - Right side on desktop */}
            <div className="glass-card p-6 md:p-8 opacity-0 animate-fade-in animate-delay-300 border-r-4 border-primary h-full">
              <h3 className="text-xl font-bold text-foreground mb-6">Send Us a Message</h3>

              {submitted ? (
                <div className="bg-primary/10 border border-primary/20 text-foreground px-4 py-3 rounded-lg mb-6">
                  <p className="font-medium">Message sent successfully!</p>
                  <p className="text-sm text-foreground/80">We'll get back to you as soon as possible.</p>
                </div>
              ) : null}

            <form id="contact-form" onSubmit={handleSubmit} className="flex-grow flex flex-col justify-between">
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-3">
                  I'm Interested In: <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="buddyTraining"
                      checked={interests.buddyTraining}
                      onChange={() => handleInterestChange('buddyTraining')}
                      className="mr-2 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor="buddyTraining" className="text-sm text-foreground">Buddy Training</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="personalTraining"
                      checked={interests.personalTraining}
                      onChange={() => handleInterestChange('personalTraining')}
                      className="mr-2 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor="personalTraining" className="text-sm text-foreground">Personal Training</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="batchTraining"
                      checked={interests.batchTraining}
                      onChange={() => handleInterestChange('batchTraining')}
                      className="mr-2 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor="batchTraining" className="text-sm text-foreground">Batch Training</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="nutritionGuidance"
                      checked={interests.nutritionGuidance}
                      onChange={() => handleInterestChange('nutritionGuidance')}
                      className="mr-2 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor="nutritionGuidance" className="text-sm text-foreground">Nutrition Guidance</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="yoga"
                      checked={interests.yoga}
                      onChange={() => handleInterestChange('yoga')}
                      className="mr-2 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor="yoga" className="text-sm text-foreground">Yoga</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="aerobics"
                      checked={interests.aerobics}
                      onChange={() => handleInterestChange('aerobics')}
                      className="mr-2 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor="aerobics" className="text-sm text-foreground">Aerobics</label>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <Input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full"
                  placeholder="+91 98765 43210"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Your Message
                </label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full"
                  rows={5}
                  placeholder="I'd like to inquire about..."
                />
              </div>

              <div className="mt-auto pt-4">
                <Button
                  type="submit"
                  className="w-full btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  {!isSubmitting && <Send className="ml-2 h-4 w-4" />}
                </Button>
              </div>
            </form>
          </div>
          </div>

          {/* Map Section - Full width below on desktop */}
          <div className="glass-card overflow-hidden rounded-xl opacity-0 animate-fade-in animate-delay-400 border-b-4 border-primary">
            <div className="h-64 md:h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.8867780076636!2d73.81324907497906!3d18.48651168259752!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf8c1c7562f5%3A0x59f9b10f0b2a54e7!2sPlot%20No.%2041%2C%20Alankar%20Society%20Rd%2C%20Alankar%20Society%2C%20Ganesh%20Nagar%2C%20Karvenagar%2C%20Pune%2C%20Maharashtra%20411052!5e0!3m2!1sen!2sin!4v1718102066619!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="FitKraft Studio Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
