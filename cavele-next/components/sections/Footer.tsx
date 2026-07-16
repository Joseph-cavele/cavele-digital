"use client";

import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaWhatsapp, FaTiktok, FaInstagram } from "react-icons/fa";
import { C } from "@/lib/colors";
import { site } from "@/lib/site";

const SOCIAL = [
  { icon: FaFacebook, link: site.socials.facebook, id: 1 },
  { icon: FaWhatsapp, link: site.socials.whatsapp, id: 2 },
  { icon: FaInstagram, link: site.socials.instagram, id: 3 },
  { icon: FaTiktok, link: site.socials.tiktok, id: 4 },
];

export function Footer() {
  return (
    <footer style={{ background: C.dark }}>
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-8">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden bg-white">
                <Image src="/logo.png" width={100} height={100} alt="Cavele Digital logo" />
              </div>
              <div>
                <span className="font-poppins font-extrabold text-lg" style={{ color: "#fff" }}>Cavele</span>
                <span className="font-poppins font-extrabold text-lg" style={{ color: C.accent }}> Digital</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed max-w-xs mb-5" style={{ color: "#94A3B8" }}>
              Custom websites, booking &amp; management systems, and business automation —
              built from scratch by Joseph Cavele in Rustenburg, South Africa.
            </p>
            <div className="flex gap-2">
              {SOCIAL.map((social) => {
                const Icon = social.icon;
                return (
                  <a href={social.link} key={social.id} target="_blank" rel="noopener noreferrer">
                    <span
                      className="flex items-center justify-center w-10 h-10 bg-white rounded-full transition-colors cursor-pointer"
                      style={{ color: "#475569" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = C.accent)}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}
                    >
                      <Icon size={20} />
                    </span>
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="font-poppins font-semibold text-sm mb-4" style={{ color: "#fff" }}>Services</h4>
            <ul className="space-y-2.5 text-sm">
              {["Website Development", "Booking & Management Systems", "Business Automation", "Maintenance & Support"].map((l) => (
                <li
                  key={l}
                  className="cursor-pointer transition-colors"
                  style={{ color: C.footerTxt }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = C.footerLink)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = C.footerTxt)}
                >
                  {l}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-poppins font-semibold text-sm mb-4" style={{ color: "#fff" }}>Company</h4>
            <ul className="space-y-2.5 text-sm">
              {["Services", "Portfolio", "About", "FAQ", "Contact"].map((l) => (
                <li
                  key={l}
                  className="cursor-pointer transition-colors"
                  style={{ color: C.footerTxt }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = C.footerLink)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = C.footerTxt)}
                >
                  {l}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="border-t pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs"
          style={{ borderColor: "#1E293B", color: "#475569" }}
        >
          <p>© {new Date().getFullYear()} Cavele Digital. All rights reserved.</p>
          <div className="flex gap-5 items-center">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((l) => (
              <span
                key={l}
                className="cursor-pointer transition-colors"
                onMouseEnter={(e) => (e.currentTarget.style.color = C.accent)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}
              >
                {l}
              </span>
            ))}
            <Link
              href="/admin"
              className="cursor-pointer transition-colors"
              onMouseEnter={(e) => (e.currentTarget.style.color = C.accent)}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
