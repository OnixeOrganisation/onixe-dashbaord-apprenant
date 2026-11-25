"use client";

import * as React from "react";
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  CreditCard,
  Download,
  Eye,
  FileText,
  Image as ImageIcon,
  Plus,
  Receipt,
  UploadCloud,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAcademicStore } from "@/stores/academic/academic-store";

interface Paiement {
  id: string;
  date: string;
  heure: string;
  numeroRecu: string;
  tranche: string;
  montant: string;
  mode: string;
  justificatifUrl: string;
  status: "valide" | "en_attente" | "rejete";
  motifRejet?: string;
  dateValidation?: string;
}

export default function PageFacturation() {
  const getActiveCohorte = useAcademicStore((s) => s.getActiveCohorte);
  const getActiveEtablissement = useAcademicStore((s) => s.getActiveEtablissement);

  const activeCohorte = getActiveCohorte();
  const activeEtab = getActiveEtablissement();

  const [openModal, setOpenModal] = React.useState(false);
  const [date, setDate] = React.useState(new Date().toISOString().split("T")[0]);
  const [heure, setHeure] = React.useState("11:30");
  const [numeroRecu, setNumeroRecu] = React.useState("");
  const [tranche, setTranche] = React.useState("Tranche 1");
  const [montant, setMontant] = React.useState("500 000 FCFA");
  const [mode, setMode] = React.useState("Virement Bancaire");
  const [imageFile, setImageFile] = React.useState<string | null>(null);

  const [paiements, setPaiements] = React.useState<Paiement[]>([
    {
      id: "pay-1",
      date: "05 Octobre 2025",
      heure: "14:15",
      numeroRecu: "REC-2025-0089",
      tranche: "Frais d'Inscription",
      montant: "250 000 FCFA",
      mode: "Wave / Mobile Money",
      justificatifUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400",
      status: "valide",
      dateValidation: "06 Octobre 2025 à 09:20",
    },
    {
      id: "pay-2",
      date: "10 Janvier 2026",
      heure: "10:45",
      numeroRecu: "BORD-SGB-88412",
      tranche: "Première Tranche (Scolarité)",
      montant: "500 000 FCFA",
      mode: "Bordereau Bancaire SGBS",
      justificatifUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400",
      status: "valide",
      dateValidation: "11 Janvier 2026 à 14:00",
    },
    {
      id: "pay-3",
      date: "14 Octobre 2026",
      heure: "16:20",
      numeroRecu: "REC-OM-449102",
      tranche: "Deuxième Tranche (Scolarité)",
      montant: "500 000 FCFA",
      mode: "Orange Money",
      justificatifUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400",
      status: "en_attente",
    },
  ]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      setImageFile(previewUrl);
    }
  };

  const handleAddPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!numeroRecu.trim()) {
      toast.error("Veuillez saisir le numéro de reçu ou de transaction.");
      return;
    }

    const newPayment: Paiement = {
      id: `pay-${Date.now()}`,
      date: date,
      heure: heure,
      numeroRecu: numeroRecu,
      tranche: tranche,
      montant: montant,
      mode: mode,
      justificatifUrl: imageFile || "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400",
      status: "en_attente",
    };

    setPaiements([newPayment, ...paiements]);
    setOpenModal(false);
    setNumeroRecu("");
    setImageFile(null);
    toast.success("Votre paiement a été déclaré avec succès et est en attente de vérification comptable !");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2 border-b border-border/50 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Facturation & Règlements
            </h1>
            <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-0 text-xs">
              Comptabilité Académique
            </Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Suivi des tranches de scolarité et déclaration de paiements pour <strong>{activeEtab.name}</strong>.
          </p>
        </div>

        {/* Modal Déclarer un Paiement */}
        <Dialog open={openModal} onOpenChange={setOpenModal}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1.5 text-xs font-medium">
              <Plus className="size-4" /> Enregistrer un Paiement
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-base">Déclarer un Règlement</DialogTitle>
              <DialogDescription className="text-xs">
                Renseignez la date, l'heure, le numéro de reçu et joignez une photo de votre justificatif.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleAddPayment} className="space-y-3 py-2 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-medium text-foreground">Date du versement</label>
                  <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="h-8 text-xs"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-medium text-foreground">Heure du versement</label>
                  <Input
                    type="time"
                    value={heure}
                    onChange={(e) => setHeure(e.target.value)}
                    className="h-8 text-xs"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-medium text-foreground">Numéro de Reçu / Transaction</label>
                  <Input
                    placeholder="Ex: BORD-12345 ou TX-9988"
                    value={numeroRecu}
                    onChange={(e) => setNumeroRecu(e.target.value)}
                    className="h-8 text-xs font-mono"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-medium text-foreground">Montant versé</label>
                  <Input
                    placeholder="Ex: 500 000 FCFA"
                    value={montant}
                    onChange={(e) => setMontant(e.target.value)}
                    className="h-8 text-xs font-mono"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-medium text-foreground">Type de Tranche</label>
                  <Select value={tranche} onValueChange={setTranche}>
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="text-xs">
                      <SelectItem value="Frais d'Inscription">Frais d'Inscription</SelectItem>
                      <SelectItem value="Première Tranche">Première Tranche</SelectItem>
                      <SelectItem value="Deuxième Tranche">Deuxième Tranche</SelectItem>
                      <SelectItem value="Troisième Tranche">Troisième Tranche</SelectItem>
                      <SelectItem value="Solde Complet">Solde Complet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <label className="font-medium text-foreground">Mode de Règlement</label>
                  <Select value={mode} onValueChange={setMode}>
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="text-xs">
                      <SelectItem value="Virement Bancaire">Virement Bancaire</SelectItem>
                      <SelectItem value="Bordereau de Versement">Bordereau Bancaire</SelectItem>
                      <SelectItem value="Wave / Mobile Money">Wave / Mobile Money</SelectItem>
                      <SelectItem value="Orange Money">Orange Money</SelectItem>
                      <SelectItem value="Chèque">Chèque</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Upload image / Justificatif */}
              <div className="space-y-1.5 pt-1">
                <label className="font-medium text-foreground">
                  Justificatif de paiement (Photo du reçu, capture d'écran, bordereau)
                </label>
                <div className="flex items-center gap-3">
                  <Input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    className="h-8 text-xs cursor-pointer"
                  />
                  {imageFile && (
                    <div className="relative size-8 shrink-0 overflow-hidden rounded-md border">
                      <img src={imageFile} alt="Aperçu" className="size-full object-cover" />
                    </div>
                  )}
                </div>
                <p className="text-[10px] text-muted-foreground">
                  Formats acceptés : JPG, PNG, PDF (max. 10 Mo)
                </p>
              </div>

              <DialogFooter className="pt-3">
                <Button type="button" variant="outline" size="sm" onClick={() => setOpenModal(false)}>
                  Annuler
                </Button>
                <Button type="submit" size="sm">
                  Valider et transmettre
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Recapitulatif Financier */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="border-border/60 shadow-xs">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium uppercase text-muted-foreground">
              Coût Total Scolarité
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="font-mono text-2xl font-bold text-foreground">1 750 000 FCFA</span>
            <p className="text-[11px] text-muted-foreground mt-1">Programme : {activeCohorte.name}</p>
          </CardContent>
        </Card>

        <Card className="border-emerald-500/20 bg-emerald-500/5 shadow-xs">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium uppercase text-emerald-600 dark:text-emerald-400">
              Total Déjà Réglé & Validé
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="font-mono text-2xl font-bold text-emerald-600 dark:text-emerald-400">750 000 FCFA</span>
            <p className="text-[11px] text-muted-foreground mt-1">Inscription + 1ère tranche validées</p>
          </CardContent>
        </Card>

        <Card className="border-amber-500/20 bg-amber-500/5 shadow-xs">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium uppercase text-amber-600 dark:text-amber-400">
              Solde Restant Dû
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="font-mono text-2xl font-bold text-amber-600 dark:text-amber-400">500 000 FCFA</span>
            <p className="text-[11px] text-muted-foreground mt-1">1 paiement de 500k en cours de validation</p>
          </CardContent>
        </Card>
      </div>

      {/* Tableau des Règlements */}
      <Card className="border-border/60 shadow-xs">
        <CardHeader className="border-b pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold">Historique & Statut des Règlements</CardTitle>
              <CardDescription className="text-xs">
                Consultez l'état de validation de vos versements (Inscription, 1ère tranche, 2ème tranche...).
              </CardDescription>
            </div>
            <Receipt className="size-5 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="text-xs">
                <TableHead>Date & Heure</TableHead>
                <TableHead>Numéro Reçu / Réf</TableHead>
                <TableHead>Nature de la Tranche</TableHead>
                <TableHead>Mode</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Justificatif</TableHead>
                <TableHead>Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-xs">
              {paiements.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium text-foreground">
                    <div>
                      <span>{p.date}</span>
                      <span className="block text-[10px] text-muted-foreground">à {p.heure}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-xs">{p.numeroRecu}</TableCell>
                  <TableCell>{p.tranche}</TableCell>
                  <TableCell className="text-muted-foreground">{p.mode}</TableCell>
                  <TableCell className="font-mono font-bold text-foreground">{p.montant}</TableCell>
                  <TableCell>
                    <a
                      href={p.justificatifUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-primary hover:underline text-[11px]"
                    >
                      <ImageIcon className="size-3.5" /> Voir reçu
                    </a>
                  </TableCell>
                  <TableCell>
                    {p.status === "valide" && (
                      <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-0 text-[10px] gap-1">
                        <CheckCircle2 className="size-3" /> Validé
                      </Badge>
                    )}
                    {p.status === "en_attente" && (
                      <Badge className="bg-amber-500/15 text-amber-600 dark:text-amber-400 border-0 text-[10px] gap-1">
                        <Clock className="size-3" /> En attente
                      </Badge>
                    )}
                    {p.status === "rejete" && (
                      <Badge className="bg-rose-500/15 text-rose-600 dark:text-rose-400 border-0 text-[10px] gap-1">
                        <XCircle className="size-3" /> Rejeté
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
