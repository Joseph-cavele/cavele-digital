import { Plus } from "lucide-react";

const FAQS = [
  {
    q: "Do you offer free quotes?",
    a: "Yes — every quote is free and no-obligation. Share your project details and I'll come back to you within one business day with a clear, itemised price.",
  },
  {
    q: "What do you build?",
    a: "Custom websites, booking & management systems (like the salon system — a client booking site, admin dashboard and management app), and business automations that cut manual admin. Everything is built from scratch and tailored to your business.",
  },
  {
    q: "Are you a team or solo?",
    a: "Solo. Cavele Digital is run by me, Joseph Cavele. You work directly with the person building your project — no account managers and no outsourcing.",
  },
  {
    q: "Do you do digital marketing?",
    a: "I've completed courses in Google Ads, Facebook Ads and email marketing and I'm building these out as a service. I won't claim a track record I don't have yet — if you're interested, ask about founding-client rates.",
  },
  {
    q: "Where are you based?",
    a: "Kroondal Ikemeleng, Rustenburg, North West, South Africa. I work with clients wherever they are — most of the process happens online.",
  },
  {
    q: "How long does a project take?",
    a: "It depends on scope. A focused website is usually a couple of weeks; booking systems and automations take longer. I'll give you a realistic timeline together with your quote.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="bg-white py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-semibold font-poppins px-4 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-poppins text-gray-900 leading-tight">
            Questions, answered honestly
          </h2>
        </div>

        <div className="divide-y divide-gray-100 border-y border-gray-100">
          {FAQS.map((f, i) => (
            <details key={f.q} open={i === 0} className="group py-2">
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none py-4 font-bold font-poppins text-gray-900 text-[17px]">
                {f.q}
                <span className="w-6 h-6 shrink-0 text-blue-600 transition-transform group-open:rotate-45">
                  <Plus size={22} strokeWidth={2.2} />
                </span>
              </summary>
              <p className="text-gray-500 text-sm leading-relaxed pb-5 max-w-2xl">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
