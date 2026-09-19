"use client";

import Link from "next/link";

import { Clock, Mail, MessageSquare, UserCheck } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useCohorte } from "@/hooks/use-apprenant-data";

export function EquipeEnseignante() {
  const { teachers } = useCohorte();

  return (
    <Card className="border-border/60 shadow-xs">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <UserCheck className="h-5 w-5 text-primary" />
          <CardTitle className="font-semibold text-lg tracking-tight">Équipe Enseignante & Mentors</CardTitle>
        </div>
        <CardDescription className="text-muted-foreground text-xs">
          Formateurs référents, créneaux de permanence (Office Hours) et moyens de contact.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {teachers.map((teacher) => (
            <div
              key={teacher.id}
              className="flex flex-col justify-between space-y-3 rounded-lg border border-border/50 bg-card p-4 transition-colors hover:bg-muted/20"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 border">
                    <AvatarImage src={teacher.avatar} alt={teacher.name} />
                    <AvatarFallback>{teacher.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">{teacher.name}</h4>
                    <span className="block font-medium font-mono text-[10px] text-primary leading-tight">
                      {teacher.role}
                    </span>
                  </div>
                </div>

                <p className="text-muted-foreground text-xs leading-relaxed">{teacher.bio}</p>

                <div className="space-y-1.5 border-border/40 border-t pt-2 text-[11px] text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 shrink-0 text-primary" />
                    <span>{teacher.officeHours}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 shrink-0 text-primary" />
                    <span className="font-mono">{teacher.email}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 pt-1">
                  {teacher.modules.map((m, idx) => (
                    <Badge key={idx} variant="secondary" className="px-1.5 py-0 font-mono text-[10px]">
                      {m}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="border-border/40 border-t pt-3">
                <Button size="sm" variant="outline" asChild className="w-full font-medium text-xs">
                  <Link href="/dashboard/messagerie">
                    <MessageSquare className="mr-1.5 h-3.5 w-3.5 text-primary" /> Poser une question
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
