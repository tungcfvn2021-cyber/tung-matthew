import { z } from "zod";
import { normalizeVnPhone } from "@/shared/lib/utils";

export const LEAD_SOURCES = [
  "TIKTOK",
  "FACEBOOK",
  "INSTAGRAM",
  "GOOGLE",
  "ZALO",
  "DIRECT",
  "OTHER",
] as const;

export const createBookingSchema = z.object({
  serviceIds: z
    .array(z.string().min(1))
    .min(1, "Vui lòng chọn ít nhất 1 dịch vụ"),
  startAt: z.coerce
    .date()
    .refine(
      (d) => !Number.isNaN(d.getTime()) && d.getTime() > Date.now() - 60_000,
      "Thời gian đặt không hợp lệ",
    ),
  guestName: z
    .string()
    .trim()
    .min(2, "Vui lòng nhập tên (ít nhất 2 ký tự)")
    .max(80, "Tên quá dài"),
  guestPhone: z
    .string()
    .trim()
    .refine((v) => normalizeVnPhone(v) !== null, "Số điện thoại không hợp lệ")
    .transform((v) => normalizeVnPhone(v) as string),
  guestNote: z
    .string()
    .max(500, "Ghi chú quá dài")
    .optional()
    .transform((v) => (v && v.trim() ? v.trim() : undefined)),
  source: z.enum(LEAD_SOURCES).default("DIRECT"),
  // honeypot — bot điền vào đây, người thật thì trống
  _hp: z.string().max(0).optional(),
});

export type CreateBookingParsed = z.output<typeof createBookingSchema>;

/** Payload client gửi lên (trước khi Zod transform). */
export interface BookingFormPayload {
  serviceIds: string[];
  startAt: string;
  guestName: string;
  guestPhone: string;
  guestNote?: string;
  source?: (typeof LEAD_SOURCES)[number];
  _hp?: string;
}
