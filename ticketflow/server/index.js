import express from "express";
import cors from "cors";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3001;

// Em produção isso viria de uma variável de ambiente com a URL do front no Vercel.
const ALLOWED_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";

const app = express();
app.use(cors({ origin: ALLOWED_ORIGIN }));
app.use(express.json());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: ALLOWED_ORIGIN },
});

// Estado em memória, seedado a partir do db.json. Reinicia ao reiniciar o servidor
// (é uma API de demonstração para o portfólio, não um banco de dados real).
const seed = JSON.parse(readFileSync(join(__dirname, "../db.json"), "utf-8"));
let tickets = seed.tickets;

function nextId() {
  const max = Math.max(...tickets.map((t) => Number(t.id)), 0);
  return String(max + 1).padStart(4, "0");
}

app.get("/tickets", (_req, res) => {
  res.json(tickets);
});

app.get("/tickets/:id", (req, res) => {
  const ticket = tickets.find((t) => t.id === req.params.id);
  if (!ticket) return res.status(404).json({ message: "Ticket não encontrado" });
  res.json(ticket);
});

app.post("/tickets", (req, res) => {
  const { title, description, priority, requester } = req.body;
  if (!title || !description || !requester) {
    return res.status(400).json({ message: "Campos obrigatórios ausentes" });
  }
  const ticket = {
    id: nextId(),
    title,
    description,
    priority: priority || "medium",
    requester,
    status: "open",
    createdAt: new Date().toISOString(),
  };
  tickets = [ticket, ...tickets];
  io.emit("ticket:created", ticket);
  res.status(201).json(ticket);
});

app.patch("/tickets/:id/status", (req, res) => {
  const { status } = req.body;
  const ticket = tickets.find((t) => t.id === req.params.id);
  if (!ticket) return res.status(404).json({ message: "Ticket não encontrado" });
  ticket.status = status;
  io.emit("ticket:updated", ticket);
  res.json(ticket);
});

io.on("connection", (socket) => {
  console.log(`[socket] cliente conectado: ${socket.id}`);
  socket.on("disconnect", () => {
    console.log(`[socket] cliente desconectado: ${socket.id}`);
  });
});

httpServer.listen(PORT, () => {
  console.log(`API + Socket.IO rodando em http://localhost:${PORT}`);
});
