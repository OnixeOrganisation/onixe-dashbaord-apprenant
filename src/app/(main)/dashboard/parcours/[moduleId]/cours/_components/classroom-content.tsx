"use client";

import * as React from "react";
import {
  AlertCircle,
  CheckCircle2,
  Code2,
  Download,
  ExternalLink,
  FileText,
  Play,
  UploadCloud,
} from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ClassroomContent({
  lessonTitle,
  courseTitle,
  instructorName,
}: {
  lessonTitle: string;
  courseTitle: string;
  instructorName: string;
}) {
  const [isCompleted, setIsCompleted] = React.useState(false);
  const [homeworkLink, setHomeworkLink] = React.useState("");
  const [homeworkComment, setHomeworkComment] = React.useState("");
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleSubmitHomework = (e: React.FormEvent) => {
    e.preventDefault();
    if (!homeworkLink.trim()) {
      toast.error("Veuillez renseigner le lien ou le fichier de votre devoir.");
      return;
    }
    setIsSubmitted(true);
    toast.success("Votre devoir a été transmis à l'enseignant pour évaluation !");
  };

  return (
    <div className="space-y-6">
      {/* Video Player Card */}
      <Card className="overflow-hidden border-border/60 shadow-xs">
        <div className="relative aspect-video w-full bg-zinc-950 flex flex-col items-center justify-center text-white">
          <div className="relative flex size-16 items-center justify-center rounded-full bg-primary/20 text-primary transition-transform hover:scale-105 cursor-pointer">
            <Play className="size-8 fill-primary" />
          </div>
          <p className="mt-4 text-sm font-semibold">{lessonTitle}</p>
          <span className="text-xs text-zinc-400 mt-0.5">
            Séance HD • Enseignant : {instructorName} • Replay & Visio
          </span>
        </div>

        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b py-3">
          <div>
            <span className="text-xs font-mono text-muted-foreground">{courseTitle}</span>
            <CardTitle className="text-lg font-bold text-foreground">{lessonTitle}</CardTitle>
          </div>
          <Button
            size="sm"
            variant={isCompleted ? "outline" : "default"}
            onClick={() => {
              setIsCompleted(!isCompleted);
              toast.success(
                !isCompleted
                  ? "Leçon marquée comme terminée !"
                  : "Leçon marquée comme non terminée."
              );
            }}
            className="text-xs font-medium"
          >
            <CheckCircle2
              className={`mr-1.5 size-4 ${isCompleted ? "text-emerald-500" : ""}`}
            />
            {isCompleted ? "Leçon terminée" : "Marquer comme terminée"}
          </Button>
        </CardHeader>
      </Card>

      {/* Rich Text Body - OpenClassrooms Style */}
      <Card className="border-border/60 shadow-xs">
        <CardContent className="p-6 space-y-6 text-foreground">
          {/* Section 1 : Introduction */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold tracking-tight text-foreground border-b pb-2">
              1. Contexte & Objectifs Pédagogiques
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Dans cette session, nous abordons en profondeur les principes fondamentaux de conception
              et d'implémentation. L'objectif est de structurer vos connaissances théoriques et de les
              traduire immédiatement par la pratique (Learning by Doing).
            </p>
            <div className="rounded-lg border-l-4 border-primary bg-primary/5 p-4 text-xs text-muted-foreground">
              <strong className="text-foreground block mb-1">Règle d'or de l'ingénieur :</strong>
              Toujours privilégier la clarté du code, la robustesse des types et la modularité des
              composants avant toute optimisation prématurée.
            </div>
          </section>

          {/* Section 2 : Démonstration & Code */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold tracking-tight text-foreground border-b pb-2">
              2. Exemple Pratique & Syntaxe
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Voici l'extrait de référence étudié lors de la séance. Observez attentivement la
              gestion des erreurs et le découpage fonctionnel :
            </p>
            <div className="overflow-x-auto rounded-lg border border-border/80 bg-zinc-950 p-4 font-mono text-xs text-zinc-100">
              <pre className="text-emerald-400">// Exemple de contrôleur robuste avec validation typée</pre>
              <pre className="mt-2 text-zinc-300">
{`export async function handleRequest(payload: RequestPayload): Promise<ServiceResult> {
  const validated = validateInputSchema(payload);
  if (!validated.success) {
    throw new ValidationError("Paramètres invalides", validated.errors);
  }

  const result = await database.transaction(async (tx) => {
    return await tx.records.create({ data: validated.data });
  });

  return { success: true, recordId: result.id };
}`}
              </pre>
            </div>
          </section>

          {/* Section 3 : Supports de cours téléchargeables */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold tracking-tight text-foreground border-b pb-2">
              3. Supports de Cours & Ressources Officielles
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="flex items-center justify-between rounded-lg border border-border/60 p-3 hover:bg-muted/40 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-md bg-rose-500/10 text-rose-600">
                    <FileText className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">Slides Présentation PDF</p>
                    <span className="text-[10px] text-muted-foreground">Support officiel • 4.2 Mo</span>
                  </div>
                </div>
                <Button size="icon" variant="ghost" className="size-8">
                  <Download className="size-4" />
                </Button>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-border/60 p-3 hover:bg-muted/40 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-md bg-blue-500/10 text-blue-600">
                    <Code2 className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">Code Source & Exercices</p>
                    <span className="text-[10px] text-muted-foreground">Dépôt GitHub • Branche TP</span>
                  </div>
                </div>
                <Button size="icon" variant="ghost" className="size-8">
                  <ExternalLink className="size-4" />
                </Button>
              </div>
            </div>
          </section>

          {/* Section 4 : Espace de Rendu du Devoir du Cours */}
          <section className="space-y-4 pt-4 border-t">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-foreground">
                  4. Remise du Devoir Pratique du Cours
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Les devoirs liés à ce cours se rendent directement ici pour correction par l'enseignant.
                </p>
              </div>
              <Badge className={isSubmitted ? "bg-emerald-500/15 text-emerald-600 border-0" : "bg-amber-500/15 text-amber-600 border-0"}>
                {isSubmitted ? "Devoir Soumis" : "En attente de rendu"}
              </Badge>
            </div>

            <form onSubmit={handleSubmitHomework} className="space-y-3 rounded-xl border border-border/60 bg-muted/20 p-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">
                  Lien de votre travail (URL GitHub, Google Drive ou Figma)
                </label>
                <Input
                  placeholder="https://github.com/mon-compte/tp-cours-onixe"
                  value={homeworkLink}
                  onChange={(e) => setHomeworkLink(e.target.value)}
                  className="text-xs h-9 bg-background"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">
                  Notes ou remarques à l'attention de {instructorName} (optionnel)
                </label>
                <Textarea
                  placeholder="Expliquez brièvement votre approche ou signalez les difficultés rencontrées..."
                  value={homeworkComment}
                  onChange={(e) => setHomeworkComment(e.target.value)}
                  className="text-xs min-h-[80px] bg-background"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                  <AlertCircle className="size-3.5 text-amber-500" /> Date limite : Demain à 23h59
                </span>
                <Button type="submit" size="sm" className="text-xs font-medium gap-1.5">
                  <UploadCloud className="size-4" />
                  {isSubmitted ? "Mettre à jour le devoir" : "Soumettre le devoir"}
                </Button>
              </div>
            </form>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
