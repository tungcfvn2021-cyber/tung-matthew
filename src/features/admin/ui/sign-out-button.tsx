"use client";

import { useRouter } from "next/navigation";
import { signOut } from "@/shared/lib/auth-client";

export function SignOutButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={async () => {
        await signOut();
        router.push("/admin/login");
        router.refresh();
      }}
      className="text-sm text-smoke transition-colors hover:text-paper"
    >
      Đăng xuất
    </button>
  );
}
