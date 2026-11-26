"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function useAdminLogin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    const normalizedEmail = email.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail) || !password) {
      setError("Enter a valid email address and your password.");
      return;
    }

    setIsLoading(true);

    try {
      const supabase = createSupabaseBrowserClient();

      const { data, error: loginError } =
        await supabase.auth.signInWithPassword({
          email: normalizedEmail,
          password,
        });

      if (loginError || !data.user) {
        setError("Invalid email address or password.");
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("admin_profiles")
        .select("id, full_name, role, is_active")
        .eq("id", data.user.id)
        .maybeSingle();

      if (profileError || !profile || !profile.is_active) {
        await supabase.auth.signOut();

        setError(
          "You are not authorized to access the Church Admin Portal."
        );

        return;
      }

      router.replace("/admin/dashboard");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    isLoading,
    error,
    handleSubmit,
  };
}