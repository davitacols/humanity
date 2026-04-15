import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ADMIN_COOKIE = "humanity_admin";

function requireAdmin() {
  const token = process.env.ADMIN_TOKEN;
  if (!token) {
    return;
  }

  const cookie = cookies().get(ADMIN_COOKIE);
  if (!cookie || cookie.value !== token) {
    redirect("/admin/login");
  }
}

export default function AdminLayout({ children }) {
  requireAdmin();

  return <div className="admin-shell">{children}</div>;
}
