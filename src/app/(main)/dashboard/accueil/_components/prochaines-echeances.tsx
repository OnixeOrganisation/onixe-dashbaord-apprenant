"use client";

import Link from "next/link";

import { AlertCircle, ArrowUpRight, CalendarClock, CheckCircle2, FileText, HelpCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAccueil } from "@/hooks/use-apprenant-data";

export function ProchainesEcheances() {
  const { prochainesEcheances } = useAccueil();

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "TP":
        return <FileText className="h-4 w-4 text-blue-500" />;
      case "LIVRABLE":
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      case "QUIZ":
        return <HelpCircle className="h-4 w-4 text-purple-500" />;
      default:
        return <CheckCircle2 className="h-4 w-4 text-primary" />;
    }
  };

  return (
    <Card className="flex h-full flex-col border-border/60 shadow-xs">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarClock className="h-5 w-5 text-primary" />
            <CardTitle className="font-semibold text-lg tracking-tight">Prochaines Échéances</CardTitle>
          </div>
          <Button variant="ghost" size="sm" asChild className="h-8 px-2 text-muted-foreground text-xs">
            <Link href="/dashboard/calendrier">
              Voir tout <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
        <CardDescription className="text-muted-foreground text-xs">
          Travaux pratiques, soumissions et quiz à venir dans votre cohorte.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 space-y-3">
        {prochainesEcheances.map((ech) => (
          <div
            key={ech.id}
            className="flex items-start gap-3 rounded-md border border-border/50 bg-card p-3 transition-colors hover:bg-muted/30"
          >
            <div className="mt-0.5 shrink-0 rounded-md bg-muted/60 p-2">{getTypeIcon(ech.type)}</div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium font-mono text-[11px] text-muted-foreground">
                  {ech.moduleCode} • {ech.type}
                </span>
                {ech.status === "urgent" ? (
                  <Badge variant="destructive" className="h-4 px-1.5 py-0 font-mono text-[10px]">
                    Urgent
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="h-4 px-1.5 py-0 font-mono text-[10px]">
                    J-{ech.daysLeft}
                  </Badge>
                )}
              </div>
              <h5 className="mt-0.5 line-clamp-1 font-semibold text-foreground text-xs">{ech.title}</h5>
              <p className="mt-1 text-[11px] text-muted-foreground">Échéance : {ech.dueDate}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
