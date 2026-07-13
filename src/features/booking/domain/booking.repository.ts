import type { WorkingHourLite } from "@/features/booking/domain/booking.rules";

/** Cổng (port) — application phụ thuộc vào đây, không phụ thuộc Prisma. */

export interface ServiceForBooking {
  id: string;
  name: string;
  price: number;
  durationMin: number;
}

export interface CreateBookingData {
  guestName: string;
  guestPhone: string;
  guestNote: string | null;
  startAt: Date;
  endAt: Date;
  source: string;
  services: {
    serviceId: string;
    priceSnapshot: number;
    durationSnapshot: number;
  }[];
}

export interface BookingRepository {
  getActiveServices(ids: string[]): Promise<ServiceForBooking[]>;
  getWorkingHours(): Promise<WorkingHourLite[]>;
  createBooking(data: CreateBookingData): Promise<{ id: string }>;
}
