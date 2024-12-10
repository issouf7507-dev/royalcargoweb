"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getDataById } from "@/app/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Copy, Forward, Undo2, View } from "lucide-react";
import Link from "next/link";

const queryClient = new QueryClient();

const Page = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <PageRef />
    </QueryClientProvider>
  );
};

const PageRef = () => {
  const navigate = useRouter();
  const gridRef = useRef<HTMLDivElement>(null);
  const { id } = useParams();
  const queryData = useQuery({
    queryKey: ["datatest"],
    queryFn: () => getDataById(id.toString()),
  });

  const [openM, setOpenM] = useState(false);
  const [loader, setLoader] = useState(true);

  const handleItemClick = (el: any) => {
    setOpenM(true);
  };

  const handleCopyCode = (el: any) => {
    navigator.clipboard.writeText(el && el.trackCode);
    toast.success("Le code a été bien copier ");
  };

  const handleCopyAdress = (el: any) => {
    if (gridRef.current) {
      const gridContent = gridRef.current.innerText;
      if (gridContent) {
        navigator.clipboard.writeText(gridContent);
        toast.success("Le code a été bien copié");
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

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 1500);
    // if (queryData.data == undefined) {
    //   router.push("/");
    // }
  }, []);

  //

  return (
    <section className="w-full h-screen flex items-center justify-center mt-10">
      {loader ? (
        <Image src="/tail-spin.svg" width={30} height={30} alt="" />
      ) : (
        <div>
          {queryData.data && queryData.data == "invalide" ? (
            <div>
              <Card className="w-[350px] md:w-[500px]">
                <CardHeader>
                  <CardTitle className="text-center text-red-600 text-2xl md:text-3xl">
                    Accès impossible
                  </CardTitle>
                  <CardDescription className="text-xl md:text-2xl">
                    Veillez entrez un code valable.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xl md:text-2xl">
                    ce code n est pas valide
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    className="bg-[#1a76cb] hover:bg-[#3e92e0]"
                    onClick={() => navigate.push("/")}
                  >
                    <Undo2 className=" mr-2" />
                    Retour
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ) : (
            ""
          )}
          {queryData.data && queryData.data != "invalide" ? (
            <Card className="w-[350px] md:w-[600px]">
              <ScrollArea className="h-[600px]  rounded-md border p-4">
                <CardHeader>
                  <CardTitle className="">
                    Confirmation de La reservation
                  </CardTitle>
                  <CardDescription>
                    Merci pour votre Réservation les informations rélatives à
                    celle-ci se trouvent ci-dessous :
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <p className="text-xl md:text-2xl">
                      Nom : {queryData.data && queryData.data.nom}
                    </p>
                    <p className="text-xl md:text-2xl">
                      Téléphone : {queryData.data && queryData.data.numero}
                    </p>
                    <p className="text-xl md:text-2xl">
                      Date :{" "}
                      {queryData.data &&
                        queryData.data.daten.toString().slice(0, 10)}
                    </p>
                    <p className="text-xl md:text-2xl">
                      Status: {queryData.data && queryData.data.etat}{" "}
                    </p>
                    <p className="text-xl md:text-2xl">
                      Information du Service :{" "}
                      {queryData.data && queryData.data.service}
                    </p>
                    {queryData.data && queryData.data.quantite != "0" && (
                      <p className="text-xl md:text-2xl">
                        Quantités : {queryData.data.quantite}
                      </p>
                    )}
                    {queryData.data && queryData.data.poids != "" && (
                      <p className="text-xl md:text-2xl">
                        Poids : {queryData.data.poids} Kg
                      </p>
                    )}
                    {queryData.data && queryData.data.prix != 0 && (
                      <p className="text-xl md:text-2xl">
                        Prix : {queryData.data.prix} FCFA
                      </p>
                    )}
                    {queryData.data && queryData.data.tailes != "" && (
                      <p className="text-xl md:text-2xl">
                        Tailes : {queryData.data.tailes} m3
                      </p>
                    )}
                  </div>
                  {queryData.data && queryData.data.images != "" && (
                    <div>
                      <Image
                        className=" w-full h-60"
                        src={`https://royalcargo225.com:9000/api/v01/img/${queryData.data.images}`}
                        alt=""
                        width={800}
                        height={800}
                      />
                    </div>
                  )}
                  <div className="flex items-center gap-2 mt-4  ">
                    <p>Numero du suivi</p>
                    <p>:</p>
                    <Input
                      type="text"
                      value={queryData.data && queryData.data.trackCode}
                      disabled
                    />

                    <Button
                      className="bg-[#1a76cb] hover:bg-[#3e92e0]"
                      onClick={() => handleCopyCode(queryData.data)}
                    >
                      <Copy className="mr-2" />
                      Copier
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between flex-col gap-4">
                  <div className="w-full flex justify-between">
                    <Button
                      className="bg-[#1a76cb] hover:bg-[#3e92e0]"
                      onClick={() => navigate.push("/")}
                    >
                      <Undo2 className=" mr-2" />
                      Retour
                    </Button>
                    <Button
                      className="bg-green-500 hover:bg-green-700"
                      onClick={handleItemClick}
                    >
                      <View className="mr-2" /> Voir adresse
                    </Button>
                  </div>
                  <div>
                    <p className="text-base text-red-500">
                      Veuillez noter qu'à partir du septième jour suivant la
                      réception de votre colis par notre entrepôt, des frais
                      d'entreposage seront appliqués. Ces frais couvrent les
                      coûts liés au stockage de votre colis, tels que l'espace
                      d'entreposage, la manutention et la sécurité.{" "}
                      <Link href="/apropos" className="text-blue-500">
                        Voir plus
                      </Link>
                    </p>
                  </div>
                </CardFooter>
              </ScrollArea>
            </Card>
          ) : (
            ""
          )}
        </div>
      )}

      <Dialog open={openM} onOpenChange={setOpenM}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Adresse</DialogTitle>
            <DialogDescription>
              Il s'agit de l'adresse à envoyer au fournisseur.
            </DialogDescription>
          </DialogHeader>
          <div ref={gridRef} className="grid">
            <p>重要须知（埋头）: 包装上必须写明客户的姓名和国外电话号码。</p>
            {/* <p>外包装盒必须包含以下信息</p> */}
            <p>
              客户姓名和编号 : ({queryData.data && queryData.data.nom}{" "}
              {queryData.data && queryData.data.numero}{" "}
              {queryData.data && queryData.data.service})
            </p>
            <p>是否有内置电池。</p>
            <p>中国广州市越秀区环市中路205号恒生大厦B座903-2</p>
            <p>电话 : +86 186 2097 5453 / +86 188 0207 2454</p>
            <p>注意：不接受快递费。</p>
            <p>收货时间：12.00 - 20.30</p>
            <p>违禁品将被拒收。</p>
            <p>
              如有虚假申报，在机场进行虚假申报或扣押货物的所有相关费用均由当事人自行承担！
            </p>
          </div>
          <DialogFooter>
            <Button
              className="bg-green-500 hover:bg-green-700"
              onClick={handleCopyAdress}
            >
              <Copy className="mr-2" />
              Copier
            </Button>
            <Button
              className="bg-green-500 hover:bg-green-700"
              onClick={handleShare}
            >
              <Forward className="mr-2" /> Partager
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Page;
