"use client";

import { GraduationCap, ShieldCheck, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useCohorte } from "@/hooks/use-apprenant-data";

export function DetailsCohorte() {
  const { cohorteInfo, students } = useCohorte();

  return (
    <div className="space-y-6">
      {/* Cohort Overview Card */}
      <Card className="border-border/60 shadow-xs">
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              <CardTitle className="font-semibold text-lg tracking-tight">{cohorteInfo.name}</CardTitle>
            </div>
            <Badge className="border-0 bg-primary/15 px-2.5 py-1 font-mono text-primary text-xs">
              {cohorteInfo.activeStrate}
            </Badge>
          </div>
          <CardDescription className="text-muted-foreground text-xs">
            Spécialité : {cohorteInfo.specialty} — {cohorteInfo.etablissement}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3 rounded-lg border bg-muted/20 p-3.5 text-xs sm:grid-cols-3">
            <div>
              <span className="block font-mono text-[10px] text-muted-foreground uppercase">Période de Formation</span>
              <span className="font-semibold text-foreground">
                {cohorteInfo.startDate} → {cohorteInfo.endDate}
              </span>
            </div>
            <div>
              <span className="block font-mono text-[10px] text-muted-foreground uppercase">Taille de Promotion</span>
              <span className="font-bold font-mono text-foreground">
                {cohorteInfo.totalStudents} Apprenants inscrits
              </span>
            </div>
            <div>
              <span className="block font-mono text-[10px] text-muted-foreground uppercase">Statut Promotion</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                En cours de validation Strate 2
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Student Directory Table */}
      <Card className="border-border/60 shadow-xs">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <CardTitle className="font-semibold text-base">Annuaire des Apprenants de la Cohorte</CardTitle>
          </div>
          <CardDescription className="text-muted-foreground text-xs">
            Camarades de promotion et délégués référents.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40">
                  <TableHead className="min-w-[180px] text-xs">Nom & Prénom</TableHead>
                  <TableHead className="min-w-[220px] font-mono text-xs">Adresse Email Académique</TableHead>
                  <TableHead className="w-[140px] text-right text-xs">Rôle Promotion</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id} className="text-xs">
                    <TableCell className="font-semibold text-foreground">{student.name}</TableCell>
                    <TableCell className="font-mono text-muted-foreground">{student.email}</TableCell>
                    <TableCell className="text-right">
                      {student.status.includes("Déléguée") ? (
                        <Badge className="border-0 bg-emerald-500/15 text-[10px] text-emerald-600 dark:text-emerald-400">
                          <ShieldCheck className="mr-1 inline h-3 w-3" /> {student.status}
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-[10px]">
                          {student.status}
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
