"use client";

import Link from "next/link";
import { useState, type ReactNode, type CSSProperties } from "react";
import { C } from "@/lib/colors";

type Props = {
  children: ReactNode;
  dark?: boolean;
  full?: boolean;
  small?: boolean;
  to?: string;
  onClick?: () => void;
};

export function BtnOutline({ children, dark = false, full = false, small = false, to, onClick }: Props) {
  const [h, setH] = useState(false);
  const base = dark ? "rgba(255,255,255,.25)" : C.cta;
  const baseColor = dark ? "#fff" : C.cta;

  const style: CSSProperties = {
    border: `2px solid ${h ? C.cta : base}`,
    background: h ? C.cta : "transparent",
    color: h ? "#fff" : baseColor,
    padding: small ? "8px 18px" : "11px 24px",
    fontSize: small ? "13px" : "14px",
    transition: "all .2s",
  };
  const cls = `font-semibold font-Inter cursor-pointer rounded-lg transition-all inline-flex items-center justify-center ${full ? "w-full" : ""}`;
  const shared = {
    className: cls,
    style,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
  };

  if (to) {
    return (
      <Link href={to} onClick={onClick} {...shared}>
        {children}
      </Link>
    );
  }
  return (
    <button onClick={onClick} {...shared}>
      {children}
    </button>
  );
}
