export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-5 flex items-center gap-3.5 text-xs uppercase tracking-[0.32em] text-gold">
      <span className="inline-block h-px w-11 bg-gold" />
      {children}
    </p>
  );
}
