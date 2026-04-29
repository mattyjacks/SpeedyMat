import Link from "next/link";
import { ArrowRight, Heart, Users, Globe, Zap } from "lucide-react";

export default function CharityPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="gradient-hero dark:gradient-hero-dark py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
            Speedy 4 Charity
          </h1>
          <p className="mt-6 text-xl text-white/80 max-w-3xl mx-auto">
            Keeping our community clean. SpeedyMat commits 2% of revenue to providing free laundry services to families in need.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-4">
                Clean clothes are a basic necessity, not a luxury. Yet many families struggle to afford laundry services. Speedy 4 Charity bridges that gap.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                We believe that everyone deserves access to clean clothes. By partnering with local nonprofits, we provide free laundry services to low-income families, homeless shelters, and community organizations.
              </p>
              <div className="space-y-4">
                {[
                  "Free laundry for families below poverty line",
                  "Support for homeless shelters & transitional housing",
                  "Community partnerships & volunteer opportunities",
                  "Educational programs on fabric care & sustainability",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Heart className="h-5 w-5 text-primary shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-xl p-12 text-center">
              <div className="text-5xl font-bold text-primary mb-4">2%</div>
              <p className="text-lg font-semibold mb-8">of all revenue goes to Speedy 4 Charity</p>
              <div className="space-y-4 text-sm">
                <div>
                  <div className="font-bold text-primary">Year 1 Target</div>
                  <div className="text-muted-foreground">$50,000 invested</div>
                </div>
                <div>
                  <div className="font-bold text-primary">Families Served</div>
                  <div className="text-muted-foreground">500+ families</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stories */}
      <section className="py-20 bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Impact Stories</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                name: "Maria's Story",
                story: "Single mom of 3. Working two jobs, she couldn't afford laundry. Speedy 4 Charity provided free service, saving her $60/month. Now she can afford groceries.",
              },
              {
                name: "Phoenix Homeless Shelter",
                story: "Partnered with us to provide clean clothes for 150+ residents. Improved dignity, health outcomes, and job interview readiness.",
              },
              {
                name: "Community Center",
                story: "We sponsor free laundry days for low-income families. 200+ people served monthly. Speedy mascot makes it fun for kids!",
              },
              {
                name: "Transitional Housing",
                story: "Residents rebuilding their lives need clean clothes for job interviews. We provide free service as part of their support program.",
              },
            ].map((story, i) => (
              <div key={i} className="rounded-xl border bg-card p-8">
                <h3 className="text-xl font-bold mb-4">{story.name}</h3>
                <p className="text-muted-foreground">{story.story}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Involved */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Get Involved</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Heart,
                title: "Donate",
                desc: "Every dollar goes directly to providing free laundry services.",
                cta: "Donate Now",
              },
              {
                icon: Users,
                title: "Volunteer",
                desc: "Help sort, fold, and deliver laundry. Meet Speedy at community events!",
                cta: "Sign Up",
              },
              {
                icon: Globe,
                title: "Partner",
                desc: "Nonprofits & shelters: partner with us to serve your community.",
                cta: "Contact Us",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-xl border bg-card p-8 text-center">
                  <Icon className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground mb-6">{item.desc}</p>
                  <a
                    href="mailto:charity@speedymat.com"
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all"
                  >
                    {item.cta}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Transparency */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Transparency & Accountability</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-muted-foreground mb-8 text-center">
              We believe in transparency. Here's exactly how Speedy 4 Charity works:
            </p>
            <div className="space-y-6">
              {[
                {
                  title: "Revenue Allocation",
                  desc: "2% of all SpeedyMat revenue is automatically transferred to Speedy 4 Charity fund.",
                },
                {
                  title: "Partner Selection",
                  desc: "We work with vetted nonprofits and community organizations to identify families in need.",
                },
                {
                  title: "Service Delivery",
                  desc: "Eligible families receive free laundry services. No paperwork, no shame, just clean clothes.",
                },
                {
                  title: "Annual Reports",
                  desc: "We publish annual impact reports showing families served, dollars invested, and outcomes.",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6">Help Us Keep Our Community Clean</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Every donation, volunteer hour, and partnership makes a difference. Together, we're building a cleaner, more equitable Phoenix.
          </p>
          <a
            href="mailto:charity@speedymat.com"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-lg hover:bg-primary/90 transition-all"
          >
            Get Involved Today
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </section>
    </div>
  );
}
