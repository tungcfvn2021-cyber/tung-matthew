"use client";

import { useState } from "react";

export function BeforeAfter({
  before,
  after,
  alt,
}: {
  before: string;
  after: string;
  alt: string;
}) {
  const [pos, setPos] = useState(50);

  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg border border-line">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={after}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={before}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        loading="lazy"
      />
      <div
        className="pointer-events-none absolute inset-y-0 w-px bg-gold"
        style={{ left: `${pos}%` }}
      />
      <div className="pointer-events-none absolute bottom-3 left-3 rounded-[2px] bg-ink/70 px-2 py-1 text-[10px] uppercase tracking-wider text-smoke">
        Trước / Sau
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Kéo để so sánh trước và sau"
        className="absolute inset-x-0 bottom-0 w-full cursor-ew-resize opacity-0"
        style={{ height: "100%" }}
      />
    </div>
  );
}
