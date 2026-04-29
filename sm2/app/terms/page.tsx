import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-16">
        <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 prose prose-gray dark:prose-invert prose-headings:font-bold prose-a:text-primary">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Terms of Use
          </h1>
          <p className="text-sm text-muted-foreground mb-8">
            Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>

          <div className="space-y-6 text-sm leading-relaxed text-muted-foreground">
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing or using the website and services of SpeedyMat
                Management, LLC (&ldquo;SpeedyMat,&rdquo; &ldquo;we,&rdquo;
                &ldquo;us,&rdquo; or &ldquo;our&rdquo;), you agree to be bound
                by these Terms of Use (&ldquo;Terms&rdquo;). If you do not agree
                to these Terms, you must not use our website or services.
                SpeedyMat is a limited liability company organized under the laws
                of the State of Arizona, with its principal place of business in
                Phoenix, Arizona.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                2. Description of Services
              </h2>
              <p>
                SpeedyMat provides commercial laundry services, including but not
                limited to wash-and-fold, comforter and bedding cleaning, pet bed
                cleaning, delicate garment care, and bulk/commercial laundry
                services. We operate physical laundromat locations and provide
                online scheduling and order tracking through our website.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                3. Service Rates and Pricing
              </h2>
              <p className="mb-2">
                Our current service rates are as follows and are subject to
                change at any time without prior notice:
              </p>
              <div className="rounded-lg border overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-4 py-2 text-left font-semibold text-foreground">Service</th>
                      <th className="px-4 py-2 text-right font-semibold text-foreground">Rate</th>
                      <th className="px-4 py-2 text-right font-semibold text-foreground">Minimum</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="px-4 py-2">Wash & Fold</td>
                      <td className="px-4 py-2 text-right">$2.50/lb</td>
                      <td className="px-4 py-2 text-right">10 lbs</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-4 py-2">Comforter & Bedding</td>
                      <td className="px-4 py-2 text-right">$35.00/item</td>
                      <td className="px-4 py-2 text-right">1 item</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-4 py-2">Pet Bed Cleaning</td>
                      <td className="px-4 py-2 text-right">$30.00/item</td>
                      <td className="px-4 py-2 text-right">1 item</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-4 py-2">Delicates</td>
                      <td className="px-4 py-2 text-right">$4.00/lb</td>
                      <td className="px-4 py-2 text-right">5 lbs</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-4 py-2">Bulk / Commercial</td>
                      <td className="px-4 py-2 text-right">$2.00/lb</td>
                      <td className="px-4 py-2 text-right">25 lbs</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3">
                <strong className="text-foreground">Rush Service:</strong> Any order may be
                designated as a Rush order for an additional charge equal to 100%
                of the base service price (i.e., 2x the standard rate). Rush
                orders are processed on a priority basis and are typically
                completed within 2-8 hours depending on the service type. A Rush
                upgrade may be applied to an order that is already in progress.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                4. Order Scheduling and Drop-off
              </h2>
              <p>
                Customers may schedule a laundry drop-off through our website or
                walk in during business hours. Scheduled appointments are not
                guaranteed and are subject to availability. SpeedyMat reserves
                the right to refuse service at its sole discretion.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                5. Order Processing and Estimated Completion
              </h2>
              <p>
                Estimated completion times are provided for convenience only and
                are not guaranteed. Standard orders are typically completed within
                24-48 hours. Rush orders are typically completed within 2-8 hours.
                SpeedyMat shall not be liable for any delays caused by
                circumstances beyond our reasonable control, including but not
                limited to equipment failure, utility outages, natural disasters,
                or unusually high order volume.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                6. Payment
              </h2>
              <p>
                Payment is due upon completion and pickup of your order. We
                accept cash, credit cards, and debit cards. Prices are quoted in
                U.S. dollars and are subject to applicable Arizona state and
                local sales taxes. SpeedyMat reserves the right to hold laundry
                until full payment is received.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                7. Cancellation Policy
              </h2>
              <p>
                Orders in &ldquo;Scheduled&rdquo; or &ldquo;Received&rdquo;
                status may be cancelled without charge. Orders that have entered
                active processing (Washing, Drying, Folding) cannot be cancelled
                and will be charged in full. SpeedyMat reserves the right to
                cancel any order and refund the customer at its sole discretion.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                8. Limitation of Liability
              </h2>
              <p>
                TO THE FULLEST EXTENT PERMITTED BY ARIZONA LAW, SPEEDYMAT SHALL
                NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
                CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO
                YOUR USE OF OUR SERVICES, REGARDLESS OF THE CAUSE OF ACTION OR
                THE THEORY OF LIABILITY.
              </p>
              <p className="mt-2">
                SpeedyMat&apos;s total liability for any claim arising from our
                services shall not exceed the amount you paid for the specific
                order giving rise to such claim. SpeedyMat exercises reasonable
                care in handling all laundry; however, we are not responsible for
                damage resulting from pre-existing conditions, normal wear and
                tear, or items not suitable for commercial laundering. In the
                event of loss or damage attributable to SpeedyMat&apos;s
                negligence, liability shall be limited to ten (10) times the
                cleaning charge for the affected item, up to a maximum of $250
                per item.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                9. Prohibited Items
              </h2>
              <p className="mb-2">
                The following items are prohibited from our laundry service:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Items contaminated with hazardous materials or biohazards.</li>
                <li>Items containing illegal substances.</li>
                <li>Extremely soiled or foul-smelling items that may contaminate other orders.</li>
                <li>Items of extraordinary value (furs, wedding gowns, antique textiles) unless declared in advance.</li>
              </ul>
              <p className="mt-2">
                SpeedyMat reserves the right to refuse any item at its sole
                discretion and without liability.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                10. Unclaimed Items
              </h2>
              <p>
                Laundry not picked up within thirty (30) calendar days of
                notification of completion shall be deemed abandoned. SpeedyMat
                may donate or dispose of abandoned items in accordance with
                Arizona Revised Statutes Title 44, Chapter 3 (Unclaimed
                Property). SpeedyMat shall not be liable for any abandoned items.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                11. Intellectual Property
              </h2>
              <p>
                All content on this website, including but not limited to text,
                graphics, logos, images, software, and the SpeedyMat brand
                identity (including &ldquo;Keeping It Clean&rdquo; and
                &ldquo;Speedy 4 Charity&rdquo; service marks), is the property
                of SpeedyMat Management, LLC, and is protected by United States
                copyright, trademark, and other intellectual property laws. You
                may not reproduce, distribute, or create derivative works from
                any content on this website without our prior written consent.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                12. Indemnification
              </h2>
              <p>
                You agree to indemnify, defend, and hold harmless SpeedyMat
                Management, LLC, its officers, directors, employees, agents, and
                affiliates from and against any and all claims, damages,
                obligations, losses, liabilities, costs, or expenses (including
                reasonable attorney&apos;s fees) arising from your use of our
                services or violation of these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                13. Dispute Resolution
              </h2>
              <p>
                Any dispute arising out of or relating to these Terms or the
                services provided by SpeedyMat shall first be attempted to be
                resolved through good-faith negotiation. If the dispute cannot be
                resolved through negotiation within thirty (30) days, it shall be
                submitted to binding arbitration in Maricopa County, Arizona, in
                accordance with the rules of the American Arbitration
                Association. The arbitrator&apos;s decision shall be final and
                binding and may be entered as a judgment in any court of
                competent jurisdiction.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                14. Governing Law
              </h2>
              <p>
                These Terms shall be governed by and construed in accordance with
                the laws of the State of Arizona, without regard to its conflict
                of law provisions. You consent to the exclusive jurisdiction of
                the state and federal courts located in Maricopa County, Arizona,
                for any legal proceedings arising out of these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                15. Changes to Terms
              </h2>
              <p>
                SpeedyMat reserves the right to modify these Terms at any time.
                Changes will be effective immediately upon posting to our
                website. Your continued use of our services after any
                modification constitutes your acceptance of the revised Terms. We
                encourage you to review these Terms periodically.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                16. Severability
              </h2>
              <p>
                If any provision of these Terms is found to be unenforceable or
                invalid by a court of competent jurisdiction, that provision
                shall be limited or eliminated to the minimum extent necessary so
                that the remaining provisions of these Terms will remain in full
                force and effect.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                17. Contact Information
              </h2>
              <p>
                For questions regarding these Terms of Use, please contact:
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
                Copyright &copy; {new Date().getFullYear()} SpeedyMat
                Management, LLC. All rights reserved. SpeedyMat, Keeping It
                Clean, and Speedy 4 Charity are service marks of SpeedyMat
                Management, LLC.
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
