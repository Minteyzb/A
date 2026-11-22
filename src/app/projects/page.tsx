import type { Metadata } from "next";
import { db } from "@/lib/db";
import { ProjectCard } from "@/components/Cards";
import { SectionTitle } from "@/components/Media";

export const metadata: Metadata = { title: "Projects" };
export const dynamic = "force-dynamic";

export default async function Projects() {
  const projects = await db.project.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div className="wrap pt-16">
      <SectionTitle sub="Open a project for the full write-up, photos and video.">Projects</SectionTitle>
      {projects.length === 0 ? <p>No projects yet. Check back soon.</p> : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{projects.map((p) => <ProjectCard key={p.id} p={p} />)}</div>
      )}
    </div>
  );
}
