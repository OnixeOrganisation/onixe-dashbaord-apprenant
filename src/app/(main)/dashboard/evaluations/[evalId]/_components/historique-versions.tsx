"use client";

import { Download, FileArchive, History, RotateCcw } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEvaluation } from "@/hooks/use-apprenant-data";

export function HistoriqueVersions({ evalId }: { evalId: string }) {
  const { evaluation } = useEvaluation(evalId);

  const triggerResubmission = () => {
    toast.info("Demande de re-soumission autorisée", {
      description: "Vous pouvez uploader une nouvelle version révisée depuis la page du module.",
    });
  };

  return (
    <Card className="border-border/60 shadow-xs">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="h-5 w-5 text-primary" />
            <CardTitle className="font-semibold text-base">Historique des Versions & Révisions</CardTitle>
          </div>
          {evaluation.revisionAllowed && (
            <Badge
              variant="outline"
              className="border-emerald-500/30 font-mono text-emerald-600 text-xs dark:text-emerald-400"
            >
              Re-soumission Autorisée
            </Badge>
          )}
        </div>
        <CardDescription className="text-muted-foreground text-xs">
          Historique complet des itérations et fichiers transmis à l'équipe pédagogique.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {evaluation.revisionHistory.map((rev, index) => (
          <div
            key={index}
            className="flex flex-col justify-between gap-3 rounded-md border border-border/50 bg-card p-3 text-xs sm:flex-row sm:items-center"
          >
            <div className="flex items-start gap-2.5">
              <FileArchive className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">{rev.version}</span>
                  <span className="font-mono text-[10px] text-muted-foreground">({rev.date})</span>
                </div>
                <p className="font-mono text-[11px] text-muted-foreground">{rev.fileName}</p>
                <p className="mt-1 text-[11px] text-muted-foreground italic">{rev.comment}</p>
              </div>
            </div>

            <div className="flex shrink-0 items-center justify-between gap-3 sm:justify-end">
              <Badge variant="secondary" className="font-mono text-xs">
                Note : {rev.grade}
              </Badge>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}

        {evaluation.revisionAllowed && (
          <div className="flex justify-end pt-2">
            <Button size="sm" variant="outline" onClick={triggerResubmission} className="font-medium text-xs">
              <RotateCcw className="mr-1.5 h-3.5 w-3.5" /> Soumettre une nouvelle version (v3)
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
