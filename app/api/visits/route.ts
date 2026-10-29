import { NextResponse } from "next/server";

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Bots fill the hidden field: pretend success, store nothing.
  if (String(body.website ?? "")) return NextResponse.json({ ok: true });

  const visit = {
    name: String(body.name ?? "").trim(),
    email: String(body.email ?? "").trim(),
    phone: String(body.phone ?? "").trim(),
    service: String(body.service ?? "").trim(),
    serviceTime: String(body.serviceTime ?? "").trim(),
    when: String(body.when ?? "").trim(),
    guests: Number(body.guests ?? 1),
    kids: Boolean(body.kids),
    kidsAges: String(body.kidsAges ?? "").trim(),
    message: String(body.message ?? "").trim(),
  };

  if (
    visit.name.length < 2 ||
    visit.name.length > 100 ||
    !/^\S+@\S+\.\S+$/.test(visit.email) ||
    visit.email.length > 200 ||
    visit.phone.length > 40 ||
    !Number.isInteger(visit.guests) ||
    visit.guests < 1 ||
    visit.guests > 10 ||
    visit.kidsAges.length > 100 ||
    visit.message.length > 500
  ) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  // TODO: save and/or email the visit request. Examples:
  //   await prisma.visit.create({ data: visit });
  //   or send a notification email to the church welcome team (Resend / Nodemailer).
  console.log("New visit request", visit);

  return NextResponse.json({ ok: true });
}