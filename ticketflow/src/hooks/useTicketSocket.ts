import { useEffect, useState } from "react";
import { io, type Socket } from "socket.io-client";
import { useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../api/client";
import type { Ticket } from "../types/ticket";

export type ConnectionStatus = "connecting" | "connected" | "reconnecting" | "disconnected";

let socket: Socket | null = null;

function getSocket() {
  if (!socket) {
    socket = io(API_URL, {
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
  }
  return socket;
}

/**
 * Mantém a lista de tickets em sincronia em tempo real e expõe o status
 * da conexão (conectando / conectado / reconectando / desconectado) para a UI.
 */
export function useTicketSocket() {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState<ConnectionStatus>("connecting");

  useEffect(() => {
    const s = getSocket();

    const handleConnect = () => setStatus("connected");
    const handleDisconnect = () => setStatus("disconnected");
    const handleReconnectAttempt = () => setStatus("reconnecting");
    const handleConnectError = () => setStatus("disconnected");

    const handleTicketCreated = (ticket: Ticket) => {
      queryClient.setQueryData<Ticket[]>(["tickets"], (old) =>
        old ? [ticket, ...old] : [ticket],
      );
    };

    const handleTicketUpdated = (ticket: Ticket) => {
      queryClient.setQueryData<Ticket[]>(["tickets"], (old) =>
        old ? old.map((t) => (t.id === ticket.id ? ticket : t)) : [ticket],
      );
      queryClient.setQueryData(["tickets", ticket.id], ticket);
    };

    s.on("connect", handleConnect);
    s.on("disconnect", handleDisconnect);
    s.on("reconnect_attempt", handleReconnectAttempt);
    s.on("connect_error", handleConnectError);
    s.on("ticket:created", handleTicketCreated);
    s.on("ticket:updated", handleTicketUpdated);

    if (s.connected) setStatus("connected");

    return () => {
      s.off("connect", handleConnect);
      s.off("disconnect", handleDisconnect);
      s.off("reconnect_attempt", handleReconnectAttempt);
      s.off("connect_error", handleConnectError);
      s.off("ticket:created", handleTicketCreated);
      s.off("ticket:updated", handleTicketUpdated);
    };
  }, [queryClient]);

  return status;
}
