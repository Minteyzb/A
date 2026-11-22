import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/admin";
import PublishForm from "@/components/PublishForm";
import { updatePost } from "../../../actions";

export const dynamic = "force-dynamic";

export default async function EditPost({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const p = await db.post.findUnique({ where: { id } });
  if (!p) notFound();
  return (
    <div className="wrap max-w-3xl pt-16">
      <h1 className="mb-8 text-4xl">Edit blog post</h1>
      <PublishForm kind="post" action={updatePost} initial={p} />
    </div>
  );
}
