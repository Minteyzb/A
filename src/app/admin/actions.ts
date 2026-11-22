"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { requireAdmin, slugify } from "@/lib/admin";

const s = (f: FormData, k: string) => String(f.get(k) ?? "").trim();
const opt = (f: FormData, k: string) => s(f, k) || null;

export async function createPost(f: FormData) {
  await requireAdmin();
  const title = s(f, "title"), summary = s(f, "summary"), body = s(f, "body");
  if (!title || !summary || !body) throw new Error("Title, summary and text are required");
  const post = await db.post.create({
    data: { slug: slugify(title), title, summary, body, imageUrl: opt(f, "imageUrl"), videoUrl: opt(f, "videoUrl") },
  });
  revalidatePath("/", "layout");
  redirect(`/blog/${post.slug}`);
}

export async function createProject(f: FormData) {
  await requireAdmin();
  const title = s(f, "title"), summary = s(f, "summary"), body = s(f, "body");
  if (!title || !summary || !body) throw new Error("Title, summary and text are required");
  const tags = s(f, "tags").split(",").map((t) => t.trim()).filter(Boolean);
  const p = await db.project.create({
    data: { slug: slugify(title), title, summary, body, tags, imageUrl: opt(f, "imageUrl"), videoUrl: opt(f, "videoUrl"), liveUrl: opt(f, "liveUrl"), repoUrl: opt(f, "repoUrl") },
  });
  revalidatePath("/", "layout");
  redirect(`/projects/${p.slug}`);
}

export async function deleteItem(f: FormData) {
  await requireAdmin();
  const id = s(f, "id"), kind = s(f, "kind");
  if (kind === "post") await db.post.delete({ where: { id } });
  else if (kind === "project") await db.project.delete({ where: { id } });
  else if (kind === "message") await db.message.delete({ where: { id } });
  revalidatePath("/", "layout");
  revalidatePath("/admin");
}

export async function updatePost(f: FormData) {
  await requireAdmin();
  const id = s(f, "id"), title = s(f, "title"), summary = s(f, "summary"), body = s(f, "body");
  if (!id || !title || !summary || !body) throw new Error("Title, summary and text are required");
  const post = await db.post.update({
    where: { id },
    data: { title, summary, body, imageUrl: opt(f, "imageUrl"), videoUrl: opt(f, "videoUrl") },
  });
  revalidatePath("/", "layout");
  redirect(`/blog/${post.slug}`);
}

export async function updateProject(f: FormData) {
  await requireAdmin();
  const id = s(f, "id"), title = s(f, "title"), summary = s(f, "summary"), body = s(f, "body");
  if (!id || !title || !summary || !body) throw new Error("Title, summary and text are required");
  const tags = s(f, "tags").split(",").map((t) => t.trim()).filter(Boolean);
  const p = await db.project.update({
    where: { id },
    data: { title, summary, body, tags, imageUrl: opt(f, "imageUrl"), videoUrl: opt(f, "videoUrl"), liveUrl: opt(f, "liveUrl"), repoUrl: opt(f, "repoUrl") },
  });
  revalidatePath("/", "layout");
  redirect(`/projects/${p.slug}`);
}
