"use client";

import Link from "next/link";
import {
  AlertCircle,
  ArrowUpRight,
  BookOpen,
  Briefcase,
  CheckCircle2,
  FileText,
  ListTodo,
  TrendingUp,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAcademicStore } from "@/stores/academic/academic-store";

export function PerformanceKPIs() {
  const getActiveCohorte = useAcademicStore((s) => s.getActiveCohorte);
  const activeCohorte = getActiveCohorte();

  const totalCours = activeCohorte?.cours?.length || 5;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* 1. Tâches à faire */}
      <Card className="border-border/60 shadow-xs hover:border-primary/40 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Tâches à faire
          </CardTitle>
          <div className="flex size-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <ListTodo className="size-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline justify-between">
            <span className="font-bold text-2xl text-foreground font-mono">4</span>
            <Badge variant="outline" className="border-blue-500/30 bg-blue-500/5 text-blue-600 dark:text-blue-400 text-[10px]">
              2 prioritaires
            </Badge>
          </div>
          <p className="mt-1 text-xs text-muted-foreground line-clamp-1">
            Quiz hebdo SQL, signature charte, feedback visio
          </p>
          <div className="mt-3 border-t border-border/40 pt-2 flex items-center justify-between">
            <span className="text-[11px] text-muted-foreground">À finaliser cette semaine</span>
            <span className="text-[11px] font-medium text-primary flex items-center">
              Voir <ArrowUpRight className="size-3 ml-0.5" />
            </span>
          </div>
        </CardContent>
      </Card>

      {/* 2. Devoirs en attente */}
      <Card className="border-border/60 shadow-xs hover:border-amber-500/40 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Devoirs en attente
          </CardTitle>
          <div className="flex size-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <FileText className="size-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline justify-between">
            <span className="font-bold text-2xl text-foreground font-mono">2</span>
            <Badge className="border-0 bg-rose-500/15 text-rose-600 dark:text-rose-400 text-[10px]">
              1 urgent
            </Badge>
          </div>
          <p className="mt-1 text-xs text-muted-foreground line-clamp-1">
            TP2 API REST PostgreSQL • Rendu demain 23h59
          </p>
          <div className="mt-3 border-t border-border/40 pt-2 flex items-center justify-between">
            <span className="text-[11px] text-muted-foreground">Dépôt dans l'espace cours</span>
            <Link href="/dashboard/parcours/web" className="text-[11px] font-medium text-amber-600 dark:text-amber-400 flex items-center hover:underline">
              Déposer <ArrowUpRight className="size-3 ml-0.5" />
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* 3. Cours lancés */}
      <Card className="border-border/60 shadow-xs hover:border-emerald-500/40 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Cours lancés
          </CardTitle>
          <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <BookOpen className="size-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline justify-between">
            <span className="font-bold text-2xl text-foreground font-mono">{totalCours}</span>
            <Badge variant="outline" className="border-emerald-500/30 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 text-[10px]">
              {activeCohorte?.progressionGlobale || 68}% achevé
            </Badge>
          </div>
          <div className="mt-2 space-y-1">
            <Progress value={activeCohorte?.progressionGlobale || 68} className="h-1.5" />
          </div>
          <div className="mt-3 border-t border-border/40 pt-2 flex items-center justify-between">
            <span className="text-[11px] text-muted-foreground">Parcours de la cohorte</span>
            <Link href="/dashboard/parcours" className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center hover:underline">
              Continuer <ArrowUpRight className="size-3 ml-0.5" />
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* 4. Projets en cours */}
      <Card className="border-border/60 shadow-xs hover:border-purple-500/40 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Projets en cours
          </CardTitle>
          <div className="flex size-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400">
            <Briefcase className="size-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline justify-between">
            <span className="font-bold text-2xl text-foreground font-mono">1</span>
            <Badge variant="outline" className="border-purple-500/30 bg-purple-500/5 text-purple-600 dark:text-purple-400 text-[10px]">
              Fil Rouge
            </Badge>
          </div>
          <p className="mt-1 text-xs text-muted-foreground line-clamp-1">
            Plateforme ERP Académique (Jalon 2 / 4)
          </p>
          <div className="mt-3 border-t border-border/40 pt-2 flex items-center justify-between">
            <span className="text-[11px] text-muted-foreground">Soutenance : 18 Décembre</span>
            <Link href="/dashboard/projets" className="text-[11px] font-medium text-purple-600 dark:text-purple-400 flex items-center hover:underline">
              Gérer <ArrowUpRight className="size-3 ml-0.5" />
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
