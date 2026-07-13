"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import type { BookingStatus } from "@prisma/client";
import { setBookingStatus } from "@/features/booking/ui/admin-actions";
import { statusLabel } from "@/features/booking/domain/status";
import { formatVnd, formatDateTimeVN } from "@/shared/lib/utils";

export type BookingRowData = {
  id: string;
  guestName: string;
  guestPhone: string;
  guestNote: string | null;
  startAt: Date;
  status: string;
  source: string;
  services: { name: string; price: number }[];
};

const ACTIONS: Record<
  string,
  { status: BookingStatus; label: string; primary?: boolean }[]
> = {
  PENDING: [
    { status: "CONFIRMED", label: "Xác nhận", primary: true },
    { status: "CANCELLED", label: "Huỷ" },
  ],
  CONFIRMED: [
    { status: "COMPLETED", label: "Hoàn tất", primary: true },
    { status: "NO_SHOW", label: "Vắng mặt" },
    { status: "CANCELLED", label: "Huỷ" },
  ],
};

export function BookingRow({ b }: { b: BookingRowData }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const actions = ACTIONS[b.status] ?? [];
  const total = b.services.reduce((s, x) => s + x.price, 0);

  function act(status: BookingStatus) {
    startTransition(async () => {
      const res = await setBookingStatus(b.id, status);
      if (res.ok) router.refresh();
      else alert(res.error.message);
    });
  }

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-line bg-ink-2 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold text-paper">{b.guestName}</span>
          <span
            className={`rounded-[2px] px-2 py-0.5 text-[11px] font-semibold ${
              b.status === "PENDING"
                ? "bg-gold text-ink"
                : "border border-line-gold text-smoke"
            }`}
          >
            {statusLabel(b.status)}
          </span>
          <span className="text-[11px] uppercase tracking-wider text-smoke-2">
            {b.source}
          </span>
        </div>
        <div className="mt-1 text-sm text-smoke">
          {b.services.map((s) => s.name).join(", ")} · {formatVnd(total)}
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-smoke">
          <span className="tabular-nums text-paper">
            {formatDateTimeVN(b.startAt)}
          </span>
          <a href={`tel:${b.guestPhone}`} className="text-gold">
            {b.guestPhone}
          </a>
        </div>
        {b.guestNote && (
          <div className="mt-1 text-sm italic text-smoke-2">“{b.guestNote}”</div>
        )}
      </div>

      {actions.length > 0 && (
        <div className="flex shrink-0 flex-wrap gap-2">
          {actions.map((a) => (
            <button
              key={a.status}
              type="button"
              disabled={pending}
              onClick={() => act(a.status)}
              className={`rounded-[2px] px-3 py-2 text-sm font-semibold transition-colors disabled:opacity-50 ${
                a.primary
                  ? "bg-gold text-ink hover:bg-gold-soft"
                  : "border border-line text-paper hover:border-line-gold"
              }`}
            >
              {a.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
