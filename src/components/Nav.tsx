import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export function Nav() {
  const [scrolled ,SetScrolled ]=useState(false)
  useEffect(()=>{
    const onScroll =()=>SetScrolled(window.scrollY>10)
    onScroll()
    window.addEventListener("scroll",onScroll,{passive:true})
    return ()=>window.removeEventListener("scroll",onScroll)
  },[])
  return (
  <header className={`fixed top-0 left-0 right-0 backdrop-blur-xl bg-white/70  z-50  ${
        scrolled ? "border-b-2 border-black" : "border-b-2 border-transparent"
      }` }>
  <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 text-black">
    <Link to="/" className="font-hand text-3xl leading-none" data-cursor-hover data-cursor-text="Home">Irfan.</Link>
    <nav className="hidden gap-8 text-sm uppercase tracking-widest md:flex">
      <a href="/#about" data-cursor-hover data-cursor-text="About">About</a>
      <a href="/#work" data-cursor-hover data-cursor-text="work">Work</a>
      <a href="/#skills" data-cursor-hover data-cursor-text="skills">Skills</a>
      <a href="/#contact" data-cursor-hover data-cursor-text="contact">Contact</a>
    </nav>
    <a href="/#contact" className="text-sm uppercase tracking-widest" data-cursor-hover data-cursor-text="say hi">Say hi ↗</a>
  </div>
</header>
  );
}

export function Footer() {
  return (
    <footer id="contact-footer" className="border-t-2 border-black bg-black text-white">
      <div className="mx-auto max-w-[1600px] px-6 py-20 md:py-20">
        <h2 className="section-title text-[16vw] font-bold leading-[0.85] md:text-[10vw]">
          LET&apos;S <span className=" text-[6vw] italic">create.</span>
        </h2>

        <div className="mt-12 border-t-2 border-white/20 pt-8 md:mt-18">
          <div className="grid gap-10 md:grid-cols-3">
            <div className="pop">
              <p className="font-hand text-3xl">Say hello</p>
              <a
                href="mailto:muhammedirfank32@gmail.com"
                data-cursor-hover
                data-cursor-text="email"
                className="mt-2 inline-block underline decoration-white/40 underline-offset-4 hover:decoration-white"
              >
                muhammadirfank645@gmail.com
              </a>
            </div>
            <div className="pop">
              <p className="font-hand text-3xl">Socials</p>
              <div className="mt-2 flex flex-col gap-1">
                <a href="https://github.com/muhammedirfan07" target="_blank" rel="noreferrer" data-cursor-hover data-cursor-text="open">
                  / GitHub
                </a>
                <a href="https://www.linkedin.com/in/muhammed-irfan-k007/" target="_blank" rel="noreferrer" data-cursor-hover data-cursor-text="open">
                  / LinkedIn
                </a>
                <a href="/resume.pdf" target="_blank" rel="noreferrer" data-cursor-hover data-cursor-text="open">
                  / Resume
                </a>
              </div>
            </div>

            <div className="pop md:text-right">
              <p className="font-hand text-3xl">Based in</p>
              <p className="mt-2">Kannur, Kerala</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t-2 border-white/20">
        <div className="mx-auto flex max-w-[1600px] flex-col items-center gap-4 px-6 py-6 text-xs uppercase tracking-widest md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} Muhammed Irfan. All rights reserved.</p>
         
        </div>
      </div>
    </footer>
  );
}