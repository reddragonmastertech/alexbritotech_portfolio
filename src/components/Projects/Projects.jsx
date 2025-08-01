import { useState, useEffect, useRef } from 'react'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import ProjectCard from './ProjectCard'
import { useProjects, getProjectCategories } from '../../hooks/useProjects'
import { CardSkeleton } from '../UI/LoadingSpinner'
import SEOHead from '../SEO/SEOHead'
import { SEO_CONFIGS } from '../SEO/seoConfigs'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

function Projects() {
  const [isVisible, setIsVisible] = useState(false)
  const [filter, setFilter] = useState('all')
  const projectsRef = useRef(null)
  const titleRef = useRef(null)

  // Use custom hook to load projects
  const { projects, loading, error, filteredProjects } = useProjects(filter)

  useEffect(() => {
    // Don't run animations if still loading or if refs are not ready
    if (loading || !titleRef.current || !projectsRef.current) {
      return
    }

    setIsVisible(true)

    // GSAP animations
    const tl = gsap.timeline()

    // Animate section title
    tl.fromTo(
      titleRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    )

    // Create ScrollTrigger for project cards
    const projectCards = projectsRef.current.querySelectorAll('.project-card')

    // Only animate if there are project cards
    if (projectCards.length > 0) {
      gsap.fromTo(
        projectCards,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: projectsRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      )
    }
  }, [loading, filter, filteredProjects.length]) // Re-run when loading state, filter, or projects change

  // Get categories for filter buttons
  const categories = getProjectCategories(projects)

  // Show loading state
  if (loading) {
    return (
      <main className="section-padding pt-28">
        <div className="max-w-7xl mx-auto">
          {/* Title skeleton */}
          <div className="mb-12 text-center">
            <div className="bg-slate-700 rounded h-12 w-64 mx-auto mb-4 animate-pulse" />
            <div className="bg-slate-700 rounded h-4 w-96 mx-auto animate-pulse" />
          </div>

          {/* Filter buttons skeleton */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-slate-700 rounded-full h-10 w-20 animate-pulse" />
            ))}
          </div>

          {/* Project cards skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        </div>
      </main>
    );
  }

  // Show error state
  if (error) {
    return (
      <main className="section-padding pt-28">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <p className="text-red-500 text-lg">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <>
      <SEOHead {...SEO_CONFIGS.projects} />
      <main className="section-padding pt-28">
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <div className="mb-16 text-center" ref={titleRef}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              My <span className="blue-gradient-text">Projects</span>
            </h1>
            <div className="w-24 h-1 bg-sky-500 mx-auto mb-8"></div>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Explore my recent projects and applications. Each project is a unique piece
              of development that I've built to solve real-world problems and showcase my skills.
            </p>
          </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-full transition-all capitalize ${
                filter === category
                  ? 'bg-sky-500 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {category === 'all' ? 'All' : category.replace(/([A-Z])/g, ' $1').trim()}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" ref={projectsRef}>
          {filteredProjects.map((project, index) => (
            <ProjectCard 
              key={project.id}
              project={project}
              isVisible={isVisible}
              delay={index * 100}
              className="project-card"
            />
          ))}
        </div>
      </div>
    </main>
    </>
  )
}

export default Projects