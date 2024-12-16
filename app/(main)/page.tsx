"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  AlignJustify,
  ArrowRight,
  CircleOff,
  Copy,
  FileSearch,
  Forward,
  Frown,
  Package,
  Plus,
  Search,
  Star,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";

import { motion, useInView } from "framer-motion";

import { v4 as uuidv4 } from "uuid";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { IconFacebook, IconInstagram, IconTikTok } from "@/icons";
import { Input } from "@/components/ui/input";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from "@tanstack/react-query";
import { postDataById2, postNewAdressAnonyme } from "../api";
import { services } from "../constants";
import axios from "axios";
import { useRouter } from "next/navigation";

const queryClient = new QueryClient();

const Page = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <PageRef />
    </QueryClientProvider>
  );
};
const PageRef = () => {
  const navigation = useRouter();
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialog2, setOpenDialog2] = useState(false);
  const [openDialogServices, setOpenDialogServices] = useState(false);
  const [openSheet, setOpenSheet] = useState(false);
  const [openSheet2, setOpenSheet2] = useState(false);
  const [openSheet3, setOpenSheet3] = useState(false);
  const [openSheetNav, setOpenSheetNav] = useState(false);
  const [copied, setCopied] = useState(false);
  const [trackCode, setTrackCode] = useState("");
  const [trackingData, setTrackingData] = useState<any[]>([]);
  const [trackingData2, setTrackingData2] = useState<any[]>([]);
  const [trackcode, setTrackcode] = useState(uuidv4());
  const [isLoading, setIsLoading] = React.useState(false);

  const ref = useRef<HTMLDivElement | null>(null); // Typage de la référence
  const isInView = useInView(ref); // Assurez-vous que "ref" est correctement typé
  const ref2 = useRef<HTMLDivElement | null>(null);
  const isInView2 = useInView(ref2);

  const ref3 = useRef<HTMLDivElement | null>(null);
  const isInView3 = useInView(ref3);

  const [formData, setFormData] = useState({
    nom: "",
    numero: "+225",
    etat: "En attente de reception",
    prix: 0,
    poids: "0",
    tailes: "0",
    daten: new Date(Date.now()),
    condition: false,
    quantite: 0,
    images: "",
    images2: "",
    images3: "",
    service: "",
    typec: "",
    trackcode: trackcode,
  });

  // État pour stocker l'URL de l'image agrandie
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Fonction pour afficher l'image en grand
  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const [codeError, setCodeError] = useState("");
  const gridRef = useRef<HTMLDivElement>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Réinitialiser après 2 secondes
    });
  };

  const mutation = useMutation({
    mutationFn: (trackCode: any) => {
      return postDataById2(trackCode);
    },
  });

  const mutation2 = useMutation({
    mutationFn: (trackCode: any) => {
      return postNewAdressAnonyme(trackCode);
    },
  });

  const handleCopyAdress = (el: any) => {
    if (gridRef.current) {
      const gridContent = gridRef.current.innerText;
      if (gridContent) {
        navigator.clipboard.writeText(gridContent);
        // toast.success("Le code a été bien copié");
      }
    }
    // toast.success("Le code a été bien copier ");
  };

  const handleShare = () => {
    if (gridRef.current) {
      const textToShare = gridRef.current.innerText;
      if (navigator.share) {
        navigator
          .share({
            title: "Adresse",
            text: textToShare,
          })
          .then(() => {
            console.log("Partage réussi !");
          })
          .catch((error) => {
            console.error("Erreur lors du partage :", error);
          });
      } else {
        alert(
          "La fonction de partage n'est pas prise en charge par votre navigateur."
        );
      }
    }
  };

  const shortCode = "+2250713441784";
  let accessToken: any = null;

  const handleClickR = async () => {
    try {
      const response = await fetch("/api/bulksms", {
        method: "POST",
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(`Erreur: ${response.statusText}`);
      }
      accessToken = data.access_token;
    } catch (error) {
      console.error("Erreur lors de l'appel de l'API:", error);
    }
  };

  const sendSMS = async (phoneNumber: string, message: string) => {
    // if (!accessToken) {
    await handleClickR();
    // }

    try {
      await axios.post(
        `https://api.orange.com/smsmessaging/v1/outbound/tel:+2250713441784/requests`,
        {
          outboundSMSMessageRequest: {
            address: `tel:${phoneNumber}`,
            senderAddress: `tel:${shortCode}`,
            outboundSMSTextMessage: {
              message: message,
            },
          },
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      // setStatus('SMS sent successfully');
    } catch (error) {
      console.error("Error sending SMS:", error);
      // setStatus('Failed to send SMS');
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    mutation2.mutate(formData, {
      onSuccess(data, variables, context) {
        // console.log(data);

        sendSMS(
          data.reservation.numero,
          `ROYAL CARGO \nBONJOUR CHER CLIENT (${data.reservation.nom}). NOUS SOMMES RAVIS DE VOUS ANNONCER QUE LE STATUT DE VOTRE COLIS A CHANGÉ, IL EST MAINTENANT PASSÉ À **${data.reservation.etat}**. \nVOUS POUVEZ CONSULTER LES DÉTAILS EN CLIQUANT ICI : https://royalcargo225.com/colistrack/${data.reservation.trackcode}
          \n Contacter nous au +2250585327910
          `
        );

        setIsLoading(true);

        setTimeout(() => {
          // setOpenDialog(false);
          setOpenDialogServices(false);
          setOpenDialog2(true);
          setIsLoading(false);
        }, 3000);

        setTrackingData((state) => [...state, data.reservation]);
        //
      },
    });

    // console.log(dataTrack);

    const newTrackcode = uuidv4();
    setTrackcode(newTrackcode);
    setFormData((prevData) => ({
      ...prevData,
      nom: "",
      numero: "+225",
      etat: "En attente de reception",
      prix: 0,
      poids: "0",
      tailes: "0",
      daten: new Date(Date.now()),
      condition: false,
      quantite: 0,
      images: "",
      images2: "",
      images3: "",
      service: "",
      typec: "",
      trackcode: newTrackcode, // Mettre à jour le trackcode
    }));
  };

  return (
    <main className="max-w-[1300px] m-auto px-10">
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          type: "tween",
          duration: 0.2,
          delay: 0.2,
          // ease: [0.25, 0.25, 0.25, 0.75],
        }}
        className="relative w-full h-full  bg-pattern4 bg-center  bg-cover rounded-3xl flex items-center justify-start py-32 pb-10 md:h-[70vh] md:pb-0"
      >
        <div className="absolute inset-0 bg-black opacity-50 rounded-3xl"></div>
        <header className="absolute top-0 left-0 w-[95%] h-20 bg-white z-50 rounded-br-full max-w-[1300px] m-auto flex items-center justify-between pr-8">
          <Link href="/">
            <Image
              className="w-50 h-40 object-contain "
              src="/logo.png"
              objectFit="contain"
              width={100}
              height={100}
              alt="log"
            />
          </Link>
          <nav className="hidden md:block">
            <ul className="flex items-center gap-9">
              <li>
                <Link
                  href="/"
                  className={`transition-all hover:text-[#1a76cb] text-[18px] font-semibold`}
                >
                  Acceuil
                </Link>
              </li>
              <li>
                <Link
                  href="/apropos"
                  className={` 
              transition-all hover:text-[#1a76cb] text-[18px] font-semibold`}
                >
                  A propos
                </Link>
              </li>
              <li>
                <Link
                  href={`/services`}
                  className="transition-all hover:text-[#1a76cb] text-[18px] font-semibold"
                >
                  Nos services
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className={`transition-all hover:text-[#1a76cb] text-[18px] font-semibold`}
                >
                  Contact
                </Link>
              </li>

              <li>
                <div
                  className="lex items-center bg-[#1a76cb] rounded-full cursor-pointer p-2"
                  onClick={() => setOpenDialog(true)}
                >
                  <FileSearch size={20} color="#fff" />
                </div>
              </li>
            </ul>
          </nav>

          <div
            className="md:hidden"
            onClick={() => {
              setOpenSheetNav(true);
            }}
          >
            <AlignJustify size={30} />
          </div>
        </header>
        <div className="px-10 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "tween",
              duration: 0.5,
              delay: 0.3,
              // ease: [0.25, 0.25, 0.25, 0.75],
            }}
            className="text-3xl text-white font-bold md:text-5xl"
          >
            Votre Colis entre les mains de <br />
            professionnels
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "tween",
              duration: 0.8,
              delay: 0.4,
              // ease: [0.25, 0.25, 0.25, 0.75],
            }}
          >
            <p className="text-2xl text-white">
              Recevez vos colis de la Chine vers la Côte d'Ivoire en sécurité et
              garantie.
            </p>
            <div></div>
            <p className="text-white">
              Faites confiance à des professionnels pour acheminer vos colis de
              la Chine vers la Côte d’Ivoire, <br /> avec une sécurité et une
              garantie irréprochables.
            </p>

            <div className="inverted-radius"></div>

            <div
              className="mt-3 flex items-center bg-[#1a76cb] w-32 rounded-full cursor-pointer"
              onClick={() => setOpenDialog(true)}
            >
              <span className="text-white text-lg p-2">Tracking</span>
              <div className="">
                <FileSearch size={30} color="#fff" />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <section className="grid items-center justify-center mt-20 ">
        <div className="grid grid-cols-3 gap-10 items-center"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "tween",
                duration: 0.3,
                // delay: 0.9,
                delay: index * 0.2, // Augmente le délai pour chaque carte
                ease: [0.25, 0.25, 0.25, 0.75],
              }}
              key={service.id}
              className="bg-white shadow-md hover:shadow-lg rounded-lg p-6 transition duration-300 cursor-pointer"
              onClick={() => {
                setOpenDialogServices(true);
                setFormData({ ...formData, service: service.title });
              }}
            >
              <div
                className={`inline-block bg-blue-100 text-blue-700  text-xs font-semibold py-1 px-2 rounded mb-4`}
              >
                {service.badge}
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">
                {service.title}
              </h2>
              <h5 className="text-sm text-gray-500">{service.description}</h5>

              <div className="mt-6 space-y-2">
                {service.details.map((detail, index) => (
                  <div
                    key={index}
                    className="flex justify-between text-gray-500"
                  >
                    {detail.label}{" "}
                    <span className="text-gray-800 font-medium">
                      {detail.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center text-gray-800">
                <span className="text-2xl font-bold">{service.price}</span>
              </div>

              <span
                className={`block mt-6  text-white text-center py-2 rounded transition ${
                  service.id === 1 && "bg-blue-400"
                } ${service.id === 2 && "bg-green-400"} ${
                  service.id === 3 && "bg-purple-400"
                } ${service.id === 1 && "hover:bg-blue-700"} ${
                  service.id === 2 && "hover:bg-green-700"
                } ${service.id === 3 && "hover:bg-purple-700"} `}
              >
                Choisir ce service
              </span>
            </motion.div>
          ))}
        </div>
      </section>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          type: "tween",
          duration: 0.2,
          delay: 0.2,
          // ease: [0.25, 0.25, 0.25, 0.75],
        }}
        className="grid md:grid-cols-2 gap-10 mt-20 "
      >
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "tween",
            duration: 0.5,
            delay: 0.3,
            // ease: [0.25, 0.25, 0.25, 0.75],
          }}
          className=" flex flex-col gap-10 w-full"
        >
          <div className="flex items-center justify-between cursor-pointer group">
            <h1 className="text-2xl text-gray-300 font-bold md:text-4xl">01</h1>
            <div>
              <h1 className="text-2xl text-center text-[#1a76cb] font-bold duration-500 group-hover:scale-110 md:text-4xl">
                Envoie Express
              </h1>
              <p className="text-xs text-center text-gray-600">
                Vos colis arrivent à destination en un clin d'oeil. (5 jours)
              </p>
            </div>
            <div className="transform transition-transform duration-200 group-hover:-rotate-45">
              <ArrowRight size={40} className="text-gray-300" />
            </div>
          </div>
          <Separator />
          <div className="flex items-center justify-between cursor-pointer group">
            <h1 className="text-2xl text-gray-300 font-bold md:text-4xl">02</h1>
            <div>
              <h1 className="text-2xl text-center text-[#1a76cb] font-bold duration-500 group-hover:scale-110 md:text-4xl">
                Envoie Normal
              </h1>
              <p className="text-xs text-center text-gray-600">
                Profitez de tarifs avantageux pour vos envois de colis de 2
                semaines.
              </p>
            </div>
            <div className="transform transition-transform duration-200 group-hover:-rotate-45">
              <ArrowRight size={40} className="text-gray-300" />
            </div>
          </div>
          <Separator />
          <div className="flex items-center justify-between cursor-pointer group">
            <h1 className="text-2xl text-gray-300 font-bold md:text-4xl">03</h1>
            <div>
              <h1 className="text-2xl text-center text-[#1a76cb] font-bold duration-500 group-hover:scale-110 md:text-4xl">
                {" "}
                Envoie Maritime
              </h1>
              <p className="text-xs text-center text-gray-600 ">
                Vos colis traversent les océans en toute sérénité avec notre
                service Envoie Maritime.
              </p>
            </div>
            <div className="transform transition-transform duration-200 group-hover:-rotate-45">
              <ArrowRight size={40} className="text-gray-300" />
            </div>
          </div>
          <Separator />
        </motion.div>

        <div>
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "tween",
              duration: 0.5,
              delay: 0.3,
              // ease: [0.25, 0.25, 0.25, 0.75],
            }}
            className="text-3xl font-bold text-[#1a76cb] md:text-4xl"
          >
            Votre partenaire logistique de confiance
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "tween",
              duration: 0.5,
              delay: 0.5,
              // ease: [0.25, 0.25, 0.25, 0.75],
            }}
          >
            <p className="mt-6  text-gray-600 ">
              Avec <span className="font-bold text-[#1a76cb]">Royal Cargo</span>
              , chaque colis est traité avec soin et professionnalisme. Nous
              comprenons que derrière chaque envoi, il y a des attentes, des
              engagements et souvent des délais à respecter. C’est pourquoi nous
              mettons tout en œuvre pour vous garantir un service irréprochable,
              adapté à vos besoins spécifiques.
            </p>

            <p className="mt-4  text-gray-600 ">
              Chez <span className="font-bold text-[#1a76cb]">nous</span>, notre
              priorité est votre satisfaction. Nous travaillons avec des
              partenaires de confiance et une équipe dédiée pour garantir que
              vos colis arrivent à destination en toute sécurité et dans les
              délais convenus. Avec nous, vos envois ne sont plus une simple
              transaction, mais une véritable expérience de sérénité et de
              fiabilité.
            </p>
          </motion.div>
        </div>
      </motion.section>

      <motion.section className="grid md:grid-cols-2 gap-10 mt-20 ">
        <div>
          <motion.h1
            ref={ref}
            initial={{ opacity: 0, x: 32 }}
            animate={isInView && { opacity: 1, x: 0 }}
            transition={{
              type: "tween",
              duration: 0.3,
              delay: 0.5,
            }}
            className="text-3xl font-bold text-[#1a76cb] md:text-4xl"
          >
            Faites confiance à Royal Cargo pour des livraisons rapides et
            fiables.
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={isInView && { opacity: 1, x: 0 }}
            transition={{
              type: "tween",
              duration: 0.3,
              delay: 0.7,
              // ease: [0.25, 0.25, 0.25, 0.75],
            }}
          >
            <p className="mt-6  text-gray-600 ">
              Depuis des années, nous offrons à nos clients des solutions
              d'expédition adaptées à leurs besoins. Que ce soit pour des envois
              express, normaux ou maritimes, nous garantissons des services de
              qualité supérieure, soutenus par une équipe expérimentée et des
              technologies modernes.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={isInView && { opacity: 1, x: 0 }}
            transition={{
              type: "tween",
              duration: 0.5,
              delay: 0.7,
              // ease: [0.25, 0.25, 0.25, 0.75],
            }}
          >
            <Button
              onClick={() => navigation.push("/apropos")}
              className="mt-4 rounded-full text-lg group relative bg-[#1a76cb] text-white"
            >
              En savoir plus
              <span className="ml-2 inline-block transform transition-transform duration-500 group-hover:rotate-180">
                <Plus size={20} className="text-white" />
              </span>
            </Button>
          </motion.div>
        </div>

        <div className="w-full grid grid-cols-2 gap-8 md:grid-cols-3">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 32 }}
            animate={isInView && { opacity: 1, x: 0 }}
            transition={{
              type: "tween",
              duration: 0.5,
              delay: 0.3,
            }}
            className="flex flex-col items-start p-4 rounded-lg"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#1a76cb] text-white">
              <User size={24} />
            </div>

            <h1 className="text-3xl font-bold text-[#1a76cb] mt-2 md:text-5xl">
              700+
            </h1>
            <p className="text-xs text-gray-500 md:text-lg">
              Clients satisfaits
            </p>
          </motion.div>

          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 32 }}
            animate={isInView && { opacity: 1, x: 0 }}
            transition={{
              type: "tween",
              duration: 0.5,
              delay: 0.5,
            }}
            className="flex flex-col items-start    p-4 rounded-lg"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#1a76cb] text-white">
              <Package size={24} />
            </div>
            <h1 className="text-3xl font-bold text-[#1a76cb] mt-2 md:text-5xl">
              2k+
            </h1>
            <p className="text-xs text-gray-500 md:text-lg">
              Colis livrés <br /> avec succès
            </p>
          </motion.div>

          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 32 }}
            animate={isInView && { opacity: 1, x: 0 }}
            transition={{
              type: "tween",
              duration: 0.5,
              delay: 0.7,
            }}
            className="flex flex-col items-start    p-4 rounded-lg"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#1a76cb] text-white">
              <Star size={24} />
            </div>
            <h1 className="text-3xl font-bold text-[#1a76cb] mt-2 md:text-5xl">
              98%
            </h1>
            <p className="text-xs text-gray-500 md:text-lg">
              Taux de satisfaction
            </p>
          </motion.div>
        </div>
      </motion.section>

      <motion.section className="py-16 bg-gray-50 mt-20 rounded-2xl  ">
        <div className="grid md:grid-cols-2">
          <div className="container mx-auto">
            <motion.h1
              ref={ref2}
              initial={{ opacity: 0, x: 32 }}
              animate={isInView2 && { opacity: 1, x: 0 }}
              transition={{
                type: "tween",
                duration: 0.5,
                delay: 0.3,
              }}
              className="text-3xl font-bold text-start text-[#1a76cb] mb-8 md:text-4xl"
            >
              Comment ça marche ?
            </motion.h1>

            <motion.div
              ref={ref2}
              initial={{ opacity: 0, x: 32 }}
              animate={isInView2 && { opacity: 1, x: 0 }}
              transition={{
                type: "tween",
                duration: 0.5,
                delay: 0.3,
              }}
            >
              <p className="text-start text-gray-600 max-w-2xl mx-auto mb-12">
                Découvrez comment Royal Cargo simplifie vos envois. Que ce soit
                pour des colis express, normaux ou maritimes, notre processus
                est conçu pour vous offrir une expérience rapide, fiable et sans
                stress. Suivez nos étapes simples et expédiez vos colis en toute
                sérénité !
              </p>
            </motion.div>

            <div>
              <motion.div
                ref={ref2}
                initial={{ opacity: 0, y: 32 }}
                animate={isInView2 && { opacity: 1, y: 0 }}
                transition={{
                  type: "tween",
                  duration: 0.5,
                  delay: 0.5,
                }}
                className=""
              >
                <h1 className="text-7xl font-bold text-gray-300">01</h1>
                <h2 className="text-2xl font-bold text-[#1a76cb] opacity-75">
                  Créez votre commande
                </h2>
                <p className="text-gray-600 mt-2">
                  Inscrivez-vous sur notre plateforme <br /> et générez une
                  adresse de livraison <br /> en Chine pour votre fournisseur.
                </p>
              </motion.div>

              <motion.div
                ref={ref2}
                initial={{ opacity: 0, y: 32 }}
                animate={isInView2 && { opacity: 1, y: 0 }}
                transition={{
                  type: "tween",
                  duration: 0.5,
                  delay: 0.7,
                }}
                className="mt-12 ml-5 md:ml-10"
              >
                <h1 className="text-7xl font-bold text-gray-300">02</h1>
                <h2 className="text-2xl font-bold text-[#1a76cb] opacity-75">
                  Nous récupérons vos colis
                </h2>
                <p className=" text-gray-600 mt-2">
                  Une fois livrés à notre entrepôt, nous emballons <br /> vos
                  colis et préparons leur expédition.
                </p>
              </motion.div>

              <motion.div
                ref={ref2}
                initial={{ opacity: 0, y: 32 }}
                animate={isInView2 && { opacity: 1, y: 0 }}
                transition={{
                  type: "tween",
                  duration: 0.5,
                  delay: 0.9,
                }}
                className="mt-12 ml-10 md:ml-20"
              >
                <h1 className="text-7xl font-bold text-gray-300">03</h1>
                <h2 className="text-2xl font-bold text-[#1a76cb] opacity-75">
                  Livraison sécurisée
                </h2>
                <p className=" text-gray-600 mt-2">
                  Suivez votre colis grâce à notre système <br /> de suivi en
                  ligne et recevez-le en Côte d'Ivoire dans les délais.
                </p>
              </motion.div>
            </div>
          </div>
          <Image
            src="/main.png"
            width={1000}
            height={1000}
            alt="conteneur_img"
          />
        </div>
      </motion.section>

      <motion.section
        ref={ref3}
        initial={{ opacity: 0, y: 32 }}
        animate={isInView3 && { opacity: 1, y: 0 }}
        transition={{
          type: "tween",
          duration: 0.5,
          delay: 0.3,
        }}
        className="py-16 bg-blue-500 mt-20 rounded-2xl px-5 text-white grid md:grid-cols-2  "
      >
        <div className="container mx-auto flex flex-col items-start ">
          {/* Texte principal */}
          <div className="flex-1 mb-8 md:mb-0">
            <h1 className="text-3xl font-bold mb-4 md:text-4xl">
              Téléchargez gratuitement <br /> notre App !
            </h1>
            <p className="text-lg">
              Simplifiez vos envois avec{" "}
              <span className="font-bold">Royal Cargo</span>. Suivez vos colis,
              recevez des notifications en temps réel, et accédez à tous nos
              services directement depuis votre smartphone.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mt-5">
            <a
              href="#"
              className="bg-black text-white flex items-center gap-2 px-6  rounded-lg hover:bg-gray-800 transition text-2xl font-bold"
            >
              <img
                src="/playstore-svgrepo-com.svg"
                alt="Google Play"
                className="w-12 object-cover"
              />
              <div>
                <span className="block text-lg font-normal ">
                  Disponible sur <br />
                </span>
                Google Play
              </div>
            </a>
            <a
              href="#"
              className="bg-black text-white flex items-center gap-2 px-6 py-3 rounded-lg hover:bg-gray-800 transition text-2xl font-bold"
            >
              <img
                src="/apple-black-logo-svgrepo-com.svg"
                alt="App Store"
                className="w-12 object-cover"
              />

              <div>
                <span className="block text-lg font-normal ">
                  Disponible sur <br />
                </span>
                App Store
              </div>
            </a>
          </div>
        </div>
      </motion.section>

      {/* blog */}
      {/* <section className=" mt-10">
        <div className=" ">

          <div className="mb-10">
            <h1 className="text-3xl font-bold mb-4 md:text-4xl text-center text-[#1a76cb]">
              News & Actualites !
            </h1>
          </div>
        </div>

        <div className="w-full">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full "
          >
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem
                  key={index}
                  className=" md:basis-1/2 lg:basis-1/3"
                >
                  <div className="p-1">
                    <div className="flex flex-col items-start bg-[#22b2ff33]  rounded-3xl p-6">
                      <Image
                        src="/emanuviews-AKYjr-kmYtQ-unsplash.jpg"
                        width={1000}
                        height={1000}
                    
                        alt="conteneur_img"
                 
                        className="w-full"
                      />
                      <div className="mt-4">
                        <h1 className="text-xl font-bold">
                          Lorem ipsum dolor, sit amet consectetur adipisicing
                          elit.
                        </h1>

                        <p className=" mt-3 text-sm text-gray-400">
                          Publié le 20/10/2023
                        </p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
   
          </Carousel>
        </div>
      </section> */}

      <footer
        className="relative w-full mb-10 mt-10 bg-pattern4 h-full bg-cover bg-center 
      bg-no-repeat rounded-2xl text-white p-10 md:h-[60vh]"
      >
        <div className="absolute inset-0 bg-black opacity-50 rounded-2xl z-10 "></div>

        <div className="relative z-10 grid  md:grid-cols-3 gap-y-8">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold">
              Connectez-vous <br />
              avec nous
            </h1>

            <div className="mt-5 flex items-center gap-4">
              <Link href="">
                <IconFacebook />
              </Link>
              <Link href="">
                <IconInstagram />
              </Link>

              <Link href="">
                <IconTikTok />
              </Link>
              {/* <IconFacebook /> */}
            </div>
            <p className="mt-5">ou envoyez-nous un e-mail à</p>
            <Link href="mailto:royalcargo225@gmail.com">
              <h1 className="text-xl md:text-2xl font-semibold">
                royalcargo225@gmail.com
              </h1>
            </Link>
          </div>
          <div>
            <h1 className="text-2xl md:text-4xl">Menus</h1>

            <ul className="mt-5 md:mt-14 flex flex-col gap-4">
              <li className="text-xl">
                <Link href="">A propos</Link>
              </li>

              <li className="text-xl">
                <Link href="">Nos services</Link>
              </li>

              <li className="text-xl">
                <Link href="">Contacts</Link>
              </li>
            </ul>
          </div>
          <div>
            <h1 className="text-2xl md:text-4xl">Bureau</h1>

            <p className="mt-5 md:mt-14">
              Boulevard du Cameroun, <br /> Ligne 11, <br /> Grand marché de
              Marcory, <br /> Abidjan, Côte d'Ivoire
            </p>
          </div>
        </div>
      </footer>
      {/* dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[455px]  ">
          <DialogHeader>
            <DialogTitle className="uppercase">Suivi de colis</DialogTitle>

            <div className="w-full items-start-start">
              <div className="flex  items-center gap-2 rounded-full bg-white">
                <Input
                  value={trackCode}
                  onChange={(e) => setTrackCode(e.target.value)}
                  className="px-4 outline-none rounded-full focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 rounded-ful"
                  placeholder="Tracking code"
                />
                <div
                  onClick={() => {
                    mutation.mutate(
                      { id: trackCode },
                      {
                        onSuccess(data, variables, context) {
                          setTrackingData2((state) => [...state, data]);

                          // console.log(data);

                          setCodeError(data.response.data.error);
                        },
                      }
                    );
                  }}
                  className="bg-blue-500 h-10 w-10 flex items-center justify-center rounded-full px-2"
                >
                  <Search color="#fff" />
                </div>
              </div>
            </div>
          </DialogHeader>

          {codeError == "une erreur c est produite" && (
            <div className=" h-40 justify-center items-center flex flex-col">
              <CircleOff size={70} color="red" />
              <div className="mt-4">
                <h1>Pas de données en vue (Verifie ton code)</h1>
              </div>
            </div>
          )}

          {trackingData2.length > 0 && (
            <div className="border p-3 rounded-xl">
              {trackingData2.map((item: any) => (
                <div>
                  <div>
                    <h1 className="text-xl font-bold bg-blue-100 inline-block  px-2 py-1 rounded-xl">
                      {item.service}
                    </h1>
                    <p className="text-sm text-gray-500 mt-2">
                      Une option économique pour vos envois réguliers avec des
                      délais standards
                    </p>
                  </div>

                  <div>
                    <div className="mt-6 space-y-2">
                      <div className="flex justify-between text-gray-500">
                        Nom
                        <span className="text-gray-800 font-medium">
                          {item.nom}
                        </span>
                      </div>

                      <div className="flex justify-between text-gray-500">
                        Téléphone
                        <span className="text-gray-800 font-medium">
                          {item.numero}
                        </span>
                      </div>

                      <div className="flex justify-between text-gray-500">
                        Date de demande
                        <span className="text-gray-800 font-medium">
                          {item.daten.toString().slice(0, 10)}
                        </span>
                      </div>

                      <div className="flex justify-between text-gray-500">
                        Status
                        <span className="text-gray-800 font-medium">
                          {item.etat}
                        </span>
                      </div>

                      <div className="flex justify-between text-gray-500">
                        Quantités
                        <span className="text-gray-800 font-medium">
                          {item.quantite}
                        </span>
                      </div>

                      <div className="flex justify-between text-gray-500">
                        Poids
                        <span className="text-gray-800 font-medium">
                          {item.poids} KG
                        </span>
                      </div>

                      {item.service == "Service Maritime" && (
                        <div className="flex justify-between text-gray-500">
                          Taile
                          <span className="text-gray-800 font-medium">
                            {item.tailes}
                          </span>
                        </div>
                      )}

                      <div className="flex justify-between text-gray-500">
                        Prix
                        <span className="text-gray-800 font-medium">
                          {item.prix} FCFA
                        </span>
                      </div>

                      <div>
                        <p className="text-gray-500 mb-2">Tracking code</p>
                        <div className="relative bg-zinc-500 text-white rounded-md p-4 font-mono mb-10">
                          <pre className="whitespace-pre-wrap text-xs">
                            {item.trackcode}
                          </pre>
                          <button
                            onClick={() => handleCopy(item.trackcode as string)}
                            className={`absolute top-2 right-2 px-3 py-1 text-xs rounded-md transition ${
                              copied
                                ? "bg-green-500"
                                : "bg-blue-500 hover:bg-blue-600"
                            }`}
                          >
                            {copied ? "Copié" : "Copier"}
                          </button>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button
                          className="w-full bg-blue-500 hover:bg-blue-600"
                          onClick={() => setOpenSheet(true)}
                        >
                          Voir l'adresse
                        </Button>
                        <Button
                          className="w-full bg-blue-500 hover:bg-blue-600"
                          onClick={() => setOpenSheet2(true)}
                        >
                          Voir les imgages
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* {trackingData[0]?.response.data.error} */}
            </div>
          )}

          {trackingData2.length == 0 && (
            <div className="border-collapse border p-1 rounded-xl">
              <div className="flex items-center justify-center gap-3 text-[#c0bec0]">
                <Frown size={100} color="#c0bec0" />

                <div className="w-1/2">
                  <h1>
                    Utiliser votre code de traking pour traker votre colis.
                  </h1>

                  <h1>
                    le code se trouve dans le SMS que vous avez recu lors de la
                    demande de votre adresse
                  </h1>
                </div>
              </div>
            </div>
          )}

          {mutation.isPending && <div>Load</div>}
        </DialogContent>
      </Dialog>

      {/* sheet */}

      <Sheet open={openSheet} onOpenChange={setOpenSheet}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Adresse</SheetTitle>
            <SheetDescription>
              Il s'agit de l'adresse à envoyer au fournisseur.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div ref={gridRef} className="grid">
              <p>重要须知（埋头）: 包装上必须写明客户的姓名和国外电话号码。</p>
              {/* <p>外包装盒必须包含以下信息</p> */}
              <p>
                客户姓名和编号 : ({trackingData2[0] && trackingData2[0].nom}{" "}
                {trackingData2[0] && trackingData2[0].numero}{" "}
                {trackingData2[0] && trackingData2[0].service})
              </p>
              <p>是否有内置电池。</p>
              <p>中国广州市越秀区环市中路205号恒生大厦B座903-2</p>
              <p>电话 : +86 186 2097 5453 / +86 188 0207 2454</p>
              <p>注意 : 不接受快递费。</p>
              <p>收货时间 : 12.00 - 20.30</p>
              <p>违禁品将被拒收。</p>
              <p>
                如有虚假申报，在机场进行虚假申报或扣押货物的所有相关费用均由当事人自行承担！
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                className="w-full bg-blue-500  hover:bg-green-700"
                onClick={handleCopyAdress}
              >
                <Copy className="mr-2" />
                Copier
              </Button>
              <Button
                className="w-full bg-blue-500 hover:bg-green-700"
                onClick={handleShare}
              >
                <Forward className="mr-2" /> Partager
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={openSheet3} onOpenChange={setOpenSheet3}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Adresse</SheetTitle>
            <SheetDescription>
              Il s'agit de l'adresse à envoyer au fournisseur.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div ref={gridRef} className="grid">
              <p>重要须知（埋头）: 包装上必须写明客户的姓名和国外电话号码。</p>
              {/* <p>外包装盒必须包含以下信息</p> */}
              <p>
                客户姓名和编号 : ({trackingData[0] && trackingData[0].nom}{" "}
                {trackingData[0] && trackingData[0].numero}{" "}
                {trackingData[0] && trackingData[0].service})
              </p>
              <p>是否有内置电池。</p>
              <p>中国广州市越秀区环市中路205号恒生大厦B座903-2</p>
              <p>电话 : +86 186 2097 5453 / +86 188 0207 2454</p>
              <p>注意 : 不接受快递费。</p>
              <p>收货时间 : 12.00 - 20.30</p>
              <p>违禁品将被拒收。</p>
              <p>
                如有虚假申报，在机场进行虚假申报或扣押货物的所有相关费用均由当事人自行承担！
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                className="w-full bg-blue-500  hover:bg-green-700"
                onClick={handleCopyAdress}
              >
                <Copy className="mr-2" />
                Copier
              </Button>
              <Button
                className="w-full bg-blue-500 hover:bg-green-700"
                onClick={handleShare}
              >
                <Forward className="mr-2" /> Partager
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={openSheet2} onOpenChange={setOpenSheet2}>
        <SheetContent className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Details</SheetTitle>
            {/* <SheetDescription>
              Il s'agit de l'adresse à envoyer au fournisseur.
            </SheetDescription> */}
          </SheetHeader>
          <div className="grid gap-4 py-4 ">
            {trackingData2[0] &&
              trackingData2[0].images.split(",").map((n: any, id: any) => {
                const imageUrl = `https://royalcargo225.com:9001/api/v01/img2/${n.trim()}`;

                return (
                  <div key={id}>
                    {"Images " + (id + 1)}
                    <Image
                      src={imageUrl}
                      width={1000}
                      height={1000}
                      alt=""
                      onClick={() => handleImageClick(imageUrl)} // Cliquer sur l'image
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                );
              })}
          </div>

          {/* Affichage de l'image en grand */}
          {selectedImage && (
            <div
              className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50"
              onClick={() => setSelectedImage(null)} // Fermer l'image en cliquant en dehors
            >
              <Image
                src={selectedImage}
                width={800}
                height={800}
                alt="Grand Image"
                className="rounded-lg"
                // Changer le curseur pour indiquer que c'est cliquable
              />
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/*  */}

      <Dialog open={openDialogServices} onOpenChange={setOpenDialogServices}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="uppercase">
              Demande d'adresse ({formData.service})
            </DialogTitle>
          </DialogHeader>
          <div className="w-full">
            <div className="">
              {/* Carte */}

              {/* Formulaire */}
              <form
                className="mt-6 space-y-4 w-full bg-white   rounded-lg"
                onSubmit={handleSubmit}
              >
                <div>
                  <label className="block text-sm font-medium">Nom</label>
                  <input
                    type="text"
                    maxLength={16}
                    value={formData.nom}
                    onChange={(e) =>
                      setFormData({ ...formData, nom: e.target.value })
                    }
                    className="w-full mt-1 p-2 border rounded outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Numéro de tel
                  </label>
                  <input
                    type="text"
                    value={formData.numero}
                    onChange={(e) =>
                      setFormData({ ...formData, numero: e.target.value })
                    }
                    className="w-full mt-1 p-2 border rounded outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Type de produit
                  </label>
                  <input
                    type="text"
                    value={formData.typec}
                    onChange={(e) =>
                      setFormData({ ...formData, typec: e.target.value })
                    }
                    className="w-full mt-1 p-2 border rounded outline-none"
                  />
                </div>

                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    // value={formData.condition}
                    onChange={(e) =>
                      setFormData({ ...formData, condition: e.target.checked })
                    }
                    className="mt-1 p-2 border rounded outline-none"
                  />
                  <div>
                    <p className="text-red-500">
                      Accepter les termes et conditions qui ce trouve dans la
                      section ( A propos )
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center gap-3 justify-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                  Valider
                  <div>
                    {isLoading && (
                      <Image
                        src="/tail-spin.svg"
                        width={20}
                        height={20}
                        alt=""
                      />
                    )}
                  </div>
                </button>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={openDialog2} onOpenChange={setOpenDialog2}>
        <DialogContent className="sm:max-w-[455px]  ">
          <DialogHeader>
            <DialogTitle className="uppercase">Suivi de colis</DialogTitle>
          </DialogHeader>

          <div className="border p-3 rounded-xl">
            {trackingData &&
              trackingData.map((item: any) => (
                <div>
                  <div>
                    <h1 className="text-xl font-bold bg-blue-100 inline-block  px-2 py-1 rounded-xl">
                      {item.service}
                    </h1>
                    <p className="text-sm text-gray-500 mt-2">
                      Une option économique pour vos envois réguliers avec des
                      délais standards
                    </p>
                  </div>

                  <div>
                    <div className="mt-6 space-y-2">
                      <div className="flex justify-between text-gray-500">
                        Nom
                        <span className="text-gray-800 font-medium">
                          {item.nom}
                        </span>
                      </div>

                      <div className="flex justify-between text-gray-500">
                        Téléphone
                        <span className="text-gray-800 font-medium">
                          {item.numero}
                        </span>
                      </div>

                      <div className="flex justify-between text-gray-500">
                        Date de demande
                        <span className="text-gray-800 font-medium">
                          {item.daten.toString().slice(0, 10)}
                        </span>
                      </div>

                      <div className="flex justify-between text-gray-500">
                        Status
                        <span className="text-gray-800 font-medium">
                          {item.etat}
                        </span>
                      </div>

                      {item.quantite != 0 && (
                        <div className="flex justify-between text-gray-500">
                          Quantités
                          <span className="text-gray-800 font-medium">
                            {item.quantite}
                          </span>
                        </div>
                      )}

                      {item.poids != 0 && (
                        <div className="flex justify-between text-gray-500">
                          Poids
                          <span className="text-gray-800 font-medium">
                            {item.poids} KG
                          </span>
                        </div>
                      )}

                      {item.service == "Service Maritime" &&
                        item.tailes != 0 && (
                          <div className="flex justify-between text-gray-500">
                            Taile
                            <span className="text-gray-800 font-medium">
                              {item.tailes}
                            </span>
                          </div>
                        )}

                      {item.prix != 0 && (
                        <div className="flex justify-between text-gray-500">
                          Prix
                          <span className="text-gray-800 font-medium">
                            {item.prix} FCFA
                          </span>
                        </div>
                      )}

                      <div>
                        <p className="text-gray-500 mb-2">Tracking code</p>
                        <div className="relative bg-zinc-500 text-white rounded-md p-4 font-mono mb-10">
                          <pre className="whitespace-pre-wrap text-xs">
                            {item.trackcode}
                          </pre>
                          <button
                            onClick={() => handleCopy(item.trackcode as string)}
                            className={`absolute top-2 right-2 px-3 py-1 text-xs rounded-md transition ${
                              copied
                                ? "bg-green-500"
                                : "bg-blue-500 hover:bg-blue-600"
                            }`}
                          >
                            {copied ? "Copié" : "Copier"}
                          </button>
                        </div>
                      </div>

                      <div>
                        <Button
                          className="w-full bg-blue-500 hover:bg-blue-600"
                          onClick={() => setOpenSheet3(true)}
                        >
                          Voir l'adresse
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </DialogContent>
      </Dialog>

      <Sheet open={openSheetNav} onOpenChange={setOpenSheetNav}>
        <SheetContent side={"left"} className="w-[40%]">
          <div className="grid gap-4 py-4">
            <nav className="">
              <ul className="flex flex-col items-start gap-9 w-full">
                <li>
                  <Link
                    href="/"
                    className={`transition-all hover:text-[#1a76cb] text-[18px] font-semibold`}
                  >
                    Acceuil
                  </Link>
                </li>
                <li>
                  <Link
                    href="/apropos"
                    className={` 
              transition-all hover:text-[#1a76cb] text-[18px] font-semibold`}
                  >
                    A propos
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/services`}
                    className="transition-all hover:text-[#1a76cb] text-[18px] font-semibold"
                  >
                    Nos services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className={`transition-all hover:text-[#1a76cb] text-[18px] font-semibold`}
                  >
                    Contact
                  </Link>
                </li>

                <li>
                  <Button
                    className="flex items-center bg-[#1a76cb] rounded-full cursor-pointer p-2 w-[90px] px-14"
                    onClick={() => setOpenDialog(true)}
                  >
                    Tracking
                    <FileSearch size={20} color="#fff" />
                  </Button>
                </li>
              </ul>
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </main>
  );
};

export default Page;
