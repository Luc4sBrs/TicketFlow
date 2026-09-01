import { createRoute } from "@tanstack/react-router";
import { useState } from "react";
import { rootRoute } from "./__root";
import { useTickets } from "../hooks/useTickets";
import { TicketCard } from "../components/TicketCard";
import { LoadingState } from "../components/LoadingState";
import { ErrorState } from "../components/ErrorState";
import { EmptyState } from "../components/EmptyState";
import { NewTicketForm } from "../components/NewTicketForm";

export const ticketsIndexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tickets",
  component: TicketsListPage,
});

function TicketsListPage() {
  const { data: tickets, isLoading, isError, error, refetch } = useTickets();
  const [isCreating, setIsCreating] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Tickets</h1>
        {!isCreating && tickets && tickets.length > 0 && (
          <button
            onClick={() => setIsCreating(true)}
            className="rounded-sm bg-[var(--color-ink)] px-3 py-1.5 text-sm font-medium text-[var(--color-paper)] transition hover:opacity-90"
          >
            Abrir ticket
          </button>
        )}
      </div>

      {isCreating && (
        <NewTicketForm
          onCreated={() => setIsCreating(false)}
          onCancel={() => setIsCreating(false)}
        />
      )}

      {isLoading && <LoadingState />}

      {isError && (
        <ErrorState message={(error as Error)?.message} onRetry={refetch} />
      )}

      {!isLoading && !isError && tickets && tickets.length === 0 && !isCreating && (
        <EmptyState onNewTicket={() => setIsCreating(true)} />
      )}

      {!isLoading && !isError && tickets && tickets.length > 0 && (
        <div className="space-y-2">
          {tickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      )}
    </div>
  );
}
