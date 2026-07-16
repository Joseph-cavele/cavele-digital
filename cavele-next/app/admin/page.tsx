import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAdminConfigured, isAuthed } from "@/lib/admin";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function AdminPage() {
  if (!isAdminConfigured()) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8 max-w-md text-center">
          <h1 className="text-xl font-bold font-poppins text-gray-900 mb-2">Admin not configured</h1>
          <p className="text-sm text-gray-500">
            Set <code className="bg-gray-100 px-1.5 py-0.5 rounded">ADMIN_PASSWORD</code> (6+ characters)
            in <code className="bg-gray-100 px-1.5 py-0.5 rounded">.env.local</code> and restart the
            server to enable the dashboard.
          </p>
        </div>
      </main>
    );
  }

  if (!isAuthed()) {
    redirect("/admin/login");
  }

  return <AdminDashboard />;
}
