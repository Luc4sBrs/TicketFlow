import { createRoute, Link } from "@tanstack/react-router";
import { rootRoute } from "./__root";
import { useTicket, useUpdateTicketStatus } from "../hooks/useTickets";
import { LoadingState } from "../components/LoadingState";
import { ErrorState } from "../components/ErrorState";
import { StatusBadge } from "../components/StatusBadge";
import type { TicketStatus } from "../types/ticket";

export const ticketDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tickets/$ticketId",
  component: TicketDetailPage,
});

const NEXT_STATUS: Record<TicketStatus, TicketStatus | null> = {
  open: "in_progress",
  in_progress: "resolved",
  resolved: null,
};

const NEXT_LABEL: Record<TicketStatus, string> = {
  open: "Iniciar atendimento",
  in_progress: "Marcar como resolvido",
  resolved: "",
};

function TicketDetailPage() {
  const { ticketId } = ticketDetailRoute.useParams();
  const { data: ticket, isLoading, isError, error, refetch } = useTicket(ticketId);
  const { mutate: updateStatus, isPending } = useUpdateTicketStatus();

  const nextStatus = ticket ? NEXT_STATUS[ticket.status] : null;

  return (
    <div className="space-y-6">
      <Link
        to="/tickets"
        className="text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
      >
        ← Voltar para tickets
      </Link>

      {isLoading && <LoadingState />}

      {isError && (
        <ErrorState message={(error as Error)?.message} onRetry={refetch} />
      )}

      {ticket && (
        <article className="space-y-4 rounded-sm border border-[var(--color-line)] bg-[var(--color-paper-raised)] p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="font-mono text-xs text-[var(--color-ink-soft)]">
                #{ticket.id}
              </span>
              <h1 className="mt-1 text-xl font-semibold">{ticket.title}</h1>
            </div>
            <StatusBadge status={ticket.status} />
          </div>

          <p className="text-sm leading-relaxed text-[var(--color-ink)]">
            {ticket.description}
          </p>

          <dl className="grid grid-cols-2 gap-4 border-t border-[var(--color-line)] pt-4 text-sm">
            <div>
              <dt className="text-[var(--color-ink-soft)]">Solicitante</dt>
              <dd className="mt-0.5">{ticket.requester}</dd>
            </div>
            <div>
              <dt className="text-[var(--color-ink-soft)]">Prioridade</dt>
              <dd className="mt-0.5 capitalize">{ticket.priority}</dd>
            </div>
          </dl>

          {nextStatus && (
            <div className="border-t border-[var(--color-line)] pt-4">
              <button
                onClick={() => updateStatus({ id: ticket.id, status: nextStatus })}
                disabled={isPending}
                className="rounded-sm bg-[var(--color-ink)] px-4 py-2 text-sm font-medium text-[var(--color-paper)] transition hover:opacity-90 disabled:opacity-50"
              >
                {isPending ? "Atualizando…" : NEXT_LABEL[ticket.status]}
              </button>
              <p className="mt-2 text-xs text-[var(--color-ink-soft)]">
                Abra esta mesma tela em outra aba: a mudança aparece nela em
                tempo real via Socket.IO.
              </p>
            </div>
          )}
        </article>
      )}
    </div>
  );
}
