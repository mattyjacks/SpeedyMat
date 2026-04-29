import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { DemoBanner } from "@/components/demo-banner";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "SpeedyMat Laundry - Keeping It Clean, Scaling It Smart",
  description:
    "SpeedyMat transforms the essential laundry chore into a productive, best-in-class experience. Schedule drop-offs, track your laundry in real-time, and enjoy commercial-grade cleaning in Phoenix, AZ.",
  keywords: [
    "laundry service",
    "Phoenix AZ",
    "commercial laundry",
    "pet bed cleaning",
    "wash and fold",
    "SpeedyMat",
  ],
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <DemoBanner />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
