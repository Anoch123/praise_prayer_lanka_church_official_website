import { Menu } from "lucide-react";

import AdminProfile from "./AdminProfile";

interface TopbarProps {
  title: string;
  subtitle: string;
  adminName: string;
  isMenuOpen: boolean;
  onOpenMenu: () => void;
}

export default function Topbar({
  title,
  subtitle,
  adminName,
  isMenuOpen,
  onOpenMenu,
}: TopbarProps) {
  return (
    <header className="sticky top-0 z-20 flex h-20 items-center gap-4 border-b border-slate-200 bg-white/90 px-4 backdrop-blur md:px-8">
      <button
        type="button"
        onClick={onOpenMenu}
        aria-label="Open menu"
        aria-expanded={isMenuOpen}
        aria-controls="admin-sidebar"
        className="rounded-lg p-2 text-[#0f1a2b] hover:bg-slate-100 lg:hidden"
      >
        <Menu size={22} />
      </button>

      <div>
        <p className="text-lg font-semibold text-[#0f1a2b]">{title}</p>
        <p className="text-xs text-slate-500">{subtitle}</p>
      </div>

      <AdminProfile name={adminName} />
    </header>
  );
}
