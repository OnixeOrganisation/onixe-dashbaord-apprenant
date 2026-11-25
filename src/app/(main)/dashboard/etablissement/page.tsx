"use client";

import Link from "next/link";
import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  ExternalLink,
  FileCheck2,
  GraduationCap,
  Info,
  Mail,
  MapPin,
  Phone,
  School,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAcademicStore } from "@/stores/academic/academic-store";

export default function PageProfilEtablissement() {
  const getActiveEtablissement = useAcademicStore((s) => s.getActiveEtablissement);
  const getCohortesByEtablissement = useAcademicStore((s) => s.getCohortesByEtablissement);
  const activeEtablissementId = useAcademicStore((s) => s.activeEtablissementId);

  const activeEtab = getActiveEtablissement();
  const cohortesOfEtab = getCohortesByEtablissement(activeEtablissementId);

  const currentCohorte = cohortesOfEtab.find((c) => c.isCurrentApprenantCohorte) || cohortesOfEtab[0];
  const otherCohortes = cohortesOfEtab.filter((c) => !c.isCurrentApprenantCohorte);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2 border-b border-border/50 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Profil de l'Établissement
            </h1>
            <Badge className="bg-primary/10 text-primary border-0 text-xs">
              Centre de Formation Actif
            </Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Fiche officielle, agrément académique et offre de formation pour <strong>{activeEtab.name}</strong>.
          </p>
        </div>

        <Button variant="outline" size="sm" asChild className="text-xs gap-1.5">
          <Link href="/dashboard/profil">
            <Users className="size-3.5 text-primary" /> Mon Profil Apprenant →
          </Link>
        </Button>
      </div>

      {/* Main School Identity Card */}
      <Card className="border-border/60 shadow-xs overflow-hidden">
        <div className="h-28 w-full bg-gradient-to-r from-primary/25 via-primary/10 to-transparent relative">
          <div className="absolute -bottom-8 left-6 flex items-center gap-4">
            <div className="size-20 rounded-2xl border-4 border-background bg-card shadow-md overflow-hidden flex items-center justify-center">
              <img
                src={activeEtab.logo}
                alt={activeEtab.name}
                className="size-full object-cover"
              />
            </div>
          </div>
        </div>

        <CardHeader className="pt-12 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <CardTitle className="text-xl font-bold text-foreground">
                  {activeEtab.name}
                </CardTitle>
                <Badge variant="outline" className="font-mono text-xs">
                  Code : {activeEtab.code}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1.5">
                <MapPin className="size-3.5 text-primary" /> {activeEtab.address} ({activeEtab.city}, {activeEtab.country})
              </p>
            </div>

            <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-0 text-xs px-2.5 py-1">
              <ShieldCheck className="size-3.5 mr-1" /> Campus Agréé & Reconnu
            </Badge>
          </div>

          <CardDescription className="text-xs leading-relaxed text-muted-foreground pt-2">
            {activeEtab.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="border-t border-border/40 pt-4 grid grid-cols-1 gap-4 sm:grid-cols-3 text-xs">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-semibold text-muted-foreground">Direction du Campus</span>
            <p className="font-semibold text-foreground text-sm">{activeEtab.director}</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-semibold text-muted-foreground">Contact Administratif</span>
            <p className="text-foreground flex items-center gap-1.5">
              <Mail className="size-3.5 text-primary" /> {activeEtab.email}
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-semibold text-muted-foreground">Standard Téléphonique</span>
            <p className="text-foreground flex items-center gap-1.5">
              <Phone className="size-3.5 text-primary" /> {activeEtab.phone}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* ESPACE AGRÉMENT OFFICIEL DE L'ÉTABLISSEMENT */}
      <Card className="border-emerald-500/30 bg-emerald-500/5 shadow-xs">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                <FileCheck2 className="size-5" />
              </div>
              <div>
                <CardTitle className="text-base font-bold text-foreground">
                  Agrément Ministériel & Reconnaissance Officielle
                </CardTitle>
                <CardDescription className="text-xs">
                  {activeEtab.agrement.statut}
                </CardDescription>
              </div>
            </div>

            <Button
              size="sm"
              variant="outline"
              onClick={() => toast.success("Téléchargement de l'Arrêté officiel d'agrément en cours...")}
              className="text-xs gap-1.5 border-emerald-500/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/10"
            >
              <Download className="size-3.5" /> Voir l'Acte d'Agrément (PDF)
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-3 pt-0 text-xs">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 rounded-lg border border-emerald-500/20 bg-background/80 p-3">
            <div>
              <span className="text-[10px] uppercase font-semibold text-muted-foreground block">
                Numéro d'Arrêté Ministériel
              </span>
              <p className="font-mono font-bold text-foreground mt-0.5">
                {activeEtab.agrement.numeroArrete}
              </p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-semibold text-muted-foreground block">
                Autorité de Tutelle & Homologation
              </span>
              <p className="font-medium text-foreground mt-0.5">
                {activeEtab.agrement.autorite}
              </p>
            </div>
          </div>

          <div className="space-y-1 pt-1">
            <span className="text-[11px] font-semibold text-muted-foreground">Filières et Titres Spécifiquement Homologués :</span>
            <div className="flex flex-wrap gap-2 pt-1">
              {activeEtab.agrement.specialitesHomologuees.map((spec, i) => (
                <Badge key={i} variant="outline" className="border-emerald-500/40 text-foreground text-xs py-0.5">
                  <CheckCircle2 className="size-3 text-emerald-600 mr-1" /> {spec}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* VOTRE COHORTE ACTUELLE */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Votre Cohorte Actuelle au sein de l'Établissement
        </h3>
        <Card className="border-primary/40 bg-primary/5 shadow-xs p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <GraduationCap className="size-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-foreground text-sm">{currentCohorte.name}</h4>
                  <Badge className="bg-primary text-primary-foreground text-[10px]">Inscrit Actif</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{currentCohorte.filiere}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
              <span>{currentCohorte.cours.length} Cours programmés</span>
              <Button size="sm" asChild className="text-xs">
                <Link href="/dashboard/parcours">
                  Accéder au Parcours →
                </Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* AUTRES COHORTES POSSIBLES AVEC DATES PREVUES OU SANS DATE */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Autres Cohortes & Formations Possibles dans cet Établissement
          </h3>
          <span className="text-xs text-muted-foreground">Inscriptions ouvertes</span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {otherCohortes.map((coh) => (
            <Card key={coh.id} className="border-border/60 shadow-xs p-4 flex flex-col justify-between space-y-4 hover:border-primary/40 transition-colors">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <Badge variant="secondary" className="text-[10px]">
                    {coh.typeCohorte}
                  </Badge>
                  <Badge variant="outline" className="font-mono text-[10px]">
                    {coh.annee}
                  </Badge>
                </div>

                <h4 className="font-bold text-sm text-foreground mt-2 line-clamp-1">{coh.name}</h4>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{coh.filiere}</p>
              </div>

              {/* Date prévue de début OU sans date selon le type */}
              <div className="border-t border-border/40 pt-3 space-y-2">
                <div className="rounded-md border border-border/50 bg-muted/20 p-2 text-xs">
                  <span className="text-[10px] uppercase font-semibold text-muted-foreground block mb-0.5">
                    Modalité de Démarrage :
                  </span>
                  <div className="flex items-center gap-1.5 text-foreground font-medium text-xs">
                    <Clock className="size-3.5 text-primary shrink-0" />
                    <span>{coh.mentionDebut}</span>
                  </div>
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => toast.info(`Demande d'information pour : ${coh.name} transmise à l'administration.`)}
                  className="w-full text-xs"
                >
                  Demander un rattachement
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
