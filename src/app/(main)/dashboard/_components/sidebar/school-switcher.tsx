"use client";

import * as React from "react";
import Image from "next/image";
import { Check, ChevronsUpDown, GraduationCap, School, Sparkles } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAcademicStore } from "@/stores/academic/academic-store";

export function SchoolSwitcher() {
  const { isMobile } = useSidebar();
  const etablissements = useAcademicStore((s) => s.etablissements);
  const activeEtablissementId = useAcademicStore((s) => s.activeEtablissementId);
  const activeCohorteId = useAcademicStore((s) => s.activeCohorteId);
  const switchEtablissement = useAcademicStore((s) => s.switchEtablissement);
  const switchCohorte = useAcademicStore((s) => s.switchCohorte);
  const getActiveEtablissement = useAcademicStore((s) => s.getActiveEtablissement);
  const getActiveCohorte = useAcademicStore((s) => s.getActiveCohorte);
  const getCohortesByEtablissement = useAcademicStore((s) => s.getCohortesByEtablissement);

  const activeEtab = getActiveEtablissement();
  const activeCohorte = getActiveCohorte();
  const cohortesOfActiveEtab = getCohortesByEtablissement(activeEtablissementId);

  return (
    <div className="flex flex-col gap-2 p-2">
      {/* Skool-style School Logo & Switcher */}
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground border border-border/40 bg-sidebar-accent/30 hover:bg-sidebar-accent"
              >
                {/* Dynamic School Logo */}
                <div className="relative flex aspect-square size-9 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-primary/10 text-primary ring-1 ring-border/50">
                  {activeEtab.logo ? (
                    <img
                      src={activeEtab.logo}
                      alt={activeEtab.name}
                      className="size-full object-cover"
                    />
                  ) : (
                    <School className="size-5" />
                  )}
                </div>

                <div className="grid flex-1 text-left text-xs leading-tight">
                  <span className="truncate font-semibold text-foreground text-sm">
                    {activeEtab.shortName || activeEtab.name}
                  </span>
                  <span className="truncate text-muted-foreground text-[11px]">
                    {activeEtab.city}, {activeEtab.country}
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto size-4 text-muted-foreground" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              align="start"
              side={isMobile ? "bottom" : "right"}
              sideOffset={4}
            >
              <DropdownMenuLabel className="font-semibold text-muted-foreground text-xs uppercase tracking-wider">
                Mes Établissements (Style Skool)
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {etablissements.map((etab) => (
                <DropdownMenuItem
                  key={etab.id}
                  onClick={() => switchEtablissement(etab.id)}
                  className="gap-2 p-2 cursor-pointer"
                >
                  <div className="flex size-7 items-center justify-center overflow-hidden rounded-md border bg-muted">
                    <img
                      src={etab.logo}
                      alt={etab.name}
                      className="size-full object-cover"
                    />
                  </div>
                  <div className="flex-1 truncate">
                    <p className="font-medium text-xs text-foreground truncate">{etab.name}</p>
                    <p className="text-[10px] text-muted-foreground">{etab.city} • Code: {etab.code}</p>
                  </div>
                  {etab.id === activeEtablissementId && (
                    <Check className="size-4 text-primary shrink-0" />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>

      {/* Cohort Selector with Dropdown */}
      <div className="px-1 group-data-[collapsible=icon]:hidden">
        <label className="mb-1 block text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          Cohorte active
        </label>
        <Select value={activeCohorteId} onValueChange={(val) => switchCohorte(val)}>
          <SelectTrigger className="h-8 w-full border-border/50 bg-background/60 text-xs shadow-none hover:bg-background">
            <div className="flex items-center gap-1.5 truncate">
              <GraduationCap className="size-3.5 text-primary shrink-0" />
              <SelectValue placeholder="Sélectionner une cohorte">
                <span className="truncate">{activeCohorte?.name || "Choisir une cohorte"}</span>
              </SelectValue>
            </div>
          </SelectTrigger>
          <SelectContent className="text-xs">
            {cohortesOfActiveEtab.map((cohorte) => (
              <SelectItem key={cohorte.id} value={cohorte.id} className="text-xs">
                <div className="flex flex-col py-0.5">
                  <span className="font-medium text-foreground">{cohorte.name}</span>
                  <span className="text-[10px] text-muted-foreground">{cohorte.filiere}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
