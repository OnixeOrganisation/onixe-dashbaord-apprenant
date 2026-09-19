"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { ArrowLeft, BookOpen, CheckSquare, Download, FileText, User } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useModuleDetail } from "@/hooks/use-apprenant-data";

import { ZoneRenduTravaux } from "./_components/zone-rendu-travaux";

export default function PageModuleDetail() {
  const params = useParams();
  const moduleId = (params.moduleId as string) || "mod-201";
  const { moduleDetail } = useModuleDetail(moduleId);

  return (
    <div className="space-y-6">
      {/* Back Link & Header */}
      <div className="space-y-2 border-b pb-4">
        <Button variant="ghost" size="sm" asChild className="-ml-2 h-8 px-2 text-muted-foreground text-xs">
          <Link href="/dashboard/parcours">
            <ArrowLeft className="mr-1 h-3.5 w-3.5" /> Retour au parcours
          </Link>
        </Button>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="font-mono text-xs">
                {moduleDetail.code}
              </Badge>
              <span className="font-mono text-muted-foreground text-xs">{moduleDetail.strate}</span>
            </div>
            <h1 className="mt-1 font-bold text-2xl text-foreground tracking-tight">{moduleDetail.title}</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex w-fit items-center gap-2 rounded-md border bg-muted/40 px-3 py-1.5 text-muted-foreground text-xs">
              <User className="h-3.5 w-3.5 text-primary" /> {moduleDetail.instructor}
            </div>
            <Button size="sm" asChild className="font-medium text-xs">
              <Link href={`/dashboard/parcours/${moduleId}/cours`}>
                <BookOpen className="mr-1.5 h-3.5 w-3.5" /> Suivre le cours
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Main Content: Instructions & Rubric */}
        <div className="space-y-6 lg:col-span-7">
          {/* Module Description & Consignes */}
          <Card className="border-border/60 shadow-xs">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <CardTitle className="font-semibold text-base">Consignes & Objectifs du TP</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground text-xs leading-relaxed">{moduleDetail.description}</p>
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground text-xs uppercase tracking-wide">
                  Directives d'exécution :
                </h4>
                <ul className="space-y-1.5">
                  {moduleDetail.consignes.map((c, i) => (
                    <li key={i} className="flex items-start gap-2 text-muted-foreground text-xs">
                      <span className="shrink-0 font-bold font-mono text-primary text-xs">{i + 1}.</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Grille d'évaluation */}
          <Card className="border-border/60 shadow-xs">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <CheckSquare className="h-5 w-5 text-primary" />
                <CardTitle className="font-semibold text-base">Critères d'Évaluation & Barème</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {moduleDetail.criteria.map((crit, idx) => (
                <div
                  key={idx}
                  className="flex justify-between gap-3 rounded-md border border-border/50 bg-card p-3 text-xs"
                >
                  <div>
                    <h5 className="font-semibold text-foreground">{crit.name}</h5>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">{crit.desc}</p>
                  </div>
                  <Badge variant="secondary" className="h-fit shrink-0 font-mono text-xs">
                    /{crit.points} pts
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar: Work Submission Dropzone & Downloadable Resources */}
        <div className="space-y-6 lg:col-span-5">
          {/* Work Submission Dropzone */}
          <ZoneRenduTravaux moduleId={moduleId} />

          {/* Downloadable Resources */}
          <Card className="border-border/60 shadow-xs">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <CardTitle className="font-semibold text-base">Ressources du Module</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-2.5">
              {moduleDetail.resources.map((res, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-md border border-border/50 bg-card p-2.5 text-xs"
                >
                  <div className="min-w-0 pr-2">
                    <p className="truncate font-medium text-foreground">{res.name}</p>
                    <p className="font-mono text-[10px] text-muted-foreground">
                      {res.type} • {res.size}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-primary">
                    <Download className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
