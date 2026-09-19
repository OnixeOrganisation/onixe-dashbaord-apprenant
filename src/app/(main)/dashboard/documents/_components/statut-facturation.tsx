"use client";

import { CheckCircle2, CreditCard, ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useDocuments } from "@/hooks/use-apprenant-data";

export function StatutFacturation() {
  const { billing } = useDocuments();

  return (
    <Card className="border-border/60 shadow-xs">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            <CardTitle className="font-semibold text-base">Statut de Scolarité & Facturation</CardTitle>
          </div>
          <Badge className="border-0 bg-emerald-500/15 px-2.5 py-1 text-emerald-600 text-xs dark:text-emerald-400">
            <ShieldCheck className="mr-1 h-3.5 w-3.5" /> Dossier Financier {billing.badge}
          </Badge>
        </div>
        <CardDescription className="text-muted-foreground text-xs">
          Synthèse du paiement des frais d'inscription et échéancier de formation.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Billing Overview Stats */}
        <div className="grid grid-cols-1 gap-3 rounded-lg border bg-muted/20 p-3 text-xs sm:grid-cols-3">
          <div>
            <span className="block font-mono text-[10px] text-muted-foreground uppercase">Montant Total Formation</span>
            <span className="font-bold font-mono text-foreground text-sm">{billing.totalAmount}</span>
          </div>
          <div>
            <span className="block font-mono text-[10px] text-muted-foreground uppercase">Montant Réglé</span>
            <span className="font-bold font-mono text-emerald-600 text-sm dark:text-emerald-400">
              {billing.amountPaid}
            </span>
          </div>
          <div>
            <span className="block font-mono text-[10px] text-muted-foreground uppercase">Reste à Payer</span>
            <span className="font-bold font-mono text-muted-foreground text-sm">{billing.remainingAmount}</span>
          </div>
        </div>

        {/* Schedule Table */}
        <div className="space-y-1.5">
          <h4 className="font-semibold text-foreground text-xs">Historique des Échéances :</h4>
          <div className="overflow-x-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40">
                  <TableHead className="w-[100px] font-mono text-xs">Date</TableHead>
                  <TableHead className="min-w-[180px] text-xs">Libellé</TableHead>
                  <TableHead className="w-[120px] font-mono text-xs">Montant</TableHead>
                  <TableHead className="w-[100px] text-right text-xs">Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {billing.schedule.map((item, idx) => (
                  <TableRow key={idx} className="text-xs">
                    <TableCell className="font-mono text-muted-foreground">{item.date}</TableCell>
                    <TableCell className="font-medium text-foreground">{item.label}</TableCell>
                    <TableCell className="font-bold font-mono">{item.amount}</TableCell>
                    <TableCell className="text-right">
                      {item.status === "Payé" ? (
                        <Badge className="border-0 bg-emerald-500/15 text-[10px] text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 className="mr-1 inline h-3 w-3" /> Payé
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-[10px]">
                          En attente
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
