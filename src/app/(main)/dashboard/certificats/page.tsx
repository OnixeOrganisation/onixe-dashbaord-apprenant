"use client";

import {
  Award,
  Calendar,
  CheckCircle2,
  Download,
  FileCheck2,
  FileText,
  GraduationCap,
  Lock,
  QrCode,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAcademicStore } from "@/stores/academic/academic-store";

export default function PageCertificats() {
  const getActiveCohorte = useAcademicStore((s) => s.getActiveCohorte);
  const getActiveEtablissement = useAcademicStore((s) => s.getActiveEtablissement);

  const activeCohorte = getActiveCohorte();
  const activeEtab = getActiveEtablissement();

  const documents = [
    {
      id: "cert-1",
      titre: "Certificat de Scolarité Officiel 2025 - 2026",
      type: "Certificat Administratif",
      reference: "CS-2025-OAD-0442",
      dateDelivrance: "16 Octobre 2025",
      statut: "disponible",
      taille: "320 Ko • PDF Signé Numériquement",
    },
    {
      id: "cert-2",
      titre: "Attestation de Réussite : Strate 1 (Fondations & Socle Algorithmique)",
      type: "Attestation de Bloc de Compétences",
      reference: "ATT-STRATE1-2026-991",
      dateDelivrance: "15 Janvier 2026",
      statut: "disponible",
      taille: "450 Ko • PDF avec QR Code d'Authenticité",
    },
    {
      id: "cert-3",
      titre: "Attestation d'Assiduité & Présence aux Séances Visio",
      type: "Relevé d'Assiduité",
      reference: "ASSID-SEM1-2026",
      dateDelivrance: "01 Février 2026",
      statut: "disponible",
      taille: "280 Ko • PDF Officiel",
    },
    {
      id: "cert-4",
      titre: "Diplôme Supérieur d'Ingénierie Logicielle (Titre RNCP / Reconnu)",
      type: "Diplôme de Fin de Formation",
      reference: "DIP-GL-2026-PENDING",
      dateDelivrance: "Prévue le 30 Juin 2026",
      statut: "a_venir",
      taille: "Délivré après soutenance du Projet Fil Rouge",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2 border-b border-border/50 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Attestations & Certificats Académiques
            </h1>
            <Badge className="bg-primary/10 text-primary border-0 text-xs">
              Documents Officiels
            </Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Téléchargez vos attestations, certificats de réussite et diplômes certifiés par <strong>{activeEtab.name}</strong>.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-border/50 bg-muted/20 px-3 py-1.5 text-xs text-muted-foreground">
          <ShieldCheck className="size-4 text-emerald-500" />
          <span>Vérification d'authenticité par signature électronique</span>
        </div>
      </div>

      {/* Grid of Certificates */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {documents.map((doc) => (
          <Card
            key={doc.id}
            className={`border-border/60 shadow-xs flex flex-col justify-between transition-colors ${
              doc.statut === "disponible" ? "hover:border-primary/40" : "opacity-75 bg-muted/10"
            }`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {doc.statut === "disponible" ? (
                    <FileCheck2 className="size-5" />
                  ) : (
                    <Lock className="size-5 text-muted-foreground" />
                  )}
                </div>
                {doc.statut === "disponible" ? (
                  <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-0 text-[10px]">
                    <CheckCircle2 className="size-3 mr-1" /> Certifié & Disponible
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="text-[10px]">
                    En cours d'acquisition
                  </Badge>
                )}
              </div>

              <CardTitle className="mt-2 text-base font-bold text-foreground">
                {doc.titre}
              </CardTitle>
              <CardDescription className="text-xs">
                {doc.type} • Réf : <span className="font-mono">{doc.reference}</span>
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 pt-0">
              <div className="rounded-lg border border-border/40 bg-muted/20 p-2.5 text-xs text-muted-foreground flex items-center justify-between">
                <span>Délivré le : <strong className="text-foreground">{doc.dateDelivrance}</strong></span>
                <span className="text-[10px]">{doc.taille}</span>
              </div>

              <div className="border-t border-border/40 pt-3 flex items-center justify-between">
                <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                  <QrCode className="size-3.5 text-primary" /> Tampon d'école officiel
                </span>

                {doc.statut === "disponible" ? (
                  <Button
                    size="sm"
                    onClick={() => toast.success(`Téléchargement de : ${doc.titre}`)}
                    className="h-8 px-3 text-xs gap-1.5 font-medium"
                  >
                    <Download className="size-3.5" /> Télécharger (PDF)
                  </Button>
                ) : (
                  <Button size="sm" variant="ghost" disabled className="h-8 px-3 text-xs">
                    Bloqué jusqu'à validation
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
