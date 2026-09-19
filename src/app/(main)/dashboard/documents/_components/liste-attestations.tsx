"use client";

import { Download, FileCheck, FolderDown } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useDocuments } from "@/hooks/use-apprenant-data";

export function ListeAttestations() {
  const { documents, downloadDoc } = useDocuments();

  return (
    <Card className="border-border/60 shadow-xs">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <FolderDown className="h-5 w-5 text-primary" />
          <CardTitle className="font-semibold text-base">Attestations & Certificats Académiques</CardTitle>
        </div>
        <CardDescription className="text-muted-foreground text-xs">
          Documents officiels générés et horodatés numériquement par l'établissement.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between gap-3 rounded-lg border border-border/50 bg-card p-3.5 text-xs transition-colors hover:bg-muted/20"
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 shrink-0 rounded-md bg-primary/10 p-2 text-primary">
                <FileCheck className="h-4 w-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-foreground text-xs">{doc.title}</h4>
                  <Badge variant="outline" className="font-mono text-[10px]">
                    {doc.type}
                  </Badge>
                </div>
                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  Délivré le : {doc.date} • Format : {doc.format} ({doc.size})
                </p>
              </div>
            </div>

            <Button
              onClick={() => downloadDoc(doc.title)}
              size="sm"
              variant="outline"
              className="shrink-0 border-border/80 font-medium text-xs"
            >
              <Download className="mr-1.5 h-3.5 w-3.5" /> Télécharger
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
