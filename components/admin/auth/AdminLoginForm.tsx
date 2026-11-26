"use client";

import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";

import { useAdminLogin } from "@/hooks/useLoginAdmin";

import { COMMON_IMAGES } from "@/lib/constants/helper_images";
import { COMMON_TEXTS } from "@/lib/constants/helper_data";

export default function AdminLoginForm() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    isLoading,
    error,
    handleSubmit,
  } = useAdminLogin();

  return (
    <div className="w-full max-w-sm">
      <div className="mb-10 flex flex-col items-center text-center">
        <div className="relative h-24 w-48">
          <Image
            src={COMMON_IMAGES.App_logo}
            alt={`${COMMON_TEXTS.App_name} logo`}
            fill
            sizes="192px"
            priority
            className="object-contain"
          />
        </div>

        <h1 className="mt-4 text-xl font-semibold tracking-tight text-[#0f1a2b]">
          {COMMON_TEXTS.App_name}
        </h1>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-[#0f1a2b]"
          >
            Email address
          </label>

          <input
            id="email"
            type="email"
            autoComplete="username"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="admin@example.com"
            className="h-12 w-full rounded-md bg-slate-100 px-4 text-[15px] text-[#0f1a2b] outline-none transition placeholder:text-slate-500 focus:bg-white focus:ring-2 focus:ring-[#2f62b5]"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-[#0f1a2b]"
          >
            Password
          </label>

          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              className="h-12 w-full rounded-md bg-slate-100 px-4 pr-12 text-[15px] text-[#0f1a2b] outline-none transition placeholder:text-slate-500 focus:bg-white focus:ring-2 focus:ring-[#2f62b5] [&::-ms-reveal]:hidden"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={
                showPassword ? "Hide password" : "Show password"
              }
              className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-md p-2 text-slate-500 transition-colors hover:text-[#2f62b5] focus-visible:outline-2 focus-visible:outline-[#2f62b5]"
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
        </div>

        {error && (
          <div role="alert" className="text-sm text-red-700">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="h-12 w-full rounded-md bg-[#2f62b5] text-sm font-semibold text-white transition-colors hover:bg-[#274f94] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f62b5] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}