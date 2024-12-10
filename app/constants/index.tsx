// import { Plane, Ship, Truck } from "lucide-react";

// export const serviceA: {}[] = [
//   {
//     id: 1,
//     icons: <Plane />,
//     title: "Envoie express",
//     desc: "Vos colis arrivent à destination en un clin d'oeil. (5 jours)",
//     price: "12000 FR/KG",
//     link: "express",
//   },
//   {
//     id: 2,
//     icons: <Plane />,
//     title: "Envoie Normal",
//     desc: "Profitez de tarifs avantageux pour vos envois de colis de 2 semaines.",
//     price: "9000 FR/KG",
//     link: "normal",
//   },
//   {
//     id: 3,
//     icons: <Ship />,
//     title: "Envoie Maritime",
//     desc: "Vos colis traversent les océans en toute sérénité avec notre service Envoie Maritime.",
//     price: "CBM(M3)",
//     link: "maritime",
//   },
// ];

export const services = [
  {
    id: 1,
    title: "Service Express",
    description:
      "Un service rapide et fiable pour vos envois urgents, avec des délais de livraison réduits.",
    price: "12,000 FCFA/KG",
    badge: "Rapide & Fiable",
    badgeColor: "blue",
    details: [
      { label: "Délai de livraison", value: "5 a 7 jours" },
      { label: "Type de colis", value: "Jusqu'à plus 1000 kg" },
      { label: "Couverture", value: "International" },
      { label: "Suivi", value: "En temps réel" },
    ],
  },
  {
    id: 2,
    title: "Service Normal",
    description:
      "Une option économique pour vos envois réguliers avec des délais standards.",
    price: "9,000 FCFA/KG",
    badge: "Économique",
    badgeColor: "green",
    details: [
      { label: "Délai de livraison", value: "7 a 14 jours" },
      { label: "Type de colis", value: "Jusqu'à plus 1000kg" },
      { label: "Couverture", value: "International" },
      { label: "Suivi", value: "En temps réel" },
    ],
  },
  {
    id: 3,
    title: "Service Maritime",
    description:
      "Idéal pour le transport de grandes quantités de marchandises à travers les océans.",
    price: "Tarif Variable (CBM)",
    badge: "Transport de Masse",
    badgeColor: "purple",
    details: [
      { label: "Délai de livraison", value: "45 a 65 jours" },
      { label: "Type de marchandise", value: "Volume élevé (CBM)" },
      { label: "Couverture", value: "International" },
      { label: "Tarification", value: "Basée sur le volume" },
    ],
  },
];
