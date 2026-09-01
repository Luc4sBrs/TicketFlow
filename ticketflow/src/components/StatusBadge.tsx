import type { TicketStatus } from "../types/ticket";

const STATUS_LABEL: Record<TicketStatus, string> = {
  open: "Aberto",
  in_progress: "Em andamento",
  resolved: "Resolvido",
};

const STATUS_STYLE: Record<TicketStatus, string> = {
  open: "text-[var(--color-stamp-open)] bg-[var(--color-stamp-open-bg)] border-[var(--color-stamp-open)]/30",
  in_progress:
    "text-[var(--color-stamp-progress)] bg-[var(--color-stamp-progress-bg)] border-[var(--color-stamp-progress)]/30",
  resolved:
    "text-[var(--color-stamp-resolved)] bg-[var(--color-stamp-resolved-bg)] border-[var(--color-stamp-resolved)]/30",
};

export function StatusBadge({ status }: { status: TicketStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-sm border px-2 py-0.5 text-xs font-medium ${STATUS_STYLE[status]}`}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}
