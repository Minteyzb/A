"use client";
import { useState } from "react";

export default function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    if (res.ok) { form.reset(); setState("sent"); } else setState("error");
  }
  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-lg bg-white p-6 ring-1 ring-navy/10">
      <div><label className="label" htmlFor="name">Name</label><input id="name" name="name" required className="field" /></div>
      <div><label className="label" htmlFor="email">Email</label><input id="email" name="email" type="email" required className="field" /></div>
      <div><label className="label" htmlFor="message">Message</label><textarea id="message" name="message" rows={5} required className="field" /></div>
      <button className="btn-navy" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send message"}</button>
      {state === "sent" && <p role="status" className="font-display text-sm text-navy">Message sent. I&apos;ll reply by email.</p>}
      {state === "error" && <p role="alert" className="font-display text-sm text-red-700">Couldn&apos;t send. Check the fields and try again.</p>}
    </form>
  );
}
