import { FormulaireSignalement } from "./_components/formulaire-signalement";
import { IndicateurPresence } from "./_components/indicateur-presence";

export default function PageAssiduite() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b pb-4">
        <h1 className="flex items-center gap-2 font-bold text-2xl text-foreground tracking-tight">
          Suivi d'Assiduité & Demandes
        </h1>
        <p className="mt-0.5 text-muted-foreground text-sm">
          Suivi rigoureux de la présence aux séances de cours et portail de signalement.
        </p>
      </div>

      <IndicateurPresence />
      <FormulaireSignalement />
    </div>
  );
}
