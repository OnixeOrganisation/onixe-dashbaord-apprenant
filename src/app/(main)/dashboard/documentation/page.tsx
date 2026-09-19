import { DossiersDocumentation } from "./_components/dossiers-documentation";

export default function PageDocumentation() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b pb-4">
        <h1 className="flex items-center gap-2 font-bold text-2xl text-foreground tracking-tight">
          Documentation de l'École
        </h1>
        <p className="mt-0.5 text-muted-foreground text-sm">
          Guides, règlements, chartes éthiques et ressources pédagogiques de l'établissement classés par dossiers.
        </p>
      </div>

      <DossiersDocumentation />
    </div>
  );
}
