"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { luxuryEase } from "@/lib/animations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// 1) Create a free form at formspree.io (or use your own API route) and paste the URL here.
const FORM_ENDPOINT = "https://formspree.io/f/your-form-id";
const EMAIL = "inquire@atlantaweddingcompany.com";

const services = ["Photography", "Film", "Photo + Film"];
const sizes = ["Under 50", "50 – 150", "150 – 300", "300+"];
const steps = [
  { t: "We reply", d: "Within 24 hours with availability for your date." },
  { t: "We talk", d: "A relaxed video call to hear your story and vision." },
  { t: "We create", d: "A tailored proposal, then your date is held for you." },
];

type Form = {
  name: string; email: string; phone: string; date: string;
  location: string; service: string; size: string; message: string; company: string;
};
const empty: Form = {
  name: "", email: "", phone: "", date: "", location: "",
  service: "Photo + Film", size: "", message: "", company: "", // company = honeypot
};

const inputCls =
  "peer w-full border-0 border-b border-black/20 bg-transparent pb-3 pt-6 font-sans text-base text-[#111] placeholder-transparent outline-none transition-colors duration-500 focus:border-[#111]";
const labelCls =
  "pointer-events-none absolute left-0 top-6 origin-left font-sans text-sm text-[#888] transition-all duration-300 " +
  "peer-focus:top-0 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-[0.2em] " +
  "peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.2em]";

function Field({
  id, label, value, onChange, type = "text", required, error, textarea,
}: {
  id: keyof Form; label: string; value: string; onChange: (v: string) => void;
  type?: string; required?: boolean; error?: string; textarea?: boolean;
}) {
  const common = {
    id, name: id, value, placeholder: label, required,
    onChange: (e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => onChange(e.target.value),
    "aria-invalid": !!error, className: inputCls,
  };
  return (
    <div className="relative">
      {textarea ? <textarea rows={4} {...common} className={`${inputCls} resize-none`} /> : <input type={type} {...common} />}
      <label htmlFor={id} className={labelCls}>{label}{required && " *"}</label>
      {error && <p className="mt-2 font-sans text-xs text-[#b4472f]">{error}</p>}
    </div>
  );
}

function Chips({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <fieldset>
      <legend className="mb-3 font-sans text-[10px] uppercase tracking-[0.2em] text-[#888]">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            type="button" key={o} onClick={() => onChange(o)} aria-pressed={value === o}
            className={`rounded-full border px-5 py-2.5 font-sans text-xs tracking-wide transition-all duration-500 ${
              value === o ? "border-[#111] bg-[#111] text-white" : "border-black/20 text-[#555] hover:border-[#111]"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export default function ContactPage() {
  const [f, setF] = useState<Form>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const set = (k: keyof Form) => (v: string) => {
    setF((p) => ({ ...p, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = () => {
    const e: typeof errors = {};
    if (!f.name.trim()) e.name = "Please tell us your names.";
    if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = "Please enter a valid email.";
    if (f.message.trim().length < 10) e.message = "Tell us a little about your day.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (f.company) return; // bot
    if (!validate()) return;
    setStatus("sending");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...f, _subject: `New inquiry from ${f.name}` }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-[#E8EBE4] text-[#111] overflow-x-hidden selection:bg-black/10 selection:text-[#111]">
      <Navbar />
      <main className="flex-1">
        {/* Header */}
      <header className="mx-auto max-w-7xl px-6 pb-16 pt-24 sm:px-10 md:pb-24 md:pt-32">
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: luxuryEase }}
          className="mb-6 font-sans text-xs uppercase tracking-[0.4em] text-[#C49A45]">
          Contact
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.1, ease: luxuryEase }}
          className="max-w-4xl font-serif text-5xl font-light leading-[1.05] tracking-tight sm:text-6xl md:text-8xl">
          Let&rsquo;s create something <span className="italic text-[#C49A45]">timeless</span>
        </motion.h1>
      </header>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 pb-28 sm:px-10 lg:grid-cols-12 lg:gap-24 md:pb-40">
        {/* Info column */}
        <motion.aside initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.9, ease: luxuryEase }} className="lg:col-span-5">
          <p className="font-serif text-2xl font-light leading-snug text-[#333] sm:text-3xl">
            We take on a limited number of weddings each year so every couple gets our full attention. Share a few details and we&rsquo;ll be in touch.
          </p>

          <dl className="mt-12 space-y-8 border-t border-black/10 pt-10">
            <div>
              <dt className="mb-2 font-sans text-[10px] uppercase tracking-[0.3em] text-[#888]">Email</dt>
              <dd><a href={`mailto:${EMAIL}`} className="group inline-flex items-center gap-2 break-all font-sans text-base hover:text-[#C49A45] transition-colors">
                {EMAIL}<ArrowUpRight className="h-4 w-4 flex-none opacity-50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a></dd>
            </div>
            <div>
              <dt className="mb-2 font-sans text-[10px] uppercase tracking-[0.3em] text-[#888]">Instagram</dt>
              <dd><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="font-sans text-base hover:text-[#C49A45] transition-colors">@atlantaweddingco</a></dd>
            </div>
            <div>
              <dt className="mb-2 font-sans text-[10px] uppercase tracking-[0.3em] text-[#888]">Based in</dt>
              <dd className="font-sans text-base">Atlanta, GA &mdash; traveling worldwide</dd>
            </div>
          </dl>

          <ol className="mt-12 space-y-6 border-t border-black/10 pt-10">
            {steps.map((s, i) => (
              <li key={s.t} className="flex gap-5">
                <span className="font-serif text-2xl italic text-[#C49A45]">0{i + 1}</span>
                <div>
                  <p className="font-sans text-sm uppercase tracking-[0.2em]">{s.t}</p>
                  <p className="mt-1 font-sans text-sm font-light text-[#666]">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </motion.aside>

        {/* Form column */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1, ease: luxuryEase }}
          className="rounded-3xl bg-white p-7 shadow-xl sm:p-12 lg:col-span-7">
          <AnimatePresence mode="wait">
            {status === "sent" ? (
              <motion.div key="ok" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: luxuryEase }}
                className="flex min-h-[480px] flex-col items-center justify-center text-center">
                <span className="mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-[#111] text-white"><Check className="h-7 w-7" /></span>
                <h2 className="font-serif text-4xl font-light sm:text-5xl">Thank you, {f.name.split(/[ &]/)[0]}.</h2>
                <p className="mt-4 max-w-sm font-sans font-light text-[#666]">Your message is on its way. Expect a reply within 24 hours.</p>
                <button onClick={() => { setF(empty); setStatus("idle"); }} className="mt-10 font-sans text-xs uppercase tracking-[0.25em] underline underline-offset-8 hover:text-[#C49A45]">
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={submit} noValidate exit={{ opacity: 0 }} className="space-y-9">
                {/* honeypot: hidden from people, visible to bots */}
                <input type="text" name="company" value={f.company} onChange={(e) => set("company")(e.target.value)} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

                <div className="grid gap-9 sm:grid-cols-2">
                  <Field id="name" label="Your names" value={f.name} onChange={set("name")} required error={errors.name} />
                  <Field id="email" label="Email" type="email" value={f.email} onChange={set("email")} required error={errors.email} />
                  <Field id="phone" label="Phone (optional)" type="tel" value={f.phone} onChange={set("phone")} />
                  <Field id="location" label="Wedding location" value={f.location} onChange={set("location")} />
                </div>

                <div className="relative">
                  <label htmlFor="date" className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#888]">Wedding date</label>
                  <input id="date" type="date" value={f.date} onChange={(e) => set("date")(e.target.value)}
                    className="mt-1 w-full border-0 border-b border-black/20 bg-transparent pb-3 pt-2 font-sans text-base outline-none transition-colors focus:border-[#111]" />
                </div>

                <Chips label="What are you looking for?" options={services} value={f.service} onChange={set("service")} />
                <Chips label="Guest count" options={sizes} value={f.size} onChange={set("size")} />
                <Field id="message" label="Tell us about your day" value={f.message} onChange={set("message")} required textarea error={errors.message} />

                <div className="flex flex-col gap-5 pt-2 sm:flex-row sm:items-center sm:justify-between">
                  <button type="submit" disabled={status === "sending"}
                    className="inline-flex items-center justify-center gap-3 rounded-full bg-[#111] px-10 py-4 font-sans text-xs font-medium uppercase tracking-[0.25em] text-white shadow-lg transition-all duration-500 hover:bg-[#333] disabled:opacity-60">
                    {status === "sending" ? "Sending…" : "Send inquiry"}
                    {status !== "sending" && <ArrowUpRight className="h-4 w-4" />}
                  </button>
                  {status === "error" && (
                    <p className="font-sans text-sm text-[#b4472f]" role="alert">
                      Something went wrong. Please email us at <a className="underline" href={`mailto:${EMAIL}`}>{EMAIL}</a>.
                    </p>
                  )}
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      </main>
      <Footer />
    </div>
  );
}

