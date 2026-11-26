import { NAV_ITEMS } from "@/lib/constants/helper_data";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarNav({ onNavigate }: { onNavigate: () => void }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Admin" className="flex-1 space-y-1 overflow-y-auto p-4">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            onClick={onNavigate}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
              active
                ? "bg-[#2f62b5] text-white"
                : "text-slate-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Icon size={18} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
