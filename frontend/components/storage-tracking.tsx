"use client";

import {
  AlertTriangle,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Boxes,
  BrainCircuit,
  CalendarRange,
  Check,
  ChevronRight,
  Clock3,
  PackageCheck,
  Search,
  ShoppingCart,
  Sparkles,
  TrendingUp,
  Truck,
  Warehouse,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Badge, Button, Card, PageHeader, SectionHeader } from "@/components/ui";

type ProductStatus = "urgent" | "soon" | "healthy" | "overstock";
type View = "overview" | "products" | "movements" | "forecast";

type Product = {
  id: string;
  name: string;
  sku: string;
  category: string;
  stock: number;
  reserved: number;
  outgoing: number;
  coverage: number;
  recommended: number;
  purchase: number;
  status: ProductStatus;
  trend: number;
  leadTime: number;
  season: string;
  note: string;
};

const products: Product[] = [
  {
    id: "perfil",
    name: "Perfil aço S275 40×40",
    sku: "ACO-4040-S275",
    category: "Aço",
    stock: 186,
    reserved: 42,
    outgoing: 128,
    coverage: 34,
    recommended: 310,
    purchase: 124,
    status: "soon",
    trend: 18,
    leadTime: 12,
    season: "Pico entre maio e setembro",
    note: "O consumo está a acelerar com trabalhos exteriores. Antecipar a encomenda evita rutura durante a primeira quinzena de setembro.",
  },
  {
    id: "chapa",
    name: "Chapa galvanizada 2 mm",
    sku: "CHP-GALV-2",
    category: "Chapa",
    stock: 74,
    reserved: 18,
    outgoing: 69,
    coverage: 24,
    recommended: 155,
    purchase: 81,
    status: "urgent",
    trend: 26,
    leadTime: 15,
    season: "Procura elevada no verão",
    note: "A cobertura já está próxima do prazo médio do fornecedor. Recomenda-se emitir compra esta semana e reservar 20 unidades para obras confirmadas.",
  },
  {
    id: "parafuso",
    name: "Parafuso inox M8",
    sku: "FIX-INOX-M8",
    category: "Fixação",
    stock: 1840,
    reserved: 320,
    outgoing: 740,
    coverage: 62,
    recommended: 1700,
    purchase: 0,
    status: "healthy",
    trend: 8,
    leadTime: 5,
    season: "Consumo estável",
    note: "O stock atual cobre a procura prevista. Manter o ponto de encomenda nas 900 unidades.",
  },
  {
    id: "tinta",
    name: "Tinta anticorrosiva 5 L",
    sku: "TNT-ANTI-5L",
    category: "Consumíveis",
    stock: 96,
    reserved: 12,
    outgoing: 38,
    coverage: 66,
    recommended: 82,
    purchase: 0,
    status: "overstock",
    trend: -12,
    leadTime: 8,
    season: "Quebra prevista em outubro",
    note: "Existe excesso moderado face à procura de outono. Suspender compras durante 45 dias e consumir primeiro os lotes mais antigos.",
  },
  {
    id: "disco",
    name: "Disco de corte 125 mm",
    sku: "CON-DISC-125",
    category: "Consumíveis",
    stock: 238,
    reserved: 30,
    outgoing: 176,
    coverage: 41,
    recommended: 360,
    purchase: 122,
    status: "soon",
    trend: 14,
    leadTime: 7,
    season: "Pico moderado no verão",
    note: "Consolidar a compra com outros consumíveis dentro de 7 dias reduz portes sem colocar a operação em risco.",
  },
  {
    id: "kit",
    name: "Kit fixação exterior",
    sku: "KIT-EXT-01",
    category: "Fixação",
    stock: 52,
    reserved: 21,
    outgoing: 45,
    coverage: 21,
    recommended: 120,
    purchase: 68,
    status: "urgent",
    trend: 31,
    leadTime: 10,
    season: "Pico forte de junho a setembro",
    note: "A procura atual está 31% acima da média. Comprar agora e manter stock de segurança reforçado até ao fim de setembro.",
  },
];

const seasonalDemand = [
  { month: "Jan", value: 46 },
  { month: "Fev", value: 49 },
  { month: "Mar", value: 55 },
  { month: "Abr", value: 61 },
  { month: "Mai", value: 72 },
  { month: "Jun", value: 84 },
  { month: "Jul", value: 96 },
  { month: "Ago", value: 92 },
  { month: "Set", value: 79 },
  { month: "Out", value: 64 },
  { month: "Nov", value: 52 },
  { month: "Dez", value: 43 },
];

const movements = [
  { time: "Hoje, 09:42", product: "Chapa galvanizada 2 mm", type: "Saída", quantity: "−12 un.", destination: "Obra BRG-241" },
  { time: "Hoje, 08:15", product: "Parafuso inox M8", type: "Entrada", quantity: "+500 un.", destination: "Fornecedor Lusofix" },
  { time: "Ontem, 16:30", product: "Kit fixação exterior", type: "Reserva", quantity: "−8 un.", destination: "Montagens Litoral" },
  { time: "Ontem, 11:18", product: "Disco de corte 125 mm", type: "Saída", quantity: "−24 un.", destination: "Produção" },
  { time: "28 jul., 15:05", product: "Perfil aço S275 40×40", type: "Entrada", quantity: "+80 un.", destination: "Aços do Norte" },
];

const statusContent: Record<ProductStatus, { label: string; tone: "danger" | "warning" | "success" | "neutral" }> = {
  urgent: { label: "Comprar agora", tone: "danger" },
  soon: { label: "Comprar em breve", tone: "warning" },
  healthy: { label: "Stock saudável", tone: "success" },
  overstock: { label: "Excesso", tone: "neutral" },
};

export function StorageTracking() {
  const [view, setView] = useState<View>("overview");
  const [period, setPeriod] = useState("90 dias");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todos");
  const [selectedId, setSelectedId] = useState("chapa");
  const [planReady, setPlanReady] = useState(false);

  const selected = products.find((product) => product.id === selectedId) ?? products[0];
  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        const matchesQuery = `${product.name} ${product.sku}`.toLowerCase().includes(query.toLowerCase());
        const matchesCategory = category === "Todos" || product.category === category;
        return matchesQuery && matchesCategory;
      }),
    [category, query],
  );

  return (
    <div className="page-container storage-page">
      <PageHeader
        eyebrow="Operações · Storage"
        title="Tracking de stock"
        description="Fluxo de produto, necessidades de compra e previsão sazonal num único lugar."
        actions={
          <div className="storage-header-actions">
            <label className="storage-period">
              <CalendarRange size={16} />
              <span className="sr-only">Período de análise</span>
              <select value={period} onChange={(event) => setPeriod(event.target.value)}>
                <option>30 dias</option>
                <option>90 dias</option>
                <option>12 meses</option>
              </select>
            </label>
            <Button variant="primary" onClick={() => setPlanReady(true)}>
              <ShoppingCart size={16} />
              Gerar plano de compra
            </Button>
          </div>
        }
      />

      {planReady ? (
        <div className="storage-toast" role="status">
          <span><Check size={15} /></span>
          <div>
            <strong>Plano de compra preparado</strong>
            <p>3 produtos prioritários · 273 unidades recomendadas · simulação apenas frontend</p>
          </div>
          <button type="button" onClick={() => setPlanReady(false)} aria-label="Fechar aviso">×</button>
        </div>
      ) : null}

      <div className="storage-tabs" role="tablist" aria-label="Vistas de storage">
        {[
          ["overview", "Visão geral"],
          ["products", "Produtos"],
          ["movements", "Movimentos"],
          ["forecast", "Previsão IA"],
        ].map(([value, label]) => (
          <button
            key={value}
            type="button"
            role="tab"
            aria-selected={view === value}
            className={view === value ? "storage-tab-active" : ""}
            onClick={() => setView(value as View)}
          >
            {label}
          </button>
        ))}
      </div>

      {(view === "overview" || view === "forecast") ? (
        <>
          <section className="storage-metrics" aria-label="Indicadores de stock">
            <Card className="storage-metric">
              <span className="storage-metric-icon"><Boxes size={19} /></span>
              <div><span>Valor em stock</span><strong>€48.620</strong><small><ArrowUpRight size={13} /> 4,8% vs. período anterior</small></div>
            </Card>
            <Card className="storage-metric">
              <span className="storage-metric-icon"><ArrowDownRight size={19} /></span>
              <div><span>Saída mensal</span><strong>1.196 un.</strong><small><TrendingUp size={13} /> Procura 17% acima da média</small></div>
            </Card>
            <Card className="storage-metric storage-metric-alert">
              <span className="storage-metric-icon"><AlertTriangle size={19} /></span>
              <div><span>Em risco de rutura</span><strong>2 produtos</strong><small>Ambos dentro do lead time</small></div>
            </Card>
            <Card className="storage-metric">
              <span className="storage-metric-icon"><ShoppingCart size={19} /></span>
              <div><span>Compra recomendada</span><strong>€7.840</strong><small>273 unidades em 3 encomendas</small></div>
            </Card>
          </section>

          <section className="storage-intelligence-grid">
            <Card className="ai-stock-card">
              <div className="ai-stock-header">
                <span className="ai-stock-icon"><BrainCircuit size={20} /></span>
                <div>
                  <div className="inline-title">
                    <h2>Análise de IA</h2>
                    <Badge tone="accent">Atualizada agora</Badge>
                  </div>
                  <p>Previsão baseada no histórico de saídas, reservas, lead time e sazonalidade.</p>
                </div>
              </div>
              <div className="ai-stock-summary">
                <Sparkles size={17} />
                <p>
                  A procura deverá manter-se <strong>21% acima do normal até setembro</strong>.
                  Prioriza chapa galvanizada e kits de fixação; adia a compra de tinta para libertar €1.120.
                </p>
              </div>
              <div className="ai-recommendation-list">
                <button type="button" onClick={() => setSelectedId("chapa")}>
                  <span className="recommendation-order recommendation-urgent">1</span>
                  <div><strong>Comprar 81 chapas galvanizadas</strong><small>Esta semana · evita rutura em 24 dias</small></div>
                  <ChevronRight size={17} />
                </button>
                <button type="button" onClick={() => setSelectedId("kit")}>
                  <span className="recommendation-order recommendation-urgent">2</span>
                  <div><strong>Reforçar 68 kits de fixação</strong><small>Procura de verão +31% · cobertura de 21 dias</small></div>
                  <ChevronRight size={17} />
                </button>
                <button type="button" onClick={() => setSelectedId("tinta")}>
                  <span className="recommendation-order">3</span>
                  <div><strong>Suspender compra de tinta</strong><small>Stock excedente para os próximos 45 dias</small></div>
                  <ChevronRight size={17} />
                </button>
              </div>
            </Card>

            <Card className="seasonality-card">
              <SectionHeader
                title="Procura sazonal"
                description={`Índice de saída previsto · ${period}`}
                action={<Badge tone="warning">Pico de verão</Badge>}
              />
              <div className="season-chart" aria-label="Procura prevista por mês">
                <div className="season-chart-area">
                  {seasonalDemand.map((point, index) => (
                    <div className="season-bar-wrap" key={point.month}>
                      <span className="season-bar-value">{point.value}</span>
                      <span
                        className={`season-bar ${index >= 5 && index <= 8 ? "season-bar-peak" : ""}`}
                        style={{ height: `${point.value}%` }}
                      />
                      <small>{point.month}</small>
                    </div>
                  ))}
                </div>
              </div>
              <div className="season-note">
                <span><TrendingUp size={16} /></span>
                <p><strong>Junho a setembro</strong> concentra 38% das saídas anuais. O stock de segurança recomendado sobe de 21 para 35 dias neste período.</p>
              </div>
            </Card>
          </section>
        </>
      ) : null}

      {(view === "overview" || view === "products") ? (
        <section className="storage-product-grid">
          <Card className="storage-table-card">
            <SectionHeader
              title="Fluxo por produto"
              description="Stock atual comparado com consumo e nível recomendado."
            />
            <div className="storage-filters">
              <label className="storage-search">
                <Search size={16} />
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Pesquisar produto ou SKU..." />
              </label>
              <select value={category} onChange={(event) => setCategory(event.target.value)} aria-label="Filtrar por categoria">
                {["Todos", "Aço", "Chapa", "Fixação", "Consumíveis"].map((item) => <option key={item}>{item}</option>)}
              </select>
            </div>
            <div className="table-scroll">
              <table className="data-table storage-table">
                <thead>
                  <tr>
                    <th>Produto</th>
                    <th>Disponível</th>
                    <th>Saída / mês</th>
                    <th>Cobertura</th>
                    <th>Recomendação</th>
                    <th aria-label="Abrir" />
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => {
                    const status = statusContent[product.status];
                    return (
                      <tr
                        key={product.id}
                        className={selected.id === product.id ? "storage-row-selected" : ""}
                        onClick={() => setSelectedId(product.id)}
                      >
                        <td>
                          <div className="storage-product-name">
                            <span><Boxes size={17} /></span>
                            <div><strong>{product.name}</strong><small>{product.sku} · {product.category}</small></div>
                          </div>
                        </td>
                        <td><strong>{product.stock - product.reserved}</strong><small className="table-subcopy">{product.reserved} reservadas</small></td>
                        <td><strong>{product.outgoing} un.</strong><small className={`table-subcopy ${product.trend > 0 ? "trend-up" : ""}`}>{product.trend > 0 ? "+" : ""}{product.trend}% tendência</small></td>
                        <td><strong>{product.coverage} dias</strong><span className="coverage-track"><span style={{ width: `${Math.min(product.coverage, 90)}%` }} /></span></td>
                        <td><Badge tone={status.tone}>{status.label}</Badge>{product.purchase > 0 ? <small className="table-subcopy">+{product.purchase} un.</small> : null}</td>
                        <td><ChevronRight size={16} /></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>

          <Card className="stock-detail-card">
            <div className="stock-detail-heading">
              <span><Warehouse size={19} /></span>
              <div><small>Produto selecionado</small><h2>{selected.name}</h2><p>{selected.sku}</p></div>
            </div>
            <Badge tone={statusContent[selected.status].tone}>{statusContent[selected.status].label}</Badge>
            <div className="stock-level-visual">
              <div className="stock-level-label"><span>Stock atual</span><strong>{selected.stock} un.</strong></div>
              <div className="stock-level-track"><span style={{ width: `${Math.min((selected.stock / selected.recommended) * 100, 100)}%` }} /></div>
              <div className="stock-level-scale"><span>0</span><span>Recomendado: {selected.recommended}</span></div>
            </div>
            <div className="stock-detail-stats">
              <div><span>Disponível</span><strong>{selected.stock - selected.reserved}</strong></div>
              <div><span>Reservado</span><strong>{selected.reserved}</strong></div>
              <div><span>Lead time</span><strong>{selected.leadTime} dias</strong></div>
              <div><span>Comprar</span><strong>{selected.purchase || "—"}</strong></div>
            </div>
            <div className="stock-detail-season"><CalendarRange size={16} /><div><strong>{selected.season}</strong><p>{selected.trend > 0 ? `Procura ${selected.trend}% acima da base.` : `Procura ${Math.abs(selected.trend)}% abaixo da base.`}</p></div></div>
            <div className="stock-detail-ai"><Sparkles size={16} /><p>{selected.note}</p></div>
            <Button variant={selected.purchase > 0 ? "primary" : "secondary"} className="full-width" onClick={() => setPlanReady(true)}>
              {selected.purchase > 0 ? <><ShoppingCart size={16} />Adicionar ao plano · {selected.purchase} un.</> : <><PackageCheck size={16} />Stock sob controlo</>}
            </Button>
          </Card>
        </section>
      ) : null}

      {(view === "overview" || view === "movements") ? (
        <section className="storage-bottom-grid">
          <Card className="movement-card">
            <SectionHeader title="Movimentos recentes" description="Últimas entradas, saídas e reservas registadas." />
            <div className="movement-list">
              {movements.map((movement) => (
                <div className="movement-item" key={`${movement.time}-${movement.product}`}>
                  <span className={`movement-icon movement-${movement.type.toLowerCase()}`}>
                    {movement.type === "Entrada" ? <ArrowDownRight size={16} /> : movement.type === "Reserva" ? <Clock3 size={16} /> : <ArrowUpRight size={16} />}
                  </span>
                  <div><strong>{movement.product}</strong><small>{movement.time} · {movement.destination}</small></div>
                  <div><strong>{movement.quantity}</strong><small>{movement.type}</small></div>
                </div>
              ))}
            </div>
          </Card>
          <Card className="purchase-calendar-card">
            <SectionHeader title="Próximas decisões" description="Plano sugerido para proteger o fluxo operacional." />
            <div className="purchase-timeline">
              <div className="purchase-step purchase-step-urgent"><span /><div><small>Comprar agora</small><strong>Chapa galvanizada + Kit fixação</strong><p>149 unidades · €5.960 estimados</p></div></div>
              <div className="purchase-step"><span /><div><small>Dentro de 7 dias</small><strong>Discos de corte + Perfil aço</strong><p>246 unidades · consolidar transporte</p></div></div>
              <div className="purchase-step"><span /><div><small>Monitorizar em setembro</small><strong>Tinta anticorrosiva</strong><p>Sem compra · consumir excesso atual</p></div></div>
            </div>
            <button className="purchase-plan-link" type="button" onClick={() => setPlanReady(true)}>
              Rever plano completo <ArrowRight size={15} />
            </button>
          </Card>
        </section>
      ) : null}

      {view === "forecast" ? (
        <Card className="forecast-method-card">
          <div><Truck size={19} /><div><strong>Como esta previsão é calculada</strong><p>Combina velocidade de saída, reservas, prazo do fornecedor, stock de segurança e padrões mensais. Os valores são uma simulação frontend para demonstrar a experiência.</p></div></div>
        </Card>
      ) : null}
    </div>
  );
}
