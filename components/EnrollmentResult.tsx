
"use client";

interface EnrollmentResultProps {
  referenceNumber: string;
  onNewApplication: () => void;
}

export default function EnrollmentResult({
  referenceNumber,
  onNewApplication,
}: EnrollmentResultProps) {
  return (
    <section
      aria-live="polite"
      className="mx-auto mb-6 max-w-[860px] rounded-xl border border-green-200 bg-green-50 p-6"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
            <path
              d="M5 12.5l4.5 4.5L19 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="min-w-0">
          <h2 className="text-lg font-black text-green-900">
            Application submitted successfully
          </h2>

          <p className="mt-1 text-sm text-green-800">
            Thank you for applying to Heartland Theological Seminary.
            Your application has been received for review.
          </p>

          <div className="mt-4 rounded-lg border border-green-200 bg-white p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-[#4b5565]">
              Your application reference number
            </p>
            <p className="mt-1 break-all text-xl font-black tracking-wide text-[#1b2a41]">
              {referenceNumber}
            </p>
          </div>

          <p className="mt-3 text-sm text-green-800">
            Please keep this reference number for future communication
            with the seminary.
          </p>

          <button
            type="button"
            onClick={onNewApplication}
            className="mt-4 rounded-lg bg-[#1b2a41] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#e8b923] hover:text-[#1b2a41]"
          >
            Start a new application
          </button>
        </div>
      </div>
    </section>
  );
}
