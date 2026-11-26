import SidebarBrand from "./SidebarBrand";
import SidebarNav from "./SidebarNav";
import SignOutButton from "./SignOutButton";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <aside
      id="admin-sidebar"
      className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-[#0f1a2b] text-white transition-all duration-300 lg:visible lg:translate-x-0 ${
        isOpen ? "visible translate-x-0" : "invisible -translate-x-full"
      }`}
    >
      <SidebarBrand onClose={onClose} />
      <SidebarNav onNavigate={onClose} />
      <SignOutButton />
    </aside>
  );
}
