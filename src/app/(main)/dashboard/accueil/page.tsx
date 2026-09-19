import { Sparkles } from "lucide-react";

import { rootUser } from "@/data/users";

import { FilAnnonces } from "./_components/fil-annonces";
import { ProchainesEcheances } from "./_components/prochaines-echeances";
import { ProgressionStrates } from "./_components/progression-strates";

export default function PageAccueil() {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col gap-1 border-b pb-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="flex items-center gap-2 font-bold text-2xl text-foreground tracking-tight">
            Tableau de Bord Apprenant
          </h1>
          <p className="mt-0.5 text-muted-foreground text-sm">
            Bienvenue, <span className="font-semibold text-foreground">{rootUser.name}</span> — {rootUser.cohorte} (
            {rootUser.etablissement})
          </p>
        </div>
        <div className="mt-2 flex w-fit items-center gap-2 rounded-md border bg-muted/40 px-3 py-1.5 font-mono text-muted-foreground text-xs md:mt-0">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          The Quiet OS for Modern Academies
        </div>
      </div>

      {/* Main Strates Progression Card */}
      <ProgressionStrates />

      {/* Two Column Grid for Deadlines & Announcements */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ProchainesEcheances />
        <FilAnnonces />
      </div>
    </div>
  );
}
