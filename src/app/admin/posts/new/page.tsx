import { requireAdmin } from "@/lib/admin";
import PublishForm from "@/components/PublishForm";
import { createPost } from "../../actions";

export const dynamic = "force-dynamic";

export default async function NewPost() {
  await requireAdmin();
  return (
    <div className="wrap max-w-3xl pt-16">
      <h1 className="mb-8 text-4xl">New blog post</h1>
      <PublishForm kind="post" action={createPost} />
    </div>
  );
}
