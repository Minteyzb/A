import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const { name, email, message } = await req.json().catch(() => ({}));
  const ok = (v: unknown, max: number) => typeof v === "string" && v.trim().length > 0 && v.length <= max;
  if (!ok(name, 100) || !ok(email, 200) || !/^\S+@\S+\.\S+$/.test(email) || !ok(message, 5000)) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  await db.message.create({ data: { name: name.trim(), email: email.trim(), message: message.trim() } });
  return NextResponse.json({ ok: true });
}
