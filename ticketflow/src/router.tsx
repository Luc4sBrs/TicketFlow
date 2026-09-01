import { createRouter } from "@tanstack/react-router";
import { rootRoute } from "./routes/__root";
import { indexRoute } from "./routes/index";
import { ticketsIndexRoute } from "./routes/tickets.index";
import { ticketDetailRoute } from "./routes/tickets.$ticketId";

const routeTree = rootRoute.addChildren([
  indexRoute,
  ticketsIndexRoute,
  ticketDetailRoute,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
