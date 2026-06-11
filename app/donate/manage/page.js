import "../../legal.css";
import { ManageDonationForm } from "../../../components/ManageDonationForm";

export const metadata = {
  title: "Manage your donation",
  description: "Cancel a recurring monthly donation to Humanity First Initiative.",
  robots: { index: false, follow: false }
};

export default function ManageDonationPage() {
  return (
    <main className="site-main legal">
      <p className="legal__eyebrow">Donations</p>
      <h1 className="legal__title">Manage your giving</h1>
      <p className="legal__updated" style={{ fontSize: "1.02rem", color: "var(--ink-soft)", maxWidth: "60ch", lineHeight: 1.7 }}>
        Cancel a recurring monthly donation here. One-time gifts don't recur, so they need no action.
      </p>
      <div style={{ maxWidth: 660 }}>
        <ManageDonationForm />
      </div>
    </main>
  );
}
