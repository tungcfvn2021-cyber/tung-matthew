import { prisma } from "@/shared/lib/prisma";
import { site } from "@/shared/config/site";

/** Danh sách dịch vụ đang hoạt động (Combo VIP nổi bật lên đầu). */
export function getServices() {
  return prisma.service.findMany({
    where: { isActive: true, shop: { slug: site.slug } },
    orderBy: [{ isFeatured: "desc" }, { sortOrder: "asc" }],
    select: {
      id: true,
      name: true,
      slug: true,
      category: true,
      price: true,
      priceMax: true,
      durationMin: true,
      suitableFor: true,
      isFeatured: true,
    },
  });
}

export type ServiceListItem = Awaited<ReturnType<typeof getServices>>[number];

/** Dữ liệu tối giản cho form đặt lịch. */
export function getServicesForBooking() {
  return prisma.service.findMany({
    where: { isActive: true, shop: { slug: site.slug } },
    orderBy: [{ isFeatured: "desc" }, { sortOrder: "asc" }],
    select: {
      id: true,
      name: true,
      category: true,
      price: true,
      durationMin: true,
      isFeatured: true,
    },
  });
}

export type BookingServiceItem = Awaited<
  ReturnType<typeof getServicesForBooking>
>[number];

/** Giờ mở cửa (dùng để sinh khung giờ đặt lịch). */
export function getWorkingHours() {
  return prisma.workingHour.findMany({
    where: { shop: { slug: site.slug } },
    orderBy: { weekday: "asc" },
    select: { weekday: true, openTime: true, closeTime: true, isClosed: true },
  });
}
