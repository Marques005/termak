import {
  ArrowUpRight,
  Building2,
  Mail,
  MapPin,
  Phone,
  Plus,
  Search,
  Users,
} from "lucide-react";
import { Badge, Button, Card, PageHeader } from "@/components/ui";

const clients = [
  {
    name: "Metalúrgica Central",
    initials: "MC",
    sector: "Metalomecânica",
    location: "Braga",
    people: 46,
    contact: "Rui Silva",
    email: "rui@metalurgicacentral.pt",
    phone: "+351 253 000 124",
    state: "Diagnóstico",
  },
  {
    name: "Norte Clima",
    initials: "NC",
    sector: "Climatização",
    location: "Porto",
    people: 28,
    contact: "Ana Costa",
    email: "ana@norteclima.pt",
    phone: "+351 229 000 845",
    state: "Demo",
  },
  {
    name: "Montagens Litoral",
    initials: "ML",
    sector: "Construção",
    location: "Aveiro",
    people: 19,
    contact: "Paulo Dias",
    email: "paulo@montagenslitoral.pt",
    phone: "+351 234 000 530",
    state: "Qualificação",
  },
  {
    name: "Ferro & Forma",
    initials: "FF",
    sector: "Metalomecânica",
    location: "Guimarães",
    people: 62,
    contact: "Marta Rocha",
    email: "marta@ferroeforma.pt",
    phone: "+351 253 000 728",
    state: "Proposta",
  },
  {
    name: "Tecnovent",
    initials: "TV",
    sector: "Manutenção industrial",
    location: "Viana do Castelo",
    people: 14,
    contact: "João Sousa",
    email: "joao@tecnovent.pt",
    phone: "+351 258 000 912",
    state: "Qualificação",
  },
];

export default function ClientsPage() {
  return (
    <div className="page-container">
      <PageHeader
        eyebrow="Base de contas"
        title="Clientes"
        description="Empresas, contactos e contexto operacional num único lugar."
        actions={
          <Button variant="primary">
            <Plus size={16} /> Adicionar empresa
          </Button>
        }
      />
      <div className="toolbar">
        <label className="search-field">
          <Search size={16} />
          <input placeholder="Pesquisar empresas ou contactos..." />
        </label>
        <Button>
          <Building2 size={16} /> Todos os setores
        </Button>
      </div>
      <div className="client-grid">
        {clients.map((client) => (
          <Card className="client-card" key={client.name}>
            <div className="client-card-header">
              <span className="company-logo">{client.initials}</span>
              <div>
                <h2>{client.name}</h2>
                <p>
                  {client.sector} · {client.location}
                </p>
              </div>
              <Badge tone={client.state === "Diagnóstico" ? "accent" : "neutral"}>
                {client.state}
              </Badge>
            </div>
            <div className="client-facts">
              <span>
                <Users size={15} /> {client.people} colaboradores
              </span>
              <span>
                <MapPin size={15} /> {client.location}
              </span>
            </div>
            <div className="client-contact">
              <strong>{client.contact}</strong>
              <span>
                <Mail size={14} /> {client.email}
              </span>
              <span>
                <Phone size={14} /> {client.phone}
              </span>
            </div>
            <div className="client-footer">
              <span>Última atividade há 2 dias</span>
              <button className="icon-button" type="button" aria-label="Abrir cliente">
                <ArrowUpRight size={17} />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
