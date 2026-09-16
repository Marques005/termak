"use client";

import { Plus, X } from "lucide-react";
import { FormEvent, useState } from "react";
import { Button } from "./ui";

export function NewOpportunity() {
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaved(true);
    window.setTimeout(() => {
      setOpen(false);
      setSaved(false);
    }, 900);
  }

  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>
        <Plus size={17} />
        Nova oportunidade
      </Button>

      {open ? (
        <div className="modal-layer" role="presentation">
          <button
            className="modal-backdrop"
            type="button"
            aria-label="Fechar"
            onClick={() => setOpen(false)}
          />
          <section
            className="modal-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="new-opportunity-title"
          >
            <div className="modal-header">
              <div>
                <p className="eyebrow">Pipeline comercial</p>
                <h2 id="new-opportunity-title">Nova oportunidade</h2>
              </div>
              <button
                className="icon-button"
                type="button"
                aria-label="Fechar"
                onClick={() => setOpen(false)}
              >
                <X size={19} />
              </button>
            </div>
            <form onSubmit={submit}>
              <div className="form-grid">
                <label className="field field-span-2">
                  <span>Empresa</span>
                  <input required placeholder="Nome da empresa" autoFocus />
                </label>
                <label className="field">
                  <span>Contacto principal</span>
                  <input required placeholder="Nome do contacto" />
                </label>
                <label className="field">
                  <span>Email</span>
                  <input required type="email" placeholder="nome@empresa.pt" />
                </label>
                <label className="field">
                  <span>Dimensão da equipa</span>
                  <select defaultValue="">
                    <option value="" disabled>
                      Selecionar
                    </option>
                    <option>1–10 pessoas</option>
                    <option>11–50 pessoas</option>
                    <option>51–200 pessoas</option>
                    <option>Mais de 200 pessoas</option>
                  </select>
                </label>
                <label className="field">
                  <span>Origem</span>
                  <select defaultValue="Referência">
                    <option>Referência</option>
                    <option>Website</option>
                    <option>Prospecção</option>
                    <option>Evento</option>
                  </select>
                </label>
                <label className="field field-span-2">
                  <span>Contexto inicial</span>
                  <textarea placeholder="O que motivou o primeiro contacto?" rows={3} />
                </label>
              </div>
              <div className="modal-footer">
                <Button type="button" onClick={() => setOpen(false)}>
                  Cancelar
                </Button>
                <Button variant="primary" type="submit">
                  {saved ? "Oportunidade criada" : "Criar oportunidade"}
                </Button>
              </div>
            </form>
          </section>
        </div>
      ) : null}
    </>
  );
}
