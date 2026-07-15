import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Cursor } from "@/components/Cursor";
import { Nav, Footer } from "@/components/Nav";
import { projects } from "@/lib/projects";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.project.title} — Muhammed Irfan` },
          { name: "description", content: loaderData.project.tagline },
          { property: "og:title", content: `${loaderData.project.title} — Case study` },
          { property: "og:description", content: loaderData.project.tagline },
        ]
      : [{ title: "Project not found" }, { name: "robots", content: "noindex" }],
  }),
  component: ProjectPage,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <p className="font-hand text-4xl">— 404</p>
        <h1 className="mt-2 text-6xl font-bold">Project not found</h1>
        <Link to="/" className="mt-6 inline-block underline">← Back home</Link>
      </div>
    </div>
  ),
});

function ProjectPage() {
  const { project } = Route.useLoaderData();
  const root = useRef<HTMLDivElement>(null);
  const idx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(idx + 1) % projects.length];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".p-hero-char", {
        yPercent: 120, opacity: 0, stagger: 0.03, duration: 1, ease: "expo.out", delay: 0.1,
      });
      gsap.from(".p-reveal", {
        y: 60, opacity: 0, duration: 1, stagger: 0.08, ease: "expo.out", delay: 0.5,
      });
    }, root);
    return () => ctx.revert();
  }, [project.slug]);

  return (
    <div ref={root} className="bg-white text-black">
      <Cursor />
      <Nav />
      <section className="pt-32 pb-16 border-b-2 border-black">
        <div className="mx-auto max-w-[1600px] px-6">
          <Link to="/" className="font-hand text-2xl">← back</Link>
          <p className="p-reveal mt-8 font-hand text-3xl">— {project.category}</p>
          <h1 className="mt-2 overflow-hidden text-[16vw] font-bold leading-[0.85] tracking-tighter md:text-[12vw]">
            {project.title.split("").map((c, i) => (
              <span key={i} className="p-hero-char inline-block">{c}</span>
            ))}
          </h1>
          <div className="p-reveal mt-8 grid gap-8 md:grid-cols-12">
            <p className="md:col-span-7 text-xl leading-relaxed md:text-2xl">{project.tagline}</p>
            <div className="md:col-span-4 md:col-start-9 flex flex-wrap gap-2 self-end">
              {project.tags.map((t) => (
                <span key={t} className="sketch-border px-3 py-1 text-xs uppercase tracking-widest">{t}</span>
              ))}
            </div>
          </div>
          <div className="p-reveal mt-10 flex gap-4">
            <a className="sketch-border bg-black px-6 py-3 text-sm uppercase tracking-widest text-white" href="#">Code ↗</a>
            <a className="sketch-border-alt px-6 py-3 text-sm uppercase tracking-widest" href="#">Live demo ↗</a>
          </div>
        </div>
      </section>

      <section className="border-b-2 border-black">
        <div className="mx-auto grid max-w-[1600px] gap-10 px-6 py-24 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="p-reveal font-hand text-3xl">— overview</p>
            <h2 className="p-reveal mt-2 text-4xl font-bold leading-none md:text-6xl">The story.</h2>
          </div>
          <p className="p-reveal md:col-span-7 md:col-start-6 text-lg leading-relaxed">{project.overview}</p>
        </div>
      </section>

      <section className="border-b-2 border-black bg-black text-white">
        <div className="mx-auto max-w-[1600px] px-6 py-24">
          <p className="font-hand text-3xl">— what it does</p>
          <h2 className="text-5xl font-bold leading-none md:text-7xl">Key features.</h2>
          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {project.features.map((f, i) => (
              <li key={i} className="flex gap-4 border-t border-white/40 pt-6 text-lg">
                <span className="font-mono text-white/60">0{i + 1}</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b-2 border-black">
        <div className="mx-auto max-w-[1600px] px-6 py-24">
          <p className="font-hand text-3xl">— stack</p>
          <h2 className="text-5xl font-bold leading-none md:text-7xl">Built with.</h2>
          <div className="mt-10 flex flex-wrap gap-4">
            {project.tech.map((t) => (
              <span key={t} className="sketch-border px-5 py-3 text-base">{t}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b-2 border-black">
        <Link to="/projects/$slug" params={{ slug: next.slug }} className="block px-6 py-24 text-center">
          <p className="font-hand text-3xl">— next project</p>
          <p className="mt-2 text-6xl font-bold md:text-9xl">{next.title} →</p>
        </Link>
      </section>

      <Footer />
    </div>
  );
}