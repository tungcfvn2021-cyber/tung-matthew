import { cn } from "@/shared/lib/utils";

/** Logo chữ thương hiệu: Tùng + Matthew (Matthew mạ vàng). */
export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "font-display text-[15px] font-bold uppercase tracking-[0.14em]",
        className,
      )}
    >
      Tùng<span className="text-gold">Matthew</span>
    </span>
  );
}
