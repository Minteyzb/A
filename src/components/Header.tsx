import Link from "next/link";
import { getAdmin } from "@/lib/admin";
import { currentUser } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";

const links = [
  ["Home", "/"], ["About", "/about"], ["Projects", "/projects"],
  ["Blog", "/blog"], ["Resume", "/resume"], ["Contact", "/contact"],
];

export default async function Header() {
  const user = await currentUser();
  const admin = user ? await getAdmin() : null;
  return (
    <header className="sticky top-0 z-40 border-t-4 border-amber bg-navy-deep text-white">
      <div className="wrap flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-3">
        <Link href="/" className="font-display text-lg font-semibold">Mintesinot Zenebe</Link>
        <nav aria-label="Main" className="flex flex-wrap items-center gap-x-5 gap-y-1 font-display text-sm">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="text-white/80 hover:text-amber">{label}</Link>
          ))}
          {admin && <Link href="/admin" className="rounded bg-amber px-2.5 py-1 font-medium text-navy-deep">Admin</Link>}
          {user ? (
            <UserButton />
          ) : (
            <Link href="/sign-in" className="text-white/60 hover:text-white">Sign in</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
