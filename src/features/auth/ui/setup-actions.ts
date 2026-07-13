"use server";

import { prisma } from "@/shared/lib/prisma";
import { auth } from "@/shared/lib/auth";
import { site } from "@/shared/config/site";
import { ok, fail, ErrorCode, type ActionResult } from "@/shared/types/action";

/**
 * Tạo tài khoản quản trị ĐẦU TIÊN (OWNER) qua web.
 * Chỉ hoạt động khi CHƯA có user nào — sau đó trang thiết lập tự khoá.
 */
export async function createFirstAdmin(input: {
  email: string;
  password: string;
  name?: string;
}): Promise<ActionResult<true>> {
  const count = await prisma.user.count();
  if (count > 0) {
    return fail(
      ErrorCode.UNAUTHORIZED,
      "Đã có tài khoản quản trị. Trang thiết lập đã đóng — hãy đăng nhập.",
    );
  }

  const email = input.email?.trim().toLowerCase();
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return fail(ErrorCode.VALIDATION, "Email không hợp lệ.");
  }
  if (!input.password || input.password.length < 8) {
    return fail(ErrorCode.VALIDATION, "Mật khẩu phải từ 8 ký tự trở lên.");
  }

  try {
    await auth.api.signUpEmail({
      body: { email, password: input.password, name: input.name?.trim() || "Admin" },
    });
  } catch (e) {
    return fail(
      ErrorCode.INTERNAL,
      "Không tạo được tài khoản: " + (e as Error).message,
    );
  }

  const shop = await prisma.shop.findUnique({
    where: { slug: site.slug },
    select: { id: true },
  });
  await prisma.user.update({
    where: { email },
    data: { role: "OWNER", shopId: shop?.id ?? null, emailVerified: true },
  });

  return ok(true);
}
