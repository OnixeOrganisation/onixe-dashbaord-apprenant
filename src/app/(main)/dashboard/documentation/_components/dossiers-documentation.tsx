"use client";

import { useState } from "react";

import { BookMarked, Download, FileText, Folder, FolderOpen, Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useDocumentationEcole } from "@/hooks/use-apprenant-data";

export function DossiersDocumentation() {
  const { folders, downloadDoc } = useDocumentationEcole();
  const [selectedFolderId, setSelectedFolderId] = useState<string>("folder-1");
  const [searchQuery, setSearchQuery] = useState("");

  const activeFolder = folders.find((f) => f.id === selectedFolderId) || folders[0];

  const filteredDocs = activeFolder.docs.filter((d) => d.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      {/* Sidebar Folders Category List */}
      <Card className="h-fit border-border/60 shadow-xs lg:col-span-4">
        <CardHeader className="border-b pb-3">
          <div className="flex items-center gap-2">
            <BookMarked className="h-5 w-5 text-primary" />
            <CardTitle className="font-semibold text-base">Dossiers de l'École</CardTitle>
          </div>
          <CardDescription className="text-muted-foreground text-xs">
            Catégories de documentation officielle et guides pédagogiques.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 p-2">
          {folders.map((folder) => (
            <button
              key={folder.id}
              type="button"
              onClick={() => setSelectedFolderId(folder.id)}
              className={`flex w-full items-center justify-between rounded-lg border p-3 text-left transition-colors ${
                selectedFolderId === folder.id
                  ? "border-primary/40 bg-primary/10 font-semibold text-foreground"
                  : "border-border/40 bg-card text-muted-foreground hover:bg-muted/30"
              }`}
            >
              <div className="flex items-center gap-2.5">
                {selectedFolderId === folder.id ? (
                  <FolderOpen className="h-5 w-5 shrink-0 text-primary" />
                ) : (
                  <Folder className="h-5 w-5 shrink-0 text-muted-foreground" />
                )}
                <div>
                  <h4 className="line-clamp-1 font-semibold text-foreground text-xs">{folder.name}</h4>
                  <span className="text-[10px] text-muted-foreground">{folder.documentCount} documents</span>
                </div>
              </div>
            </button>
          ))}
        </CardContent>
      </Card>

      {/* Main Folder Document Viewer */}
      <Card className="flex flex-col border-border/60 shadow-xs lg:col-span-8">
        <CardHeader className="border-b pb-3">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 font-semibold text-lg">
                <FolderOpen className="h-5 w-5 text-primary" /> {activeFolder.name}
              </CardTitle>
              <CardDescription className="mt-1 text-muted-foreground text-xs">
                {activeFolder.description}
              </CardDescription>
            </div>
            <div className="relative w-full sm:w-60">
              <Search className="absolute top-2.5 left-2.5 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                placeholder="Rechercher dans ce dossier..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-8 pl-8 text-xs"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 p-4">
          {filteredDocs.length > 0 ? (
            filteredDocs.map((doc, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-3 rounded-lg border border-border/50 bg-card p-3.5 text-xs transition-colors hover:bg-muted/20"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0 rounded-md bg-primary/10 p-2 text-primary">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h5 className="font-semibold text-foreground text-xs">{doc.title}</h5>
                      <Badge variant="outline" className="font-mono text-[10px]">
                        {doc.size}
                      </Badge>
                    </div>
                    <p className="mt-0.5 text-[10px] text-muted-foreground">
                      Dernière révision : {doc.updated} • Document officiel Onixe
                    </p>
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={() => downloadDoc(doc.title)}
                  size="sm"
                  variant="outline"
                  className="shrink-0 font-medium text-xs"
                >
                  <Download className="mr-1.5 h-3.5 w-3.5" /> Télécharger
                </Button>
              </div>
            ))
          ) : (
            <p className="py-8 text-center text-muted-foreground text-xs">
              Aucun document ne correspond à votre recherche.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
