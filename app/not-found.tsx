import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "80vh",
        display: "grid",
        placeItems: "center",
        textAlign: "center",
        padding: "40px 24px",
      }}
    >
      <div>
        <p className="mono eyebrow" style={{ justifyContent: "center" }}>
          Error 404
        </p>
        <h1 style={{ fontSize: "clamp(40px, 8vw, 80px)", margin: "18px 0 12px" }}>
          Page not found.
        </h1>
        <p style={{ color: "var(--text-mid)", maxWidth: "44ch", margin: "0 auto 28px" }}>
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <Link href="/" className="btn btn-primary">
          Back home
        </Link>
      </div>
    </main>
  );
}
