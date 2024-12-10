"use client";
import React, { useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from "@tanstack/react-query";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { postNewAdress } from "@/app/api";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
const queryClient = new QueryClient();

const formSchema = z.object({
  nom: z.string(),
  numero: z.string(),
  etat: z.string(),
  service: z.string(),
  trackCode: z.string(),
  daten: z.date(),
  condition: z.boolean(),
  images: z.string(),
  poids: z.string(),
  prix: z.number(),
  tailes: z.string(),
  quantite: z.string(),
  typec: z.string(),
});

const FormIns = ({ isDialogOpen, setIsDialogOpen, service }: any) => {
  return (
    <QueryClientProvider client={queryClient}>
      <FormInsRef
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        service={service}
      />
    </QueryClientProvider>
  );
};

const FormInsRef = ({ isDialogOpen, setIsDialogOpen, service }: any) => {
  const navigate = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nom: "",
      numero: "+225",
      etat: "En attente de reception",
      service: "",
      trackCode: "",
      daten: new Date(Date.now()),
      condition: false,
      images: "",
      poids: "",
      prix: 0,
      tailes: "",
      quantite: "0",
      typec: "",
    },
  });

  const { mutate } = useMutation({
    mutationFn: (variables: any) => {
      return postNewAdress(variables);
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values, {
      onSuccess(data) {
        if (data) {
          navigate.push(`/tracking/${form.watch("trackCode")}`);
        }
      },
      onError(error) {
        if (error) {
          // window.location.reload();
          console.log(error);
        }
      },
    });
    // console.log(values);
  }

  useEffect(() => {
    form.setValue("trackCode", uuidv4());
    form.setValue("service", service);
  }, [isDialogOpen, form, service]);
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="sm:max-w-[475px]">
        <DialogHeader>
          <DialogTitle className="text-center">Demande d'adresse</DialogTitle>
          <Separator />
          <DialogDescription className="text-md text-black">
            Vous avez selectionné {service}
          </DialogDescription>
        </DialogHeader>

        <div>
          {" "}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="nom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                      <Input placeholder="Nom" {...field} required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="numero"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Numéro de tel</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Numero"
                        {...field}
                        type="text"
                        onChange={(e) =>
                          field.onChange(e.target.value.replaceAll(" ", ""))
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
                name="typec"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type de produit</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Type de produit"
                        {...field}
                        type="text"
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="condition"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-3">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        required
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-red-500">
                        Accepter les termes et conditions qui ce trouve dans la
                        section (
                        <Button variant="link" className="p-0 m-0">
                          <Link href="/apropos" className="text-blue-500">
                            A propos
                          </Link>
                        </Button>
                        )
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <Button type="submit">Demander une adresse</Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FormIns;
