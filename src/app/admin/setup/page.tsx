import { redirect } from "next/navigation";
import { prisma } from "@/shared/lib/prisma";
import { SetupForm } from "@/features/auth/ui/setup-form";

export const dynamic = "force-dynamic";

export default async function AdminSetupPage() {
  // Nếu đã có tài khoản -> khoá trang thiết lập, chuyển sang đăng nhập
  const count = await prisma.user.count();
  if (count > 0) redirect("/admin/login");

  return <SetupForm />;
}
