import { useEffect, useRef } from "react";

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return;
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const hover = t.closest("a,button,[data-cursor-hover],input,textarea,label");
      ring.current?.classList.toggle("scale-[2.5]", !!hover);
      ring.current?.classList.toggle("bg-black", !!hover);
      ring.current?.classList.toggle("mix-blend-difference", !!hover);
    };
    let raf = 0;
    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (dot.current) dot.current.style.transform = `translate(${mx - 3}px, ${my - 3}px)`;
      if (ring.current) ring.current.style.transform = `translate(${rx - 16}px, ${ry - 16}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);
  return (
    <>
      <div ref={dot} className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-black" />
      <div ref={ring} className="pointer-events-none fixed left-0 top-0 z-[9999] h-8 w-8 rounded-full border-2 border-black transition-[transform,background-color,scale] duration-200 ease-out" style={{ transformOrigin: "center" }} />
    </>
  );
}