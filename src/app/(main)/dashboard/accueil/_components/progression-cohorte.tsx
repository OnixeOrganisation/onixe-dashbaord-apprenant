"use client";

import { CheckCircle2, Clock, GraduationCap, Lock, TrendingUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAcademicStore } from "@/stores/academic/academic-store";

export function ProgressionCohorte() {
  const getActiveCohorte = useAcademicStore((s) => s.getActiveCohorte);
  const activeCohorte = getActiveCohorte();

  const blocs = [
    {
      id: 1,
      title: "Bloc 1 : Fondations & Socle Algorithmique",
      description: "Structures de données, logique de programmation et principes Git/Linux.",
      progress: 100,
      completedModules: 4,
      totalModules: 4,
      status: "validated",
    },
    {
      id: 2,
      title: "Bloc 2 : Pratique Guidée & TP Pro",
      description: "Architecture d'applications web, bases de données relationnelles et API REST.",
      progress: 65,
      completedModules: 3,
      totalModules: 5,
      status: "in_progress",
    },
    {
      id: 3,
      title: "Bloc 3 : Autonomie & Rendu Final",
      description: "Projet de synthèse en condition d'entreprise, tests et mise en production.",
      progress: 0,
      completedModules: 0,
      totalModules: 4,
      status: "locked",
    },
  ];

  return (
    <Card className="border-border/60 shadow-xs">
      <CardHeader className="pb-3">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="size-5 text-primary" />
              <CardTitle className="font-semibold text-lg tracking-tight">
                Progression par rapport à la Cohorte
              </CardTitle>
            </div>
            <CardDescription className="mt-1 text-muted-foreground text-xs">
              Suivi de l'acquisition des compétences de la promotion {activeCohorte.name}.
            </CardDescription>
          </div>
          <Badge variant="outline" className="w-fit border-primary/30 bg-primary/5 text-primary px-2.5 py-1 font-mono text-xs">
            {activeCohorte.progressionGlobale}% du Parcours Validé
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Main Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between font-medium text-muted-foreground text-xs">
            <span className="flex items-center gap-1.5">
              <GraduationCap className="size-3.5 text-primary" />
              <span>Étape en cours : Bloc 2 (Pratique Guidée & TP Pro)</span>
            </span>
            <span className="font-mono text-foreground font-semibold">{activeCohorte.progressionGlobale} / 100</span>
          </div>
          <Progress value={activeCohorte.progressionGlobale} className="h-2 bg-muted" />
        </div>

        {/* Blocs Grid */}
        <div className="grid grid-cols-1 gap-3 pt-2 md:grid-cols-3">
          {blocs.map((bloc) => (
            <div
              key={bloc.id}
              className={`rounded-lg border p-3.5 transition-colors ${
                bloc.status === "validated"
                  ? "border-emerald-500/20 bg-emerald-500/5"
                  : bloc.status === "in_progress"
                    ? "border-primary/30 bg-primary/5"
                    : "border-border/40 bg-muted/20 opacity-75"
              }`}
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="font-mono font-semibold text-muted-foreground text-xs uppercase tracking-wider">
                  Phase {bloc.id}
                </span>
                {bloc.status === "validated" && (
                  <Badge className="border-0 bg-emerald-500/15 px-2 text-[10px] text-emerald-600 dark:text-emerald-400 gap-1">
                    <CheckCircle2 className="size-3" /> Validé
                  </Badge>
                )}
                {bloc.status === "in_progress" && (
                  <Badge className="border-0 bg-primary/15 px-2 text-[10px] text-primary gap-1">
                    <Clock className="size-3" /> En Cours
                  </Badge>
                )}
                {bloc.status === "locked" && (
                  <Badge variant="secondary" className="px-2 text-[10px] gap-1">
                    <Lock className="size-3" /> À Venir
                  </Badge>
                )}
              </div>
              <h4 className="line-clamp-1 font-medium text-foreground text-sm">{bloc.title}</h4>
              <p className="mt-1 line-clamp-2 text-muted-foreground text-xs leading-relaxed">{bloc.description}</p>
              <div className="mt-3 flex items-center justify-between border-border/40 border-t pt-2 text-xs">
                <span className="text-muted-foreground">
                  {bloc.completedModules} / {bloc.totalModules} Modules validés
                </span>
                <span className="font-medium font-mono text-foreground">{bloc.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
