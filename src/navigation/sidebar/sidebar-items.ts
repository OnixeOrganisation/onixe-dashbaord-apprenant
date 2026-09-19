import {
  Award,
  BookMarked,
  BookOpen,
  Calendar,
  CheckCircle2,
  FileText,
  FolderDown,
  LayoutDashboard,
  type LucideIcon,
  MessageSquare,
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
    label: "Espace Apprenant",
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
        url: "/dashboard/parcours",
        icon: BookOpen,
      },
      {
        id: "cohorte",
        title: "Ma Cohorte & Enseignants",
        url: "/dashboard/cohorte",
        icon: Users,
      },
      {
        id: "bulletin",
        title: "Relevé & Compétences",
        url: "/dashboard/bulletin",
        icon: Award,
      },
      {
        id: "calendrier",
        title: "Calendrier Établissement",
        url: "/dashboard/calendrier",
        icon: Calendar,
      },
      {
        id: "assiduite",
        title: "Suivi d'assiduité",
        url: "/dashboard/assiduite",
        icon: CheckCircle2,
      },
      {
        id: "messagerie",
        title: "Messagerie & Canal",
        url: "/dashboard/messagerie",
        icon: MessageSquare,
      },
    ],
  },
  {
    id: 2,
    label: "Compte & Dossier",
    items: [
      {
        id: "profil",
        title: "Mon Profil & Portfolio",
        url: "/dashboard/profil",
        icon: UserRound,
      },
      {
        id: "documentation",
        title: "Documentation École",
        url: "/dashboard/documentation",
        icon: BookMarked,
      },
      {
        id: "documents",
        title: "Documents & Facturation",
        url: "/dashboard/documents",
        icon: FolderDown,
      },
    ],
  },
];
