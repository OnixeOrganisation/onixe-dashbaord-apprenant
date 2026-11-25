import {
  Award,
  BookMarked,
  BookOpen,
  Briefcase,
  Calendar,
  CreditCard,
  FileCheck2,
  GraduationCap,
  LayoutDashboard,
  type LucideIcon,
  MessageSquare,
  School,
  UserRound,
  Users,
} from "lucide-react";

export type NavBadge = "new" | "soon";

export interface NavSubItem {
  id: string;
  title: string;
  url: string;
  icon?: LucideIcon;
  badge?: NavBadge;
  disabled?: boolean;
  newTab?: boolean;
}

interface NavItemBase {
  id: string;
  title: string;
  icon?: LucideIcon;
  badge?: NavBadge;
  disabled?: boolean;
  newTab?: boolean;
}

export interface NavMainLinkItem extends NavItemBase {
  url: string;
  subItems?: never;
}

export interface NavMainParentItem extends NavItemBase {
  subItems: NavSubItem[];
}

export type NavMainItem = NavMainLinkItem | NavMainParentItem;

export interface NavGroup {
  id: number;
  label?: string;
  items: NavMainItem[];
}

export const sidebarItems: NavGroup[] = [
  {
    id: 1,
    label: "Pédagogie & Apprentissage",
    items: [
      {
        id: "accueil",
        title: "Tableau de bord",
        url: "/dashboard/accueil",
        icon: LayoutDashboard,
      },
      {
        id: "parcours",
        title: "Parcours (Learning by Doing)",
        icon: BookOpen,
        subItems: [
          {
            id: "parcours-overview",
            title: "Vue d'ensemble",
            url: "/dashboard/parcours",
          },
          {
            id: "cours-algo",
            title: "Algorithmique & Structures",
            url: "/dashboard/parcours/algo",
          },
          {
            id: "cours-web",
            title: "Programmation Web Moderne",
            url: "/dashboard/parcours/web",
          },
          {
            id: "cours-bdd",
            title: "Bases de Données & SQL",
            url: "/dashboard/parcours/bdd",
          },
          {
            id: "cours-bureautique",
            title: "Bureautique & Outils",
            url: "/dashboard/parcours/bureautique",
          },
          {
            id: "cours-francais",
            title: "Français Professionnel",
            url: "/dashboard/parcours/francais",
          },
        ],
      },
      {
        id: "projets",
        title: "Projets Complets",
        url: "/dashboard/projets",
        icon: Briefcase,
      },
      {
        id: "cohorte",
        title: "Ma Cohorte",
        icon: Users,
        subItems: [
          {
            id: "cohorte-enseignants",
            title: "Enseignants & Responsables",
            url: "/dashboard/cohorte/enseignants",
            icon: GraduationCap,
          },
          {
            id: "cohorte-apprenants",
            title: "Apprenants & Camarades",
            url: "/dashboard/cohorte/apprenants",
            icon: Users,
          },
        ],
      },
      {
        id: "bulletin",
        title: "Relevé & Compétences",
        url: "/dashboard/bulletin",
        icon: Award,
      },
    ],
  },
  {
    id: 2,
    label: "Vie Académique & Administration",
    items: [
      {
        id: "canal",
        title: "Canal",
        url: "/dashboard/canal",
        icon: MessageSquare,
      },
      {
        id: "calendrier",
        title: "Calendrier Établissement",
        url: "/dashboard/calendrier",
        icon: Calendar,
      },
      {
        id: "facturation",
        title: "Facturation & Règlements",
        url: "/dashboard/facturation",
        icon: CreditCard,
      },
      {
        id: "certificats",
        title: "Attestations & Certificats",
        url: "/dashboard/certificats",
        icon: FileCheck2,
      },
      {
        id: "documentation",
        title: "Documentation École",
        url: "/dashboard/documentation",
        icon: BookMarked,
      },
    ],
  },
];
