import { useState } from "react";
import { useRouter } from "next/navigation";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function useSignOut(redirectTo: string) {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [error, setError] = useState("");

  async function signOut() {
    setIsSigningOut(true);
    setError("");

    const { error: signOutError } =
      await createSupabaseBrowserClient().auth.signOut();

    if (signOutError) {
      setError("Could not sign out. Please try again.");
      setIsSigningOut(false);
      return;
    }

    router.replace(redirectTo);
    router.refresh();
  }

  return { signOut, isSigningOut, error };
}
