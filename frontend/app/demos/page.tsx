import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  MonitorPlay,
  MoreHorizontal,
  Play,
  Plus,
  Sparkles,
} from "lucide-react";
import { Badge, Button, Card, PageHeader, Progress } from "@/components/ui";

const demos = [
  {
    company: "Norte Clima",
    date: "30 jul., 10:00",
    duration: "30 min",
    state: "Preparada",
    progress: 100,
    focus: "Pedidos, equipas no terreno e faturação",
  },
  {
    company: "Metalúrgica Central",
    date: "01 ago., 14:30",
    duration: "25 min",
    state: "Em preparação",
    progress: 72,
    focus: "Orçamento, planeamento e produção",
  },
  {
    company: "Montagens Litoral",
    date: "Por agendar",
    duration: "30 min",
    state: "A aguardar",
    progress: 35,
    focus: "Obra, equipas externas e documentação",
  },
];

export default function DemosPage() {
  return (
    <div className="page-container">
      <PageHeader
        eyebrow="Apresentação orientada"
        title="Demos"
        description="Percursos personalizados a partir do contexto e das prioridades de cada empresa."
        actions={
          <Button variant="primary">
            <Plus size={16} /> Preparar demo
          </Button>
        }
      />

      <Card className="demo-hero">
        <div className="demo-hero-icon">
          <Sparkles size={22} />
        </div>
        <div>
          <Badge tone="accent">Próxima demo</Badge>
          <h2>Norte Clima · Amanhã às 10:00</h2>
          <p>
            A apresentação está completa e alinhada com os três bloqueios mais
            importantes do diagnóstico.
          </p>
        </div>
        <Button variant="primary">
          <Play size={16} /> Abrir apresentação
        </Button>
      </Card>

      <div className="demo-list-grid">
        {demos.map((demo) => (
          <Card className="demo-list-card" key={demo.company}>
            <div className="demo-list-header">
              <span className="company-logo">{demo.company.slice(0, 2)}</span>
              <div>
                <h2>{demo.company}</h2>
                <p>{demo.focus}</p>
              </div>
              <button className="icon-button" type="button" aria-label="Mais opções">
                <MoreHorizontal size={18} />
              </button>
            </div>
            <div className="demo-list-facts">
              <span>
                <CalendarDays size={15} /> {demo.date}
              </span>
              <span>
                <Clock3 size={15} /> {demo.duration}
              </span>
            </div>
            <Progress value={demo.progress} label="Preparação" compact />
            <div className="demo-list-footer">
              <Badge tone={demo.state === "Preparada" ? "success" : "neutral"}>
                {demo.state === "Preparada" ? <CheckCircle2 size={13} /> : null}
                {demo.state}
              </Badge>
              <Button size="sm">
                <MonitorPlay size={15} /> Abrir
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
