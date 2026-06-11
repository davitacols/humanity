import { AdminNav } from "../../components/AdminNav";
import "./admin.css";

export const metadata = {
  robots: {
    index: false,
    follow: false
  }
};

export default function AdminLayout({ children }) {
  return (
    <div className="admin-shell">
      <AdminNav />
      <div className="admin-shell__content">{children}</div>
    </div>
  );
}
