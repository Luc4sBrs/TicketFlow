import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTicket, fetchTicketById, fetchTickets } from "../api/tickets";
import type { NewTicketInput } from "../types/ticket";

const ticketsKey = ["tickets"] as const;
const ticketKey = (id: string) => ["tickets", id] as const;

export function useTickets() {
  return useQuery({
    queryKey: ticketsKey,
    queryFn: fetchTickets,
  });
}

export function useTicket(id: string) {
  return useQuery({
    queryKey: ticketKey(id),
    queryFn: () => fetchTicketById(id),
    enabled: Boolean(id),
  });
}

export function useCreateTicket() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: NewTicketInput) => createTicket(input),
    onSuccess: () => {
      // Invalida a lista para refletir o novo ticket sem recarregar a página.
      queryClient.invalidateQueries({ queryKey: ticketsKey });
    },
  });
}
