import { listGuestSummary } from "@/features/booking/application/get-bookings";
import { formatDateTimeVN } from "@/shared/lib/utils";

export const dynamic = "force-dynamic";

export default async function CustomersPage() {
  const guests = await listGuestSummary();

  return (
    <div>
      <h1 className="mb-2 font-display text-2xl font-bold">Khách hàng</h1>
      <p className="mb-6 text-sm text-smoke">
        Tổng hợp từ dữ liệu đặt lịch (theo số điện thoại). CRM đầy đủ (ghi chú,
        điểm thưởng, nhắc lịch) sẽ mở ở Phase 2.
      </p>

      {guests.length === 0 ? (
        <p className="text-sm text-smoke">Chưa có khách nào.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-line">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line text-left text-xs uppercase tracking-wider text-smoke-2">
                <th className="px-4 py-3 font-medium">Khách</th>
                <th className="px-4 py-3 font-medium">Điện thoại</th>
                <th className="px-4 py-3 font-medium">Số lần</th>
                <th className="px-4 py-3 font-medium">Gần nhất</th>
              </tr>
            </thead>
            <tbody>
              {guests.map((g) => (
                <tr
                  key={g.phone}
                  className="border-b border-line last:border-0"
                >
                  <td className="px-4 py-3 font-medium text-paper">{g.name}</td>
                  <td className="px-4 py-3">
                    <a href={`tel:${g.phone}`} className="text-gold">
                      {g.phone}
                    </a>
                  </td>
                  <td className="px-4 py-3 tabular-nums text-smoke">
                    {g.visits}
                  </td>
                  <td className="px-4 py-3 tabular-nums text-smoke">
                    {g.lastAt ? formatDateTimeVN(g.lastAt) : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
