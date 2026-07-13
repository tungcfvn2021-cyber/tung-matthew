import Link from "next/link";
import type { BookingStatus } from "@prisma/client";
import { listBookings } from "@/features/booking/application/get-bookings";
import { BookingRow } from "@/features/booking/ui/booking-row";
import { STATUS_FILTERS } from "@/features/booking/domain/status";

export const dynamic = "force-dynamic";

const VALID = ["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED", "NO_SHOW"];

export default async function BookingsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const sp = await searchParams;
  const status =
    sp.status && VALID.includes(sp.status)
      ? (sp.status as BookingStatus)
      : undefined;

  const bookings = await listBookings(status);
  const rows = bookings.map((b) => ({
    id: b.id,
    guestName: b.guestName,
    guestPhone: b.guestPhone,
    guestNote: b.guestNote,
    startAt: b.startAt,
    status: b.status,
    source: b.source,
    services: b.services.map((s) => ({
      name: s.service.name,
      price: s.priceSnapshot,
    })),
  }));

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-bold">Booking</h1>

      <div className="mb-6 flex flex-wrap gap-2">
        {STATUS_FILTERS.map((f) => {
          const active = (status ?? "") === f.value;
          return (
            <Link
              key={f.value}
              href={{
                pathname: "/admin/bookings",
                query: f.value ? { status: f.value } : {},
              }}
              className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                active
                  ? "border-gold bg-gold text-ink"
                  : "border-line text-smoke hover:border-line-gold"
              }`}
            >
              {f.label}
            </Link>
          );
        })}
      </div>

      {rows.length === 0 ? (
        <p className="text-sm text-smoke">Chưa có booking nào.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {rows.map((b) => (
            <BookingRow key={b.id} b={b} />
          ))}
        </div>
      )}
    </div>
  );
}
