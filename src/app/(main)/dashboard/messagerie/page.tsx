import { DiscussionFormateurCohorte } from "./_components/discussion-formateur-cohorte";

export default function PageMessagerie() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b pb-4">
        <h1 className="flex items-center gap-2 font-bold text-2xl text-foreground tracking-tight">
          Messagerie Pédagogique
        </h1>
        <p className="mt-0.5 text-muted-foreground text-sm">
          Espace d'échange direct avec vos formateurs et les membres de la cohorte Promo Onyx 2026.
        </p>
      </div>

      <DiscussionFormateurCohorte />
    </div>
  );
}
