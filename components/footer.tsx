"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  const navigation = useRouter();
  const onAdm = () => {
    navigation.push("/admin");
  };
  return (
    <footer className="pb-4">
      <div className="m-auto w-full h-full px-5 mt-12 lg:max-w-6xl md:flex justify-between">
        <div className="mb-14">
          <Link href="/">
            <h1 className="font-poppins">Royal cargo</h1>
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <nav>
            <h1 className="mb-4 font-poppins font-bold">A Propos</h1>
            <ul className="flex flex-col gap-2">
              <li>
                <Link href="/apropos">Qui sommes-nous</Link>
              </li>

              {/* <li>
                <Link href="/">Partenaire</Link>
              </li>
              <li>
                <Link href="/">Nos client</Link>
              </li> */}
            </ul>
          </nav>
          {/* <nav>
            <h1 className="mb-4 font-poppins font-bold">Produit</h1>
            <ul className="flex flex-col gap-2">
              <li>
                <Link href="/">Fonctionnalités</Link>
              </li>
            </ul>
          </nav> */}
          <nav>
            <h1 className="mb-4 font-poppins font-bold">Ressources</h1>
            <ul className="flex flex-col gap-2">
              <li>{/* <Link href="/">Blog</Link> */}</li>
              <li>
                <Link href="/contact">Aide</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <span className="mt-2 block w-full h-[.5px] bg-muted-foreground" />

      <div className="p-4 flex items-center justify-between">
        <small className="text-muted-foreground tex" onClick={onAdm}>
          © ROYAL CARGO 2024 - Tous Droits Réservés
        </small>
        <ul className="flex items-center gap-2">
          <li>
            <Link href="https://www.facebook.com/royalcargoexpres/">
              <Facebook color="#1a76cb" />
            </Link>
          </li>
          <li>
            <Link href="https://www.tiktok.com/@royalair225?_t=8nCgjg0DLjq&_r=1">
              <Image
                width={24}
                height={24}
                alt=""
                src="/tiktok-svgrepo-com.svg"
              />
            </Link>
          </li>
          <li>{/* <Instagram color="#1a76cb" /> */}</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
