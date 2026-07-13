/**
 * Nguồn sự thật duy nhất cho thông tin thương hiệu (NAP + socials).
 * Đổi ở đây -> đồng bộ toàn site + Schema + metadata (chống lệch NAP hại Local SEO).
 * Giá trị dưới đây là mặc định; số điện thoại/địa chỉ thật sẽ được ghi đè
 * từ bảng Shop trong DB khi vận hành.
 */
export const site = {
  slug: "tung-matthew",
  name: "Tùng Matthew",
  legalName: "Tùng Matthew Barber",
  description:
    "Barber nam cao cấp tại Vũng Tàu. Fade, Undercut, Mohican chuẩn form — đặt lịch trực tiếp với Tùng Matthew.",
  city: "Vũng Tàu",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  // NAP — cập nhật khi có địa chỉ tiệm chính thức
  phone: "",
  addressLine: "",
  ward: "",
  city_full: "Vũng Tàu",
  country: "VN",

  socials: {
    tiktok: "",
    facebook: "",
    instagram: "",
    zalo: "",
    messenger: "",
  },
} as const;

export type Site = typeof site;
