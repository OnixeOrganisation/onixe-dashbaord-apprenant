"use client";

import { useState } from "react";

import { toast } from "sonner";

export interface Strate {
  id: number;
  name: string;
  title: string;
  description: string;
  progress: number;
  totalModules: number;
  completedModules: number;
  status: "validated" | "in_progress" | "locked";
}

export interface Echeance {
  id: string;
  title: string;
  moduleCode: string;
  moduleName: string;
  type: "TP" | "EXAM" | "LIVRABLE" | "QUIZ";
  dueDate: string;
  daysLeft: number;
  status: "urgent" | "upcoming" | "submitted";
}

export interface Annonce {
  id: string;
  title: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  content: string;
  tag: string;
  isPinned?: boolean;
}

export function useAccueil() {
  const [learner] = useState({
    name: "Aminata Diallo",
    cohorte: "Promo Onyx 2026 — Data & Software Engineering",
    etablissement: "Onixe Academy Dakar",
    totalProgress: 68,
    strateCourante: 2,
  });

  const [strates] = useState<Strate[]>([
    {
      id: 1,
      name: "Strate 1",
      title: "Fondations & Socle Algorithmique",
      description: "Maîtrise des structures de données, logique de programmation et principes Git/Linux.",
      progress: 100,
      totalModules: 4,
      completedModules: 4,
      status: "validated",
    },
    {
      id: 2,
      name: "Strate 2",
      title: "Pratique Guidée & TP Pro",
      description: "Architecture d'applications web, bases de données relationnelles et API RESTful.",
      progress: 65,
      totalModules: 5,
      completedModules: 3,
      status: "in_progress",
    },
    {
      id: 3,
      name: "Strate 3",
      title: "Autonomie & Delivery Industriel",
      description: "Projet fil rouge en condition d'entreprise, CI/CD, tests automatisés et mise en production.",
      progress: 0,
      totalModules: 4,
      completedModules: 0,
      status: "locked",
    },
  ]);

  const [prochainesEcheances] = useState<Echeance[]>([
    {
      id: "ech-1",
      title: "Rendu TP2 : Architecture API REST Node.js & PostgreSQL",
      moduleCode: "MOD-201",
      moduleName: "Backend & Databases",
      type: "TP",
      dueDate: "Demain à 23h59",
      daysLeft: 1,
      status: "urgent",
    },
    {
      id: "ech-2",
      title: "Soutenance à blanc : UI Component Library (shadcn/Tailwind)",
      moduleCode: "MOD-202",
      moduleName: "Frontend Modern Next.js",
      type: "LIVRABLE",
      dueDate: "Dans 4 jours (23 Sept)",
      daysLeft: 4,
      status: "upcoming",
    },
    {
      id: "ech-3",
      title: "Évaluation QCM : Design Patterns & Clean Code",
      moduleCode: "MOD-104",
      moduleName: "Génie Logiciel",
      type: "QUIZ",
      dueDate: "28 Septembre 2026",
      daysLeft: 9,
      status: "upcoming",
    },
  ]);

  const [annonces] = useState<Annonce[]>([
    {
      id: "ann-1",
      title: "Session Live Mentoring : Optimisation SQL & Indexation B-Tree",
      author: {
        name: "Dr. Ousmane Sow",
        role: "Lead Formateur Backend",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      },
      date: "Aujourd'hui à 10:15",
      content:
        "Rappel pour tous les apprenants de la promo Onyx : le workshop en direct aura lieu ce jeudi de 15h à 17h. Préparez vos requêtes lentes pour la séance d'analyse en direct.",
      tag: "Workshop Live",
      isPinned: true,
    },
    {
      id: "ann-2",
      title: "Ouverture des inscriptions aux Hackathons Partenaires Onixe",
      author: {
        name: "Direction Académique Onixe",
        role: "Administration",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80",
      },
      date: "Hier à 14:30",
      content:
        "Trois entreprises partenaires recherchent des étudiants pour le challenge FinTech Afrique 2026. Inscrivez-vous avant le 30 septembre auprès de votre référent.",
      tag: "Opportunités",
      isPinned: false,
    },
  ]);

  return { learner, strates, prochainesEcheances, annonces };
}

export interface ModuleNote {
  id: string;
  code: string;
  name: string;
  strate: string;
  score: number;
  maxScore: number;
  gradeLetter: string;
  qualitativeFeedback: string;
  formateur: string;
  dateValidation: string;
  status: "validé" | "en_cours" | "à_revoir";
}

export interface Competence {
  id: string;
  domain: string;
  name: string;
  description: string;
  level: "Acquis" | "En cours" | "Maîtrisé";
  proofUrl?: string;
  validatedAt: string;
}

export function useBulletin() {
  const [modulesNotes] = useState<ModuleNote[]>([
    {
      id: "m1",
      code: "MOD-101",
      name: "Algorithmique Avancée & Strates de Données",
      strate: "Strate 1",
      score: 18.5,
      maxScore: 20,
      gradeLetter: "A+",
      qualitativeFeedback:
        "Excellente maîtrise des arbres et graphes. Code propre, typé et bien documenté. Rendu rendu dans les délais impartis.",
      formateur: "Dr. Ousmane Sow",
      dateValidation: "15 Juin 2026",
      status: "validé",
    },
    {
      id: "m2",
      code: "MOD-102",
      name: "Environnement Linux, Bash & Git Workflows",
      strate: "Strate 1",
      score: 17.0,
      maxScore: 20,
      gradeLetter: "A",
      qualitativeFeedback:
        "Très bonne gestion des branches Git (Gitflow) et automatisation des scripts shell. Autonomie démontrée.",
      formateur: "Ing. Awa Diop",
      dateValidation: "02 Juillet 2026",
      status: "validé",
    },
    {
      id: "m3",
      code: "MOD-201",
      name: "Backend Architecture & Base de Données Relational SQL",
      strate: "Strate 2",
      score: 16.5,
      maxScore: 20,
      gradeLetter: "A-",
      qualitativeFeedback:
        "Modélisation conceptuelle (MCD/MLD) très rigoureuse. Attention particulière portée à l'isolation des requêtes.",
      formateur: "Dr. Ousmane Sow",
      dateValidation: "10 Août 2026",
      status: "validé",
    },
    {
      id: "m4",
      code: "MOD-202",
      name: "Frontend Application & System Design avec Next.js",
      strate: "Strate 2",
      score: 15.0,
      maxScore: 20,
      gradeLetter: "B+",
      qualitativeFeedback:
        "Très bon respect du design system sober et dense. Recommandation : approfondir la gestion du state serveur vs client.",
      formateur: "Ing. Mamadou Traoré",
      dateValidation: "En cours d'évaluation",
      status: "en_cours",
    },
  ]);

  const [competences] = useState<Competence[]>([
    {
      id: "comp-1",
      domain: "Génie Logiciel",
      name: "Conception d'APIs RESTful sécurisées",
      description:
        "Capacité à prototyper, documenter (OpenAPI) et sécuriser des endpoints avec JWT et middleware RBAC.",
      level: "Maîtrisé",
      validatedAt: "Août 2026",
    },
    {
      id: "comp-2",
      domain: "Base de données",
      name: "Modélisation & Optimisation SQL",
      description: "Normalisation jusqu'en 3NF, écriture de requêtes complexes et création d'index B-Tree optimisés.",
      level: "Maîtrisé",
      validatedAt: "Juillet 2026",
    },
    {
      id: "comp-3",
      domain: "Frontend UI/UX",
      name: "Composants React & Design System shadcn/ui",
      description:
        "Construction d'interfaces sobres, réactives, accessibles (ARIA) et réutilisables en TypeScript strict.",
      level: "Acquis",
      validatedAt: "Août 2026",
    },
    {
      id: "comp-4",
      domain: "DevOps & Cloud",
      name: "Containerisation Docker & Déploiement CI/CD",
      description: "Création de Dockerfiles multi-stage et pipelines GitHub Actions pour intégration continue.",
      level: "En cours",
      validatedAt: "En cours",
    },
  ]);

  const exportPDF = () => {
    toast.success("Téléchargement du relevé officiel de compétences (PDF)", {
      description: "Document certifié Onixe Academy — Signature numérique vérifiée.",
    });
    // Trigger browser print or download mock blob
    const element = document.createElement("a");
    const file = new Blob(
      [
        `RELEVE DE COMPETENCES & EVALUATIONS ONIXE ACADEMY\nApprenant : Aminata Diallo\nCohorte : Promo Onyx 2026\nDate : ${new Date().toLocaleDateString()}\nStatut : Strate 2 Validée avec Mention Très Bien`,
      ],
      { type: "text/plain" },
    );
    element.href = URL.createObjectURL(file);
    element.download = "Releve_Competences_Aminata_Diallo_Onixe.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return { modulesNotes, competences, exportPDF };
}

export interface EventCalendrier {
  id: string;
  title: string;
  type: "COURS" | "DEADLINE" | "ATELIER" | "EXAMEN";
  startDate: string;
  endDate: string;
  location: string;
  instructor: string;
  cohort: string;
  isMandatory: boolean;
}

export function useCalendrier() {
  const [events] = useState<EventCalendrier[]>([
    {
      id: "evt-1",
      title: "Atelier Pratique : Dockerization & Microservices",
      type: "ATELIER",
      startDate: "2026-09-22T09:00:00",
      endDate: "2026-09-22T12:30:00",
      location: "Salle Onyx A04 & En Ligne",
      instructor: "Ing. Awa Diop",
      cohort: "Promo Onyx 2026",
      isMandatory: true,
    },
    {
      id: "evt-2",
      title: "Rendu de TP : Modern Next.js Architecture",
      type: "DEADLINE",
      startDate: "2026-09-23T23:59:00",
      endDate: "2026-09-23T23:59:00",
      location: "Portail Apprenant Onixe",
      instructor: "Ing. Mamadou Traoré",
      cohort: "Promo Onyx 2026",
      isMandatory: true,
    },
    {
      id: "evt-3",
      title: "Session Live Mentoring : Code Review Peer-to-Peer",
      type: "COURS",
      startDate: "2026-09-25T14:00:00",
      endDate: "2026-09-25T16:00:00",
      location: "Amphi Central Dakar",
      instructor: "Dr. Ousmane Sow",
      cohort: "Promo Onyx 2026",
      isMandatory: false,
    },
    {
      id: "evt-4",
      title: "Évaluation Finale Strate 2 : Déploiement Fullstack",
      type: "EXAMEN",
      startDate: "2026-10-02T08:30:00",
      endDate: "2026-10-02T12:00:00",
      location: "Lab Informatique 2",
      instructor: "Jury Académique",
      cohort: "Promo Onyx 2026",
      isMandatory: true,
    },
  ]);

  const exportICS = () => {
    const icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Onixe Academy//Planning Cohorte//FR\nCALSCALE:GREGORIAN\nMETHOD:PUBLISH\nBEGIN:VEVENT\nSUMMARY:Planning Promo Onyx 2026\nDESCRIPTION:Calendrier officiel des cours et livrables Onixe Academy\nEND:VEVENT\nEND:VCALENDAR`;
    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", "Calendrier_Promo_Onyx_2026.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Calendrier exporté au format .ics");
  };

  return { events, exportICS };
}

export interface ParcoursModule {
  id: string;
  code: string;
  title: string;
  strate: string;
  description: string;
  durationHours: number;
  status: "terminé" | "en_cours" | "à_venir";
  progressPercentage: number;
  deadline?: string;
  resourcesCount: number;
}

export function useParcours() {
  const [modules] = useState<ParcoursModule[]>([
    {
      id: "mod-101",
      code: "MOD-101",
      title: "Algorithmique Avancée & Strates de Données",
      strate: "Strate 1",
      description: "Structures arborescentes, tables de hachage et complexité algorithmique Big-O.",
      durationHours: 40,
      status: "terminé",
      progressPercentage: 100,
      resourcesCount: 12,
    },
    {
      id: "mod-102",
      code: "MOD-102",
      title: "Environnement Linux, Scripting Bash & Git",
      strate: "Strate 1",
      description: "Prise en main approfondie du terminal, permissions Unix et gestion des versions.",
      durationHours: 35,
      status: "terminé",
      progressPercentage: 100,
      resourcesCount: 8,
    },
    {
      id: "mod-201",
      code: "MOD-201",
      title: "Backend Architecture & PostgreSQL",
      strate: "Strate 2",
      description: "Conception de micro-services backend, requêtes SQL performantes et ORM.",
      durationHours: 60,
      status: "en_cours",
      progressPercentage: 75,
      deadline: "23 Septembre 2026",
      resourcesCount: 15,
    },
    {
      id: "mod-202",
      code: "MOD-202",
      title: "Frontend Application & Next.js Design System",
      strate: "Strate 2",
      description: "Intégration d'UI sobres et denses avec React 19, TypeScript et composants Tailwind.",
      durationHours: 50,
      status: "en_cours",
      progressPercentage: 50,
      deadline: "28 Septembre 2026",
      resourcesCount: 10,
    },
    {
      id: "mod-301",
      code: "MOD-301",
      title: "DevOps, Docker & Delivery Industriel",
      strate: "Strate 3",
      description: "Pipelines CI/CD, conteneurs Docker et monitoring d'applications en production.",
      durationHours: 65,
      status: "à_venir",
      progressPercentage: 0,
      resourcesCount: 6,
    },
  ]);

  return { modules };
}

export function useModuleDetail(moduleId: string) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [submissionComment, setSubmissionComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const moduleDetail = {
    id: moduleId,
    code: "MOD-201",
    title: "Backend Architecture & PostgreSQL",
    strate: "Strate 2 : Pratique Guidée & TP Pro",
    instructor: "Dr. Ousmane Sow",
    deadline: "23 Septembre 2026 à 23h59",
    description:
      "Ce module vise à maîtriser la modélisation relationnelle rigoureuse et la création d'une architecture backend évolutive. L'accent est mis sur la lisibilité des requêtes SQL et le respect des normes d'architecture hexagonale.",
    consignes: [
      "Implémenter une API REST complète en TypeScript strict.",
      "Créer les migrations SQL pour PostgreSQL sans utiliser d'ORM générant du code implicite lourd.",
      "Inclure une suite de tests d'intégration couvrant au moins 80% des routes.",
      "Soumettre un fichier d'archive ZIP contenant le repository Git complet.",
    ],
    resources: [
      { name: "Support_Cours_Architecture_Backend.pdf", size: "3.4 MB", type: "PDF" },
      { name: "Template_Projet_Node_Postgres.zip", size: "1.2 MB", type: "ZIP" },
      { name: "Guide_Optimisation_Index_SQL.md", size: "450 KB", type: "MARKDOWN" },
    ],
    criteria: [
      {
        name: "Structure & Qualité du code",
        points: 6,
        desc: "Respect des règles Biome/ESLint, typage TypeScript exact.",
      },
      { name: "Schéma de Base de Données", points: 5, desc: "Normalisation 3NF, clés étrangères, indexations." },
      { name: "Tests d'intégration", points: 5, desc: "Couverture et gestion propre des cas d'erreur HTTP." },
      { name: "Documentation & README", points: 4, desc: "Explications claires pour lancer le projet localement." },
    ],
  };

  const handleSubmitWork = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.error("Veuillez sélectionner un fichier à rendre.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setHasSubmitted(true);
      toast.success("Travail soumis avec succès !", {
        description: `Fichier ${selectedFile.name} transmis à l'équipe pédagogique Onixe.`,
      });
    }, 1200);
  };

  return {
    moduleDetail,
    selectedFile,
    setSelectedFile,
    submissionComment,
    setSubmissionComment,
    isSubmitting,
    hasSubmitted,
    handleSubmitWork,
  };
}

export function useEvaluation(evalId: string) {
  const [evaluation] = useState({
    id: evalId,
    moduleTitle: "Backend Architecture & PostgreSQL",
    projectTitle: "TP2 : API REST Node.js & Schéma SQL Normalisé",
    submittedAt: "18 Septembre 2026 à 16:40",
    gradedAt: "19 Septembre 2026 à 11:20",
    grade: "17.5 / 20",
    gradeStatus: "Validé (Mention Excellent)",
    instructor: {
      name: "Dr. Ousmane Sow",
      role: "Lead Formateur Backend",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    },
    aiAnalysis: {
      summary:
        "L'analyse automatisée de la soumission montre une excellente structuration du code. Les patterns de sécurité OWASP sont bien respectés.",
      strengths: [
        "Indexation SQL particulièrement pertinente sur les colonnes fréquemment requêtées.",
        "Gestion d'erreurs centralisée via un middleware propre sans fuite d'informations sensibles.",
        "Code TypeScript sans usage de 'any'.",
      ],
      areasToImprove: [
        "Penser à paramétrer le pool de connexions PostgreSQL selon la charge max.",
        "Ajouter une métrique de temps de réponse sur l'endpoint de recherche.",
      ],
    },
    instructorComments:
      "Travail remarquable Aminata. La clarté de ta modélisation relationnelle montre une grande maturité technique. Continuer ainsi pour la Strate 3 !",
    rubricDetails: [
      {
        criterion: "Structure & Qualité du code",
        score: 5.5,
        maxScore: 6,
        feedback: "Excellente lisibilité et découpage.",
      },
      { criterion: "Schéma de Base de Données", score: 5.0, maxScore: 5, feedback: "Schéma impeccable 3NF." },
      {
        criterion: "Tests d'intégration",
        score: 4.0,
        maxScore: 5,
        feedback: "Quelques cas d'erreurs de sous-ressources à ajouter.",
      },
      {
        criterion: "Documentation & README",
        score: 3.0,
        maxScore: 4,
        feedback: "README complet mais manque schéma d'architecture.",
      },
    ],
    revisionAllowed: true,
    revisionHistory: [
      {
        version: "v1 (Initiale)",
        date: "14 Septembre 2026",
        fileName: "TP2_backend_v1.zip",
        grade: "14.0 / 20",
        comment: "Première version transmise. Corrections demandées sur l'isolation des transactions.",
      },
      {
        version: "v2 (Révisée - Actuelle)",
        date: "18 Septembre 2026",
        fileName: "TP2_backend_v2_final.zip",
        grade: "17.5 / 20",
        comment: "Version corrigée et validée avec brio.",
      },
    ],
  });

  return { evaluation };
}

export function useAssiduite() {
  const [stats] = useState({
    attendanceRate: 95.5,
    presentCount: 43,
    lateCount: 2,
    justifiedAbsenceCount: 1,
    unjustifiedAbsenceCount: 0,
    totalSessions: 46,
  });

  const [history] = useState([
    { id: "s1", date: "19 Sept 2026", course: "Frontend Modern Next.js", status: "Présent", hours: 4 },
    { id: "s2", date: "18 Sept 2026", course: "Backend & Databases SQL", status: "Présent", hours: 4 },
    { id: "s3", date: "16 Sept 2026", course: "Code Review Peer-to-Peer", status: "Retard (10 min)", hours: 2 },
    { id: "s4", date: "12 Sept 2026", course: "Workshop Git Workflows", status: "Absence justifiée", hours: 3 },
    { id: "s5", date: "10 Sept 2026", course: "Algorithmique Avancée", status: "Présent", hours: 4 },
  ]);

  const submitSignalement = (data: { type: string; module: string; reason: string }) => {
    toast.success("Demande transmise au secrétariat pédagogique", {
      description: `Motif : ${data.type} pour le module ${data.module}. Réponse sous 24h.`,
    });
  };

  return { stats, history, submitSignalement };
}

export function useMessagerie() {
  const [activeChannel, setActiveChannel] = useState<"formateur" | "cohorte">("formateur");
  const [messageInput, setMessageInput] = useState("");

  const [formateurMessages, setFormateurMessages] = useState([
    {
      id: "m1",
      sender: "Dr. Ousmane Sow",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      role: "Lead Formateur Backend",
      time: "Hier 16:30",
      content:
        "Bonjour Aminata, j'ai relu ta soumission sur le TP2 SQL. La structure des index est vraiment propre. As-tu des questions sur les transactions ACID ?",
    },
    {
      id: "m2",
      sender: "Aminata Diallo",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      role: "Apprenant",
      time: "Hier 17:05",
      content:
        "Merci Dr. Sow ! J'avais une hésitation sur le niveau d'isolation 'REPEATABLE READ' par rapport à 'SERIALIZABLE' dans le cas des verrous optimistes.",
    },
    {
      id: "m3",
      sender: "Dr. Ousmane Sow",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      role: "Lead Formateur Backend",
      time: "Hier 17:15",
      content:
        "Excellente question. Dans la majorité des cas en SaaS B2B, REPEATABLE READ avec une colonne 'version' suffit largement. Nous en reparlerons au live de demain !",
    },
  ]);

  const [cohorteMessages, setCohorteMessages] = useState([
    {
      id: "c1",
      sender: "Koffi Mensah",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
      role: "Apprenant",
      time: "Aujourd'hui 09:10",
      content: "Hello Promo Onyx ! Est-ce que quelqu'un a testé les dernières puces M3 avec Docker Compose ?",
    },
    {
      id: "c2",
      sender: "Fatou Ndiaye",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
      role: "Apprenant",
      time: "Aujourd'hui 09:25",
      content:
        "Oui Koffi, pense bien à préciser '--platform linux/amd64' dans ton compose file pour les images legacy Postgres.",
    },
  ]);

  const sendMessage = () => {
    if (!messageInput.trim()) return;
    const newMsg = {
      id: Date.now().toString(),
      sender: "Aminata Diallo",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      role: "Apprenant",
      time: "À l'instant",
      content: messageInput.trim(),
    };

    if (activeChannel === "formateur") {
      setFormateurMessages((prev) => [...prev, newMsg]);
    } else {
      setCohorteMessages((prev) => [...prev, newMsg]);
    }
    setMessageInput("");
  };

  return {
    activeChannel,
    setActiveChannel,
    messageInput,
    setMessageInput,
    messages: activeChannel === "formateur" ? formateurMessages : cohorteMessages,
    sendMessage,
  };
}

export function useProfil() {
  const [centreInfo] = useState({
    name: "École Polytechnique - Campus de Palaiseau",
    subtitle: "Centre d'Excellence en Génie Logiciel, IA & Cloud Infrastructure",
    code: "EP-LMS-2026",
    agrementBadge: "Agrément Officiel",
    address: "Route de Saclay, 91128 Palaiseau Cedex, France",
    region: "Région Île-de-France",
    campusType: "Campus Universitaire",
    emailSupport: "pedagogie-lms@polytechnique.edu",
    phoneStandard: "+33 1 69 33 30 00",
    phoneUrgence: "+33 1 69 33 39 99",
    agrementMinisteriel: "Agrément Ministériel N° 91029384-A",
    certificationQualite: "Certification Qualiopi N° QUA2026-991 (Actions de Formation)",
    directeurGeneral: "Prof. Jean-Pierre Dufour",
    tutelleAcademique: "Ministère de l'Enseignement Supérieur",
  });

  const [profile, setProfile] = useState({
    name: "Aminata Diallo",
    prenom: "Aminata",
    nomFamille: "Diallo",
    email: "aminata.diallo@onixe.academy",
    phone: "+221 77 123 45 67",
    dateNaissance: "14 Mai 2002",
    matricule: "202491029384X",
    adresseCertifiee: "12 Rue de l'Université, Dakar, Sénégal",
    contactUrgence: "Marie Diallo (Mère) - +221 77 698 76 54",
    city: "Dakar, Sénégal",
    bio: "Passionnée par l'ingénierie logicielle et les architectures de données distribuées. En formation intensive au sein de l'Académie Onixe.",
    cohorte: "Promo Onyx 2026 — Data & Software Engineering",
    etablissement: "École Polytechnique - Campus de Palaiseau",
    github: "https://github.com/aminatadiallo-dev",
    linkedin: "https://linkedin.com/in/aminata-diallo-onixe",
  });

  const [portfolio, setPortfolio] = useState([
    {
      id: "port-1",
      title: "Clean Backend Architecture & SQL Engine",
      module: "Backend & Databases (MOD-201)",
      description: "API RESTful haute performance développée en Node.js, TypeScript et PostgreSQL normalisé.",
      tags: ["TypeScript", "PostgreSQL", "REST API", "Docker"],
      isPublic: true,
      githubUrl: "https://github.com/onixe-demo/clean-backend-sql",
    },
    {
      id: "port-2",
      title: "UI Component Library for Modern Academies",
      module: "Frontend Next.js (MOD-202)",
      description: "Système de composants réutilisables basés sur Tailwind CSS v4 et shadcn/ui pour tableaux de bord.",
      tags: ["Next.js 16", "Tailwind", "shadcn/ui", "Radix"],
      isPublic: true,
      githubUrl: "https://github.com/onixe-demo/ui-academy-system",
    },
    {
      id: "port-3",
      title: "Algorithmes de Recherche et Tri Optimisés",
      module: "Algorithmique Avancée (MOD-101)",
      description: "Implémentation d'arbres AVL et graphes pondérés avec tests de charge comparative.",
      tags: ["Algorithms", "Data Structures", "Big-O"],
      isPublic: false,
    },
  ]);

  const togglePublic = (id: string) => {
    setPortfolio((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextState = !item.isPublic;
          toast.info(nextState ? "Projet rendu public dans le portfolio Onixe" : "Projet repassé en mode privé");
          return { ...item, isPublic: nextState };
        }
        return item;
      }),
    );
  };

  const updateProfile = (updated: Partial<typeof profile>) => {
    setProfile((prev) => ({ ...prev, ...updated }));
    toast.success("Informations de profil mises à jour avec succès.");
  };

  return { centreInfo, profile, portfolio, togglePublic, updateProfile };
}

export function useDocuments() {
  const [documents] = useState([
    {
      id: "doc-1",
      title: "Certificat d'Inscription — Promo Onyx 2026",
      type: "Attestation",
      date: "01 Septembre 2026",
      size: "1.4 MB",
      format: "PDF Certifié",
    },
    {
      id: "doc-2",
      title: "Attestation de Validation — Strate 1 (Fondations)",
      type: "Certificat",
      date: "15 Juillet 2026",
      size: "2.1 MB",
      format: "PDF Certifié",
    },
    {
      id: "doc-3",
      title: "Convention d'Apprentissage & Charte Académique",
      type: "Convention",
      date: "25 Août 2026",
      size: "890 KB",
      format: "PDF",
    },
  ]);

  const [billing] = useState({
    tuitionStatus: "A jour",
    totalAmount: "1 500 000 XOF",
    amountPaid: "1 500 000 XOF",
    remainingAmount: "0 XOF",
    badge: "Payé",
    schedule: [
      { date: "01/09/2026", label: "Acompte à l'inscription", amount: "500 000 XOF", status: "Payé" },
      { date: "01/10/2026", label: "Tranche 2 — Strate 2", amount: "500 000 XOF", status: "Payé" },
      { date: "01/11/2026", label: "Tranche 3 — Strate 3", amount: "500 000 XOF", status: "Payé" },
    ],
  });

  const downloadDoc = (docTitle: string) => {
    toast.success(`Téléchargement de ${docTitle}`, {
      description: "Vérification du filigrane de sécurité Onixe en cours...",
    });
  };

  return { documents, billing, downloadDoc };
}

export function useCohorte() {
  const [cohorteInfo] = useState({
    name: "Promo Onyx 2026",
    specialty: "Data & Software Engineering",
    etablissement: "Onixe Academy Dakar",
    startDate: "01 Février 2026",
    endDate: "30 Novembre 2026",
    totalStudents: 28,
    activeStrate: "Strate 2 : Pratique Guidée & TP Pro",
  });

  const [teachers] = useState([
    {
      id: "t1",
      name: "Dr. Ousmane Sow",
      role: "Lead Formateur Backend & DB Architecture",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      email: "o.sow@onixe.academy",
      bio: "Docteur en Génie Logiciel, 12 ans d'expérience en architecture distribuée et optimisation de bases de données relationnelles.",
      officeHours: "Jeudi de 14h00 à 16h00 (Salle Onyx A04 & Distanciel)",
      modules: ["MOD-101 Algorithmique", "MOD-201 Backend & SQL"],
    },
    {
      id: "t2",
      name: "Ing. Awa Diop",
      role: "Formatrice DevOps & Infrastructure Cloud",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
      email: "a.diop@onixe.academy",
      bio: "Ingénieure DevOps sénior, spécialiste Docker, Kubernetes et pipelines de CI/CD automatisés en environnement de production.",
      officeHours: "Mardi de 10h00 à 12h00 (Lab 2)",
      modules: ["MOD-102 Linux & Git", "MOD-301 DevOps & Cloud"],
    },
    {
      id: "t3",
      name: "Ing. Mamadou Traoré",
      role: "Formateur Frontend & System Design",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      email: "m.traore@onixe.academy",
      bio: "Architecte Web Frontend, passionné par Next.js, les thèmes sobres et denses, et l'accessibilité web (WCAG).",
      officeHours: "Vendredi de 15h00 à 17h00 (En Ligne)",
      modules: ["MOD-202 Next.js & UI"],
    },
  ]);

  const [students] = useState([
    { id: "s1", name: "Aminata Diallo", email: "aminata.diallo@onixe.academy", status: "Déléguée de promo" },
    { id: "s2", name: "Koffi Mensah", email: "koffi.mensah@onixe.academy", status: "Membre" },
    { id: "s3", name: "Fatou Ndiaye", email: "fatou.ndiaye@onixe.academy", status: "Membre" },
    { id: "s4", name: "Ibrahima Bah", email: "ibrahima.bah@onixe.academy", status: "Membre" },
    { id: "s5", name: "Grace Kassi", email: "grace.kassi@onixe.academy", status: "Membre" },
  ]);

  return { cohorteInfo, teachers, students };
}

export function useDocumentationEcole() {
  const [folders] = useState([
    {
      id: "folder-1",
      name: "1. Charte & Règlement Intérieur",
      description: "Code de conduite, politiques d'assiduité et charte d'utilisation des laboratoires informatiques.",
      documentCount: 3,
      docs: [
        { title: "Reglement_Interieur_Onixe_2026.pdf", size: "1.2 MB", updated: "15 Janv 2026" },
        { title: "Charte_Ethique_et_Anti_Plagiat.pdf", size: "850 KB", updated: "15 Janv 2026" },
        { title: "Politique_Assiduite_et_Emargement.pdf", size: "620 KB", updated: "01 Fév 2026" },
      ],
    },
    {
      id: "folder-2",
      name: "2. Guides Pédagogiques & Outils",
      description: "Guides de prise en main du portail Onixe, accès Git, environnement Docker et outils dev.",
      documentCount: 4,
      docs: [
        { title: "Guide_Apprenant_Methode_Strates.pdf", size: "2.4 MB", updated: "20 Fév 2026" },
        { title: "Configuration_Environnement_Dev_Linux.pdf", size: "1.8 MB", updated: "01 Mars 2026" },
        { title: "Manuel_Utilisation_Portail_Apprenant.pdf", size: "3.1 MB", updated: "10 Mars 2026" },
        { title: "Accès_Serveurs_et_Bases_Donnees_Lab.pdf", size: "950 KB", updated: "15 Avril 2026" },
      ],
    },
    {
      id: "folder-3",
      name: "3. Projets Fil Rouge & Modèles",
      description: "Modèles de présentations pour soutenances, trames de cahier des charges et grilles type.",
      documentCount: 3,
      docs: [
        { title: "Cahier_des_Charges_Type_Projet_Onyx.docx", size: "1.1 MB", updated: "10 Mai 2026" },
        { title: "Template_Presentation_Soutenance_Onixe.pptx", size: "4.5 MB", updated: "01 Juin 2026" },
        { title: "Grille_Evaluation_Standard_Strates.pdf", size: "780 KB", updated: "12 Juin 2026" },
      ],
    },
  ]);

  const downloadDoc = (docTitle: string) => {
    toast.success(`Téléchargement de ${docTitle}`, {
      description: "Ressource officielle consultable hors-ligne.",
    });
  };

  return { folders, downloadDoc };
}

export function useCoursLesson(moduleId: string) {
  const [activeLessonId, setActiveLessonId] = useState("les-201-1");
  const [completedLessons, setCompletedLessons] = useState<string[]>(["les-201-1"]);
  const [learnerNote, setLearnerNote] = useState("");

  const courseData = {
    moduleId,
    moduleCode: "MOD-201",
    moduleTitle: "Backend Architecture & PostgreSQL",
    instructor: "Dr. Ousmane Sow",
    chapters: [
      {
        id: "chap-1",
        title: "Chapitre 1 : Modélisation Relationnelle 3NF & SQL Pro",
        lessons: [
          {
            id: "les-201-1",
            title: "1.1 Introduction et Normalisation jusqu'en 3NF",
            duration: "25 min",
            type: "video",
          },
          {
            id: "les-201-2",
            title: "1.2 Définition des clés primaires, étrangères et contraintes",
            duration: "40 min",
            type: "article",
          },
          {
            id: "les-201-3",
            title: "1.3 Indexation B-Tree et requêtes EXPLAIN ANALYZE",
            duration: "50 min",
            type: "video",
          },
        ],
      },
      {
        id: "chap-2",
        title: "Chapitre 2 : Architecture d'API RESTful en TypeScript",
        lessons: [
          {
            id: "les-201-4",
            title: "2.1 Structure du projet et séparation Controller / Service / Repository",
            duration: "35 min",
            type: "video",
          },
          {
            id: "les-201-5",
            title: "2.2 Middleware de sécurité et gestion centralisée des erreurs",
            duration: "45 min",
            type: "article",
          },
          {
            id: "les-201-6",
            title: "2.3 Pool de connexions PostgreSQL et transactions ACID",
            duration: "60 min",
            type: "video",
          },
        ],
      },
    ],
  };

  const activeLessonContent = {
    id: activeLessonId,
    title: "1.1 Introduction et Normalisation jusqu'en 3NF",
    chapterTitle: "Chapitre 1 : Modélisation Relationnelle 3NF & SQL Pro",
    summary:
      "Dans cette leçon, nous découvrons les trois premières formes normales (1NF, 2NF, 3NF) indispensables pour concevoir des bases de données relationnelles sans redondance.",
    keyTakeaways: [
      "1NF : Chaque colonne doit contenir une valeur atomique.",
      "2NF : Chaque attribut non-clé dépend entièrement de la clé primaire.",
      "3NF : Aucun attribut non-clé ne doit dépendre d'un autre attribut non-clé.",
    ],
    codeSnippet: `CREATE TABLE users (\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n  email VARCHAR(255) UNIQUE NOT NULL,\n  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()\n);`,
  };

  const toggleLessonCompletion = (lessonId: string) => {
    setCompletedLessons((prev) => {
      if (prev.includes(lessonId)) {
        return prev.filter((id) => id !== lessonId);
      }
      toast.success("Leçon marquée comme terminée !");
      return [...prev, lessonId];
    });
  };

  return {
    courseData,
    activeLessonId,
    setActiveLessonId,
    activeLessonContent,
    completedLessons,
    toggleLessonCompletion,
    learnerNote,
    setLearnerNote,
  };
}
