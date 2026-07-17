"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { BtnOutline } from "@/components/ui/BtnOutline";
import { BtnPrimary } from "@/components/ui/BtnPrimary";
import { C } from "@/lib/colors";

const NAV_LINK = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/#services" },
  { label: "Work", path: "/#work" },
  { label: "About", path: "/#about" },
  { label: "FAQ", path: "/#faq" },
  { label: "Contact", path: "/#contact" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className="sticky top-0 z-50 transition-all"
      style={{ background: C.white, boxShadow: "0 1px 0 #E2E8F0" }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 select-none">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden">
            <Image src="/logo.png" width={80} height={80} alt="Cavele Digital logo" />
          </div>
          <div className="space-x-2.5">
            <span style={{ color: C.primary }} className="font-poppins font-extrabold text-lg leading-none">
              Cavele
            </span>
            <span className="font-poppins font-extrabold text-lg leading-none">Digital</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center justify-center gap-8">
          {NAV_LINK.map((link) => (
            <div className="flex items-center" key={link.path}>
              <Link href={link.path} style={{ color: C.navLink }} className="hover:text-blue-600 transition-colors">
                {link.label}
              </Link>
            </div>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-3 font-poppins">
          <BtnPrimary small to="/quote">Get a Quote</BtnPrimary>
        </div>

        <button className="md:hidden p-2 flex items-center" onClick={() => setMenuOpen((o) => !o)} aria-label="Toggle menu">
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t px-6 pb-5 pt-3 flex flex-col gap-4" style={{ borderColor: "#E2E8F0" }}>
          {NAV_LINK.map((link) => (
            <Link key={link.path} href={link.path} onClick={() => setMenuOpen(false)} style={{ color: C.navLink }}>
              {link.label}
            </Link>
          ))}
          <div className="flex gap-3 flex-wrap">
            <BtnOutline small to="/#contact">Book a Call</BtnOutline>
            <BtnPrimary small to="/quote">Get a Quote</BtnPrimary>
          </div>
        </div>
      )}
    </nav>
  );
}
