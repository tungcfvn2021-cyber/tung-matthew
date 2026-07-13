import { prisma } from "@/shared/lib/prisma";
import { site } from "@/shared/config/site";
import type { BookingStatus } from "@prisma/client";

/** Danh sách booking cho admin (mới nhất trước). */
export async function listBookings(status?: BookingStatus) {
  return prisma.booking.findMany({
    where: { shop: { slug: site.slug }, ...(status ? { status } : {}) },
    orderBy: { startAt: "desc" },
    take: 200,
    include: {
      services: { include: { service: { select: { name: true } } } },
    },
  });
}

export type AdminBooking = Awaited<ReturnType<typeof listBookings>>[number];

/** Số liệu tổng quan cho dashboard. */
export async function getDashboardStats() {
  const shopWhere = { shop: { slug: site.slug } };
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const endOfDay = new Date(startOfDay.getTime() + 86_400_000);

  const [total, pending, todayCount, completed, revenueAgg] = await Promise.all(
    [
      prisma.booking.count({ where: shopWhere }),
      prisma.booking.count({ where: { ...shopWhere, status: "PENDING" } }),
      prisma.booking.count({
        where: { ...shopWhere, startAt: { gte: startOfDay, lt: endOfDay } },
      }),
      prisma.booking.count({ where: { ...shopWhere, status: "COMPLETED" } }),
      prisma.bookingService.aggregate({
        _sum: { priceSnapshot: true },
        where: { booking: { ...shopWhere, status: "COMPLETED" } },
      }),
    ],
  );

  return {
    total,
    pending,
    todayCount,
    completed,
    revenue: revenueAgg._sum.priceSnapshot ?? 0,
  };
}

/** Tổng hợp khách theo SĐT (CRM cơ bản từ dữ liệu booking). */
export async function listGuestSummary() {
  const rows = await prisma.booking.groupBy({
    by: ["guestPhone", "guestName"],
    where: { shop: { slug: site.slug } },
    _count: { _all: true },
    _max: { startAt: true },
    orderBy: { _max: { startAt: "desc" } },
    take: 200,
  });
  return rows.map((r) => ({
    phone: r.guestPhone,
    name: r.guestName,
    visits: r._count._all,
    lastAt: r._max.startAt,
  }));
}

/** Booking hôm nay (cho dashboard). */
export function listTodayBookings() {
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const endOfDay = new Date(startOfDay.getTime() + 86_400_000);
  return prisma.booking.findMany({
    where: {
      shop: { slug: site.slug },
      startAt: { gte: startOfDay, lt: endOfDay },
    },
    orderBy: { startAt: "asc" },
    include: { services: { include: { service: { select: { name: true } } } } },
  });
}
