"use client";

import { useMemo, useState } from "react";
import { createBookingAction } from "@/features/booking/ui/actions";
import type { BookingServiceItem } from "@/features/services/application/get-services";
import type { WorkingHourLite } from "@/features/booking/domain/booking.rules";
import { buildSlots, timeToMinutes } from "@/features/booking/domain/booking.rules";
import { formatVnd, formatDuration } from "@/shared/lib/utils";
import { ArrowRightIcon } from "@/shared/ui/icons";

const WD_SHORT = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

type Props = {
  services: BookingServiceItem[];
  workingHours: WorkingHourLite[];
  zaloUrl?: string;
};

function nextDays(count: number) {
  const out: { value: string; weekday: number; label: string; day: string }[] = [];
  const now = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
    const value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    out.push({
      value,
      weekday: d.getDay(),
      label: i === 0 ? "Hôm nay" : (WD_SHORT[d.getDay()] ?? ""),
      day: `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`,
    });
  }
  return out;
}

export function BookingForm({ services, workingHours, zaloUrl }: Props) {
  const [step, setStep] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [dateStr, setDateStr] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [hp, setHp] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const days = useMemo(() => nextDays(14), []);
  const selected = services.filter((s) => selectedIds.includes(s.id));
  const totalPrice = selected.reduce((sum, s) => sum + s.price, 0);
  const totalDuration = selected.reduce((sum, s) => sum + s.durationMin, 0);

  const slots = useMemo(() => {
    if (!dateStr) return [];
    const day = days.find((d) => d.value === dateStr);
    if (!day) return [];
    const wh = workingHours.find((w) => w.weekday === day.weekday);
    if (!wh || wh.isClosed) return [];
    let list = buildSlots(wh.openTime, wh.closeTime, 30);
    if (day.label === "Hôm nay") {
      const now = new Date();
      const nowM = now.getHours() * 60 + now.getMinutes();
      list = list.filter((t) => timeToMinutes(t) > nowM + 60);
    }
    return list;
  }, [dateStr, days, workingHours]);

  function toggleService(id: string) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  async function handleSubmit() {
    setSubmitting(true);
    setErrorMsg(null);
    setFieldErrors({});

    const [y, mo, d] = dateStr.split("-").map(Number);
    const [hh, mm] = time.split(":").map(Number);
    const start = new Date(y!, mo! - 1, d!, hh!, mm!, 0, 0);

    const res = await createBookingAction({
      serviceIds: selectedIds,
      startAt: start.toISOString(),
      guestName: name,
      guestPhone: phone,
      guestNote: note || undefined,
      source: "DIRECT",
      _hp: hp,
    });

    setSubmitting(false);
    if (res.ok) {
      setSuccess(true);
    } else {
      setErrorMsg(res.error.message);
      if (res.error.fieldErrors) setFieldErrors(res.error.fieldErrors);
    }
  }

  if (success) {
    return (
      <div className="mx-auto max-w-lg rounded-xl border border-gold bg-panel p-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-gold text-2xl text-gold">
          ✓
        </div>
        <h2 className="font-display text-2xl font-bold text-paper">
          Đã nhận lịch của bạn!
        </h2>
        <p className="mt-3 leading-relaxed text-smoke">
          Tiệm sẽ nhắn Zalo xác nhận với bạn trong ít phút. Cảm ơn bạn đã tin
          tưởng Tùng Matthew.
        </p>
        {zaloUrl && (
          <a
            href={zaloUrl}
            className="mt-6 inline-flex items-center gap-2 rounded-[2px] bg-gold px-6 py-3 font-display text-sm font-semibold text-ink transition-colors hover:bg-gold-soft"
          >
            Mở Zalo để xác nhận nhanh
          </a>
        )}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl">
      <Stepper step={step} />

      {/* honeypot — ẩn khỏi người dùng thật */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        value={hp}
        onChange={(e) => setHp(e.target.value)}
        className="pointer-events-none absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      {step === 1 && (
        <section>
          <StepTitle n={1} title="Chọn dịch vụ" />
          <div className="flex flex-wrap gap-2.5">
            {services.map((s) => {
              const active = selectedIds.includes(s.id);
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => toggleService(s.id)}
                  aria-pressed={active}
                  className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                    active
                      ? "border-gold bg-gold text-ink"
                      : "border-line-gold text-paper hover:border-gold"
                  }`}
                >
                  {s.name}
                  <span className={active ? "text-ink/70" : "text-smoke-2"}>
                    {" · "}
                    {formatVnd(s.price)}
                  </span>
                </button>
              );
            })}
          </div>
          {fieldErrors.serviceIds && (
            <p className="mt-3 text-sm text-gold">{fieldErrors.serviceIds}</p>
          )}
          <Summary price={totalPrice} minutes={totalDuration} count={selected.length} />
          <NavButtons
            onNext={() => setStep(2)}
            nextDisabled={selectedIds.length === 0}
          />
        </section>
      )}

      {step === 2 && (
        <section>
          <StepTitle n={2} title="Chọn ngày & giờ" />
          <div className="flex gap-2 overflow-x-auto pb-2">
            {days.map((d) => (
              <button
                key={d.value}
                type="button"
                onClick={() => {
                  setDateStr(d.value);
                  setTime("");
                }}
                className={`flex min-w-[60px] shrink-0 flex-col items-center rounded-lg border px-3 py-2 transition-colors ${
                  dateStr === d.value
                    ? "border-gold bg-panel"
                    : "border-line hover:border-line-gold"
                }`}
              >
                <span className="text-[11px] uppercase tracking-wider text-smoke-2">
                  {d.label}
                </span>
                <span className="mt-1 text-sm font-semibold tabular-nums text-paper">
                  {d.day}
                </span>
              </button>
            ))}
          </div>

          {dateStr && (
            <div className="mt-5">
              {slots.length === 0 ? (
                <p className="text-sm text-smoke">
                  Không có khung giờ trống cho ngày này. Vui lòng chọn ngày khác
                  hoặc nhắn Zalo.
                </p>
              ) : (
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                  {slots.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTime(t)}
                      className={`rounded-md border py-2 text-sm tabular-nums transition-colors ${
                        time === t
                          ? "border-gold bg-gold text-ink"
                          : "border-line text-paper hover:border-line-gold"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <NavButtons
            onBack={() => setStep(1)}
            onNext={() => setStep(3)}
            nextDisabled={!dateStr || !time}
          />
        </section>
      )}

      {step === 3 && (
        <section>
          <StepTitle n={3} title="Thông tin của bạn" />
          <div className="flex flex-col gap-3">
            <Field label="Họ tên" error={fieldErrors.guestName}>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nguyễn Văn A"
                className="w-full rounded-md border border-line bg-ink-2 px-3 py-3 text-paper outline-none placeholder:text-smoke-2 focus:border-gold"
              />
            </Field>
            <Field label="Số điện thoại" error={fieldErrors.guestPhone}>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                inputMode="tel"
                placeholder="0901 234 567"
                className="w-full rounded-md border border-line bg-ink-2 px-3 py-3 text-paper outline-none placeholder:text-smoke-2 focus:border-gold"
              />
            </Field>
            <Field label="Ghi chú (tuỳ chọn)" error={fieldErrors.guestNote}>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={2}
                placeholder="Ví dụ: muốn fade cao, tham khảo kiểu…"
                className="w-full resize-none rounded-md border border-line bg-ink-2 px-3 py-3 text-paper outline-none placeholder:text-smoke-2 focus:border-gold"
              />
            </Field>
          </div>

          <div className="mt-5 rounded-lg border border-line bg-ink-2 p-4 text-sm text-smoke">
            <div className="flex justify-between">
              <span>Dịch vụ</span>
              <span className="text-paper">{selected.map((s) => s.name).join(", ")}</span>
            </div>
            <div className="mt-1 flex justify-between">
              <span>Thời lượng</span>
              <span className="text-paper">{formatDuration(totalDuration)}</span>
            </div>
            <div className="mt-1 flex justify-between">
              <span>Tạm tính</span>
              <span className="font-semibold text-gold">{formatVnd(totalPrice)}</span>
            </div>
          </div>

          {errorMsg && <p className="mt-4 text-sm text-gold">{errorMsg}</p>}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-[2px] bg-gold px-6 py-4 font-display text-sm font-semibold text-ink transition-colors hover:bg-gold-soft disabled:opacity-60"
          >
            {submitting ? "Đang gửi…" : "Xác nhận đặt lịch"}
            {!submitting && <ArrowRightIcon className="h-4 w-4" />}
          </button>

          {zaloUrl && (
            <p className="mt-4 text-center text-sm text-smoke">
              — hoặc —{" "}
              <a href={zaloUrl} className="text-gold underline underline-offset-4">
                Nhắn Zalo
              </a>{" "}
              (không cần điền form)
            </p>
          )}

          <button
            type="button"
            onClick={() => setStep(2)}
            className="mt-3 block w-full text-center text-sm text-smoke-2 hover:text-paper"
          >
            ← Quay lại
          </button>
        </section>
      )}
    </div>
  );
}

function Stepper({ step }: { step: number }) {
  return (
    <div className="mb-8 flex items-center gap-2">
      {[1, 2, 3].map((n) => (
        <div key={n} className="flex flex-1 items-center gap-2">
          <span
            className={`flex h-7 w-7 items-center justify-center rounded-full border text-sm font-semibold ${
              n <= step ? "border-gold bg-gold text-ink" : "border-line text-smoke-2"
            }`}
          >
            {n}
          </span>
          {n < 3 && (
            <span className={`h-px flex-1 ${n < step ? "bg-gold" : "bg-line"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

function StepTitle({ n, title }: { n: number; title: string }) {
  return (
    <h2 className="mb-5 text-[11px] uppercase tracking-[0.24em] text-gold">
      Bước {n} — {title}
    </h2>
  );
}

function Summary({
  price,
  minutes,
  count,
}: {
  price: number;
  minutes: number;
  count: number;
}) {
  if (count === 0) return null;
  return (
    <div className="mt-5 flex items-center justify-between rounded-lg border border-line bg-ink-2 px-4 py-3 text-sm">
      <span className="text-smoke">
        {count} dịch vụ · {formatDuration(minutes)}
      </span>
      <span className="font-display text-lg font-bold text-gold">
        {formatVnd(price)}
      </span>
    </div>
  );
}

function NavButtons({
  onBack,
  onNext,
  nextDisabled,
}: {
  onBack?: () => void;
  onNext: () => void;
  nextDisabled?: boolean;
}) {
  return (
    <div className="mt-6 flex gap-3">
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="rounded-[2px] border border-line px-6 py-3 text-sm font-semibold text-paper transition-colors hover:border-line-gold"
        >
          Quay lại
        </button>
      )}
      <button
        type="button"
        onClick={onNext}
        disabled={nextDisabled}
        className="flex-1 rounded-[2px] bg-gold px-6 py-3 font-display text-sm font-semibold text-ink transition-colors hover:bg-gold-soft disabled:cursor-not-allowed disabled:opacity-40"
      >
        Tiếp tục
      </button>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm text-smoke">{label}</span>
      {children}
      {error && <span className="mt-1 block text-sm text-gold">{error}</span>}
    </label>
  );
}
