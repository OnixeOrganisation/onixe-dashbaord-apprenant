"use client";

import { CheckCircle2, ChevronDown, Clock, Play, Video } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAcademicStore } from "@/stores/academic/academic-store";

interface Chapter {
  id: string;
  title: string;
  duration: string;
  isCompleted: boolean;
  isCurrent: boolean;
}

export function ClassroomSidebar({
  courseTitle,
  activeLessonId,
  onSelectLesson,
}: {
  courseTitle: string;
  activeLessonId: string;
  onSelectLesson: (id: string) => void;
}) {
  const getActiveCohorte = useAcademicStore((s) => s.getActiveCohorte);
  const activeCohorte = getActiveCohorte();

  const chapters: Chapter[] = [
    {
      id: "les-1",
      title: "1. Introduction & Fondations Théoriques",
      duration: "18 min",
      isCompleted: true,
      isCurrent: activeLessonId === "les-1",
    },
    {
      id: "les-2",
      title: "2. Architecture & Structuration Pratique",
      duration: "24 min",
      isCompleted: false,
      isCurrent: activeLessonId === "les-2",
    },
    {
      id: "les-3",
      title: "3. Séance Visio : Mise en application en direct",
      duration: "45 min",
      isCompleted: false,
      isCurrent: activeLessonId === "les-3",
    },
    {
      id: "les-4",
      title: "4. Rendu du Devoir & Évaluation Pratique",
      duration: "15 min",
      isCompleted: false,
      isCurrent: activeLessonId === "les-4",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Course & Cohort Progression Card */}
      <Card className="border-border/60 shadow-xs">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Progression du Cours
            </span>
            <Badge variant="outline" className="text-primary border-primary/30 text-[10px]">
              {activeCohorte.name}
            </Badge>
          </div>
          <CardTitle className="text-sm font-semibold text-foreground line-clamp-1">
            {courseTitle}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Modules validés</span>
            <span className="font-mono font-medium text-foreground">3 / 5</span>
          </div>
          <Progress value={60} className="h-1.5" />
          <p className="text-[11px] text-muted-foreground pt-1">
            Progression globale de la cohorte : <strong className="text-foreground">{activeCohorte.progressionGlobale}%</strong>
          </p>
        </CardContent>
      </Card>

      {/* Prochaine séance en Visio Programmée */}
      <Card className="border-primary/30 bg-primary/5 shadow-xs">
        <CardContent className="p-3.5 space-y-2">
          <div className="flex items-center gap-1.5 text-primary font-semibold text-xs">
            <Video className="size-4" />
            <span>Séance en Visioconférence</span>
          </div>
          <p className="text-xs text-foreground font-medium">
            Atelier Live & Résolution des blocages
          </p>
          <div className="flex items-center justify-between text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="size-3 text-primary" /> Jeudi à 16h00 (GMT)
            </span>
            <Badge className="bg-primary text-primary-foreground text-[10px] cursor-pointer hover:bg-primary/90">
              Rejoindre
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Sommaire des chapitres et leçons */}
      <Card className="border-border/60 shadow-xs">
        <CardHeader className="border-b pb-2.5">
          <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Sommaire des Leçons
          </CardTitle>
        </CardHeader>
        <CardContent className="p-2 space-y-1">
          {chapters.map((chap) => (
            <button
              key={chap.id}
              onClick={() => onSelectLesson(chap.id)}
              className={`w-full text-left rounded-lg p-2.5 transition-all text-xs flex items-start gap-2.5 ${
                chap.isCurrent
                  ? "bg-primary text-primary-foreground font-medium shadow-xs"
                  : "hover:bg-muted/60 text-muted-foreground hover:text-foreground"
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {chap.isCompleted ? (
                  <CheckCircle2
                    className={`size-4 ${
                      chap.isCurrent ? "text-primary-foreground" : "text-emerald-500"
                    }`}
                  />
                ) : (
                  <Play
                    className={`size-4 ${
                      chap.isCurrent ? "text-primary-foreground" : "text-muted-foreground"
                    }`}
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-xs">{chap.title}</p>
                <span
                  className={`text-[10px] ${
                    chap.isCurrent ? "text-primary-foreground/80" : "text-muted-foreground"
                  }`}
                >
                  Durée : {chap.duration}
                </span>
              </div>
            </button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
