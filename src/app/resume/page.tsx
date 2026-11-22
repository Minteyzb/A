import type { Metadata } from "next";
import { SectionTitle } from "@/components/Media";

export const metadata: Metadata = { title: "Resume" };

export default function Resume() {
  return (
    <div className="wrap max-w-4xl pt-16">
      <SectionTitle>Resume</SectionTitle>
      <p className="mb-8"><a href="/resume.pdf" download className="btn-amber">Download PDF</a></p>
      <div className="grid overflow-hidden rounded-lg shadow-sm ring-1 ring-navy/10 md:grid-cols-[260px_1fr]">
        <aside className="space-y-6 bg-navy p-6 font-display text-sm text-white">
          <div><h2 className="!text-amber text-base">Contact</h2><p className="mt-2">+251 953 104 857<br />zbmintey@gmail.com<br />Adama, Ethiopia</p></div>
          <div><h2 className="!text-amber text-base">Education</h2><p className="mt-2">Jimma University<br />B.Sc. Electrical &amp; Computer Engineering<br />CGPA 3.63/4 · Exit exam 70%</p></div>
          <div><h2 className="!text-amber text-base">Certificates</h2><p className="mt-2">MERN stack development<br />Flutter mobile app development<br />Full Stack Java (Simplilearn, 2025)</p></div>
          <div><h2 className="!text-amber text-base">Skills</h2><p className="mt-2">Proteus · Circuit design · C++ · MATLAB · Video editing · Graphics design · Web development · Critical thinking</p></div>
          <div><h2 className="!text-amber text-base">Languages</h2><p className="mt-2">English (intermediate)<br />Amharic (fluent)</p></div>
        </aside>
        <div className="space-y-7 bg-white p-6 sm:p-8">
          <section><h2 className="text-xl">Profile</h2><p className="mt-2">Dedicated, results-driven Electrical and Computer Engineering graduate with strong analytical skills and hands-on experience designing, developing and troubleshooting electronic systems, specializing in industrial control.</p></section>
          <section><h2 className="text-xl">Work experience</h2>
            <h3 className="mt-3 text-base">IT Officer · Naflet Hotel <span className="font-normal text-charcoal/70">(Jul 2024 – Apr 2025)</span></h3>
            <ul className="mt-1 list-disc pl-5"><li>Network and system installation and administration</li><li>Computer maintenance and database administration</li><li>Technical support</li></ul>
            <h3 className="mt-4 text-base">Electrical Engineer, internship · Two Brothers Food Complex <span className="font-normal text-charcoal/70">(Oct 2023 – Jan 2024)</span></h3>
            <ul className="mt-1 list-disc pl-5"><li>Created technical documents and electrical schematics for new and existing products</li><li>Designed, tested and implemented electrical circuits and components</li></ul>
          </section>
          <section><h2 className="text-xl">Leadership</h2><p className="mt-2">Two years as class representative, managing the control stream at faculty level.</p></section>
        </div>
      </div>
    </div>
  );
}
