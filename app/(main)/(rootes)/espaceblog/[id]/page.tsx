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
import { useParams, usePathname } from "next/navigation";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { getAllBlog, getAllBlogId } from "@/app/api";
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

  const { id } = useParams();
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
    queryKey: ["datablogid1"],
    queryFn: () => getAllBlogId(user?.token as string, Number(id)),
  });

  console.log(queryData.data);

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

            <div>

            </div>
            <div>
                
            </div>
          </div>

          {/*  */}
        </div>
      </section>
    </main>
  );
};

export default Page;
