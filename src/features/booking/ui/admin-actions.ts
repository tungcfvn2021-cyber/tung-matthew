"use server";

import { revalidatePath } from "next/cache";
import type { BookingStatus } from "@prisma/client";
import { prisma } from "@/shared/lib/prisma";
import { getSession } from "@/shared/lib/auth-guard";
import { site } from "@/shared/config/site";
import { ok, fail, ErrorCode, type ActionResult } from "@/shared/types/action";

async function assertAdmin(): Promise<ActionResult<true>> {
  const session = await getSession();
  if (!session) return fail(ErrorCode.UNAUTHORIZED, "Bạn cần đăng nhập.");
  return ok(true);
}

/** Cập nhật trạng thái booking (xác nhận / hoàn tất / huỷ / vắng mặt). */
export async function setBookingStatus(
  id: string,
  status: BookingStatus,
): Promise<ActionResult<true>> {
  const guard = await assertAdmin();
  if (!guard.ok) return guard;

  try {
    const res = await prisma.booking.updateMany({
      where: { id, shop: { slug: site.slug } },
      data: {
        status,
        ...(status === "CONFIRMED" ? { confirmedAt: new Date() } : {}),
        ...(status === "CANCELLED" ? { cancelledAt: new Date() } : {}),
      },
    });
    if (res.count === 0) {
      return fail(ErrorCode.NOT_FOUND, "Không tìm thấy booking.");
    }
    revalidatePath("/admin/bookings");
    revalidatePath("/admin");
    return ok(true);
  } catch (e) {
    console.error("[setBookingStatus]", e);
    return fail(ErrorCode.INTERNAL, "Không cập nhật được, vui lòng thử lại.");
  }
}
