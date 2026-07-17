import { useEffect, useRef, useState } from "react";

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);       
  const dotInner = useRef<HTMLDivElement>(null);  
  const ring = useRef<HTMLDivElement>(null);
  const ringInner = useRef<HTMLDivElement>(null); 
  const text = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState("");
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return;

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const hover = t.closest("a:not([data-cursor-ignore]),button,[data-cursor-hover],input,textarea,label");

      if (hover) {
        const textContent = hover.getAttribute("data-cursor-text") ||
                           hover.textContent?.trim().split("\n")[0] ||
                           "interact";
        setCursorText(textContent);
        setIsHovering(true);

        dotInner.current?.classList.add("h-20", "w-20", "bg-white", "border", "border-black");
        dotInner.current?.classList.remove("h-1.5", "w-1.5", "bg-black");

      
        ringInner.current?.classList.add("scale-0", "opacity-0", "border-transparent");
        ringInner.current?.classList.remove("border-black");

  
        text.current?.classList.add("text-xs");
        text.current?.classList.remove("text-[10px]");
      } else {
        setCursorText("");
        setIsHovering(false);

        dotInner.current?.classList.remove("h-20", "w-20", "bg-white", "border", "border-black");
        dotInner.current?.classList.add("h-1.5", "w-1.5", "bg-black");

        ringInner.current?.classList.remove("scale-0", "opacity-0", "border-transparent");
        ringInner.current?.classList.add("border-black");

        text.current?.classList.remove("text-xs");
        text.current?.classList.add("text-[16px]");
      }
    };

    let raf = 0;
    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (dot.current) dot.current.style.transform = `translate(${mx}px, ${my}px)`;
      if (ring.current) ring.current.style.transform = `translate(${rx - 16}px, ${ry - 16}px)`;
      if (text.current) text.current.style.transform = `translate(${rx - 16}px, ${ry - 16}px)`;
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
      <div ref={dot} className="pointer-events-none fixed left-0 top-0 z-9999">
        <div
          ref={dotInner}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 ease-out h-1.5 w-1.5 bg-black"
        />
      </div>
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-9999 h-8 w-8"
        style={{ transformOrigin: "center" }}
      >
        <div
          ref={ringInner}
          className="h-full w-full rounded-full border border-black bg-transparent transition-all duration-300 ease-out scale-100 opacity-100"
          style={{ transformOrigin: "center" }}
        />
      </div>
      {isHovering && (
        <div
          ref={text}
          className="pointer-events-none fixed left-0 top-0 z-10000 h-8 w-8 rounded-full flex items-center justify-center text-black font-bold text-[10px] text-center leading-none transition-all duration-300 ease-out"
          style={{ transformOrigin: "center" }}
        >
          {cursorText}
        </div>
      )}
    </>
  );
}