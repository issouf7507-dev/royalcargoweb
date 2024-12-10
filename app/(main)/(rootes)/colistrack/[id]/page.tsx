"use client";

import React, { useRef, useState } from "react";
import { getDataByAnonyme } from "@/app/api";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Forward } from "lucide-react";

const queryClient = new QueryClient();
const Page = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <PageRef />
    </QueryClientProvider>
  );
};
const PageRef = () => {
  const params = usePathname();
  const [copied, setCopied] = useState(false);
  const [openSheet, setOpenSheet] = useState(false);
  const [openSheet2, setOpenSheet2] = useState(false);
  const [openDialog2, setOpenDialog2] = useState(true);
  const gridRef = useRef<HTMLDivElement>(null);
  const navigation = useRouter();

  const trackingData2 = useQuery({
    queryKey: ["mydata-"],
    queryFn: () => getDataByAnonyme(params.toString().slice(12)),
  });

  // État pour stocker l'URL de l'image agrandie
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Fonction pour afficher l'image en grand
  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Réinitialiser après 2 secondes
    });
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
  // console.log(trackingData2.data);

  return (
    <main className="flex items-center justify-center h-[100vh]">
      <div className="sm:max-w-[455px]">
        <div className="border p-3 rounded-xl">
          {trackingData2.data &&
            trackingData2.data.map((item: any, id: any) => (
              <div
              // key={id}
              >
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

                    {item.service == "Service Maritime" && item.tailes != 0 && (
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

                    {/* <div>
                      <Button
                        className="w-full bg-blue-500 hover:bg-blue-600"
                        onClick={() => setOpenSheet(true)}
                      >
                        Voir l'adresse
                      </Button>
                    </div> */}

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
        </div>
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
                <p>
                  重要须知（埋头）: 包装上必须写明客户的姓名和国外电话号码。
                </p>
                {/* <p>外包装盒必须包含以下信息</p> */}
                <p>
                  客户姓名和编号 : (
                  {trackingData2.data && trackingData2.data[0].nom}{" "}
                  {trackingData2.data && trackingData2.data[0].numero}{" "}
                  {trackingData2.data && trackingData2.data[0].service})
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
              {trackingData2.data &&
                trackingData2.data[0].images
                  .split(",")
                  .map((n: any, id: any) => {
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
                  width={500}
                  height={500}
                  alt="Grand Image"
                  className="rounded-lg"
                  // Changer le curseur pour indiquer que c'est cliquable
                />
              </div>
            )}
          </SheetContent>
        </Sheet>

        <Button
          onClick={() => navigation.push("/")}
          className="w-full bg-blue-500 hover:bg-blue-600 mt-3"
        >
          Retour sur le siet
        </Button>
      </div>
    </main>
  );
};

export default Page;
