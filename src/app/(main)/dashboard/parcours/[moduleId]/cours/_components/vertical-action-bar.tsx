"use client";

import * as React from "react";
import {
  Bot,
  Keyboard,
  MessageSquare,
  PenTool,
  Send,
  Sparkles,
  User,
  X,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type ActiveTab = "ia" | "comments" | "notes" | null;

export function VerticalActionBar({
  lessonTitle,
  instructorName,
}: {
  lessonTitle: string;
  instructorName: string;
}) {
  const [activeTab, setActiveTab] = React.useState<ActiveTab>(null);

  // Écoute de la touche Échap pour fermer le panneau flottant
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveTab(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // IA State
  const [iaQuestion, setIaQuestion] = React.useState("");
  const [iaMessages, setIaMessages] = React.useState<
    Array<{ sender: "user" | "ia"; text: string }>
  >([
    {
      sender: "ia",
      text: `Bonjour ! Je suis votre tuteur IA pour la leçon "${lessonTitle}". Posez-moi vos questions pour éclaircir un concept abordé par ${instructorName}.`,
    },
  ]);

  // Comments State
  const [commentText, setCommentText] = React.useState("");
  const [comments, setComments] = React.useState([
    {
      id: "1",
      author: "Moussa Sène",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      date: "Hier à 14:32",
      text: "Est-ce qu'on aura les slides de la séance visio en format PDF téléchargeable ?",
    },
    {
      id: "2",
      author: instructorName,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
      date: "Hier à 15:10",
      text: "Oui Moussa, ils sont disponibles juste en dessous du lecteur dans la section 'Supports de cours'.",
      isInstructor: true,
    },
  ]);

  // Notes State
  const [notes, setNotes] = React.useState(
    "Points importants de la session :\n- Penser à découper les composants.\n- Revoir la méthode d'optimisation."
  );

  const handleSendIa = (e: React.FormEvent) => {
    e.preventDefault();
    if (!iaQuestion.trim()) return;
    const userQ = iaQuestion;
    setIaMessages((prev) => [...prev, { sender: "user", text: userQ }]);
    setIaQuestion("");

    setTimeout(() => {
      setIaMessages((prev) => [
        ...prev,
        {
          sender: "ia",
          text: `Sur la question "${userQ}" : c'est un point clé de la séance. Assurez-vous de bien structurer la logique et de tester unitairement votre solution.`,
        },
      ]);
    }, 600);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setComments((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        author: "Aminata Diallo",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
        date: "À l'instant",
        text: commentText,
      },
    ]);
    setCommentText("");
  };

  return (
    <div className="relative flex items-start">
      {/* Barre d'outils Verticale 3 Boutons */}
      <div className="flex flex-col items-center gap-2.5 rounded-xl border border-border/60 bg-card/90 p-1.5 shadow-sm">
        {/* 1. Onglet IA */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={activeTab === "ia" ? "default" : "ghost"}
              size="icon"
              onClick={() => setActiveTab(activeTab === "ia" ? null : "ia")}
              className={`size-10 rounded-lg transition-all ${
                activeTab === "ia"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Bot className="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p className="text-xs font-medium">Assistant IA Pédagogique</p>
          </TooltipContent>
        </Tooltip>

        {/* 2. Onglet Commentaires */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={activeTab === "comments" ? "default" : "ghost"}
              size="icon"
              onClick={() => setActiveTab(activeTab === "comments" ? null : "comments")}
              className={`size-10 rounded-lg transition-all ${
                activeTab === "comments"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <MessageSquare className="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p className="text-xs font-medium">Commentaires & Questions</p>
          </TooltipContent>
        </Tooltip>

        {/* 3. Onglet Notes */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={activeTab === "notes" ? "default" : "ghost"}
              size="icon"
              onClick={() => setActiveTab(activeTab === "notes" ? null : "notes")}
              className={`size-10 rounded-lg transition-all ${
                activeTab === "notes"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <PenTool className="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p className="text-xs font-medium">Mes Notes de Session</p>
          </TooltipContent>
        </Tooltip>
      </div>

      {/* PANNEAU FLOTTANT SUPERPOSÉ AVEC INDICATION DE FERMETURE EXPLICITE */}
      {activeTab && (
        <div className="absolute right-14 top-0 z-40 flex h-[620px] w-80 sm:w-96 flex-col rounded-2xl border border-border/80 bg-background shadow-2xl backdrop-blur-xl transition-all animate-in fade-in slide-in-from-right-4">
          {/* Header avec bouton et indication de fermeture claire */}
          <div className="flex items-center justify-between border-b px-4 py-3 bg-muted/20 rounded-t-2xl">
            <div className="flex items-center gap-2">
              {activeTab === "ia" && (
                <>
                  <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Sparkles className="size-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-foreground">Assistant IA Pédagogique</h3>
                    <p className="text-[10px] text-muted-foreground">Tuteur interactif 24/7</p>
                  </div>
                </>
              )}
              {activeTab === "comments" && (
                <>
                  <div className="flex size-7 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600">
                    <MessageSquare className="size-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-foreground">Commentaires de Session</h3>
                    <p className="text-[10px] text-muted-foreground">{comments.length} messages</p>
                  </div>
                </>
              )}
              {activeTab === "notes" && (
                <>
                  <div className="flex size-7 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600">
                    <PenTool className="size-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-foreground">Bloc-notes Personnel</h3>
                    <p className="text-[10px] text-muted-foreground">Sauvegarde automatique</p>
                  </div>
                </>
              )}
            </div>

            {/* Indication et bouton fermer explicites */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiveTab(null)}
              className="h-7 px-2 text-xs gap-1 font-medium text-muted-foreground hover:text-foreground"
            >
              <X className="size-3.5" />
              <span>Fermer</span>
              <kbd className="hidden sm:inline text-[9px] font-mono opacity-60">Esc</kbd>
            </Button>
          </div>

          {/* Panel Body */}
          <div className="flex-1 overflow-y-auto p-4 text-xs">
            {/* IA Tab */}
            {activeTab === "ia" && (
              <div className="flex h-full flex-col justify-between gap-3">
                <ScrollArea className="flex-1 pr-2">
                  <div className="space-y-3">
                    {iaMessages.map((msg, i) => (
                      <div
                        key={i}
                        className={`flex gap-2 text-xs ${
                          msg.sender === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        {msg.sender === "ia" && (
                          <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary text-[10px] font-bold">
                            IA
                          </div>
                        )}
                        <div
                          className={`max-w-[85%] rounded-lg p-2.5 leading-relaxed ${
                            msg.sender === "user"
                              ? "bg-primary text-primary-foreground"
                              : "border border-border/60 bg-muted/40 text-foreground"
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <form onSubmit={handleSendIa} className="flex gap-2 border-t pt-2">
                  <Input
                    placeholder="Posez votre question à l'IA..."
                    value={iaQuestion}
                    onChange={(e) => setIaQuestion(e.target.value)}
                    className="text-xs h-8"
                  />
                  <Button type="submit" size="sm" className="h-8 px-2.5">
                    <Send className="size-3" />
                  </Button>
                </form>
              </div>
            )}

            {/* Comments Tab */}
            {activeTab === "comments" && (
              <div className="flex h-full flex-col justify-between gap-3">
                <ScrollArea className="flex-1 pr-2">
                  <div className="space-y-3">
                    {comments.map((comment) => (
                      <div key={comment.id} className="space-y-1 border-b border-border/40 pb-2.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <Avatar className="size-5">
                              <AvatarImage src={comment.avatar} />
                              <AvatarFallback className="text-[9px]">
                                {comment.author.slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-semibold text-xs text-foreground">
                              {comment.author}
                            </span>
                            {comment.isInstructor && (
                              <Badge className="bg-primary/10 text-primary border-0 text-[9px] px-1 py-0">
                                Enseignant
                              </Badge>
                            )}
                          </div>
                          <span className="text-[10px] text-muted-foreground">{comment.date}</span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed pl-6">
                          {comment.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <form onSubmit={handleAddComment} className="flex gap-2 border-t pt-2">
                  <Input
                    placeholder="Poser une question..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="text-xs h-8"
                  />
                  <Button type="submit" size="sm" className="h-8 px-2.5">
                    <Send className="size-3" />
                  </Button>
                </form>
              </div>
            )}

            {/* Notes Tab */}
            {activeTab === "notes" && (
              <div className="flex h-full flex-col gap-2">
                <p className="text-[11px] text-muted-foreground">
                  Notes sauvegardées pour la session <strong className="text-foreground">"{lessonTitle}"</strong>.
                </p>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Inscrivez vos notes personnelles..."
                  className="flex-1 resize-none text-xs font-mono leading-relaxed"
                />
                <div className="flex items-center justify-between text-[11px] text-muted-foreground border-t pt-2">
                  <span>✓ Sauvegardé automatiquement</span>
                  <Button size="xs" variant="outline">
                    Exporter
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
