# TicketFlow

Mini sistema de acompanhamento de tickets (estilo help desk), construído como
peça de portfólio no stack de front-end pedido pela vaga de Frontend Developer
Júnior: **React, TypeScript, TanStack Router, TanStack Query, Axios, Socket.IO
e Tailwind CSS**.

## Como o projeto funciona (arquitetura em duas peças)

```
┌─────────────────────┐        HTTP (REST)        ┌──────────────────────────┐
│                      │ ───────────────────────▶  │                          │
│   Front-end (React)  │                            │   Back-end (Express)    │
│   Vite + TanStack     │ ◀─────────────────────────│   + Socket.IO           │
│   Router/Query        │        WebSocket           │                          │
│                      │ ◀═════════════════════════▶│   (dados em memória)     │
└─────────────────────┘      (tempo real)           └──────────────────────────┘
```

- O **front-end** busca e envia dados por **REST via Axios** (`GET /tickets`,
  `POST /tickets`, `PATCH /tickets/:id/status`), e o **TanStack Query** cuida
  do cache e dos estados de loading/erro.
- O **back-end** (`server/index.js`) é um servidor Express simples que também
  abre uma conexão **Socket.IO**. Sempre que um ticket é criado ou muda de
  status via REST, o servidor **emite um evento** (`ticket:created`,
  `ticket:updated`) para todos os clientes conectados.
- O front-end escuta esses eventos (`src/hooks/useTicketSocket.ts`) e atualiza
  o cache do TanStack Query diretamente — por isso, se você abrir o app em
  duas abas e mudar o status de um ticket em uma, a outra atualiza sozinha,
  sem recarregar a página.
- O indicador no canto superior direito ("ao vivo" / "reconectando…" / "sem
  conexão") reflete o estado real da conexão Socket.IO
  (`connect`, `disconnect`, `reconnect_attempt`).

## Rodando localmente

```bash
npm install
npm run dev:all   # sobe o front (5173) e a API + Socket.IO (3001) juntos
```

Ou separadamente, em dois terminais:

```bash
npm run server   # Express + Socket.IO em http://localhost:3001
npm run dev      # Vite em http://localhost:5173
```

## Estrutura

```
server/
  index.js      # API REST + Socket.IO (Express)
src/
  api/          # axios client + funções de chamada à API REST
  hooks/        # TanStack Query (useTickets) + Socket.IO (useTicketSocket)
  routes/       # rotas do TanStack Router
  components/   # TicketCard, StatusBadge, LoadingState, ErrorState, EmptyState,
                # NewTicketForm, ConnectionIndicator
  types/        # tipos de domínio (Ticket, TicketStatus, TicketPriority)
```

## Deploy

O front e o back vão para serviços diferentes, porque o Socket.IO precisa de
um processo que fica sempre ligado (o Vercel roda funções sob demanda, não
serve para isso).

**1. Back-end no Render (grátis):**
1. Crie conta em [render.com](https://render.com) e conecte seu GitHub.
2. "New +" → "Web Service" → selecione o repositório `ticketflow`.
3. Configurações: *Build command* `npm install`, *Start command* `npm run server`.
4. Em "Environment", adicione a variável `CLIENT_ORIGIN` com a URL do front
   (você volta aqui depois de ter a URL do Vercel).
5. Deploy. Anote a URL gerada (algo como `https://ticketflow-api.onrender.com`).

**2. Front-end no Vercel (grátis):**
1. Crie conta em [vercel.com](https://vercel.com) e conecte seu GitHub.
2. "Add New" → "Project" → selecione `ticketflow`.
3. Em "Environment Variables", adicione `VITE_API_URL` com a URL do Render
   do passo anterior.
4. Deploy. Anote a URL gerada (algo como `https://ticketflow.vercel.app`).

**3. Feche o ciclo:** volte no Render e atualize `CLIENT_ORIGIN` com a URL do
Vercel, para o CORS aceitar as requisições do front em produção.

> Nota: o Render free tier "dorme" após alguns minutos sem uso — a primeira
> requisição depois disso pode demorar ~30s para acordar o servidor. Isso é
> normal e vale mencionar caso alguém teste o link e ache que travou.

## Próximos passos (se eu continuar o projeto)

- [ ] Persistência real (banco de dados) no lugar do array em memória
- [ ] Filtros por status/prioridade na listagem
- [ ] Autenticação simples para diferenciar solicitante e atendente
