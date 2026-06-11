import Link from "next/link";
import { notFound } from "next/navigation";
import { getCertificateBySerial } from "../../../../lib/lms";
import "../../lms.css";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { serial } = await params;
  return {
    title: `Certificate ${serial} — Humanity First Academy`,
    description: "Verified course completion certificate from Humanity First Academy.",
    robots: { index: false, follow: false }
  };
}

function formatLongDate(value) {
  if (!value) return "";
  try {
    return new Intl.DateTimeFormat("en-NG", { day: "numeric", month: "long", year: "numeric" }).format(
      new Date(value)
    );
  } catch {
    return "";
  }
}

export default async function CertificatePage({ params }) {
  const { serial } = await params;
  const certificate = await getCertificateBySerial(serial);

  if (!certificate) notFound();

  return (
    <main className="lms-cert-page">
      <div className="lms-cert-page__toolbar">
        <Link href="/lms" className="button button--secondary">
          Back to academy
        </Link>
      </div>

      <article className="lms-cert">
        <div className="lms-cert__frame">
          <p className="lms-cert__brand">Humanity First Academy</p>
          <p className="lms-cert__kicker">Certificate of Completion</p>
          <p className="lms-cert__lead">This certifies that</p>
          <h1 className="lms-cert__name">{certificate.learnerName}</h1>
          <p className="lms-cert__lead">has successfully completed</p>
          <h2 className="lms-cert__course">{certificate.courseTitle}</h2>
          <p className="lms-cert__meta">
            {certificate.track} · {certificate.level} · {certificate.duration}
          </p>

          <div className="lms-cert__footer">
            <div>
              <span>Issued</span>
              <strong>{formatLongDate(certificate.issuedAt)}</strong>
            </div>
            <div>
              <span>Certificate ID</span>
              <strong>{certificate.serial}</strong>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
