"use client";

import { useState } from "react";
import { Arrow, Cross } from "./icons";

export type VisitService = { id: string; name: string; day: string; time: string };

const WHEN = ["This Sunday", "Next Sunday", "Not sure yet"];
const MAX_GUESTS = 10;

type Status = "idle" | "sending" | "success" | "error";

const inputClass =
  "w-full rounded-2xl border border-stone-300 bg-white px-5 py-4 text-[16px] text-[#1c1411] outline-none transition-colors placeholder:text-stone-400 focus:border-red-600 focus:ring-4 focus:ring-red-600/10";
const labelClass =
  "mb-2 block text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500";

export default function PlanVisitForm({ services }: { services: VisitService[] }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [serviceId, setServiceId] = useState(services[0]?.id ?? "");
  const [when, setWhen] = useState(WHEN[0]);
  const [guests, setGuests] = useState(1);
  const [kids, setKids] = useState(false);
  const [kidsAges, setKidsAges] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  function fail(msg: string) {
    setError(msg);
    setStatus("error");
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;

    if (name.trim().length < 2) return fail("Please enter your name.");
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) return fail("Please enter a valid email address.");

    setError("");
    setStatus("sending");
    try {
      const res = await fetch("/api/visits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          service: services.find((s) => s.id === serviceId)?.name ?? "",
          serviceTime: services.find((s) => s.id === serviceId)?.time ?? "",
          when,
          guests,
          kids,
          kidsAges: kids ? kidsAges.trim() : "",
          message: message.trim(),
          website,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      fail("Something went wrong. Please try again in a moment.");
    }
  }

  function reset() {
    setName("");
    setEmail("");
    setPhone("");
    setServiceId(services[0]?.id ?? "");
    setWhen(WHEN[0]);
    setGuests(1);
    setKids(false);
    setKidsAges("");
    setMessage("");
    setStatus("idle");
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center py-12 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-white">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h3 className="mt-6 font-serif text-3xl font-semibold text-[#1c1411]">We&apos;ll see you soon!</h3>
        <p className="mt-3 max-w-sm text-stone-600">
          Thank you, {name.split(" ")[0] || "friend"}. We&apos;ve saved you a seat, and a friendly
          face will be at the door to welcome you.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-8 rounded-full border border-[#1c1411]/20 px-7 py-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#1c1411] transition-colors hover:border-[#1c1411] hover:bg-[#1c1411] hover:text-white"
        >
          Plan another visit
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-7">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="v-name" className={labelClass}>Your name</label>
          <input id="v-name" type="text" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" placeholder="Jane Doe" className={inputClass} />
        </div>
        <div>
          <label htmlFor="v-email" className={labelClass}>Email address</label>
          <input id="v-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" placeholder="you@example.com" className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="v-phone" className={labelClass}>
          Phone <span className="font-normal normal-case tracking-normal text-stone-400">(optional)</span>
        </label>
        <input id="v-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" placeholder="Optional" className={inputClass} />
      </div>

      {/* Service – custom radio cards */}
      <div>
        <p className={labelClass}>Which service?</p>
        <div role="radiogroup" aria-label="Service" className="grid gap-3 sm:grid-cols-2">
          {services.map((s) => {
            const on = s.id === serviceId;
            return (
              <button
                key={s.id}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => setServiceId(s.id)}
                className={`flex items-center justify-between gap-3 rounded-2xl border px-5 py-4 text-left transition-all ${
                  on
                    ? "border-red-600 bg-red-50/70 shadow-[0_8px_24px_rgba(220,38,38,0.12)]"
                    : "border-stone-300 bg-white hover:border-stone-500"
                }`}
              >
                <span>
                  <span className="block font-serif text-lg font-semibold text-[#1c1411]">{s.name}</span>
                  <span className="block text-sm text-stone-500">{s.day} · {s.time}</span>
                </span>
                <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors ${on ? "border-red-600 bg-red-600 text-white" : "border-stone-300 bg-white"}`}>
                  {on && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* When + guests */}
      <div className="grid gap-7 md:grid-cols-2">
        <div>
          <p className={labelClass}>When are you thinking?</p>
          <div role="radiogroup" aria-label="When" className="flex flex-wrap gap-2.5">
            {WHEN.map((w) => {
              const on = w === when;
              return (
                <button
                  key={w}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => setWhen(w)}
                  className={`rounded-full border px-5 py-2.5 text-[13px] font-semibold transition-colors ${
                    on ? "border-[#1c1411] bg-[#1c1411] text-white" : "border-stone-300 bg-white text-[#1c1411] hover:border-stone-500"
                  }`}
                >
                  {w}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <p className={labelClass}>How many people?</p>
          <div className="inline-flex items-center gap-1 rounded-full border border-stone-300 bg-white p-1.5">
            <button
              type="button"
              onClick={() => setGuests((g) => Math.max(1, g - 1))}
              disabled={guests <= 1}
              aria-label="Fewer people"
              className="flex h-11 w-11 items-center justify-center rounded-full text-[#1c1411] transition-colors hover:bg-stone-100 disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2 7h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
            </button>
            <span className="min-w-[3.5rem] text-center font-serif text-2xl font-semibold text-[#1c1411]" aria-live="polite">
              {guests}
            </span>
            <button
              type="button"
              onClick={() => setGuests((g) => Math.min(MAX_GUESTS, g + 1))}
              disabled={guests >= MAX_GUESTS}
              aria-label="More people"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1c1411] text-white transition-colors hover:bg-red-600 disabled:opacity-30 disabled:hover:bg-[#1c1411]"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Kids */}
      <div>
        <button
          type="button"
          role="checkbox"
          aria-checked={kids}
          onClick={() => setKids((v) => !v)}
          className="flex items-start gap-3 text-left"
        >
          <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border transition-colors ${kids ? "border-red-600 bg-red-600 text-white" : "border-stone-300 bg-white"}`}>
            {kids && (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
            )}
          </span>
          <span className="text-[15px] leading-relaxed text-stone-700">I&apos;ll be bringing children</span>
        </button>

        {kids && (
          <div className="mt-4">
            <label htmlFor="v-ages" className={labelClass}>Children&apos;s ages</label>
            <input id="v-ages" type="text" value={kidsAges} onChange={(e) => setKidsAges(e.target.value)} placeholder="e.g. 3 and 7" className={inputClass} />
          </div>
        )}
      </div>

      <div>
        <label htmlFor="v-msg" className={labelClass}>
          Anything we should know? <span className="font-normal normal-case tracking-normal text-stone-400">(optional)</span>
        </label>
        <textarea
          id="v-msg"
          value={message}
          onChange={(e) => setMessage(e.target.value.slice(0, 500))}
          rows={4}
          placeholder="Questions, accessibility needs, or just say hello…"
          className={`${inputClass} resize-none leading-relaxed`}
        />
      </div>

      {/* Honeypot */}
      <div className="absolute left-[-9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>Website<input type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} /></label>
      </div>

      {status === "error" && error && (
        <p role="alert" className="rounded-2xl bg-red-50 px-5 py-3 text-sm font-medium text-red-700">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#ff0000] px-9 py-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-white shadow-[0_12px_32px_rgba(255,0,0,0.3)] transition-all hover:-translate-y-px hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 md:w-auto"
      >
        {status === "sending" ? "Sending…" : "Save My Seat"}
        {status !== "sending" && (
          <span className="transition-transform duration-300 group-hover:translate-x-1"><Arrow /></span>
        )}
      </button>

      <p className="flex items-center gap-2 text-xs text-stone-500">
        <Cross className="h-3 w-auto text-red-600" />
        We&apos;ll only use your details to prepare for your visit.
      </p>
    </form>
  );
}