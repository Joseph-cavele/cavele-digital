"use client";

import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";

const SERVICES = [
  "Website Development",
  "Booking & Management System",
  "Business Automation",
  "Website Maintenance & Support",
  "Digital Marketing (building out)",
  "Not sure — need advice",
];

const BUDGETS = [
  "Under R10,000",
  "R10,000 – R25,000",
  "R25,000 – R50,000",
  "R50,000 – R100,000",
  "R100,000+",
  "Not sure yet",
];

type Errors = Partial<Record<"name" | "email" | "service" | "general", string>>;

export function QuoteForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    budget: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const validate = () => {
    const e: Errors = {};
    if (!form.name.trim()) e.name = "Your name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email.";
    if (!form.service) e.service = "Please choose a service.";
    return e;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length) {
      setErrors(v);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("failed");
      setSubmitted(true);
    } catch {
      setErrors({ general: "Something went wrong. Please email caveledigital@gmail.com." });
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-200 hover:border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent";

  if (submitted) {
    return (
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-10 text-center flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold font-poppins text-gray-900">Quote request received!</h3>
        <p className="text-gray-500 text-sm max-w-sm">
          Thanks, <strong>{form.name}</strong>. We&apos;ll review your request and send a tailored
          quote to <strong>{form.email}</strong> within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8 flex flex-col gap-5">
      {errors.general && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">{errors.general}</div>
      )}

      <div className="grid sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">Full name *</label>
          <input type="text" placeholder="John Smith" value={form.name} onChange={set("name")} className={inputCls} />
          {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">Email *</label>
          <input type="email" placeholder="you@company.com" value={form.email} onChange={set("email")} className={inputCls} />
          {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">Phone / WhatsApp</label>
          <input type="tel" placeholder="+27 71 083 6571" value={form.phone} onChange={set("phone")} className={inputCls} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">Budget</label>
          <select value={form.budget} onChange={set("budget")} className={`${inputCls} cursor-pointer`}>
            <option value="">Select a budget</option>
            {BUDGETS.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">What do you need? *</label>
        <select value={form.service} onChange={set("service")} className={`${inputCls} cursor-pointer`}>
          <option value="">Select a service</option>
          {SERVICES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        {errors.service && <p className="text-xs text-red-500">{errors.service}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">Tell us about your project</label>
        <textarea
          rows={5}
          placeholder="A few lines about your business, goals, and timeline…"
          value={form.message}
          onChange={set("message")}
          className={`${inputCls} resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="flex items-center justify-center gap-2.5 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold font-poppins text-sm py-3.5 rounded-xl transition-all duration-200 hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Sending…" : (<><Send className="w-4 h-4" /> Get My Free Quote</>)}
      </button>
      <p className="text-center text-xs text-gray-400">
        No obligation. We reply within one business day.
      </p>
    </form>
  );
}
