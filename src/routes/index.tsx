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
 
        <h1 className="mt-2 select-none font-sans text-[15vw] font-bold leading-[0.85] tracking-tighter md:text-[13vw]">
          <span className="hero-role block overflow-hidden">
            <RoleRotator />
          </span>
 
          <span className="relative block overflow-hidden">
            {"DEVELOPER".split("").map((c, i) => (
              <span key={i} className="hero-char hero-outline inline-block">
                {c}
              </span>
            ))}
           
          </span>
        </h1>
 
        <div className="hero-sub mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="md:col-span-2">
            <p className="max-w-xl text-xl leading-snug md:text-2xl">
              A <span className="sketch-underline">full-stack developer</span> crafting real-time,
              human-scale web products with React, Node.js and a lot of stubborn attention to detail.
            </p>
          </div>
          <div className="flex flex-col items-start justify-end gap-2 text-sm uppercase tracking-widest md:items-end">
            <span><span className="scroll-indicator">↓</span> Scroll</span>
            <span>Based in India</span>
            <span>Open to work — 2026</span>
          </div>
        </div>
 
        <div className="mt-6 flex flex-wrap gap-3">
          <HoverFillButton
            href="https://github.com/your-username"
            label="GitHub"
            icon={<GithubIcon />}
            external
          />
          <HoverFillButton
            href="https://linkedin.com/in/your-username"
            label="LinkedIn"
            icon={<LinkedinIcon />}
            external
          />
          <HoverFillButton
            href="/resume.pdf"
            label="Resume"
            icon={<ResumeIcon />}
            download="Muhammed-Irfan-Resume.pdf"
          />
        </div>
      </div>
 
      <svg className="triangle-accent pointer-events-none absolute left-6 top-24 h-16 w-16 -rotate-12" viewBox="0 0 100 100" fill="none">
        <path d="M10 90 L50 10 L90 90 Z" stroke="black" strokeWidth="2.5" strokeLinejoin="round" strokeDasharray="3 5" />
      </svg>
    </section>
  );
}

function HoverFillButton({
  href,
  label,
  icon,
  external,
  download,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  external?: boolean;
  download?: string;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...(download ? { download } : {})}
      data-cursor-hover
      data-cursor-text={download ? "download" : "open"}
      className="hover-fill-btn flex items-center gap-2 border-2 border-black px-5 py-2.5 text-sm font-semibold uppercase tracking-widest"
    >
      {icon}
      {label}
    </a>
  );
}
 
function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.4 7.86 10.93.57.1.78-.25.78-.55v-2.16c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.73 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.74.8 1.18 1.82 1.18 3.08 0 4.41-2.7 5.38-5.27 5.67.42.36.78 1.07.78 2.16v3.2c0 .3.21.66.79.55A11.51 11.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  );
}
 
function LinkedinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.62 0 4.28 2.38 4.28 5.48v6.26ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}
 
function ResumeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M12 18v-6" />
      <path d="M9 15l3 3 3-3" />
    </svg>
  );
}
 
export { Hero };

function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const items = ["React", "Node.js", "MongoDB", "Socket.io", "TypeScript", "Next.js", "Tailwind", "Express", "MySQL", "Figma"];

  useEffect(() => {
    if (typeof window === "undefined" || !trackRef.current) return;

    const tween = gsap.to(trackRef.current, {
      xPercent: -50,
      ease: "none",
      duration: 30,
      repeat: -1,
    });

    const st = ScrollTrigger.create({
      trigger: trackRef.current,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        // self.direction: 1 = scrolling down, -1 = scrolling up
        tween.timeScale(self.direction === 1 ? 1 : -1);
      },
    });

    return () => {
      tween.kill();
      st.kill();
    };
  }, []);

  return (
    <section className="border-y-2 border-black bg-black text-white">
      <div className="overflow-hidden py-6">
        <div
          ref={trackRef}
          className="marquee-track flex w-max gap-12 whitespace-nowrap text-4xl md:text-6xl font-bold"
        >
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
    <section id="about" className="border-b-2 border-black">
      <div className="mx-auto grid max-w-[1600px] gap-10 px-6 py-24 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="pop font-hand text-3xl">— about</p>
          <h2 className="section-title mt-4 text-5xl font-bold leading-none md:text-7xl">Builder of the internet's small, useful things.</h2>
        </div>
        <div className="pop md:col-span-7 md:col-start-6 space-y-6 text-lg leading-relaxed">
          <div className="space-y-8">
            <div className=" p-6 md:p-8" style={{ borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px" }}>
              <h3 className="leading-relaxed text-2xl mb-3">→My Story</h3>
              <p className="leading-relaxed">
                I'm a passionate MERN Stack Developer with a strong focus on creating intuitive and performant web applications. My journey in web development started during college, where I discovered my love for building digital experiences that solve real-world problems.
              </p>
            </div>
            <div className="p-6 md:p-8" style={{ borderRadius: "15px 225px 15px 255px/225px 15px 255px 15px" }}>
              <h3 className="leading-relaxed text-2xl mb-3"> →My Philosophy </h3>
              <p className="leading-relaxed">
                I design and ship full-stack applications end to end — from schema and sockets to the last button hover. My favourite work sits at the intersection of real-time systems and interfaces that feel personal, not templated.
              </p>
            </div>
            
          </div>
          <div className="flex flex-wrap gap-4 pt-2">
            <span className="sketch-border px-4 py-2 text-sm uppercase tracking-widest">Available for freelance</span>
            <span className="sketch-border-alt px-4 py-2 text-sm uppercase tracking-widest">1 yrs shipping</span>
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
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".ui-card");
    const amount = card ? card.offsetWidth + 32 : el.clientWidth;
    const target = el.scrollLeft + (dir === "left" ? -amount : amount);

    gsap.to(el, {
      scrollLeft: target,
      duration: 0.5,
      ease: "power3.out",
    });
  };

  return (
    <section className="border-b-2 border-black text-black">
      <div className="mx-auto max-w-[1600px] px-6 py-24">
        <p className="font-hand text-3xl">— designing</p>
        <h2 className="section-title text-6xl font-bold leading-none md:text-8xl">Modern UI's.</h2>
        <p className="mt-6 max-w-xl text-lg">
          I focus on mastering UI layout, component structure, media controls and responsive design principles.
        </p>

        <div
          ref={trackRef}
          className="mt-6 flex snap-x snap-mandatory gap-8 overflow-x-auto pb-4"
          style={{ scrollbarWidth: "none" }}
        >
          {uiWork.map((w) => (
            <div
              key={w.title}
              className="ui-card pop w-full flex-shrink-0 snap-start border-2 border-black p-8"
            >
              <h3 className="font-hand text-5xl">{w.title}</h3>
              <p className="mt-4 text-base leading-relaxed">{w.desc}</p>
              <div className="mt-6 flex gap-4 text-sm uppercase tracking-widest">
                
                 <a href={w.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover
                  data-cursor-text="open"
                >
                  GitHub ↗
                </a>
                
                 <a href={w.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover
                  data-cursor-text="open"
                >
                  Demo ↗
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-end gap-4">
          <button
            onClick={() => scroll("left")}
            data-cursor-hover
            data-cursor-text="prev"
            aria-label="Scroll left"
            className="flex h-12 w-12 items-center justify-center border-2 border-black text-2xl transition-colors hover:bg-black hover:text-white"
          >
            ←
          </button>
          <button
            onClick={() => scroll("right")}
            data-cursor-hover
            data-cursor-text="next"
            aria-label="Scroll right"
            className="flex h-12 w-12 items-center justify-center border-2 border-black text-2xl transition-colors hover:bg-black hover:text-white"
          >
            →
          </button>
        </div>
      </div>
    </section>
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
              className={`font-hand text-xl px-5 py-2 border-2 border-white transition-colors md:text-2xl ${
                active === c ? "bg-white text-black" : "hover:bg-white/10"
              }`}
              style={{ borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px" }}
            >
              {c}
            </button>
          ))}
        </div>

        <div key={active} className="mt-12 grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-6">
          {items.map((t, i) => (
            <div
              key={t}
              className="stack-tile relative flex h-32 flex-col justify-between border-2 border-white p-6 md:h-36"
              style={{
                borderRadius:
                  i % 2 === 0
                    ? "255px 15px 225px 15px/15px 225px 15px 255px"
                    : "15px 225px 15px 255px/225px 15px 255px 15px",
              }}
            >
              <span className="font-hand text-lg opacity-70">
                #{String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-2xl font-bold uppercase italic leading-none md:text-3xl">
                {t}
              </span>
            </div>
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