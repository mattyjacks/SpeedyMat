import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
  Shirt,
  Truck,
  Zap,
  Star,
  MapPin,
  Clock,
  CheckCircle,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

export const metadata = {
  title: "SpeedyMat - Professional Laundry Services in Phoenix",
  description:
    "Full-service laundry facility with wash & fold, pickup & delivery, and commercial services in Phoenix, Arizona.",
};

export default function Design2Page() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Professional Laundry Services in Phoenix
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 mb-8 leading-relaxed">
              SpeedyMat is a full-service laundry facility offering self-service washing, expert wash & fold service, and convenient pickup & delivery for residential and commercial customers throughout the Phoenix area.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/dashboard/schedule"
                className="inline-flex items-center gap-2 rounded-lg bg-amber-400 px-6 py-3 font-semibold text-slate-900 hover:bg-amber-300 transition-all shadow-lg"
              >
                Schedule a Pickup
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-white/30 bg-white/10 backdrop-blur px-6 py-3 font-semibold text-white hover:bg-white/20 transition-all"
              >
                View Design #1
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 sm:py-28 bg-slate-50 dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
            SpeedyMat Has You Covered
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Shirt,
                title: "Self-Service Laundry",
                desc: "Access to 50+ commercial-grade washers and dryers. Fully attended facility with attendants available to assist.",
                link: "/customers",
              },
              {
                icon: Zap,
                title: "Wash & Fold Service",
                desc: "Drop off your laundry and we'll have it professionally cleaned and neatly folded within 24 hours.",
                link: "/customers",
              },
              {
                icon: Truck,
                title: "Pickup & Delivery",
                desc: "We come to you! Schedule a pickup and we'll collect, clean, and deliver your laundry back within 24 hours.",
                link: "/customers",
              },
              {
                icon: CheckCircle,
                title: "Commercial Services",
                desc: "Special pricing and dedicated service for businesses. Contact us for custom laundry solutions.",
                link: "/customers",
              },
            ].map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.title}
                  href={service.link}
                  className="group rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-8 hover:shadow-lg transition-all hover:border-primary/50"
                >
                  <Icon className="h-10 w-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    {service.desc}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
            Simple, Transparent Pricing
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                service: "Wash & Fold",
                price: "$2.50/lb",
                time: "24 Hours",
                min: "$15 minimum",
                features: [
                  "Professional washing",
                  "Expert folding",
                  "Same-day available",
                  "Free delivery (orders $50+)",
                ],
              },
              {
                service: "Pickup & Delivery",
                price: "$2.99/lb",
                time: "24 Hours",
                min: "$20 minimum",
                features: [
                  "We pick up from you",
                  "Professional cleaning",
                  "We deliver back",
                  "Flexible scheduling",
                ],
                featured: true,
              },
              {
                service: "Self-Service",
                price: "$2.00/load",
                time: "Varies",
                min: "Per load",
                features: [
                  "Commercial machines",
                  "Fully attended facility",
                  "Free Wi-Fi",
                  "Snacks & beverages",
                ],
              },
            ].map((pricing) => (
              <div
                key={pricing.service}
                className={`rounded-xl border p-8 transition-all ${
                  pricing.featured
                    ? "border-primary bg-gradient-to-br from-primary/10 to-primary/5 shadow-lg scale-105"
                    : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:shadow-lg"
                }`}
              >
                <h3 className="text-2xl font-bold mb-2">{pricing.service}</h3>
                <div className="mb-6">
                  <div className="text-4xl font-bold text-primary mb-1">
                    {pricing.price}
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {pricing.time} turnaround • {pricing.min}
                  </p>
                </div>
                <ul className="space-y-3 mb-8">
                  {pricing.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/dashboard/schedule"
                  className={`block text-center rounded-lg py-2.5 font-semibold transition-all ${
                    pricing.featured
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700"
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 sm:py-28 bg-slate-50 dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                About SpeedyMat
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                SpeedyMat is a locally owned and operated laundry facility dedicated to making your laundry experience as convenient and stress-free as possible. Our modern 8,000 square foot facility in Phoenix features over 50 commercial-grade washers and dryers, all maintained to the highest standards.
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                Whether you prefer self-service laundry, professional wash & fold, or our convenient pickup & delivery service, SpeedyMat has the solution for you. Our facility is fully attended during all operating hours, with friendly staff ready to assist with any laundry needs.
              </p>
              <div className="space-y-4">
                {[
                  "Open 6am - 10pm Daily",
                  "50+ Commercial Machines",
                  "Fully Attended Facility",
                  "Free Wi-Fi & Amenities",
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                    <span className="font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl p-12 border border-primary/20">
              <div className="space-y-8">
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">
                    20+
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">
                    Years of laundry excellence
                  </p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">
                    5,000+
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">
                    Happy customers served
                  </p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">
                    4.8★
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">
                    Average customer rating
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
            What Our Customers Are Saying
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                text: "SpeedyMat's wash & fold service is a lifesaver! My clothes come back perfectly folded and smelling fresh. The staff is always friendly and helpful.",
                author: "Sarah M.",
                rating: 5,
              },
              {
                text: "The pickup & delivery service is exactly what I needed. No more wasting time at the laundromat. SpeedyMat handles everything professionally.",
                author: "Michael T.",
                rating: 5,
              },
              {
                text: "Clean facility, great machines, and the attendants are always keeping everything spotless. This is my go-to place for laundry in Phoenix!",
                author: "Jennifer L.",
                rating: 5,
              },
            ].map((testimonial, i) => (
              <div
                key={i}
                className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-8"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, j) => (
                    <Star
                      key={j}
                      className="h-5 w-5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <p className="font-semibold text-slate-900 dark:text-white">
                  {testimonial.author}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Hours */}
      <section className="py-20 sm:py-28 bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-8">
                Visit SpeedyMat Today
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <MapPin className="h-6 w-6 text-amber-400 shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">Location</h3>
                    <p className="text-slate-300">
                      Phoenix, Arizona<br />
                      Convenient location with ample parking
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Clock className="h-6 w-6 text-amber-400 shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">Hours</h3>
                    <p className="text-slate-300">
                      Monday - Sunday<br />
                      6:00 AM - 10:00 PM
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Truck className="h-6 w-6 text-amber-400 shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">Pickup & Delivery</h3>
                    <p className="text-slate-300">
                      Available 7 days a week<br />
                      Schedule online instantly
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
              <h3 className="text-2xl font-bold mb-6">Ready to Get Started?</h3>
              <p className="text-slate-300 mb-8">
                Choose the service that works best for you and schedule today. No credit card required.
              </p>
              <div className="space-y-3">
                <Link
                  href="/dashboard/schedule"
                  className="block w-full rounded-lg bg-amber-400 text-slate-900 font-bold py-3 text-center hover:bg-amber-300 transition-all"
                >
                  Schedule Pickup & Delivery
                </Link>
                <Link
                  href="/customers"
                  className="block w-full rounded-lg border-2 border-slate-600 text-white font-bold py-3 text-center hover:bg-slate-700 transition-all"
                >
                  Learn More About Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
