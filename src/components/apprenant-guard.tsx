"use client";

import type { ReactNode } from "react";

import { ShieldAlert } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { rootUser } from "@/data/users";

export function ApprenantGuard({ children }: { children: ReactNode }) {
  // Check active user role
  const isApprenant = rootUser.role === "APPRENANT";

  if (!isApprenant) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-6">
        <Alert variant="destructive" className="max-w-md">
          <ShieldAlert className="h-5 w-5" />
          <AlertTitle>Accès restreint — Rôle Apprenant requis</AlertTitle>
          <AlertDescription className="mt-2 text-sm leading-relaxed">
            Cet espace de formation est réservé aux apprenants inscrits à l'Académie Onixe. Veuillez contacter
            l'administration de votre établissement si vous pensez qu'il s'agit d'une erreur.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return <>{children}</>;
}
