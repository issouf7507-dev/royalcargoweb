"use client";
"use client";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CalendarDateRangePicker } from "@/components/date-range-picker";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";

import {
  getAllReservation,
  getAllReservationAnonyme,
  getAllUserApp,
} from "@/app/api";
import { RecentSales } from "@/components/recent-sales";
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

  const queryData = useQuery({
    queryKey: ["datatestclient2"],
    queryFn: () => getAllUserApp(user?.token as string),
  });

  const queryData2 = useQuery({
    queryKey: ["datatestclient3"],
    queryFn: () => getAllReservation(user?.token as string),
  });

  const queryData3 = useQuery({
    queryKey: ["datatestclient4"],
    queryFn: () => getAllReservationAnonyme(),
  });

  console.log(queryData3.data);

  const handleLogout = async () => {
    Cookies.remove("access_connect");
    navigation.push("/admin");
  };

  return (
    <main className="w-full h-screen ">
      <section className="w-full h-screen flex">
        <div className=" w-full">
          <div className="flex h-16 border-b justify-between items-center px-4">
            <div className="mx-6 flex items-center gap-10">
              <h1 className="text-2xl">Royal cargo</h1>
              <nav>
                <ul className="flex items-center gap-2">
                  <li>
                    <Link
                      href="/dashboard"
                      className={`${
                        pathname === "/dashboard"
                          ? "text-white bg-blue-500 p-2 rounded-xl hover:bg-blue-600"
                          : "text-muted-foreground"
                      } font-semibold `}
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
                      className="font-semibold text-muted-foreground transition-all hover:text-black"
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
                      {/* <AvatarImage src="/avatars/01.png" alt="@shadcn" /> */}
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

                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    Se deconnecter
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/*  */}
          <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
              <div className="flex items-center space-x-2">
                <CalendarDateRangePicker />
              </div>
            </div>
            <div className="space-y-4 flex flex-col">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Nombre d'utilisateurs
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold">
                      {queryData.data && queryData.data.length}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Nombre de demande d'adresse
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold">
                      {queryData2.data && queryData2.data.length}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Nombre de demande d'adresse anonyme
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold">
                      {queryData3.data && queryData3.data.length}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Nombre de service
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold">3</div>
                  </CardContent>
                </Card>
              </div>
              <div className="flex-1 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Aperçu</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    {/* <Overview /> */}
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Adresse demandée</CardTitle>
                    <CardDescription>
                      Vous avez créé 21 zones ce mois-ci.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="  overflow-y-scroll">
                    <RecentSales
                      queryData2={queryData2.data && queryData2.data}
                    />{" "}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;
