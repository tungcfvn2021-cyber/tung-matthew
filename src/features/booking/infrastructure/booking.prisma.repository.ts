import type { PrismaClient, LeadSource } from "@prisma/client";
import type {
  BookingRepository,
  CreateBookingData,
  ServiceForBooking,
} from "@/features/booking/domain/booking.repository";
import type { WorkingHourLite } from "@/features/booking/domain/booking.rules";
import { site } from "@/shared/config/site";

/** Adapter Prisma cho BookingRepository. */
export class PrismaBookingRepository implements BookingRepository {
  private shopIdPromise: Promise<string> | null = null;

  constructor(
    private readonly db: PrismaClient,
    private readonly shopSlug: string = site.slug,
  ) {}

  private getShopId(): Promise<string> {
    if (!this.shopIdPromise) {
      this.shopIdPromise = this.db.shop
        .findUnique({ where: { slug: this.shopSlug }, select: { id: true } })
        .then((shop) => {
          if (!shop) throw new Error(`Không tìm thấy shop "${this.shopSlug}"`);
          return shop.id;
        });
    }
    return this.shopIdPromise;
  }

  async getActiveServices(ids: string[]): Promise<ServiceForBooking[]> {
    const shopId = await this.getShopId();
    return this.db.service.findMany({
      where: { id: { in: ids }, shopId, isActive: true },
      select: { id: true, name: true, price: true, durationMin: true },
    });
  }

  async getWorkingHours(): Promise<WorkingHourLite[]> {
    const shopId = await this.getShopId();
    return this.db.workingHour.findMany({
      where: { shopId },
      select: {
        weekday: true,
        openTime: true,
        closeTime: true,
        isClosed: true,
      },
    });
  }

  async createBooking(data: CreateBookingData): Promise<{ id: string }> {
    const shopId = await this.getShopId();
    return this.db.$transaction(async (tx) => {
      const booking = await tx.booking.create({
        data: {
          shopId,
          guestName: data.guestName,
          guestPhone: data.guestPhone,
          guestNote: data.guestNote,
          startAt: data.startAt,
          endAt: data.endAt,
          status: "PENDING",
          confirmChannel: "ZALO",
          source: data.source as LeadSource,
        },
        select: { id: true },
      });

      await tx.bookingService.createMany({
        data: data.services.map((s) => ({
          bookingId: booking.id,
          serviceId: s.serviceId,
          priceSnapshot: s.priceSnapshot,
          durationSnapshot: s.durationSnapshot,
        })),
      });

      return { id: booking.id };
    });
  }
}
