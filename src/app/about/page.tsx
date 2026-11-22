import type { Metadata } from "next";
import { SectionTitle } from "@/components/Media";

export const metadata: Metadata = { title: "About" };

const experience = [
  ["IT Officer, Naflet Hotel", "Jul 2024 – Apr 2025", "Ran the hotel's network and systems, maintained computers and databases, gave technical support, and built new in-house software."],
  ["Electrical Engineer (intern), Two Brothers Food Complex", "Oct 2023 – Jan 2024", "Drew electrical schematics and technical documents, and designed, tested and installed circuits and components. Intern project: an ANFIS-based temperature controller for an oven machine."],
];
const skills = ["Circuit design", "PCB layout (Altium, KiCad)", "Proteus", "MATLAB", "C++", "Industrial control", "ESP8266 / ESP32 / STM32", "Web development", "Video editing", "Graphics design"];

export default function About() {
  return (
    <div className="wrap pt-16">
      <SectionTitle>About me</SectionTitle>
      <div className="grid gap-10 md:grid-cols-[1fr_320px]">
        <div className="prose-body">
          <p>I&apos;m an Electrical and Computer Engineering graduate from Jimma University, with a focus on industrial control. I like projects where a circuit, a sensor and some code have to work together outside the lab.</p>
          <p>My senior project was an air pollution and water quality monitoring and alerting system, aimed at industrial wastewater and workplace air safety. In industry I&apos;ve worked on oven temperature control, hotel IT systems and electrical work, and I&apos;ve since added full-stack web skills through MERN, Flutter and Java courses.</p>
          <p>I was class representative for two years, coordinating the control stream at faculty level. I speak Amharic fluently and English at an intermediate level.</p>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/portrait-bw.jpg" alt="Mintesinot Zenebe" className="aspect-square w-full rounded-lg border-4 border-amber object-cover" />
      </div>

      <h3 className="mt-16 text-2xl">Education</h3>
      <div className="mt-4 rounded-lg bg-white p-6 ring-1 ring-navy/10">
        <p className="font-display font-medium text-navy">B.Sc. Electrical and Computer Engineering (Industrial Control), Jimma University</p>
        <p>2020 – 2024 · CGPA 3.63 / 4 · Exit exam passed with 70%</p>
      </div>

      <h3 className="mt-14 text-2xl">Experience</h3>
      <ol className="mt-4 space-y-4 border-l-4 border-amber pl-6">
        {experience.map(([role, when, text]) => (
          <li key={role}>
            <p className="font-display font-medium text-navy">{role}</p>
            <p className="font-display text-sm text-charcoal/70">{when}</p>
            <p className="mt-1 max-w-[68ch]">{text}</p>
          </li>
        ))}
      </ol>

      <h3 className="mt-14 text-2xl">Skills</h3>
      <ul className="mt-4 flex flex-wrap gap-2 font-display text-sm">
        {skills.map((s) => <li key={s} className="rounded bg-navy px-3 py-1 text-white">{s}</li>)}
      </ul>
    </div>
  );
}
