import { apiClient } from "./client";
import type { NewTicketInput, Ticket } from "../types/ticket";

export async function fetchTickets(): Promise<Ticket[]> {
  const { data } = await apiClient.get<Ticket[]>("/tickets");
  return data;
}

export async function fetchTicketById(id: string): Promise<Ticket> {
  const { data } = await apiClient.get<Ticket>(`/tickets/${id}`);
  return data;
}

export async function createTicket(input: NewTicketInput): Promise<Ticket> {
  const payload: Omit<Ticket, "id"> = {
    ...input,
    status: "open",
    createdAt: new Date().toISOString(),
  };
  const { data } = await apiClient.post<Ticket>("/tickets", payload);
  return data;
}
