"use client";

import { CalendarDays, Check, Circle, MoreHorizontal, UserRound } from "lucide-react";
import { useState } from "react";
import { Badge, Card } from "./ui";

const initialTasks = [
  {
    title: "Completar mapa de sistemas",
    company: "Metalúrgica Central",
    due: "Hoje, 14:30",
    priority: "Alta",
    done: false,
  },
  {
    title: "Preparar demo personalizada",
    company: "Norte Clima",
    due: "Amanhã, 09:00",
    priority: "Alta",
    done: false,
  },
  {
    title: "Enviar resumo do diagnóstico",
    company: "Montagens Litoral",
    due: "31 jul.",
    priority: "Normal",
    done: false,
  },
  {
    title: "Rever proposta comercial",
    company: "Ferro & Forma",
    due: "02 ago.",
    priority: "Normal",
    done: false,
  },
  {
    title: "Validar contactos da equipa",
    company: "Metalúrgica Central",
    due: "Concluído hoje",
    priority: "Normal",
    done: true,
  },
];

export function TasksList() {
  const [tasks, setTasks] = useState(initialTasks);

  function toggle(index: number) {
    setTasks((current) =>
      current.map((task, taskIndex) =>
        taskIndex === index ? { ...task, done: !task.done } : task,
      ),
    );
  }

  return (
    <Card className="task-list-card">
      {tasks.map((task, index) => (
        <article className={`task-row ${task.done ? "task-done" : ""}`} key={task.title}>
          <button
            className="task-check"
            type="button"
            onClick={() => toggle(index)}
            aria-label={task.done ? "Marcar como pendente" : "Concluir tarefa"}
          >
            {task.done ? <Check size={15} /> : <Circle size={18} />}
          </button>
          <div className="task-copy">
            <strong>{task.title}</strong>
            <span>
              <UserRound size={14} />
              {task.company}
            </span>
          </div>
          <Badge tone={task.priority === "Alta" ? "danger" : "neutral"}>
            {task.priority}
          </Badge>
          <span className="task-date">
            <CalendarDays size={14} />
            {task.due}
          </span>
          <button className="icon-button" type="button" aria-label="Mais opções">
            <MoreHorizontal size={17} />
          </button>
        </article>
      ))}
    </Card>
  );
}
