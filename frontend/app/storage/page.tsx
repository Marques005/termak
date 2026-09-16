import type { Metadata } from "next";
import { StorageTracking } from "@/components/storage-tracking";

export const metadata: Metadata = {
  title: "Storage | Termak",
  description: "Tracking de stock, fluxo de produto e previsão de necessidades.",
};

export default function StoragePage() {
  return <StorageTracking />;
}
