import type { Metadata } from "next";
import { DiagnosticWorkspace } from "@/components/diagnostic-workspace";

export const metadata: Metadata = {
  title: "Metalúrgica Central",
  description: "Diagnóstico operacional da Metalúrgica Central.",
};

export default function MetalurgicaDiagnosticPage() {
  return <DiagnosticWorkspace />;
}
