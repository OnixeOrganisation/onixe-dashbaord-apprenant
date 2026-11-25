"use client";

import Link from "next/link";
import { ArrowRight, Calendar, GraduationCap, School, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAcademicStore } from "@/stores/academic/academic-store";

import { DetailsCohorte } from "./_components/details-cohorte";

export default function PageCohorte() {
  const getActiveCohorte = useAcademicStore((s) => s.getActiveCohorte);
  const getActiveEtablissement = useAcademicStore((s) => s.getActiveEtablissement);

  const activeCohorte = getActiveCohorte();
  const activeEtab = getActiveEtablissement();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2 border-b border-border/50 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Ma Cohorte
            </h1>
            <Badge variant="outline" className="text-primary border-primary/30 text-xs">
              {activeCohorte.name}
            </Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Espace d'échange et d'annuaire des membres de la promotion au sein de <strong>{activeEtab.name}</strong>.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground border rounded-lg px-3 py-1.5 bg-muted/20">
          <Calendar className="size-3.5 text-primary" />
          <span>Année : {activeCohorte.annee}</span>
        </div>
      </div>

      {/* Two Navigation Cards: Enseignants & Apprenants */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Card className="border-border/60 shadow-xs hover:border-primary/50 transition-all">
          <CardHeader className="pb-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary mb-2">
              <GraduationCap className="size-5" />
            </div>
            <CardTitle className="text-lg font-bold text-foreground">
              Équipe Enseignante & Responsables
            </CardTitle>
            <CardDescription className="text-xs">
              Consultez la liste des professeurs intervenants, leurs matières et leurs responsabilités pédagogiques.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <Button size="sm" asChild className="text-xs font-medium gap-1.5">
              <Link href="/dashboard/cohorte/enseignants">
                Voir tous les Enseignants <ArrowRight className="size-3.5" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-xs hover:border-primary/50 transition-all">
          <CardHeader className="pb-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 mb-2">
              <Users className="size-5" />
            </div>
            <CardTitle className="text-lg font-bold text-foreground">
              Apprenants & Camarades de Promotion
            </CardTitle>
            <CardDescription className="text-xs">
              Accédez au trombinoscope de la promotion avec nom, prénom, email et numéro de téléphone de contact.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <Button size="sm" variant="outline" asChild className="text-xs font-medium gap-1.5">
              <Link href="/dashboard/cohorte/apprenants">
                Consulter l'Annuaire Apprenants <ArrowRight className="size-3.5" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Details Cohorte */}
      <DetailsCohorte />
    </div>
  );
}
