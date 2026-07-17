import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function Loader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const obj = { v: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(root.current, {
          yPercent: -100,
          duration: 1,
          ease: "expo.inOut",
          delay: 0.35,
          onComplete: onDone,
        });
      },
    });
    tl.to(obj, {
      v: 100,
      duration: 2.6,
      ease: "power2.inOut",
      onUpdate: () => setPct(Math.round(obj.v)),
    });
    return () => {
      tl.kill();
    };
  }, [onDone]);

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-black text-white"
    >
      <div className="flex items-start justify-between p-6 md:p-10">
       
        <span className="font-mono text-xs uppercase tracking-widest md:text-sm">
          portfolio · 2026
        </span>
      </div>
      <div className="flex items-end justify-between px-6 pb-8 md:px-10 md:pb-12">
        <h1 className="font-sans text-[22vw] font-bold leading-none tracking-tighter md:text-[18vw]">
          {pct}%
        </h1>
        <p className="font-hand mb-4 text-2xl md:mb-8 md:text-4xl">
          Unfolding new possibilities...
        </p>
      </div>
    </div>
  );
}