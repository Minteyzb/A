import Link from "next/link";
import { Cover } from "./Media";

type Item = { slug: string; title: string; summary: string; imageUrl: string | null; createdAt: Date; tags?: string[] };

export function ProjectCard({ p }: { p: Item }) {
  return (
    <Link href={`/projects/${p.slug}`} className="group flex flex-col overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-navy/10 transition hover:ring-amber">
      <Cover src={p.imageUrl} alt={p.title} className="h-48 w-full" />
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-xl group-hover:text-amber-dark">{p.title}</h3>
        <p className="mt-2 flex-1 text-[0.97rem]">{p.summary}</p>
        {p.tags && p.tags.length > 0 && (
          <p className="mt-4 flex flex-wrap gap-2 font-display text-xs">
            {p.tags.map((t) => <span key={t} className="rounded bg-amber-pale px-2 py-0.5 text-navy-deep">{t}</span>)}
          </p>
        )}
      </div>
    </Link>
  );
}

export function PostCard({ p }: { p: Item }) {
  return (
    <Link href={`/blog/${p.slug}`} className="group grid gap-4 rounded-lg bg-white p-4 shadow-sm ring-1 ring-navy/10 transition hover:ring-amber sm:grid-cols-[200px_1fr]">
      <Cover src={p.imageUrl} alt={p.title} className="h-36 w-full rounded" />
      <div>
        <p className="font-display text-xs text-charcoal/70">{p.createdAt.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
        <h3 className="mt-1 text-xl group-hover:text-amber-dark">{p.title}</h3>
        <p className="mt-2 text-[0.97rem]">{p.summary}</p>
      </div>
    </Link>
  );
}
