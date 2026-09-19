"use client";

import Link from "next/link";

import { ArrowRight, CheckCircle2, Clock, FileText } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useParcours } from "@/hooks/use-apprenant-data";

export default function PageParcours() {
  const { modules } = useParcours();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "terminé":
        return (
          <Badge className="border-0 bg-emerald-500/15 px-2 py-0.5 text-[10px] text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="mr-1 inline h-3 w-3" /> Terminé
          </Badge>
        );
      case "en_cours":
        return (
          <Badge className="border-0 bg-primary/15 px-2 py-0.5 text-[10px] text-primary">
            <Clock className="mr-1 inline h-3 w-3" /> En Cours
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary" className="px-2 py-0.5 text-[10px]">
            À venir
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b pb-4">
        <h1 className="flex items-center gap-2 font-bold text-2xl text-foreground tracking-tight">
          Parcours "Learning by Doing"
        </h1>
        <p className="mt-0.5 text-muted-foreground text-sm">
          Modules de formation pratique organisés en strates de compétences avec projets réels.
        </p>
      </div>

      {/* Modules List Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {modules.map((mod) => (
          <Card
            key={mod.id}
            className="flex flex-col justify-between border-border/60 shadow-xs transition-colors hover:border-primary/40"
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium font-mono text-muted-foreground text-xs">
                  {mod.code} • {mod.strate}
                </span>
                {getStatusBadge(mod.status)}
              </div>
              <CardTitle className="mt-1 font-semibold text-base text-foreground">{mod.title}</CardTitle>
              <CardDescription className="mt-1 text-muted-foreground text-xs leading-relaxed">
                {mod.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              {/* Progress */}
              <div className="space-y-1">
                <div className="flex justify-between font-medium text-[11px] text-muted-foreground">
                  <span>Progression Module</span>
                  <span className="font-mono">{mod.progressPercentage}%</span>
                </div>
                <Progress value={mod.progressPercentage} className="h-2 bg-muted" />
              </div>

              {/* Footer Meta */}
              <div className="flex items-center justify-between border-border/40 border-t pt-2 text-muted-foreground text-xs">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-primary" /> {mod.durationHours}h
                  </span>
                  <span className="flex items-center gap-1">
                    <FileText className="h-3.5 w-3.5 text-primary" /> {mod.resourcesCount} Ressources
                  </span>
                </div>

                <Button size="sm" variant="ghost" asChild className="h-8 px-2 font-medium text-xs">
                  <Link href={`/dashboard/parcours/${mod.id}`}>
                    Accéder au module <ArrowRight className="ml-1 h-3.5 w-3.5" />
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
