"use client";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
// import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { getAllUser, postUser } from "@/app/api";
import { RefetchProvider } from "@/app/context";
import { CirclePlus, Save } from "lucide-react";
import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import Cookies from "js-cookie";
import { toast } from "sonner";

const queryClient = new QueryClient();

const formSchema = z.object({
  user: z.string(),
  passwd: z.string(),
});

const Page = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <PageRef />
    </QueryClientProvider>
  );
};
const PageRef = () => {
  // const navigation = useRouter();
  // const getCookieData = () => {
  //   const cookie = Cookies.get("access_connect");
  //   if (cookie) {
  //     const cookieData = JSON.parse(cookie);
  //     return cookieData;
  //   } else {
  //     navigation.push("/admin");
  //   }
  //   // return null;
  // };

  // // Utilisation
  // const cookieData = getCookieData();
  // const token = cookieData?.token;
  // const userName = cookieData?.user;
  // const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  // const pathname = usePathname();

  // const queryData = useQuery({
  //   queryKey: ["datatestuser"],
  //   queryFn: () => getAllUser(token),
  // });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user: "",
      passwd: "",
    },
  });

  // const handleItemClick = () => {
  //   // e.stopPropagation();
  //   setIsDialogOpen(true);
  // };

  // const { mutate } = useMutation({
  //   mutationFn: (variables: any) => {
  //     return postUser(variables, token);
  //   },
  // });

  // function onSubmit(values: z.infer<typeof formSchema>) {
  //   mutate(values, {
  //     onSuccess(data) {
  //       if (data) {
  //         queryData.refetch();
  //         setIsDialogOpen(false);
  //         toast.success("Création bien effectuée");
  //       }
  //     },
  //     onError(error) {
  //       if (error) {
  //         // window.location.reload();
  //         console.log(error);
  //       }
  //     },
  //   });
  // }

  // const handleLogout = async () => {
  //   Cookies.remove("access_connect");
  //   navigation.push("/admin");
  // };

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
                    {/* <Link
                      href="/users"
                      className={`${
                        pathname === "/users"
                          ? "text-black"
                          : "text-muted-foreground"
                      } font-semibold `}
                    >
                      utilisateurs
                    </Link> */}
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
                      {/* <AvatarImage src="/avatars/01.png" alt="@shadcn" /> */}
                      <AvatarFallback>
                        {" "}
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
                  //  onClick={handleLogout}
                  >
                    Se deconnecter
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="p-8">
            <Button
            // onClick={handleItemClick}
            >
              <CirclePlus className="mr-2" /> Nouveau utilisateur
            </Button>
          </div>

          <Dialog
          // open={isDialogOpen}
          // onOpenChange={setIsDialogOpen}
          >
            <DialogContent className="sm:max-w-[475px]">
              <DialogHeader>
                <DialogTitle className="text-center">
                  Nouvelle utilisateur
                </DialogTitle>
                <Separator />
              </DialogHeader>

              <div>
                {" "}
                <Form {...form}>
                  <form
                    // onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="user"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder="Username" {...field} required />
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
                              {...field}
                              type="password"
                              required
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit">
                      {" "}
                      <Save className="mr-2" />
                      Enregistrer
                    </Button>
                  </form>
                </Form>
              </div>
            </DialogContent>
          </Dialog>

          {/*  */}
          <div className="flex-1 space-y-4 p-8 pt-6">
            <DataTable
              columns={columns}
              data={[]}
              // data={queryData.data ? queryData.data : []}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;
