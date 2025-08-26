import { useState, useMemo, useCallback } from 'react'
import { FaRocket, FaFilter, FaTimes } from 'react-icons/fa'
import LazyProjectCard from './LazyProjectCard'
import { useProjects, getProjectCategories } from '../../hooks/useProjects'
import { CardSkeleton } from '../UI/LoadingSpinner'
import SEOHead from '../SEO/SEOHead'
import { SEO_CONFIGS } from '../SEO/seoConfigs'
import { motion, AnimatePresence } from 'framer-motion'

function Projects() {
  const [filter, setFilter] = useState('all')

  // Use custom hook to load projects
  const { projects, loading, error, filteredProjects } = useProjects(filter)

  // Get available categories with memoization
  const categories = useMemo(() => getProjectCategories(projects), [projects])

  // Filter handler with useCallback to prevent unnecessary re-renders
  const handleFilterChange = useCallback((newFilter) => {
    setFilter(newFilter)
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

          {/* Skeleton Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div 
                key={i} 
                className="w-24 h-10 bg-slate-700/50 rounded-xl animate-pulse"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1, duration: 0.3 }}
              />
            ))}
          </div>

          {/* Skeleton Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.3 }}
              >
                <CardSkeleton />
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    )
  }

  // Enhanced error state
  if (error) {
    return (
      <main className="section-padding pt-28 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="glass-effect rounded-2xl p-12 max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto mb-6 bg-red-500/20 rounded-full flex items-center justify-center">
                <FaTimes className="text-red-400 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-slate-100 mb-4">Oops! Something went wrong</h3>
              <p className="text-red-400 text-lg mb-6">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="btn-primary inline-flex items-center gap-2"
              >
                <FaRocket />
                Try Again
              </button>
            </div>
          </motion.div>
        </div>
      </main>
    )
  }

  return (
    <>
      <SEOHead {...SEO_CONFIGS.projects} />
      <main className="section-padding pt-28 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-slate-100 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-violet-600/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
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
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />

            <motion.p 
              className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              A collection of projects that showcase my skills in full-stack development, 
              from enterprise applications to modern web solutions.
            </motion.p>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 mr-4 text-slate-400"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <FaFilter className="text-sm" />
              <span className="text-sm font-medium">Filter by:</span>
            </motion.div>

            {['all', ...categories].map((category, index) => (
              <motion.button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                  filter === category
                    ? 'bg-gradient-to-r from-blue-500 to-violet-500 text-white shadow-lg shadow-blue-500/25'
                    : 'glass-effect border border-slate-700/50 text-slate-400 hover:text-slate-200 hover:border-slate-600/50'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                {category === 'all' ? 'All Projects' : category}
              </motion.button>
            ))}
          </motion.div>

          {/* Optimized Projects Grid with AnimatePresence */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={filter}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {filteredProjects.map((project, index) => (
                <LazyProjectCard 
                  key={project.id} 
                  project={project} 
                  index={index}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Enhanced No Projects Message */}
          {filteredProjects.length === 0 && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="glass-effect rounded-2xl p-12 max-w-md mx-auto">
                <FaFilter className="text-4xl text-slate-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-slate-100 mb-4">
                  No Projects Found
                </h3>
                <p className="text-slate-400 text-lg mb-8">
                  No projects match the selected filter. Try selecting a different category.
                </p>
                <motion.button
                  onClick={() => setFilter('all')}
                  className="btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Show All Projects
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Call to Action with Performance Optimization */}
          <motion.div
            className="text-center mt-20 py-16 glass-effect rounded-3xl border border-slate-700/50"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              className="w-16 h-16 bg-gradient-to-r from-blue-500 to-violet-500 rounded-2xl flex items-center justify-center mx-auto mb-6"
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <FaRocket className="text-white text-2xl" />
            </motion.div>

            <motion.h3 
              className="text-3xl font-bold text-slate-100 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Want to see more?
            </motion.h3>

            <motion.p 
              className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Check out my GitHub for more projects, open-source contributions, 
              and code snippets that showcase my development journey.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <a
                href="https://github.com/giasinguyen"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-3"
              >
                <FaRocket className="text-lg" />
                Visit GitHub Profile
              </a>
              
              <div className="text-slate-400">
                Showing {filteredProjects.length} of {projects.length} projects
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </>
  )
}

export default Projects
