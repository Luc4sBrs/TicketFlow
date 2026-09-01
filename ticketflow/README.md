# TicketFlow

Mini sistema de acompanhamento de tickets (estilo help desk), construído como
peça de portfólio no stack de front-end usado pela vaga de Frontend Developer
Júnior: **React, TypeScript, TanStack Router, TanStack Query, Axios e Tailwind CSS**.

## Stack e por que cada peça está aqui

- **React + TypeScript** — componentes tipados, sem `any` no domínio.
- **TanStack Router** (roteamento code-based) — rotas `/tickets` (lista) e
  `/tickets/$ticketId` (detalhe), com parâmetros de rota tipados.
- **TanStack Query** — cache, revalidação e as três chaves de UI que a vaga
  cita: **loading**, **erro** e **vazio** (ver `src/routes/tickets.index.tsx`).
- **Axios** — client HTTP isolado em `src/api/`, separado da camada de UI.
- **Tailwind CSS v4** — tokens de design centralizados em `src/index.css`
  (`@theme`), sem cores soltas espalhadas pelos componentes.
- **json-server** — API REST fake, só para desenvolvimento local (`db.json`).

## Rodando localmente

```bash
npm install
npm run dev:all   # sobe o front (5173) e a API fake (3001) juntos
```

Ou separadamente, em dois terminais:

```bash
npm run api   # json-server em http://localhost:3001
npm run dev   # vite em http://localhost:5173
```

## Estrutura

```
src/
  api/          # axios client + funções de chamada à API
  hooks/        # hooks do TanStack Query (useTickets, useTicket, useCreateTicket)
  routes/       # rotas do TanStack Router
  components/   # TicketCard, StatusBadge, LoadingState, ErrorState, EmptyState, NewTicketForm
  types/        # tipos de domínio (Ticket, TicketStatus, TicketPriority)
```

## Próximos passos (se eu continuar o projeto)

- [ ] Atualizações em tempo real com Socket.IO (ex.: notificar quando um
      ticket muda de status, com estados de conexão/erro/reconexão)
- [ ] Filtros por status/prioridade na listagem
- [ ] Deploy do front (Vercel) + API fake substituída por um backend real
