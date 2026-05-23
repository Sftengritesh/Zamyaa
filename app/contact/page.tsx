"use client";

import { useState } from "react";
import SectionHeader from "@/components/shared/SectionHeader";
import RevealOnScroll from "@/components/shared/RevealOnScroll";
import Button from "@/components/ui/Button";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    appointmentType: "Virtual Styling Session",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        appointmentType: "Virtual Styling Session",
        message: "",
      });
    }, 1500);
  };

  return (
    <main className="py-20 md:py-[100px] px-[8%] min-h-screen">
      <div className="max-w-[1400px] mx-auto">
        <SectionHeader
          label="Connect with us"
          title="Atelier Consultation"
          centered
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-16 items-start">
          {/* Contact Information */}
          <RevealOnScroll className="space-y-12">
            <div>
              <span className="text-xs tracking-[0.2em] uppercase text-accent font-semibold block mb-4">
                Boutique Atelier
              </span>
              <h3 className="text-3xl font-heading text-foreground mb-6 font-light">
                Experience Handcrafted Elegance In Person
              </h3>
              <p className="text-muted leading-relaxed font-body">
                Our custom private suites are available for personal styling sessions, bridal orders, and design consultations. Book an appointment below or connect via direct channels.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <MapPin className="text-accent mt-1 flex-shrink-0" size={20} />
                <div>
                  <h4 className="font-body text-sm font-semibold uppercase text-foreground mb-1">
                    Location Address
                  </h4>
                  <p className="text-muted text-sm leading-relaxed">
                    Zamyaa Haute Couture Boutique, High Street, Mumbai, India
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <Phone className="text-accent mt-1 flex-shrink-0" size={20} />
                <div>
                  <h4 className="font-body text-sm font-semibold uppercase text-foreground mb-1">
                    Call / WhatsApp
                  </h4>
                  <p className="text-muted text-sm leading-relaxed">
                    +91 98765 43210 (Consultation Hotlines)
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <Mail className="text-accent mt-1 flex-shrink-0" size={20} />
                <div>
                  <h4 className="font-body text-sm font-semibold uppercase text-foreground mb-1">
                    Email Inquiry
                  </h4>
                  <p className="text-muted text-sm leading-relaxed">
                    hello@zamyaa.com / boutique@zamyaa.com
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <Clock className="text-accent mt-1 flex-shrink-0" size={20} />
                <div>
                  <h4 className="font-body text-sm font-semibold uppercase text-foreground mb-1">
                    Boutique Hours
                  </h4>
                  <p className="text-muted text-sm leading-relaxed">
                    Mon - Sat: 11:00 AM - 8:00 PM (By Appointment Only)
                  </p>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Form Booking */}
          <RevealOnScroll delay={1} className="bg-card rounded-[40px] shadow-card border border-border p-8 md:p-12">
            <h3 className="text-2xl font-heading text-foreground mb-8 font-light">
              Book a Consultation
            </h3>

            {submitted ? (
              <div className="text-center py-10">
                <span className="text-4xl block mb-4">✨</span>
                <h4 className="text-xl font-heading text-accent mb-2">Request Received</h4>
                <p className="text-muted text-sm leading-relaxed max-w-sm mx-auto">
                  Our private salon representative will connect with you shortly via WhatsApp/Email to confirm your preferred time slot.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs uppercase font-bold text-foreground mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-background border border-border rounded-xl px-4 py-3.5 text-sm text-foreground focus:border-accent focus:ring-1 focus:ring-accent outline-none"
                    placeholder="Enter name"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase font-bold text-foreground mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-background border border-border rounded-xl px-4 py-3.5 text-sm text-foreground focus:border-accent focus:ring-1 focus:ring-accent outline-none"
                      placeholder="Enter email"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-bold text-foreground mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-background border border-border rounded-xl px-4 py-3.5 text-sm text-foreground focus:border-accent focus:ring-1 focus:ring-accent outline-none"
                      placeholder="Phone with country code"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold text-foreground mb-2">
                    Consultation Type
                  </label>
                  <select
                    value={formData.appointmentType}
                    onChange={(e) => setFormData({ ...formData, appointmentType: e.target.value })}
                    className="w-full bg-background border border-border rounded-xl px-4 py-3.5 text-sm text-foreground focus:border-accent focus:ring-1 focus:ring-accent outline-none appearance-none cursor-pointer"
                  >
                    <option>Virtual Styling Session</option>
                    <option>Bespoke Bridal Consult</option>
                    <option>Boutique Fitting Visit</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold text-foreground mb-2">
                    Notes / Requirements (Optional)
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-background border border-border rounded-xl px-4 py-3.5 text-sm text-foreground focus:border-accent focus:ring-1 focus:ring-accent outline-none"
                    placeholder="Tell us about the design/outfit you are looking for..."
                  />
                </div>

                <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting Request..." : "Request Appointment"}
                </Button>
              </form>
            )}
          </RevealOnScroll>
        </div>
      </div>
    </main>
  );
}
