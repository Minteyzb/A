import "server-only";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

const allowed = () =>
  (process.env.ADMIN_EMAILS ?? "").split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);

/** Returns the signed-in user if their verified primary email is in ADMIN_EMAILS, else null. */
export async function getAdmin() {
  const user = await currentUser();
  if (!user) return null;
  const primary = user.emailAddresses.find((e) => e.id === user.primaryEmailAddressId);
  if (!primary || primary.verification?.status !== "verified") return null;
  return allowed().includes(primary.emailAddress.toLowerCase()) ? user : null;
}

/** For pages and actions: visitors go to sign-in, non-admins go home. */
export async function requireAdmin() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  const admin = await getAdmin();
  if (!admin) redirect("/");
  return admin;
}

export function slugify(s: string) {
  const base = s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 60) || "item";
  return `${base}-${Math.random().toString(36).slice(2, 6)}`;
}
