import Link from "next/link";
import "../legal.css";
import { getOrgContact } from "../../lib/org";

export const metadata = {
  title: "Terms of Use",
  description: "The terms that govern use of the Humanity First Initiative platform, donations, and accounts."
};

const LAST_UPDATED = "June 2026";

export default function TermsPage() {
  const org = getOrgContact();
  const contact = org.email ? (
    <a href={`mailto:${org.email}`}>{org.email}</a>
  ) : (
    <Link href="/contact">our contact page</Link>
  );

  return (
    <main className="site-main legal">
      <p className="legal__eyebrow">Legal</p>
      <h1 className="legal__title">Terms of Use</h1>
      <p className="legal__updated">Last updated: {LAST_UPDATED}</p>
      <p className="legal__note">
        These terms are a clear starting point and should be reviewed by a qualified legal adviser
        for your jurisdiction before you rely on them.
      </p>

      <div className="legal__body">
        <h2>Acceptance</h2>
        <p>By using this website and its services, you agree to these terms. If you do not agree, please do not use the platform.</p>

        <h2>Use of the platform</h2>
        <p>
          You agree to use the site lawfully and not to disrupt it, attempt unauthorised access, or
          misuse any forms, accounts, or payment routes.
        </p>

        <h2>Donations</h2>
        <ul>
          <li>Donations are voluntary and are applied to the program route you select or to general operations where appropriate.</li>
          <li>Donations are generally non-refundable. If you believe a payment was made in error, contact us promptly and we will review it in good faith.</li>
          <li>Tax-deductibility depends on your jurisdiction and our registration status; we make no blanket representation about tax treatment.</li>
        </ul>

        <h2>Accounts</h2>
        <p>
          If you create a learning or staff account, you are responsible for keeping your credentials
          secure and for activity under your account.
        </p>

        <h2>Content &amp; intellectual property</h2>
        <p>
          Content on this site is owned by Humanity First Initiative or its contributors and may not
          be reused without permission, except as permitted by law or where a resource is explicitly
          shared for community use.
        </p>

        <h2>Disclaimers</h2>
        <p>
          The platform is provided &ldquo;as is&rdquo; without warranties of any kind. We work to keep
          information accurate and the service available, but we do not guarantee that it will be
          error-free or uninterrupted.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          To the maximum extent permitted by law, we are not liable for indirect or consequential loss
          arising from your use of the platform.
        </p>

        <h2>Governing law</h2>
        <p>
          These terms are governed by the laws of {org.country || "the jurisdiction in which the organisation is registered"}.
        </p>

        <h2>Changes</h2>
        <p>We may update these terms from time to time. Continued use after changes means you accept the updated terms.</p>

        <h2>Contact</h2>
        <p>Questions about these terms? Reach us at {contact}.</p>
      </div>
    </main>
  );
}
