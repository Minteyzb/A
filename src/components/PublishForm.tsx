"use client";
import { useState } from "react";
import { upload } from "@vercel/blob/client";

export type Initial = {
  id: string; title: string; summary: string; body: string; tags?: string[];
  liveUrl?: string | null; repoUrl?: string | null; imageUrl?: string | null; videoUrl?: string | null;
};
type Props = { kind: "post" | "project"; action: (f: FormData) => Promise<void>; initial?: Initial };

export default function PublishForm({ kind, action, initial }: Props) {
  const editing = !!initial;
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState<string | null>(null);

  async function send(file: File | null | undefined) {
    if (!file || file.size === 0) return "";
    const blob = await upload(file.name, file, { access: "public", handleUploadUrl: "/api/upload" });
    return blob.url;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true); setError("");
    try {
      const fd = new FormData(e.currentTarget);
      const newImage = await send(fd.get("image") as File);
      const newVideo = await send(fd.get("video") as File);
      const removeImage = fd.get("removeImage") === "on";
      const removeVideo = fd.get("removeVideo") === "on";
      fd.delete("image"); fd.delete("video"); fd.delete("removeImage"); fd.delete("removeVideo");
      fd.set("imageUrl", newImage || (removeImage ? "" : initial?.imageUrl ?? ""));
      fd.set("videoUrl", newVideo || (removeVideo ? "" : initial?.videoUrl ?? ""));
      await action(fd); // redirects to the page on success
    } catch (err) {
      if ((err as Error).message?.includes("NEXT_REDIRECT")) return;
      setError((err as Error).message || "Something went wrong. Try again.");
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 rounded-lg bg-white p-6 ring-1 ring-navy/10">
      {initial && <input type="hidden" name="id" value={initial.id} />}
      <div><label className="label" htmlFor="title">Title</label><input id="title" name="title" required defaultValue={initial?.title} className="field" /></div>
      <div><label className="label" htmlFor="summary">Short summary (shown on cards)</label><input id="summary" name="summary" required maxLength={220} defaultValue={initial?.summary} className="field" /></div>
      <div><label className="label" htmlFor="body">Explanation (leave a blank line between paragraphs)</label><textarea id="body" name="body" rows={10} required defaultValue={initial?.body} className="field" /></div>
      {kind === "project" && (
        <>
          <div><label className="label" htmlFor="tags">Tags (comma separated)</label><input id="tags" name="tags" placeholder="Altium, ESP32, C++" defaultValue={initial?.tags?.join(", ")} className="field" /></div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label className="label" htmlFor="liveUrl">Live link (optional)</label><input id="liveUrl" name="liveUrl" type="url" defaultValue={initial?.liveUrl ?? ""} className="field" /></div>
            <div><label className="label" htmlFor="repoUrl">Source link (optional)</label><input id="repoUrl" name="repoUrl" type="url" defaultValue={initial?.repoUrl ?? ""} className="field" /></div>
          </div>
        </>
      )}
      <div>
        <label className="label" htmlFor="image">{editing ? "Replace cover picture (optional)" : "Cover picture"}</label>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {initial?.imageUrl && <img src={initial.imageUrl} alt="Current cover" className="mb-3 max-h-40 rounded" />}
        <input id="image" name="image" type="file" accept="image/*" className="field" onChange={(e) => { const f = e.target.files?.[0]; setPreview(f ? URL.createObjectURL(f) : null); }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {preview && <img src={preview} alt="Selected cover preview" className="mt-3 max-h-48 rounded" />}
        {initial?.imageUrl && <label className="mt-2 flex items-center gap-2 font-display text-sm"><input type="checkbox" name="removeImage" /> Remove current picture</label>}
      </div>
      <div>
        <label className="label" htmlFor="video">{editing ? "Replace video (optional)" : "Video (optional, MP4 or WebM, up to 200 MB)"}</label>
        {initial?.videoUrl && <video src={initial.videoUrl} controls preload="metadata" className="mb-3 max-h-48 rounded" />}
        <input id="video" name="video" type="file" accept="video/*" className="field" />
        {initial?.videoUrl && <label className="mt-2 flex items-center gap-2 font-display text-sm"><input type="checkbox" name="removeVideo" /> Remove current video</label>}
      </div>
      {error && <p role="alert" className="font-display text-sm text-red-700">{error}</p>}
      <button className="btn-navy" disabled={busy}>{busy ? "Uploading and saving…" : editing ? "Save changes" : kind === "post" ? "Publish post" : "Publish project"}</button>
    </form>
  );
}
