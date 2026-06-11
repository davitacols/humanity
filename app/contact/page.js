import "../legal.css";
import { SupportInquiryForm } from "../../components/SupportInquiryForm";
import { getOrgContact } from "../../lib/org";

export const metadata = {
  title: "Contact",
  description: "Reach the Humanity First Initiative team — for partnerships, media, donations support, or general questions."
};

export default function ContactPage() {
  const org = getOrgContact();

  return (
    <main className="site-main legal">
      <p className="legal__eyebrow">Get in touch</p>
      <h1 className="legal__title">Contact us</h1>
      <p className="legal__updated" style={{ fontSize: "1.05rem", color: "var(--ink-soft)", maxWidth: "60ch", lineHeight: 1.7 }}>
        Partnerships, media, donation questions, or anything else — send a note and the team will get
        back to you by email.
      </p>

      <div className="contact-grid">
        <div className="contact-details">
          {org.email && (
            <div className="contact-detail">
              <span>Email</span>
              <a href={`mailto:${org.email}`}>{org.email}</a>
            </div>
          )}
          {org.phone && (
            <div className="contact-detail">
              <span>Phone</span>
              <a href={`tel:${org.phone.replace(/\s+/g, "")}`}>{org.phone}</a>
            </div>
          )}
          {org.address && (
            <div className="contact-detail">
              <span>Address</span>
              <p>{org.address}</p>
            </div>
          )}
          {(org.registration || org.country) && (
            <div className="contact-detail">
              <span>Organisation</span>
              <p>{[org.registration, org.country].filter(Boolean).join(" · ")}</p>
            </div>
          )}
          {org.socials.length > 0 && (
            <div className="contact-detail">
              <span>Follow</span>
              <div className="contact-socials">
                {org.socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer">{s.label}</a>
                ))}
              </div>
            </div>
          )}
          {!org.hasAny && (
            <p className="contact-empty">
              The fastest way to reach us right now is the form — every message is delivered straight
              to the team and answered by email.
            </p>
          )}
        </div>

        <div>
          <SupportInquiryForm variant="involvement" />
        </div>
      </div>
    </main>
  );
}
