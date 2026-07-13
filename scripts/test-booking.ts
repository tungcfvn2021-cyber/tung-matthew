// Integration test: chạy use-case createBooking thật trên DB, rồi đọc lại kiểm tra.
import { PrismaClient } from "@prisma/client";
import { PrismaBookingRepository } from "@/features/booking/infrastructure/booking.prisma.repository";
import { createBookingUseCase } from "@/features/booking/application/create-booking.usecase";

const prisma = new PrismaClient();

async function main() {
  const repo = new PrismaBookingRepository(prisma);

  const combo = await prisma.service.findFirst({
    where: { slug: "combo-vip" },
    select: { id: true, name: true, price: true, durationMin: true },
  });
  const fade = await prisma.service.findFirst({
    where: { slug: "low-fade" },
    select: { id: true, name: true, price: true },
  });
  if (!combo || !fade) throw new Error("Thiếu dịch vụ seed");

  // Ngày mai lúc 10:00 (trong giờ mở cửa 09:00–21:00)
  const start = new Date();
  start.setDate(start.getDate() + 1);
  start.setHours(10, 0, 0, 0);

  console.log("→ Test 1: booking hợp lệ (combo + fade)");
  const res = await createBookingUseCase(
    {
      serviceIds: [combo.id, fade.id],
      startAt: start.toISOString(),
      guestName: "Nguyễn Văn Test",
      guestPhone: "0901234567",
      guestNote: "Fade cao, tham khảo kiểu Hàn",
      source: "TIKTOK",
    },
    repo,
  );
  console.log("   kết quả:", JSON.stringify(res));
  if (!res.ok) throw new Error("Booking hợp lệ lại thất bại!");

  const saved = await prisma.booking.findUnique({
    where: { id: res.data.bookingId },
    include: { services: { include: { service: { select: { name: true } } } } },
  });
  console.log("   đã lưu:", {
    guest: saved?.guestName,
    phone: saved?.guestPhone,
    status: saved?.status,
    source: saved?.source,
    start: saved?.startAt,
    end: saved?.endAt,
    services: saved?.services.map((s) => ({
      name: s.service.name,
      priceSnapshot: s.priceSnapshot,
    })),
  });

  console.log("\n→ Test 2: SĐT sai -> phải bị chặn");
  const bad = await createBookingUseCase(
    {
      serviceIds: [fade.id],
      startAt: start.toISOString(),
      guestName: "Ai Đó",
      guestPhone: "abc123",
      source: "DIRECT",
    },
    repo,
  );
  console.log("   kết quả:", JSON.stringify(bad));
  if (bad.ok) throw new Error("SĐT sai lẽ ra phải bị từ chối!");

  console.log("\n→ Test 3: đặt lúc 03:00 sáng -> ngoài giờ mở cửa");
  const night = new Date();
  night.setDate(night.getDate() + 1);
  night.setHours(3, 0, 0, 0);
  const outOfHours = await createBookingUseCase(
    {
      serviceIds: [fade.id],
      startAt: night.toISOString(),
      guestName: "Cú Đêm",
      guestPhone: "0907654321",
      source: "DIRECT",
    },
    repo,
  );
  console.log("   kết quả:", JSON.stringify(outOfHours));
  if (outOfHours.ok) throw new Error("Ngoài giờ lẽ ra phải bị từ chối!");

  const total = await prisma.booking.count();
  console.log(`\n✅ Tất cả test đạt. Tổng booking trong DB: ${total}`);
}

main()
  .catch((e) => {
    console.error("❌ Test lỗi:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
