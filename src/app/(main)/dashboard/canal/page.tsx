"use client";

import * as React from "react";
import {
  Hash,
  MessageSquare,
  Paperclip,
  Send,
  Smile,
  Sparkles,
  User,
  Users,
} from "lucide-react";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAcademicStore } from "@/stores/academic/academic-store";

interface Message {
  id: string;
  author: string;
  role: string;
  avatar: string;
  timestamp: string;
  content: string;
  isInstructor?: boolean;
  isSelf?: boolean;
}

export default function PageCanal() {
  const getActiveCohorte = useAcademicStore((s) => s.getActiveCohorte);
  const getActiveEtablissement = useAcademicStore((s) => s.getActiveEtablissement);

  const activeCohorte = getActiveCohorte();
  const activeEtab = getActiveEtablissement();

  const [activeChannel, setActiveChannel] = React.useState("general");
  const [inputText, setInputText] = React.useState("");

  const channels = [
    { id: "general", name: "general-cohorte", desc: "Discussion générale et entraide", unread: 0 },
    { id: "annonces", name: "annonces-officielles", desc: "Informations administratives et pédagogiques", unread: 2 },
    { id: "algo", name: "cours-algorithmique", desc: "Questions sur le cours de Dr. Mamadou Diallo", unread: 0 },
    { id: "web", name: "cours-web-nextjs", desc: "Support technique React & Next.js", unread: 1 },
    { id: "projets", name: "projets-fil-rouge", desc: "Échanges sur les projets de fin de cursus", unread: 0 },
  ];

  const [messages, setMessages] = React.useState<Record<string, Message[]>>({
    general: [
      {
        id: "1",
        author: "Koffi Mensah",
        role: "Apprenant",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
        timestamp: "Aujourd'hui à 10:14",
        content: "Salut la promo ! Quelqu'un a réussi à reproduire le TP2 avec les schémas PostgreSQL ?",
      },
      {
        id: "2",
        author: "Sophie Martin",
        role: "Lead Formatrice",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
        timestamp: "Aujourd'hui à 10:30",
        content: "Bonjour Koffi, n'oublie pas de vérifier tes variables d'environnement dans le fichier .env.local !",
        isInstructor: true,
      },
      {
        id: "3",
        author: "Aminata Diallo",
        role: "Déléguée (Vous)",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
        timestamp: "Aujourd'hui à 10:35",
        content: "Merci Sophie ! On a revu ça en binôme, tout fonctionne maintenant. Hâte de la séance visio de jeudi.",
        isSelf: true,
      },
    ],
    annonces: [
      {
        id: "a1",
        author: "Dr. Amadou Ba",
        role: "Direction Pédagogique",
        avatar: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=100",
        timestamp: "Hier à 16:00",
        content: "Rappel à tous les étudiants de la cohorte : la date limite pour déposer le Jalon 2 de votre Projet Fil Rouge est fixée au 15 Novembre à 23h59.",
        isInstructor: true,
      },
    ],
    algo: [
      {
        id: "al1",
        author: "Dr. Mamadou Diallo",
        role: "Enseignant Algorithmique",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
        timestamp: "Lundi à 14:00",
        content: "Le corrigé du TP sur les arbres binaires de recherche est disponible dans la section supports du cours.",
        isInstructor: true,
      },
    ],
    web: [
      {
        id: "w1",
        author: "Patrick Ndong",
        role: "Apprenant",
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100",
        timestamp: "Hier à 11:20",
        content: "Une astuce pour la gestion du responsive avec Tailwind sur les tableaux ?",
      },
    ],
    projets: [
      {
        id: "p1",
        author: "Aïssatou Traoré",
        role: "Déléguée adjointe",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100",
        timestamp: "Il y a 2 jours",
        content: "N'hésitez pas à poser vos questions sur les soutenances à blanc prévues le mois prochain !",
      },
    ],
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: Message = {
      id: String(Date.now()),
      author: "Aminata Diallo",
      role: "Déléguée (Vous)",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
      timestamp: "À l'instant",
      content: inputText,
      isSelf: true,
    };

    setMessages((prev) => ({
      ...prev,
      [activeChannel]: [...(prev[activeChannel] || []), newMsg],
    }));

    setInputText("");
  };

  const currentChannelObj = channels.find((c) => c.id === activeChannel) || channels[0];
  const currentMessages = messages[activeChannel] || [];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-1 border-b border-border/50 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Canal de la Cohorte
            </h1>
            <Badge variant="outline" className="text-primary border-primary/30 text-xs">
              {activeCohorte.name}
            </Badge>
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Espace d'échange instantané unique entre apprenants et enseignants de <strong>{activeEtab.name}</strong>.
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
          <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Connecté en direct</span>
        </div>
      </div>

      {/* Main Slack/Discord Style Channel Layout */}
      <div className="grid h-[calc(100vh-14rem)] min-h-[550px] grid-cols-1 gap-4 lg:grid-cols-12 rounded-xl border border-border/60 bg-card overflow-hidden shadow-xs">
        {/* Left: Channels List */}
        <div className="border-r border-border/50 bg-muted/20 p-3 lg:col-span-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between px-2 pt-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Canaux Thématiques
              </span>
              <Badge variant="secondary" className="text-[10px]">{channels.length}</Badge>
            </div>

            <div className="space-y-1">
              {channels.map((chan) => (
                <button
                  key={chan.id}
                  onClick={() => setActiveChannel(chan.id)}
                  className={`w-full text-left rounded-lg p-2.5 transition-all text-xs flex items-center justify-between ${
                    activeChannel === chan.id
                      ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <Hash className="size-4 shrink-0" />
                    <span className="truncate">{chan.name}</span>
                  </div>
                  {chan.unread > 0 && activeChannel !== chan.id && (
                    <Badge className="bg-primary text-primary-foreground text-[10px] px-1.5 py-0">
                      {chan.unread}
                    </Badge>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-border/40 bg-card p-2.5 text-xs text-muted-foreground">
            <span className="font-semibold text-foreground block mb-0.5">Règle de bienséance</span>
            Posez vos questions dans le canal approprié pour obtenir une réponse rapide des enseignants.
          </div>
        </div>

        {/* Right: Message Stream */}
        <div className="lg:col-span-8 flex flex-col justify-between p-4 bg-background">
          {/* Active Channel Header */}
          <div className="border-b border-border/50 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-md bg-primary/10 text-primary">
                <Hash className="size-4" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-foreground">#{currentChannelObj.name}</h3>
                <p className="text-[11px] text-muted-foreground">{currentChannelObj.desc}</p>
              </div>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <ScrollArea className="flex-1 my-4 pr-3">
            <div className="space-y-4">
              {currentMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3 text-xs ${
                    msg.isSelf ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <Avatar className="size-8 rounded-lg shrink-0">
                    <AvatarImage src={msg.avatar} alt={msg.author} />
                    <AvatarFallback className="rounded-lg text-[10px] font-bold">
                      {msg.author.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>

                  <div className={`space-y-1 max-w-[80%] ${msg.isSelf ? "text-right" : "text-left"}`}>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground text-xs">{msg.author}</span>
                      {msg.isInstructor && (
                        <Badge className="bg-primary/15 text-primary border-0 text-[9px] px-1.5 py-0">
                          Formateur
                        </Badge>
                      )}
                      <span className="text-[10px] text-muted-foreground">{msg.timestamp}</span>
                    </div>

                    <div
                      className={`rounded-xl p-3 leading-relaxed text-xs ${
                        msg.isSelf
                          ? "bg-primary text-primary-foreground rounded-tr-xs"
                          : "border border-border/60 bg-muted/30 text-foreground rounded-tl-xs"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Input Box */}
          <form onSubmit={handleSendMessage} className="border-t border-border/50 pt-3 flex gap-2 items-center">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Envoyer un message dans #${currentChannelObj.name}...`}
              className="text-xs h-9 flex-1"
            />
            <Button type="submit" size="sm" className="h-9 px-3 gap-1.5">
              <Send className="size-3.5" />
              <span className="hidden sm:inline text-xs">Envoyer</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
