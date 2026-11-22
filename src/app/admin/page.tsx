import Link from "next/link";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/admin";
import { deleteItem } from "./actions";

export const metadata: Metadata = { title: "Admin" };
export const dynamic = "force-dynamic";

function Row({ kind, id, title, href }: { kind: string; id: string; title: string; href: string }) {
  return (
    <li className="flex items-center justify-between gap-4 border-b border-navy/10 py-2">
      <Link href={href} className="font-display text-navy hover:text-amber-dark">{title}</Link>
      <div className="flex items-center gap-4">
        <Link href={`/admin/${kind}s/${id}/edit`} className="font-display text-sm text-navy underline decoration-amber decoration-2">Edit</Link>
        <form action={deleteItem}>
          <input type="hidden" name="id" value={id} /><input type="hidden" name="kind" value={kind} />
          <button className="font-display text-sm text-red-700 hover:underline">Delete</button>
        </form>
      </div>
    </li>
  );
}

export default async function Admin() {
  await requireAdmin();
  const [posts, projects, messageCount] = await Promise.all([
    db.post.findMany({ orderBy: { createdAt: "desc" } }),
    db.project.findMany({ orderBy: { createdAt: "desc" } }),
    db.message.count(),
  ]);
  return (
    <div className="wrap pt-16">
      <h1 className="text-4xl">Admin</h1>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/admin/posts/new" className="btn-amber">New blog post</Link>
        <Link href="/admin/projects/new" className="btn-navy">New project</Link>
        <Link href="/admin/messages" className="btn-navy">Messages ({messageCount})</Link>
      </div>
      <div className="mt-10 grid gap-10 md:grid-cols-2">
        <section><h2 className="text-2xl">Blog posts</h2><ul className="mt-3">{posts.map((p) => <Row key={p.id} kind="post" id={p.id} title={p.title} href={`/blog/${p.slug}`} />)}{posts.length === 0 && <li>No posts yet.</li>}</ul></section>
        <section><h2 className="text-2xl">Projects</h2><ul className="mt-3">{projects.map((p) => <Row key={p.id} kind="project" id={p.id} title={p.title} href={`/projects/${p.slug}`} />)}{projects.length === 0 && <li>No projects yet.</li>}</ul></section>
      </div>
    </div>
  );
}
