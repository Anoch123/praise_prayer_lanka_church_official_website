
import type {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

interface FieldProps {
  label: string;
  registration: UseFormRegisterReturn;
  error?: string;
  required?: boolean;
  className?: string;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  placeholder?: string;
  max?: string;
  maxLength?: number;
  autoComplete?: string;
}

export function Field({
  label,
  registration,
  error,
  required,
  className = "",
  type = "text",
  placeholder,
  max,
  maxLength,
  autoComplete,
}: FieldProps) {
  return (
    <label className={`flex flex-col ${className}`}>
      <span className="mb-[7px] text-[12.5px] font-bold leading-tight text-[#4b5565]">
        {label}
        {required && <span className="ml-1 text-red-600">*</span>}
      </span>

      <input
        {...registration}
        id={registration.name}
        type={type}
        placeholder={placeholder}
        max={max}
        maxLength={maxLength}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${registration.name}-error` : undefined}
        className={`h-[46px] w-full rounded-lg border bg-white px-3.5 text-[15px] text-[#1b2a41] outline-none transition focus:ring-2 ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-200"
            : "border-[#d9dfe9] focus:border-[#e8b923] focus:ring-[#e8b923]/30"
        }`}
      />

      {error && (
        <span
          id={`${registration.name}-error`}
          role="alert"
          className="mt-1.5 text-xs text-red-600"
        >
          {error}
        </span>
      )}
    </label>
  );
}

interface TextAreaProps {
  label: string;
  registration: UseFormRegisterReturn;
  error?: string;
  required?: boolean;
  placeholder?: string;
  rows?: number;
  maxLength?: number;
  className?: string;
}

export function TextArea({
  label,
  registration,
  error,
  required,
  placeholder,
  rows = 4,
  maxLength,
  className = "",
}: TextAreaProps) {
  return (
    <label className={`flex flex-col ${className}`}>
      <span className="mb-[7px] text-[12.5px] font-bold leading-tight text-[#4b5565]">
        {label}
        {required && <span className="ml-1 text-red-600">*</span>}
      </span>

      <textarea
        {...registration}
        id={registration.name}
        rows={rows}
        placeholder={placeholder}
        maxLength={maxLength}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${registration.name}-error` : undefined}
        className={`w-full resize-y rounded-lg border bg-white px-3.5 py-3 text-[15px] text-[#1b2a41] outline-none transition focus:ring-2 ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-200"
            : "border-[#d9dfe9] focus:border-[#e8b923] focus:ring-[#e8b923]/30"
        }`}
      />

      {error && (
        <span
          id={`${registration.name}-error`}
          role="alert"
          className="mt-1.5 text-xs text-red-600"
        >
          {error}
        </span>
      )}
    </label>
  );
}

interface SelectFieldProps {
  label: string;
  registration: UseFormRegisterReturn;
  options: { label: string; value: string }[];
  error?: string;
  required?: boolean;
}

export function SelectField({
  label,
  registration,
  options,
  error,
  required,
}: SelectFieldProps) {
  return (
    <label className="flex flex-col">
      <span className="mb-[7px] text-[12.5px] font-bold leading-tight text-[#4b5565]">
        {label}
        {required && <span className="ml-1 text-red-600">*</span>}
      </span>

      <select
        {...registration}
        id={registration.name}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${registration.name}-error` : undefined}
        className={`h-[46px] w-full rounded-lg border bg-white px-3.5 text-[15px] text-[#1b2a41] outline-none transition focus:ring-2 ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-200"
            : "border-[#d9dfe9] focus:border-[#e8b923] focus:ring-[#e8b923]/30"
        }`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <span
          id={`${registration.name}-error`}
          role="alert"
          className="mt-1.5 text-xs text-red-600"
        >
          {error}
        </span>
      )}
    </label>
  );
}

interface CheckProps {
  label: string;
  registration: UseFormRegisterReturn;
  value?: string;
  className?: string;
}

export function Check({
  label,
  registration,
  value,
  className = "",
}: CheckProps) {
  return (
    <label
      className={`group flex cursor-pointer items-start gap-3 ${className}`}
    >
      <input
        {...registration}
        type="checkbox"
        value={value}
        className="peer sr-only"
      />

      <span className="mt-0.5 flex h-[17px] w-[17px] shrink-0 items-center justify-center rounded-[3px] border border-[#c9a46a] bg-white transition peer-checked:border-[#e8b923] peer-checked:bg-[#e8b923] peer-focus-visible:ring-2 peer-focus-visible:ring-[#e8b923]/40 [&>svg]:opacity-0 peer-checked:[&>svg]:opacity-100">
        <svg viewBox="0 0 12 12" className="h-3 w-3 text-[#1b2a41]" fill="none">
          <path
            d="M2.5 6.5l2.2 2.2L9.5 3.8"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      <span className="text-[15px] text-[#2c3a50]">{label}</span>
    </label>
  );
}

export function SectionBar({
  num,
  title,
}: {
  num: string;
  title: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-lg bg-[#f8fafc] px-1 py-[7px]">
      <span className="flex h-[26px] w-10 items-center justify-center rounded-md bg-[#e8b923] text-[12px] font-black text-[#1b2a41]">
        {num}
      </span>

      <h2 className="text-[15.5px] font-black uppercase tracking-[0.01em] text-[#1b2a41]">
        {title}
      </h2>
    </div>
  );
}

export function PageFooter({ page }: { page: number }) {
  return (
    <div className="mt-10 flex items-center justify-between border-t border-[#e5e9f0] pt-3 text-[12px] text-[#6b7686]">
      <span>
        Sri Lanka local intake form &nbsp;|&nbsp; Admission subject to seminary
        review.
      </span>

      <span className="font-bold text-[#4b5565]">
        Page {page} of 2
      </span>
    </div>
  );
}
