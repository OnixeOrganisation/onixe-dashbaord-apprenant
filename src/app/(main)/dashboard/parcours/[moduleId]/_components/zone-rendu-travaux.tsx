"use client";

import { AlertCircle, CheckCircle2, FileCheck, Loader2, UploadCloud, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useModuleDetail } from "@/hooks/use-apprenant-data";

export function ZoneRenduTravaux({ moduleId }: { moduleId: string }) {
  const {
    moduleDetail,
    selectedFile,
    setSelectedFile,
    submissionComment,
    setSubmissionComment,
    isSubmitting,
    hasSubmitted,
    handleSubmitWork,
  } = useModuleDetail(moduleId);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <Card className="border-border/60 shadow-xs">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UploadCloud className="h-5 w-5 text-primary" />
            <CardTitle className="font-semibold text-base">Zone de Rendu de Travail</CardTitle>
          </div>
          {hasSubmitted ? (
            <Badge className="border-0 bg-emerald-500/15 px-2 py-0.5 text-emerald-600 text-xs dark:text-emerald-400">
              <CheckCircle2 className="mr-1 h-3.5 w-3.5" /> Travail Rendu
            </Badge>
          ) : (
            <Badge variant="outline" className="font-mono text-xs">
              Échéance : {moduleDetail.deadline}
            </Badge>
          )}
        </div>
        <CardDescription className="text-muted-foreground text-xs">
          Téléversez votre archive de projet (ZIP, PDF ou TGZ - Max 50 MB).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmitWork} className="space-y-4">
          {/* File Upload Dropzone */}
          <div className="relative rounded-lg border-2 border-border/80 border-dashed bg-muted/20 p-6 text-center transition-colors hover:border-primary/50">
            <input
              type="file"
              accept=".zip,.pdf,.tgz,.tar.gz"
              onChange={handleFileChange}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              disabled={isSubmitting}
            />
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="rounded-full bg-primary/10 p-3 text-primary">
                <UploadCloud className="h-6 w-6" />
              </div>
              <div>
                <p className="font-semibold text-foreground text-xs">
                  Glissez-déposez votre fichier ici ou <span className="text-primary underline">parcourir</span>
                </p>
                <p className="mt-1 text-[11px] text-muted-foreground">Formats acceptés : .ZIP, .PDF, .TGZ (Max 50MB)</p>
              </div>
            </div>
          </div>

          {/* Selected File Preview Box */}
          {selectedFile && (
            <div className="flex items-center justify-between rounded-md border border-primary/30 bg-primary/5 p-3 text-xs">
              <div className="flex items-center gap-2.5">
                <FileCheck className="h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">{selectedFile.name}</p>
                  <p className="text-[10px] text-muted-foreground">
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Prêt pour envoi
                  </p>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setSelectedFile(null)}
                className="h-7 w-7 text-muted-foreground hover:text-destructive"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Comment Field */}
          <div className="space-y-1.5">
            <span className="block font-medium text-foreground text-xs">
              Commentaire ou note à l'attention du formateur
            </span>
            <Textarea
              placeholder="Précisez ici toute remarque technique ou instruction particulière pour la correction..."
              value={submissionComment}
              onChange={(e) => setSubmissionComment(e.target.value)}
              className="min-h-[70px] resize-none text-xs"
            />
          </div>

          {/* Submit Action Button */}
          <div className="flex items-center justify-between border-border/40 border-t pt-2">
            <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <AlertCircle className="h-3.5 w-3.5 text-amber-500" /> Soumission horodatée et signée
            </span>
            <Button type="submit" size="sm" disabled={isSubmitting || !selectedFile} className="px-4 font-medium">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" /> Transmissions en cours...
                </>
              ) : (
                "Confirmer le Rendu de Travail"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
