import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  MoreHorizontal,
  PhoneCall,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Workflow,
} from "lucide-react";
import { NewOpportunity } from "@/components/new-opportunity";
import {
  Badge,
  Button,
  ButtonLink,
  Card,
  Metric,
  PageHeader,
  Progress,
  SectionHeader,
  TextLink,
} from "@/components/ui";

const pipeline = [
  {
    company: "Metalúrgica Central",
    contact: "Rui Silva",
    stage: "Diagnóstico",
    value: "€24.000",
    next: "Hoje, 14:30",
    tone: "accent" as const,
  },
  {
    company: "Norte Clima",
    contact: "Ana Costa",
    stage: "Demo",
    value: "€18.500",
    next: "Amanhã, 10:00",
    tone: "success" as const,
  },
  {
    company: "Montagens Litoral",
    contact: "Paulo Dias",
    stage: "Qualificação",
    value: "€12.800",
    next: "31 jul., 09:30",
    tone: "neutral" as const,
  },
  {
    company: "Ferro & Forma",
    contact: "Marta Rocha",
    stage: "Proposta",
    value: "€31.000",
    next: "02 ago., 11:00",
    tone: "warning" as const,
  },
];

export default function Home() {
  return (
    <div className="page-container">
      <PageHeader
        eyebrow="Quarta-feira, 29 de julho"
        title="Bom dia, Diogo"
        description="Aqui está o ponto de situação da operação comercial."
        actions={<NewOpportunity />}
      />

      <section className="metric-grid" aria-label="Indicadores principais">
        <Metric
          label="Pipeline ativo"
          value="€86.300"
          meta="+12% desde junho"
          icon={<CircleDollarSign size={20} />}
        />
        <Metric
          label="Diagnósticos ativos"
          value="7"
          meta="3 aguardam resposta"
          icon={<Workflow size={20} />}
        />
        <Metric
          label="Taxa de avanço"
          value="64%"
          meta="+6 pp este mês"
          icon={<TrendingUp size={20} />}
        />
        <Metric
          label="Tarefas para hoje"
          value="4"
          meta="1 com prioridade alta"
          icon={<CheckCircle2 size={20} />}
        />
      </section>

      <section className="dashboard-focus-grid">
        <Card className="focus-card">
          <div className="focus-card-top">
            <div className="company-identity">
              <span className="company-logo">MC</span>
              <div>
                <div className="inline-title">
                  <h2>Metalúrgica Central</h2>
                  <Badge tone="accent">Em diagnóstico</Badge>
                </div>
                <p>Indústria metalomecânica · 46 colaboradores · Braga</p>
              </div>
            </div>
            <button className="icon-button" type="button" aria-label="Mais opções">
              <MoreHorizontal size={19} />
            </button>
          </div>

          <div className="focus-summary">
            <div>
              <span>Diagnóstico concluído</span>
              <strong>68%</strong>
            </div>
            <Progress value={68} />
          </div>

          <div className="focus-insight">
            <span className="insight-icon">
              <Sparkles size={18} />
            </span>
            <div>
              <strong>Insight mais relevante</strong>
              <p>
                O mesmo orçamento é introduzido em três sistemas e demora, em
                média, 42 minutos até chegar à produção.
              </p>
            </div>
          </div>

          <div className="focus-stats">
            <div>
              <span>Processos mapeados</span>
              <strong>3</strong>
            </div>
            <div>
              <span>Sistemas identificados</span>
              <strong>7</strong>
            </div>
            <div>
              <span>Bloqueios prioritários</span>
              <strong>4</strong>
            </div>
          </div>

          <div className="focus-footer">
            <p>
              <Clock3 size={15} />
              Última edição há 18 minutos
            </p>
            <ButtonLink href="/diagnosticos/metalica" variant="primary">
              Continuar diagnóstico
              <ArrowUpRight size={16} />
            </ButtonLink>
          </div>
        </Card>

        <Card className="agenda-card">
          <SectionHeader
            title="Próximos compromissos"
            action={
              <button className="icon-button" type="button" aria-label="Ver calendário">
                <CalendarDays size={18} />
              </button>
            }
          />
          <div className="agenda-list">
            <article className="agenda-item agenda-item-current">
              <div className="agenda-time">
                <strong>14:30</strong>
                <span>45 min</span>
              </div>
              <div className="agenda-copy">
                <Badge tone="accent">Diagnóstico</Badge>
                <h3>Metalúrgica Central</h3>
                <p>Completar sistemas e maturidade digital</p>
                <div className="agenda-person">
                  <span className="mini-avatar">RS</span>
                  Rui Silva · Diretor de operações
                </div>
              </div>
            </article>
            <article className="agenda-item">
              <div className="agenda-time">
                <strong>16:00</strong>
                <span>30 min</span>
              </div>
              <div className="agenda-copy">
                <Badge>Follow-up</Badge>
                <h3>Ferro & Forma</h3>
                <p>Revisão da proposta e próximos passos</p>
              </div>
            </article>
          </div>
          <Button className="full-width">
            <PhoneCall size={16} />
            Preparar chamada das 14:30
          </Button>
        </Card>
      </section>

      <section className="dashboard-lower-grid">
        <Card className="table-card">
          <SectionHeader
            title="Pipeline em curso"
            description="Oportunidades com atividade nos últimos 14 dias."
            action={<TextLink href="/oportunidades">Ver todas</TextLink>}
          />
          <div className="table-scroll">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Empresa</th>
                  <th>Fase</th>
                  <th>Valor</th>
                  <th>Próxima ação</th>
                  <th aria-label="Ações" />
                </tr>
              </thead>
              <tbody>
                {pipeline.map((item) => (
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
                      <Badge tone={item.tone}>{item.stage}</Badge>
                    </td>
                    <td className="table-value">{item.value}</td>
                    <td>{item.next}</td>
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

        <Card className="objective-card">
          <SectionHeader title="Objetivo de julho" />
          <div className="objective-visual">
            <div className="objective-ring">
              <span>74%</span>
            </div>
            <div>
              <strong>€44.600</strong>
              <span>de €60.000</span>
            </div>
          </div>
          <div className="objective-details">
            <div>
              <span>
                <Target size={15} /> Falta fechar
              </span>
              <strong>€15.400</strong>
            </div>
            <div>
              <span>
                <Users size={15} /> Negócios prováveis
              </span>
              <strong>2</strong>
            </div>
          </div>
          <TextLink href="/oportunidades">Analisar previsão</TextLink>
        </Card>
      </section>
    </div>
  );
}
