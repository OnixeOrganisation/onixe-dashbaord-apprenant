"use client";

import { Bell, Pin } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAccueil } from "@/hooks/use-apprenant-data";

export function FilAnnonces() {
  const { annonces } = useAccueil();

  return (
    <Card className="flex h-full flex-col border-border/60 shadow-xs">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          <CardTitle className="font-semibold text-lg tracking-tight">Annonces Académie</CardTitle>
        </div>
        <CardDescription className="text-muted-foreground text-xs">
          Communications officielles des formateurs et de la direction pédagogique.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 space-y-3.5">
        {annonces.map((annonce) => (
          <div
            key={annonce.id}
            className={`space-y-2 rounded-md border p-3.5 text-xs transition-colors ${
              annonce.isPinned ? "border-primary/20 bg-muted/40" : "border-border/50 bg-card"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={annonce.author.avatar} alt={annonce.author.name} />
                  <AvatarFallback>{annonce.author.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <span className="block font-semibold text-foreground text-xs leading-tight">
                    {annonce.author.name}
                  </span>
                  <span className="text-[10px] text-muted-foreground">{annonce.author.role}</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {annonce.isPinned && (
                  <Badge variant="outline" className="border-primary/30 px-1.5 py-0 text-[10px] text-primary">
                    <Pin className="mr-1 inline h-2.5 w-2.5" /> Épinglé
                  </Badge>
                )}
                <span className="text-[10px] text-muted-foreground">{annonce.date}</span>
              </div>
            </div>

            <h5 className="font-semibold text-foreground text-xs">{annonce.title}</h5>
            <p className="text-[11px] text-muted-foreground leading-relaxed">{annonce.content}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
