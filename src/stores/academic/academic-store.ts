import { create } from "zustand";

export interface Agrement {
  numeroArrete: string;
  dateHomologation: string;
  autorite: string;
  statut: string;
  specialitesHomologuees: string[];
}

export interface Etablissement {
  id: string;
  name: string;
  shortName: string;
  code: string;
  city: string;
  country: string;
  logo: string;
  color: string;
  director: string;
  email: string;
  phone: string;
  address: string;
  description: string;
  agrement: Agrement;
}

export interface CoursCohorte {
  id: string;
  title: string;
  code: string;
  enseignant: {
    name: string;
    role: string;
    email: string;
    avatar: string;
  };
  totalModules: number;
  completedModules: number;
  progress: number;
  category: "Technique" | "Transversal" | "Fondamental";
}

export interface Cohorte {
  id: string;
  etablissementId: string;
  name: string;
  filiere: string;
  annee: string;
  dateDebut?: string;
  dateFin?: string;
  hasSpecificStartDate: boolean;
  mentionDebut: string;
  typeCohorte: "Formation Initiale" | "Bootcamp Intensif" | "Formation Continue" | "Alternance Pro";
  progressionGlobale: number;
  isCurrentApprenantCohorte?: boolean;
  cours: CoursCohorte[];
}

export const ETABLISSEMENTS_DATA: Etablissement[] = [
  {
    id: "etab-dakar",
    name: "Onixe Academy Dakar",
    shortName: "OA Dakar",
    code: "OAD",
    city: "Dakar",
    country: "Sénégal",
    logo: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=120&auto=format&fit=crop&q=80",
    color: "#2563eb",
    director: "Dr. Amadou Ba",
    email: "contact.dakar@onixe.academy",
    phone: "+221 33 849 20 20",
    address: "Almadies Zone 8, Route du Méridien, Dakar",
    description: "Campus d'excellence technologique spécialisé dans le génie logiciel, le cloud et la science des données.",
    agrement: {
      numeroArrete: "Arrêté Ministériel N° 004128/MESRI/DGES/DESP",
      dateHomologation: "12 Septembre 2023",
      autorite: "Ministère de l'Enseignement Supérieur, de la Recherche et de l'Innovation (Sénégal)",
      statut: "Agrément Définitif & Titres Homologués RNCP / ANAQ-SUP",
      specialitesHomologuees: [
        "Licence & Master Ingénierie Logicielle",
        "Titre Professionnel Développeur Fullstack",
        "Certification Cybersécurité Opérationnelle",
      ],
    },
  },
  {
    id: "etab-abidjan",
    name: "Institut Polytechnique Onixe Abidjan",
    shortName: "IPO Abidjan",
    code: "IPOA",
    city: "Abidjan",
    country: "Côte d'Ivoire",
    logo: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=120&auto=format&fit=crop&q=80",
    color: "#059669",
    director: "Prof. Christiane Yao",
    email: "contact.abidjan@onixe.academy",
    phone: "+225 27 22 40 50 60",
    address: "Cocody Danga, Boulevard Hassan II, Abidjan",
    description: "Pôle d'innovation panafricain pour le développement cloud, l'IA et l'entrepreneuriat numérique.",
    agrement: {
      numeroArrete: "Décision N° 2024-019/MESRS/DGES/DIP",
      dateHomologation: "04 Février 2024",
      autorite: "Ministère de l'Enseignement Supérieur et de la Recherche Scientifique (Côte d'Ivoire)",
      statut: "Établissement Privé d'Enseignement Supérieur Agréé FDFP",
      specialitesHomologuees: [
        "Diplôme d'Ingénieur Cloud & DevOps",
        "Expertise Big Data & Intelligence Artificielle",
      ],
    },
  },
  {
    id: "etab-yaounde",
    name: "Onixe Digital School Yaoundé",
    shortName: "ODS Yaoundé",
    code: "ODSY",
    city: "Yaoundé",
    country: "Cameroun",
    logo: "https://images.unsplash.com/photo-1562774053-701939374585?w=120&auto=format&fit=crop&q=80",
    color: "#7c3aed",
    director: "M. Jacques Eto'o",
    email: "contact.yaounde@onixe.academy",
    phone: "+237 222 20 15 15",
    address: "Bastos, Rue des Ambassades, Yaoundé",
    description: "École supérieure préparant aux carrières d'ingénierie logicielle, DevOps et cybersécurité.",
    agrement: {
      numeroArrete: "Arrêté N° 092/MINESUP/DDES/ESUP",
      dateHomologation: "18 Novembre 2023",
      autorite: "Ministère de l'Enseignement Supérieur (Cameroun)",
      statut: "Institut Supérieur Professionnel Autorisé",
      specialitesHomologuees: [
        "Bachelor Concepteur Développeur d'Applications",
        "Cybersécurité des Systèmes d'Information",
      ],
    },
  },
];

export const COHORTES_DATA: Cohorte[] = [
  // Dakar Cohortes
  {
    id: "cohorte-gl-2026",
    etablissementId: "etab-dakar",
    name: "Promo Onyx 2026 — Génie Logiciel",
    filiere: "Génie Logiciel & Architecture Applicative",
    annee: "2025 - 2026",
    dateDebut: "15 Octobre 2025",
    dateFin: "30 Juin 2026",
    hasSpecificStartDate: true,
    mentionDebut: "Démarrée le 15 Octobre 2025",
    typeCohorte: "Formation Initiale",
    progressionGlobale: 68,
    isCurrentApprenantCohorte: true,
    cours: [
      {
        id: "algo",
        title: "Algorithmique & Structures de Données",
        code: "CS-101",
        enseignant: {
          name: "Dr. Mamadou Diallo",
          role: "Enseignant Algorithme & Complexité",
          email: "m.diallo@onixe.academy",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
        },
        totalModules: 5,
        completedModules: 4,
        progress: 80,
        category: "Fondamental",
      },
      {
        id: "web",
        title: "Programmation Web & Frameworks Modernes",
        code: "DEV-202",
        enseignant: {
          name: "Sophie Martin",
          role: "Lead Formatrice Fullstack React/Next.js",
          email: "s.martin@onixe.academy",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
        },
        totalModules: 6,
        completedModules: 4,
        progress: 66,
        category: "Technique",
      },
      {
        id: "bdd",
        title: "Bases de Données Relationnelles & SQL",
        code: "DAT-201",
        enseignant: {
          name: "Ibrahima Koné",
          role: "Expert Bases de Données & Architecture SQL",
          email: "i.kone@onixe.academy",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
        },
        totalModules: 4,
        completedModules: 3,
        progress: 75,
        category: "Technique",
      },
      {
        id: "bureautique",
        title: "Bureautique & Outils Collaboratifs",
        code: "BUR-100",
        enseignant: {
          name: "Fatou Ndiaye",
          role: "Formatrice Outils Collaboratifs & Suite Office",
          email: "f.ndiaye@onixe.academy",
          avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80",
        },
        totalModules: 3,
        completedModules: 3,
        progress: 100,
        category: "Transversal",
      },
      {
        id: "francais",
        title: "Français Professionnel & Communication",
        code: "COM-105",
        enseignant: {
          name: "Marie-Claire Sow",
          role: "Responsable Communication Écrite & Orale",
          email: "mc.sow@onixe.academy",
          avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80",
        },
        totalModules: 4,
        completedModules: 3,
        progress: 75,
        category: "Transversal",
      },
    ],
  },
  {
    id: "cohorte-cyber-2026",
    etablissementId: "etab-dakar",
    name: "Promo Sentinelle 2026 — Cybersécurité & SOC",
    filiere: "Sécurité des Réseaux & Systèmes",
    annee: "2026",
    dateDebut: "15 Février 2027",
    hasSpecificStartDate: true,
    mentionDebut: "Date prévue : 15 Février 2027",
    typeCohorte: "Formation Initiale",
    progressionGlobale: 0,
    cours: [],
  },
  {
    id: "cohorte-bootcamp-dakar",
    etablissementId: "etab-dakar",
    name: "Bootcamp Intensif Fullstack AI & Python",
    filiere: "Développement Accéléré & Agents IA",
    annee: "2026 - 2027",
    hasSpecificStartDate: false,
    mentionDebut: "Inscriptions ouvertes — Démarrage dès constitution du groupe (sans date fixe)",
    typeCohorte: "Bootcamp Intensif",
    progressionGlobale: 0,
    cours: [],
  },
  {
    id: "cohorte-pro-continue",
    etablissementId: "etab-dakar",
    name: "Certification Professionnelle Cloud Architecture",
    filiere: "Formation Continue Salariés & Professionnels",
    annee: "Permanent",
    hasSpecificStartDate: false,
    mentionDebut: "Entrées et sorties permanentes toute l'année",
    typeCohorte: "Formation Continue",
    progressionGlobale: 0,
    cours: [],
  },

  // Abidjan Cohortes
  {
    id: "cohorte-fullstack-abj",
    etablissementId: "etab-abidjan",
    name: "Promo Palm 2026 — Fullstack Web & Cloud",
    filiere: "Ingénierie Web & Cloud Native",
    annee: "2025 - 2026",
    dateDebut: "10 Octobre 2025",
    dateFin: "20 Juin 2026",
    hasSpecificStartDate: true,
    mentionDebut: "Démarrée le 10 Octobre 2025",
    typeCohorte: "Formation Initiale",
    progressionGlobale: 55,
    cours: [
      {
        id: "cloud-devops",
        title: "Docker, Kubernetes & Cloud AWS",
        code: "CLD-301",
        enseignant: {
          name: "Kouamé N'Guessan",
          role: "Architecte Cloud",
          email: "k.nguessan@onixe.academy",
          avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80",
        },
        totalModules: 5,
        completedModules: 3,
        progress: 60,
        category: "Technique",
      },
    ],
  },
  {
    id: "cohorte-data-abj",
    etablissementId: "etab-abidjan",
    name: "Master Pro Data Science & Big Data",
    filiere: "Intelligence Artificielle & Modélisation",
    annee: "2026 - 2027",
    dateDebut: "01 Décembre 2026",
    hasSpecificStartDate: true,
    mentionDebut: "Date prévue : 01 Décembre 2026",
    typeCohorte: "Formation Initiale",
    progressionGlobale: 0,
    cours: [],
  },
  {
    id: "cohorte-alt-abj",
    etablissementId: "etab-abidjan",
    name: "Alternance Pro DevOps & Systèmes Embarqués",
    filiere: "Contrats d'apprentissage en entreprise",
    annee: "2026 - 2027",
    hasSpecificStartDate: false,
    mentionDebut: "Démarrage selon date de signature du contrat d'entreprise",
    typeCohorte: "Alternance Pro",
    progressionGlobale: 0,
    cours: [],
  },
];

interface AcademicState {
  etablissements: Etablissement[];
  cohortes: Cohorte[];
  activeEtablissementId: string;
  activeCohorteId: string;
  switchEtablissement: (id: string) => void;
  switchCohorte: (id: string) => void;
  getActiveEtablissement: () => Etablissement;
  getActiveCohorte: () => Cohorte;
  getCohortesByEtablissement: (etabId: string) => Cohorte[];
}

export const useAcademicStore = create<AcademicState>((set, get) => ({
  etablissements: ETABLISSEMENTS_DATA,
  cohortes: COHORTES_DATA,
  activeEtablissementId: "etab-dakar",
  activeCohorteId: "cohorte-gl-2026",

  switchEtablissement: (id: string) => {
    const cohortesOfEtab = get().cohortes.filter((c) => c.etablissementId === id);
    const newCohorteId = cohortesOfEtab.length > 0 ? cohortesOfEtab[0].id : "";
    set({
      activeEtablissementId: id,
      activeCohorteId: newCohorteId,
    });
  },

  switchCohorte: (id: string) => {
    set({ activeCohorteId: id });
  },

  getActiveEtablissement: () => {
    const { etablissements, activeEtablissementId } = get();
    return (
      etablissements.find((e) => e.id === activeEtablissementId) ||
      etablissements[0]
    );
  },

  getActiveCohorte: () => {
    const { cohortes, activeCohorteId } = get();
    return (
      cohortes.find((c) => c.id === activeCohorteId) ||
      cohortes[0]
    );
  },

  getCohortesByEtablissement: (etabId: string) => {
    return get().cohortes.filter((c) => c.etablissementId === etabId);
  },
}));
