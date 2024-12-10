"use client";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
} from "@tanstack/react-query";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";
// import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Pen } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import { useState } from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { getAllBlog } from "@/app/api";
import { useAuth } from "@/provider/AuthContext";

const queryClient = new QueryClient();

const formSchema = z.object({
  id: z.number(),
  titre: z.string(),
  description: z.string(),
});

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const Page = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <PageRef />
    </QueryClientProvider>
  );
};
const PageRef = () => {
  const pathname = usePathname();
  const { user } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      titre: "",
      description: "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("titre", values.titre);
    formData.append("description", values.description);
    if (image) {
      formData.append("image", image);
    }

    // console.log(values);

    const response = await fetch("http://localhost:9001/api/v01/articles", {
      // http://localhost:9001
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (response.ok) {
      console.log("Article créé avec succès :", data);
      setIsDialogOpen(false);
      queryData.refetch();
    } else {
      console.error("Erreur :", data.message);
    }
  };

  const queryData = useQuery({
    queryKey: ["datablog1"],
    queryFn: () => getAllBlog(user?.token as string),
  });

  return (
    <main className="w-full h-screen ">
      <section className="w-full h-screen flex">
        {/* ////////// */}
        <div className=" w-full">
          {/* hearder */}
          <div className="flex h-16 border-b justify-between items-center px-4">
            <div className="mx-6 flex items-center gap-10">
              <h1 className="text-2xl">Royal cargo</h1>
              <nav>
                <ul className="flex items-center gap-2">
                  <li>
                    <Link
                      href="/dashboard"
                      className="font-semibold text-muted-foreground transition-all hover:text-black"
                    >
                      Tablau de bord
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/clients"
                      className="font-semibold text-muted-foreground transition-all hover:text-black"
                    >
                      Liste des clients
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/espaceblog"
                      className={`${
                        pathname === "/espaceblog"
                          ? "text-black"
                          : "text-muted-foreground"
                      } font-semibold `}
                    >
                      Espace blog
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="ml-auto flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      {/*src="/avatars/01.png" alt="@shadcn" /> */}
                      <AvatarFallback>
                        {/* {userName && userName.toString().slice(0, 2)} */}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {/* {userName && userName} */}
                      </p>
                    </div>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                  // onClick={handleLogout}
                  >
                    Se deconnecter
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="px-8 mt-5">
            <Button onClick={() => setIsDialogOpen(true)}>
              Creer un atircle <Pen className="ml-3" size={16} />
            </Button>

            <div className="mt-4">
              <div className="grid grid-cols-3 2xl:grid-cols-4">
                {queryData.data &&
                  queryData.data.map((item: any) => (
                    <Link href={`/espaceblog/${item.id}`}>
                      <Card className="w-[350px]">
                        <img
                          src={`http://localhost:9001/api/v01/img/1732463176207-268422511-4.png`}
                          alt=""
                        />
                        <CardHeader>
                          <CardTitle>{item.titre}</CardTitle>
                          <CardDescription>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: item.description,
                              }}
                            />
                          </CardDescription>
                        </CardHeader>
                        <CardContent></CardContent>
                        {/* <CardFooter className="flex justify-between">
                  <Button variant="outline">Cancel</Button>
                  <Button>Deploy</Button>
                </CardFooter> */}
                      </Card>
                    </Link>
                  ))}
              </div>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              {/* <DialogTrigger asChild>
                <Button variant="outline">Edit Profile</Button>
              </DialogTrigger> */}
              <DialogContent className="sm:max-w-[725px]">
                <DialogHeader>
                  <DialogTitle>Nouvel article</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid">
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="space-y-4 grid "
                      >
                        <div className=" grid grid-cols-2 items-center gap-5">
                          <FormField
                            control={form.control}
                            name="titre"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Titre</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Titre"
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
                        </div>

                        <div>
                          <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                  <Controller
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                      <ReactQuill
                                        value={field.value}
                                        onChange={field.onChange}
                                        theme="snow"
                                        placeholder="Écrivez ici..."
                                        modules={{
                                          toolbar: [
                                            [
                                              "bold",
                                              "italic",
                                              "underline",
                                              "strike",
                                            ],
                                            [{ header: [1, 2, 3, false] }],
                                            [
                                              { list: "ordered" },
                                              { list: "bullet" },
                                            ],
                                            ["link"],
                                            ["clean"],
                                          ],
                                        }}
                                      />
                                    )}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* <DialogClose asChild> */}
                        <Button
                          type="submit"
                          className="bg-[#1a76cb] border-0 text-white hover:bg-[#3e92e0]"
                        >
                          Save changes
                        </Button>
                        {/* </DialogClose> */}
                      </form>
                    </Form>
                  </div>
                </div>
                {/* <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter> */}
              </DialogContent>
            </Dialog>
          </div>

          {/*  */}
        </div>
      </section>
    </main>
  );
};

export default Page;
