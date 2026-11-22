/* eslint-disable @next/next/no-img-element */
export function Cover({ src, alt, className = "" }: { src?: string | null; alt: string; className?: string }) {
  if (!src) return <div className={`bg-navy/10 ${className}`} aria-hidden />;
  return <img src={src} alt={alt} loading="lazy" className={`object-cover ${className}`} />;
}

export function Video({ src }: { src?: string | null }) {
  if (!src) return null;
  return <video src={src} controls preload="metadata" className="w-full rounded-lg bg-black" />;
}

export function Paragraphs({ text }: { text: string }) {
  return (
    <div className="prose-body">
      {text.split(/\n{2,}/).map((p, i) => <p key={i}>{p}</p>)}
    </div>
  );
}

export function SectionTitle({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <div className="mb-10 border-l-4 border-amber pl-4">
      <h2 className="text-3xl sm:text-4xl">{children}</h2>
      {sub && <p className="mt-1 max-w-[60ch] text-charcoal/80">{sub}</p>}
    </div>
  );
}
