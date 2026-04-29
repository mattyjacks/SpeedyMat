import Link from "next/link";
import { ArrowRight, Shirt, BedDouble, PawPrint, Sparkles, Warehouse, MessageCircle, Zap } from "lucide-react";

export default function CustomersPage() {
  const services = [
    {
      icon: Shirt,
      name: "Wash & Fold",
      price: "$2.50/lb",
      desc: "Standard laundry service with expert care.",
    },
    {
      icon: BedDouble,
      name: "Comforter & Bedding",
      price: "$35/item",
      desc: "Professional cleaning for oversized items.",
    },
    {
      icon: PawPrint,
      name: "Pet Bed Cleaning",
      price: "$30/item",
      desc: "Deep cleaning for pet beds and blankets.",
    },
    {
      icon: Sparkles,
      name: "Delicates",
      price: "$4.00/lb",
      desc: "Gentle care for silks and special fabrics.",
    },
    {
      icon: Warehouse,
      name: "Bulk / Commercial",
      price: "$2.00/lb",
      desc: "High-volume laundry for businesses.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="gradient-hero dark:gradient-hero-dark py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
            Your Laundry, Perfected
          </h1>
          <p className="mt-6 text-xl text-white/80 max-w-3xl mx-auto">
            SpeedyMat takes the stress out of laundry. Commercial-grade machines, expert care, and real-time tracking. Plus, chat with Speedy for laughs and laundry tips!
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/dashboard/schedule"
              className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-8 py-4 text-base font-bold text-gray-900 hover:bg-amber-300 transition-all"
            >
              Schedule Now
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/chat"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-sm px-8 py-4 text-base font-semibold text-white hover:bg-white/20 transition-all"
            >
              <MessageCircle className="h-5 w-5" />
              Chat with Speedy
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((svc) => {
              const Icon = svc.icon;
              return (
                <div key={svc.name} className="rounded-xl border bg-card p-6 hover:shadow-lg transition-all">
                  <Icon className="h-8 w-8 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">{svc.name}</h3>
                  <p className="text-muted-foreground mb-4">{svc.desc}</p>
                  <div className="text-2xl font-bold text-primary">{svc.price}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid gap-8 md:grid-cols-4">
            {[
              { step: 1, title: "Schedule", desc: "Pick a drop-off time that works for you." },
              { step: 2, title: "Drop Off", desc: "Bring your laundry to our Phoenix location." },
              { step: 3, title: "We Clean", desc: "Expert care with commercial-grade machines." },
              { step: 4, title: "Pick Up", desc: "Fresh, clean, and perfectly folded." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                q: "How long does laundry take?",
                a: "Standard service is 24 hours. Rush service (2x price) is 4-8 hours depending on service type.",
              },
              {
                q: "Is my laundry safe?",
                a: "100% safe. We use commercial-grade machines, premium detergents, and expert care. Each order is tracked in real-time.",
              },
              {
                q: "What about stains and special items?",
                a: "Tell us about stains and special care needs when you schedule. Our team handles everything with care.",
              },
              {
                q: "Can I chat with Speedy?",
                a: "Absolutely! Speedy is available 24/7 on our chat page. He's witty, helpful, and obsessed with keeping things CLEAN!",
              },
              {
                q: "Do you offer pickup and delivery?",
                a: "Coming soon! We're expanding to neighborhood pickup nodes in 2025.",
              },
            ].map((item, i) => (
              <div key={i} className="border rounded-lg p-6">
                <h3 className="font-bold mb-2">{item.q}</h3>
                <p className="text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Loyalty Program Preview */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">SpeedyMat Loyalty Program (Coming Soon)</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Earn points on every order. Unlock rewards, exclusive discounts, and VIP perks. The more you use SpeedyMat, the more you save!
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: "🎯", title: "Earn Points", desc: "1 point per $1 spent" },
              { icon: "🏆", title: "Unlock Rewards", desc: "Redeem for discounts & free services" },
              { icon: "⭐", title: "VIP Tiers", desc: "Silver, Gold, Platinum benefits" },
            ].map((item, i) => (
              <div key={i} className="rounded-xl border bg-card p-6">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6">Ready to Ditch Laundry Day?</h2>
          <Link
            href="/dashboard/schedule"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-lg hover:bg-primary/90 transition-all"
          >
            Schedule Your First Drop-off
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
