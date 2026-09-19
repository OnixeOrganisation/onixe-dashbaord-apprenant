import packageJson from "../../package.json";

const currentYear = new Date().getFullYear();

export const APP_CONFIG = {
  name: "Onixe Apprenant",
  version: packageJson.version,
  copyright: `© ${currentYear}, Onixe. The Quiet OS for Modern Academies.`,
  meta: {
    title: "Onixe — Espace Apprenant",
    description:
      "Plateforme d'apprentissage et d'évaluation structurée en strates pour les centres de formation professionnelle.",
  },
};
