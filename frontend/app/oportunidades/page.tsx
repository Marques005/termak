import { Download } from "lucide-react";
import { NewOpportunity } from "@/components/new-opportunity";
import { OpportunitiesView } from "@/components/opportunities-view";
import { Button, PageHeader } from "@/components/ui";

export default function OpportunitiesPage() {
  return (
    <div className="page-container">
      <PageHeader
        eyebrow="Pipeline comercial"
        title="Oportunidades"
        description="Acompanhe o avanço, o valor e a próxima ação de cada negócio."
        actions={
          <>
            <Button>
              <Download size={16} /> Exportar
            </Button>
            <NewOpportunity />
          </>
        }
      />
      <div className="summary-strip">
        <div>
          <span>Pipeline total</span>
          <strong>€95.900</strong>
        </div>
        <div>
          <span>Valor ponderado</span>
          <strong>€61.425</strong>
        </div>
        <div>
          <span>Oportunidades</span>
          <strong>5</strong>
        </div>
        <div>
          <span>Previsão de fecho</span>
          <strong>2 este mês</strong>
        </div>
      </div>
      <OpportunitiesView />
    </div>
  );
}
