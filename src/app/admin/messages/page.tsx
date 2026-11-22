import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/admin";
import { deleteItem } from "../actions";

export const dynamic = "force-dynamic";

export default async function Messages() {
  await requireAdmin();
  const messages = await db.message.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div className="wrap max-w-3xl pt-16">
      <h1 className="mb-8 text-4xl">Messages</h1>
      {messages.length === 0 && <p>No messages yet.</p>}
      <ul className="space-y-4">
        {messages.map((m) => (
          <li key={m.id} className="rounded-lg bg-white p-5 ring-1 ring-navy/10">
            <p className="font-display font-medium text-navy">{m.name} · <a className="underline decoration-amber" href={`mailto:${m.email}`}>{m.email}</a></p>
            <p className="font-display text-xs text-charcoal/70">{m.createdAt.toLocaleString("en-GB")}</p>
            <p className="mt-2 whitespace-pre-wrap">{m.message}</p>
            <form action={deleteItem} className="mt-3"><input type="hidden" name="id" value={m.id} /><input type="hidden" name="kind" value="message" /><button className="font-display text-sm text-red-700 hover:underline">Delete</button></form>
          </li>
        ))}
      </ul>
    </div>
  );
}
