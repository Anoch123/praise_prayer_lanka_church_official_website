
"use client";

import {
  createContext,
  useContext,
  type ReactNode,
} from "react";

import type { AuthenticatedAdmin } from "@/lib/types/helper.type";

interface AdminContextValue {
  admin: AuthenticatedAdmin;
}

const AdminContext = createContext<AdminContextValue | undefined>(
  undefined
);

interface AdminProviderProps {
  admin: AuthenticatedAdmin;
  children: ReactNode;
}

export default function AdminProvider({
  admin,
  children,
}: AdminProviderProps) {
  return (
    <AdminContext.Provider value={{ admin }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdminContext() {
  const context = useContext(AdminContext);

  if (!context) {
    throw new Error(
      "useAdminContext must be used inside AdminProvider."
    );
  }

  return context;
}
