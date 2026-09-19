"use client";

import { useState } from "react";

import { HelpCircle, Send, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAssiduite } from "@/hooks/use-apprenant-data";

export function FormulaireSignalement() {
  const { submitSignalement } = useAssiduite();
  const [requestType, setRequestType] = useState("DELAI");
  const [moduleName, setModuleName] = useState("Backend Architecture (MOD-201)");
  const [reason, setReason] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) return;
    submitSignalement({ type: requestType, module: moduleName, reason });
    setReason("");
  };

  return (
    <Card className="border-border/60 shadow-xs">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-primary" />
          <CardTitle className="font-semibold text-base">Signalement de Difficulté ou Demande de Délai</CardTitle>
        </div>
        <CardDescription className="text-muted-foreground text-xs">
          Transmettez une demande formelle à l'équipe pédagogique (justificatif médical, problème technique, besoin de
          tutorat).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-1.5">
              <span className="block font-medium text-foreground text-xs">Type de Demande</span>
              <Select value={requestType} onValueChange={setRequestType}>
                <SelectTrigger className="h-9 text-xs">
                  <SelectValue placeholder="Sélectionner le motif" />
                </SelectTrigger>
                <SelectContent className="text-xs">
                  <SelectItem value="DELAI">Demande de délai supplémentaire pour TP</SelectItem>
                  <SelectItem value="ABSENCE">Signalement d'absence à venir</SelectItem>
                  <SelectItem value="TUTORAT">Besoin de soutien / tutorat individuel</SelectItem>
                  <SelectItem value="TECHNIQUE">Problème d'équipement ou d'accès aux outils</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <span className="block font-medium text-foreground text-xs">Module Concerné</span>
              <Input
                value={moduleName}
                onChange={(e) => setModuleName(e.target.value)}
                className="h-9 text-xs"
                placeholder="ex: MOD-201 Backend Architecture"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="block font-medium text-foreground text-xs">Explication & Justification</span>
            <Textarea
              placeholder="Décrivez précisément votre situation, la durée souhaitée du délai ou le type d'assistance requis..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="min-h-[90px] resize-none text-xs"
              required
            />
          </div>

          <div className="flex items-center justify-between border-border/40 border-t pt-2">
            <div className="flex items-center gap-2 text-muted-foreground text-xs">
              <Button type="button" variant="outline" size="sm" className="h-8 border-dashed text-xs">
                <Upload className="mr-1 h-3.5 w-3.5" /> Joindre un justificatif (.PDF)
              </Button>
            </div>
            <Button type="submit" size="sm" className="px-4 font-medium">
              <Send className="mr-2 h-3.5 w-3.5" /> Soumettre la demande
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
