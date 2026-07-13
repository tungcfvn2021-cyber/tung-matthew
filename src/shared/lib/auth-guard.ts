import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/shared/lib/auth";

/** Lấy session hiện tại (server). */
export async function getSession() {
  return auth.api.getSession({ headers: await headers() });
}

/** Bắt buộc đăng nhập admin — dùng trong page/layout. Redirect nếu chưa đăng nhập. */
export async function requireAdmin() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
}
