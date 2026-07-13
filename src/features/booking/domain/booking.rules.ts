/**
 * Quy tắc nghiệp vụ booking — HÀM THUẦN (không phụ thuộc DB/Next/React).
 * Dùng chung cho cả server (validate) lẫn client (hiển thị slot).
 */

const ICT = "Asia/Ho_Chi_Minh";
const WEEKDAY_MAP: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

export interface WorkingHourLite {
  weekday: number;
  openTime: string;
  closeTime: string;
  isClosed: boolean;
}

/** "09:00" -> 540 phút. */
export function timeToMinutes(time: string): number {
  const [h, m] = time.split(":");
  return Number(h) * 60 + Number(m);
}

/** 540 -> "09:00". */
export function minutesToTime(total: number): string {
  const h = Math.floor(total / 60);
  const m = total % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/** endAt = startAt + tổng thời lượng dịch vụ. */
export function computeEndAt(startAt: Date, totalMinutes: number): Date {
  return new Date(startAt.getTime() + totalMinutes * 60_000);
}

/** Lấy thứ trong tuần (0=CN..6=T7) và phút-trong-ngày theo giờ Việt Nam (ICT). */
export function ictPartsOf(date: Date): { weekday: number; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: ICT,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);

  let wd = "Sun";
  let hh = 0;
  let mm = 0;
  for (const p of parts) {
    if (p.type === "weekday") wd = p.value;
    else if (p.type === "hour") hh = Number(p.value) % 24;
    else if (p.type === "minute") mm = Number(p.value);
  }
  return { weekday: WEEKDAY_MAP[wd] ?? 0, minutes: hh * 60 + mm };
}

/** Booking có nằm trong giờ mở cửa (theo ICT) không. */
export function isWithinWorkingHours(
  startAt: Date,
  endAt: Date,
  hours: WorkingHourLite[],
): boolean {
  const s = ictPartsOf(startAt);
  const e = ictPartsOf(endAt);
  if (e.weekday !== s.weekday) return false; // tràn sang ngày khác

  const wh = hours.find((h) => h.weekday === s.weekday);
  if (!wh || wh.isClosed) return false;

  const open = timeToMinutes(wh.openTime);
  const close = timeToMinutes(wh.closeTime);
  return s.minutes >= open && e.minutes <= close && s.minutes < e.minutes;
}

/** Sinh danh sách khung giờ "HH:mm" trong giờ mở cửa (client hiển thị). */
export function buildSlots(
  openTime: string,
  closeTime: string,
  stepMin = 30,
): string[] {
  const open = timeToMinutes(openTime);
  const close = timeToMinutes(closeTime);
  const slots: string[] = [];
  for (let t = open; t + stepMin <= close; t += stepMin) {
    slots.push(minutesToTime(t));
  }
  return slots;
}
