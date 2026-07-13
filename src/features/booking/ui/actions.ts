"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/shared/lib/prisma";
import { PrismaBookingRepository } from "@/features/booking/infrastructure/booking.prisma.repository";
import { createBookingUseCase } from "@/features/booking/application/create-booking.usecase";
import type { BookingFormPayload } from "@/features/booking/application/booking.schema";
import { checkRateLimit } from "@/shared/lib/rate-limit";
import {
  notifyBookingReceivedToCustomer,
  notifyAdminNewBooking,
} from "@/shared/lib/notify";
import { fail, ErrorCode, type ActionResult } from "@/shared/types/action";

export async function createBookingAction(
  payload: BookingFormPayload,
): Promise<ActionResult<{ bookingId: string; status: "PENDING" }>> {
  // Honeypot — bot điền _hp
  if (typeof payload?._hp === "string" && payload._hp.length > 0) {
    return fail(ErrorCode.RATE_LIMITED, "Yêu cầu không hợp lệ.");
  }

  const phoneKey =
    typeof payload?.guestPhone === "string" ? payload.guestPhone : "anon";
  if (!checkRateLimit(`booking:${phoneKey}`)) {
    return fail(
      ErrorCode.RATE_LIMITED,
      "Bạn thao tác quá nhanh. Vui lòng thử lại sau ít phút.",
    );
  }

  const repo = new PrismaBookingRepository(prisma);

  let result: ActionResult<{ bookingId: string; status: "PENDING" }>;
  try {
    result = await createBookingUseCase(payload, repo);
  } catch (e) {
    console.error("[createBooking] lỗi:", e);
    return fail(
      ErrorCode.INTERNAL,
      "Có lỗi xảy ra, vui lòng thử lại hoặc nhắn Zalo cho tiệm.",
    );
  }

  if (result.ok) {
    // side-effect best-effort — KHÔNG chặn booking nếu Zalo/email lỗi
    await Promise.allSettled([
      notifyBookingReceivedToCustomer(payload.guestPhone),
      notifyAdminNewBooking(result.data.bookingId),
    ]);
    revalidatePath("/admin/bookings");
  }

  return result;
}
