"use client";

import { MessageSquare, Paperclip, Send, User, Users } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useMessagerie } from "@/hooks/use-apprenant-data";

export function DiscussionFormateurCohorte() {
  const { activeChannel, setActiveChannel, messageInput, setMessageInput, messages, sendMessage } = useMessagerie();

  return (
    <div className="grid h-[calc(100vh-14rem)] min-h-[500px] grid-cols-1 gap-6 lg:grid-cols-12">
      {/* Channels Sidebar */}
      <Card className="flex flex-col border-border/60 shadow-xs lg:col-span-4">
        <CardHeader className="border-b pb-3">
          <CardTitle className="font-semibold text-base">Canaux de Discussion</CardTitle>
          <CardDescription className="text-muted-foreground text-xs">
            Échanges directs avec l'équipe pédagogique et vos pairs.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 space-y-1.5 overflow-y-auto p-2">
          {/* Formateur Channel Button */}
          <button
            type="button"
            onClick={() => setActiveChannel("formateur")}
            className={`flex w-full items-center justify-between rounded-lg border p-3 text-left transition-colors ${
              activeChannel === "formateur"
                ? "border-primary/40 bg-primary/10 font-semibold text-foreground"
                : "border-border/40 bg-card text-muted-foreground hover:bg-muted/40"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-primary/15 p-2 text-primary">
                <User className="h-4 w-4" />
              </div>
              <div>
                <span className="block font-medium text-xs">Fil Direct Formateur</span>
                <span className="text-[10px] text-muted-foreground">Dr. Ousmane Sow</span>
              </div>
            </div>
            <Badge variant="secondary" className="font-mono text-[10px]">
              Direct
            </Badge>
          </button>

          {/* Cohorte Channel Button */}
          <button
            type="button"
            onClick={() => setActiveChannel("cohorte")}
            className={`flex w-full items-center justify-between rounded-lg border p-3 text-left transition-colors ${
              activeChannel === "cohorte"
                ? "border-primary/40 bg-primary/10 font-semibold text-foreground"
                : "border-border/40 bg-card text-muted-foreground hover:bg-muted/40"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-blue-500/15 p-2 text-blue-500">
                <Users className="h-4 w-4" />
              </div>
              <div>
                <span className="block font-medium text-xs">Espace Cohorte</span>
                <span className="text-[10px] text-muted-foreground">Promo Onyx 2026 (28 membres)</span>
              </div>
            </div>
            <Badge variant="outline" className="font-mono text-[10px]">
              Groupe
            </Badge>
          </button>
        </CardContent>
      </Card>

      {/* Main Messages Thread */}
      <Card className="flex flex-col border-border/60 shadow-xs lg:col-span-8">
        <CardHeader className="border-b pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              <CardTitle className="font-semibold text-base">
                {activeChannel === "formateur"
                  ? "Discussion avec Dr. Ousmane Sow (Lead Formateur)"
                  : "Canal Général Promo Onyx 2026"}
              </CardTitle>
            </div>
            <Badge variant="outline" className="font-mono text-[10px]">
              Onixe Secure Chat
            </Badge>
          </div>
        </CardHeader>

        {/* Message Feed Area */}
        <CardContent className="flex-1 space-y-4 overflow-y-auto bg-muted/10 p-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-3 ${m.sender === "Aminata Diallo" ? "flex-row-reverse" : "flex-row"}`}
            >
              <Avatar className="mt-0.5 h-7 w-7">
                <AvatarImage src={m.avatar} alt={m.sender} />
                <AvatarFallback>{m.sender[0]}</AvatarFallback>
              </Avatar>

              <div
                className={`max-w-[80%] space-y-1 rounded-lg p-3 text-xs ${
                  m.sender === "Aminata Diallo"
                    ? "rounded-tr-none bg-primary text-primary-foreground"
                    : "rounded-tl-none border border-border/60 bg-card text-foreground"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-semibold text-[11px]">{m.sender}</span>
                  <span className="text-[9px] opacity-75">{m.time}</span>
                </div>
                <p className="leading-relaxed">{m.content}</p>
              </div>
            </div>
          ))}
        </CardContent>

        {/* Message Input Bar */}
        <div className="border-t bg-card p-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="flex items-center gap-2"
          >
            <Button type="button" variant="ghost" size="icon" className="h-9 w-9 shrink-0 text-muted-foreground">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Input
              placeholder="Rédigez votre message pour la communauté ou le formateur..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              className="h-9 text-xs"
            />
            <Button type="submit" size="sm" className="h-9 shrink-0 px-3 font-medium">
              <Send className="mr-1 h-3.5 w-3.5" /> Envoyer
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
