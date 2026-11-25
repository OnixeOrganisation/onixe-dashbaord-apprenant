"use client";

import * as React from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  ExternalLink,
  GraduationCap,
  MapPin,
  School,
  User,
  Video,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAcademicStore } from "@/stores/academic/academic-store";

interface EventItem {
  id: string;
  titre: string;
  type: "VISIO" | "DEADLINE" | "EXAMEN" | "EVENEMENT";
  cours: string;
  heure: string;
  date: string;
  intervenant: string;
  lieu: string;
  jour: number; // jour du mois d'octobre 2026
  joursRestants: number; // calcul par rapport au 18 octobre
  description: string;
  lienRejoindre?: string;
}

export function VueCalendrierCohorte() {
  const getActiveCohorte = useAcademicStore((s) => s.getActiveCohorte);
  const getActiveEtablissement = useAcademicStore((s) => s.getActiveEtablissement);

  const activeCohorte = getActiveCohorte();
  const activeEtab = getActiveEtablissement();

  const [currentMonth] = React.useState("Octobre 2026");
  const [filterType, setFilterType] = React.useState<string>("ALL");
  const [selectedEvent, setSelectedEvent] = React.useState<EventItem | null>(null);

  // Événements avec calcul des jours restants (référence : 18 octobre 2026)
  const events: EventItem[] = [
    {
      id: "ev-1",
      titre: "Séance Visio Live : Conception Modèles de Données",
      type: "VISIO",
      cours: "Bases de Données Relationnelles & SQL",
      heure: "14h00 - 16h00 GMT",
      date: "Jeudi 15 Octobre 2026",
      intervenant: "Ibrahima Koné",
      lieu: "Salle Visio Zoom",
      jour: 15,
      joursRestants: -3,
      description: "Séance de modélisation entité-relation et normalisation des tables relationnelles.",
      lienRejoindre: "https://zoom.us/j/onixe-db-class",
    },
    {
      id: "ev-2",
      titre: "Date Limite : Rendu TP2 Architecture API REST",
      type: "DEADLINE",
      cours: "Programmation Web & Frameworks",
      heure: "23h59 GMT",
      date: "Vendredi 19 Octobre 2026",
      intervenant: "Sophie Martin",
      lieu: "Espace Devoir du Cours",
      jour: 19,
      joursRestants: 1, // Moins de 7 jours -> Rouge (urgent)
      description: "Dépôt obligatoire de votre repository GitHub contenant les endpoints CRUD sécurisés.",
    },
    {
      id: "ev-3",
      titre: "Permanence Pédagogique & Revue Algorithmique",
      type: "VISIO",
      cours: "Algorithmique & Structures",
      heure: "10h00 - 12h00 GMT",
      date: "Mardi 21 Octobre 2026",
      intervenant: "Dr. Mamadou Diallo",
      lieu: "Canal #cours-algorithmique",
      jour: 21,
      joursRestants: 3, // Moins de 7 jours -> Rouge (urgent)
      description: "Session de questions-réponses et déblocage sur les arbres binaires.",
      lienRejoindre: "https://zoom.us/j/onixe-algo-class",
    },
    {
      id: "ev-4",
      titre: "Évaluation Écrite : Algorithmes de Tri & Graphes",
      type: "EXAMEN",
      cours: "Algorithmique & Structures",
      heure: "15h00 - 17h00 GMT",
      date: "Jeudi 25 Octobre 2026",
      intervenant: "Dr. Mamadou Diallo",
      lieu: "Plateforme d'examen en ligne",
      jour: 25,
      joursRestants: 7, // 7 jours -> Orange
      description: "Épreuve individuelle chronométrée de 2 heures portant sur l'ensemble du socle algorithmique.",
    },
    {
      id: "ev-5",
      titre: "Cérémonie d'Intégration & Conférence Tech",
      type: "EVENEMENT",
      cours: "Vie Académique",
      heure: "09h00 - 13h00 GMT",
      date: "Samedi 27 Octobre 2026",
      intervenant: "Direction Onixe",
      lieu: "Amphithéâtre Campus Dakar & Streaming",
      jour: 27,
      joursRestants: 9, // Plus de 7 jours -> Vert (normal)
      description: "Rencontre avec les alumni, présentation des opportunités de stage et networking.",
    },
    {
      id: "ev-6",
      titre: "Point d'Étape : Jalon 2 Projet Fil Rouge",
      type: "DEADLINE",
      cours: "Projets Complets",
      heure: "23h59 GMT",
      date: "Mercredi 30 Octobre 2026",
      intervenant: "Comité de Suivi",
      lieu: "Espace Projets Complets",
      jour: 30,
      joursRestants: 12, // Plus de 7 jours -> Vert (normal)
      description: "Remise du code source backend et des schémas d'architecture du projet de synthèse.",
    },
  ];

  const filteredEvents = events.filter((ev) => {
    if (filterType === "ALL") return true;
    return ev.type === filterType;
  });

  // 3 Couleurs d'échéance :
  // - Vert (Normal) : Échéance à plus de 7 jours (> 7j)
  // - Orange : Échéance à 7 jours (<= 7j et > 2j)
  // - Rouge : Échéance urgente à moins de 3 jours ou immédiate
  const getUrgencyColor = (joursRestants: number) => {
    if (joursRestants > 7) {
      return {
        badge: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
        pill: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20",
        label: "À venir (> 7 jours)",
        dot: "bg-emerald-500",
      };
    }
    if (joursRestants <= 7 && joursRestants >= 3) {
      return {
        badge: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
        pill: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30 hover:bg-amber-500/20",
        label: "Proche (Sous 7 jours)",
        dot: "bg-amber-500",
      };
    }
    return {
      badge: "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30",
      pill: "bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/30 hover:bg-rose-500/20",
      label: "Urgent (Moins de 7 jours)",
      dot: "bg-rose-500",
    };
  };

  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
  const startDayOffset = 3; // Décalage jeudi pour octobre 2026

  return (
    <div className="space-y-6">
      {/* Header sans badge 'Plein Écran' */}
      <div className="flex flex-col gap-3 border-b border-border/50 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Calendrier Général de l'Établissement
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Planning officiel des séances, examens et échéances pour <strong>{activeEtab.name}</strong> • {activeCohorte.name}.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Légende des 3 couleurs */}
          <div className="hidden sm:flex items-center gap-3 text-xs border rounded-lg px-3 py-1.5 bg-muted/20">
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-emerald-500" /> &gt; 7 jours
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-amber-500" /> À 7 jours
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-rose-500" /> &lt; 7 jours
            </span>
          </div>

          <Button
            size="sm"
            variant="outline"
            onClick={() => toast.success("Export du calendrier .ics téléchargé avec succès !")}
            className="text-xs gap-1.5 h-8"
          >
            <Download className="size-3.5" /> Exporter (.ics)
          </Button>
        </div>
      </div>

      {/* Full-Width Month Grid */}
      <Card className="border-border/60 shadow-xs overflow-hidden">
        {/* Month Navigation Toolbar */}
        <div className="flex items-center justify-between border-b border-border/50 bg-muted/20 px-4 py-3">
          <div className="flex items-center gap-2">
            <CalendarIcon className="size-5 text-primary" />
            <span className="font-bold text-base text-foreground">{currentMonth}</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Type Filters */}
            <Tabs defaultValue="ALL" onValueChange={setFilterType} className="w-fit">
              <TabsList className="h-8 p-0.5 text-xs">
                <TabsTrigger value="ALL" className="text-xs px-2.5">Tous</TabsTrigger>
                <TabsTrigger value="VISIO" className="text-xs px-2.5">Visios</TabsTrigger>
                <TabsTrigger value="DEADLINE" className="text-xs px-2.5">Devoirs</TabsTrigger>
                <TabsTrigger value="EXAMEN" className="text-xs px-2.5">Examens</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Days of Week Header */}
        <div className="grid grid-cols-7 border-b border-border/40 bg-muted/40 text-center font-semibold text-xs text-muted-foreground py-2">
          <span>Lun</span>
          <span>Mar</span>
          <span>Mer</span>
          <span>Jeu</span>
          <span>Ven</span>
          <span>Sam</span>
          <span>Dim</span>
        </div>

        {/* Full-Width Month Grid */}
        <div className="grid grid-cols-7 auto-rows-fr gap-px bg-border/40">
          {Array.from({ length: startDayOffset }).map((_, idx) => (
            <div key={`offset-${idx}`} className="bg-card/40 min-h-[95px] sm:min-h-[115px] p-1.5 opacity-30" />
          ))}

          {daysInMonth.map((day) => {
            const dayEvents = filteredEvents.filter((e) => e.jour === day);
            const isToday = day === 18;

            return (
              <div
                key={day}
                className={`min-h-[95px] sm:min-h-[115px] p-2 flex flex-col justify-between transition-colors bg-card hover:bg-muted/30 ${
                  isToday ? "bg-primary/5 ring-1 ring-inset ring-primary/40" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`size-6 flex items-center justify-center rounded-full text-xs font-mono font-bold ${
                      isToday
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground"
                    }`}
                  >
                    {day}
                  </span>
                  {dayEvents.length > 0 && (
                    <span className="text-[10px] font-mono font-medium text-muted-foreground">
                      {dayEvents.length}
                    </span>
                  )}
                </div>

                {/* Day events pills - CLIC OUVRANT LA MODALE */}
                <div className="space-y-1 mt-1">
                  {dayEvents.map((evt) => {
                    const style = getUrgencyColor(evt.joursRestants);
                    return (
                      <button
                        key={evt.id}
                        type="button"
                        onClick={() => setSelectedEvent(evt)}
                        className={`w-full text-left truncate rounded px-1.5 py-0.5 text-[10px] font-medium border transition-transform hover:scale-[1.02] cursor-pointer ${style.pill}`}
                      >
                        <span className="font-bold mr-1">{evt.heure.split(" ")[0]}</span>
                        {evt.titre}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Detailed Agenda Cards */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Liste Détaillée des Événements
        </h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((evt) => {
            const style = getUrgencyColor(evt.joursRestants);
            return (
              <Card
                key={evt.id}
                onClick={() => setSelectedEvent(evt)}
                className="border-border/60 shadow-xs hover:border-primary/50 transition-all p-4 space-y-3 cursor-pointer"
              >
                <div className="flex items-start justify-between gap-2">
                  <Badge variant="outline" className={`text-[10px] ${style.badge}`}>
                    <span className={`size-1.5 rounded-full mr-1.5 ${style.dot}`} />
                    {evt.type} • {style.label}
                  </Badge>
                  <span className="text-[11px] font-mono text-muted-foreground">{evt.heure}</span>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-foreground line-clamp-1">{evt.titre}</h4>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{evt.cours}</p>
                </div>

                <div className="space-y-1 text-[11px] text-muted-foreground border-t border-border/40 pt-2">
                  <p className="flex items-center gap-1.5">
                    <Clock className="size-3 text-primary shrink-0" />
                    <span className="font-medium text-foreground">{evt.date}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <MapPin className="size-3 text-primary shrink-0" />
                    <span className="truncate">{evt.lieu}</span>
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* MODALE D'ÉVÉNEMENT LORSQU'ON CLIQUE */}
      {selectedEvent && (
        <Dialog open={Boolean(selectedEvent)} onOpenChange={() => setSelectedEvent(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className={getUrgencyColor(selectedEvent.joursRestants).badge}>
                  {selectedEvent.type} • {getUrgencyColor(selectedEvent.joursRestants).label}
                </Badge>
              </div>
              <DialogTitle className="text-base font-bold text-foreground">
                {selectedEvent.titre}
              </DialogTitle>
              <DialogDescription className="text-xs">
                Matière : <strong className="text-foreground">{selectedEvent.cours}</strong>
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 py-2 text-xs">
              <div className="rounded-lg border border-border/50 bg-muted/20 p-3 space-y-1.5">
                <p className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="size-4 text-primary shrink-0" />
                  <span>Horaire : <strong className="text-foreground">{selectedEvent.date} ({selectedEvent.heure})</strong></span>
                </p>
                <p className="flex items-center gap-2 text-muted-foreground">
                  <User className="size-4 text-primary shrink-0" />
                  <span>Intervenant : <strong className="text-foreground">{selectedEvent.intervenant}</strong></span>
                </p>
                <p className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="size-4 text-primary shrink-0" />
                  <span>Lieu : <strong className="text-foreground">{selectedEvent.lieu}</strong></span>
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-semibold text-foreground text-xs">Description & Directives :</span>
                <p className="text-muted-foreground leading-relaxed">
                  {selectedEvent.description}
                </p>
              </div>
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setSelectedEvent(null)}>
                Fermer
              </Button>
              {selectedEvent.lienRejoindre ? (
                <Button size="sm" asChild>
                  <a href={selectedEvent.lienRejoindre} target="_blank" rel="noreferrer">
                    <Video className="size-3.5 mr-1.5" /> Rejoindre la visio
                  </a>
                </Button>
              ) : (
                <Button size="sm" onClick={() => { toast.success("Rappel enregistré dans votre agenda."); setSelectedEvent(null); }}>
                  Ajouter un rappel
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
