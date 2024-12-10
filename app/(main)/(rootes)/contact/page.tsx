"use client";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import Footer from "@/components/footer";

import Link from "next/link";
import Image from "next/image";
import {
  AlignJustify,
  CircleOff,
  Copy,
  FileSearch,
  Forward,
  Frown,
  MapPin,
  PhoneIncoming,
  Search,
  Send,
} from "lucide-react";
import { IconFacebook, IconInstagram, IconTikTok } from "@/icons";
import { toast } from "sonner";

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

import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { postDataById2 } from "@/app/api";
import { Button } from "@/components/ui/button";

const queryClient = new QueryClient();
const Page = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <PageRef />
    </QueryClientProvider>
  );
};
const PageRef = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [copied, setCopied] = useState(false);
  const [trackCode, setTrackCode] = useState("");
  const [trackingData, setTrackingData] = useState<any[]>([]);
  const [codeError, setCodeError] = useState("");

  const [openSheet, setOpenSheet] = useState(false);
  const [openSheet2, setOpenSheet2] = useState(false);
  const [openSheetNav, setOpenSheetNav] = useState(false);

  // État pour stocker l'URL de l'image agrandie
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const gridRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    message: "",
  });

  const mutation = useMutation({
    mutationFn: (trackCode: any) => {
      return postDataById2(trackCode);
    },
  });

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Réinitialiser après 2 secondes
    });
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

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
  return (
    <main className="max-w-[1300px] m-auto px-10">
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          type: "tween",
          duration: 0.4,
          delay: 0.2,
          // ease: [0.25, 0.25, 0.25, 0.75],
        }}
        className="relative w-full h-full  bg-pattern5 bg-center bg-cover rounded-3xl flex items-center justify-start py-32 pb-10 md:h-[50vh] md:pb-0"
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-40 rounded-3xl"></div>

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
            Contacter nous
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "tween",
              duration: 0.5,
              delay: 0.7,
              // ease: [0.25, 0.25, 0.25, 0.75],
            }}
            className="text-white"
          >
            Nous sommes là pour répondre à toutes vos questions et vous
            accompagner.
          </motion.p>

          <div className="inverted-radius"></div>
        </div>
      </motion.section>

      <section className="grid lg:grid-cols-2 mt-10 gap-5">
        <div className="grid gap-4  mt-10 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 50,
              duration: 0.8,
              delay: 0.7,
            }}
          >
            <h2 className="text-xl font-bold text-blue-700 mb-3 flex items-center gap-2 md:text-2xl">
              Adresse <MapPin size={30} />
            </h2>
            <p>
              Boulevard du Cameroun, Ligne 11, Grand marché de Marcory, Abidjan,
              Côte d'Ivoire
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 50,
              duration: 0.8,
              delay: 0.9,
            }}
            className=" text-black rounded-lg "
          >
            <h2 className="text-xl font-bold text-blue-700 mb-3 flex items-center gap-2 md:text-2xl">
              Téléphone <PhoneIncoming size={30} />
            </h2>

            <div className="flex flex-col items-start gap-4">
              <p className="">+225 0564919216</p>

              <p className="">+225 0708201212</p>
              <p className="">+86 186 2097 5453</p>
              <p className="">+86 188 0207 2454</p>
            </div>
          </motion.div>

          <motion.div className=" text-black ">
            <h2 className="text-xl font-bold text-blue-700 mb-3 flex items-center gap-2 md:text-2xl">
              Email <Send size={30} />
            </h2>
            <Link href="mailto:royalcargo225@gmail.com">
              <p className=""> royalcargo225@gmail.com</p>
            </Link>
          </motion.div>
        </div>

        <div className=" bg-blue-800 p-8 rounded-lg">
          <h3 className="text-2xl font-bold text-center mb-6">
            Envoyez-nous un message
          </h3>
          <form
            className="grid gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Votre message a bien été envoyé.");
              setFormData({ ...formData, nom: "", email: "", message: "" });
            }}
          >
            <input
              type="text"
              placeholder="Votre Nom"
              className="p-3 rounded-lg border
              text-black
              border-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
              value={formData.nom}
              onChange={(e) => {
                setFormData({ ...formData, nom: e.target.value });
              }}
              required
            />
            <input
              type="email"
              placeholder="Votre Email"
              className="p-3 rounded-lg border
                    text-black
              border-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
              }}
              required
            />
            <textarea
              // rows="4"
              rows={4}
              placeholder="Votre Message"
              className="p-3 rounded-lg border
                    text-black
              border-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
              value={formData.message}
              onChange={(e) => {
                setFormData({ ...formData, message: e.target.value });
              }}
              required
            ></textarea>
            <Button
              type="submit"
              className="bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition"
            >
              Envoyer
            </Button>
          </form>
        </div>
      </section>

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
                          setTrackingData(data);
                          // console.log(data.response.data.error);

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

          {trackingData.length > 0 && (
            <div className="border p-3 rounded-xl">
              {trackingData.map((item: any) => (
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

          {trackingData.length == 0 && (
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
            {trackingData[0] &&
              trackingData[0].images.split(",").map((n: any, id: any) => {
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
