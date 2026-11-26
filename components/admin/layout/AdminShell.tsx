"use client";

import type { ReactNode } from "react";

import Sidebar from "./Sidebar";
import { useMobileMenu } from "@/hooks/useMobileMenu";
import Topbar from "./Topbar";

interface AdminShellProps {
  title: string;
  subtitle: string;
  adminName: string;
  children: ReactNode;
}

export default function AdminShell({
  title,
  subtitle,
  adminName,
  children,
}: AdminShellProps) {
  const menu = useMobileMenu();

  return (
    <div className="min-h-dvh bg-slate-50" onKeyDown={menu.closeOnEscape}>
      {/* Mobile backdrop */}
      {menu.isOpen && (
        <div
          aria-hidden="true"
          onClick={menu.close}
          className="fixed inset-0 z-30 bg-[#0f1a2b]/50 backdrop-blur-sm lg:hidden"
        />
      )}

      <Sidebar isOpen={menu.isOpen} onClose={menu.close} />

      <div className="lg:pl-64">
        <Topbar
          title={title}
          subtitle={subtitle}
          adminName={adminName}
          isMenuOpen={menu.isOpen}
          onOpenMenu={menu.open}
        />

        <main className="space-y-6 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
