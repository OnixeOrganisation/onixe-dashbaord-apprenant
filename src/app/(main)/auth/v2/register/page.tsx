import Link from "next/link";

import { Globe } from "lucide-react";
import type { Metadata } from "next";

import { APP_CONFIG } from "@/config/app-config";

import { AuthSplitLayout } from "../../_components/auth-split-layout";
import { RegisterForm } from "../../_components/register-form";
import { GoogleButton } from "../../_components/social-auth/google-button";

export const metadata: Metadata = {
  title: "Inscription — Onixe Apprenant",
  description: "Créez votre compte apprenant sur la plateforme Onixe.",
  alternates: {
    canonical: "/auth/v2/register",
  },
};

export default function RegisterV2() {
  return (
    <AuthSplitLayout
      imageSrc="/images/register-apprenant.jpg"
      imageAlt="Espace apprenant Onixe — Inscription"
      headline="Rejoignez la communauté Onixe et développez vos compétences dès aujourd'hui."
      description="Participez à des ateliers pratiques, suivez votre progression et validez vos acquis avec des mentors expérimentés."
    >
      <div className="mx-auto flex w-full flex-col justify-center space-y-8 px-4 sm:w-[350px] sm:px-0">
        <div className="space-y-2 text-center">
          <h1 className="font-medium text-3xl">Créer un compte</h1>
          <p className="text-muted-foreground text-sm">Veuillez renseigner vos informations pour vous inscrire.</p>
        </div>
        <div className="space-y-4">
          <GoogleButton className="w-full" />
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-border after:border-t">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">Ou continuer avec</span>
          </div>
          <RegisterForm />
        </div>
      </div>

      <div className="absolute top-5 flex w-full justify-end px-10">
        <div className="text-muted-foreground text-sm">
          Vous avez déjà un compte ?{" "}
          <Link prefetch={false} className="text-foreground hover:underline" href="/auth/v2/login">
            Se connecter
          </Link>
        </div>
      </div>

      <div className="absolute bottom-5 flex w-full justify-between px-10">
        <div className="text-sm">{APP_CONFIG.copyright}</div>
        <div className="flex items-center gap-1 text-sm">
          <Globe className="size-4 text-muted-foreground" />
          FR
        </div>
      </div>
    </AuthSplitLayout>
  );
}
