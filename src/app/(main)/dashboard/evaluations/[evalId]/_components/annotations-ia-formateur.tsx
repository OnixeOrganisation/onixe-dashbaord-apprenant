"use client";

import { AlertTriangle, CheckCircle2, MessageSquare, Sparkles } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEvaluation } from "@/hooks/use-apprenant-data";

export function AnnotationsIaFormateur({ evalId }: { evalId: string }) {
  const { evaluation } = useEvaluation(evalId);

  return (
    <div className="space-y-6">
      {/* Formateur Comments Card */}
      <Card className="border-border/60 shadow-xs">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            <CardTitle className="font-semibold text-base">Commentaires du Formateur</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3 rounded-lg border border-border/50 bg-muted/20 p-3.5">
            <Avatar className="h-9 w-9">
              <AvatarImage src={evaluation.instructor.avatar} alt={evaluation.instructor.name} />
              <AvatarFallback>{evaluation.instructor.name[0]}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground text-xs">{evaluation.instructor.name}</span>
                <span className="text-[10px] text-muted-foreground">{evaluation.instructor.role}</span>
              </div>
              <p className="font-serif text-foreground text-xs italic leading-relaxed">
                "{evaluation.instructorComments}"
              </p>
            </div>
          </div>

          {/* Rubric Points breakdown */}
          <div className="space-y-2 pt-2">
            <h4 className="font-semibold text-foreground text-xs uppercase tracking-wide">
              Détail de la grille d'évaluation :
            </h4>
            <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
              {evaluation.rubricDetails.map((r, i) => (
                <div key={i} className="space-y-1 rounded-md border border-border/40 bg-card p-3 text-xs">
                  <div className="flex justify-between font-medium">
                    <span>{r.criterion}</span>
                    <span className="font-bold font-mono text-primary">
                      {r.score} / {r.maxScore}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">{r.feedback}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Pre-Analysis Annotations */}
      <Card className="border-primary/30 bg-primary/5 shadow-xs">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <CardTitle className="font-semibold text-base text-foreground">
                Analyse & Annotations Automatisées (Onixe AI Guard)
              </CardTitle>
            </div>
            <Badge variant="outline" className="border-primary/30 font-mono text-[10px] text-primary">
              Pre-correction IA
            </Badge>
          </div>
          <CardDescription className="text-muted-foreground text-xs">
            Analyse statique du code et détection des bonnes pratiques de développement.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-foreground text-xs leading-relaxed">{evaluation.aiAnalysis.summary}</p>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Strengths */}
            <div className="space-y-2">
              <h5 className="flex items-center gap-1.5 font-semibold text-emerald-600 text-xs dark:text-emerald-400">
                <CheckCircle2 className="h-3.5 w-3.5" /> Points Forts Identifiés
              </h5>
              <ul className="space-y-1">
                {evaluation.aiAnalysis.strengths.map((s, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 text-muted-foreground text-xs">
                    <span className="text-emerald-500">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Areas to Improve */}
            <div className="space-y-2">
              <h5 className="flex items-center gap-1.5 font-semibold text-amber-600 text-xs dark:text-amber-400">
                <AlertTriangle className="h-3.5 w-3.5" /> Axes d'Amélioration Recommandés
              </h5>
              <ul className="space-y-1">
                {evaluation.aiAnalysis.areasToImprove.map((a, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 text-muted-foreground text-xs">
                    <span className="text-amber-500">•</span>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
