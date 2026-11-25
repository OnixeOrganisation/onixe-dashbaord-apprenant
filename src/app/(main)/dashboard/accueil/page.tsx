"use client";

import { Calendar, GraduationCap, School, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { rootUser } from "@/data/users";
import { useAcademicStore } from "@/stores/academic/academic-store";

import { FilAnnonces } from "./_components/fil-annonces";
import { PerformanceKPIs } from "./_components/performance-kpis";
import { ProchainesEcheances } from "./_components/prochaines-echeances";
import { ProgressionCohorte } from "./_components/progression-cohorte";

export default function PageAccueil() {
  const getActiveEtablissement = useAcademicStore((s) => s.getActiveEtablissement);
  const getActiveCohorte = useAcademicStore((s) => s.getActiveCohorte);

  const activeEtab = getActiveEtablissement();
  const activeCohorte = getActiveCohorte();

  return (
    <div className="space-y-6">
      {/* Header Banner Contextuel */}
      <div className="flex flex-col gap-2 border-b border-border/50 pb-5 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-bold text-2xl text-foreground tracking-tight">
              Tableau de Bord Général
            </h1>
            <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5 text-xs">
              Espace Apprenant
            </Badge>
          </div>
          <p className="mt-1 text-muted-foreground text-sm flex flex-wrap items-center gap-2">
            <span>Bienvenue, <strong className="text-foreground">{rootUser.name}</strong></span>
            <span className="text-muted-foreground/60">•</span>
            <span className="inline-flex items-center gap-1 font-medium text-foreground">
              <School className="size-3.5 text-primary" /> {activeEtab.name}
            </span>
            <span className="text-muted-foreground/60">•</span>
            <span className="inline-flex items-center gap-1 text-muted-foreground">
              <GraduationCap className="size-3.5 text-muted-foreground" /> {activeCohorte.name}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-border/50 bg-muted/30 px-3 py-1.5 font-mono text-muted-foreground text-xs">
          <Sparkles className="size-3.5 text-primary" />
          <span>Année Académique 2025 - 2026</span>
        </div>
      </div>

      {/* Les 4 Cartes d'Indication de Performance demandées */}
      <PerformanceKPIs />

      {/* Progression Globale de la cohorte */}
      <ProgressionCohorte />

      {/* Prochaines Échéances & Fil d'annonces de la cohorte */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ProchainesEcheances />
        <FilAnnonces />
      </div>
    </div>
  );
}
