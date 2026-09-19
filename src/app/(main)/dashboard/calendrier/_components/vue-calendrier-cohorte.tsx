"use client";

import { useState } from "react";

import { AlertCircle, Calendar as CalendarIcon, Clock, Download, MapPin, User } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCalendrier } from "@/hooks/use-apprenant-data";

export function VueCalendrierCohorte() {
  const { events, exportICS } = useCalendrier();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [filterType, setFilterType] = useState<string>("ALL");

  const filteredEvents = events.filter((evt) => {
    if (filterType === "ALL") return true;
    return evt.type === filterType;
  });

  const getBadgeColor = (type: string) => {
    switch (type) {
      case "ATELIER":
        return "bg-blue-500/15 text-blue-600 dark:text-blue-400";
      case "DEADLINE":
        return "bg-amber-500/15 text-amber-600 dark:text-amber-400";
      case "EXAMEN":
        return "bg-red-500/15 text-red-600 dark:text-red-400";
      default:
        return "bg-primary/15 text-primary";
    }
  };

  return (
    <div className="space-y-6">
      {/* Calendar Header with Export Action */}
      <div className="flex flex-col gap-3 border-b pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="flex items-center gap-2 font-bold text-2xl text-foreground tracking-tight">
            Calendrier de l'Établissement
          </h1>
          <p className="mt-0.5 text-muted-foreground text-sm">
            Planning officiel des séances, examens et dates limites de la Promo Onyx 2026.
          </p>
        </div>
        <Button onClick={exportICS} size="sm" variant="outline" className="w-fit border-border/80">
          <Download className="mr-2 h-4 w-4" /> Exporter le planning (.ics)
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Interactive Calendar Widget */}
        <Card className="h-fit border-border/60 shadow-xs lg:col-span-5">
          <CardHeader className="pb-2">
            <CardTitle className="font-semibold text-base">Vue Calendrier</CardTitle>
            <CardDescription className="text-xs">
              Sélectionnez une date pour consulter l'emploi du temps.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center p-3">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border border-border/40 p-3"
            />
          </CardContent>
        </Card>

        {/* Agenda Events List */}
        <Card className="border-border/60 shadow-xs lg:col-span-7">
          <CardHeader className="pb-3">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-primary" />
                <CardTitle className="font-semibold text-base">Événements de la Cohorte</CardTitle>
              </div>

              {/* Type Filters */}
              <Tabs defaultValue="ALL" onValueChange={setFilterType} className="w-fit">
                <TabsList className="h-8 p-0.5 text-xs">
                  <TabsTrigger value="ALL" className="px-2.5 py-1 text-xs">
                    Tous
                  </TabsTrigger>
                  <TabsTrigger value="ATELIER" className="px-2.5 py-1 text-xs">
                    Ateliers
                  </TabsTrigger>
                  <TabsTrigger value="DEADLINE" className="px-2.5 py-1 text-xs">
                    Rendus
                  </TabsTrigger>
                  <TabsTrigger value="EXAMEN" className="px-2.5 py-1 text-xs">
                    Examens
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {filteredEvents.map((evt) => (
              <div
                key={evt.id}
                className="space-y-2 rounded-lg border border-border/50 bg-card p-3.5 transition-colors hover:bg-muted/20"
              >
                <div className="flex items-center justify-between">
                  <Badge className={`border-0 px-2 py-0.5 font-mono text-[10px] ${getBadgeColor(evt.type)}`}>
                    {evt.type}
                  </Badge>
                  {evt.isMandatory && (
                    <span className="flex items-center gap-1 font-medium text-[10px] text-amber-600 dark:text-amber-400">
                      <AlertCircle className="h-3 w-3" /> Présence Obligatoire
                    </span>
                  )}
                </div>

                <h4 className="font-semibold text-foreground text-sm">{evt.title}</h4>

                <div className="grid grid-cols-1 gap-2 border-border/40 border-t pt-1 text-muted-foreground text-xs sm:grid-cols-2">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-primary" />
                    <span>
                      {new Date(evt.startDate).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "short",
                      })}{" "}
                      •{" "}
                      {new Date(evt.startDate).toLocaleTimeString("fr-FR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                    <span>{evt.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:col-span-2">
                    <User className="h-3.5 w-3.5 text-primary" />
                    <span>Formateur / Intervenant : {evt.instructor}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
