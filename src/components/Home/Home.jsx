import { useState, useEffect, useRef, useContext } from 'react'
import { Link } from 'react-router-dom'
import TypeWriter from './TypeWriter'
import { FaArrowRight, FaGithub, FaLinkedin, FaJava } from 'react-icons/fa'
import { SiSpringboot, SiJavascript, SiReact, SiTailwindcss } from 'react-icons/si'
import HeroModel from './HeroModel'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ThemeContext } from '../../context/ThemeContext'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

function Home() {
  const [isVisible, setIsVisible] = useState(false)
  const contentRef = useRef(null)
  const techStackRef = useRef(null)
  const { darkMode } = useContext(ThemeContext)
  
  useEffect(() => {
    // Initial visibility state for fade-in animations
    setIsVisible(true)
    
    // Staggered entrance animation for hero section
    const tl = gsap.timeline()
    
    tl.fromTo(
      '.hero-element',
      { 
        y: 30, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        stagger: 0.15,
        ease: 'power3.out'
      }
    )
    
    // Floating animation for tech stack tags
    const techTags = techStackRef.current.querySelectorAll('.tech-tag')
    
    techTags.forEach((tag, index) => {
      gsap.to(tag, {
        y: '-=6',
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        delay: index * 0.2,
        ease: 'power1.inOut'
      })
    })
    
    // Clean up animations on component unmount
    return () => {
      tl.kill()
    }
  }, [])

  return (
    <main className="section-padding pt-28 min-h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" ref={contentRef}>
        {/* Left column - Text content */}
        <div className="space-y-6">
          <p className="hero-element text-sky-500 dark:text-sky-400 font-medium">Xin chào, tôi là</p>
          <h1 className="hero-element text-4xl md:text-6xl font-bold text-slate-800 dark:text-slate-100 mb-4 glow-text">
            Nguyen Tran Gia Si
          </h1>
          
          <div className="hero-element text-2xl md:text-3xl font-semibold text-slate-700 dark:text-slate-300 mb-6 h-14">
            <TypeWriter 
              texts={[
                "Java Developer",
                "Spring Boot Expert",
                "Backend Engineer",
                "Full Stack Developer"
              ]}
            />
          </div>
          
          <p className="hero-element text-slate-700 dark:text-slate-300 mb-8 max-w-lg">
            Tôi xây dựng các ứng dụng enterprise với Java & Spring Boot. 
            Chuyên về phát triển RESTful APIs, microservices và các giải pháp bảo mật với 
            Spring Security & JWT trong môi trường doanh nghiệp.
          </p>
          
          <div className="hero-element flex flex-wrap gap-4">
            <Link to="/projects" className="btn-primary flex items-center">
              Xem dự án <FaArrowRight className="ml-2" />
            </Link>
            
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
            <p className="text-sm text-slate-500 mb-2">Công nghệ</p>
            <div className="flex flex-wrap gap-3">
              <span className="tech-tag flex items-center gap-1 px-3 py-2 bg-white dark:bg-slate-800 text-red-500 text-sm rounded-full 
                           border border-slate-300 dark:border-slate-700 hover:border-red-500 transition-colors 
                           duration-300 shadow-md">
                <FaJava /> Java
              </span>
              
              <span className="tech-tag flex items-center gap-1 px-3 py-2 bg-white dark:bg-slate-800 text-green-500 text-sm rounded-full 
                           border border-slate-300 dark:border-slate-700 hover:border-green-500 transition-colors 
                           duration-300 shadow-md">
                <SiSpringboot /> Spring Boot
              </span>
              
              <span className="tech-tag flex items-center gap-1 px-3 py-2 bg-white dark:bg-slate-800 text-blue-500 text-sm rounded-full 
                           border border-slate-300 dark:border-slate-700 hover:border-blue-500 transition-colors 
                           duration-300 shadow-md">
                JPA / Hibernate
              </span>
              
              <span className="tech-tag flex items-center gap-1 px-3 py-2 bg-white dark:bg-slate-800 text-sky-500 text-sm rounded-full 
                           border border-slate-300 dark:border-slate-700 hover:border-sky-500 transition-colors 
                           duration-300 shadow-md">
                <SiReact /> React
              </span>
              
              <span className="tech-tag flex items-center gap-1 px-3 py-2 bg-white dark:bg-slate-800 text-sky-400 text-sm rounded-full 
                           border border-slate-300 dark:border-slate-700 hover:border-sky-400 transition-colors 
                           duration-300 shadow-md">
                <SiTailwindcss /> TailwindCSS
              </span>
              
              <span className="tech-tag flex items-center gap-1 px-3 py-2 bg-white dark:bg-slate-800 text-yellow-400 text-sm rounded-full 
                           border border-slate-300 dark:border-slate-700 hover:border-yellow-400 transition-colors 
                           duration-300 shadow-md">
                <SiJavascript /> JavaScript
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
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-80 hero-element">
        <span className="text-slate-500 dark:text-slate-400 text-sm mb-2">Cuộn xuống</span>
        <span className="w-5 h-10 rounded-full border-2 border-slate-500 dark:border-slate-400 flex justify-center">
          <span className="w-1 h-2 bg-sky-500 dark:bg-sky-400 rounded-full mt-1 animate-[bounce_2s_infinite]"></span>
        </span>
      </div>
    </main>
  )
}

export default Home