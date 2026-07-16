import { useEffect, useRef } from "react";
import gsap from "gsap";
 
const ROLES = ["FULLSTACK", "FRONTEND", "BACKEND"];
 
export function RoleRotator() {
  const wrap = useRef<HTMLSpanElement>(null);
 
  useEffect(() => {
    if (!wrap.current) return;
    const items = wrap.current.querySelectorAll<HTMLElement>(".role-item");
    gsap.set(items, { yPercent: 100, opacity: 0 });
    gsap.fromTo(
      items[0],
      { yPercent: 100, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.9, ease: "expo.out", delay: 0.2 }
    );

    const tl = gsap.timeline({ repeat: -1, delay: 2.6 });
    items.forEach((_, i) => {
      const next = items[(i + 1) % items.length];
      const cur = items[i];
      tl.to({}, { duration: 1.8 })
        .to(cur, { yPercent: -110, opacity: 0, duration: 0.7, ease: "expo.in" })
        .fromTo(
          next,
          { yPercent: 100, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.8, ease: "expo.out" },
          "-=0.2"
        );
    });
    return () => {
      tl.kill();
    };
  }, []);
 
  return (
    <span
      ref={wrap}
      className="relative inline-block h-[1em] overflow-hidden align-bottom"
      style={{ minWidth: "8ch" }}
    >
      {ROLES.map((r) => (
        <span key={r} className="role-item absolute left-0 top-0 whitespace-nowrap">
          {r}
        </span>
      ))}
      <span className="invisible whitespace-nowrap">FULLSTACK</span>
    </span>
  );
}