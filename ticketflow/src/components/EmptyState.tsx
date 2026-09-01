interface EmptyStateProps {
  onNewTicket: () => void;
}

export function EmptyState({ onNewTicket }: EmptyStateProps) {
  return (
    <div className="rounded-sm border border-dashed border-[var(--color-line)] p-10 text-center">
      <p className="font-medium">Nenhum ticket por aqui ainda</p>
      <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
        Abra o primeiro ticket para começar a acompanhar um chamado.
      </p>
      <button
        onClick={onNewTicket}
        className="mt-4 rounded-sm bg-[var(--color-ink)] px-4 py-2 text-sm font-medium text-[var(--color-paper)] transition hover:opacity-90"
      >
        Abrir ticket
      </button>
    </div>
  );
}
