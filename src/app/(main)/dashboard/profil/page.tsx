"use client";

import Link from "next/link";
import {
  Building2,
  CheckCircle2,
  Code2,
  Copy,
  Edit,
  GraduationCap,
  KeyRound,
  Lock,
  Mail,
  MapPin,
  Phone,
  School,
  ShieldCheck,
  Sparkles,
  User,
} from "lucide-react";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { rootUser } from "@/data/users";
import { useAcademicStore } from "@/stores/academic/academic-store";

import { PortfolioProjets } from "./_components/portfolio-projets";

export default function PageProfil() {
  const getActiveCohorte = useAcademicStore((s) => s.getActiveCohorte);
  const getActiveEtablissement = useAcademicStore((s) => s.getActiveEtablissement);

  const activeCohorte = getActiveCohorte();
  const activeEtab = getActiveEtablissement();

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copié dans le presse-papier !`);
  };

  const handleModificationRequest = () => {
    toast.info("Demande de modification transmise au secrétariat", {
      description: "Le secrétariat académique traitera votre demande de mise à jour sous 24h à 48h.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-2 border-b border-border/50 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Mon Profil Apprenant
            </h1>
            <Badge className="bg-primary/10 text-primary border-0 text-xs">
              Dossier Étudiant Certifié
            </Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Gérez vos informations personnelles, vos coordonnées et votre portfolio d'ingénieur.
          </p>
        </div>

        <Button variant="outline" size="sm" asChild className="text-xs gap-1.5">
          <Link href="/dashboard/etablissement">
            <School className="size-3.5 text-primary" /> Voir le Profil de l'Établissement ({activeEtab.shortName}) →
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="dossier" className="space-y-6">
        <TabsList className="h-9 p-0.5 text-xs">
          <TabsTrigger value="dossier" className="px-3 text-xs">
            <User className="mr-1.5 size-3.5" /> Mon Dossier & Identité
          </TabsTrigger>
          <TabsTrigger value="portfolio" className="px-3 text-xs">
            <Code2 className="mr-1.5 size-3.5" /> Mon Portfolio de Projets
          </TabsTrigger>
          <TabsTrigger value="securite" className="px-3 text-xs">
            <KeyRound className="mr-1.5 size-3.5" /> Sécurité & Mot de Passe
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Dossier Apprenant */}
        <TabsContent value="dossier" className="space-y-6 pt-1">
          {/* Main User Card */}
          <Card className="border-border/60 shadow-xs">
            <CardContent className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5">
              <div className="flex items-center gap-4">
                <Avatar className="size-16 rounded-2xl border-2 border-primary/20">
                  <AvatarImage src={rootUser.avatar} alt={rootUser.name} />
                  <AvatarFallback className="rounded-2xl font-bold text-base bg-primary/10 text-primary">
                    AD
                  </AvatarFallback>
                </Avatar>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-xl font-bold text-foreground">{rootUser.name}</h2>
                    <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-0 text-[10px]">
                      <CheckCircle2 className="size-3 mr-1" /> Inscrit & Actif
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {rootUser.email} • Matricule : <strong className="text-foreground font-mono">ONX-2026-0891</strong>
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {activeEtab.name} • {activeCohorte.name}
                  </p>
                </div>
              </div>

              <Button size="sm" variant="outline" onClick={handleModificationRequest} className="text-xs gap-1.5">
                <Edit className="size-3.5" /> Demander une rectification
              </Button>
            </CardContent>
          </Card>

          {/* Details Form Grid */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Card className="border-border/60 shadow-xs">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">Coordonnées de Contact</CardTitle>
                <CardDescription className="text-xs">Informations personnelles de l'apprenant</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-xs">
                <div className="space-y-1">
                  <label className="text-[11px] text-muted-foreground">Nom complet</label>
                  <Input value="Aminata Diallo" readOnly className="h-8 text-xs bg-muted/20" />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] text-muted-foreground">Adresse Email Institutionnelle</label>
                  <Input value="aminata.diallo@onixe.academy" readOnly className="h-8 text-xs font-mono bg-muted/20" />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] text-muted-foreground">Numéro de Téléphone</label>
                  <Input value="+221 77 123 45 67" readOnly className="h-8 text-xs font-mono bg-muted/20" />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] text-muted-foreground">Ville & Pays de résidence</label>
                  <Input value="Dakar, Sénégal" readOnly className="h-8 text-xs bg-muted/20" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/60 shadow-xs">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">Inscriptions & Rattachements</CardTitle>
                <CardDescription className="text-xs">Statut académique dans les établissements Onixe</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-xs">
                <div className="rounded-lg border border-border/40 bg-muted/20 p-3 space-y-1">
                  <span className="text-[10px] uppercase font-semibold text-muted-foreground">Établissement Principal</span>
                  <p className="font-semibold text-foreground">{activeEtab.name}</p>
                  <p className="text-[11px] text-muted-foreground">{activeEtab.city}, {activeEtab.country}</p>
                </div>

                <div className="rounded-lg border border-border/40 bg-muted/20 p-3 space-y-1">
                  <span className="text-[10px] uppercase font-semibold text-muted-foreground">Cohorte Active</span>
                  <p className="font-semibold text-foreground">{activeCohorte.name}</p>
                  <p className="text-[11px] text-muted-foreground">Période : {activeCohorte.dateDebut} - {activeCohorte.dateFin}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab 2: Portfolio des projets */}
        <TabsContent value="portfolio" className="pt-1">
          <PortfolioProjets />
        </TabsContent>

        {/* Tab 3: Sécurité */}
        <TabsContent value="securite" className="pt-1">
          <Card className="border-border/60 shadow-xs max-w-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">Sécurité du Compte</CardTitle>
              <CardDescription className="text-xs">
                Modifiez votre mot de passe d'accès au portail apprenant.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="text-[11px] text-muted-foreground">Mot de passe actuel</label>
                <Input type="password" placeholder="••••••••••••" className="h-8 text-xs" />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] text-muted-foreground">Nouveau mot de passe</label>
                <Input type="password" placeholder="••••••••••••" className="h-8 text-xs" />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] text-muted-foreground">Confirmer le nouveau mot de passe</label>
                <Input type="password" placeholder="••••••••••••" className="h-8 text-xs" />
              </div>
              <Button size="sm" onClick={() => toast.success("Mot de passe mis à jour avec succès !")} className="mt-2 text-xs">
                Mettre à jour le mot de passe
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
