

interface AcceptanceRateProps {
  accepted: number;
  rejected: number;
  open: number;
}

export default function AcceptanceRate({
  accepted,
  rejected,
  open,
}: AcceptanceRateProps) {
  const decided = accepted + rejected;
  const acceptanceRate =
    decided > 0 ? Math.round((accepted / decided) * 100) : null;

  return (
    <section className="rounded-2xl bg-white p-6 shadow-[0_2px_16px_rgba(15,26,43,0.06)] flex flex-col">
      <h2 className="text-lg font-semibold text-[#0f1a2b]">Acceptance Rate</h2>
      <p className="mt-1 text-sm text-slate-500">
        Accepted out of accepted and rejected
      </p>

      <p className="mt-8 text-6xl font-semibold tracking-tight text-[#0f1a2b]">
        {acceptanceRate === null ? "—" : `${acceptanceRate}%`}
      </p>

      <div
        role="meter"
        aria-label="Acceptance rate"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={acceptanceRate ?? 0}
        aria-valuetext={
          acceptanceRate === null ? "No decisions yet" : `${acceptanceRate}%`
        }
        className="mt-4 h-3 overflow-hidden rounded-full bg-[#0d9488]/15"
      >
        <div
          className="h-full rounded-full bg-[#0d9488]"
          style={{ width: `${acceptanceRate ?? 0}%` }}
        />
      </div>

      <dl className="mt-auto grid grid-cols-2 gap-3 pt-8">
        <div className="rounded-xl bg-slate-50 p-4">
          <dt className="text-xs text-slate-500">Decisions made</dt>
          <dd className="mt-1 text-2xl font-semibold text-[#0f1a2b]">
            {decided.toLocaleString()}
          </dd>
        </div>
        <div className="rounded-xl bg-slate-50 p-4">
          <dt className="text-xs text-slate-500">Still open</dt>
          <dd className="mt-1 text-2xl font-semibold text-[#0f1a2b]">
            1111
          </dd>
        </div>
      </dl>
    </section>
  );
}
