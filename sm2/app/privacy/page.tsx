import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-16">
        <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 prose prose-gray dark:prose-invert prose-headings:font-bold prose-a:text-primary">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Privacy Policy
          </h1>
          <p className="text-sm text-muted-foreground mb-8">
            Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>

          <div className="space-y-6 text-sm leading-relaxed text-muted-foreground">
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                1. Introduction
              </h2>
              <p>
                SpeedyMat Management, LLC (&ldquo;SpeedyMat,&rdquo;
                &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is
                committed to protecting the privacy of our customers and website
                visitors. This Privacy Policy describes how we collect, use,
                disclose, and safeguard your personal information when you visit
                our website, use our services, or interact with us. SpeedyMat is
                headquartered in Phoenix, Arizona, and this policy is governed by
                the laws of the State of Arizona.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                2. Information We Collect
              </h2>
              <p className="mb-2">
                We may collect the following categories of personal information:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong className="text-foreground">Contact Information:</strong> Name, email address,
                  phone number, and mailing address.
                </li>
                <li>
                  <strong className="text-foreground">Account Information:</strong> Username, password, and
                  account preferences.
                </li>
                <li>
                  <strong className="text-foreground">Transaction Information:</strong> Order history,
                  service selections, payment details, and billing information.
                </li>
                <li>
                  <strong className="text-foreground">Device & Usage Information:</strong> IP address,
                  browser type, operating system, referring URLs, pages viewed,
                  and interaction data collected via cookies and similar
                  technologies.
                </li>
                <li>
                  <strong className="text-foreground">Communications:</strong> Feedback, support requests,
                  and other correspondence you send to us.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                3. How We Use Your Information
              </h2>
              <p className="mb-2">
                We use the information we collect for the following purposes:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>To provide, operate, and maintain our laundry services.</li>
                <li>To process orders, schedule drop-offs, and manage your account.</li>
                <li>To communicate with you about your orders, account, and promotional offers.</li>
                <li>To improve our website, services, and customer experience.</li>
                <li>To comply with applicable laws and regulations, including Arizona state law.</li>
                <li>To detect, prevent, and address fraud or security issues.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                4. Disclosure of Your Information
              </h2>
              <p className="mb-2">
                We do not sell your personal information. We may share your
                information in the following circumstances:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong className="text-foreground">Service Providers:</strong> With third-party vendors who
                  perform services on our behalf (e.g., payment processing, email
                  delivery, analytics).
                </li>
                <li>
                  <strong className="text-foreground">Legal Requirements:</strong> When required by law, court
                  order, or governmental regulation, including compliance with
                  Arizona Revised Statutes.
                </li>
                <li>
                  <strong className="text-foreground">Business Transfers:</strong> In connection with a merger,
                  acquisition, or sale of all or a portion of our assets.
                </li>
                <li>
                  <strong className="text-foreground">With Your Consent:</strong> When you have given us
                  explicit consent to share your information.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                5. Data Security
              </h2>
              <p>
                We implement reasonable administrative, technical, and physical
                security measures designed to protect your personal information
                from unauthorized access, disclosure, alteration, or destruction.
                However, no method of transmission over the Internet or method of
                electronic storage is 100% secure. While we strive to use
                commercially acceptable means to protect your personal
                information, we cannot guarantee its absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                6. Data Retention
              </h2>
              <p>
                We retain your personal information for as long as necessary to
                fulfill the purposes for which it was collected, to comply with
                our legal obligations, resolve disputes, and enforce our
                agreements. When personal information is no longer needed, we
                will securely delete or anonymize it.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                7. Your Rights Under Arizona Law
              </h2>
              <p className="mb-2">
                Under Arizona law, including A.R.S. Section 18-552 (Arizona Data Breach
                Notification Law), you have the right to be notified in the event
                of a security breach involving your personal information.
                Additionally, you may:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Request access to the personal information we hold about you.</li>
                <li>Request correction of inaccurate or incomplete personal information.</li>
                <li>Request deletion of your personal information, subject to legal exceptions.</li>
                <li>Opt out of promotional communications at any time.</li>
              </ul>
              <p className="mt-2">
                To exercise any of these rights, please contact us using the
                information provided below.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                8. Cookies and Tracking Technologies
              </h2>
              <p>
                Our website may use cookies and similar tracking technologies to
                enhance your browsing experience, analyze site traffic, and
                understand where our visitors are coming from. You can set your
                browser to refuse all or some browser cookies, or to alert you
                when cookies are being sent. If you disable or refuse cookies,
                some parts of the website may be inaccessible or not function
                properly.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                9. Third-Party Links
              </h2>
              <p>
                Our website may contain links to third-party websites or services
                that are not operated by us. We have no control over, and assume
                no responsibility for, the content, privacy policies, or
                practices of any third-party websites or services. We encourage
                you to review the privacy policies of every site you visit.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                10. Children&apos;s Privacy
              </h2>
              <p>
                Our services are not directed to individuals under the age of 13.
                We do not knowingly collect personal information from children
                under 13. If you are a parent or guardian and become aware that
                your child has provided us with personal information, please
                contact us, and we will take steps to delete such information.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                11. Changes to This Privacy Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the &ldquo;Last updated&rdquo; date. You
                are advised to review this Privacy Policy periodically for any
                changes. Changes are effective when posted on this page.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                12. Contact Us
              </h2>
              <p>
                If you have any questions about this Privacy Policy or our data
                practices, please contact us at:
              </p>
              <div className="mt-3 rounded-lg border bg-card p-4">
                <p className="font-semibold text-foreground">SpeedyMat Management, LLC</p>
                <p>PO Box 15208</p>
                <p>Phoenix, Arizona 85060</p>
                <p>
                  Email:{" "}
                  <a href="mailto:invest@speedymat.com" className="text-primary hover:underline">
                    invest@speedymat.com
                  </a>
                </p>
                <p>
                  Website:{" "}
                  <a href="https://www.speedymat.com" className="text-primary hover:underline">
                    www.speedymat.com
                  </a>
                </p>
              </div>
            </section>

            <section className="border-t pt-6">
              <p className="text-xs">
                This Privacy Policy is governed by and construed in accordance
                with the laws of the State of Arizona, without regard to its
                conflict of law provisions. Any disputes arising under this
                Privacy Policy shall be subject to the exclusive jurisdiction of
                the state and federal courts located in Maricopa County, Arizona.
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
