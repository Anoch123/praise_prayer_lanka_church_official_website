import { useSignOut } from "@/hooks/useSignOut";
import { LogOut } from "lucide-react";

export default function SignOutButton() {
  const { signOut, isSigningOut, error } = useSignOut("/admin/login");

  return (
    <div className="border-t border-white/10 p-4">
      {error && (
        <p role="alert" className="mb-2 px-4 text-xs text-rose-300">
          {error}
        </p>
      )}
      <button
        type="button"
        onClick={signOut}
        disabled={isSigningOut}
        className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-60"
      >
        <LogOut size={18} />
        {isSigningOut ? "Signing out..." : "Sign out"}
      </button>
    </div>
  );
}
