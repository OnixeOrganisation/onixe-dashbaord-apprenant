"use client";

import * as React from "react";
import Link from "next/link";
import {
  Briefcase,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileCheck2,
  FileText,
  FolderArchive,
  Link2,
  UploadCloud,
  Users,
} from "lucide-react";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { useAcademicStore } from "@/stores/academic/academic-store";

export default function PageProjetsComplets() {
  const getActiveCohorte = useAcademicStore((s) => s.getActiveCohorte);
  const getActiveEtablissement = useAcademicStore((s) => s.getActiveEtablissement);

  const activeCohorte = getActiveCohorte();
  const activeEtab = getActiveEtablissement();

  const [projectLink, setProjectLink] = React.useState("https://drive.google.com/drive/folders/onixe-projet-complet");
  const [fileName, setFileName] = React.useState<string | null>("dossier-livrable-jalon2.zip");
  const [notes, setNotes] = React.useState("Livrables du jalon 2 complets avec les spécifications et les maquettes.");
  const [openModal, setOpenModal] = React.useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSaveLivrable = (e: React.FormEvent) => {
    e.preventDefault();
    setOpenModal(false);
    toast.success("Livrable de projet complet mis à jour avec succès !");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2 border-b border-border/50 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Gestion des Projets Complets
            </h1>
            <Badge className="bg-purple-500/10 text-purple-600 dark:text-purple-400 border-0 text-xs">
              Projets de Synthèse
            </Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Espace dédié aux projets transversaux et au projet fil rouge de votre cohorte <strong>{activeCohorte.name}</strong>.
          </p>
        </div>

        {/* MODALE GÉNÉRIQUE TOUS MÉTIERS (DESIGN, DEV, IA, DATA, RÉSEAUX) */}
        <Dialog open={openModal} onOpenChange={setOpenModal}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1.5 text-xs font-medium">
              <UploadCloud className="size-4" /> Déposer / Mettre à jour un livrable
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-base font-bold">Dépôt de Livrable de Projet</DialogTitle>
              <DialogDescription className="text-xs">
                Déposez vos livrables sous forme de lien externe ou de fichier pour évaluation par l'équipe pédagogique.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSaveLivrable} className="space-y-3.5 py-2 text-xs">
              {/* Champ 1 : Lien du projet */}
              <div className="space-y-1">
                <label className="font-semibold text-foreground flex items-center gap-1.5">
                  <Link2 className="size-3.5 text-primary" /> Lien du projet
                </label>
                <Input
                  value={projectLink}
                  onChange={(e) => setProjectLink(e.target.value)}
                  placeholder="URL externe : Google Drive, Figma, GitHub, Vercel, Behance..."
                  className="h-8 text-xs font-mono"
                  required
                />
                <p className="text-[10px] text-muted-foreground">
                  Lien partagé de votre travail (dossier en ligne, prototype, code source ou démo).
                </p>
              </div>

              {/* Champ 2 : Fichier à remettre */}
              <div className="space-y-1">
                <label className="font-semibold text-foreground flex items-center gap-1.5">
                  <FolderArchive className="size-3.5 text-primary" /> Fichier à remettre
                </label>
                <Input
                  type="file"
                  onChange={handleFileChange}
                  className="h-8 text-xs cursor-pointer"
                />
                {fileName && (
                  <p className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1">
                    <CheckCircle2 className="size-3" /> Fichier sélectionné : {fileName}
                  </p>
                )}
                <p className="text-[10px] text-muted-foreground">
                  Formats acceptés : Archive ZIP, PDF, maquette ou document technique (max. 50 Mo).
                </p>
              </div>

              {/* Champ 3 : Remarques */}
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Remarques ou précisions pour l'évaluation</label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Indiquez ici les détails utiles pour le correcteur..."
                  className="text-xs min-h-[70px]"
                />
              </div>

              <DialogFooter className="pt-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setOpenModal(false)}>
                  Annuler
                </Button>
                <Button type="submit" size="sm">
                  Enregistrer le livrable
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Main Project Card */}
      <Card className="border-border/60 shadow-xs">
        <CardHeader className="border-b pb-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <Badge className="bg-primary text-primary-foreground text-[10px]">
                Projet Fil Rouge
              </Badge>
              <Badge variant="outline" className="text-[10px]">
                Jalon 2 / 4 validé
              </Badge>
            </div>
            {/* Mention Rendu Final au lieu de Soutenance finale */}
            <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
              <Calendar className="size-3.5 text-primary" /> Rendu final : <strong>18 Décembre 2026</strong>
            </span>
          </div>

          <CardTitle className="mt-2 text-xl font-bold text-foreground">
            Conception & Déploiement d'une Solution Pluridisciplinaire Multi-Campus
          </CardTitle>
          <CardDescription className="text-xs leading-relaxed text-muted-foreground">
            Projet complet transversal intégrant la modélisation fonctionnelle, les maquettes UI/UX, l'architecture des données et la restitution finale.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 pt-5">
          {/* Jalons & Progression */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-foreground">Avancement Global du Projet</span>
              <span className="font-mono font-bold text-primary">50% Achevé</span>
            </div>
            <Progress value={50} className="h-2" />

            {/* Stepper Jalons */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-4 pt-2">
              <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-emerald-600 font-semibold">Jalon 1</span>
                  <CheckCircle2 className="size-3.5 text-emerald-600" />
                </div>
                <h5 className="font-semibold text-xs mt-1 text-foreground">Cadrage & Spécifications</h5>
                <p className="text-[10px] text-muted-foreground mt-0.5">Validé • Note : 18/20</p>
              </div>

              <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-emerald-600 font-semibold">Jalon 2</span>
                  <CheckCircle2 className="size-3.5 text-emerald-600" />
                </div>
                <h5 className="font-semibold text-xs mt-1 text-foreground">Prototype & Réalisation</h5>
                <p className="text-[10px] text-muted-foreground mt-0.5">Validé • Note : 17/20</p>
              </div>

              <div className="rounded-lg border border-primary/30 bg-primary/5 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-primary font-semibold">Jalon 3</span>
                  <Clock className="size-3.5 text-primary" />
                </div>
                <h5 className="font-semibold text-xs mt-1 text-foreground">Intégration & Tests</h5>
                <p className="text-[10px] text-muted-foreground mt-0.5">En cours • Échéance : 15 Nov</p>
              </div>

              <div className="rounded-lg border border-border/40 bg-muted/20 p-3 opacity-60">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-muted-foreground">Jalon 4</span>
                  <Clock className="size-3.5 text-muted-foreground" />
                </div>
                {/* Rendu final */}
                <h5 className="font-semibold text-xs mt-1 text-foreground">Rendu final & Présentation</h5>
                <p className="text-[10px] text-muted-foreground mt-0.5">À venir • 18 Décembre</p>
              </div>
            </div>
          </div>

          {/* Livrables Actuels & Équipe */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 pt-2">
            {/* Livrables déposés */}
            <div className="space-y-3 rounded-xl border border-border/60 bg-muted/20 p-4">
              <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                <FileCheck2 className="size-4 text-primary" /> Livrables Actifs
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between rounded-lg border border-border/60 bg-background p-2.5">
                  <div className="flex items-center gap-2 min-w-0">
                    <Link2 className="size-3.5 text-primary shrink-0" />
                    <span className="truncate font-mono text-[11px] text-foreground">{projectLink}</span>
                  </div>
                  <a href={projectLink} target="_blank" rel="noreferrer" className="text-primary hover:underline ml-2 shrink-0">
                    <ExternalLink className="size-3.5" />
                  </a>
                </div>

                {fileName && (
                  <div className="flex items-center justify-between rounded-lg border border-border/60 bg-background p-2.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <FolderArchive className="size-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate font-mono text-[11px] text-foreground">{fileName}</span>
                    </div>
                    <Badge variant="outline" className="text-[10px] text-emerald-600">Déposé</Badge>
                  </div>
                )}
              </div>
            </div>

            {/* Équipe projet */}
            <div className="space-y-3 rounded-xl border border-border/60 bg-muted/20 p-4">
              <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                <Users className="size-4 text-primary" /> Équipe & Encadrement
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between rounded-lg border border-border/60 bg-background p-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="size-7">
                      <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" />
                      <AvatarFallback className="text-[10px]">AD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-foreground text-xs">Aminata Diallo (Vous)</p>
                      <span className="text-[10px] text-muted-foreground">Responsable Lead Projet</span>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-[10px]">Membre 1</Badge>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-border/60 bg-background p-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="size-7">
                      <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" />
                      <AvatarFallback className="text-[10px]">KM</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-foreground text-xs">Koffi Mensah</p>
                      <span className="text-[10px] text-muted-foreground">Co-équipier</span>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-[10px]">Membre 2</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
