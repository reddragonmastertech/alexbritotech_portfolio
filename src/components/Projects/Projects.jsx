import { useState, useEffect, useRef } from 'react'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import ProjectCard from './ProjectCard'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

function Projects() {
  const [isVisible, setIsVisible] = useState(false)
  const [filter, setFilter] = useState('all')
  const projectsRef = useRef(null)
  const titleRef = useRef(null)

  useEffect(() => {
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
  }, [filter]) // Re-run when filter changes

  // Sample project data
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce platform with product catalog, shopping cart, and payment processing capabilities.',
      image: 'https://placehold.co/600x400/0f172a/0ea5e9?text=E-Commerce',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      category: 'fullstack',
      githubUrl: 'https://github.com/yourusername/ecommerce',
      demoUrl: 'https://ecommerce-demo.com',
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'A Kanban-style task management application with drag-and-drop functionality and team collaboration features.',
      image: 'https://placehold.co/600x400/0f172a/0ea5e9?text=Task+Manager',
      tags: ['React', 'Redux', 'Firebase', 'TailwindCSS'],
      category: 'frontend',
      githubUrl: 'https://github.com/yourusername/task-manager',
      demoUrl: 'https://task-manager-demo.com',
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      description: 'A weather dashboard that displays current weather conditions and forecasts based on user location.',
      image: 'https://placehold.co/600x400/0f172a/0ea5e9?text=Weather+App',
      tags: ['JavaScript', 'APIs', 'CSS', 'HTML'],
      category: 'frontend',
      githubUrl: 'https://github.com/yourusername/weather-app',
      demoUrl: 'https://weather-app-demo.com',
    },
    {
      id: 4,
      title: 'Blogging Platform',
      description: 'A content management system for creating and managing blog posts with user authentication and comments.',
      image: 'https://placehold.co/600x400/0f172a/0ea5e9?text=Blog+Platform',
      tags: ['React', 'Node.js', 'Express', 'MongoDB'],
      category: 'fullstack',
      githubUrl: 'https://github.com/yourusername/blog-platform',
      demoUrl: 'https://blog-platform-demo.com',
    },
    {
      id: 5,
      title: 'REST API Service',
      description: 'A RESTful API service for managing customer data with authentication, rate limiting, and documentation.',
      image: 'https://placehold.co/600x400/0f172a/0ea5e9?text=API+Service',
      tags: ['Node.js', 'Express', 'MongoDB', 'JWT'],
      category: 'backend',
      githubUrl: 'https://github.com/yourusername/rest-api',
      demoUrl: 'https://api-docs-demo.com',
    },
    {
      id: 6,
      title: 'Portfolio Website',
      description: 'A modern portfolio website built with React and Three.js for showcasing projects and skills.',
      image: 'https://placehold.co/600x400/0f172a/0ea5e9?text=Portfolio',
      tags: ['React', 'TailwindCSS', 'Three.js', 'Vite'],
      category: 'frontend',
      githubUrl: 'https://github.com/yourusername/portfolio',
      demoUrl: 'https://portfolio-demo.com',
    }
  ]

  // Filter projects based on category
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter)

  return (
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
          <button 
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full transition-all ${
              filter === 'all' 
                ? 'bg-sky-500 text-white' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            All
          </button>
          <button 
            onClick={() => setFilter('frontend')}
            className={`px-4 py-2 rounded-full transition-all ${
              filter === 'frontend' 
                ? 'bg-sky-500 text-white' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Frontend
          </button>
          <button 
            onClick={() => setFilter('backend')}
            className={`px-4 py-2 rounded-full transition-all ${
              filter === 'backend' 
                ? 'bg-sky-500 text-white' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Backend
          </button>
          <button 
            onClick={() => setFilter('fullstack')}
            className={`px-4 py-2 rounded-full transition-all ${
              filter === 'fullstack' 
                ? 'bg-sky-500 text-white' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Full Stack
          </button>
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
  )
}

export default Projects