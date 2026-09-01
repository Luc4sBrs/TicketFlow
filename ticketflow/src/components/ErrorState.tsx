interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="rounded-sm border border-[var(--color-stamp-open)]/40 bg-[var(--color-stamp-open-bg)] p-5"
    >
      <p className="font-medium text-[var(--color-stamp-open)]">
        Não foi possível carregar os tickets
      </p>
      <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
        {message ?? "Verifique se o servidor da API está rodando e tente novamente."}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-3 rounded-sm border border-[var(--color-stamp-open)] px-3 py-1.5 text-sm font-medium text-[var(--color-stamp-open)] transition hover:bg-[var(--color-stamp-open)] hover:text-white"
        >
          Tentar novamente
        </button>
      )}
    </div>
  );
}
