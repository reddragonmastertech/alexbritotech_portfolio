import { useState, useMemo, useCallback, useEffect } from 'react'
import { FaStar, FaExternalLinkAlt, FaEye } from 'react-icons/fa'
import { useProjects, getProjectCategories } from '../../hooks/useProjects'
import SEOHead from '../SEO/SEOHead'
import { SEO_CONFIGS } from '../SEO/seoConfigs'
import { motion, AnimatePresence } from 'framer-motion'
import { techIconMap, defaultIcon } from '../../utils/iconMapper'
import techStackData from '../../data/techStack.json'

function Projects() {
  const [filter, setFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { projects = [], loading, error, filteredProjects = [] } = useProjects(filter)
  const categories = useMemo(() => getProjectCategories(Array.isArray(projects) ? projects : []), [projects])

  const handleFilterChange = useCallback((newFilter) => {
    setFilter(newFilter)
  }, [])

  const handleImageClick = useCallback((project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }, [])

  // Loading state
  if (loading) {
    return (
      <section className="section-padding py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-48 h-10 bg-neutral-800/50 rounded-xl mx-auto mb-4 animate-pulse" />
            <div className="w-96 h-6 bg-neutral-800/50 rounded-lg mx-auto animate-pulse" />
          </div>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-neutral-800/30 rounded-2xl h-48 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="section-padding py-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-xl mb-4">Error loading projects</p>
          <p className="text-neutral-400">{error}</p>
        </div>
      </section>
    )
  }

  return (
    <>
      <SEOHead {...SEO_CONFIGS.projects} />
      <style>{`
        .tech-icon-wrapper:hover .tech-icon-svg {
          filter: grayscale(0) !important;
        }
      `}</style>
      <section className="section-padding py-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
              A collection of projects showcasing my skills in full-stack development
            </p>
          </motion.div>

          {/* Filter Pills */}
          <motion.div 
            className="flex flex-wrap justify-center gap-2 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => handleFilterChange(category.value)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === category.value
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-900 shadow-lg shadow-amber-500/20'
                    : 'bg-neutral-800/50 text-neutral-400 hover:text-white hover:bg-neutral-700/50 border border-neutral-700/50'
                }`}
              >
                {category.label}
              </button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  index={index}
                  onImageClick={handleImageClick}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Project Detail Modal */}
          <AnimatePresence>
            {isModalOpen && selectedProject && (
              <ProjectDetailModal 
                project={selectedProject}
                onClose={handleCloseModal}
              />
            )}
          </AnimatePresence>

          {filteredProjects.length === 0 && (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-neutral-400">No projects found in this category</p>
            </motion.div>
          )}
        </div>
      </section>
    </>
  )
}

// Project Card Component - Vertical Layout
function ProjectCard({ project, index, onImageClick }) {
  const [imageError, setImageError] = useState(false)

  // Get technology icons
  const getTechIcon = (techName) => {
    // Try to match technology name to icon key (case-insensitive, partial match)
    const techLower = techName.toLowerCase()
    const iconKey = Object.keys(techIconMap).find(key => 
      techLower.includes(key.toLowerCase()) || key.toLowerCase().includes(techLower)
    )
    return iconKey ? techIconMap[iconKey] : defaultIcon
  }

  // Get technology color from techStack.json
  const getTechColor = (techName) => {
    // Search through all categories in techStack.json
    for (const category of techStackData.categories) {
      const tech = category.technologies.find(t => 
        t.name.toLowerCase() === techName.toLowerCase() ||
        techName.toLowerCase().includes(t.name.toLowerCase()) ||
        t.name.toLowerCase().includes(techName.toLowerCase())
      )
      if (tech) {
        return tech.color
      }
    }
    // Fallback colors for common technologies
    const techLower = techName.toLowerCase()
    if (techLower.includes('react')) return '#61DAFB'
    if (techLower.includes('node')) return '#339933'
    if (techLower.includes('python')) return '#3776AB'
    if (techLower.includes('java')) return '#ED8B00'
    if (techLower.includes('spring')) return '#6DB33F'
    if (techLower.includes('postgres')) return '#336791'
    if (techLower.includes('mongodb')) return '#47A248'
    if (techLower.includes('docker')) return '#2496ED'
    if (techLower.includes('kubernetes')) return '#326CE5'
    if (techLower.includes('aws')) return '#FF9900'
    if (techLower.includes('azure')) return '#0078D4'
    if (techLower.includes('tailwind')) return '#06B6D4'
    if (techLower.includes('typescript')) return '#3178C6'
    if (techLower.includes('javascript')) return '#F7DF1E'
    return null
  }

  const handleImageClick = (e) => {
    e.stopPropagation()
    if (onImageClick) {
      onImageClick(project)
    }
  }

  const handleVisitSite = (e) => {
    e.stopPropagation()
    if (project.website) {
      window.open(project.website, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative h-full flex flex-col"
    >
      <div className={`h-full flex flex-col bg-neutral-900/60 backdrop-blur-sm rounded-2xl border transition-all duration-500 overflow-hidden hover:border-amber-500/30 hover:shadow-xl hover:shadow-amber-500/10 ${
        project.featured 
          ? 'border-amber-500/20 shadow-lg shadow-amber-500/5' 
          : 'border-neutral-800'
      }`}>
        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-3 right-3 z-10">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-900 text-xs font-medium shadow-lg">
              <FaStar className="w-3 h-3" />
            </span>
          </div>
        )}

        {/* Project Image - 70-75% of card height - Clickable for modal */}
        <div 
          className="relative w-full aspect-[4/3] overflow-hidden bg-neutral-800/50 flex-shrink-0 cursor-pointer"
          onClick={handleImageClick}
        >
          {!imageError ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              onError={() => setImageError(true)}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-800 to-neutral-900">
              <span className="text-5xl font-bold text-neutral-600">{project.title.charAt(0)}</span>
            </div>
          )}
          {/* Subtle overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {/* Click indicator */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center w-10 h-10 rounded-full bg-neutral-900/80 backdrop-blur-sm border border-neutral-700">
              <FaEye className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        {/* Project Title - 10-15% of card height */}
        <div className="px-4 py-3 flex-shrink-0 border-b border-neutral-800/50 flex items-center justify-between gap-2">
          <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors duration-300 line-clamp-2 flex-1">
            {project.title}
          </h3>
          {/* Visit Site Icon Button */}
          {project.website && (
            <button
              onClick={handleVisitSite}
              className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-neutral-800/50 hover:bg-amber-500/20 border border-neutral-700/50 hover:border-amber-500/50 text-neutral-400 hover:text-amber-400 transition-all duration-300 group/btn"
              title="Visit Website"
              aria-label="Visit Website"
            >
              <FaExternalLinkAlt className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" />
            </button>
          )}
        </div>

        {/* Technologies Icons - 5-10% of card height */}
        <div className="px-4 py-3 flex items-center gap-2 flex-wrap flex-shrink-0 technologies-container">
          {project.technologies && project.technologies.length > 0 ? (
            project.technologies.slice(0, 8).map((tech, i) => {
              const TechIcon = getTechIcon(tech)
              const isImageIcon = typeof TechIcon === 'object' && TechIcon?.type === 'image'
              const techColor = getTechColor(tech)
              
              const uniqueClass = `tech-icon-${project.id}-${i}`
              
              return (
                <div
                  key={i}
                  className={`tech-icon-wrapper ${uniqueClass} w-6 h-6 flex items-center justify-center rounded-md bg-neutral-800/50 border border-neutral-700/50 hover:border-amber-500/30 transition-all duration-300 relative group/tech`}
                  title={tech}
                >
                  {techColor && !isImageIcon && (
                    <style>{`
                      .${uniqueClass}:hover .tech-icon-svg {
                        filter: grayscale(0) !important;
                        color: ${techColor} !important;
                      }
                    `}</style>
                  )}
                  {isImageIcon ? (
                    <img 
                      src={TechIcon.src} 
                      alt={tech}
                      className="w-4 h-4 object-contain filter grayscale group-hover/tech:grayscale-0 transition-all duration-300"
                    />
                  ) : (
                    <TechIcon 
                      className="w-4 h-4 transition-all duration-300 tech-icon-svg" 
                      style={{ 
                        filter: 'grayscale(1)',
                        color: 'rgb(163 163 163)'
                      }}
                    />
                  )}
                </div>
              )
            })
          ) : null}
          {project.technologies && project.technologies.length > 8 && (
            <span className="text-xs text-neutral-500 px-2">
              +{project.technologies.length - 8}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  )
}

// Project Detail Modal Component
function ProjectDetailModal({ project, onClose }) {
  const [imageError, setImageError] = useState(false)

  // Get technology icons (same as ProjectCard)
  const getTechIcon = (techName) => {
    const techLower = techName.toLowerCase()
    const iconKey = Object.keys(techIconMap).find(key => 
      techLower.includes(key.toLowerCase()) || key.toLowerCase().includes(techLower)
    )
    return iconKey ? techIconMap[iconKey] : defaultIcon
  }

  // Get technology color (same as ProjectCard)
  const getTechColor = (techName) => {
    for (const category of techStackData.categories) {
      const tech = category.technologies.find(t => 
        t.name.toLowerCase() === techName.toLowerCase() ||
        techName.toLowerCase().includes(t.name.toLowerCase()) ||
        t.name.toLowerCase().includes(techName.toLowerCase())
      )
      if (tech) {
        return tech.color
      }
    }
    return null
  }

  // Get category label
  const getCategoryLabel = (category) => {
    const categoryMap = {
      fullstack: 'Full Stack',
      frontend: 'Frontend',
      backend: 'Backend'
    }
    return categoryMap[category] || category
  }

  const handleImageClick = () => {
    if (project.website) {
      window.open(project.website, '_blank', 'noopener,noreferrer')
    }
  }

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden'
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-6xl min-h-[85vh] my-8 bg-neutral-900 rounded-2xl border border-neutral-800 overflow-hidden shadow-2xl flex flex-col"
      >
        {/* Modal Content - Two Column Layout */}
        <div className="flex flex-col lg:flex-row flex-1 min-h-0 pt-6 pb-6">
          {/* Left Section - Image, Category & Industry, Technology Icons */}
          <div className="lg:w-3/5 flex flex-col">
            {/* Project Image - Clickable */}
            <div 
              className="relative w-full aspect-[4/3] overflow-hidden bg-neutral-800/50 cursor-pointer group"
              onClick={handleImageClick}
            >
              {!imageError ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={() => setImageError(true)}
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-800 to-neutral-900">
                  <span className="text-6xl font-bold text-neutral-600">{project.title.charAt(0)}</span>
                </div>
              )}
              {/* Click indicator overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 px-4 py-2 bg-neutral-900/80 backdrop-blur-sm rounded-lg border border-neutral-700">
                  <FaExternalLinkAlt className="w-4 h-4 text-white" />
                  <span className="text-white text-sm font-medium">Visit Website</span>
                </div>
              </div>
            </div>

            {/* Category & Industry */}
            <div className="px-6 py-4 border-b border-neutral-800 flex items-center gap-3 flex-wrap">
              {project.category && (
                <span className="px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 text-sm font-medium">
                  {getCategoryLabel(project.category)}
                </span>
              )}
              {project.industry && (
                <span className="px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 text-sm font-medium">
                  {project.industry}
                </span>
              )}
            </div>

            {/* Technology Icons */}
            <div className="px-6 py-4 flex items-center gap-3 flex-wrap">
              {project.technologies && project.technologies.length > 0 ? (
                project.technologies.map((tech, i) => {
                  const TechIcon = getTechIcon(tech)
                  const isImageIcon = typeof TechIcon === 'object' && TechIcon?.type === 'image'
                  const techColor = getTechColor(tech)
                  const uniqueClass = `modal-tech-icon-${project.id}-${i}`
                  
                  return (
                    <div key={i}>
                      {techColor && !isImageIcon && (
                        <style>{`
                          .${uniqueClass}:hover .modal-tech-icon-svg {
                            filter: grayscale(0) !important;
                            color: ${techColor} !important;
                          }
                        `}</style>
                      )}
                      <div
                        className={`${uniqueClass} w-8 h-8 flex items-center justify-center rounded-lg bg-neutral-800/50 border border-neutral-700/50 hover:border-amber-500/30 transition-all duration-300 group/modal-tech`}
                        title={tech}
                      >
                        {isImageIcon ? (
                          <img 
                            src={TechIcon.src} 
                            alt={tech}
                            className="w-5 h-5 object-contain filter grayscale group-hover/modal-tech:grayscale-0 transition-all duration-300"
                          />
                        ) : (
                          <TechIcon 
                            className="w-5 h-5 transition-all duration-300 modal-tech-icon-svg" 
                            style={{ 
                              filter: 'grayscale(1)',
                              color: 'rgb(163 163 163)'
                            }}
                          />
                        )}
                      </div>
                    </div>
                  )
                })
              ) : null}
            </div>
          </div>

          {/* Right Section - Title, Description, Solution (fixed), Visit aligned with Tech */}
          <div className="lg:w-2/5 flex flex-col min-h-0 border-t lg:border-t-0 lg:border-l border-neutral-800">
            {/* Project Title */}
            <div className="px-6 py-6 border-b border-neutral-800 flex items-start justify-between gap-4 flex-shrink-0">
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-white mb-2">{project.title}</h2>
                {project.role && (
                  <p className="text-neutral-400 text-sm">{project.role}</p>
                )}
              </div>
              {/* Visit Website Icon Button */}
              {project.website && (
                <a
                  href={project.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-neutral-800/50 hover:bg-amber-500/20 border border-neutral-700/50 hover:border-amber-500/50 text-neutral-400 hover:text-amber-400 transition-all duration-300 group/btn"
                  title="Visit Website"
                  aria-label="Visit Website"
                >
                  <FaExternalLinkAlt className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                </a>
              )}
            </div>

            {/* Description - divider under */}
            <div className="px-6 py-6 border-b border-neutral-800 flex-shrink-0">
              <h3 className="text-sm font-semibold text-amber-400 mb-3 uppercase tracking-wider">Description</h3>
              <p className="text-neutral-300 leading-relaxed">{project.description}</p>
            </div>

            {/* Solution - fixed height, scroll inside when overflow */}
            {project.solution && (
              <div className="flex flex-col flex-shrink-0 px-6 py-6 border-b border-neutral-800">
                <h3 className="text-sm font-semibold text-amber-400 mb-3 uppercase tracking-wider">Solution</h3>
                <div className="h-[200px] max-h-[200px] min-h-0 shrink-0 overflow-y-auto overflow-x-hidden pr-1 solution-scrollbar">
                  <p className="text-neutral-300 leading-relaxed italic pr-1">{project.solution}</p>
                </div>
              </div>
            )}

            {/* Spacer: pushes Visit to bottom so it aligns with Technologies row */}
            <div className="flex-1 min-h-0" />

            {/* Visit Button - same row as Technologies (bottom), divider above */}
            {project.website && (
              <div className="px-6 py-4 border-t border-neutral-800 flex-shrink-0 flex items-center">
                <a
                  href={project.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-900 font-semibold transition-all duration-300 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40"
                >
                  <FaExternalLinkAlt className="w-4 h-4" />
                  <span>Visit Website</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Projects
