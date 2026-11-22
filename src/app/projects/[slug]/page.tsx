import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import { Cover, Video, Paragraphs } from "@/components/Media";

export const dynamic = "force-dynamic";
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = await db.project.findUnique({ where: { slug } });
  return { title: p?.title ?? "Project", description: p?.summary };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const p = await db.project.findUnique({ where: { slug } });
  if (!p) notFound();
  return (
    <article className="wrap max-w-4xl pt-16">
      <h1 className="text-4xl sm:text-5xl">{p.title}</h1>
      <p className="mt-3 text-xl text-charcoal/80">{p.summary}</p>
      {p.tags.length > 0 && (
        <p className="mt-4 flex flex-wrap gap-2 font-display text-xs">
          {p.tags.map((t) => <span key={t} className="rounded bg-amber-pale px-2 py-0.5 text-navy-deep">{t}</span>)}
        </p>
      )}
      <Cover src={p.imageUrl} alt={p.title} className="mt-8 max-h-[28rem] w-full rounded-lg" />
      <div className="mt-8"><Paragraphs text={p.body} /></div>
      {p.videoUrl && <div className="mt-8"><Video src={p.videoUrl} /></div>}
      {(p.liveUrl || p.repoUrl) && (
        <p className="mt-8 flex gap-3">
          {p.liveUrl && <a href={p.liveUrl} className="btn-navy" target="_blank" rel="noreferrer">Visit live</a>}
          {p.repoUrl && <a href={p.repoUrl} className="btn-amber" target="_blank" rel="noreferrer">View source</a>}
        </p>
      )}
    </article>
  );
}
