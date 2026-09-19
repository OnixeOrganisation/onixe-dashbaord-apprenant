"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { ArrowLeft } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEvaluation } from "@/hooks/use-apprenant-data";

import { AnnotationsIaFormateur } from "./_components/annotations-ia-formateur";
import { HistoriqueVersions } from "./_components/historique-versions";

export default function PageEvaluationDetail() {
  const params = useParams();
  const evalId = (params.evalId as string) || "eval-201";
  const { evaluation } = useEvaluation(evalId);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="space-y-2 border-b pb-4">
        <Button variant="ghost" size="sm" asChild className="-ml-2 h-8 px-2 text-muted-foreground text-xs">
          <Link href="/dashboard/bulletin">
            <ArrowLeft className="mr-1 h-3.5 w-3.5" /> Retour au bulletin
          </Link>
        </Button>
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium font-mono text-muted-foreground text-xs">{evaluation.moduleTitle}</span>
              <Badge variant="outline" className="font-mono text-[10px]">
                {evaluation.gradeStatus}
              </Badge>
            </div>
            <h1 className="mt-1 font-bold text-2xl text-foreground tracking-tight">{evaluation.projectTitle}</h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-right">
              <span className="block font-mono text-[10px] text-muted-foreground uppercase">Note Finale</span>
              <span className="font-bold font-mono text-emerald-600 text-xl dark:text-emerald-400">
                {evaluation.grade}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Annotations & History */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-8">
          <AnnotationsIaFormateur evalId={evalId} />
        </div>
        <div className="space-y-6 lg:col-span-4">
          <HistoriqueVersions evalId={evalId} />
        </div>
      </div>
    </div>
  );
}
