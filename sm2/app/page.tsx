import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Link from "next/link";
import {
  Shirt,
  BedDouble,
  PawPrint,
  Sparkles,
  Warehouse,
  Clock,
  Truck,
  CheckCircle,
  Zap,
  Star,
  ArrowRight,
  Shield,
  ExternalLink,
  Users,
  ThumbsUp,
  Timer,
  BadgeCheck,
} from "lucide-react";

const services = [
  {
    icon: Shirt,
    name: "Wash & Fold",
    price: "$2.50/lb",
    min: "10 lb min",
    desc: "Standard laundry service - we wash, dry, and neatly fold your clothes with care.",
    time: "24 hrs",
  },
  {
    icon: BedDouble,
    name: "Comforter & Bedding",
    price: "$35/item",
    min: "1 item min",
    desc: "Professional cleaning for comforters, duvets, quilts, and oversized bedding.",
    time: "48 hrs",
  },
  {
    icon: PawPrint,
    name: "Pet Bed Cleaning",
    price: "$30/item",
    min: "1 item min",
    desc: "Deep cleaning and sanitization for pet beds too big for your home machine.",
    time: "48 hrs",
  },
  {
    icon: Sparkles,
    name: "Delicates",
    price: "$4.00/lb",
    min: "5 lb min",
    desc: "Gentle care for delicate fabrics, silks, lingerie, and special garments.",
    time: "48 hrs",
  },
  {
    icon: Warehouse,
    name: "Bulk / Commercial",
    price: "$2.00/lb",
    min: "25 lb min",
    desc: "High-volume laundry for businesses, Airbnbs, hotels, and large households.",
    time: "48 hrs",
  },
];

const steps = [
  {
    icon: Clock,
    title: "Schedule",
    desc: "Pick a drop-off time that works for you. Walk-ins welcome too!",
  },
  {
    icon: Truck,
    title: "Drop Off",
    desc: "Bring your laundry to our Phoenix location. We handle the rest.",
  },
  {
    icon: Zap,
    title: "We Clean",
    desc: "Commercial-grade machines and expert care. Track progress in real-time.",
  },
  {
    icon: CheckCircle,
    title: "Pick Up",
    desc: "Get notified when it's ready. Fresh, clean, and perfectly folded.",
  },
];

const testimonials = [
  {
    name: "Sarah M.",
    text: "SpeedyMat saved my weekends! I drop off Monday morning and pick up fresh clothes on my way home. The pet bed cleaning is a game-changer for my two golden retrievers.",
    rating: 5,
  },
  {
    name: "James T.",
    text: "Running an Airbnb in Scottsdale, I need bulk laundry done fast. Their commercial service is reliable and affordable. Rush option is a lifesaver during busy weekends.",
    rating: 5,
  },
  {
    name: "Lisa R.",
    text: "Finally a laundromat that feels modern and trustworthy. The real-time tracking is brilliant - I always know exactly when my clothes will be ready.",
    rating: 5,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="relative gradient-hero dark:gradient-hero-dark overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjEuNSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCBmaWxsPSJ1cmwoI2EpIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PC9zdmc+')] opacity-50" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-1.5 text-sm text-white/90 mb-6">
              <Zap className="h-4 w-4" />
              Now serving Greater Phoenix, Arizona
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Keeping It Clean.
              <br />
              <span className="text-amber-300">Scaling It Smart.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
              SpeedyMat transforms the essential laundry chore into a productive,
              best-in-class experience. Commercial-grade machines. Real-time
              tracking. Pet beds, comforters, and everything in between.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-white/70">
              <span className="inline-flex items-center gap-1.5">
                <Users className="h-4 w-4" />
                500+ Happy Customers
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ThumbsUp className="h-4 w-4" />
                4.9 Star Rating
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Timer className="h-4 w-4" />
                Same-Day Rush Available
              </span>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/dashboard/schedule"
                className="group inline-flex items-center gap-2 rounded-xl bg-amber-400 px-7 py-4 text-base font-bold text-gray-900 shadow-lg transition-all hover:bg-amber-300 hover:shadow-xl hover:-translate-y-0.5"
              >
                Schedule a Drop-off - It&apos;s Free
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="https://speedymat.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-sm px-6 py-4 text-base font-semibold text-white transition-all hover:bg-white/20"
              >
                Visit Official Site
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
            <p className="mt-4 text-xs text-white/50">
              No credit card required to schedule. Pay only when you pick up.
            </p>
          </div>
        </div>
      </section>

      <section className="py-6 border-b bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2 font-medium">
              <BadgeCheck className="h-5 w-5 text-green-500" />
              Licensed & Insured in Arizona
            </span>
            <span className="inline-flex items-center gap-2 font-medium">
              <Shield className="h-5 w-5 text-primary" />
              Commercial-Grade Equipment
            </span>
            <span className="inline-flex items-center gap-2 font-medium">
              <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
              Phoenix&apos;s #1 Rated Laundry Service
            </span>
            <a
              href="https://speedymat.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline"
            >
              SpeedyMat.com
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Our <span className="gradient-text">Services</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              From everyday clothes to oversized pet beds, our commercial
              machines handle it all. Need it fast? Rush any order for same-day
              service.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((svc) => (
              <div
                key={svc.name}
                className="group relative rounded-2xl border bg-card p-6 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <svc.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold">{svc.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {svc.desc}
                </p>
                <div className="mt-4 flex items-center justify-between border-t pt-4">
                  <div>
                    <span className="text-2xl font-bold text-primary">
                      {svc.price}
                    </span>
                    <span className="ml-2 text-xs text-muted-foreground">
                      {svc.min}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {svc.time}
                  </div>
                </div>
              </div>
            ))}
            <div className="group relative rounded-2xl border-2 border-dashed border-amber-400/50 bg-amber-50 dark:bg-amber-950/20 p-6 flex flex-col items-center justify-center text-center">
              <Zap className="h-10 w-10 text-amber-500 mb-3" />
              <h3 className="text-lg font-bold text-amber-700 dark:text-amber-400">
                Rush Service
              </h3>
              <p className="mt-2 text-sm text-amber-600/80 dark:text-amber-300/80">
                Need it ASAP? Rush any order for <strong>2x the price</strong>{" "}
                and get it done in hours, not days. Available on all services!
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Four simple steps to fresh, clean laundry.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <div key={step.title} className="text-center">
                <div className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
                  <step.icon className="h-7 w-7" />
                  <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-amber-400 text-xs font-bold text-gray-900">
                    {i + 1}
                  </span>
                </div>
                <h3 className="text-lg font-bold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Why <span className="gradient-text">SpeedyMat</span>?
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Shield,
                title: "Essential Service",
                desc: "Laundry is a necessity, not a trend. We provide a recession-resistant essential service.",
              },
              {
                icon: Zap,
                title: "Modern Experience",
                desc: "Real-time tracking, online scheduling, and a clean modern facility. Laundry reimagined.",
              },
              {
                icon: Star,
                title: "Community First",
                desc: "Your Neighborhood Laundromat. We connect with the local community through Speedy 4 Charity.",
              },
              {
                icon: Warehouse,
                title: "Commercial Grade",
                desc: "Our big machines handle items your home washer can't - pet beds, comforters, and bulk loads.",
              },
              {
                icon: Clock,
                title: "Rush Available",
                desc: "Need it fast? Rush any order for same-day processing. Perfect for last-minute needs.",
              },
              {
                icon: CheckCircle,
                title: "Quality Guaranteed",
                desc: "Professional care, premium detergents, and attention to detail on every single order.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-4 rounded-xl border bg-card p-5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              What Our <span className="gradient-text">Customers</span> Say
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl border bg-card p-6 shadow-sm"
              >
                <div className="mb-3 flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  &ldquo;{t.text}&rdquo;
                </p>
                <p className="mt-4 text-sm font-semibold">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 gradient-hero dark:gradient-hero-dark">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to Ditch Laundry Day?
          </h2>
          <p className="mt-4 text-lg text-white/80">
            Schedule your first drop-off in under a minute. Join hundreds of
            Phoenix residents who&apos;ve reclaimed their weekends.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/dashboard/schedule"
              className="group inline-flex items-center gap-2 rounded-xl bg-amber-400 px-8 py-4 text-base font-bold text-gray-900 shadow-lg transition-all hover:bg-amber-300 hover:shadow-xl hover:-translate-y-0.5"
            >
              Schedule Your Free Drop-off
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="https://speedymat.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-sm px-8 py-4 text-base font-semibold text-white transition-all hover:bg-white/20"
            >
              Visit Official Site
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
          <p className="mt-4 text-xs text-white/50">
            No credit card required. Pay when you pick up.
          </p>
        </div>
      </section>

      <section className="border-t bg-muted/20 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-muted-foreground">
              About SpeedyMat
            </h3>
          </div>
          <p className="text-center text-sm text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our focus is to create, scale, and sustainably operate best-in-class
            SpeedyMat branded laundromats. SpeedyMat works best when it becomes
            part of the daily rhythm of the neighborhood. Integral to sustainable
            success are customized service and design elements unique to each
            store, so that our customers &ldquo;feel&rdquo; a true sense of
            connection. &ldquo;Your Neighborhood Laundromat&rdquo; resonates by
            connecting the local neighborhood and surrounding community to
            SpeedyMat. Our initial expansion is focused on greater Phoenix,
            Arizona with future company-operated expansion planned.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
