import {
  getDashboardStats,
  listTodayBookings,
} from "@/features/booking/application/get-bookings";
import { formatVnd, formatDateTimeVN } from "@/shared/lib/utils";
import { statusLabel } from "@/features/booking/domain/status";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [stats, today] = await Promise.all([
    getDashboardStats(),
    listTodayBookings(),
  ]);

  const cards = [
    { label: "Tổng booking", value: String(stats.total) },
    { label: "Chờ xác nhận", value: String(stats.pending), highlight: true },
    { label: "Hôm nay", value: String(stats.todayCount) },
    { label: "Doanh thu (hoàn tất)", value: formatVnd(stats.revenue) },
  ];

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-bold">Tổng quan</h1>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {cards.map((c) => (
          <div
            key={c.label}
            className={`rounded-xl border p-4 ${
              c.highlight && stats.pending > 0
                ? "border-gold bg-panel"
                : "border-line bg-ink-2"
            }`}
          >
            <div className="text-xs uppercase tracking-wider text-smoke-2">
              {c.label}
            </div>
            <div className="mt-2 font-display text-2xl font-bold tabular-nums text-paper">
              {c.value}
            </div>
          </div>
        ))}
      </div>

      <h2 className="mb-4 mt-10 font-display text-lg font-semibold">
        Lịch hôm nay
      </h2>
      {today.length === 0 ? (
        <p className="text-sm text-smoke">Chưa có lịch nào hôm nay.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {today.map((b) => (
            <li
              key={b.id}
              className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-line bg-ink-2 px-4 py-3"
            >
              <div>
                <span className="font-semibold text-paper">{b.guestName}</span>
                <span className="ml-2 text-sm text-smoke">
                  {b.services.map((s) => s.service.name).join(", ")}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="tabular-nums text-smoke">
                  {formatDateTimeVN(b.startAt)}
                </span>
                <span className="text-gold">{statusLabel(b.status)}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
