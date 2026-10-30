"use client";

import { useState } from "react";
import { Arrow } from "../icon-widgets/icons";

const TOPICS = ["Say hello", "Prayer request", "Plan a visit", "Something else"];

const fieldClass =
  "mt-2 block w-full rounded-2xl border border-stone-300 bg-white px-5 py-4 text-lg text-[#1c1411] placeholder:text-stone-400 focus:border-red-700 focus:outline-none focus:ring-4 focus:ring-red-200";

const labelClass = "block text-base font-semibold text-[#1c1411]";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [topic, setTopic] = useState(TOPICS[0]);
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = new FormData(e.currentTarget);
    const body = {
      topic,
      name: form.get("name"),
      email: form.get("email"),
      phone: form.get("phone"),
      message: form.get("message"),
    };

    try {
      // TODO: create this route (or swap in your email / form service)
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        className="rounded-3xl border border-stone-200 bg-white p-8 text-center shadow-sm md:p-10"
      >
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-700 text-white">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12.5 10 17.5 19 7.5" />
          </svg>
        </span>
        <h3 className="mt-5 font-serif text-3xl font-semibold text-[#1c1411]">
          Thank you!
        </h3>
        <p className="mx-auto mt-3 max-w-sm text-lg leading-relaxed text-stone-700">
          We have received your message and will get back to you soon.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 rounded-full border-2 border-stone-300 px-6 py-3 text-base font-semibold text-[#1c1411] transition hover:border-[#1c1411] focus:outline-none focus-visible:ring-4 focus-visible:ring-red-300"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm md:p-10"
    >
      {/* Topic */}
      <fieldset>
        <legend className={labelClass}>What is your message about?</legend>
        <div role="radiogroup" className="mt-3 flex flex-wrap gap-3">
          {TOPICS.map((t) => {
            const selected = t === topic;
            return (
              <button
                key={t}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => setTopic(t)}
                className={`rounded-full border-2 px-5 py-2.5 text-base font-semibold transition focus:outline-none focus-visible:ring-4 focus-visible:ring-red-300 ${
                  selected
                    ? "border-red-700 bg-red-700 text-white"
                    : "border-stone-300 bg-white text-[#1c1411] hover:border-[#1c1411]"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Your name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Full name"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className={fieldClass}
          />
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor="phone" className={labelClass}>
          Phone number <span className="font-normal text-stone-500">(optional)</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="Your phone number"
          className={fieldClass}
        />
      </div>

      <div className="mt-6">
        <label htmlFor="message" className={labelClass}>
          Your message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="Write your message here"
          className={`${fieldClass} resize-y`}
        />
      </div>

      {status === "error" && (
        <p
          role="alert"
          className="mt-6 rounded-2xl border border-red-700/30 bg-red-50 px-5 py-4 text-base text-red-800"
        >
          Sorry, your message could not be sent. Please try again, or call us using
          the number on this page.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-full bg-red-700 px-8 py-4 text-lg font-semibold text-white transition hover:bg-red-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-red-300 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? "Sending…" : "Send message"}
        {status !== "sending" && <Arrow />}
      </button>
    </form>
  );
}