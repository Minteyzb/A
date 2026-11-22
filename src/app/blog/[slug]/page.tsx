import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import { Cover, Video, Paragraphs } from "@/components/Media";

export const dynamic = "force-dynamic";
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = await db.post.findUnique({ where: { slug } });
  return { title: p?.title ?? "Post", description: p?.summary };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const p = await db.post.findUnique({ where: { slug } });
  if (!p) notFound();
  return (
    <article className="wrap max-w-3xl pt-16">
      <p className="font-display text-sm text-charcoal/70">{p.createdAt.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
      <h1 className="mt-2 text-4xl sm:text-5xl">{p.title}</h1>
      <Cover src={p.imageUrl} alt={p.title} className="mt-8 max-h-[26rem] w-full rounded-lg" />
      <div className="mt-8"><Paragraphs text={p.body} /></div>
      {p.videoUrl && <div className="mt-8"><Video src={p.videoUrl} /></div>}
    </article>
  );
}
