
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MapPin, Mail, Phone, Send, Clock } from "lucide-react";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { supabase } from "../integrations/supabase/client";
import { toast } from "../hooks/use-toast";
import { Button } from "../components/ui/button";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Set page title
    document.title = "Contact Us - FitKraft Studio | Karve Nagar, Pune";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send form data to Supabase
      const { error } = await supabase
        .from('contact_submissions')
        .insert([
          { name, email, phone, message }
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
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="pt-32 pb-16 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center mb-16">
              <h1 className="font-display mb-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl opacity-0 animate-fade-in">
                Contact <span className="text-primary">Us</span>
              </h1>
              <p className="text-muted-foreground text-lg opacity-0 animate-fade-in animate-delay-100">
                Get in touch with our team to start your fitness journey
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-start mb-20">
              <div className="opacity-0 animate-fade-in animate-delay-200">
                <h2 className="text-2xl font-bold text-foreground mb-6">Reach Out to Us</h2>

                <div className="space-y-6 mb-8">
                  <div className="flex items-start">
                    <div className="mr-4 mt-1 h-10 w-10 flex-shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Visit Us</h3>
                      <p className="text-muted-foreground">
                        123 Fitness Street, Karve Nagar<br/>
                        Pune, Maharashtra 411052<br/>
                        India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-4 mt-1 h-10 w-10 flex-shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Email Us</h3>
                      <p className="text-muted-foreground">
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
                      <h3 className="text-lg font-semibold text-foreground">Call Us</h3>
                      <p className="text-muted-foreground">
                        +91 98765 43210<br/>
                        +91 12345 67890
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-4 mt-1 h-10 w-10 flex-shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Opening Hours</h3>
                      <p className="text-muted-foreground">
                        Monday to Friday: 6:00 AM - 9:00 AM, 6:00 PM - 8:00 PM<br/>
                        Saturday and Sunday: 7:00 AM - 8:00 PM
                      </p>
                    </div>
                  </div>
                </div>

                <div className="glass-card overflow-hidden rounded-xl h-64 md:h-80">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15134.325732280321!2d73.80646694614!3d18.4911897406789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bfb0e756d06d%3A0xbea4ce1dba221512!2sKarve%20Nagar%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1649835284523!5m2!1sen!2sin"
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

              <div className="glass-card p-8 opacity-0 animate-fade-in animate-delay-300">
                <h2 className="text-2xl font-bold text-foreground mb-6">Send Us a Message</h2>

                {submitted ? (
                  <div className="bg-primary/10 border border-primary/20 text-foreground px-4 py-3 rounded-lg mb-6">
                    <p className="font-medium">Message sent successfully!</p>
                    <p className="text-sm text-muted-foreground">We'll get back to you as soon as possible.</p>
                  </div>
                ) : null}

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Your Name
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
                      Email Address
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
                      Phone Number
                    </label>
                    <Input
                      type="tel"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full"
                      placeholder="+91 98765 43210"
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
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    {!isSubmitting && <Send className="ml-2 h-4 w-4" />}
                  </Button>
                </form>
              </div>
            </div>

            <div className="text-center max-w-3xl mx-auto opacity-0 animate-fade-in animate-delay-400">
              <h2 className="text-2xl font-bold text-foreground mb-6">Visit Us Today</h2>
              <p className="text-muted-foreground mb-8">
                We invite you to come and experience our studio in person. Drop by for a visit, meet our trainers,
                and see why FitKraft Studio is the preferred fitness destination in Karve Nagar, Pune.
              </p>
              <Button onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}>
                Book a Free Trial Class
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
