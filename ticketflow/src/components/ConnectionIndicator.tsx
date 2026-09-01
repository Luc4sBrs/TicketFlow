import type { ConnectionStatus } from "../hooks/useTicketSocket";

const LABEL: Record<ConnectionStatus, string> = {
  connecting: "conectando…",
  connected: "ao vivo",
  reconnecting: "reconectando…",
  disconnected: "sem conexão",
};

const DOT_COLOR: Record<ConnectionStatus, string> = {
  connecting: "bg-[var(--color-stamp-progress)]",
  connected: "bg-[var(--color-stamp-resolved)]",
  reconnecting: "bg-[var(--color-stamp-open)]",
  disconnected: "bg-[var(--color-stamp-open)]",
};

export function ConnectionIndicator({ status }: { status: ConnectionStatus }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-[var(--color-ink-soft)]">
      <span className={`h-1.5 w-1.5 rounded-full ${DOT_COLOR[status]}`} />
      {LABEL[status]}
    </span>
  );
}
