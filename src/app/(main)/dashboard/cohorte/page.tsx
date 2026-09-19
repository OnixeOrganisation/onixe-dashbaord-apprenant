import { DetailsCohorte } from "./_components/details-cohorte";
import { EquipeEnseignante } from "./_components/equipe-enseignante";

export default function PageCohorte() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b pb-4">
        <h1 className="flex items-center gap-2 font-bold text-2xl text-foreground tracking-tight">
          Ma Cohorte & Équipe Enseignante
        </h1>
        <p className="mt-0.5 text-muted-foreground text-sm">
          Informations complètes sur votre promotion, vos formateurs et les créneaux de permanences pédagogiques.
        </p>
      </div>

      <EquipeEnseignante />
      <DetailsCohorte />
    </div>
  );
}
