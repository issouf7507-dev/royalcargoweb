"use client";
import React from "react";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { postLog } from "@/app/api";

import { useRouter } from "next/navigation";

import { useAuth } from "@/provider/AuthContext";

const queryClient = new QueryClient();

const formSchema = z.object({
  user: z.string(),
  passwd: z.string().min(4),
});

const Page = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <PageRef />
    </QueryClientProvider>
  );
};

const PageRef = () => {
  const navigation = useRouter();
  const { login } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user: "",
      passwd: "",
    },
  });

  const [isLoading, setIsLoading] = React.useState(false);
  function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log(values);

    login(values.user, values.passwd);
  }

  return (
    <main className="h-screen w-full">
      <section className="grid grid-cols-2 h-full w-full">
        <div className="px-4 flex items-start  justify-center flex-col ">
          <h2>Royal cargo </h2>
          <h1 className="text-4xl">Bienvenu </h1>

          <div className="w-full mt-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className=" flex flex-col gap-4 "
              >
                <FormField
                  control={form.control}
                  name="user"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom d'utilisateur</FormLabel>
                      <FormControl>
                        <Input placeholder="Nom d'utilisateur" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="passwd"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mot de passe</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Mot de passe"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
                  Se connecter
                </Button>
              </form>
            </Form>
          </div>
        </div>
        <div className="bg-gray-100 flex items-center justify-center p-36">
          <Image
            className="object-contain "
            src="/logo.png"
            objectFit="contain"
            width={1000}
            height={1000}
            alt="log"
          />
        </div>
      </section>
    </main>
  );
};

export default Page;
