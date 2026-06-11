import Link from "next/link";
import "../legal.css";
import { getOrgContact } from "../../lib/org";

export const metadata = {
  title: "Privacy Policy",
  description: "How Humanity First Initiative collects, uses, and protects personal information from donors, supporters, and learners."
};

const LAST_UPDATED = "June 2026";

export default function PrivacyPage() {
  const org = getOrgContact();
  const contact = org.email ? (
    <a href={`mailto:${org.email}`}>{org.email}</a>
  ) : (
    <Link href="/contact">our contact page</Link>
  );

  return (
    <main className="site-main legal">
      <p className="legal__eyebrow">Legal</p>
      <h1 className="legal__title">Privacy Policy</h1>
      <p className="legal__updated">Last updated: {LAST_UPDATED}</p>
      <p className="legal__note">
        This policy is provided as a clear starting point and should be reviewed by a qualified
        legal adviser for your jurisdiction before you rely on it.
      </p>

      <div className="legal__body">
        <p>
          Humanity First Initiative (&ldquo;we&rdquo;, &ldquo;us&rdquo;) respects your privacy. This
          policy explains what personal information we collect, why, and the choices you have.
        </p>

        <h2>Information we collect</h2>
        <ul>
          <li><strong>Donations.</strong> When you donate, we collect your name, email address, the amount, and the route you support. Card and wallet details are entered on our payment providers&rsquo; secure pages and are never stored by us.</li>
          <li><strong>Inquiries &amp; forms.</strong> When you contact us, request a partnership, or submit a resource, we collect the details you provide (such as name, email, organisation, and message).</li>
          <li><strong>Learning accounts.</strong> If you use the education platform, we collect the account details needed to track enrolment, progress, and certificates.</li>
          <li><strong>Technical data.</strong> Standard server logs and essential cookies needed to keep sessions and the site working.</li>
        </ul>

        <h2>How we use your information</h2>
        <ul>
          <li>Process donations and send receipts and confirmations.</li>
          <li>Respond to inquiries, partnerships, and resource submissions.</li>
          <li>Operate education accounts and issue certificates.</li>
          <li>Keep the platform secure and improve our programs.</li>
        </ul>

        <h2>Payment processing</h2>
        <p>
          Payments are handled by third-party providers (such as Flutterwave and PayPal) on their
          own secure, PCI-compliant checkout pages. We receive a confirmation and reference, not your
          card details. Their handling of your data is governed by their own privacy policies.
        </p>

        <h2>Sharing</h2>
        <p>
          We do not sell your personal information. We share it only with the service providers that
          help us operate — payment processors and our email-delivery provider — and where required by
          law.
        </p>

        <h2>Cookies</h2>
        <p>
          We use essential cookies to keep admin and learning sessions signed in and the site
          functioning. We do not use these for advertising.
        </p>

        <h2>Data retention</h2>
        <p>
          We keep donation and inquiry records for as long as needed to operate the organisation,
          meet financial and reporting obligations, and comply with the law.
        </p>

        <h2>Your rights</h2>
        <p>
          You can request access to, correction of, or deletion of your personal information. To make
          a request, contact us at {contact}.
        </p>

        <h2>Children</h2>
        <p>
          Where programs involve young people, participation is arranged with the appropriate
          guardians, schools, or community partners. We collect only what is needed to run those
          programs responsibly.
        </p>

        <h2>Changes</h2>
        <p>We may update this policy from time to time. The &ldquo;last updated&rdquo; date above reflects the latest version.</p>

        <h2>Contact</h2>
        <p>For any privacy question or request, reach us at {contact}.</p>
      </div>
    </main>
  );
}
