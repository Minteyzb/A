import { requireAdmin } from "@/lib/admin";
import PublishForm from "@/components/PublishForm";
import { createProject } from "../../actions";

export const dynamic = "force-dynamic";

export default async function NewProject() {
  await requireAdmin();
  return (
    <div className="wrap max-w-3xl pt-16">
      <h1 className="mb-8 text-4xl">New project</h1>
      <PublishForm kind="project" action={createProject} />
    </div>
  );
}
