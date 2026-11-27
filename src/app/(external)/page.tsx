import type { Metadata } from "next";

import LoginV2 from "../(main)/auth/v2/login/page";

export const metadata: Metadata = {
  title: "Connexion — Onixe Apprenant",
  description: "Connectez-vous à votre espace apprenant Onixe.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return <LoginV2 />;
}
