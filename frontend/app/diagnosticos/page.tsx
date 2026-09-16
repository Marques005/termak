import {
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Filter,
  Plus,
  Search,
  Workflow,
} from "lucide-react";
import {
  Badge,
  Button,
  ButtonLink,
  Card,
  PageHeader,
  Progress,
} from "@/components/ui";

const diagnostics = [
  {
    company: "Metalúrgica Central",
    sector: "Metalomecânica",
    state: "Em curso",
    progress: 68,
    owner: "Diogo Martins",
    next: "Hoje, 14:30",
    href: "/diagnosticos/metalica",
  },
  {
    company: "Norte Clima",
    sector: "Climatização",
    state: "Completo",
    progress: 100,
    owner: "Diogo Martins",
    next: "Demo amanhã",
    href: "/diagnosticos/metalica",
  },
  {
    company: "Montagens Litoral",
    sector: "Construção",
    state: "A aguardar",
    progress: 34,
    owner: "Marta Reis",
    next: "Resposta do cliente",
    href: "/diagnosticos/metalica",
  },
  {
    company: "Ferro & Forma",
    sector: "Metalomecânica",
    state: "Completo",
    progress: 100,
    owner: "Diogo Martins",
    next: "Proposta enviada",
    href: "/diagnosticos/metalica",
  },
  {
    company: "Tecnovent",
    sector: "Manutenção industrial",
    state: "Rascunho",
    progress: 12,
    owner: "Marta Reis",
    next: "Agendar sessão",
    href: "/diagnosticos/metalica",
  },
];

export default function DiagnosticsPage() {
  return (
    <div className="page-container">
      <PageHeader
        eyebrow="Descoberta operacional"
        title="Diagnósticos"
        description="Mapeie a operação antes de recomendar uma solução ou preparar a demo."
        actions={
          <Button variant="primary">
            <Plus size={16} /> Novo diagnóstico
          </Button>
        }
      />

      <section className="diagnostic-overview-grid">
        <Card>
          <span className="overview-icon">
            <Workflow size={19} />
          </span>
          <div>
            <span>Em curso</span>
            <strong>3</strong>
          </div>
          <small>1 sessão marcada para hoje</small>
        </Card>
        <Card>
          <span className="overview-icon">
            <CheckCircle2 size={19} />
          </span>
          <div>
            <span>Concluídos este mês</span>
            <strong>5</strong>
          </div>
          <small>4 avançaram para demo</small>
        </Card>
        <Card>
          <span className="overview-icon">
            <Clock3 size={19} />
          </span>
          <div>
            <span>Tempo médio</span>
            <strong>2,3 dias</strong>
          </div>
          <small>−0,7 dias face a junho</small>
        </Card>
      </section>

      <div className="toolbar">
        <label className="search-field">
          <Search size={16} />
          <input placeholder="Pesquisar diagnósticos..." />
        </label>
        <Button>
          <Filter size={16} /> Estado
        </Button>
      </div>

      <Card className="table-card standalone-table">
        <div className="table-scroll">
          <table className="data-table diagnostics-table">
            <thead>
              <tr>
                <th>Empresa</th>
                <th>Estado</th>
                <th>Progresso</th>
                <th>Responsável</th>
                <th>Próximo passo</th>
                <th aria-label="Ações" />
              </tr>
            </thead>
            <tbody>
              {diagnostics.map((item) => (
                <tr key={item.company}>
                  <td>
                    <div className="table-company">
                      <span>{item.company.slice(0, 2).toUpperCase()}</span>
                      <div>
                        <strong>{item.company}</strong>
                        <small>{item.sector}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <Badge
                      tone={
                        item.state === "Completo"
                          ? "success"
                          : item.state === "Em curso"
                            ? "accent"
                            : "neutral"
                      }
                    >
                      {item.state}
                    </Badge>
                  </td>
                  <td>
                    <div className="table-progress">
                      <Progress value={item.progress} />
                      <strong>{item.progress}%</strong>
                    </div>
                  </td>
                  <td>{item.owner}</td>
                  <td>{item.next}</td>
                  <td>
                    <ButtonLink href={item.href} size="sm">
                      Abrir <ArrowUpRight size={15} />
                    </ButtonLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
