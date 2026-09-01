import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTicket,
  fetchTicketById,
  fetchTickets,
  updateTicketStatus,
} from "../api/tickets";
import type { NewTicketInput, TicketStatus } from "../types/ticket";

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
      // O Socket.IO também atualiza o cache em tempo real (ver useTicketSocket),
      // mas invalidamos aqui também para cobrir quem estiver sem conexão em tempo real.
      queryClient.invalidateQueries({ queryKey: ticketsKey });
    },
  });
}

export function useUpdateTicketStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: TicketStatus }) =>
      updateTicketStatus(id, status),
    onSuccess: (ticket) => {
      queryClient.setQueryData(ticketKey(ticket.id), ticket);
      queryClient.invalidateQueries({ queryKey: ticketsKey });
    },
  });
}
