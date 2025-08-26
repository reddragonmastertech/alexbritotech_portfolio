import { useEffect, useRef, useState } from "react";
import TypeWriter from "./TypeWriter";
import { FaArrowRight, FaGithub, FaLinkedin, FaJava } from "react-icons/fa";
import {
  SiSpringboot,
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiSpring,
  SiSpringsecurity,
} from "react-icons/si";

// Lazy load heavy dependencies only when needed
let HeroModel = null;
let gsap = null;
let ScrollTrigger = null;

// Dynamic imports for better mobile performance
const loadHeavyDependencies = async () => {
  try {
    const [heroModelModule, gsapModule] = await Promise.all([
      import("./HeroModel"),
      import("gsap")
    ]);
    
    HeroModel = heroModelModule.default;
    gsap = gsapModule.default;
    
    const scrollTriggerModule = await import("gsap/ScrollTrigger");
    ScrollTrigger = scrollTriggerModule.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);
  } catch (error) {
    console.warn('Failed to load heavy dependencies:', error);
  }
};

function Home() {
  const contentRef = useRef(null);
  const techStackRef = useRef(null);
  const [show3D, setShow3D] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Performance check to decide whether to show 3D model and heavy animations
  useEffect(() => {
    const checkPerformance = () => {
      const mobile = window.innerWidth < 768;
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      const isHighPerformance = !connection || connection.effectiveType === '4g';
      const hasGoodHardware = window.devicePixelRatio <= 2;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      setIsMobile(mobile);
      setShow3D(isHighPerformance && hasGoodHardware && !mobile && !prefersReducedMotion);
      setAnimationsEnabled(!mobile && !prefersReducedMotion);
    };

    checkPerformance();
    window.addEventListener('resize', checkPerformance);
    return () => window.removeEventListener('resize', checkPerformance);
  }, []);

  // Load heavy dependencies only when needed
  useEffect(() => {
    if (animationsEnabled && !gsap) {
      loadHeavyDependencies();
    }
  }, [animationsEnabled]);

  useEffect(() => {
    // Only run animations if enabled and dependencies loaded
    if (!animationsEnabled || !gsap) return;

    // Wait a bit for gsap to be fully loaded
    const timer = setTimeout(() => {
      if (!gsap) return;

      // Staggered entrance animation for hero section
      const tl = gsap.timeline();

      tl.fromTo(
        ".hero-element",
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
        }
      );

      // Floating animation for tech stack tags
      const techTags = techStackRef.current?.querySelectorAll(".tech-tag");

      if (techTags) {
        techTags.forEach((tag, index) => {
          gsap.to(tag, {
            y: "-=6",
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            delay: index * 0.2,
            ease: "power1.inOut",
          });
        });
      }

      // Clean up animations on component unmount
      return () => {
        tl.kill();
      };
    }, 100);

    return () => clearTimeout(timer);
  }, [animationsEnabled]);

  return (
    <main className="section-padding pt-32 pb-20 min-h-screen relative">
      {/* Background Effects - simplified on mobile */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-violet-600/5"></div>
      {!isMobile && (
        <>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
        </>
      )}

      <div
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10"
        ref={contentRef}
      >
        {/* Left column - Text content */}
        <div className="space-y-8">
          <div className="hero-element">
            <p className="text-blue-400 font-medium text-lg mb-2">Hello, I'm</p>
            <h1 className="font-bold mb-6">
              <span className={`text-4xl sm:text-5xl md:text-7xl gradient-text drop-shadow-2xl relative block ${isMobile ? 'leading-tight' : 'whitespace-nowrap'} ${!isMobile ? 'animate-pulse-slow' : ''}`}>
                <span className="inline-block gradient-text">Nguyen Tran</span>{' '}
                <span className="inline-block gradient-text">Gia Si</span>
                {!isMobile && <span className="absolute -inset-2 bg-blue-500/5 blur-2xl rounded-2xl -z-10"></span>}
              </span>
            </h1>
          </div>

          <div className="hero-element text-2xl md:text-4xl font-semibold text-slate-200 mb-8 h-16">
            <TypeWriter
              texts={[
                "Java Developer",
                "Spring Boot Expert", 
                "Backend Engineer",
                "Full Stack Developer",
              ]}
              delay={isMobile ? 100 : 80}
              deleteDelay={isMobile ? 50 : 30}
            />
          </div>

          <p className="hero-element text-slate-300 text-lg mb-10 max-w-2xl leading-relaxed">
            I build enterprise applications with <span className="text-blue-400 font-semibold">Java & Spring Boot</span>.
            Specializing in developing RESTful APIs, microservices, and security
            solutions with Spring Security & JWT in enterprise environments.
          </p>

          <div className="hero-element flex flex-wrap gap-6">
            <button
              onClick={() => {
                const element = document.getElementById("projects");
                if (element) {
                  const offsetTop = element.offsetTop - 80;
                  window.scrollTo({
                    top: offsetTop,
                    behavior: "smooth",
                  });
                }
              }}
              className="btn-primary flex items-center gap-3"
            >
              View Projects <FaArrowRight className="text-lg" />
            </button>

            <div className="flex items-center gap-6">
              <a
                href="https://github.com/giasinguyen"
                target="_blank"
                rel="noreferrer"
                className={`glass-effect text-slate-300 hover:text-blue-400 transition-all p-4 rounded-xl ${!isMobile ? 'hover:-translate-y-1 transform duration-300 hover:shadow-lg hover:shadow-blue-500/20' : ''}`}
                aria-label="GitHub"
              >
                <FaGithub className="h-7 w-7" />
              </a>
              <a
                href="https://linkedin.com/in/giasinguyen"
                target="_blank"
                rel="noreferrer"
                className={`glass-effect text-slate-300 hover:text-blue-400 transition-all p-4 rounded-xl ${!isMobile ? 'hover:-translate-y-1 transform duration-300 hover:shadow-lg hover:shadow-blue-500/20' : ''}`}
                aria-label="LinkedIn"
              >
                <FaLinkedin className="h-7 w-7" />
              </a>
            </div>
          </div>

          {/* Tech stack tags */}
          <div className="hero-element mt-16" ref={techStackRef}>
            <p className="text-slate-400 mb-6 text-lg font-medium">
              Technologies I work with
            </p>
            <div className="flex flex-wrap gap-4">
              <span className={`tech-tag flex items-center gap-2 px-4 py-3 glass-effect text-red-400 text-sm rounded-xl border border-red-500/20 hover:border-red-400/40 transition-all duration-300 ${!isMobile ? 'hover:shadow-lg hover:shadow-red-500/10' : ''}`}>
                <FaJava className="text-lg" /> Java
              </span>

              <span className={`tech-tag flex items-center gap-2 px-4 py-3 glass-effect text-green-400 text-sm rounded-xl border border-green-500/20 hover:border-green-400/40 transition-all duration-300 ${!isMobile ? 'hover:shadow-lg hover:shadow-green-500/10' : ''}`}>
                <SiSpring className="text-lg" /> Spring
              </span>

              <span className={`tech-tag flex items-center gap-2 px-4 py-3 glass-effect text-green-500 text-sm rounded-xl border border-green-500/20 hover:border-green-400/40 transition-all duration-300 ${!isMobile ? 'hover:shadow-lg hover:shadow-green-500/10' : ''}`}>
                <SiSpringboot className="text-lg" /> Spring Boot
              </span>

              <span className={`tech-tag flex items-center gap-2 px-4 py-3 glass-effect text-blue-400 text-sm rounded-xl border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 ${!isMobile ? 'hover:shadow-lg hover:shadow-blue-500/10' : ''}`}>
                <SiReact className="text-lg" /> React
              </span>

              <span className={`tech-tag flex items-center gap-2 px-4 py-3 glass-effect text-blue-500 text-sm rounded-xl border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 ${!isMobile ? 'hover:shadow-lg hover:shadow-blue-500/10' : ''}`}>
                <SiTypescript className="text-lg" /> TypeScript
              </span>

              <span className={`tech-tag flex items-center gap-2 px-4 py-3 glass-effect text-cyan-400 text-sm rounded-xl border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300 ${!isMobile ? 'hover:shadow-lg hover:shadow-cyan-500/10' : ''}`}>
                <SiTailwindcss className="text-lg" /> TailwindCSS
              </span>
            </div>
          </div>
        </div>

        {/* Right column - 3D model/image */}
        <div className="hero-element hidden lg:block relative">
          {show3D && HeroModel ? (
            <HeroModel />
          ) : (
            <div className="relative w-full h-[500px] flex items-center justify-center">
              {/* Modern geometric alternative to 3D model */}
              <div className="relative">
                {/* Main glowing orb */}
                <div className={`w-80 h-80 bg-gradient-to-br from-blue-500/30 via-violet-500/20 to-cyan-500/30 rounded-full blur-2xl neon-glow ${!isMobile ? 'animate-pulse-slow' : ''}`}></div>
                
                {/* Floating geometric shapes */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-64 h-64">
                    <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-16 border-2 border-blue-400/60 rounded-lg rotate-45 ${!isMobile ? 'animate-bounce-slow' : ''}`}></div>
                    <div className={`absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-br from-violet-500/40 to-cyan-500/40 rounded-full ${!isMobile ? 'animate-pulse delay-500' : ''}`}></div>
                    <div className={`absolute top-1/4 left-0 w-8 h-8 border border-cyan-400/60 rotate-12 ${!isMobile ? 'animate-pulse delay-1000' : ''}`}></div>
                    <div className={`absolute bottom-1/4 left-1/4 w-6 h-16 bg-gradient-to-t from-blue-500/30 to-transparent rounded-full ${!isMobile ? 'animate-bounce-slow delay-700' : ''}`}></div>
                  </div>
                </div>

                {/* Orbiting rings - only on desktop */}
                {!isMobile && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-96 h-96 border border-blue-400/20 rounded-full animate-[spin_15s_linear_infinite]"></div>
                    <div className="absolute w-80 h-80 border border-violet-400/20 rounded-full animate-[spin_20s_linear_infinite_reverse]"></div>
                    <div className="absolute w-64 h-64 border border-cyan-400/20 rounded-full animate-[spin_25s_linear_infinite]"></div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Background grid pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="w-full h-full bg-gradient-to-br from-transparent via-blue-500/5 to-transparent"></div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;
