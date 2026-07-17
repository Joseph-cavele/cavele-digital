"use client";

import Link from "next/link";
import { useState, type ReactNode, type CSSProperties } from "react";
import { C } from "@/lib/colors";

type Props = {
  children: ReactNode;
  small?: boolean;
  className?: string;
  to?: string;
  onClick?: () => void;
};

export function BtnPrimary({ children, small = false, className, to, onClick }: Props) {
  const [hov, setHov] = useState(false);

  const style: CSSProperties = {
    background: hov ? C.h2 : C.cta,
    color: "#fff",
    padding: small ? "10px 20px" : "13px 26px",
    fontSize: small ? "13px" : "14px",
    boxShadow: hov ? `0 8px 24px ${C.cta}55` : `0 4px 14px ${C.cta}33`,
    transform: hov ? "translateY(-1px)" : "none",
    transition: "all .2s",
  };
  const cls = `font-semibold font-poppins cursor-pointer rounded-lg transition-all inline-flex items-center justify-center ${className ?? ""}`;
  const shared = {
    className: cls,
    style,
    onMouseEnter: () => setHov(true),
    onMouseLeave: () => setHov(false),
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
