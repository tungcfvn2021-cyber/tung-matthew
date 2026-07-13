"use client";

import { useState } from "react";
import Link from "next/link";
import type { FaceShapeGuideDTO } from "@/features/face-shape/application/get-face-shapes";
import { ArrowRightIcon } from "@/shared/ui/icons";

export function FaceShapePicker({ guides }: { guides: FaceShapeGuideDTO[] }) {
  const [selected, setSelected] = useState<FaceShapeGuideDTO | null>(null);

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {guides.map((g) => {
          const active = selected?.faceShape === g.faceShape;
          return (
            <button
              key={g.faceShape}
              type="button"
              onClick={() => setSelected(g)}
              aria-pressed={active}
              className={`rounded-xl border px-4 py-5 text-center transition-colors ${
                active
                  ? "border-gold bg-panel"
                  : "border-line bg-ink-2 hover:border-line-gold"
              }`}
            >
              <span className="font-display font-semibold text-paper">
                {g.label}
              </span>
            </button>
          );
        })}
      </div>

      {selected && (
        <div className="mt-8 rounded-xl border border-gold bg-panel p-6">
          <h2 className="font-display text-xl font-bold text-paper">
            {selected.label}
          </h2>
          <p className="mt-2 leading-relaxed text-smoke">
            {selected.description}
          </p>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <h3 className="mb-2 text-xs uppercase tracking-wider text-gold">
                Kiểu nên chọn
              </h3>
              <ul className="flex flex-col gap-1.5">
                {selected.recommendedCuts.map((c) => (
                  <li key={c} className="flex items-center gap-2 text-paper">
                    <span className="text-gold">✓</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-2 text-xs uppercase tracking-wider text-smoke-2">
                Nên tránh
              </h3>
              <ul className="flex flex-col gap-1.5">
                {selected.avoidCuts.map((c) => (
                  <li
                    key={c}
                    className="flex items-center gap-2 text-smoke"
                  >
                    <span className="text-smoke-2">✕</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Link
            href="/dat-lich"
            className="mt-6 inline-flex items-center gap-2.5 rounded-[2px] bg-gold px-6 py-3.5 font-display text-sm font-semibold text-ink transition-colors hover:bg-gold-soft"
          >
            Đặt lịch với kiểu này
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
