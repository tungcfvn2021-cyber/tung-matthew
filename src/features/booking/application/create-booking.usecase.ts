import { createBookingSchema } from "@/features/booking/application/booking.schema";
import type { BookingRepository } from "@/features/booking/domain/booking.repository";
import {
  computeEndAt,
  isWithinWorkingHours,
} from "@/features/booking/domain/booking.rules";
import { ok, fail, ErrorCode, type ActionResult } from "@/shared/types/action";

/** Use-case tạo booking: validate -> kiểm tra dịch vụ + giờ mở -> lưu (snapshot giá). */
export async function createBookingUseCase(
  raw: unknown,
  repo: BookingRepository,
): Promise<ActionResult<{ bookingId: string; status: "PENDING" }>> {
  const parsed = createBookingSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }
    return fail(
      ErrorCode.VALIDATION,
      "Thông tin chưa hợp lệ, vui lòng kiểm tra lại.",
      fieldErrors,
    );
  }

  const input = parsed.data;

  const services = await repo.getActiveServices(input.serviceIds);
  if (services.length === 0 || services.length !== input.serviceIds.length) {
    return fail(
      ErrorCode.NOT_FOUND,
      "Một số dịch vụ không còn khả dụng, vui lòng chọn lại.",
    );
  }

  const totalMinutes = services.reduce((sum, s) => sum + s.durationMin, 0);
  const endAt = computeEndAt(input.startAt, totalMinutes);

  const hours = await repo.getWorkingHours();
  if (!isWithinWorkingHours(input.startAt, endAt, hours)) {
    return fail(
      ErrorCode.OUT_OF_HOURS,
      "Khung giờ bạn chọn nằm ngoài giờ mở cửa. Vui lòng chọn giờ khác.",
    );
  }

  const { id } = await repo.createBooking({
    guestName: input.guestName,
    guestPhone: input.guestPhone,
    guestNote: input.guestNote ?? null,
    startAt: input.startAt,
    endAt,
    source: input.source,
    services: services.map((s) => ({
      serviceId: s.id,
      priceSnapshot: s.price,
      durationSnapshot: s.durationMin,
    })),
  });

  return ok({ bookingId: id, status: "PENDING" as const });
}
