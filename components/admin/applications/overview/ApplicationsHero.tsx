export default function ApplicationsHero({ total }: { total: number }) {
  return (
    <div className="relative isolate flex flex-col gap-6 overflow-hidden rounded-3xl bg-[#0f1a2b] p-7 text-white sm:flex-row sm:items-center sm:justify-between md:p-10">
      <div
        aria-hidden="true"
        className="absolute -right-24 -top-32 -z-10 h-96 w-96 rounded-full bg-[#2f62b5]/45 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(rgba(255,255,255,0.09)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_left,black,transparent_70%)]"
      />

      <div>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Applications
        </h1>
        <p className="mt-2 text-sm text-slate-300">
          Review and manage submitted seminary applications.
        </p>
      </div>

      <dl className="sm:text-right">
        <dt className="text-sm text-slate-300">Total Applications</dt>
        <dd className="mt-1 text-5xl font-semibold tracking-tight">
          {total.toLocaleString()}
        </dd>
      </dl>
    </div>
  );
}