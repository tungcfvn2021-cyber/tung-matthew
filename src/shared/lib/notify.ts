import { maskPhone } from "@/shared/lib/utils";

/**
 * Thông báo booking — BEST-EFFORT (không được chặn luồng đặt lịch).
 * Sprint 3: log an toàn (che PII). Tích hợp Zalo ZNS + Resend ở bước sau,
 * với fallback khi ZNS chưa được duyệt.
 */

export async function notifyBookingReceivedToCustomer(
  phone: string,
): Promise<void> {
  // TODO(Sprint sau): gửi Zalo ZNS xác nhận cho khách.
  console.info(`[notify] Xác nhận booking tới khách ${maskPhone(phone)}`);
}

export async function notifyAdminNewBooking(bookingId: string): Promise<void> {
  // TODO(Sprint sau): gửi Zalo/Email cho admin (Resend).
  console.info(`[notify] Booking mới cần xác nhận: ${bookingId}`);
}
