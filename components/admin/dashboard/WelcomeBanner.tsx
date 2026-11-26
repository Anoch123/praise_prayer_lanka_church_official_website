import { FileText } from "lucide-react";

interface WelcomeBannerProps {
  adminName: string;
}

export default function WelcomeBanner({
  adminName,
}: WelcomeBannerProps) {
  return (
    <div className="relative isolate overflow-hidden rounded-3xl bg-[#0f1a2b] p-7 text-white md:p-10">
      <div
        aria-hidden="true"
        className="absolute -right-24 -top-32 -z-10 h-96 w-96 rounded-full bg-[#2f62b5]/45 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(rgba(255,255,255,0.09)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_left,black,transparent_70%)]"
      />

      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Welcome back, {adminName}
          </h1>
          <p className="mt-2 text-sm text-slate-300">
            Here is an overview of your seminary applications.
          </p>
        </div>
      </div>
    </div>
  );
}
