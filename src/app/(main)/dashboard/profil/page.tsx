"use client";

import {
  Building2,
  CheckCircle2,
  Code2,
  Copy,
  FileSignature,
  Lock,
  Mail,
  MapPin,
  School,
  ShieldCheck,
  User,
} from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProfil } from "@/hooks/use-apprenant-data";

import { PortfolioProjets } from "./_components/portfolio-projets";

export default function PageProfil() {
  const { centreInfo, profile } = useProfil();

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copié dans le presse-papier !`);
  };

  const handleModificationRequest = () => {
    toast.info("Demande de modification transmise", {
      description: "Le secrétariat académique traitera votre demande de mise à jour sous 24h à 48h.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b pb-4">
        <h1 className="flex items-center gap-2 font-bold text-2xl text-foreground tracking-tight">
          Informations du Centre & Profil Apprenant
        </h1>
        <p className="mt-0.5 text-muted-foreground text-sm">
          Fiche officielle de l'établissement de formation et dossier d'inscription certifié.
        </p>
      </div>

      <Tabs defaultValue="officiel" className="space-y-6">
        <TabsList className="h-9 p-0.5 text-xs">
          <TabsTrigger value="officiel" className="px-3 text-xs">
            <School className="mr-1.5 h-3.5 w-3.5" /> Fiche Centre & Dossier Certifié
          </TabsTrigger>
          <TabsTrigger value="portfolio" className="px-3 text-xs">
            <Code2 className="mr-1.5 h-3.5 w-3.5" /> Portfolio des Projets
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Fiche Officielle du Centre & Dossier Apprenant */}
        <TabsContent value="officiel" className="space-y-6 pt-1">
          {/* Main Centre Header Card */}
          <Card className="border-border/60 bg-card shadow-xs">
            <CardContent className="flex flex-col justify-between gap-4 p-5 md:flex-row md:items-center">
              <div className="flex items-start gap-4">
                <div className="shrink-0 rounded-xl border border-primary/20 bg-primary/10 p-3 text-primary">
                  <School className="h-8 w-8" />
                </div>
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-bold text-foreground text-xl tracking-tight">{centreInfo.name}</h2>
                    <Badge className="border-emerald-500/30 bg-emerald-500/15 px-2 py-0.5 font-mono text-[10px] text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="mr-1 inline h-3 w-3" /> {centreInfo.agrementBadge}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-xs">{centreInfo.subtitle}</p>
                </div>
              </div>

              <div className="flex w-fit shrink-0 items-center gap-2 rounded-lg border border-border/60 bg-muted/40 px-3 py-2 font-mono text-muted-foreground text-xs">
                <Building2 className="h-4 w-4 text-primary" />
                <span>
                  Code : <strong className="text-foreground">{centreInfo.code}</strong>
                </span>
              </div>
            </CardContent>
          </Card>

          {/* 2x2 Grid: Centre Information Sections */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* 1. Campus Principal & Adresse */}
            <Card className="flex flex-col justify-between border-border/60 shadow-xs">
              <CardHeader className="pb-3">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 rounded-lg bg-primary/10 p-2 text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="font-semibold text-sm">Campus Principal & Adresse</CardTitle>
                    <CardDescription className="font-mono text-[11px] text-muted-foreground">
                      Localisation Géographique
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pt-0">
                <div className="rounded-md border border-border/50 bg-muted/20 p-3 font-medium text-foreground text-xs">
                  {centreInfo.address}
                </div>
                <div className="flex items-center justify-between border-border/40 border-t pt-2 font-mono text-[11px] text-muted-foreground">
                  <span>{centreInfo.region}</span>
                  <span className="font-semibold text-primary">{centreInfo.campusType}</span>
                </div>
              </CardContent>
            </Card>

            {/* 2. Contacts & Support Pédagogique */}
            <Card className="flex flex-col justify-between border-border/60 shadow-xs">
              <CardHeader className="pb-3">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 rounded-lg bg-primary/10 p-2 text-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="font-semibold text-sm">Contacts & Support Pédagogique</CardTitle>
                    <CardDescription className="font-mono text-[11px] text-muted-foreground">
                      Standard & Urgences
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2 pt-0">
                <div className="flex items-center justify-between rounded-md border border-border/50 bg-muted/20 p-2.5 text-xs">
                  <span className="text-[11px] text-muted-foreground">Email Support :</span>
                  <div className="flex items-center gap-1.5 font-medium font-mono text-foreground">
                    <span>{centreInfo.emailSupport}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => copyToClipboard(centreInfo.emailSupport, "Email support")}
                      className="h-6 w-6 text-muted-foreground hover:text-primary"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-md border border-border/50 bg-muted/20 p-2.5 text-xs">
                  <span className="text-[11px] text-muted-foreground">Téléphone Standard :</span>
                  <span className="font-medium font-mono text-foreground">{centreInfo.phoneStandard}</span>
                </div>

                <div className="flex items-center justify-between rounded-md border border-border/50 bg-muted/20 p-2.5 text-xs">
                  <span className="text-[11px] text-muted-foreground">Ligne Urgence :</span>
                  <span className="font-mono font-semibold text-primary">{centreInfo.phoneUrgence}</span>
                </div>
              </CardContent>
            </Card>

            {/* 3. Agrément & Habilitations */}
            <Card className="flex flex-col justify-between border-border/60 shadow-xs">
              <CardHeader className="pb-3">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 rounded-lg bg-primary/10 p-2 text-primary">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="font-semibold text-sm">Agrément & Habilitations</CardTitle>
                    <CardDescription className="font-mono text-[11px] text-muted-foreground">
                      Conformité Légale
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 pt-0">
                <div className="space-y-1 rounded-md border border-border/50 bg-muted/20 p-3 text-xs">
                  <span className="block font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
                    AGRÉMENT MINISTÉRIEL
                  </span>
                  <p className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                    {centreInfo.agrementMinisteriel}
                  </p>
                </div>

                <div className="space-y-1 rounded-md border border-border/50 bg-muted/20 p-3 text-xs">
                  <span className="block font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
                    CERTIFICATION QUALITÉ
                  </span>
                  <p className="font-mono font-semibold text-primary">{centreInfo.certificationQualite}</p>
                </div>
              </CardContent>
            </Card>

            {/* 4. Direction de l'Établissement */}
            <Card className="flex flex-col justify-between border-border/60 shadow-xs">
              <CardHeader className="pb-3">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 rounded-lg bg-primary/10 p-2 text-primary">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="font-semibold text-sm">Direction de l'Établissement</CardTitle>
                    <CardDescription className="font-mono text-[11px] text-muted-foreground">
                      Gouvernance Académique
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 pt-0">
                <div className="space-y-1 rounded-md border border-border/50 bg-muted/20 p-3 text-xs">
                  <span className="block font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
                    DIRECTEUR GÉNÉRAL
                  </span>
                  <p className="font-semibold text-foreground">{centreInfo.directeurGeneral}</p>
                </div>

                <div className="space-y-1 rounded-md border border-border/50 bg-muted/20 p-3 text-xs">
                  <span className="block font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
                    TUTELLE ACADÉMIQUE
                  </span>
                  <p className="font-medium text-foreground">{centreInfo.tutelleAcademique}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Dossier de l'Apprenant (Lecture Seule) Card */}
          <Card className="border-border/60 bg-card shadow-xs">
            <CardHeader className="border-b pb-3">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2.5">
                  <User className="h-5 w-5 text-primary" />
                  <CardTitle className="font-semibold text-base">Dossier de l'Apprenant (Lecture Seule)</CardTitle>
                </div>

                <Button
                  type="button"
                  onClick={handleModificationRequest}
                  size="sm"
                  className="w-fit px-3 font-medium text-xs"
                >
                  <FileSignature className="mr-1.5 h-3.5 w-3.5" /> Demander une Modification
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-5 p-5">
              {/* Alert Notification */}
              <div className="flex items-start gap-3 rounded-lg border border-border/60 bg-muted/30 p-3.5 text-xs">
                <Lock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <p className="text-muted-foreground leading-relaxed">
                  Vos données personnelles ont été certifiées lors de l'inscription à l'établissement{" "}
                  <strong className="text-foreground">{centreInfo.name}</strong>. Tout changement de coordonnées
                  nécessite une demande de mise à jour transmise au secrétariat.
                </p>
              </div>

              {/* Readonly Student Form Fields Grid */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {/* Prénom */}
                <div className="space-y-1">
                  <span className="block font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
                    Prénom
                  </span>
                  <div className="rounded-md border border-border/60 bg-muted/20 p-2.5 font-medium font-mono text-foreground text-xs">
                    {profile.prenom}
                  </div>
                </div>

                {/* Nom de Famille */}
                <div className="space-y-1">
                  <span className="block font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
                    Nom de Famille
                  </span>
                  <div className="rounded-md border border-border/60 bg-muted/20 p-2.5 font-medium font-mono text-foreground text-xs">
                    {profile.nomFamille}
                  </div>
                </div>

                {/* Email Institutionnel */}
                <div className="space-y-1">
                  <span className="block font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
                    Email Institutionnel
                  </span>
                  <div className="truncate rounded-md border border-border/60 bg-muted/20 p-2.5 font-medium font-mono text-foreground text-xs">
                    {profile.email}
                  </div>
                </div>

                {/* Numéro de Téléphone */}
                <div className="space-y-1">
                  <span className="block font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
                    Numéro de Téléphone
                  </span>
                  <div className="rounded-md border border-border/60 bg-muted/20 p-2.5 font-medium font-mono text-foreground text-xs">
                    {profile.phone}
                  </div>
                </div>

                {/* Date de Naissance */}
                <div className="space-y-1">
                  <span className="block font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
                    Date de Naissance
                  </span>
                  <div className="rounded-md border border-border/60 bg-muted/20 p-2.5 font-medium font-mono text-foreground text-xs">
                    {profile.dateNaissance}
                  </div>
                </div>

                {/* Matricule */}
                <div className="space-y-1">
                  <span className="block font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
                    Matricule / N° INE National
                  </span>
                  <div className="rounded-md border border-primary/40 bg-primary/5 p-2.5 font-bold font-mono text-primary text-xs">
                    {profile.matricule}
                  </div>
                </div>

                {/* Adresse Domicile Certifiée */}
                <div className="space-y-1 md:col-span-2">
                  <span className="block font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
                    Adresse Domicile Certifiée
                  </span>
                  <div className="rounded-md border border-border/60 bg-muted/20 p-2.5 font-medium font-mono text-foreground text-xs">
                    {profile.adresseCertifiee}
                  </div>
                </div>

                {/* Contact d'Urgence */}
                <div className="space-y-1">
                  <span className="block font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
                    Contact d'Urgence
                  </span>
                  <div className="truncate rounded-md border border-border/60 bg-muted/20 p-2.5 font-medium font-mono text-foreground text-xs">
                    {profile.contactUrgence}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 2: Portfolio des Projets */}
        <TabsContent value="portfolio" className="pt-1">
          <PortfolioProjets />
        </TabsContent>
      </Tabs>
    </div>
  );
}
