"use client";

import { CheckCircle, Clock, Layers, Lock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAccueil } from "@/hooks/use-apprenant-data";

export function ProgressionStrates() {
  const { learner, strates } = useAccueil();

  return (
    <Card className="border-border/60 shadow-xs">
      <CardHeader className="pb-3">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-primary" />
              <CardTitle className="font-semibold text-lg tracking-tight">Progression Globale par Strates</CardTitle>
            </div>
            <CardDescription className="mt-1 text-muted-foreground text-xs">
              Métaphore de la Pierre d’Onyx — Apprentissage structuré par couches de compétences.
            </CardDescription>
          </div>
          <Badge variant="outline" className="w-fit bg-muted/40 px-2.5 py-1 font-medium font-mono text-xs">
            {learner.totalProgress}% du Parcours Validé
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Main Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between font-medium text-muted-foreground text-xs">
            <span>Strate courante : Strate {learner.strateCourante} (Pratique Guidée)</span>
            <span>{learner.totalProgress} / 100</span>
          </div>
          <Progress value={learner.totalProgress} className="h-2.5 bg-muted" />
        </div>

        {/* Strates Cards Grid */}
        <div className="grid grid-cols-1 gap-3 pt-2 md:grid-cols-3">
          {strates.map((strate) => (
            <div
              key={strate.id}
              className={`rounded-lg border p-3.5 transition-colors ${
                strate.status === "validated"
                  ? "border-emerald-500/20 bg-emerald-500/5"
                  : strate.status === "in_progress"
                    ? "border-primary/30 bg-primary/5"
                    : "border-border/40 bg-muted/20 opacity-75"
              }`}
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="font-mono font-semibold text-muted-foreground text-xs uppercase tracking-wider">
                  {strate.name}
                </span>
                {strate.status === "validated" && (
                  <Badge className="border-0 bg-emerald-500/15 px-2 text-[10px] text-emerald-600 hover:bg-emerald-500/20 dark:text-emerald-400">
                    <CheckCircle className="mr-1 inline h-3 w-3" /> Validée
                  </Badge>
                )}
                {strate.status === "in_progress" && (
                  <Badge className="border-0 bg-primary/15 px-2 text-[10px] text-primary hover:bg-primary/20">
                    <Clock className="mr-1 inline h-3 w-3" /> En Cours
                  </Badge>
                )}
                {strate.status === "locked" && (
                  <Badge variant="secondary" className="px-2 text-[10px]">
                    <Lock className="mr-1 inline h-3 w-3" /> Verrouillée
                  </Badge>
                )}
              </div>
              <h4 className="line-clamp-1 font-medium text-foreground text-sm">{strate.title}</h4>
              <p className="mt-1 line-clamp-2 text-muted-foreground text-xs leading-relaxed">{strate.description}</p>
              <div className="mt-3 flex items-center justify-between border-border/40 border-t pt-2 text-xs">
                <span className="text-muted-foreground">
                  {strate.completedModules} / {strate.totalModules} Modules
                </span>
                <span className="font-medium font-mono">{strate.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
