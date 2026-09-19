"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

import { LecteurCours } from "./_components/lecteur-cours";
import { SommaireChapitres } from "./_components/sommaire-chapitres";

export default function PageSuivreCours() {
  const params = useParams();
  const moduleId = (params.moduleId as string) || "mod-201";

  return (
    <div className="space-y-6">
      {/* Back Header */}
      <div className="space-y-2 border-b pb-4">
        <Button variant="ghost" size="sm" asChild className="-ml-2 h-8 px-2 text-muted-foreground text-xs">
          <Link href={`/dashboard/parcours/${moduleId}`}>
            <ArrowLeft className="mr-1 h-3.5 w-3.5" /> Retour aux consignes du module
          </Link>
        </Button>
        <h1 className="flex items-center gap-2 font-bold text-2xl text-foreground tracking-tight">
          Interface de Suivi du Cours (Classroom)
        </h1>
        <p className="text-muted-foreground text-sm">
          Visionnez les leçons, suivez les chapitres et validez votre progression par module.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SommaireChapitres moduleId={moduleId} />
        </div>
        <div className="lg:col-span-8">
          <LecteurCours moduleId={moduleId} />
        </div>
      </div>
    </div>
  );
}
