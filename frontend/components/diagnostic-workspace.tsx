"use client";

import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Building2,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleGauge,
  ClipboardList,
  Clock3,
  Database,
  Download,
  FileText,
  GripVertical,
  HardHat,
  Lightbulb,
  Link2,
  MessageSquare,
  MonitorPlay,
  MoreHorizontal,
  PackageOpen,
  Paperclip,
  Plus,
  Save,
  Settings2,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Target,
  TriangleAlert,
  UserRound,
  Users,
  Workflow,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Badge, Button, Card, Progress } from "./ui";

const sections = [
  {
    label: "Empresa",
    short: "Perfil",
    icon: Building2,
    completion: 100,
    questions: [
      "Qual é a atividade principal?",
      "Como está organizada a operação?",
      "Quais são os principais objetivos?",
    ],
  },
  {
    label: "Operação",
    short: "Processos",
    icon: Workflow,
    completion: 84,
    questions: [
      "Quais são as linhas de negócio?",
      "Como decorre o processo principal?",
      "Onde existem decisões manuais?",
      "Que documentos são gerados?",
    ],
  },
  {
    label: "Equipa",
    short: "Pessoas",
    icon: Users,
    completion: 72,
    questions: [
      "Que equipas participam?",
      "Quem decide em cada etapa?",
      "Onde existem responsabilidades difusas?",
    ],
  },
  {
    label: "Sistemas",
    short: "Ferramentas",
    icon: Database,
    completion: 58,
    questions: [
      "Que sistemas são utilizados?",
      "Que informação é duplicada?",
      "Existem integrações automáticas?",
      "Como é feita a passagem para produção?",
    ],
  },
  {
    label: "Problemas",
    short: "Prioridades",
    icon: TriangleAlert,
    completion: 42,
    questions: [
      "Onde se perde mais tempo?",
      "Que erros são mais frequentes?",
      "Qual o impacto no cliente?",
      "Porque procuram uma solução agora?",
    ],
  },
  {
    label: "Resumo",
    short: "Diagnóstico",
    icon: BarChart3,
    completion: 0,
    questions: [
      "Validar o mapa operacional",
      "Confirmar os bloqueios críticos",
      "Aprovar prioridades recomendadas",
    ],
  },
  {
    label: "Demo",
    short: "Percurso",
    icon: MonitorPlay,
    completion: 0,
    questions: [
      "Selecionar cenários relevantes",
      "Ordenar funcionalidades",
      "Definir indicadores de sucesso",
    ],
  },
];

const systemCards = [
  {
    name: "PHC",
    area: "Faturação e compras",
    status: "Sistema principal",
    icon: Database,
    integration: "Exportação manual",
  },
  {
    name: "Excel",
    area: "Orçamentação",
    status: "Uso crítico",
    icon: FileText,
    integration: "Sem integração",
  },
  {
    name: "Outlook",
    area: "Pedidos e aprovações",
    status: "Comunicação",
    icon: MessageSquare,
    integration: "Sem integração",
  },
  {
    name: "Pastas de rede",
    area: "Desenhos e documentação",
    status: "Arquivo",
    icon: PackageOpen,
    integration: "Ligação por referência",
  },
];

const responsibilityRows = [
  ["Novo pedido", "Comercial", "Direção", "Administração", "—"],
  ["Orçamento", "Comercial", "Direção", "Administração", "Consultado"],
  ["Planeamento", "Consultado", "Direção", "Informado", "Responsável"],
  ["Produção", "Informado", "Direção", "—", "Responsável"],
  ["Faturação", "Informado", "Aprova", "Responsável", "—"],
];

const problemSeed = [
  {
    title: "Duplicação de dados entre orçamento e ERP",
    impact: 5,
    frequency: "Diária",
    cost: "≈ 14 h/semana",
    tone: "danger" as const,
  },
  {
    title: "Aprovações dispersas por email e telefone",
    impact: 4,
    frequency: "Diária",
    cost: "≈ 8 h/semana",
    tone: "warning" as const,
  },
  {
    title: "Falta de visibilidade sobre carga de produção",
    impact: 4,
    frequency: "Semanal",
    cost: "2–3 replaneamentos",
    tone: "warning" as const,
  },
  {
    title: "Documentação técnica sem versão única",
    impact: 3,
    frequency: "Semanal",
    cost: "Risco de retrabalho",
    tone: "neutral" as const,
  },
];

const insights = [
  {
    title: "Perfil operacional definido",
    body: "A empresa combina produção por encomenda com instalação no cliente.",
  },
  {
    title: "Passagem crítica identificada",
    body: "A transição do orçamento aprovado para o planeamento concentra três introduções manuais.",
  },
  {
    title: "Decisão demasiado centralizada",
    body: "A direção aprova quatro das cinco fases, criando dependência e tempo de espera.",
  },
  {
    title: "Fragmentação elevada",
    body: "Sete ferramentas suportam um único fluxo sem uma fonte operacional comum.",
  },
  {
    title: "Impacto quantificável",
    body: "Os dois problemas principais representam cerca de 22 horas de trabalho por semana.",
  },
  {
    title: "Prioridade recomendada",
    body: "Começar pela passagem automática de orçamento para ordem de produção.",
  },
  {
    title: "Demo orientada ao valor",
    body: "Mostrar primeiro o fluxo completo pedido → planeamento → produção.",
  },
];

function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="field">
      <span>{label}</span>
      {children}
      {hint ? <small>{hint}</small> : null}
    </label>
  );
}

function CompanySection() {
  return (
    <div className="diagnostic-section">
      <div className="content-heading">
        <div>
          <p className="eyebrow">Visão geral</p>
          <h2>Perfil da empresa</h2>
          <p>Contexto base utilizado para adaptar todo o diagnóstico.</p>
        </div>
        <Badge tone="success">
          <Check size={13} /> Completo
        </Badge>
      </div>
      <Card className="form-card">
        <div className="form-grid">
          <Field label="Nome da empresa">
            <input defaultValue="Metalúrgica Central, Lda." />
          </Field>
          <Field label="Setor de atividade">
            <select defaultValue="Indústria metalomecânica">
              <option>Indústria metalomecânica</option>
              <option>Construção</option>
              <option>Serviços técnicos</option>
            </select>
          </Field>
          <Field label="Localização">
            <input defaultValue="Braga, Portugal" />
          </Field>
          <Field label="Número de colaboradores">
            <input type="number" defaultValue={46} />
          </Field>
          <Field label="Volume anual aproximado">
            <select defaultValue="€2M – €5M">
              <option>€500k – €1M</option>
              <option>€1M – €2M</option>
              <option>€2M – €5M</option>
              <option>Mais de €5M</option>
            </select>
          </Field>
          <Field label="Contacto principal">
            <input defaultValue="Rui Silva · Diretor de operações" />
          </Field>
          <label className="field field-span-2">
            <span>Atividade e proposta de valor</span>
            <textarea
              rows={4}
              defaultValue="Produção de estruturas e componentes metálicos por encomenda, incluindo desenho técnico, fabrico, acabamento e instalação no cliente."
            />
          </label>
          <label className="field field-span-2">
            <span>Objetivo desta iniciativa</span>
            <textarea
              rows={3}
              defaultValue="Reduzir trabalho administrativo, ter visibilidade real da produção e garantir que cada encomenda avança sem depender de seguimentos manuais."
            />
          </label>
        </div>
      </Card>
      <Card className="choice-card">
        <div>
          <strong>Motivo principal da procura</strong>
          <p>Escolha o contexto que melhor descreve o momento atual.</p>
        </div>
        <div className="segmented-choice">
          <button type="button">Crescimento</button>
          <button type="button" className="selected">
            Perda de controlo
          </button>
          <button type="button">Substituir sistema</button>
          <button type="button">Reduzir custos</button>
        </div>
      </Card>
    </div>
  );
}

function OperationSection() {
  const [steps, setSteps] = useState([
    {
      title: "Receção e qualificação",
      owner: "Comercial",
      system: "Outlook",
      time: "25 min",
      issue: "Dados chegam em formatos diferentes",
    },
    {
      title: "Orçamentação",
      owner: "Comercial + Direção",
      system: "Excel",
      time: "2–4 h",
      issue: "Cálculo e aprovação totalmente manuais",
    },
    {
      title: "Planeamento de produção",
      owner: "Direção de produção",
      system: "Excel + quadro",
      time: "45 min",
      issue: "Sem visão atualizada da capacidade",
    },
    {
      title: "Produção e controlo",
      owner: "Produção",
      system: "Papel",
      time: "3–15 dias",
      issue: "Progresso comunicado verbalmente",
    },
  ]);

  function addStep() {
    setSteps((current) => [
      ...current,
      {
        title: "Nova etapa",
        owner: "Por definir",
        system: "Por definir",
        time: "—",
        issue: "Adicionar contexto desta etapa",
      },
    ]);
  }

  return (
    <div className="diagnostic-section">
      <div className="content-heading">
        <div>
          <p className="eyebrow">Processo principal</p>
          <h2>Do pedido à entrega</h2>
          <p>Organize as etapas na ordem em que acontecem atualmente.</p>
        </div>
        <Button onClick={addStep}>
          <Plus size={16} /> Adicionar etapa
        </Button>
      </div>

      <div className="process-builder">
        {steps.map((step, index) => (
          <Card className="process-step" key={`${step.title}-${index}`}>
            <div className="drag-handle" title="Reordenar">
              <GripVertical size={18} />
            </div>
            <span className="step-number">{index + 1}</span>
            <div className="process-main">
              <div className="process-title-row">
                <input
                  className="inline-input"
                  aria-label={`Nome da etapa ${index + 1}`}
                  defaultValue={step.title}
                />
                <button className="icon-button" type="button" aria-label="Mais opções">
                  <MoreHorizontal size={18} />
                </button>
              </div>
              <div className="process-meta-grid">
                <div>
                  <span>Responsável</span>
                  <strong>
                    <UserRound size={14} /> {step.owner}
                  </strong>
                </div>
                <div>
                  <span>Sistema</span>
                  <strong>
                    <Database size={14} /> {step.system}
                  </strong>
                </div>
                <div>
                  <span>Tempo médio</span>
                  <strong>
                    <Clock3 size={14} /> {step.time}
                  </strong>
                </div>
              </div>
              <div className="step-problem">
                <TriangleAlert size={15} />
                <span>{step.issue}</span>
              </div>
            </div>
            {index < steps.length - 1 ? (
              <span className="process-connector" aria-hidden="true">
                <ChevronRight size={16} />
              </span>
            ) : null}
          </Card>
        ))}
      </div>

      <Card className="callout-card">
        <div className="callout-icon">
          <Lightbulb size={19} />
        </div>
        <div>
          <strong>O que acontece quando um orçamento é aprovado?</strong>
          <p>
            A informação é copiada do Excel para o PHC e novamente para a folha de
            planeamento. Não existe notificação automática para produção.
          </p>
        </div>
        <Button size="sm">Editar resposta</Button>
      </Card>
    </div>
  );
}

function TeamSection() {
  const roles = [
    { name: "Comercial", people: 4, icon: ShoppingCart, access: "Clientes e propostas" },
    { name: "Administração", people: 3, icon: FileText, access: "Compras e faturação" },
    { name: "Produção", people: 31, icon: HardHat, access: "Ordens e registos" },
    { name: "Gestão", people: 3, icon: ShieldCheck, access: "Visão global" },
  ];

  return (
    <div className="diagnostic-section">
      <div className="content-heading">
        <div>
          <p className="eyebrow">Estrutura da equipa</p>
          <h2>Pessoas e responsabilidades</h2>
          <p>Quem participa no processo e que nível de acesso necessita.</p>
        </div>
        <Button>
          <Plus size={16} /> Adicionar equipa
        </Button>
      </div>
      <div className="role-grid">
        {roles.map((role) => {
          const Icon = role.icon;
          return (
            <Card className="role-card" key={role.name}>
              <span className="role-icon">
                <Icon size={19} />
              </span>
              <div>
                <strong>{role.name}</strong>
                <p>{role.people} pessoas</p>
              </div>
              <small>{role.access}</small>
              <button className="icon-button" type="button" aria-label={`Editar ${role.name}`}>
                <Settings2 size={16} />
              </button>
            </Card>
          );
        })}
      </div>

      <Card className="matrix-card">
        <div className="card-heading">
          <div>
            <h3>Matriz de responsabilidades</h3>
            <p>Responsável principal e participação por fase.</p>
          </div>
          <Badge>5 atividades</Badge>
        </div>
        <div className="table-scroll">
          <table className="matrix-table">
            <thead>
              <tr>
                <th>Atividade</th>
                <th>Comercial</th>
                <th>Gestão</th>
                <th>Administração</th>
                <th>Produção</th>
              </tr>
            </thead>
            <tbody>
              {responsibilityRows.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, index) => (
                    <td key={`${row[0]}-${cell}-${index}`}>
                      {index === 0 ? (
                        <strong>{cell}</strong>
                      ) : (
                        <span
                          className={
                            cell === "Responsável"
                              ? "matrix-responsible"
                              : cell === "Aprova"
                                ? "matrix-approve"
                                : ""
                          }
                        >
                          {cell}
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function SystemsSection() {
  return (
    <div className="diagnostic-section">
      <div className="content-heading">
        <div>
          <p className="eyebrow">Ecossistema digital</p>
          <h2>Sistemas e informação</h2>
          <p>Ferramentas atuais, ligações e duplicação de trabalho.</p>
        </div>
        <Button>
          <Plus size={16} /> Adicionar sistema
        </Button>
      </div>

      <div className="systems-grid">
        {systemCards.map((system) => {
          const Icon = system.icon;
          return (
            <Card className="system-card" key={system.name}>
              <span className="system-icon">
                <Icon size={20} />
              </span>
              <div className="system-copy">
                <div>
                  <strong>{system.name}</strong>
                  <Badge>{system.status}</Badge>
                </div>
                <p>{system.area}</p>
              </div>
              <div className="integration-state">
                <Link2 size={14} />
                {system.integration}
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="system-map">
        <div className="card-heading">
          <div>
            <h3>Mapa da informação</h3>
            <p>Como os dados passam entre ferramentas no processo atual.</p>
          </div>
          <Badge tone="warning">3 passagens manuais</Badge>
        </div>
        <div className="map-flow">
          {[
            ["Pedido", "Outlook"],
            ["Orçamento", "Excel"],
            ["Encomenda", "PHC"],
            ["Planeamento", "Excel"],
            ["Produção", "Papel"],
          ].map(([label, tool], index, array) => (
            <div className="map-step-wrap" key={label}>
              <div className="map-step">
                <span>{label}</span>
                <strong>{tool}</strong>
              </div>
              {index < array.length - 1 ? (
                <div className="map-arrow">
                  <ArrowRight size={16} />
                  <small>{index === 1 || index === 2 ? "manual" : ""}</small>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </Card>

      <Card className="maturity-card">
        <div className="maturity-score">
          <CircleGauge size={24} />
          <div>
            <strong>2,4 / 5</strong>
            <span>Maturidade digital</span>
          </div>
        </div>
        <div className="maturity-bars">
          {[
            ["Dados centralizados", 34],
            ["Automação", 22],
            ["Visibilidade", 46],
            ["Colaboração", 58],
          ].map(([label, value]) => (
            <Progress key={label} label={String(label)} value={Number(value)} compact />
          ))}
        </div>
      </Card>
    </div>
  );
}

function ProblemsSection() {
  const [problems, setProblems] = useState(problemSeed);

  function setImpact(index: number, impact: number) {
    setProblems((current) =>
      current.map((item, itemIndex) =>
        itemIndex === index ? { ...item, impact } : item,
      ),
    );
  }

  return (
    <div className="diagnostic-section">
      <div className="content-heading">
        <div>
          <p className="eyebrow">Impacto operacional</p>
          <h2>Problemas e prioridades</h2>
          <p>Ordene os bloqueios pelo impacto real na operação.</p>
        </div>
        <Button>
          <Plus size={16} /> Adicionar problema
        </Button>
      </div>
      <div className="problems-list">
        {problems.map((problem, index) => (
          <Card className="problem-card" key={problem.title}>
            <div className="problem-rank">{index + 1}</div>
            <div className="problem-copy">
              <div>
                <Badge tone={problem.tone}>
                  {index === 0 ? "Prioridade crítica" : `Prioridade ${index + 1}`}
                </Badge>
                <h3>{problem.title}</h3>
              </div>
              <div className="problem-meta">
                <span>
                  <Clock3 size={14} /> {problem.frequency}
                </span>
                <span>
                  <Target size={14} /> {problem.cost}
                </span>
              </div>
            </div>
            <div className="impact-control">
              <span>Impacto</span>
              <div>
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    type="button"
                    key={value}
                    className={value <= problem.impact ? "active" : ""}
                    onClick={() => setImpact(index, value)}
                    aria-label={`Definir impacto ${value}`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
            <span className="drag-handle">
              <GripVertical size={18} />
            </span>
          </Card>
        ))}
      </div>

      <Card className="impact-summary">
        <div>
          <span className="summary-icon">
            <Clock3 size={19} />
          </span>
          <div>
            <span>Tempo recuperável estimado</span>
            <strong>22 h / semana</strong>
          </div>
        </div>
        <div>
          <span className="summary-icon">
            <Target size={19} />
          </span>
          <div>
            <span>Áreas mais afetadas</span>
            <strong>Comercial e Produção</strong>
          </div>
        </div>
        <div>
          <span className="summary-icon">
            <TriangleAlert size={19} />
          </span>
          <div>
            <span>Risco mais relevante</span>
            <strong>Retrabalho e atraso</strong>
          </div>
        </div>
      </Card>
    </div>
  );
}

function SummarySection() {
  return (
    <div className="diagnostic-section">
      <div className="content-heading">
        <div>
          <p className="eyebrow">Resultado do diagnóstico</p>
          <h2>Uma operação com bons fundamentos, mas fragmentada</h2>
          <p>
            A prioridade é eliminar passagens manuais e dar visibilidade comum às
            equipas.
          </p>
        </div>
        <Button>
          <Download size={16} /> Exportar PDF
        </Button>
      </div>

      <div className="summary-metrics">
        <Card>
          <span>Processos analisados</span>
          <strong>3</strong>
          <small>12 etapas documentadas</small>
        </Card>
        <Card>
          <span>Sistemas atuais</span>
          <strong>7</strong>
          <small>3 passagens manuais críticas</small>
        </Card>
        <Card>
          <span>Tempo recuperável</span>
          <strong>22 h</strong>
          <small>por semana</small>
        </Card>
        <Card>
          <span>Maturidade digital</span>
          <strong>2,4</strong>
          <small>em 5 pontos</small>
        </Card>
      </div>

      <Card className="narrative-card">
        <div className="narrative-label">
          <Sparkles size={18} />
          Síntese automática
        </div>
        <p>
          A Metalúrgica Central cresceu com processos suportados por pessoas
          experientes, folhas de cálculo e comunicação direta. O modelo funciona,
          mas a escala atual expõe dependências: informação repetida, aprovações
          centralizadas e pouca visibilidade entre comercial e produção.
        </p>
      </Card>

      <div className="recommendation-grid">
        <Card className="recommendation-column">
          <div className="recommendation-title">
            <span className="priority-mark priority-high" />
            <div>
              <strong>Prioridade elevada</strong>
              <p>Primeira fase da implementação</p>
            </div>
          </div>
          {[
            "Fluxo único de pedido e orçamento",
            "Criação automática da ordem de produção",
            "Planeamento visual de capacidade",
          ].map((item) => (
            <div className="recommendation-item" key={item}>
              <CheckCircle2 size={17} />
              <span>{item}</span>
            </div>
          ))}
        </Card>
        <Card className="recommendation-column">
          <div className="recommendation-title">
            <span className="priority-mark priority-medium" />
            <div>
              <strong>Prioridade média</strong>
              <p>Após estabilização do fluxo</p>
            </div>
          </div>
          {[
            "Portal documental por encomenda",
            "Aprovações e notificações",
            "Indicadores operacionais",
          ].map((item) => (
            <div className="recommendation-item" key={item}>
              <CheckCircle2 size={17} />
              <span>{item}</span>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

function DemoSection() {
  const demoSteps = [
    {
      time: "03 min",
      title: "Entrada de um novo pedido",
      detail: "Centralizar email, ficheiros e dados do cliente.",
      icon: ClipboardList,
    },
    {
      time: "07 min",
      title: "Orçamento e aprovação",
      detail: "Construir, rever e aprovar sem versões paralelas.",
      icon: FileText,
    },
    {
      time: "08 min",
      title: "Planeamento de produção",
      detail: "Converter o orçamento e visualizar capacidade.",
      icon: Workflow,
    },
    {
      time: "05 min",
      title: "Execução e acompanhamento",
      detail: "Registar avanço e partilhar estado com o comercial.",
      icon: BarChart3,
    },
  ];

  return (
    <div className="diagnostic-section">
      <div className="content-heading">
        <div>
          <p className="eyebrow">Demo personalizada</p>
          <h2>Percurso recomendado</h2>
          <p>Uma demonstração de 25 minutos construída a partir do diagnóstico.</p>
        </div>
        <Button variant="primary">
          <MonitorPlay size={16} /> Iniciar apresentação
        </Button>
      </div>

      <Card className="demo-intro">
        <span className="demo-icon">
          <Sparkles size={22} />
        </span>
        <div>
          <strong>Começar pelo resultado que a equipa quer sentir</strong>
          <p>
            “Uma encomenda aprovada chega à produção sem voltar a ser escrita e
            todos sabem em que estado está.”
          </p>
        </div>
      </Card>

      <div className="demo-timeline">
        {demoSteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <Card className="demo-step" key={step.title}>
              <div className="demo-step-line">
                <span>{index + 1}</span>
              </div>
              <span className="demo-step-icon">
                <Icon size={20} />
              </span>
              <div>
                <Badge>{step.time}</Badge>
                <h3>{step.title}</h3>
                <p>{step.detail}</p>
              </div>
              <button className="icon-button" type="button" aria-label="Abrir detalhe">
                <ChevronRight size={18} />
              </button>
            </Card>
          );
        })}
      </div>

      <Card className="success-card">
        <div className="card-heading">
          <div>
            <h3>Indicadores de sucesso a validar</h3>
            <p>Resultados que devem orientar a decisão e o futuro projeto.</p>
          </div>
        </div>
        <div className="success-grid">
          {[
            ["−70%", "tempo administrativo por encomenda"],
            ["1 fonte", "de informação operacional"],
            ["Tempo real", "visibilidade de produção"],
          ].map(([value, label]) => (
            <div key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export function DiagnosticWorkspace() {
  const [activeSection, setActiveSection] = useState(3);
  const [saved, setSaved] = useState(false);
  const active = sections[activeSection];

  const overallProgress = useMemo(
    () =>
      Math.round(
        sections.reduce((total, section) => total + section.completion, 0) /
          sections.length,
      ),
    [],
  );

  const content = [
    <CompanySection key="company" />,
    <OperationSection key="operation" />,
    <TeamSection key="team" />,
    <SystemsSection key="systems" />,
    <ProblemsSection key="problems" />,
    <SummarySection key="summary" />,
    <DemoSection key="demo" />,
  ][activeSection];

  function save() {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1200);
  }

  function next() {
    setActiveSection((current) => Math.min(current + 1, sections.length - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="diagnostic-page">
      <header className="diagnostic-header">
        <div className="diagnostic-header-main">
          <Link className="back-link" href="/diagnosticos" aria-label="Voltar">
            <ArrowLeft size={18} />
          </Link>
          <span className="company-logo company-logo-small">MC</span>
          <div className="diagnostic-title">
            <div>
              <h1>Metalúrgica Central</h1>
              <Badge tone="accent">Em diagnóstico</Badge>
            </div>
            <p>Diagnóstico operacional · Sessão 2 de 3</p>
          </div>
        </div>
        <div className="diagnostic-header-actions">
          <div className="header-progress">
            <span>Progresso geral</span>
            <strong>{overallProgress}%</strong>
            <Progress value={overallProgress} />
          </div>
          <Button>
            <Paperclip size={16} /> Anexos
          </Button>
          <Button variant="primary" onClick={save}>
            {saved ? <Check size={16} /> : <Save size={16} />}
            {saved ? "Guardado" : "Guardar"}
          </Button>
        </div>
      </header>

      <nav className="diagnostic-steps" aria-label="Etapas do diagnóstico">
        {sections.map((section, index) => {
          const Icon = section.icon;
          const selected = activeSection === index;
          const complete = section.completion === 100;
          return (
            <button
              key={section.label}
              type="button"
              className={`diagnostic-step ${selected ? "active" : ""}`}
              onClick={() => setActiveSection(index)}
              aria-current={selected ? "step" : undefined}
            >
              <span className="diagnostic-step-icon">
                {complete ? <Check size={16} /> : <Icon size={17} />}
              </span>
              <span>
                <strong>{section.label}</strong>
                <small>{section.short}</small>
              </span>
              {index < sections.length - 1 ? (
                <span className="step-line" aria-hidden="true" />
              ) : null}
            </button>
          );
        })}
      </nav>

      <div className="diagnostic-workspace">
        <aside className="questions-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Perguntas</p>
              <h2>{active.label}</h2>
            </div>
            <Badge>{active.questions.length}</Badge>
          </div>
          <div className="question-list">
            {active.questions.map((question, index) => (
              <button
                type="button"
                className={`question-item ${index === 1 ? "current" : ""}`}
                key={question}
              >
                <span className={index === 0 ? "answered" : ""}>
                  {index === 0 ? <Check size={13} /> : index + 1}
                </span>
                <p>{question}</p>
              </button>
            ))}
          </div>
          <div className="questions-footer">
            <MessageSquare size={16} />
            <div>
              <strong>Notas da sessão</strong>
              <span>3 comentários registados</span>
            </div>
          </div>
        </aside>

        <section className="diagnostic-content">{content}</section>

        <aside className="insights-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Em tempo real</p>
              <h2>Insights</h2>
            </div>
            <Sparkles size={18} />
          </div>
          <Card className="live-insight">
            <span className="insight-number">01</span>
            <div>
              <strong>{insights[activeSection].title}</strong>
              <p>{insights[activeSection].body}</p>
            </div>
          </Card>

          <div className="insight-section">
            <h3>Sinais detetados</h3>
            <div className="signal-list">
              <div>
                <span className="signal-icon">
                  <TriangleAlert size={15} />
                </span>
                <p>
                  <strong>Dependência manual</strong>
                  A operação depende de confirmação verbal.
                </p>
              </div>
              <div>
                <span className="signal-icon">
                  <Link2 size={15} />
                </span>
                <p>
                  <strong>Dados fragmentados</strong>3 fontes para o mesmo pedido.
                </p>
              </div>
              <div>
                <span className="signal-icon">
                  <Clock3 size={15} />
                </span>
                <p>
                  <strong>Tempo de espera</strong>
                  Aprovações demoram até 1 dia.
                </p>
              </div>
            </div>
          </div>

          <div className="insight-section">
            <h3>Recomendação</h3>
            <div className="recommendation-note">
              <Lightbulb size={17} />
              <p>
                Na demo, mostrar uma única encomenda a atravessar o processo
                completo sem nova introdução de dados.
              </p>
            </div>
          </div>

          <button className="notes-button" type="button">
            <MessageSquare size={16} />
            Adicionar nota privada
          </button>
        </aside>
      </div>

      <footer className="diagnostic-footer">
        <div>
          <Clock3 size={15} />
          Alterações guardadas automaticamente às 16:42
        </div>
        <div>
          <Button
            onClick={() => setActiveSection((current) => Math.max(0, current - 1))}
            disabled={activeSection === 0}
          >
            Anterior
          </Button>
          <Button
            variant="primary"
            onClick={next}
            disabled={activeSection === sections.length - 1}
          >
            Continuar
            <ArrowRight size={16} />
          </Button>
        </div>
      </footer>
    </div>
  );
}
