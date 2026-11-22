import type { Metadata } from "next";
import { SectionTitle } from "@/components/Media";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = { title: "Contact" };

export default function Contact() {
  return (
    <div className="wrap pt-16">
      <SectionTitle sub="For work, collaboration or a technical question.">Contact</SectionTitle>
      <div className="grid gap-10 md:grid-cols-[1fr_1.3fr]">
        <ul className="space-y-3 font-display">
          <li><span className="block text-sm text-charcoal/70">Email</span><a className="text-navy underline decoration-amber decoration-2" href="mailto:zbmintey@gmail.com">zbmintey@gmail.com</a></li>
          <li><span className="block text-sm text-charcoal/70">Phone</span><a className="text-navy" href="tel:+251953104857">+251 953 104 857</a></li>
          <li><span className="block text-sm text-charcoal/70">Location</span>Adama, Ethiopia</li>
        </ul>
        <ContactForm />
      </div>
    </div>
  );
}
