
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { submitSeminaryApplication } from "@/lib/services/seminary-enrollment.service";

const MAX_BODY_SIZE = 100_000;

const requiredText = z.string().trim().min(1).max(500);
const optionalText = z.string().trim().max(500);

const programmeCodes = [
  "CERTIFICATE_IN_MINISTERIAL_STUDIES",
  "MA_IN_APPLIED_THEOLOGY",
  "MASTER_OF_DIVINITY",
  "DIPLOMA_IN_THEOLOGY",
  "BACHELOR_OF_THEOLOGY",
  "DOCTOR_OF_MINISTRY",
  "UNSURE_REQUEST_ACADEMIC_ADVICE",
] as const;

const applicationSchema = z.object({
  full_name: requiredText,
  date_of_birth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  nic_passport_number: optionalText,
  nationality: optionalText,
  residential_address: requiredText,
  district_city: requiredText,
  postal_code: optionalText,
  mobile_whatsapp: requiredText,
  email: z.string().trim().email().max(254),
  preferred_language: z.enum(["", "English", "Sinhala", "Tamil"]),
  programme_interest: z.enum(programmeCodes).optional(),

  highest_qualification: requiredText,
  institution_name: requiredText,
  year_completed: z.union([
    z.literal(""),
    z.string().regex(/^(19\d{2}|20\d{2}|2100)$/),
  ]),
  field_of_study: optionalText,
  other_theological_training: optionalText,

  programmes: z.array(z.enum(programmeCodes)).min(1).max(7)
    .refine((items) => new Set(items).size === items.length),

  preferred_starting_period: optionalText,
  heard_about_heartland: optionalText,

  current_church: requiredText,
  denomination_affiliation: optionalText,
  church_address: requiredText,
  church_pastor_name: optionalText,
  ministry_role: optionalText,
  years_in_church_ministry: z.union([
    z.literal(""),
    z.string().regex(/^\d{1,3}$/),
  ]),
  current_ministry_setting: z.enum([
    "",
    "CHURCH",
    "PARACHURCH",
    "OTHER",
  ]),

  spiritual_background: requiredText,
  theological_study_purpose: optionalText,

  declaration_accepted: z.literal(true),
  declaration_signed_name: requiredText,
  declaration_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
})
  .strict()
  .transform((application) => ({
    ...application,
    programme_interest: application.programmes[0],
  }));

const referenceSchema = z.object({
  reference_type: z.enum([
    "CHURCH_ENDORSEMENT",
    "PASTORAL_RECOMMENDATION",
  ]),
  referee_name: requiredText,
  referee_email: z.string().trim().email().max(254),
  referee_phone: requiredText,
}).strict();

const submissionSchema = z.object({
  idempotency_key: z.string().uuid(),
  application: applicationSchema,
  references: z.array(referenceSchema).length(2)
    .refine(
      (items) =>
        new Set(items.map((item) => item.reference_type)).size === 2,
      "Both reference types are required.",
    ),
}).strict();

function isAllowedOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");

  if (!origin) return false;

  const configuredOrigins = (
    process.env.APP_ALLOWED_ORIGINS ?? ""
  )
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  if (process.env.NODE_ENV === "development") {
    configuredOrigins.push("http://localhost:3000");
  }

  return configuredOrigins.includes(origin);
}

export async function POST(request: NextRequest) {
  // Check the browser origin.
  if (!isAllowedOrigin(request)) {
    return NextResponse.json(
      { success: false, message: "Invalid request origin." },
      { status: 403 },
    );
  }

  // Reject cross-site browser requests.
  const fetchSite = request.headers.get("sec-fetch-site");

  if (fetchSite === "cross-site") {
    return NextResponse.json(
      { success: false, message: "Cross-site requests are not allowed." },
      { status: 403 },
    );
  }

  // Check content type.
  const contentType = request.headers.get("content-type") ?? "";

  if (!contentType.toLowerCase().includes("application/json")) {
    return NextResponse.json(
      { success: false, message: "Content-Type must be application/json." },
      { status: 415 },
    );
  }

  // Check declared body size.
  const contentLength = Number(
    request.headers.get("content-length") ?? 0,
  );

  if (contentLength > MAX_BODY_SIZE) {
    return NextResponse.json(
      { success: false, message: "Request body is too large." },
      { status: 413 },
    );
  }

  try {
    const rawBody = await request.text();

    if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_SIZE) {
      return NextResponse.json(
        { success: false, message: "Request body is too large." },
        { status: 413 },
      );
    }

    let body: unknown;

    try {
      body = JSON.parse(rawBody);
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid JSON request." },
        { status: 400 },
      );
    }

    const validation = submissionSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Please check your application details and try again.",
        },
        { status: 400 },
      );
    }

    const submission = validation.data;

    const references = submission.references.map((reference) => ({
      ...reference,
      referee_role: "",
    }));

    const result = await submitSeminaryApplication({
      idempotencyKey: submission.idempotency_key,
      application: submission.application,
      references,
    });

    return NextResponse.json(result, {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Enrollment API error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          "We could not submit your application. Please try again later.",
      },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  }
}
