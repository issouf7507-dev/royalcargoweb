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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Button } from "@/components/ui/button";
// import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { getAllReservationAnonyme } from "@/app/api";
import { AdminProvider, RefetchProvider } from "@/app/context";
import Cookies from "js-cookie";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/provider/AuthContext";

const queryClient = new QueryClient();

const Page = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <PageRef />
    </QueryClientProvider>
  );
};
const PageRef = () => {
  const pathname = usePathname();
  const navigation = useRouter();
  const { user } = useAuth();

  const queryData2 = useQuery({
    queryKey: ["datatestclient3"],
    queryFn: () => getAllReservationAnonyme(),
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
                      Liste des demandes
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/clientsanonyme"
                      className={`${
                        pathname === "/clientsanonyme"
                          ? "text-white bg-blue-500 p-2 rounded-xl hover:bg-blue-600"
                          : "text-muted-foreground"
                      } font-semibold `}
                    >
                      Liste des demandes anonymes
                    </Link>
                  </li>
                  {/* <li>
                    <Link
                      href="/espaceblog"
                      className="font-semibold text-muted-foreground transition-all hover:text-black"
                    >
                      Espace blog
                    </Link>
                  </li> */}
                  {/* {userName === "admin" && (
                    <li>
                      <Link
                        href="/users"
                        className="font-semibold text-muted-foreground transition-all hover:text-black"
                      >
                        Utilisateurs
                      </Link>
                    </li>
                  )} */}
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
            <Tabs defaultValue="Tous" className="">
              <TabsList>
                <TabsTrigger value="Tous">Tous</TabsTrigger>
                <TabsTrigger value="En attente">En attente</TabsTrigger>
                <TabsTrigger value="Recu">Recu</TabsTrigger>
                <TabsTrigger value="Envoyé">Envoyé</TabsTrigger>
                <TabsTrigger value="Arrivé">Arrivé a Abidjan</TabsTrigger>
              </TabsList>
              <TabsContent value="Tous">
                <ScrollArea className="h-[80vh]">
                  <div className="flex-1 space-y-4  pt-6">
                    {/* <AdminProvider.Provider value={userName && userName}> */}
                    <RefetchProvider.Provider
                      value={queryData2.data && queryData2.refetch}
                    >
                      <DataTable
                        columns={columns}
                        // data={queryData.data ? queryData.data : []}
                        data={queryData2.data ? queryData2.data : []}
                      />
                    </RefetchProvider.Provider>
                    {/* </AdminProvider.Provider> */}
                  </div>
                </ScrollArea>
              </TabsContent>
              <TabsContent value="En attente">
                <ScrollArea className="h-[80vh]">
                  <div className="flex-1 space-y-4  pt-6">
                    <RefetchProvider.Provider
                      value={queryData2.data && queryData2.refetch}
                    >
                      <DataTable
                        columns={columns}
                        data={
                          queryData2.data
                            ? queryData2.data.filter(
                                (item: any) =>
                                  item.etat == "En attente de reception"
                              )
                            : []
                        }
                        // data={[]}
                      />
                    </RefetchProvider.Provider>
                  </div>
                </ScrollArea>
              </TabsContent>
              <TabsContent value="Recu">
                <ScrollArea className="h-[80vh]">
                  <div className="flex-1 space-y-4  pt-6">
                    <RefetchProvider.Provider
                      value={queryData2.data && queryData2.refetch}
                    >
                      <DataTable
                        columns={columns}
                        data={
                          queryData2.data
                            ? queryData2.data.filter(
                                (item: any) => item.etat == "Colis reçu"
                              )
                            : []
                        }
                        // data={[]}
                      />
                    </RefetchProvider.Provider>
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="Envoyé">
                <ScrollArea className="h-[80vh]">
                  <div className="flex-1 space-y-4  pt-6">
                    <RefetchProvider.Provider
                      value={queryData2.data && queryData2.refetch}
                    >
                      <DataTable
                        columns={columns}
                        data={
                          queryData2.data
                            ? queryData2.data.filter(
                                (item: any) => item.etat == "Colis envoyé"
                              )
                            : []
                        }
                        // data={[]}
                      />
                    </RefetchProvider.Provider>
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="Arrivé">
                <ScrollArea className="h-[80vh]">
                  <div className="flex-1 space-y-4  pt-6">
                    <RefetchProvider.Provider
                      value={queryData2.data && queryData2.refetch}
                    >
                      <DataTable
                        columns={columns}
                        data={
                          queryData2.data
                            ? queryData2.data.filter(
                                (item: any) => item.etat == "Arrivé a Abidjan"
                              )
                            : []
                        }
                        // data={[]}
                      />
                    </RefetchProvider.Provider>
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>

          {/*  */}
        </div>
      </section>
    </main>
  );
};

export default Page;
