"use client";

import { CheckCircle2, Clock, ShieldCheck, UserCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAssiduite } from "@/hooks/use-apprenant-data";

export function IndicateurPresence() {
  const { stats, history } = useAssiduite();

  return (
    <div className="space-y-6">
      {/* Attendance Stats Cards */}
      <div className="grid grid-cols-1 gap-3.5 md:grid-cols-4">
        {/* Main Rate Card */}
        <Card className="border-border/60 shadow-xs md:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="font-semibold text-sm">Taux d'Assiduité Global</CardTitle>
              <Badge className="border-0 bg-emerald-500/15 px-2 py-0.5 text-emerald-600 text-xs dark:text-emerald-400">
                <ShieldCheck className="mr-1 h-3.5 w-3.5" /> Conforme
              </Badge>
            </div>
            <CardDescription className="text-muted-foreground text-xs">
              Seuil d'assiduité requis pour validation de la cohorte : 85%.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-baseline justify-between">
              <span className="font-bold font-mono text-3xl text-foreground">{stats.attendanceRate}%</span>
              <span className="font-mono text-muted-foreground text-xs">
                {stats.presentCount} / {stats.totalSessions} Sessions validées
              </span>
            </div>
            <Progress value={stats.attendanceRate} className="h-2.5 bg-muted" />
          </CardContent>
        </Card>

        {/* Lates Breakdown */}
        <Card className="border-border/60 shadow-xs">
          <CardHeader className="pb-1">
            <CardTitle className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
              Retards Signalés
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-amber-500" />
              <span className="font-bold font-mono text-2xl text-foreground">{stats.lateCount}</span>
            </div>
            <p className="mt-1 text-[11px] text-muted-foreground">Cumul total : 25 minutes</p>
          </CardContent>
        </Card>

        {/* Justified Absences */}
        <Card className="border-border/60 shadow-xs">
          <CardHeader className="pb-1">
            <CardTitle className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
              Absences Justifiées
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-blue-500" />
              <span className="font-bold font-mono text-2xl text-foreground">{stats.justifiedAbsenceCount}</span>
            </div>
            <p className="mt-1 text-[11px] text-muted-foreground">0 absence non justifiée</p>
          </CardContent>
        </Card>
      </div>

      {/* Attendance History Table */}
      <Card className="border-border/60 shadow-xs">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <UserCheck className="h-5 w-5 text-primary" />
            <CardTitle className="font-semibold text-base">Historique des Présences en Cours</CardTitle>
          </div>
          <CardDescription className="text-muted-foreground text-xs">
            Émargement numérique horodaté pour chaque séance de formation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40">
                  <TableHead className="w-[120px] font-mono text-xs">Date</TableHead>
                  <TableHead className="min-w-[200px] text-xs">Séance / Cours</TableHead>
                  <TableHead className="w-[100px] text-xs">Durée</TableHead>
                  <TableHead className="w-[140px] text-right text-xs">Statut Émargement</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.map((s) => (
                  <TableRow key={s.id} className="text-xs">
                    <TableCell className="font-mono">{s.date}</TableCell>
                    <TableCell className="font-semibold text-foreground">{s.course}</TableCell>
                    <TableCell className="font-mono text-muted-foreground">{s.hours}h</TableCell>
                    <TableCell className="text-right">
                      {s.status.includes("Présent") && (
                        <Badge className="border-0 bg-emerald-500/15 text-[10px] text-emerald-600 dark:text-emerald-400">
                          Présent
                        </Badge>
                      )}
                      {s.status.includes("Retard") && (
                        <Badge className="border-0 bg-amber-500/15 text-[10px] text-amber-600 dark:text-amber-400">
                          {s.status}
                        </Badge>
                      )}
                      {s.status.includes("Justifiée") && (
                        <Badge variant="secondary" className="text-[10px]">
                          {s.status}
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
    </div>
  );
}
