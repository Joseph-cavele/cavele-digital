"use client";

import { Mail, PhoneCall } from "lucide-react";
import { FaFacebook, FaWhatsapp, FaTiktok, FaInstagram } from "react-icons/fa";
import { C } from "@/lib/colors";
import { site } from "@/lib/site";

const SOCIAL = [
  { icon: FaFacebook, link: site.socials.facebook, id: 1 },
  { icon: FaWhatsapp, link: site.socials.whatsapp, id: 2 },
  { icon: FaInstagram, link: site.socials.instagram, id: 3 },
  { icon: FaTiktok, link: site.socials.tiktok, id: 4 },
];

export function TopBar() {
  return (
    <div
      className="hidden md:flex justify-between items-center px-8 py-2 text-xs font-medium"
      style={{ background: C.dark, color: C.muted }}
    >
      <div className="flex gap-6 items-center justify-center">
        <h1 className="text-white text-xl font-poppins">Web Development &amp; Digital Solutions</h1>
        <div className="flex flex-row">
          <span className="text-blue-700"><PhoneCall size={20} /></span>
          <span className="text-white">+27710836571</span>
        </div>
        <div className="flex flex-row gap-1.5">
          <span className="text-blue-700 font-OpenSans"><Mail size={20} /></span>
          <span className="text-white font-OpenSans">caveledigital@gmail.com</span>
        </div>
      </div>
      <div className="flex gap-4">
        {SOCIAL.map((s) => {
          const Icon = s.icon;
          return (
            <a
              href={s.link}
              key={s.id}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer transition-colors"
              style={{ color: "#475569" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = C.accent)}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}
            >
              <Icon size={25} />
            </a>
          );
        })}
      </div>
    </div>
  );
}
