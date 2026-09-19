"use client";

import { BookOpen, CheckCircle2, Code2, PenTool, Play } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useCoursLesson } from "@/hooks/use-apprenant-data";

export function LecteurCours({ moduleId }: { moduleId: string }) {
  const {
    courseData,
    activeLessonId,
    activeLessonContent,
    completedLessons,
    toggleLessonCompletion,
    learnerNote,
    setLearnerNote,
  } = useCoursLesson(moduleId);

  const isCompleted = completedLessons.includes(activeLessonId);

  return (
    <div className="space-y-6">
      {/* Course Reader Card */}
      <Card className="border-border/60 shadow-xs">
        <CardHeader className="border-b pb-3">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="font-mono text-muted-foreground text-xs">{activeLessonContent.chapterTitle}</span>
              <CardTitle className="mt-0.5 font-bold text-foreground text-xl tracking-tight">
                {activeLessonContent.title}
              </CardTitle>
            </div>

            <Button
              type="button"
              onClick={() => toggleLessonCompletion(activeLessonId)}
              variant={isCompleted ? "outline" : "default"}
              size="sm"
              className="w-fit font-medium text-xs"
            >
              <CheckCircle2 className={`mr-1.5 h-4 w-4 ${isCompleted ? "text-emerald-500" : ""}`} />
              {isCompleted ? "Leçon terminée" : "Marquer comme terminée"}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 p-4">
          {/* Main Media Video Player Placeholder */}
          <div className="relative flex aspect-video w-full flex-col items-center justify-center rounded-lg border bg-black/90 p-6 text-white shadow-inner">
            <div className="mb-3 rounded-full bg-primary/20 p-4 text-primary">
              <Play className="h-8 w-8 fill-primary" />
            </div>
            <h4 className="text-center font-semibold text-sm">{activeLessonContent.title}</h4>
            <p className="mt-1 text-muted-foreground text-xs">Support Vidéo HD • Formateur : {courseData.instructor}</p>
          </div>

          {/* Lesson Content Tabs */}
          <Tabs defaultValue="summary" className="w-full">
            <TabsList className="h-9 p-0.5 text-xs">
              <TabsTrigger value="summary" className="px-3 text-xs">
                <BookOpen className="mr-1.5 h-3.5 w-3.5" /> Résumé & Points Clés
              </TabsTrigger>
              <TabsTrigger value="code" className="px-3 text-xs">
                <Code2 className="mr-1.5 h-3.5 w-3.5" /> Code & Extraits SQL
              </TabsTrigger>
              <TabsTrigger value="notes" className="px-3 text-xs">
                <PenTool className="mr-1.5 h-3.5 w-3.5" /> Mes Notes Personnelles
              </TabsTrigger>
            </TabsList>

            <TabsContent value="summary" className="space-y-4 pt-3">
              <p className="text-muted-foreground text-xs leading-relaxed">{activeLessonContent.summary}</p>
              <div className="space-y-2">
                <h5 className="font-semibold text-foreground text-xs uppercase tracking-wide">Points clés retenus :</h5>
                <ul className="space-y-1">
                  {activeLessonContent.keyTakeaways.map((t, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-muted-foreground text-xs">
                      <span className="font-bold text-primary">•</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="code" className="pt-3">
              <div className="overflow-x-auto rounded-lg border bg-zinc-950 p-3.5 font-mono text-xs text-zinc-100">
                <pre>{activeLessonContent.codeSnippet}</pre>
              </div>
            </TabsContent>

            <TabsContent value="notes" className="space-y-2 pt-3">
              <span className="block font-medium text-foreground text-xs">Prenez vos notes de cours en direct :</span>
              <Textarea
                placeholder="Inscrivez ici vos réflexions, questions à poser au formateur..."
                value={learnerNote}
                onChange={(e) => setLearnerNote(e.target.value)}
                className="min-h-[120px] resize-none text-xs"
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
