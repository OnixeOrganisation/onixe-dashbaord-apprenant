"use client";

import { CheckCircle2, Circle, FileText, ListOrdered, PlayCircle } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCoursLesson } from "@/hooks/use-apprenant-data";

export function SommaireChapitres({ moduleId }: { moduleId: string }) {
  const { courseData, activeLessonId, setActiveLessonId, completedLessons } = useCoursLesson(moduleId);

  return (
    <Card className="flex h-full flex-col border-border/60 shadow-xs">
      <CardHeader className="border-b pb-3">
        <div className="flex items-center gap-2">
          <ListOrdered className="h-5 w-5 text-primary" />
          <CardTitle className="font-semibold text-base">Sommaire du Cours</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-1 space-y-4 overflow-y-auto p-2">
        {courseData.chapters.map((chap) => (
          <div key={chap.id} className="space-y-1.5">
            <h4 className="rounded-md bg-muted/30 px-2 py-1 font-semibold text-foreground text-xs">{chap.title}</h4>

            <div className="space-y-1">
              {chap.lessons.map((les) => {
                const isActive = activeLessonId === les.id;
                const isCompleted = completedLessons.includes(les.id);

                return (
                  <button
                    key={les.id}
                    type="button"
                    onClick={() => setActiveLessonId(les.id)}
                    className={`flex w-full items-center justify-between rounded-md border p-2.5 text-left text-xs transition-colors ${
                      isActive
                        ? "border-primary/40 bg-primary/10 font-semibold text-foreground"
                        : "border-border/40 bg-card text-muted-foreground hover:bg-muted/30"
                    }`}
                  >
                    <div className="flex min-w-0 items-center gap-2 pr-1">
                      {isCompleted ? (
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                      ) : (
                        <Circle className="h-4 w-4 shrink-0 text-muted-foreground" />
                      )}
                      <span className="truncate">{les.title}</span>
                    </div>

                    <div className="flex shrink-0 items-center gap-1.5 font-mono text-[10px]">
                      {les.type === "video" ? (
                        <PlayCircle className="h-3.5 w-3.5 text-primary" />
                      ) : (
                        <FileText className="h-3.5 w-3.5 text-blue-500" />
                      )}
                      <span>{les.duration}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
