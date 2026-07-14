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
  // Tên miền chính thức (dùng cho canonical, OpenGraph, sitemap).
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.tungmatthew.pro.vn",

  // Ảnh chân dung barber (đặt file vào public/, hoặc dùng URL Cloudinary).
  // Để trống "" -> hiện monogram TM. Đổi thành "/portrait.jpg" khi đã có ảnh.
  portraitUrl: "/portrait.jpg",

  // NAP — phải khớp Google Business Profile
  phone: "0345234671",
  addressLine: "1048 F11",
  ward: "",
  city_full: "Vũng Tàu",
  country: "VN",

  socials: {
    tiktok: "https://www.tiktok.com/@zzz1.9.9.9",
    facebook: "https://www.facebook.com/tungcfvn",
    instagram: "",
    zalo: "https://zalo.me/0345234671",
    messenger: "https://m.me/tungcfvn",
  },
} as const;

export type Site = typeof site;
