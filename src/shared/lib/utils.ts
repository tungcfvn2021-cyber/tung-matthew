import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Ghép className có xử lý xung đột Tailwind. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Định dạng tiền VND: 120000 -> "120.000₫". */
export function formatVnd(amount: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Chuẩn hoá SĐT Việt Nam về dạng E.164 (+84...).
 * "0901234567" -> "+84901234567". Trả null nếu không hợp lệ.
 */
export function normalizeVnPhone(raw: string): string | null {
  const digits = raw.replace(/[^\d+]/g, "");
  let n = digits;
  if (n.startsWith("+84")) n = "0" + n.slice(3);
  else if (n.startsWith("84")) n = "0" + n.slice(2);
  if (!/^0\d{9}$/.test(n)) return null;
  return "+84" + n.slice(1);
}

/** Định dạng thời lượng: 90 -> "1 giờ 30 phút", 45 -> "45 phút". */
export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} phút`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h} giờ` : `${h} giờ ${m} phút`;
}

/** Ngày giờ theo giờ VN: "T2, 13/07 · 10:00". */
export function formatDateTimeVN(date: Date): string {
  const d = new Intl.DateTimeFormat("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
  }).format(date);
  const t = new Intl.DateTimeFormat("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
  return `${d} · ${t}`;
}

/** Che SĐT khi ghi log (bảo vệ PII): "+84901234567" -> "+8490***4567". */
export function maskPhone(phone: string): string {
  if (phone.length < 8) return "***";
  return phone.slice(0, 5) + "***" + phone.slice(-4);
}
