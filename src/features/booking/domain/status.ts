/** Nhãn tiếng Việt cho trạng thái booking (client-safe). */
export const STATUS_LABELS: Record<string, string> = {
  PENDING: "Chờ xác nhận",
  CONFIRMED: "Đã xác nhận",
  COMPLETED: "Hoàn tất",
  CANCELLED: "Đã huỷ",
  NO_SHOW: "Vắng mặt",
};

export const STATUS_FILTERS = [
  { value: "", label: "Tất cả" },
  { value: "PENDING", label: "Chờ xác nhận" },
  { value: "CONFIRMED", label: "Đã xác nhận" },
  { value: "COMPLETED", label: "Hoàn tất" },
  { value: "CANCELLED", label: "Đã huỷ" },
  { value: "NO_SHOW", label: "Vắng mặt" },
] as const;

export function statusLabel(status: string): string {
  return STATUS_LABELS[status] ?? status;
}
