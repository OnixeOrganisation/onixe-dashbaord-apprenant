"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, BookOpen, GraduationCap, School } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { useAcademicStore } from "@/stores/academic/academic-store";

import { ClassroomContent } from "./_components/classroom-content";
import { ClassroomSidebar } from "./_components/classroom-sidebar";
import { VerticalActionBar } from "./_components/vertical-action-bar";

export default function PageSuivreCours() {
  const params = useParams();
  const moduleId = (params.moduleId as string) || "algo";
  const [activeLessonId, setActiveLessonId] = React.useState("les-1");

  const { setOpen, open } = useSidebar();
  const getActiveCohorte = useAcademicStore((s) => s.getActiveCohorte);
  const getActiveEtablissement = useAcademicStore((s) => s.getActiveEtablissement);

  const activeCohorte = getActiveCohorte();
  const activeEtab = getActiveEtablissement();

  // Fermeture automatique de la sidebar à l'ouverture de la salle de cours (uniquement au montage)
  const hasAutoClosedRef = React.useRef(false);
  React.useEffect(() => {
    if (!hasAutoClosedRef.current) {
      hasAutoClosedRef.current = true;
      setOpen(false);
    }
  }, [setOpen]);

  const currentCourse =
    activeCohorte?.cours?.find((c) => c.id === moduleId) ||
    activeCohorte?.cours?.[0] || {
      id: "algo",
      title: "Algorithmique & Structures de Données",
      code: "CS-101",
      enseignant: {
        name: "Dr. Mamadou Diallo",
        role: "Enseignant Algorithmique",
        email: "m.diallo@onixe.academy",
        avatar: "",
      },
    };

  const lessonTitles: Record<string, string> = {
    "les-1": "1. Introduction & Fondations Théoriques",
    "les-2": "2. Architecture & Structuration Pratique",
    "les-3": "3. Séance Visio : Mise en application en direct",
    "les-4": "4. Rendu du Devoir & Évaluation Pratique",
  };

  const currentLessonTitle = lessonTitles[activeLessonId] || "1. Introduction & Fondations";

  return (
    <div className="space-y-6">
      {/* Top Banner Navigation (Sans badge OpenClassrooms) */}
      <div className="flex flex-col gap-2 border-b border-border/50 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="-ml-2 h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
          >
            <Link href="/dashboard/parcours">
              <ArrowLeft className="mr-1 size-3.5" /> Retour au sommaire des cours
            </Link>
          </Button>

          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              {currentCourse.title}
            </h1>
            <Badge variant="outline" className="font-mono text-xs">
              {currentCourse.code}
            </Badge>
          </div>

          <p className="text-xs text-muted-foreground flex items-center gap-2">
            <span>Enseignant : <strong className="text-foreground">{currentCourse.enseignant.name}</strong> ({currentCourse.enseignant.role})</span>
            <span>•</span>
            <span>{activeEtab.name}</span>
          </p>
        </div>
      </div>

      {/* Main 3-Zone Layout */}
      <div className="relative flex flex-col gap-6 lg:flex-row items-start">
        {/* Left: Sommaire & Progression */}
        <div className="w-full lg:w-80 shrink-0">
          <ClassroomSidebar
            courseTitle={currentCourse.title}
            activeLessonId={activeLessonId}
            onSelectLesson={(id) => setActiveLessonId(id)}
          />
        </div>

        {/* Center: Contenu de cours */}
        <div className="flex-1 min-w-0 w-full">
          <ClassroomContent
            lessonTitle={currentLessonTitle}
            courseTitle={currentCourse.title}
            instructorName={currentCourse.enseignant.name}
          />
        </div>

        {/* Right: Barre verticale avec panneau flottant superposé */}
        <div className="sticky top-20 shrink-0 hidden md:block">
          <VerticalActionBar
            lessonTitle={currentLessonTitle}
            instructorName={currentCourse.enseignant.name}
          />
        </div>
      </div>
    </div>
  );
}
