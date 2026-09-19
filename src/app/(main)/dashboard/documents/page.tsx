import { ListeAttestations } from "./_components/liste-attestations";
import { StatutFacturation } from "./_components/statut-facturation";

export default function PageDocuments() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b pb-4">
        <h1 className="flex items-center gap-2 font-bold text-2xl text-foreground tracking-tight">
          Documents Administratifs & Scolarité
        </h1>
        <p className="mt-0.5 text-muted-foreground text-sm">
          Consultez et téléchargez vos attestations officielles et l'historique des règlements de scolarité.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <ListeAttestations />
        </div>
        <div className="lg:col-span-6">
          <StatutFacturation />
        </div>
      </div>
    </div>
  );
}
