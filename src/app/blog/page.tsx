import type { Metadata } from "next";
import { db } from "@/lib/db";
import { PostCard } from "@/components/Cards";
import { SectionTitle } from "@/components/Media";

export const metadata: Metadata = { title: "Blog" };
export const dynamic = "force-dynamic";

export default async function Blog() {
  const posts = await db.post.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div className="wrap max-w-4xl pt-16">
      <SectionTitle sub="Engineering notes, lessons and project updates.">Blog</SectionTitle>
      {posts.length === 0 ? <p>No posts yet. The first one is coming soon.</p> : <div className="grid gap-5">{posts.map((p) => <PostCard key={p.id} p={p} />)}</div>}
    </div>
  );
}
