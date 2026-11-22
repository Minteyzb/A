import Link from "next/link";
import { db } from "@/lib/db";
import { ProjectCard, PostCard } from "@/components/Cards";
import { SectionTitle } from "@/components/Media";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [projects, posts] = await Promise.all([
    db.project.findMany({ orderBy: { createdAt: "desc" }, take: 3 }),
    db.post.findMany({ orderBy: { createdAt: "desc" }, take: 3 }),
  ]);
  return (
    <>
      <section className="bg-navy text-white">
        <div className="wrap grid items-center gap-10 py-16 md:grid-cols-[1.4fr_1fr] md:py-24">
          <div>
            <p className="font-display text-amber">
              Electrical &amp; Computer Engineer · Adama, Ethiopia
            </p>
            <h1 className="mt-3 text-4xl !text-white sm:text-6xl">
              I Design Circuits, Control Systems and the Software that talks to
              them.
            </h1>
            <p className="mt-6 max-w-[58ch] text-lg text-white/85">
              I&apos;m Mintesinot Zenebe, an industrial-control graduate from
              Jimma University. I build PCBs, IoT monitoring systems and control
              panels, and I write the web tools around them.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/projects" className="btn-amber">
                See my projects
              </Link>
              <a href="/resume.pdf" className="btn-line" download>
                Download resume
              </a>
            </div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/portrait-class.jpg"
            alt="Mintesinot Zenebe at his desk"
            className="mx-auto aspect-square w-full max-w-sm rounded-lg border-4 border-amber object-cover"
          />
        </div>
      </section>

      <section className="wrap pt-20">
        <SectionTitle sub="Hardware, control and IoT work from university and the field.">
          Recent projects
        </SectionTitle>
        {projects.length === 0 ? (
          <p>No projects yet.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {projects.map((p) => (
              <ProjectCard key={p.id} p={p} />
            ))}
          </div>
        )}
        <p className="mt-8">
          <Link
            href="/projects"
            className="font-display font-medium text-navy underline decoration-amber decoration-2 underline-offset-4">
            All projects
          </Link>
        </p>
      </section>

      <section className="wrap pt-20">
        <SectionTitle sub="Notes on building things and what went wrong first.">
          From the blog
        </SectionTitle>
        {posts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          <div className="grid gap-5">
            {posts.map((p) => (
              <PostCard key={p.id} p={p} />
            ))}
          </div>
        )}
        <p className="mt-8">
          <Link
            href="/blog"
            className="font-display font-medium text-navy underline decoration-amber decoration-2 underline-offset-4">
            All posts
          </Link>
        </p>
      </section>

      <section className="wrap pt-20">
        <div className="rounded-lg bg-navy p-8 text-white sm:p-12">
          <h2 className="!text-white text-3xl">
            Have a control or embedded problem to solve?
          </h2>
          <p className="mt-3 max-w-[56ch] text-white/85">
            Tell me what you&apos;re building. I reply to every message.
          </p>
          <Link href="/contact" className="btn-amber mt-6">
            Send a message
          </Link>
        </div>
      </section>
    </>
  );
}
