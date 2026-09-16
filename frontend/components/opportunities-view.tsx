"use client";

import {
  ArrowUpRight,
  CalendarDays,
  Columns3,
  List,
  MoreHorizontal,
  Search,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Badge, Button, Card } from "./ui";

const opportunities = [
  {
    company: "Metalúrgica Central",
    contact: "Rui Silva",
    stage: "Diagnóstico",
    value: "€24.000",
    probability: 65,
    activity: "Hoje, 14:30",
    owner: "DM",
  },
  {
    company: "Norte Clima",
    contact: "Ana Costa",
    stage: "Demo",
    value: "€18.500",
    probability: 75,
    activity: "Amanhã, 10:00",
    owner: "DM",
  },
  {
    company: "Montagens Litoral",
    contact: "Paulo Dias",
    stage: "Qualificação",
    value: "€12.800",
    probability: 35,
    activity: "31 jul., 09:30",
    owner: "MR",
  },
  {
    company: "Ferro & Forma",
    contact: "Marta Rocha",
    stage: "Proposta",
    value: "€31.000",
    probability: 80,
    activity: "02 ago., 11:00",
    owner: "DM",
  },
  {
    company: "Tecnovent",
    contact: "João Sousa",
    stage: "Qualificação",
    value: "€9.600",
    probability: 25,
    activity: "04 ago., 15:00",
    owner: "MR",
  },
];

export function OpportunitiesView() {
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"list" | "board">("list");
  const [stage, setStage] = useState("Todas");

  const visible = useMemo(
    () =>
      opportunities.filter(
        (item) =>
          (stage === "Todas" || item.stage === stage) &&
          `${item.company} ${item.contact}`
            .toLowerCase()
            .includes(search.toLowerCase()),
      ),
    [search, stage],
  );

  return (
    <>
      <div className="toolbar">
        <label className="search-field">
          <Search size={16} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Pesquisar oportunidades..."
          />
        </label>
        <select
          className="filter-select"
          value={stage}
          onChange={(event) => setStage(event.target.value)}
          aria-label="Filtrar por fase"
        >
          <option>Todas</option>
          <option>Qualificação</option>
          <option>Diagnóstico</option>
          <option>Demo</option>
          <option>Proposta</option>
        </select>
        <Button>
          <CalendarDays size={16} /> Próxima atividade
        </Button>
        <div className="view-switch" aria-label="Tipo de visualização">
          <button
            type="button"
            className={view === "list" ? "active" : ""}
            onClick={() => setView("list")}
            aria-label="Lista"
          >
            <List size={17} />
          </button>
          <button
            type="button"
            className={view === "board" ? "active" : ""}
            onClick={() => setView("board")}
            aria-label="Quadro"
          >
            <Columns3 size={17} />
          </button>
        </div>
      </div>

      {view === "list" ? (
        <Card className="table-card standalone-table">
          <div className="table-scroll">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Empresa</th>
                  <th>Fase</th>
                  <th>Valor</th>
                  <th>Probabilidade</th>
                  <th>Próxima atividade</th>
                  <th>Responsável</th>
                  <th aria-label="Ações" />
                </tr>
              </thead>
              <tbody>
                {visible.map((item) => (
                  <tr key={item.company}>
                    <td>
                      <div className="table-company">
                        <span>{item.company.slice(0, 2).toUpperCase()}</span>
                        <div>
                          <strong>{item.company}</strong>
                          <small>{item.contact}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <Badge tone={item.stage === "Diagnóstico" ? "accent" : "neutral"}>
                        {item.stage}
                      </Badge>
                    </td>
                    <td className="table-value">{item.value}</td>
                    <td>
                      <div className="probability">
                        <span>
                          <i style={{ width: `${item.probability}%` }} />
                        </span>
                        {item.probability}%
                      </div>
                    </td>
                    <td>{item.activity}</td>
                    <td>
                      <span className="mini-avatar">{item.owner}</span>
                    </td>
                    <td>
                      <button className="icon-button" type="button" aria-label="Abrir">
                        <ArrowUpRight size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ) : (
        <div className="kanban-board">
          {["Qualificação", "Diagnóstico", "Demo", "Proposta"].map((column) => {
            const items = visible.filter((item) => item.stage === column);
            return (
              <section className="kanban-column" key={column}>
                <div className="kanban-heading">
                  <span>{column}</span>
                  <Badge>{items.length}</Badge>
                </div>
                {items.map((item) => (
                  <Card className="kanban-card" key={item.company}>
                    <div className="kanban-card-top">
                      <span className="table-company-logo">
                        {item.company.slice(0, 2).toUpperCase()}
                      </span>
                      <button className="icon-button" type="button" aria-label="Mais opções">
                        <MoreHorizontal size={17} />
                      </button>
                    </div>
                    <h3>{item.company}</h3>
                    <p>{item.contact}</p>
                    <div>
                      <strong>{item.value}</strong>
                      <span>{item.probability}%</span>
                    </div>
                    <small>{item.activity}</small>
                  </Card>
                ))}
              </section>
            );
          })}
        </div>
      )}
    </>
  );
}
