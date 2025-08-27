import { useState, useMemo, useCallback } from 'react'
import { FaRocket, FaFilter, FaTimes, FaChevronDown, FaChevronUp } from 'react-icons/fa'
import LazyProjectCard from './LazyProjectCard'
import { useProjects, getProjectCategories } from '../../hooks/useProjects'
import { CardSkeleton } from '../UI/LoadingSpinner'
import SEOHead from '../SEO/SEOHead'
import { SEO_CONFIGS } from '../SEO/seoConfigs'
import { motion, AnimatePresence } from 'framer-motion'

function Projects() {
  const [filter, setFilter] = useState('all')
  const [showAll, setShowAll] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  // Use custom hook to load projects
  const { projects = [], loading, error, filteredProjects = [] } = useProjects(filter)

  // Get available categories with memoization
  const categories = useMemo(() => getProjectCategories(Array.isArray(projects) ? projects : []), [projects])

  // Limit projects display - show only when expanded
  const displayedProjects = useMemo(() => {
    if (!showAll || !Array.isArray(filteredProjects)) return [] // Hide all projects by default
    return filteredProjects
  }, [filteredProjects, showAll])

  // Filter handler with useCallback to prevent unnecessary re-renders
  const handleFilterChange = useCallback((newFilter) => {
    setFilter(newFilter)
    setShowAll(false) // Reset to show limited when filter changes
  }, [])

  // Toggle show all projects
  const toggleShowAll = useCallback(() => {
    setShowAll(prev => !prev)
  }, [])

  // Toggle filters visibility
  const toggleFilters = useCallback(() => {
    setShowFilters(prev => !prev)
  }, [])

  // Optimized loading skeleton
  if (loading) {
    return (
      <main className="section-padding pt-28 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Skeleton Header */}
          <div className="text-center mb-16">
            <motion.div 
              className="inline-flex items-center gap-3 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-12 h-12 bg-slate-700/50 rounded-2xl animate-pulse" />
              <div className="w-48 h-8 bg-slate-700/50 rounded-xl animate-pulse" />
            </motion.div>
            <div className="space-y-4">
              <div className="w-96 h-12 bg-slate-700/50 rounded-lg mx-auto animate-pulse" />
              <div className="w-64 h-6 bg-slate-600/50 rounded-lg mx-auto animate-pulse" />
            </div>
          </div>

          {/* Skeleton Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <div className="section-padding pt-28 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-xl mb-4">Error loading projects</p>
          <p className="text-slate-400">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <SEOHead {...SEO_CONFIGS.projects} />
      <section className="section-padding pt-28">
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <motion.div 
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8,
              ease: [0.25, 0.1, 0.25, 1]
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-effect border border-slate-700/50 mb-8"
            >
              <FaRocket className="w-6 h-6 text-blue-400" />
              <span className="text-lg font-semibold text-slate-300">
                Featured Work
              </span>
            </motion.div>

            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              My <span className="gradient-text">Projects</span>
            </motion.h1>

            <motion.div 
              className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-violet-500 mx-auto mb-8 rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />

            <motion.p 
              className="text-slate-300 text-lg max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              A showcase of my technical skills and problem-solving abilities through 
              real-world applications and innovative solutions.
            </motion.p>

            {/* Toggle Filters Button */}
            <motion.button
              onClick={toggleFilters}
              className="inline-flex items-center gap-2 glass-effect border border-slate-700/50 text-slate-300 hover:text-blue-400 hover:border-blue-500/50 px-6 py-3 rounded-xl transition-all duration-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <FaFilter className="text-sm" />
              <span>Filters</span>
              {showFilters ? <FaChevronUp className="text-sm" /> : <FaChevronDown className="text-sm" />}
            </motion.button>
          </motion.div>

          {/* Filter Options - Collapsible */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                className="mb-12"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-wrap justify-center gap-3">
                  {Array.isArray(categories) && categories.map((category) => (
                    <motion.button
                      key={category.value}
                      onClick={() => handleFilterChange(category.value)}
                      className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                        filter === category.value
                          ? 'bg-blue-600/20 border-2 border-blue-400/60 text-blue-300 shadow-lg shadow-blue-500/20'
                          : 'glass-effect border border-slate-700/50 text-slate-300 hover:border-slate-600 hover:text-slate-200'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {category.label}
                      {category.count > 0 && (
                        <span className="ml-2 text-xs opacity-70">
                          ({category.count})
                        </span>
                      )}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Compact Show/Hide Projects Button */}
          {filteredProjects.length > 0 && (
            <motion.div 
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <button
                onClick={toggleShowAll}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25 transform hover:-translate-y-1 hover:scale-105"
              >
                {showAll ? (
                  <>
                    <FaChevronUp className="text-sm" />
                    Hide Projects
                  </>
                ) : (
                  <>
                    <FaChevronDown className="text-sm" />
                    View All Projects
                  </>
                )}
              </button>
            </motion.div>
          )}

          {/* Compact Projects Preview */}
          {!showAll ? (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="glass-effect rounded-xl p-8 max-w-md mx-auto">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500/20 to-violet-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <FaRocket className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-300 mb-2">Ready to Explore?</h3>
                <p className="text-slate-400 text-sm">
                  Click above to discover my latest projects
                </p>
              </div>
            </motion.div>
          ) : (
            <>
              <AnimatePresence mode="popLayout">
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
                  layout
                >
                  {displayedProjects.map((project, index) => (
                    <LazyProjectCard
                      key={`${project.id}-${filter}`}
                      project={project}
                      index={index}
                      className="h-full"
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            </>
          )}
        </div>
      </section>
    </>
  )
}

export default Projects
