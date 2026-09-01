import { apiClient } from "./client";
import type { NewTicketInput, Ticket, TicketStatus } from "../types/ticket";

export async function fetchTickets(): Promise<Ticket[]> {
  const { data } = await apiClient.get<Ticket[]>("/tickets");
  return data;
}

export async function fetchTicketById(id: string): Promise<Ticket> {
  const { data } = await apiClient.get<Ticket>(`/tickets/${id}`);
  return data;
}

export async function createTicket(input: NewTicketInput): Promise<Ticket> {
  const { data } = await apiClient.post<Ticket>("/tickets", input);
  return data;
}

export async function updateTicketStatus(
  id: string,
  status: TicketStatus,
): Promise<Ticket> {
  const { data } = await apiClient.patch<Ticket>(`/tickets/${id}/status`, {
    status,
  });
  return data;
}
