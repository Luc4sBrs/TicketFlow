import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { useTicketSocket } from "../hooks/useTicketSocket";
import { ConnectionIndicator } from "../components/ConnectionIndicator";

export const rootRoute = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  const connectionStatus = useTicketSocket();

  return (
    <div className="min-h-screen">
      <header className="border-b border-[var(--color-line)]">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <Link to="/tickets" className="font-mono text-sm tracking-tight">
            TicketFlow
          </Link>
          <ConnectionIndicator status={connectionStatus} />
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
