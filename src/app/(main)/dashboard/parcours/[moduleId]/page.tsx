"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  FileText,
  Play,
  UploadCloud,
  User,
  Video,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAcademicStore } from "@/stores/academic/academic-store";

interface Lecon {
  id: string;
  title: string;
  duree: string;
  status: "complete" | "in_progress" | "upcoming";
  hasVisioReplay?: boolean;
}

interface ModuleCours {
  id: string;
  numero: number;
  title: string;
  description: string;
  progress: number;
  lecons: Lecon[];
}

export default function PageModuleDetail() {
  const params = useParams();
  const moduleId = (params.moduleId as string) || "algo";

  const getActiveCohorte = useAcademicStore((s) => s.getActiveCohorte);
  const getActiveEtablissement = useAcademicStore((s) => s.getActiveEtablissement);

  const activeCohorte = getActiveCohorte();
  const activeEtab = getActiveEtablissement();

  const currentCourse =
    activeCohorte?.cours?.find((c) => c.id === moduleId) ||
    activeCohorte?.cours?.[0] || {
      id: moduleId,
      title: "Algorithmique & Structures de Données",
      code: "CS-101",
      category: "Fondamental",
      progress: 80,
      totalModules: 5,
      completedModules: 4,
      enseignant: {
        name: "Dr. Mamadou Diallo",
        role: "Enseignant Algorithmique",
        email: "m.diallo@onixe.academy",
        avatar: "",
      },
    };

  // Modules et leurs leçons détaillées
  const modulesCours: ModuleCours[] = [
    {
      id: "mod-1",
      numero: 1,
      title: "Fondations Théoriques & Complexité Algorithmique",
      description: "Analyse asymptotique, notation Grand O et optimisation spatio-temporelle.",
      progress: 100,
      lecons: [
        { id: "les-1-1", title: "Introduction aux structures de données de base", duree: "20 min", status: "complete" },
        { id: "les-1-2", title: "Complexité temporelle et pire des cas", duree: "35 min", status: "complete", hasVisioReplay: true },
        { id: "les-1-3", title: "Exercices pratiques d'analyse d'algorithmes", duree: "40 min", status: "complete" },
      ],
    },
    {
      id: "mod-2",
      numero: 2,
      title: "Structures Linéaires : Piles, Files et Listes Chaînées",
      description: "Implémentation bas niveau et cas d'usage industriels.",
      progress: 75,
      lecons: [
        { id: "les-2-1", title: "Listes simplement et doublement chaînées", duree: "25 min", status: "complete" },
        { id: "les-2-2", title: "Piles (LIFO) et Files (FIFO) en mémoire", duree: "30 min", status: "in_progress", hasVisioReplay: true },
        { id: "les-2-3", title: "Atelier guidé de manipulation de pointeurs", duree: "45 min", status: "upcoming" },
      ],
    },
    {
      id: "mod-3",
      numero: 3,
      title: "Arbres Binaires, Arbres AVL et Graphes",
      description: "Parcours en profondeur, largeur et équilibrage automatique.",
      progress: 0,
      lecons: [
        { id: "les-3-1", title: "Arbres binaires de recherche (BST)", duree: "35 min", status: "upcoming" },
        { id: "les-3-2", title: "Parcours DFS et BFS appliqués aux réseaux", duree: "50 min", status: "upcoming", hasVisioReplay: true },
        { id: "les-3-3", title: "Introduction aux algorithmes de Dijkstra et A*", duree: "45 min", status: "upcoming" },
      ],
    },
  ];

  // Devoirs en attente liés spécifiquement à ce cours
  const devoirsEnAttente = [
    {
      id: "dev-1",
      titre: "TP2 : Implémentation d'une File Prioritaire & Benchmark",
      dateLimite: "Demain à 23h59",
      urgent: true,
      points: 20,
    },
    {
      id: "dev-2",
      titre: "Exercice : Analyse de complexité de 5 algorithmes de tri",
      dateLimite: "Dans 5 jours",
      urgent: false,
      points: 10,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Back Link & Header */}
      <div className="space-y-2 border-b border-border/50 pb-5">
        <Button variant="ghost" size="sm" asChild className="-ml-2 h-7 px-2 text-xs text-muted-foreground hover:text-foreground">
          <Link href="/dashboard/parcours">
            <ArrowLeft className="mr-1 size-3.5" /> Retour à la liste des cours
          </Link>
        </Button>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="font-mono text-xs">
                {currentCourse.code}
              </Badge>
              <Badge className="bg-primary/10 text-primary border-0 text-xs">
                {currentCourse.category}
              </Badge>
            </div>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {currentCourse.title}
            </h1>
            <p className="mt-1 text-xs text-muted-foreground flex items-center gap-2">
              <span>{activeEtab.name}</span>
              <span>•</span>
              <span>Cohorte : {activeCohorte.name}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button size="default" asChild className="font-medium text-xs gap-1.5 shadow-sm">
              <Link href={`/dashboard/parcours/${currentCourse.id}/cours`}>
                <Play className="size-4 fill-primary-foreground" /> Continuer le cours
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Colonne Principale : Modules ET Leçons Détaillées */}
        <div className="space-y-6 lg:col-span-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-foreground">
              Programme du Cours : Modules & Leçons
            </h2>
            <span className="text-xs text-muted-foreground font-mono">
              {currentCourse.completedModules} / {currentCourse.totalModules} modules validés ({currentCourse.progress}%)
            </span>
          </div>

          {/* Liste des Modules avec leurs Leçons */}
          <div className="space-y-4">
            {modulesCours.map((module) => (
              <Card key={module.id} className="border-border/60 shadow-xs overflow-hidden">
                <CardHeader className="bg-muted/20 border-b border-border/40 pb-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-primary">
                      Module {module.numero}
                    </span>
                    <Badge variant="outline" className="text-[10px]">
                      {module.progress}% validé
                    </Badge>
                  </div>
                  <CardTitle className="text-base font-bold text-foreground mt-1">
                    {module.title}
                  </CardTitle>
                  <CardDescription className="text-xs">
                    {module.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-0">
                  <div className="divide-y divide-border/40">
                    {module.lecons.map((lecon, idx) => (
                      <div
                        key={lecon.id}
                        className={`flex items-center justify-between p-3.5 text-xs transition-colors hover:bg-muted/30 ${
                          lecon.status === "in_progress" ? "bg-primary/5" : ""
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {lecon.status === "complete" ? (
                            <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                          ) : lecon.status === "in_progress" ? (
                            <div className="size-4 rounded-full border-2 border-primary border-t-transparent animate-spin shrink-0" />
                          ) : (
                            <Clock className="size-4 text-muted-foreground shrink-0" />
                          )}

                          <div className="min-w-0">
                            <p className={`truncate text-xs ${lecon.status === "in_progress" ? "font-bold text-primary" : "font-medium text-foreground"}`}>
                              {idx + 1}. {lecon.title}
                            </p>
                            <div className="flex items-center gap-2 text-[10px] text-muted-foreground mt-0.5">
                              <span>Durée : {lecon.duree}</span>
                              {lecon.hasVisioReplay && (
                                <>
                                  <span>•</span>
                                  <span className="flex items-center gap-1 text-primary">
                                    <Video className="size-3" /> Replay Visio disponible
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Bouton d'action Continuer / Accéder */}
                        <div className="shrink-0 ml-3">
                          {lecon.status === "in_progress" ? (
                            <Button size="sm" asChild className="h-7 text-xs px-2.5 font-medium gap-1">
                              <Link href={`/dashboard/parcours/${currentCourse.id}/cours`}>
                                Continuer <ArrowRight className="size-3" />
                              </Link>
                            </Button>
                          ) : lecon.status === "complete" ? (
                            <Button size="xs" variant="ghost" asChild className="text-muted-foreground hover:text-foreground">
                              <Link href={`/dashboard/parcours/${currentCourse.id}/cours`}>
                                Revoir
                              </Link>
                            </Button>
                          ) : (
                            <Button size="xs" variant="outline" asChild>
                              <Link href={`/dashboard/parcours/${currentCourse.id}/cours`}>
                                Commencer
                              </Link>
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Colonne Latérale : Enseignant Référent & DEVOIRS EN ATTENTE */}
        <div className="space-y-6 lg:col-span-4">
          {/* 1. Carte Enseignant Référent */}
          <Card className="border-border/60 shadow-xs">
            <CardHeader className="pb-3">
              <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Enseignant Référent
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <Avatar className="size-12 rounded-xl">
                  <AvatarImage src={currentCourse.enseignant.avatar} />
                  <AvatarFallback className="rounded-xl font-bold bg-primary/10 text-primary">
                    {currentCourse.enseignant.name.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold text-foreground text-sm">{currentCourse.enseignant.name}</h4>
                  <p className="text-[11px] text-muted-foreground">{currentCourse.enseignant.role}</p>
                </div>
              </div>

              <div className="border-t border-border/40 pt-2 text-xs space-y-1">
                <span className="text-muted-foreground block text-[11px]">Email :</span>
                <span className="font-mono text-foreground text-xs">{currentCourse.enseignant.email}</span>
              </div>

              <Button size="sm" variant="outline" asChild className="w-full text-xs">
                <Link href="/dashboard/canal">
                  Poser une question sur le Canal
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* 2. DEVOIRS EN ATTENTE SPÉCIFIQUES À CE COURS */}
          <Card className="border-border/60 shadow-xs">
            <CardHeader className="pb-3 border-b border-border/40">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="size-4 text-amber-500" />
                  <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Devoirs en Attente
                  </CardTitle>
                </div>
                <Badge className="bg-amber-500/15 text-amber-600 dark:text-amber-400 border-0 text-[10px]">
                  {devoirsEnAttente.length} à rendre
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="p-3 space-y-3 text-xs">
              {devoirsEnAttente.map((dev) => (
                <div
                  key={dev.id}
                  className="rounded-lg border border-border/60 bg-muted/20 p-3 space-y-2 hover:border-amber-500/30 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h5 className="font-semibold text-foreground text-xs leading-snug">
                      {dev.titre}
                    </h5>
                    {dev.urgent && (
                      <Badge variant="destructive" className="text-[9px] px-1.5 py-0 shrink-0">
                        Urgent
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-muted-foreground border-t border-border/40 pt-2">
                    <span className="flex items-center gap-1">
                      <Clock className="size-3 text-amber-500" /> {dev.dateLimite}
                    </span>
                    <span className="font-mono font-medium">/{dev.points} pts</span>
                  </div>

                  <Button size="sm" variant="outline" asChild className="w-full h-7 text-xs font-medium gap-1 text-primary">
                    <Link href={`/dashboard/parcours/${currentCourse.id}/cours`}>
                      <UploadCloud className="size-3.5" /> Déposer le devoir
                    </Link>
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
