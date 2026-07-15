import { Link } from "@tanstack/react-router";

export function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 text-white">
        <Link to="/" className="font-hand text-3xl leading-none">Irfan.</Link>
        <nav className="hidden gap-8 text-sm uppercase tracking-widest md:flex">
          <a href="/#work">Work</a>
          <a href="/#skills">Skills</a>
          <a href="/#contact">Contact</a>
        </nav>
        <a href="/#contact" className="text-sm uppercase tracking-widest">Say hi ↗</a>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t-2 border-black bg-white">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-6 px-6 py-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-hand text-5xl leading-none">Muhammed Irfan</p>
          <p className="mt-2 text-sm uppercase tracking-widest">Full-stack developer · India</p>
        </div>
        <div className="flex gap-6 text-sm uppercase tracking-widest">
          <a href="https://github.com/">GitHub ↗</a>
          <a href="https://linkedin.com/">LinkedIn ↗</a>
          <a href="mailto:hello@irfan.dev">Email ↗</a>
        </div>
        <p className="text-xs uppercase tracking-widest">© 2026 — Handmade with code</p>
      </div>
    </footer>
  );
}