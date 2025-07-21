import { useEffect, useRef } from "react";
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
import HeroModel from "./HeroModel";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function Home() {
  const contentRef = useRef(null);
  const techStackRef = useRef(null);

  useEffect(() => {
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
    const techTags = techStackRef.current.querySelectorAll(".tech-tag");

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

    // Clean up animations on component unmount
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <main className="section-padding pt-28 min-h-screen">
      <div
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        ref={contentRef}
      >
        {/* Left column - Text content */}
        <div className="space-y-6">
          <p className="hero-element text-sky-500 dark:text-sky-400 font-medium">
            Hello, I'm
          </p>
          <h1 className="hero-element font-bold mb-4">
            <span className="text-4xl md:text-6xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-700 dark:from-sky-400 dark:via-blue-500 dark:to-indigo-600 bg-clip-text text-transparent drop-shadow-sm animate-pulse-slow relative">
              Nguyen Tran Gia Si
              <span className="absolute -inset-1 bg-sky-500/10 dark:bg-sky-400/10 blur-xl rounded-lg -z-10"></span>
            </span>
          </h1>

          <div className="hero-element text-2xl md:text-3xl font-semibold text-slate-700 dark:text-slate-300 mb-6 h-14">
            <TypeWriter
              texts={[
                "Java Developer",
                "Spring Boot Expert",
                "Backend Engineer",
                "Full Stack Developer",
              ]}
            />
          </div>

          <p className="hero-element text-slate-700 dark:text-slate-300 mb-8 max-w-lg">
            I build enterprise applications with Java & Spring Boot.
            Specializing in developing RESTful APIs, microservices, and security
            solutions with Spring Security & JWT in enterprise environments.
          </p>

          <div className="hero-element flex flex-wrap gap-4">
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
              className="btn-primary flex items-center"
            >
              View Projects <FaArrowRight className="ml-2" />
            </button>

            <div className="flex items-center gap-4">
              <a
                href="https://github.com/giasinguyen"
                target="_blank"
                rel="noreferrer"
                className="text-slate-700 hover:text-sky-600 dark:text-slate-300 dark:hover:text-sky-400 transition-colors p-2 hover:-translate-y-1 transform duration-300"
                aria-label="GitHub"
              >
                <FaGithub className="h-6 w-6" />
              </a>
              <a
                href="https://linkedin.com/in/giasinguyen"
                target="_blank"
                rel="noreferrer"
                className="text-slate-700 hover:text-sky-600 dark:text-slate-300 dark:hover:text-sky-400 transition-colors p-2 hover:-translate-y-1 transform duration-300"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Tech stack tags */}
          <div className="hero-element mt-12" ref={techStackRef}>
            <p className="text-sm text-slate-500 mb-2">Technologies</p>
            <div className="flex flex-wrap gap-3">
              <span
                className="tech-tag flex items-center gap-1 px-3 py-2 bg-white dark:bg-slate-800 text-red-500 text-sm rounded-full 
                           border border-slate-300 dark:border-slate-700 hover:border-red-500 transition-colors 
                           duration-300 shadow-md"
              >
                <FaJava /> Java
              </span>

              <span
                className="tech-tag flex items-center gap-1 px-3 py-2 bg-white dark:bg-slate-800 text-green-500 text-sm rounded-full 
                           border border-slate-300 dark:border-slate-700 hover:border-green-500 transition-colors 
                           duration-300 shadow-md"
              >
                <SiSpring /> Spring
              </span>

              <span
                className="tech-tag flex items-center gap-1 px-3 py-2 bg-white dark:bg-slate-800 text-green-600 text-sm rounded-full 
                           border border-slate-300 dark:border-slate-700 hover:border-green-600 transition-colors 
                           duration-300 shadow-md"
              >
                <SiSpringboot /> Spring Boot
              </span>

              <span
                className="tech-tag flex items-center gap-1 px-3 py-2 bg-white dark:bg-slate-800 text-green-700 text-sm rounded-full 
                           border border-slate-300 dark:border-slate-700 hover:border-green-700 transition-colors 
                           duration-300 shadow-md"
              >
                <SiSpringsecurity /> Spring Security
              </span>

              <span
                className="tech-tag flex items-center gap-1 px-3 py-2 bg-white dark:bg-slate-800 text-blue-500 text-sm rounded-full 
                           border border-slate-300 dark:border-slate-700 hover:border-blue-500 transition-colors 
                           duration-300 shadow-md"
              >
                JPA / Hibernate
              </span>

              <span
                className="tech-tag flex items-center gap-1 px-3 py-2 bg-white dark:bg-slate-800 text-sky-500 text-sm rounded-full 
                           border border-slate-300 dark:border-slate-700 hover:border-sky-500 transition-colors 
                           duration-300 shadow-md"
              >
                <SiReact /> React
              </span>

              <span
                className="tech-tag flex items-center gap-1 px-3 py-2 bg-white dark:bg-slate-800 text-blue-600 text-sm rounded-full 
                           border border-slate-300 dark:border-slate-700 hover:border-blue-600 transition-colors 
                           duration-300 shadow-md"
              >
                <SiTypescript /> TypeScript
              </span>

              <span
                className="tech-tag flex items-center gap-1 px-3 py-2 bg-white dark:bg-slate-800 text-yellow-400 text-sm rounded-full 
                           border border-slate-300 dark:border-slate-700 hover:border-yellow-400 transition-colors 
                           duration-300 shadow-md"
              >
                <SiJavascript /> JavaScript
              </span>

              <span
                className="tech-tag flex items-center gap-1 px-3 py-2 bg-white dark:bg-slate-800 text-sky-400 text-sm rounded-full 
                           border border-slate-300 dark:border-slate-700 hover:border-sky-400 transition-colors 
                           duration-300 shadow-md"
              >
                <SiTailwindcss /> TailwindCSS
              </span>
            </div>
          </div>
        </div>

        {/* Right column - 3D model/image */}
        <div className="hero-element hidden lg:block">
          <HeroModel />

          {/* Decorative circle behind 3D model */}
          <div className="absolute top-1/2 right-1/4 transform -translate-y-1/2 -z-10">
            <div className="w-64 h-64 rounded-full border border-blue-500/20 animate-[spin_20s_linear_infinite]"></div>
            <div className="w-80 h-80 rounded-full border border-purple-500/20 animate-[spin_25s_linear_infinite_reverse] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="w-96 h-96 rounded-full border border-indigo-500/10 animate-[spin_30s_linear_infinite] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;
