import Link from "next/link";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <header className="relative flex min-h-[80dvh] w-full flex-col justify-end overflow-hidden bg-[#0B1020] md:min-h-dvh md:items-center md:justify-center">
      <Navbar />

      {/* Background image: put your photo at /public/hero.jpg */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1020] via-[#0B1020]/60 to-[#0B1020]/30" />

      <div className="relative z-10 mx-auto w-full max-w-4xl px-6 pb-16 text-center md:pb-0">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-red-400">
          Welcome Home
        </p>
        <h1 className="font-serif text-5xl font-semibold leading-tight text-white md:text-7xl">
          Come as you are. Leave transformed.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-200 md:text-xl">
          Join us each Sunday as we worship, pray and grow together in Christ.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/sermons"
            className="rounded-full bg-[#ff0000] px-8 py-3.5 font-semibold text-white transition-colors hover:bg-red-700"
          >
            Watch Online
          </Link>
          <Link
            href="/about"
            className="rounded-full border border-white/60 px-8 py-3.5 font-semibold text-white transition-colors hover:bg-white/10"
          >
            Plan a Visit
          </Link>
        </div>
      </div>
    </header>
  );
}