import { createRoute, Link } from "@tanstack/react-router";
import { rootRoute } from "./__root";
import { useTicket } from "../hooks/useTickets";
import { LoadingState } from "../components/LoadingState";
import { ErrorState } from "../components/ErrorState";
import { StatusBadge } from "../components/StatusBadge";

export const ticketDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tickets/$ticketId",
  component: TicketDetailPage,
});

function TicketDetailPage() {
  const { ticketId } = ticketDetailRoute.useParams();
  const { data: ticket, isLoading, isError, error, refetch } = useTicket(ticketId);

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
        </article>
      )}
    </div>
  );
}
