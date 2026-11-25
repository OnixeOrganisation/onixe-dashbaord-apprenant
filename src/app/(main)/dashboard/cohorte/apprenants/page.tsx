"use client";

import * as React from "react";
import Link from "next/link";
import {
  GraduationCap,
  Mail,
  MessageSquare,
  Phone,
  Search,
  Users,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAcademicStore } from "@/stores/academic/academic-store";

export default function PageApprenantsCohorte() {
  const getActiveCohorte = useAcademicStore((s) => s.getActiveCohorte);
  const getActiveEtablissement = useAcademicStore((s) => s.getActiveEtablissement);

  const activeCohorte = getActiveCohorte();
  const activeEtab = getActiveEtablissement();

  const [search, setSearch] = React.useState("");

  const apprenants = [
    {
      id: "app-1",
      nom: "Diallo",
      prenom: "Aminata",
      email: "aminata.diallo@onixe.academy",
      telephone: "+221 77 123 45 67",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120",
      role: "Déléguée de promotion",
      ville: "Dakar, Sénégal",
      specialite: "Lead Dev & Architecture",
      isSelf: true,
    },
    {
      id: "app-2",
      nom: "Mensah",
      prenom: "Koffi",
      email: "koffi.mensah@onixe.academy",
      telephone: "+225 05 67 89 12 34",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120",
      role: "Apprenant",
      ville: "Abidjan, Côte d'Ivoire",
      specialite: "Frontend & UI/UX",
      isSelf: false,
    },
    {
      id: "app-3",
      nom: "Camara",
      prenom: "Ousmane",
      email: "ousmane.camara@onixe.academy",
      telephone: "+224 622 34 56 78",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120",
      role: "Apprenant",
      ville: "Conakry, Guinée",
      specialite: "Backend & Base de Données",
      isSelf: false,
    },
    {
      id: "app-4",
      nom: "Traoré",
      prenom: "Aïssatou",
      email: "aissatou.traore@onixe.academy",
      telephone: "+223 76 54 32 10",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120",
      role: "Déléguée adjointe",
      ville: "Bamako, Mali",
      specialite: "Data Science & Python",
      isSelf: false,
    },
    {
      id: "app-5",
      nom: "Ndong",
      prenom: "Patrick",
      email: "patrick.ndong@onixe.academy",
      telephone: "+237 677 89 01 23",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120",
      role: "Apprenant",
      ville: "Douala, Cameroun",
      specialite: "DevOps & Cloud",
      isSelf: false,
    },
    {
      id: "app-6",
      nom: "Kaboré",
      prenom: "Wendy",
      email: "wendy.kabore@onixe.academy",
      telephone: "+226 70 12 34 56",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120",
      role: "Apprenant",
      ville: "Ouagadougou, Burkina Faso",
      specialite: "Fullstack JavaScript",
      isSelf: false,
    },
  ];

  const filteredApprenants = apprenants.filter(
    (a) =>
      a.nom.toLowerCase().includes(search.toLowerCase()) ||
      a.prenom.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase()) ||
      a.specialite.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2 border-b border-border/50 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Apprenants de la Promotion
            </h1>
            <Badge variant="outline" className="text-primary border-primary/30 text-xs">
              {activeCohorte.name}
            </Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Annuaire des camarades inscrits dans votre cohorte à <strong>{activeEtab.name}</strong>.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild className="text-xs">
            <Link href="/dashboard/cohorte/enseignants">
              ← Voir les Enseignants
            </Link>
          </Button>
        </div>
      </div>

      {/* Search Input */}
      <div className="flex items-center gap-2 max-w-sm">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher par nom, prénom, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 text-xs h-9"
          />
        </div>
      </div>

      {/* Grid of Students */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredApprenants.map((app) => (
          <Card
            key={app.id}
            className={`border-border/60 shadow-xs transition-colors hover:border-primary/40 ${
              app.isSelf ? "border-primary/40 bg-primary/5" : ""
            }`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <Avatar className="size-12 rounded-xl border border-border/60">
                  <AvatarImage src={app.avatar} alt={`${app.prenom} ${app.nom}`} />
                  <AvatarFallback className="rounded-xl font-bold text-xs bg-primary/10 text-primary">
                    {app.prenom[0]}
                    {app.nom[0]}
                  </AvatarFallback>
                </Avatar>

                {app.isSelf ? (
                  <Badge className="bg-primary text-primary-foreground text-[10px]">
                    Vous
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="text-[10px]">
                    {app.role}
                  </Badge>
                )}
              </div>

              <CardTitle className="mt-2 text-base font-bold text-foreground">
                {app.prenom} {app.nom}
              </CardTitle>
              <p className="text-xs text-muted-foreground">{app.specialite}</p>
            </CardHeader>

            <CardContent className="space-y-3 pt-0 text-xs">
              <div className="space-y-1.5 rounded-lg border border-border/40 bg-muted/20 p-2.5">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="size-3.5 text-primary shrink-0" />
                  <a href={`mailto:${app.email}`} className="truncate hover:underline text-foreground">
                    {app.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="size-3.5 text-primary shrink-0" />
                  <span className="text-foreground">{app.telephone}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1">
                <span>📍 {app.ville}</span>
                {!app.isSelf && (
                  <Button size="xs" variant="ghost" asChild className="h-6 text-[11px] text-primary">
                    <Link href="/dashboard/canal">
                      <MessageSquare className="size-3 mr-1" /> Message
                    </Link>
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
