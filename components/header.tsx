"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignJustify } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Header = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const pathname = usePathname();
  // console.log(pathname);

  return (
    <header
      className={` ${
        pathname === "/admin" ||
        pathname === "/dashboard" ||
        pathname === "/clients" ||
        pathname === "/users"
          ? "hidden"
          : ""
      } fixed top-0 left-0 w-full h-24 flex items-center justify-between py-6 px-10 bg-white shadow-lg md:px-20 z-50`}
    >
      <div>
        <Link href="/">
          <Image
            className="w-50 h-40 object-contain"
            src="/logo.png"
            objectFit="contain"
            width={200}
            height={200}
            alt="log"
          />
        </Link>
      </div>
      <nav className="hidden md:block">
        <ul className="flex items-center gap-5">
          <li>
            <Link
              href="/"
              className={` ${
                pathname == "/" ? "text-[#1a76cb] " : "text-[#000]"
              }transition-all hover:text-[#1a76cb] text-[18px] font-semibold`}
            >
              Acceuil
            </Link>
          </li>
          <li>
            <Link
              href="/apropos"
              className={` ${
                pathname == "/apropos" ? "text-[#1a76cb] " : "text-[#000]"
              }transition-all hover:text-[#1a76cb] text-[18px] font-semibold`}
            >
              A propos
            </Link>
          </li>
          <li>
            <Link
              // href="apropos"
              href={`${pathname === "/apropos" ? "/" : "#dernieres-nouvelles"}`}
              // href="#dernieres-nouvelles"
              className="transition-all hover:text-[#1a76cb] text-[18px] font-semibold"
            >
              Expedier un colis
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className={` ${
                pathname == "/contact" ? "text-[#1a76cb] " : "text-[#000]"
              }transition-all hover:text-[#1a76cb] text-[18px] font-semibold`}
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
      <div className="md:hidden">
        <Sheet open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <SheetTrigger asChild>
            <Button variant="outline">
              <AlignJustify />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              {/* <SheetTitle>Edit profile</SheetTitle> */}
            </SheetHeader>

            <nav className="p-8">
              <ul className="flex flex-col items-start gap-5">
                <li onClick={() => setIsDialogOpen(false)}>
                  <Link
                    href="/"
                    className={` ${
                      pathname == "/" ? "text-[#1a76cb] " : "text-[#000]"
                    }transition-all hover:text-[#1a76cb] text-[24px] font-semibold`}
                  >
                    Acceuil
                  </Link>
                </li>
                <li onClick={() => setIsDialogOpen(false)}>
                  <Link
                    href="/apropos"
                    className={` ${
                      pathname == "/apropos" ? "text-[#1a76cb] " : "text-[#000]"
                    }transition-all hover:text-[#1a76cb] text-[24px] font-semibold`}
                  >
                    A propos
                  </Link>
                </li>
                <li onClick={() => setIsDialogOpen(false)}>
                  <Link
                    // href="apropos"
                    href={`${
                      pathname === "/apropos" ? "/" : "#dernieres-nouvelles"
                    }`}
                    // href="#dernieres-nouvelles"
                    className="transition-all hover:text-[#1a76cb] text-[24px] font-semibold"
                  >
                    Expedier un colis
                  </Link>
                </li>
                <li onClick={() => setIsDialogOpen(false)}>
                  <Link
                    href="/contact"
                    className={` ${
                      pathname == "/contact" ? "text-[#1a76cb] " : "text-[#000]"
                    }transition-all hover:text-[#1a76cb] text-[24px] font-semibold`}
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
