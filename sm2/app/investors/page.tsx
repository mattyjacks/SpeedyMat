import Link from "next/link";
import { ArrowRight, TrendingUp, Users, Award, Globe } from "lucide-react";

export default function InvestorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="mb-20 text-center">
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
            Invest in the Future of <span className="text-primary">Laundry</span>
          </h1>
          <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto">
            SpeedyMat is revolutionizing the $40B laundry services industry with AI-powered operations, Speedy mascot brand loyalty, and nationwide expansion potential.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-8 md:grid-cols-4 mb-20">
          {[
            { label: "Market Size", value: "$40B", desc: "US Laundry Industry" },
            { label: "Unit Economics", value: "45%", desc: "Gross Margin Target" },
            { label: "Expansion Plan", value: "50+", desc: "Cities by 2028" },
            { label: "Brand Moat", value: "Speedy", desc: "AI Mascot Loyalty" },
          ].map((metric) => (
            <div key={metric.label} className="rounded-xl border bg-card p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">{metric.value}</div>
              <div className="font-semibold">{metric.label}</div>
              <div className="text-sm text-muted-foreground mt-1">{metric.desc}</div>
            </div>
          ))}
        </div>

        {/* Investment Highlights */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Invest in SpeedyMat?</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                icon: TrendingUp,
                title: "Recession-Resistant Business",
                desc: "Laundry is an essential service. People always need clean clothes, regardless of economic conditions.",
              },
              {
                icon: Users,
                title: "Speedy Brand Loyalty",
                desc: "Our witty AI mascot creates emotional connection. Customers don't just use SpeedyMat—they love Speedy.",
              },
              {
                icon: Award,
                title: "Scalable Unit Economics",
                desc: "Proven model in Phoenix. Commercial-grade machines, AI operations, minimal labor = 45% gross margins.",
              },
              {
                icon: Globe,
                title: "Nationwide Expansion",
                desc: "Franchise model ready. Speedy 4 Charity builds community goodwill. Target: 50+ cities by 2028.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-xl border bg-card p-8">
                  <Icon className="h-8 w-8 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Financials */}
        <div className="mb-20 rounded-xl border bg-card p-12">
          <h2 className="text-3xl font-bold mb-8">Financial Projections (Year 1-3)</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { year: "Year 1", revenue: "$2.5M", margin: "35%", locations: "1 (Phoenix)" },
              { year: "Year 2", revenue: "$8.2M", margin: "40%", locations: "5 (Southwest)" },
              { year: "Year 3", revenue: "$24.5M", margin: "45%", locations: "15 (Multi-region)" },
            ].map((proj) => (
              <div key={proj.year} className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">{proj.revenue}</div>
                <div className="font-semibold mb-4">{proj.year}</div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div>Margin: {proj.margin}</div>
                  <div>Locations: {proj.locations}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Use of Funds */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">Use of Investment</h2>
          <div className="space-y-4 max-w-2xl mx-auto">
            {[
              { item: "Equipment & Facility Expansion", pct: "40%" },
              { item: "Technology & AI Development", pct: "25%" },
              { item: "Marketing & Speedy Brand", pct: "20%" },
              { item: "Operations & Team", pct: "15%" },
            ].map((use) => (
              <div key={use.item}>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{use.item}</span>
                  <span className="text-primary font-bold">{use.pct}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary"
                    style={{ width: use.pct }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Speedy 4 Charity Impact */}
        <div className="mb-20 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border p-12">
          <h2 className="text-3xl font-bold mb-6">Speedy 4 Charity: Social Impact</h2>
          <p className="text-lg text-muted-foreground mb-8">
            We commit 2% of revenue to community laundry assistance for low-income families. This isn't just good—it's good business. Community goodwill drives expansion.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { metric: "500+", label: "Families Served (Year 1)" },
              { metric: "$50K", label: "Community Investment" },
              { metric: "100%", label: "Sustainable Model" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{stat.metric}</div>
                <div className="text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Invest?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join us in building the future of laundry. Contact our investor relations team for pitch deck, financial models, and due diligence materials.
          </p>
          <a
            href="mailto:invest@speedymat.com"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-lg hover:bg-primary/90 transition-all"
          >
            Schedule Investment Call
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  );
}
