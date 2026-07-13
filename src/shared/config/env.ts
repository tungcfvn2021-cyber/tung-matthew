import { z } from "zod";

/**
 * Xác thực biến môi trường bằng Zod — FAIL-FAST.
 * Thiếu/sai biến bắt buộc -> app không khởi động (không lỗi ngầm lúc chạy).
 * Các biến của sprint sau để optional để build/dev không vỡ khi chưa cấu hình.
 */
const serverSchema = z.object({
  DATABASE_URL: z.string().url("DATABASE_URL phải là chuỗi kết nối hợp lệ"),

  // Sprint 4+ (optional cho tới khi tích hợp)
  BETTER_AUTH_SECRET: z.string().optional(),
  BETTER_AUTH_URL: z.string().url().optional(),

  // Sprint 3+ (optional)
  ZALO_OA_ID: z.string().optional(),
  ZALO_OA_SECRET: z.string().optional(),
  ZALO_ACCESS_TOKEN: z.string().optional(),
  RESEND_API_KEY: z.string().optional(),
  ADMIN_NOTIFY_EMAIL: z.string().email().optional().or(z.literal("")),

  // Sprint 5 (optional)
  CLOUDINARY_CLOUD_NAME: z.string().optional(),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),
  GOOGLE_MAPS_API_KEY: z.string().optional(),
  GOOGLE_PLACES_API_KEY: z.string().optional(),
  CRON_SECRET: z.string().optional(),
});

const publicSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
  NEXT_PUBLIC_GA4_ID: z.string().optional(),
  NEXT_PUBLIC_META_PIXEL_ID: z.string().optional(),
  NEXT_PUBLIC_TIKTOK_PIXEL_ID: z.string().optional(),
});

function parseEnv() {
  const parsed = serverSchema
    .merge(publicSchema)
    .safeParse(process.env);

  if (!parsed.success) {
    console.error(
      "❌ Biến môi trường không hợp lệ:",
      parsed.error.flatten().fieldErrors,
    );
    throw new Error("Cấu hình môi trường không hợp lệ. Kiểm tra file .env");
  }
  return parsed.data;
}

export const env = parseEnv();
export type Env = typeof env;
