import { useState } from "react";
import { useCreateTicket } from "../hooks/useTickets";
import type { TicketPriority } from "../types/ticket";

interface NewTicketFormProps {
  onCreated: () => void;
  onCancel: () => void;
}

export function NewTicketForm({ onCreated, onCancel }: NewTicketFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requester, setRequester] = useState("");
  const [priority, setPriority] = useState<TicketPriority>("medium");

  const { mutate, isPending, isError } = useCreateTicket();

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    mutate(
      { title, description, requester, priority },
      { onSuccess: onCreated },
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-sm border border-[var(--color-line)] bg-[var(--color-paper-raised)] p-5"
    >
      <div>
        <label className="text-sm font-medium" htmlFor="title">
          Título
        </label>
        <input
          id="title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 w-full rounded-sm border border-[var(--color-line)] bg-[var(--color-paper)] px-3 py-2 text-sm outline-none focus:border-[var(--color-ink)]"
          placeholder="Ex.: Login trava na tela de carregamento"
        />
      </div>

      <div>
        <label className="text-sm font-medium" htmlFor="description">
          Descrição
        </label>
        <textarea
          id="description"
          required
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 w-full rounded-sm border border-[var(--color-line)] bg-[var(--color-paper)] px-3 py-2 text-sm outline-none focus:border-[var(--color-ink)]"
          placeholder="O que aconteceu, e como reproduzir"
        />
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="text-sm font-medium" htmlFor="requester">
            Seu nome
          </label>
          <input
            id="requester"
            required
            value={requester}
            onChange={(e) => setRequester(e.target.value)}
            className="mt-1 w-full rounded-sm border border-[var(--color-line)] bg-[var(--color-paper)] px-3 py-2 text-sm outline-none focus:border-[var(--color-ink)]"
          />
        </div>
        <div className="w-40">
          <label className="text-sm font-medium" htmlFor="priority">
            Prioridade
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as TicketPriority)}
            className="mt-1 w-full rounded-sm border border-[var(--color-line)] bg-[var(--color-paper)] px-3 py-2 text-sm outline-none focus:border-[var(--color-ink)]"
          >
            <option value="low">Baixa</option>
            <option value="medium">Média</option>
            <option value="high">Alta</option>
          </select>
        </div>
      </div>

      {isError && (
        <p className="text-sm text-[var(--color-stamp-open)]">
          Não foi possível abrir o ticket. Tente novamente.
        </p>
      )}

      <div className="flex justify-end gap-2 pt-1">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-sm px-3 py-2 text-sm font-medium text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="rounded-sm bg-[var(--color-ink)] px-4 py-2 text-sm font-medium text-[var(--color-paper)] transition hover:opacity-90 disabled:opacity-50"
        >
          {isPending ? "Abrindo…" : "Abrir ticket"}
        </button>
      </div>
    </form>
  );
}
