export type TicketStatus = "open" | "in_progress" | "resolved";

export type TicketPriority = "low" | "medium" | "high";

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  requester: string;
  createdAt: string;
}

export interface NewTicketInput {
  title: string;
  description: string;
  priority: TicketPriority;
  requester: string;
}
