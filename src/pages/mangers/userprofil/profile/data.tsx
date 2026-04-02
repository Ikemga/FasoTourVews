import {
  List,
  User,
  Key,
  Pencil,
  Image,
  Lock,
  Laptop,
  MailCheck
} from "lucide-react";

export const INITIAL_USER = {
  firstName: "Sophie",
  lastName: "Moreau",
  handle: "@sophiemoreau",
  role: "Designer Senior",
  email: "sophie@moreau.fr",
  phone: "+33 6 12 34 56 78",
  location: "Paris, France",
  website: "https://sophiemoreau.fr",
  bio: "Designer passionnée, spécialisée en UX/UI et design systems. J'aime créer des interfaces qui allient beauté et fonctionnalité.",
  stats: [
    { val: "142", lbl: "Projets" },
    { val: "38",  lbl: "Équipes" },
    { val: "4.9", lbl: "Score" },
  ],
  avatar: "https://i.pravatar.cc/200?img=47",
  cover:  "https://images.unsplash.com/photo-1604147706283-d7119b5b822c?w=1200&q=80",
};

export const ACTIVITIES = [
  {
    icon: Key,
    color: "rgba(92,184,142,0.12)",
    title: "Connexion réussie",
    meta: "Chrome · Paris, France",
    time: "Il y a 2 min"
  },
  {
    icon: Pencil,
    color: "rgba(201,168,76,0.12)",
    title: "Profil mis à jour",
    meta: "Bio et localisation modifiées",
    time: "Hier 14h22"
  },
  {
    icon: Image,
    color: "rgba(100,130,224,0.12)",
    title: "Photo de profil modifiée",
    meta: "avatar_new.png · 134 Ko",
    time: "Hier 11h05"
  },
  {
    icon: Lock,
    color: "rgba(224,92,92,0.12)",
    title: "Mot de passe changé",
    meta: "Safari · iPhone · Paris",
    time: "12 juin 2025"
  },
  {
    icon: Laptop,
    color: "rgba(92,184,142,0.12)",
    title: "Connexion depuis un nouvel appareil",
    meta: "Firefox · Lyon, France",
    time: "10 juin 2025"
  },
  {
    icon: MailCheck,
    color: "rgba(201,168,76,0.12)",
    title: "Adresse email vérifiée",
    meta: "sophie@moreau.fr confirmée",
    time: "2 juin 2025"
  }
];


export const TABS = [
  { id: "info",     label: "Infos",     icon: <User size={16} /> },
  { id: "edit",     label: "Modifier",  icon: <Pencil size={16} /> },
  { id: "password", label: "Mot de passe", icon: <Lock size={16} /> },
  { id: "avatar",   label: "Avatar",    icon: <Image size={16} /> },
  { id: "activity", label: "Activité",  icon: <List size={16} /> },
];