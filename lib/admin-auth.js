import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ADMIN_COOKIE = "humanity_admin";

export async function requireAdmin() {
  const token = process.env.ADMIN_TOKEN;

  if (!token) {
    redirect("/admin/login?setup=missing");
  }

  const cookieStore = await cookies();
  const cookie = cookieStore.get(ADMIN_COOKIE);

  if (!cookie || cookie.value !== token) {
    redirect("/admin/login");
  }
}
