"use client";

import { AlertTriangle, CheckCircle2, Clock, FileSpreadsheet } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useBulletin } from "@/hooks/use-apprenant-data";

export function TableauNotes() {
  const { modulesNotes } = useBulletin();

  return (
    <Card className="border-border/60 shadow-xs">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <FileSpreadsheet className="h-5 w-5 text-primary" />
          <CardTitle className="font-semibold text-lg tracking-tight">Évaluations & Feedback Qualitatif</CardTitle>
        </div>
        <CardDescription className="text-muted-foreground text-xs">
          Historique détaillé des évaluations par module et remarques pédagogiques des formateurs.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="w-[120px] font-mono text-xs">Module</TableHead>
                <TableHead className="min-w-[200px] text-xs">Intitulé du Module</TableHead>
                <TableHead className="w-[100px] text-xs">Strate</TableHead>
                <TableHead className="w-[110px] text-center font-mono text-xs">Note / 20</TableHead>
                <TableHead className="min-w-[280px] text-xs">Feedback Qualitatif</TableHead>
                <TableHead className="w-[120px] text-xs">Formateur</TableHead>
                <TableHead className="w-[100px] text-right text-xs">Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {modulesNotes.map((m) => (
                <TableRow key={m.id} className="text-xs">
                  <TableCell className="font-medium font-mono">{m.code}</TableCell>
                  <TableCell className="font-semibold text-foreground">{m.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-mono text-[10px]">
                      {m.strate}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center font-bold font-mono text-sm">
                    {m.score > 0 ? (
                      <span>
                        {m.score} <span className="font-normal text-[10px] text-muted-foreground">/ {m.maxScore}</span>
                      </span>
                    ) : (
                      <span className="font-normal text-muted-foreground text-xs">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-[11px] text-muted-foreground leading-relaxed">
                    {m.qualitativeFeedback}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-[11px] text-muted-foreground">{m.formateur}</TableCell>
                  <TableCell className="text-right">
                    {m.status === "validé" && (
                      <Badge className="border-0 bg-emerald-500/15 px-2 py-0.5 text-[10px] text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="mr-1 inline h-3 w-3" /> Validé
                      </Badge>
                    )}
                    {m.status === "en_cours" && (
                      <Badge className="border-0 bg-blue-500/15 px-2 py-0.5 text-[10px] text-blue-600 dark:text-blue-400">
                        <Clock className="mr-1 inline h-3 w-3" /> En cours
                      </Badge>
                    )}
                    {m.status === "à_revoir" && (
                      <Badge variant="destructive" className="px-2 py-0.5 text-[10px]">
                        <AlertTriangle className="mr-1 inline h-3 w-3" /> À revoir
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
