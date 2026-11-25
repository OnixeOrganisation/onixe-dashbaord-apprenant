"use client";

import Link from "next/link";
import {
  ArrowLeft,
  GraduationCap,
  Mail,
  MessageSquare,
  Phone,
  School,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAcademicStore } from "@/stores/academic/academic-store";

export default function PageEnseignantsCohorte() {
  const getActiveCohorte = useAcademicStore((s) => s.getActiveCohorte);
  const getActiveEtablissement = useAcademicStore((s) => s.getActiveEtablissement);

  const activeCohorte = getActiveCohorte();
  const activeEtab = getActiveEtablissement();

  const enseignants = [
    {
      id: "ens-1",
      name: "Dr. Mamadou Diallo",
      role: "Responsable Pédagogique & Enseignant Algorithmique",
      cours: "Algorithmique & Structures de Données (CS-101)",
      email: "m.diallo@onixe.academy",
      phone: "+221 77 450 12 34",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
      disponibilite: "Permanences le Mardi de 14h à 17h",
      badge: "Responsable de Cohorte",
    },
    {
      id: "ens-2",
      name: "Sophie Martin",
      role: "Lead Formatrice Frontend React / Next.js",
      cours: "Programmation Web & Frameworks Modernes (DEV-202)",
      email: "s.martin@onixe.academy",
      phone: "+33 6 12 34 56 78",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      disponibilite: "Revue de code le Mercredi après-midi",
      badge: "Mentor Projet",
    },
    {
      id: "ens-3",
      name: "Ibrahima Koné",
      role: "Expert Bases de Données & Architecture Backend",
      cours: "Bases de Données Relationnelles & SQL (DAT-201)",
      email: "i.kone@onixe.academy",
      phone: "+225 07 89 45 12 30",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      disponibilite: "Jeudi de 10h à 12h sur le Canal",
      badge: "Enseignant Spécialiste",
    },
    {
      id: "ens-4",
      name: "Fatou Ndiaye",
      role: "Formatrice Outils Numériques & Méthodologie",
      cours: "Bureautique & Outils Collaboratifs (BUR-100)",
      email: "f.ndiaye@onixe.academy",
      phone: "+221 78 123 45 67",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
      disponibilite: "Lundi de 15h à 18h",
      badge: "Enseignante Transverse",
    },
    {
      id: "ens-5",
      name: "Marie-Claire Sow",
      role: "Responsable Communication & Expression Professionnelle",
      cours: "Français Professionnel & Prise de Parole (COM-105)",
      email: "mc.sow@onixe.academy",
      phone: "+221 76 987 65 43",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150",
      disponibilite: "Vendredi de 9h à 12h",
      badge: "Soft Skills",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2 border-b border-border/50 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Enseignants de la Cohorte
            </h1>
            <Badge variant="outline" className="text-primary border-primary/30 text-xs">
              {activeCohorte.name}
            </Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            L'équipe pédagogique et les responsabilités de chaque enseignant intervenant pour <strong>{activeEtab.name}</strong>.
          </p>
        </div>

        <Button variant="outline" size="sm" asChild className="text-xs gap-1.5">
          <Link href="/dashboard/cohorte/apprenants">
            Voir les Apprenants de la promotion →
          </Link>
        </Button>
      </div>

      {/* Grid of Teachers */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {enseignants.map((ens) => (
          <Card key={ens.id} className="border-border/60 shadow-xs hover:border-primary/40 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <Avatar className="size-14 rounded-xl border border-border/60">
                  <AvatarImage src={ens.avatar} alt={ens.name} />
                  <AvatarFallback className="rounded-xl font-bold text-sm bg-primary/10 text-primary">
                    {ens.name.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <Badge variant="secondary" className="text-[10px]">
                  {ens.badge}
                </Badge>
              </div>

              <CardTitle className="mt-3 text-base font-bold text-foreground">
                {ens.name}
              </CardTitle>
              <p className="text-xs font-medium text-primary line-clamp-1">
                {ens.role}
              </p>
            </CardHeader>

            <CardContent className="space-y-4 pt-0">
              <div className="rounded-lg border border-border/40 bg-muted/20 p-2.5 text-xs">
                <span className="text-[10px] text-muted-foreground uppercase font-semibold block mb-0.5">
                  Matière enseignée :
                </span>
                <span className="font-medium text-foreground">{ens.cours}</span>
              </div>

              <div className="space-y-1.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="size-3.5 text-primary shrink-0" />
                  <a href={`mailto:${ens.email}`} className="truncate hover:underline text-foreground">
                    {ens.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="size-3.5 text-primary shrink-0" />
                  <span>{ens.phone}</span>
                </div>
                <p className="text-[11px] text-muted-foreground italic pt-1">
                  📅 {ens.disponibilite}
                </p>
              </div>

              <div className="border-t border-border/40 pt-3">
                <Button size="sm" variant="outline" asChild className="w-full text-xs gap-1.5">
                  <Link href="/dashboard/canal">
                    <MessageSquare className="size-3.5" /> Échanger sur le Canal
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
