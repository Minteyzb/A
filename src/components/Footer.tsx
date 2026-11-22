export default function Footer() {
  return (
    <footer className="mt-24 border-b-8 border-amber bg-navy-deep py-10 text-sm text-white/75">
      <div className="wrap flex flex-col justify-between gap-4 font-display sm:flex-row">
        <p>© {new Date().getFullYear()} Mintesinot Zenebe · Adama, Ethiopia</p>
        <p>
          <a className="hover:text-amber" href="mailto:zbmintey@gmail.com">zbmintey@gmail.com</a>
          {"  "}
          <a className="ml-4 hover:text-amber" href="tel:+251953104857">+251 953 104 857</a>
        </p>
      </div>
    </footer>
  );
}
