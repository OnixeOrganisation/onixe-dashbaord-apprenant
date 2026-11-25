"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  GraduationCap,
  Sparkles,
  User,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAcademicStore } from "@/stores/academic/academic-store";

export default function PageParcours() {
  const getActiveCohorte = useAcademicStore((s) => s.getActiveCohorte);
  const getActiveEtablissement = useAcademicStore((s) => s.getActiveEtablissement);

  const activeCohorte = getActiveCohorte();
  const activeEtab = getActiveEtablissement();

  const coursList = activeCohorte?.cours || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2 border-b border-border/50 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Parcours d'Apprentissage (Learning by Doing)
            </h1>
            <Badge variant="outline" className="border-primary/30 bg-primary/5 text-primary text-xs">
              {activeCohorte.name}
            </Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            L'ensemble des cours programmés pour votre cohorte au sein de <strong>{activeEtab.name}</strong>.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-border/50 bg-muted/30 px-3 py-1.5 text-xs text-muted-foreground">
          <Sparkles className="size-3.5 text-primary" />
          <span>Progression Cohorte : <strong className="text-foreground">{activeCohorte.progressionGlobale}%</strong></span>
        </div>
      </div>

      {/* Grid of Courses */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {coursList.map((cours) => (
          <Card
            key={cours.id}
            className="flex flex-col justify-between border-border/60 shadow-xs transition-all hover:border-primary/50 hover:shadow-md"
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between gap-2">
                <Badge variant="secondary" className="font-mono text-[10px]">
                  {cours.code}
                </Badge>
                <Badge
                  variant="outline"
                  className={
                    cours.category === "Fondamental"
                      ? "border-blue-500/30 text-blue-600 bg-blue-500/5"
                      : cours.category === "Technique"
                        ? "border-emerald-500/30 text-emerald-600 bg-emerald-500/5"
                        : "border-purple-500/30 text-purple-600 bg-purple-500/5"
                  }
                >
                  {cours.category}
                </Badge>
              </div>

              <CardTitle className="mt-2 text-base font-bold text-foreground line-clamp-1">
                {cours.title}
              </CardTitle>

              {/* Enseignant référent */}
              <div className="mt-2 flex items-center gap-2 rounded-lg border border-border/40 bg-muted/20 p-2">
                <Avatar className="size-7">
                  <AvatarImage src={cours.enseignant.avatar} />
                  <AvatarFallback className="text-[10px]">
                    {cours.enseignant.name.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold text-foreground">
                    {cours.enseignant.name}
                  </p>
                  <p className="truncate text-[10px] text-muted-foreground">
                    {cours.enseignant.role}
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4 pt-0">
              {/* Progress */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-muted-foreground font-medium">
                  <span>Progression du cours</span>
                  <span className="font-mono font-semibold text-foreground">{cours.progress}%</span>
                </div>
                <Progress value={cours.progress} className="h-1.5" />
                <span className="text-[11px] text-muted-foreground block">
                  {cours.completedModules} sur {cours.totalModules} modules achevés
                </span>
              </div>

              {/* Action Button */}
              <div className="border-t border-border/40 pt-3 flex items-center justify-between">
                <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                  <Clock className="size-3 text-primary" /> Séances visio & supports
                </span>
                <Button size="sm" asChild className="h-8 px-3 text-xs font-medium">
                  <Link href={`/dashboard/parcours/${cours.id}/cours`}>
                    Ouvrir le cours <ArrowRight className="ml-1 size-3.5" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
