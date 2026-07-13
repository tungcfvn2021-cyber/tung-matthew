/** Nhãn tiếng Việt + thứ tự hiển thị cho danh mục dịch vụ (client-safe, không import Prisma). */

export const CATEGORY_LABELS: Record<string, string> = {
  COMBO: "Combo VIP",
  FADE: "Fade",
  CUT: "Cắt & Tạo kiểu",
  STYLING: "Vuốt tạo kiểu",
  PERM: "Uốn",
  COLOR: "Nhuộm",
  BLEACH: "Tẩy",
  SHAVE: "Cạo mặt",
  MASSAGE: "Massage",
};

export const CATEGORY_ORDER = [
  "COMBO",
  "FADE",
  "CUT",
  "STYLING",
  "PERM",
  "COLOR",
  "BLEACH",
  "SHAVE",
  "MASSAGE",
] as const;

export function categoryLabel(category: string): string {
  return CATEGORY_LABELS[category] ?? category;
}
