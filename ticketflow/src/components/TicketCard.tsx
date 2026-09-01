import { Link } from "@tanstack/react-router";
import type { Ticket } from "../types/ticket";
import { StatusBadge } from "./StatusBadge";

export function TicketCard({ ticket }: { ticket: Ticket }) {
  return (
    <Link
      to="/tickets/$ticketId"
      params={{ ticketId: ticket.id }}
      className="group flex items-stretch overflow-hidden rounded-sm border border-[var(--color-line)] bg-[var(--color-paper-raised)] transition hover:border-[var(--color-ink)]/30 hover:shadow-sm"
    >
      {/* canhoto: trilha perfurada, referência visual a um bilhete/protocolo */}
      <div className="flex w-16 flex-col items-center justify-center border-r border-dashed border-[var(--color-line)] bg-[var(--color-paper)] py-3">
        <span className="font-mono text-[10px] text-[var(--color-ink-soft)]">
          #{ticket.id}
        </span>
      </div>

      <div className="flex flex-1 items-center justify-between gap-4 px-4 py-3">
        <div className="min-w-0">
          <p className="truncate font-medium text-[var(--color-ink)]">
            {ticket.title}
          </p>
          <p className="mt-0.5 text-sm text-[var(--color-ink-soft)]">
            Aberto por {ticket.requester}
          </p>
        </div>
        <StatusBadge status={ticket.status} />
      </div>
    </Link>
  );
}
