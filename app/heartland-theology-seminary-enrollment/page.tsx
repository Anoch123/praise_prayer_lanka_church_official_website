import Image from "next/image";
import { Lato } from "next/font/google";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
});

const PDF_HREF =
  "/forms/Heartland_Theological_Seminary_Sri_Lanka_Enrollment_Application.pdf";

export const metadata = {
  title: "Student Enrollment Application | Heartland Theological Seminary",
};

/* ---------- small building blocks ---------- */

function Field({
  label,
  name,
  required,
  className = "",
  type = "text",
}: {
  label: string;
  name: string;
  required?: boolean;
  className?: string;
  type?: string;
}) {
  return (
    <label className={`flex flex-col ${className}`}>
      <span className="mb-[7px] text-[12.5px] font-bold leading-tight text-[#4b5565]">
        {label}
        {required && " *"}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        className="h-[46px] w-full rounded-lg border border-[#d9dfe9] bg-white px-3.5 text-[15px] text-[#1b2a41] outline-none transition focus:border-[#e8b923] focus:ring-2 focus:ring-[#e8b923]/30"
      />
    </label>
  );
}

function TextArea({
  label,
  name,
  required,
}: {
  label: string;
  name: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col">
      <span className="mb-[7px] text-[12.5px] font-bold leading-tight text-[#4b5565]">
        {label}
        {required && " *"}
      </span>
      <textarea
        name={name}
        required={required}
        className="h-[100px] w-full resize-y rounded-lg border border-[#d9dfe9] bg-white px-3.5 py-3 text-[15px] text-[#1b2a41] outline-none transition focus:border-[#e8b923] focus:ring-2 focus:ring-[#e8b923]/30"
      />
    </label>
  );
}

function Check({
  label,
  name,
  value,
  className = "",
  required,
}: {
  label: string;
  name: string;
  value?: string;
  className?: string;
  required?: boolean;
}) {
  return (
    <label className={`group flex cursor-pointer items-center gap-3 ${className}`}>
      <input
        type="checkbox"
        name={name}
        value={value}
        required={required}
        className="peer sr-only"
      />
      <span className="flex h-[17px] w-[17px] shrink-0 items-center justify-center rounded-[3px] border border-[#c9a46a] bg-white transition peer-checked:border-[#e8b923] peer-checked:bg-[#e8b923] peer-focus-visible:ring-2 peer-focus-visible:ring-[#e8b923]/40 [&>svg]:opacity-0 peer-checked:[&>svg]:opacity-100">
        <svg viewBox="0 0 12 12" className="h-3 w-3 text-[#1b2a41]" fill="none">
          <path
            d="M2.5 6.5l2.2 2.2L9.5 3.8"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="text-[15px] text-[#2c3a50]">{label}</span>
    </label>
  );
}

function SectionBar({ num, title }: { num: string; title: string }) {
  return (
    <div className="flex items-center gap-4 rounded-lg bg-[#f8fafc] px-1 py-[7px]">
      <span className="flex h-[26px] w-10 items-center justify-center rounded-md bg-[#e8b923] text-[12px] font-black text-[#1b2a41]">
        {num}
      </span>
      <h2 className="text-[15.5px] font-black uppercase tracking-[0.01em] text-[#1b2a41]">
        {title}
      </h2>
    </div>
  );
}

function PageFooter({ page }: { page: number }) {
  return (
    <div className="mt-10 flex items-center justify-between border-t border-[#e5e9f0] pt-3 text-[12px] text-[#6b7686]">
      <span>
        Sri Lanka local intake form &nbsp;|&nbsp; Admission subject to seminary
        review.
      </span>
      <span className="font-bold text-[#4b5565]">Page {page} of 2</span>
    </div>
  );
}

/* ---------- page ---------- */

export default function EnrollmentPage() {
  return (
    <main
      className={`${lato.className} min-h-screen bg-[#eef1f6] px-4 py-10 text-[#1b2a41]`}
    >
      {/* Download bar */}
      <div className="mx-auto mb-6 flex max-w-[860px] flex-wrap items-center justify-between gap-3">
        <p className="text-[14px] text-[#4b5565]">
          Prefer to fill it in by hand? Download the printable copy.
        </p>
        <a
          href={PDF_HREF}
          download
          className="inline-flex items-center gap-2 rounded-lg bg-[#1b2a41] px-5 py-2.5 text-[14px] font-bold text-white transition hover:bg-[#e8b923] hover:text-[#1b2a41]"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
            <path
              d="M12 3v12m0 0l-4.5-4.5M12 15l4.5-4.5M4 20h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Download form (PDF)
        </a>
      </div>

      <form className="mx-auto flex max-w-[860px] flex-col gap-8">
        {/* ================= PAGE 1 ================= */}
        <section className="rounded-sm bg-white px-[44px] pb-8 pt-10 shadow-[0_8px_30px_rgba(27,42,65,0.10)]">
          <header className="flex items-center gap-6 border-b-[5px] border-[#e8b923] pb-5">
            <Image
              src="/forms/heartland-logo.png"
              alt="Heartland Theological Seminary seal"
              width={84}
              height={84}
              priority
              className="h-[84px] w-[84px] shrink-0"
            />
            <div>
              <h1 className="text-[32px] font-black uppercase leading-none tracking-[0.005em] text-[#1b2a41]">
                Heartland
              </h1>
              <p className="mt-1.5 text-[24px] font-bold uppercase leading-none text-[#1b2a41]">
                Theological Seminary
              </p>
              <p className="mt-4 text-[13px] font-black uppercase tracking-[0.02em] text-[#9a6c00]">
                Sri Lanka Extension Programme
              </p>
              <p className="mt-2 text-[13.5px] text-[#4b5565]">
                76, Model Town Road, Moratuwa, Sri Lanka &nbsp;|&nbsp; Tel: +94
                11 261 1278
              </p>
            </div>
          </header>

          <div className="mt-7">
            <h2 className="text-[30px] font-black uppercase leading-tight text-[#1b2a41]">
              Student Enrollment Application
            </h2>
            <div className="mt-1 flex flex-wrap items-baseline justify-between gap-2 text-[13.5px] text-[#4b5565]">
              <span>Complete in BLOCK LETTERS or type directly into the form.</span>
              <span className="font-bold">Director: Pastor Anthony Simon</span>
            </div>
          </div>

          {/* 01 */}
          <div className="mt-6">
            <SectionBar num="01" title="Personal & Contact Information" />
            <div className="mt-4 flex flex-col gap-4">
              <Field label="Full name (as on official documents)" name="fullName" required />
              <div className="grid gap-4 sm:grid-cols-3">
                <Field label="Date of birth (DD / MM / YYYY)" name="dob" required />
                <Field label="NIC / Passport no. (if applicable)" name="nicPassport" />
                <Field label="Nationality" name="nationality" />
              </div>
              <Field label="Residential / mailing address" name="address" required />
              <div className="grid gap-4 sm:grid-cols-[1.05fr_0.55fr_0.8fr]">
                <Field label="District / City" name="district" required />
                <Field label="Postal code" name="postalCode" />
                <Field label="Mobile / WhatsApp number" name="mobile" required type="tel" />
              </div>
              <div className="grid gap-4 sm:grid-cols-[1.9fr_1fr]">
                <Field label="Email address" name="email" required type="email" />
                <Field
                  label="Preferred language (English / Sinhala / Tamil)"
                  name="language"
                />
              </div>
            </div>
          </div>

          {/* 02 */}
          <div className="mt-6">
            <SectionBar num="02" title="Educational Background" />
            <div className="mt-4 flex flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-[0.8fr_1.2fr]">
                <Field label="Highest completed qualification" name="qualification" required />
                <Field label="School / College / Seminary" name="institution" required />
              </div>
              <div className="grid gap-4 sm:grid-cols-[0.55fr_1.45fr]">
                <Field label="Year completed" name="yearCompleted" />
                <Field label="Field of study / specialization" name="fieldOfStudy" />
              </div>
              <Field
                label="Other theological study or training (if any)"
                name="otherTraining"
              />
            </div>
          </div>

          {/* 03 */}
          <div className="mt-6">
            <SectionBar num="03" title="Programme Interest" />
            <p className="mt-4 px-1 text-[13.5px] text-[#4b5565]">
              Please indicate the programme you wish to discuss (subject to
              eligibility and availability).
            </p>
            <div className="mt-4 grid gap-x-6 gap-y-4 px-1 sm:grid-cols-2">
              <Check name="programme" value="certificate" label="Certificate in Ministerial Studies" />
              <Check name="programme" value="ma" label="M.A. in Applied Theology" />
              <Check name="programme" value="mdiv" label="Master of Divinity (M.Div.)" />
              <Check name="programme" value="dmin" label="Doctor of Ministry (D.Min.)" />
              <Check name="programme" value="unsure" label="Unsure / Request academic advice" />
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="Preferred starting period (month / year)" name="startPeriod" />
              <Field label="How did you hear about Heartland?" name="heardFrom" />
            </div>
          </div>

          {/* Office use */}
          <div className="mt-7 flex flex-wrap items-end gap-x-5 gap-y-3">
            <span className="pb-3 text-[12.5px] font-bold text-[#4b5565]">
              For office use:
            </span>
            <label className="flex w-[173px] flex-col">
              <span className="mb-[7px] text-[12.5px] font-bold text-[#4b5565]">
                Date received
              </span>
              <input
                name="officeDate"
                className="h-[46px] rounded-lg border border-[#d9dfe9] bg-white px-3.5 text-[15px] outline-none focus:border-[#e8b923]"
              />
            </label>
            <label className="flex w-[301px] max-w-full flex-col">
              <span className="mb-[7px] text-[12.5px] font-bold text-[#4b5565]">
                Application / reference number
              </span>
              <input
                name="officeRef"
                className="h-[46px] rounded-lg border border-[#d9dfe9] bg-white px-3.5 text-[15px] outline-none focus:border-[#e8b923]"
              />
            </label>
          </div>

          <PageFooter page={1} />
        </section>

        {/* ================= PAGE 2 ================= */}
        <section className="rounded-sm bg-white px-[44px] pb-8 pt-10 shadow-[0_8px_30px_rgba(27,42,65,0.10)]">
          <header className="flex items-center gap-5 border-b-[5px] border-[#e8b923] pb-4">
            <Image
              src="/forms/heartland-logo.png"
              alt="Heartland Theological Seminary seal"
              width={84}
              height={84}
              className="h-[84px] w-[84px] shrink-0"
            />
            <div>
              <p className="text-[20px] font-black uppercase leading-tight text-[#1b2a41]">
                Heartland Theological Seminary
              </p>
              <p className="mt-1 text-[13.5px] text-[#4b5565]">
                Sri Lanka Extension Programme &nbsp;|&nbsp; 76, Model Town Road,
                Moratuwa
              </p>
              <p className="text-[13.5px] text-[#4b5565]">Tel: +94 11 261 1278</p>
            </div>
          </header>

          <h2 className="mt-7 text-[30px] font-black uppercase leading-tight text-[#1b2a41]">
            Church, Ministry &amp; References
          </h2>

          {/* 04 */}
          <div className="mt-6">
            <SectionBar num="04" title="Church Affiliation & Ministry" />
            <div className="mt-4 flex flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-[1.75fr_1fr]">
                <Field label="Current church / congregation" name="church" required />
                <Field label="Denomination / affiliation" name="denomination" />
              </div>
              <Field label="Church address (town / district)" name="churchAddress" required />
              <div className="grid gap-4 sm:grid-cols-[1.2fr_1fr]">
                <Field label="Church pastor / senior leader" name="pastor" />
                <Field label="Your role / ministry involvement" name="role" />
              </div>
              <div className="grid gap-4 sm:grid-cols-[0.7fr_1.3fr]">
                <Field label="Years in church / ministry" name="yearsInMinistry" />
                <Field
                  label="Current ministry setting (church / parachurch / other)"
                  name="ministrySetting"
                />
              </div>
            </div>
          </div>

          {/* 05 */}
          <div className="mt-6">
            <SectionBar num="05" title="Spiritual Background & Purpose" />
            <div className="mt-5 flex flex-col gap-5">
              <TextArea
                label="Briefly describe your conversion or Christian spiritual formation"
                name="spiritualFormation"
                required
              />
              <TextArea
                label="Why do you want to pursue theological study? What ministry do you hope to develop?"
                name="purpose"
              />
            </div>
          </div>

          {/* 06 */}
          <div className="mt-6">
            <SectionBar num="06" title="References & Endorsement" />
            <p className="mt-4 px-1 text-[13.5px] text-[#4b5565]">
              Please provide contacts for a church endorsement and a pastoral
              recommendation.
            </p>
            <div className="mt-3 grid gap-4 sm:grid-cols-[1fr_1fr_0.5fr]">
              <Field label="Church endorsement - name / role" name="endorsementName" required />
              <Field label="Email" name="endorsementEmail" required type="email" />
              <Field label="Phone" name="endorsementPhone" required type="tel" />
              <Field label="Pastoral recommendation - name" name="recommendName" required />
              <Field label="Email" name="recommendEmail" required type="email" />
              <Field label="Phone" name="recommendPhone" required type="tel" />
            </div>
            <p className="mt-4 px-1 text-[13.5px] text-[#4b5565]">
              Supporting documents: academic transcripts, church endorsement and
              pastoral recommendation.
            </p>
          </div>

          {/* Declaration */}
          <div className="mt-6 rounded-lg bg-[#f8fafc] px-4 py-3">
            <h3 className="text-[14px] font-black uppercase text-[#1b2a41]">
              Applicant Declaration
            </h3>
            <Check
              name="declaration"
              required
              className="mt-2"
              label="I certify the information is accurate and authorize admission review and referee contact."
            />
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-[2.1fr_1fr]">
            <Field label="Applicant signature / typed name" name="signature" required />
            <Field label="Date (DD / MM / YYYY)" name="signDate" required />
          </div>

          <PageFooter page={2} />
        </section>

        {/* Submit */}
        <div className="flex flex-wrap items-center justify-end gap-3">
          <a
            href={PDF_HREF}
            download
            className="rounded-lg border border-[#1b2a41] px-6 py-3 text-[14px] font-bold text-[#1b2a41] transition hover:bg-[#1b2a41] hover:text-white"
          >
            Download PDF
          </a>
          <button
            type="submit"
            className="rounded-lg bg-[#e8b923] px-8 py-3 text-[14px] font-black uppercase tracking-wide text-[#1b2a41] transition hover:brightness-95"
          >
            Submit application
          </button>
        </div>
      </form>
    </main>
  );
}