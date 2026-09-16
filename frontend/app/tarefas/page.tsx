import { ListFilter, Plus } from "lucide-react";
import { TasksList } from "@/components/tasks-list";
import { Button, PageHeader } from "@/components/ui";

export default function TasksPage() {
  return (
    <div className="page-container page-container-narrow">
      <PageHeader
        eyebrow="Execução"
        title="Tarefas"
        description="Próximas ações comerciais e pontos pendentes dos diagnósticos."
        actions={
          <>
            <Button>
              <ListFilter size={16} /> Filtrar
            </Button>
            <Button variant="primary">
              <Plus size={16} /> Nova tarefa
            </Button>
          </>
        }
      />
      <div className="task-tabs">
        <button className="active" type="button">
          Pendentes <span>4</span>
        </button>
        <button type="button">Hoje</button>
        <button type="button">Próximas</button>
        <button type="button">Concluídas</button>
      </div>
      <TasksList />
    </div>
  );
}
