export function LoadingState() {
  return (
    <div className="space-y-3" aria-live="polite" aria-busy="true">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="h-20 animate-pulse rounded-sm border border-[var(--color-line)] bg-[var(--color-paper-raised)]"
        />
      ))}
      <span className="sr-only">Carregando tickets…</span>
    </div>
  );
}
