export default function AdminProfile({ name }: { name: string }) {
  return (
    <div className="ml-auto flex items-center gap-3">
      <div className="hidden text-right sm:block">
        <p className="text-sm font-medium text-[#0f1a2b]">{name}</p>
        <p className="text-xs text-slate-500">Administrator</p>
      </div>
      <span
        aria-hidden="true"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2f62b5] text-sm font-semibold uppercase text-white"
      >
        {name.trim().charAt(0)}
      </span>
    </div>
  );
}
