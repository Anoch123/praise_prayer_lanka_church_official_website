import { z } from "zod";
import { PROGRAMME_OPTIONS } from "../constants/helper_data";

/* --------------------------------
   Reusable validation rules
--------------------------------- */

const requiredText = (label: string, max = 500) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required.`)
    .max(max, `${label} cannot exceed ${max} characters.`);

const emailAddress = (label: string) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required.`)
    .email(`Enter a valid ${label.toLowerCase()}.`)
    .max(254, "Email address cannot exceed 254 characters.");

const phoneNumber = (label: string) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required.`)
    .max(25, `${label} is too long.`)
    .refine((value) => {
      const digits = value.replace(/\D/g, "");

      return (
        /^[+0-9\s().-]+$/.test(value) &&
        digits.length >= 7 &&
        digits.length <= 15
      );
    }, `Enter a valid ${label.toLowerCase()}.`);

/* --------------------------------
   Date validation
--------------------------------- */

const isValidDate = (value: string) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const [year, month, day] = value.split("-").map(Number);

  const date = new Date(Date.UTC(year, month - 1, day));

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
};

const isAtLeastAge = (value: string, minimumAge: number) => {
  if (!isValidDate(value)) return false;

  const [year, month, day] = value.split("-").map(Number);

  const today = new Date();

  let age = today.getFullYear() - year;

  const birthdayHasNotOccurred =
    today.getMonth() + 1 < month ||
    (today.getMonth() + 1 === month && today.getDate() < day);

  if (birthdayHasNotOccurred) {
    age--;
  }

  return age >= minimumAge;
};

const todayISO = () => {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const validDate = (
  label: string,
  options?: {
    preventFuture?: boolean;
    earliestYear?: number;
    minimumAge?: number;
  },
) =>
  z
    .string()
    .min(1, `${label} is required.`)
    .refine(isValidDate, `${label} must be a valid date.`)
    .refine(
      (value) =>
        !options?.earliestYear ||
        !isValidDate(value) ||
        Number(value.slice(0, 4)) >= options.earliestYear,
      `${label} is outside the accepted date range.`,
    )
    .refine(
      (value) =>
        !options?.preventFuture || !isValidDate(value) || value <= todayISO(),
      `${label} cannot be in the future.`,
    )
    .refine(
      (value) =>
        !options?.minimumAge ||
        !isValidDate(value) ||
        isAtLeastAge(value, options.minimumAge),
      `${label}: Applicants must be at least ${options?.minimumAge} years old.`,
    );

/* --------------------------------
   Select validation
--------------------------------- */

const requiredYear = z
  .string()
  .trim()
  .min(1, "Year completed is required.")
  .regex(/^\d{4}$/, "Enter a valid four-digit year.")
  .refine(
    (value) =>
      Number(value) >= 1900 && Number(value) <= new Date().getFullYear(),
    `Enter a year between 1900 and ${new Date().getFullYear()}.`,
  );

const requiredYearsInMinistry = z
  .string()
  .trim()
  .min(1, "Years in ministry is required.")
  .regex(/^\d{1,3}$/, "Enter a valid number of years.")
  .refine(
    (value) => Number(value) >= 0 && Number(value) <= 100,
    "Enter a number between 0 and 100.",
  );

const requiredLanguage = z
  .string()
  .refine(
    (value) => ["English", "Sinhala", "Tamil"].includes(value),
    "Please select your preferred language.",
  );

const requiredMinistrySetting = z
  .string()
  .refine(
    (value) => ["CHURCH", "PARACHURCH", "OTHER"].includes(value),
    "Please select your current ministry setting.",
  );

/* --------------------------------
   Main enrollment schema
--------------------------------- */

export const seminaryEnrollmentSchema = z.object({
  // 01 - Personal information

  fullName: requiredText("Full name", 150),

  dob: validDate("Date of birth", {
    preventFuture: true,
    minimumAge: 20,
  }),

  // Personal information
  nicPassport: requiredText("NIC / Passport number", 12),
  nationality: requiredText("Nationality", 100),
  postalCode: requiredText("Postal code", 20),
  language: requiredLanguage,

  // Educational background
  yearCompleted: requiredYear,
  fieldOfStudy: requiredText("Field of study", 200),
  otherTraining: requiredText("Other theological study or training", 1000),

  // Programme selection
  startPeriod: requiredText("Preferred starting period", 100),
  heardFrom: requiredText("How you heard about Heartland", 200),

  // Church and ministry
  denomination: requiredText("Denomination / affiliation", 200),
  pastor: requiredText("Church pastor / senior leader", 150),
  role: requiredText("Ministry role", 150),
  yearsInMinistry: requiredYearsInMinistry,
  ministrySetting: requiredMinistrySetting,

  // Spiritual background
  purpose: requiredText("Purpose of theological study", 3000),

  address: requiredText("Residential address", 500),

  district: requiredText("District / City", 100),

  mobile: phoneNumber("Mobile / WhatsApp number"),

  email: emailAddress("Email address"),

  // 02 - Educational background

  qualification: requiredText("Highest qualification", 200),

  institution: requiredText("Institution name", 200),

  // 03 - Programme selection

  programme: z
    .array(z.enum(PROGRAMME_OPTIONS))
    .min(1, "Please select at least one programme.")
    .max(1, "You cannot select more than one programmes.")
    .refine(
      (values) => new Set(values).size === values.length,
      "Duplicate programme selections are not allowed.",
    ),

  // 04 - Church and ministry

  church: requiredText("Church name", 200),

  churchAddress: requiredText("Church address", 500),

  // 05 - Spiritual background

  spiritualFormation: requiredText("Spiritual background", 3000),

  // 06 - Church endorsement reference

  endorsementName: requiredText("Church endorsement name", 150),

  endorsementEmail: emailAddress("Endorsement email"),

  endorsementPhone: phoneNumber("Endorsement phone number"),

  // 07 - Pastoral recommendation reference

  recommendName: requiredText("Pastoral recommendation name", 150),

  recommendEmail: emailAddress("Recommendation email"),

  recommendPhone: phoneNumber("Recommendation phone number"),

  // 08 - Applicant declaration

  declaration: z
    .boolean()
    .refine(
      (value) => value === true,
      "You must accept the applicant declaration.",
    ),

  signature: requiredText("Applicant signature", 150),

  signDate: validDate("Signature date", {
    preventFuture: true,
  }),
});

export type SeminaryEnrollmentFormValues = z.infer<
  typeof seminaryEnrollmentSchema
>;
