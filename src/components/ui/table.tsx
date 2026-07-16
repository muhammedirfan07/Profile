import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cursor } from "@/components/Cursor";
import { Nav, Footer } from "@/components/Nav";
import { Loader } from "@/components/Loader";
import { RoleRotator } from "@/components/RoleRotator";
import { projects, skills, uiWork, journey } from "@/lib/projects";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const root = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Hero letters
      gsap.from(".hero-char", {
        yPercent: 120,
        opacity: 0,
        rotate: 8,
        stagger: 0.04,
        duration: 1,
        ease: "expo.out",
        delay: 0.2,
      });
      gsap.from(".hero-sub", { y: 40, opacity: 0, duration: 1, delay: 0.9, ease: "expo.out" });
      gsap.from(".hero-scribble", { scale: 0, opacity: 0, duration: 1.2, delay: 1, ease: "back.out(2)" });

      // Marquee
      gsap.to(".marquee-track", {
        xPercent: -50,
        ease: "none",
        duration: 30,
        repeat: -1,
      });

      // Section reveal (pop-up)
      gsap.utils.toArray<HTMLElement>(".pop").forEach((el) => {
        gsap.from(el, {
          y: 80,
          opacity: 0,
          scale: 0.96,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      // Project cards stagger
      gsap.utils.toArray<HTMLElement>(".project-card").forEach((el, i) => {
        gsap.from(el, {
          y: 120,
          opacity: 0,
          rotate: i % 2 === 0 ? -2 : 2,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      // Section titles slide
      gsap.utils.toArray<HTMLElement>(".section-title").forEach((el) => {
        gsap.from(el, {
          xPercent: -8,
          opacity: 0,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      // Tech stack tile stagger
      gsap.utils.toArray<HTMLElement>(".stack-tile").forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          y: 40,
          scale: 0.9,
          duration: 0.6,
          delay: i * 0.04,
          ease: "back.out(1.6)",
          scrollTrigger: { trigger: el, start: "top 90%" },
        });
      });

      // Journey scroll pop — reversible in both directions
      gsap.utils.toArray<HTMLElement>(".journey-item").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 100,
          scale: 0.85,
          rotate: -2,
          duration: 0.8,
          ease: "back.out(1.6)",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "top 40%",
            toggleActions: "play reverse play reverse",
          },
        });
      });
    }, root);
    return () => ctx.revert();
  }, [loaded]);

  return (
    <div ref={root} className="bg-white text-black">
      {!loaded && <Loader onDone={() => setLoaded(true)} />}
      <Cursor />
      <Nav />
      <Hero />
      <Marquee />
      <About />
      <Work />
      <UI />
      <TechStack />
      <Journey />
      <Contact />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-32 pb-16">
      <div className="mx-auto max-w-[1600px] px-6">
        <p className="font-hand text-3xl md:text-4xl">Hi 👋 , I'm Irfan —</p>
        <h1 className="mt-4 select-none font-sans text-[18vw] font-bold leading-[0.85] tracking-tighter md:text-[16vw]">
          <span className="hero-role block overflow-hidden">
            <RoleRotator />
          </span>
          <span className="relative block overflow-hidden">
            {"DEVELOPER".split("").map((c, i) => (
              <span key={i} className="hero-char inline-block">{c}</span>
            ))}
            <svg className="hero-scribble pointer-events-none absolute -right-4 top-1/2 hidden h-40 w-40 -translate-y-1/2 md:block" viewBox="0 0 100 100" fill="none">
              <path d="M20 50 Q50 10 80 50 T20 50" stroke="black" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
              <circle cx="50" cy="50" r="30" stroke="black" strokeWidth="2.5" fill="none" strokeDasharray="4 6"/>
            </svg>
          </span>
        </h1>
        <div className="hero-sub mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <p className="max-w-xl text-xl leading-snug md:text-2xl">
              A <span className="sketch-underline">full-stack developer</span> crafting real-time,
              human-scale web products with React, Node.js and a lot of stubborn attention to detail.
            </p>
          </div>
          <div className="flex flex-col items-start justify-end gap-3 text-sm uppercase tracking-widest md:items-end">
            <span>↓ Scroll</span>
            <span>Based in India</span>
            <span>Open to work — 2026</span>
          </div>
        </div>
      </div>
      {/* sketch decoration */}
      <svg className="pointer-events-none absolute left-6 top-24 h-16 w-16 -rotate-12" viewBox="0 0 100 100" fill="none">
        <path d="M10 90 L50 10 L90 90 Z" stroke="black" strokeWidth="2.5" strokeLinejoin="round" strokeDasharray="3 5"/>
      </svg>
    </section>
  );
}

function Marquee() {
  const items = ["React", "Node.js", "MongoDB", "Socket.io", "TypeScript", "Next.js", "Tailwind", "Express", "MySQL", "Figma"];
  return (
    <section className="border-y-2 border-black bg-black text-white">
      <div className="overflow-hidden py-6">
        <div className="marquee-track flex w-max gap-12 whitespace-nowrap text-4xl md:text-6xl font-bold">
          {[...items, ...items, ...items, ...items].map((t, i) => (
            <span key={i} className="flex items-center gap-12">
              {t}
              <span className="font-hand text-3xl md:text-4xl">✷</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="border-b-2 border-black">
      <div className="mx-auto grid max-w-[1600px] gap-10 px-6 py-24 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="pop font-hand text-3xl">— about</p>
          <h2 className="section-title mt-4 text-5xl font-bold leading-none md:text-7xl">Builder of the internet's small, useful things.</h2>
        </div>
        <div className="pop md:col-span-7 md:col-start-6 space-y-6 text-lg leading-relaxed">
          <p>
            I design and ship full-stack applications end to end — from schema and sockets to the last button hover. My favourite work sits at the intersection of real-time systems and interfaces that feel personal, not templated.
          </p>
          <p>
            Recently I've been building an EV charging booking platform, a real-time chat app and a team task manager. Each one taught me something new about latency, trust and design under constraints.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <span className="sketch-border px-4 py-2 text-sm uppercase tracking-widest">Available for freelance</span>
            <span className="sketch-border-alt px-4 py-2 text-sm uppercase tracking-widest">2+ yrs shipping</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section id="work" className="border-b-2 border-black">
      <div className="mx-auto max-w-[1600px] px-6 py-24">
        <div className="mb-16 flex items-end justify-between">
          <div>
            <p className="font-hand text-3xl">— selected work</p>
            <h2 className="section-title text-6xl font-bold leading-none md:text-8xl">Projects.</h2>
          </div>
          <p className="hidden max-w-xs text-sm uppercase tracking-widest md:block">
            Click any project to open the full case study →
          </p>
        </div>
        <div className="space-y-8">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} index={i} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: typeof projects[number]; index: number }) {
  const [hover, setHover] = useState(false);
  return (
    <Link
      to="/projects/$slug"
      params={{ slug: project.slug }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      data-cursor-hover
      data-cursor-text="view"
      className="project-card group relative block border-2 border-black bg-white p-6 md:p-10"
      style={{ transform: hover ? "translate(-6px,-6px)" : "translate(0,0)", boxShadow: hover ? "12px 12px 0 #000" : "0 0 0 #000", transition: "transform .3s ease, box-shadow .3s ease" }}
    >
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-6 md:grid-cols-12">
        <div className="md:col-span-1">
          <span className="font-mono text-xl">0{index + 1}</span>
        </div>
        <div className="md:col-span-6 min-w-0">
          <p className="font-hand text-2xl">{project.category}</p>
          <h3 className="mt-1 text-5xl font-bold leading-none md:text-7xl">{project.title}</h3>
          <p className="mt-6 max-w-xl text-base leading-relaxed">{project.tagline}</p>
        </div>
        <div className="md:col-span-4 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span key={t} className="sketch-border px-3 py-1 text-xs uppercase tracking-widest">{t}</span>
          ))}
        </div>
        <div className="md:col-span-1 flex items-center justify-end self-center">
          <span className="font-hand text-4xl whitespace-nowrap">Open →</span>
        </div>
      </div>
    </Link>
  );
}

function UI() {
  return (
    <section className="border-b-2 border-black bg-black text-white">
      <div className="mx-auto max-w-[1600px] px-6 py-24">
        <p className="font-hand text-3xl">— designing</p>
        <h2 className="section-title text-6xl font-bold leading-none md:text-8xl">Modern UI's.</h2>
        <p className="mt-6 max-w-xl text-lg">
          I focus on mastering UI layout, component structure, media controls and responsive design principles.
        </p>
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {uiWork.map((w) => (
            <div key={w.title} className="pop border-2 border-white p-8">
              <h3 className="font-hand text-5xl">{w.title}</h3>
              <p className="mt-4 text-base leading-relaxed">{w.desc}</p>
              <div className="mt-6 flex gap-4 text-sm uppercase tracking-widest">
                <span data-cursor-hover data-cursor-text="open">GitHub ↗</span>
                <span data-cursor-hover data-cursor-text="open">Demo ↗</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * SketchBox — draws a hand-wobbled rectangle border via SVG instead of a
 * plain CSS border. `seed` makes the wobble deterministic per tile so it
 * doesn't jitter between renders, but every tile still gets a unique shape.
 */
function SketchBox({
  seed,
  className,
  children,
}: {
  seed: number;
  className?: string;
  children: React.ReactNode;
}) {
  const rand = (n: number) => {
    const x = Math.sin(seed * 999 + n * 57) * 10000;
    return x - Math.floor(x);
  };
  const jitter = (n: number, range = 5) => (rand(n) - 0.5) * range * 2;

  const w = 300;
  const h = 150;
  const corners = [
    [jitter(1), jitter(2)],
    [w + jitter(3), jitter(4)],
    [w + jitter(5), h + jitter(6)],
    [jitter(7), h + jitter(8)],
  ];
  const d = `M ${corners[0][0]} ${corners[0][1]} L ${corners[1][0]} ${corners[1][1]} L ${corners[2][0]} ${corners[2][1]} L ${corners[3][0]} ${corners[3][1]} Z`;

  return (
    <div className={`relative ${className ?? ""}`}>
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox={`0 0 ${w} ${h}`}
        preserveAspectRatio="none"
        fill="none"
      >
        <path d={d} stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
      <div className="relative flex h-full flex-col justify-between p-6">{children}</div>
    </div>
  );
}

function TechStack() {
  const cats = Object.keys(skills) as (keyof typeof skills)[];
  const [active, setActive] = useState<keyof typeof skills>(cats[0]);
  const items = skills[active];

  return (
    <section id="skills" className="border-b-2 border-black bg-black text-white">
      <div className="mx-auto max-w-[1600px] px-6 py-24">
        <p className="font-hand text-3xl">— toolbox</p>
        <h2 className="section-title text-6xl font-bold leading-none md:text-8xl">
          Tech <span className="font-hand italic">stack</span>
        </h2>

        <div className="mt-12 flex flex-wrap gap-3">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              data-cursor-hover
              data-cursor-text="select"
              className={`border-2 border-white px-5 py-2 text-sm uppercase tracking-widest transition-colors ${
                active === c ? "bg-white text-black" : "hover:bg-white/10"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div key={active} className="mt-12 grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-6">
          {items.map((t, i) => (
            <SketchBox
              key={t}
              seed={i + 1}
              className="stack-tile h-32 text-white md:h-36"
            >
              <span className="font-hand text-lg opacity-70">
                #{String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-2xl font-bold uppercase italic leading-none md:text-3xl">
                {t}
              </span>
            </SketchBox>
          ))}
        </div>
      </div>
    </section>
  );
}

function Journey() {
  return (
    <section id="journey" className="border-b-2 border-black">
      <div className="mx-auto max-w-[1600px] px-6 py-24">
        <p className="font-hand text-3xl">— journey</p>
        <h2 className="section-title text-6xl font-bold leading-none md:text-8xl">
          Timeline.
        </h2>

        <div className="relative mt-16 pl-8 md:pl-16">
          <div className="absolute left-2 md:left-6 top-0 bottom-0 w-px border-l-2 border-dashed border-black" />
          <div className="space-y-20">
            {journey.map((j) => (
              <div key={j.title} className="journey-item relative">
                <div className="absolute -left-8 md:-left-16 top-2 h-4 w-4 rounded-full border-2 border-black bg-white" />
                <p className="font-hand text-2xl">{j.period}</p>
                <h3 className="mt-2 text-4xl md:text-6xl font-bold leading-none">
                  {j.title}
                </h3>
                <p className="mt-3 text-sm uppercase tracking-widest opacity-70">
                  {j.org}
                </p>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed">
                  {j.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {j.tags.map((t) => (
                    <span
                      key={t}
                      className="sketch-border px-3 py-1 text-xs uppercase tracking-widest"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-[1600px] px-6 py-32">
        <p className="font-hand text-3xl">— get in touch</p>
        <h2 className="section-title text-6xl font-bold leading-[0.9] md:text-[10vw]">
          Let's make <span className="font-hand italic">something</span> weird & useful.
        </h2>
        <div className="mt-16 grid gap-16 md:grid-cols-12">
          <div className="pop md:col-span-5 space-y-6">
            <p className="text-lg">Drop a note. Freelance, collabs, or just to say hi — I read everything.</p>
            <div className="space-y-1 font-mono">
              <p>hello@irfan.dev</p>
              <p>+91 · ● ● ● ●</p>
            </div>
            <svg className="h-24 w-40" viewBox="0 0 200 100" fill="none">
              <path d="M10 50 Q60 10 100 50 T190 50" stroke="black" strokeWidth="3" strokeLinecap="round" fill="none"/>
              <path d="M180 40 L190 50 L180 60" stroke="black" strokeWidth="3" strokeLinecap="round" fill="none"/>
            </svg>
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="pop md:col-span-7 space-y-6"
          >
            <Field label="Your name" name="name" />
            <Field label="Email" name="email" type="email" />
            <Field label="What's on your mind?" name="msg" textarea />
            <button
              type="submit"
              data-cursor-hover
              data-cursor-text="send"
              className="sketch-border bg-black px-8 py-4 text-lg uppercase tracking-widest text-white transition-transform hover:-translate-y-1"
            >
              {sent ? "Sent ✔ — I'll reply soon" : "Send it →"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", textarea }: { label: string; name: string; type?: string; textarea?: boolean }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm uppercase tracking-widest">{label}</span>
      {textarea ? (
        <textarea name={name} rows={4} required className="w-full resize-none border-b-2 border-black bg-transparent py-3 text-lg outline-none focus:border-black" />
      ) : (
        <input name={name} type={type} required className="w-full border-b-2 border-black bg-transparent py-3 text-lg outline-none" />
      )}
    </label>
  );
}