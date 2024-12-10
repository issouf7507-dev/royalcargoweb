"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import Cookies from "js-cookie";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@radix-ui/react-separator";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { FormCustom } from "./useFormCustom";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  delUser,
  postNewImage,
  postNewImage2,
  postNewImage3,
  putAdress,
} from "@/app/api";
import { RefetchData } from "@/app/context";
import { StateCustom } from "./useStateCustom";
import { toast } from "sonner";
import { Pencil, Trash } from "lucide-react";
import axios from "axios";

const formSchema = z.object({
  id: z.number(),
  nom: z.string(),
  numero: z.string(),
  etat: z.string(),
  service: z.string(),

  daten: z.any(),
  condition: z.boolean(),
  images: z.string(),
  images2: z.string(),
  images3: z.string(),
  poids: z.string(),
  prix: z.number(),
  tailes: z.string(),
  quantite: z.string(),
  userId: z.string(),

  typec: z.string(),
});

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type DataUsing = {
  id: number;
  nom: string;
  numero: string;
  etat: string;
  service: string;
  trackCode: string;
  daten: any;
  condition: boolean;
  images: string;
  images2: string;
  images3: string;
  poids: string;
  prix: number;
  tailes: string;
  quantite: string;
  userId: string;
  typec: string;
};

export const columns: ColumnDef<DataUsing>[] = [
  {
    accessorKey: "nom",
    header: "Nom",
  },
  {
    accessorKey: "numero",
    header: "Numero",
  },
  {
    accessorKey: "service",
    header: "Service",
  },
  {
    accessorKey: "etat",
    header: "Etat",
  },

  {
    id: "actions",
    header: "Date",
    cell: ({ row }) => {
      const item = row.original;

      return (
        <div>
          <div>{item.daten.slice(0, 10)}</div>
        </div>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const item = row.original;

      const refetch = RefetchData();
      // const [image, setImage] = StateCustom<any>();
      const [images, setImages] = StateCustom<File[]>([]);

      const [isDialogOpen, setIsDialogOpen] = StateCustom<boolean>(false);

      const form = FormCustom<z.infer<typeof formSchema>>({
        // resolver: zodResolver(formSchema),
        defaultValues: {
          id: item.id,
          nom: item.nom,
          numero: item.numero,
          etat: item.etat,
          service: item.service,
          daten: item.daten,
          condition: item.condition,
          images: item.images,
          images2: item.images,
          images3: item.images,
          poids: item.poids,
          prix: item.prix,
          tailes: item.tailes,
          quantite: item.quantite,
          userId: item.userId,
          typec: item.typec,
        },
      });

      // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      //   const file = e.target.files?.[0] || null;
      //   setImage(file);
      //   form.setValue("images", file ? file.name : "");
      // };

      const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files ? Array.from(e.target.files) : [];
        setImages(files);
        form.setValue("images", files.map((file) => file.name).join(", "));
      };

      const shortCode = "+2250713441784";
      let accessToken: any = null;
      let tokenExpires: any = null;

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

      // console.log(form.watch("numero"));

      function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);

        const formData = new FormData();
        images.forEach((image) => {
          formData.append("images", image); // Ajouter chaque fichier
        });

        putAdress(values).then((res) => {
          if (res) {
            refetch();
            toast.success("Mise à jour bien effectuer");
            setIsDialogOpen(false);
          }

          sendSMS(
            form.watch("numero"),
            `ROYAL CARGO \nBONJOUR CHER CLIENT (${form.watch(
              "nom"
            )}). NOUS SOMMES RAVIS DE VOUS ANNONCER QUE LE STATUT DE VOTRE COLIS À CHANGER, IL EST MAINTENANT PASSER À **${form
              .watch("etat")
              .toUpperCase()}**.
              )}`
          );
        });
        if (formData.entries != undefined) {
          postNewImage(formData).then((res) => {
            if (res) {
              toast.success("Images uploadées avec succès !");
            }
          });
        }
      }

      return (
        <div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="bg-[#1a76cb] border-0 text-white hover:bg-[#3e92e0] hover:text-white"
              >
                <Pencil />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Mettre a jour</DialogTitle>
              </DialogHeader>
              <div className="grid">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 grid grid-cols-2 items-center gap-x-10"
                  >
                    <FormField
                      control={form.control}
                      name="etat"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Moyen d'envoi</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            required
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a verified email to display" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="En attente de reception">
                                En attente de reception
                              </SelectItem>

                              {/* {form.watch("etat") == "En attente" && ( */}
                              <SelectItem value="Colis reçu">
                                Colis reçu
                              </SelectItem>
                              {/* )} */}

                              {/* {form.watch("etat") == "En suivant" && ( */}
                              <SelectItem value="Colis envoyé">
                                Colis envoyé
                              </SelectItem>

                              <SelectItem value="Arrivé a Abidjan">
                                Arrivé a Abidjan
                              </SelectItem>
                              {/* )} */}
                            </SelectContent>
                          </Select>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="poids"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Poids</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Poids"
                              {...field}
                              type="text"
                              // onChange={(e) =>
                              //   field.onChange(parseInt(e.target.value))
                              // }
                              required
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="prix"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Prix</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Prix"
                              {...field}
                              type="number"
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value))
                              }
                              required
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="quantite"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quantités</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            required
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a verified email to display" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value={"0"}>0</SelectItem>
                              <SelectItem value={"1"}>1</SelectItem>
                              <SelectItem value={"2"}>2</SelectItem>
                              <SelectItem value={"3"}>3</SelectItem>
                              <SelectItem value={"4"}>4</SelectItem>
                              <SelectItem value={"5"}>5</SelectItem>
                              <SelectItem value={"6"}>6</SelectItem>
                              <SelectItem value={"7"}>7</SelectItem>
                              <SelectItem value={"8"}>8</SelectItem>
                              <SelectItem value={"9"}>9</SelectItem>
                              <SelectItem value={"10"}>10</SelectItem>
                            </SelectContent>
                          </Select>

                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {item.service == "Envoie Maritime" && (
                      <FormField
                        control={form.control}
                        name="tailes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tailes (envoi maritime)</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Tailes"
                                {...field}
                                type="text"
                                // onChange={(e) =>
                                //   field.onChange(parseInt(e.target.value))
                                // }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    {/* <FormItem>
                      <FormLabel>Choisir une image</FormLabel>
                      <FormControl>
                        <Input
                          accept="image/*"
                          type="file"
                          onChange={handleImageChange}
                          // required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem> */}

                    <FormItem>
                      <FormLabel>Choisir des images</FormLabel>
                      <FormControl>
                        <Input
                          accept="image/*"
                          type="file"
                          multiple // Permet la sélection multiple
                          onChange={handleImageChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>

                    {/* <FormItem>
                      <FormLabel>Choisir une autre image</FormLabel>
                      <FormControl>
                        <Input
                          accept="image/*"
                          type="file"
                          onChange={handleImageChange2}
                          // required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>

                    <FormItem>
                      <FormLabel>Choisir une autre image</FormLabel>
                      <FormControl>
                        <Input
                          accept="image/*"
                          type="file"
                          onChange={handleImageChange3}
                          // required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem> */}

                    {/* <DialogClose asChild> */}
                    <Button
                      type="submit"
                      className="bg-[#1a76cb] border-0 text-white hover:bg-[#3e92e0]"
                    >
                      Mettre a jour
                    </Button>
                    {/* </DialogClose> */}
                  </form>
                </Form>
                {/* <form action="" onSubmit={(e: any) => uploas(e)}>
                  <input type="file" onChange={handleImageChange} />
                  <button>ss</button>
                </form> */}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
  {
    id: "actions",
    // header: "Date",
    cell: ({ row }) => {
      const item = row.original;
      const refetch = RefetchData();
      const getCookieData = () => {
        const cookie = Cookies.get("access_connect");
        if (cookie) {
          const cookieData = JSON.parse(cookie);
          return cookieData;
        }
        return null;
      };

      const cookieData = getCookieData();
      const token = cookieData?.token;
      const userName = cookieData?.username;

      function onDelete() {
        delUser(item.id, token)
          .then((res) => {
            if (res) {
              toast.success("suppression effectuée", {
                description: new Date(Date.now()).toLocaleString(),
              });
              // refetch();
            }
          })
          .catch((err) => {
            refetch();
            toast.error("une erreur c'est produite");
          });
      }

      // Utilisation

      return (
        <div>
          {userName === "admin" && (
            <AlertDialog>
              <AlertDialogTrigger>
                <Button className="bg-red-500 hover:bg-red-700">
                  <Trash color="#fff" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Etes-vous absolument sûr ?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Cette action ne peut pas être annulée. Cela supprimera
                    définitivement votre compte et supprimez vos données de nos
                    serveurs.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={onDelete}
                    className="bg-red-500 hover:bg-red-700"
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      );
    },
  },
];
