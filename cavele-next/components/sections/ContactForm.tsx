"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { FaFacebook, FaInstagram, FaWhatsapp, FaLinkedin } from "react-icons/fa";

type Errors = { firstname?: string; email?: string; message?: string };

export function ContactForm() {
  const [form, setForm] = useState({ firstname: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const validate = () => {
    const e: Errors = {};
    if (!form.firstname.trim()) e.firstname = "First name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email address.";
    if (!form.message.trim()) e.message = "Message is required.";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.firstname, email: form.email, message: form.message }),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
    } catch {
      setErrors({ message: "Something went wrong. Please email caveledigital@gmail.com." });
    } finally {
      setLoading(false);
    }
  };

  const socials = [
    { icon: <FaFacebook />, href: "https://facebook.com", color: "hover:bg-blue-600" },
    { icon: <FaInstagram />, href: "https://instagram.com", color: "hover:bg-pink-500" },
    { icon: <FaLinkedin />, href: "https://linkedin.com", color: "hover:bg-blue-700" },
    { icon: <FaWhatsapp />, href: "https://wa.me/27710836571", color: "hover:bg-green-500" },
  ];

  const contacts = [
    { icon: <Mail className="w-5 h-5" />, text: "caveledigital@gmail.com" },
    { icon: <Phone className="w-5 h-5" />, text: "+27 71 083 6571" },
    { icon: <MapPin className="w-5 h-5" />, text: "Kroondal, Rustenburg, NW, SA" },
  ];

  return (
    <div className="bg-white flex items-center justify-center px-6 py-16" id="contact">
      <div className="w-full max-w-6xl">
        <div className="mb-12 text-center">
          <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
            Get In Touch
          </span>
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-3">Contact Us</h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
            Have a question or want to work together? Fill in the form and we&apos;ll get back to you within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-blue-900 rounded-2xl p-7 flex flex-col gap-5">
              <div>
                <p className="text-white font-bold text-lg mb-1">Let&apos;s talk</p>
                <p className="text-blue-200 text-sm leading-relaxed">
                  Reach out through any channel. We&apos;re always happy to hear from you.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                {contacts.map((c, i) => (
                  <div key={i} className="flex items-center gap-3 group">
                    <div className="w-9 h-9 rounded-xl bg-blue-800 group-hover:bg-blue-600 text-blue-200 group-hover:text-white flex items-center justify-center transition-all duration-200 shrink-0">
                      {c.icon}
                    </div>
                    <span className="text-blue-100 text-sm">{c.text}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-blue-800" />
              <div>
                <p className="text-blue-300 text-xs font-medium uppercase tracking-wider mb-3">Follow us</p>
                <div className="flex gap-2.5">
                  {socials.map((s, i) => (
                    <a
                      key={i}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-9 h-9 rounded-xl bg-blue-800 text-blue-200 hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110 ${s.color}`}
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
              <a
                href="https://wa.me/27710836571"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-sm px-5 py-3 rounded-xl transition-all duration-200 hover:scale-[1.02]"
              >
                <FaWhatsapp /> Chat on WhatsApp
              </a>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                    <Send className="w-7 h-7 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Message sent!</h3>
                  <p className="text-gray-500 text-sm max-w-xs">
                    Thanks, <strong>{form.firstname}</strong>! We&apos;ll reply to <strong>{form.email}</strong> shortly.
                  </p>
                  <button
                    onClick={() => {
                      setForm({ firstname: "", email: "", message: "" });
                      setSubmitted(false);
                    }}
                    className="mt-2 text-sm text-gray-400 hover:text-gray-700 underline underline-offset-2"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-medium text-gray-700">First Name</label>
                      <input
                        type="text"
                        placeholder="John"
                        value={form.firstname}
                        onChange={set("firstname")}
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.firstname ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50 hover:border-gray-300"}`}
                      />
                      {errors.firstname && <p className="text-xs text-red-500">{errors.firstname}</p>}
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-medium text-gray-700">Email Address</label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        value={form.email}
                        onChange={set("email")}
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.email ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50 hover:border-gray-300"}`}
                      />
                      {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-gray-700">Message</label>
                    <textarea
                      rows={5}
                      placeholder="Tell us how we can help you..."
                      value={form.message}
                      onChange={set("message")}
                      className={`w-full px-4 py-3 rounded-xl border text-sm text-gray-900 placeholder-gray-400 outline-none resize-none transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.message ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50 hover:border-gray-300"}`}
                    />
                    {errors.message && <p className="text-xs text-red-500">{errors.message}</p>}
                  </div>
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex items-center justify-center gap-2.5 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-3.5 rounded-xl transition-all duration-200 hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? "Sending…" : (<><Send className="w-4 h-4" /> Send Message</>)}
                  </button>
                  <p className="text-center text-xs text-gray-400">We typically respond within 24 hours.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
