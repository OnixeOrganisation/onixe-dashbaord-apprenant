"use client";

import { Code2, ExternalLink, Globe, Lock, Share2 } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useProfil } from "@/hooks/use-apprenant-data";

export function PortfolioProjets() {
  const { portfolio, togglePublic } = useProfil();

  const copyShareLink = (title: string) => {
    navigator.clipboard.writeText(`https://onixe.academy/portfolio/adiallo`);
    toast.success(`Lien public du portfolio copié`, {
      description: `Partage du projet : ${title}`,
    });
  };

  return (
    <Card className="border-border/60 shadow-xs">
      <CardHeader className="pb-3">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Code2 className="h-5 w-5 text-primary" />
              <CardTitle className="font-semibold text-base">Portfolio des Projets de Formation</CardTitle>
            </div>
            <CardDescription className="text-muted-foreground text-xs">
              Projets réels validés durant votre parcours. Activez l'option "Public" pour rendre le projet visible aux
              recruteurs partenaires Onixe.
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => copyShareLink("Portfolio Aminata Diallo")}
            className="w-fit font-medium text-xs"
          >
            <Share2 className="mr-1.5 h-3.5 w-3.5" /> Copier mon lien Portfolio Public
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {portfolio.map((item) => (
            <div
              key={item.id}
              className={`flex flex-col justify-between rounded-lg border p-4 transition-colors ${
                item.isPublic ? "border-primary/30 bg-card" : "border-border/50 bg-muted/20 opacity-85"
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-muted-foreground">{item.module}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-[11px] text-muted-foreground">
                      {item.isPublic ? "Public" : "Privé"}
                    </span>
                    <Switch checked={item.isPublic} onCheckedChange={() => togglePublic(item.id)} />
                  </div>
                </div>

                <h4 className="flex items-center gap-1.5 font-semibold text-foreground text-sm">
                  {item.title}
                  {item.isPublic ? (
                    <Globe className="h-3.5 w-3.5 text-emerald-500" />
                  ) : (
                    <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                  )}
                </h4>

                <p className="text-muted-foreground text-xs leading-relaxed">{item.description}</p>
              </div>

              <div className="mt-2 space-y-3 border-border/40 border-t pt-3">
                <div className="flex flex-wrap gap-1">
                  {item.tags.map((t, idx) => (
                    <Badge key={idx} variant="secondary" className="px-1.5 py-0 font-mono text-[10px]">
                      {t}
                    </Badge>
                  ))}
                </div>

                {item.githubUrl && (
                  <Button variant="ghost" size="sm" asChild className="h-7 px-2 text-[11px] text-muted-foreground">
                    <a href={item.githubUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-1 h-3 w-3" /> Voir le Repository Git
                    </a>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
