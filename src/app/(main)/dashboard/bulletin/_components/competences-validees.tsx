"use client";

import { Award, CheckCircle, ShieldCheck, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useBulletin } from "@/hooks/use-apprenant-data";

export function CompetencesValidees() {
  const { competences } = useBulletin();

  return (
    <Card className="border-border/60 shadow-xs">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Award className="h-5 w-5 text-primary" />
          <CardTitle className="font-semibold text-lg tracking-tight">Compétences Pro Validées</CardTitle>
        </div>
        <CardDescription className="text-muted-foreground text-xs">
          Preuves tangibles de savoir-faire technique validées par l’équipe pédagogique (approche sans moyenne brute
          décontextualisée).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
          {competences.map((comp) => (
            <div
              key={comp.id}
              className="space-y-2 rounded-lg border border-border/50 bg-card p-3.5 transition-colors hover:bg-muted/20"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-muted-foreground uppercase tracking-wide">
                  {comp.domain}
                </span>
                {comp.level === "Maîtrisé" && (
                  <Badge className="border-0 bg-emerald-500/15 px-2 py-0.5 text-[10px] text-emerald-600 dark:text-emerald-400">
                    <ShieldCheck className="mr-1 inline h-3 w-3" /> Maîtrisé
                  </Badge>
                )}
                {comp.level === "Acquis" && (
                  <Badge className="border-0 bg-blue-500/15 px-2 py-0.5 text-[10px] text-blue-600 dark:text-blue-400">
                    <CheckCircle className="mr-1 inline h-3 w-3" /> Acquis
                  </Badge>
                )}
                {comp.level === "En cours" && (
                  <Badge variant="secondary" className="px-2 py-0.5 text-[10px]">
                    <Sparkles className="mr-1 inline h-3 w-3" /> En acquisition
                  </Badge>
                )}
              </div>
              <h4 className="font-semibold text-foreground text-xs">{comp.name}</h4>
              <p className="text-[11px] text-muted-foreground leading-relaxed">{comp.description}</p>
              <div className="flex items-center justify-between border-border/40 border-t pt-2 font-mono text-[10px] text-muted-foreground">
                <span>Validation : {comp.validatedAt}</span>
                <span>Certifié Onixe OS</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
