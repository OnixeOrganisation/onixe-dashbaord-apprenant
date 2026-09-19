"use client";

import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useBulletin } from "@/hooks/use-apprenant-data";

import { CompetencesValidees } from "./_components/competences-validees";
import { TableauNotes } from "./_components/tableau-notes";

export default function PageBulletin() {
  const { exportPDF } = useBulletin();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-3 border-b pb-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="flex items-center gap-2 font-bold text-2xl text-foreground tracking-tight">
            Relevé de Notes & Compétences Validées
          </h1>
          <p className="mt-0.5 text-muted-foreground text-sm">
            Évaluation continue basée sur la preuve de compétence et le feedback des formateurs.
          </p>
        </div>
        <Button onClick={exportPDF} size="sm" className="w-fit font-medium">
          <Download className="mr-2 h-4 w-4" /> Exporter le Bulletin (PDF)
        </Button>
      </div>

      {/* Competences Overview Card */}
      <CompetencesValidees />

      {/* Detailed Notes & Qualitative Feedback Table */}
      <TableauNotes />
    </div>
  );
}
