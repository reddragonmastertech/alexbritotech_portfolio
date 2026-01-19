import { useState, useCallback } from 'react'
import { FaDownload, FaEye, FaFilePdf, FaSpinner, FaGraduationCap, FaBriefcase } from 'react-icons/fa'
import SEOHead from '../SEO/SEOHead'
import { SEO_CONFIGS } from '../SEO/seoConfigs'
import { motion, AnimatePresence } from 'framer-motion'
import resumeData from '../../data/resume.json'

function Resume() {
  const [showPDF, setShowPDF] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [pdfError, setPdfError] = useState(false)

  // Use useCallback to prevent unnecessary re-renders
  const handleViewPDF = useCallback(() => {
    setIsLoading(true)
    setPdfError(false)
    // Reduced loading time for better UX
    setTimeout(() => {
      setIsLoading(false)
      setShowPDF(true)
    }, 500)
  }, [])

  const handleDownloadPDF = useCallback(() => {
    const link = document.createElement('a')
    link.href = resumeData.pdf.path
    link.download = resumeData.pdf.fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }, [])
  
  // Use data from JSON file
  const experiences = resumeData.experiences
  const education = resumeData.education



  return (
    <>
      <SEOHead {...SEO_CONFIGS.resume} />
      <section className="section-padding pt-28">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <motion.div
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-effect border border-neutral-700/50 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <FaFilePdf className="w-6 h-6 text-amber-400" />
              <span className="text-lg font-semibold text-neutral-300">
                Professional Resume
              </span>
            </motion.div>

            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              My <span className="gradient-text">Resume</span>
            </motion.h1>

            <motion.div 
              className="w-24 h-1.5 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto mb-8 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />

            <motion.p 
              className="text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Download my complete resume or view it online to learn more about 
              my professional experience, skills, and achievements.
            </motion.p>

          </div>

          {/* PDF Viewer */}
          <AnimatePresence>
            {showPDF && (
              <motion.div
                className="mb-16"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.6 }}
              >
                <div className="glass-effect rounded-2xl p-8 border border-neutral-700/50">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-neutral-100">
                        Resume Preview
                      </h3>
                      <p className="text-neutral-400 text-sm mt-1">
                        {resumeData.pdf.fileName}
                      </p>
                    </div>
                    <motion.button
                      onClick={() => setShowPDF(false)}
                      className="text-neutral-400 hover:text-neutral-200 text-2xl p-2 hover:bg-neutral-700/50 rounded-lg transition-all duration-300"
                      whileHover={{ rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      ×
                    </motion.button>
                  </div>
                  <div className="bg-neutral-800/50 rounded-xl p-4">
                    <iframe
                      src={`${resumeData.pdf.path}#toolbar=1&navpanes=1&scrollbar=1&page=1&view=FitH`}
                      className="w-full h-[600px] rounded-lg border border-neutral-700/30"
                      title="Resume PDF"
                      loading="lazy"
                      onError={() => setPdfError(true)}
                      onLoad={() => setPdfError(false)}
                    />
                    
                    {/* Fallback for browsers that don't support PDF viewing */}
                    <div className={`text-center mt-4 p-4 bg-neutral-700/30 rounded-lg ${pdfError ? 'bg-red-900/20 border border-red-500/30' : ''}`}>
                      <p className="text-neutral-400 text-sm mb-3">
                        {pdfError ? 'PDF failed to load, but you can still access it!' : "Can't see the PDF? No problem!"}
                      </p>
                      <div className="flex gap-4 justify-center">
                        <a
                          href={resumeData.pdf.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-neutral-900 font-medium px-4 py-2 rounded-lg text-sm transition-colors duration-300"
                        >
                          <FaEye className="text-sm" />
                          View in Browser
                        </a>
                        <button
                          onClick={handleDownloadPDF}
                          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-300"
                        >
                          <FaDownload className="text-sm" />
                          Download PDF
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Experience Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-effect border border-neutral-700/50 mb-6">
                <FaBriefcase className="w-5 h-5 text-amber-400" />
                <span className="text-lg font-semibold text-neutral-300">
                  Work Experience
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold gradient-text">
                Professional Journey
              </h2>
            </div>

            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  className="glass-effect rounded-2xl p-8 border border-neutral-700/50"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    y: -5,
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-neutral-100 mb-1">
                        {exp.title}
                      </h3>
                      <p className="text-amber-400 font-semibold">
                        {exp.company}
                      </p>
                    </div>
                    <div className="text-neutral-400 text-sm mt-2 md:mt-0 text-right">
                      <p>{exp.period}</p>
                      <p>{exp.location}</p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <li
                        key={i}
                        className="text-neutral-300 flex items-start gap-3"
                      >
                        <span className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education Section */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-effect border border-neutral-700/50 mb-4">
                <FaGraduationCap className="w-5 h-5 text-amber-400" />
                <span className="text-lg font-semibold text-neutral-300">
                  Education
                </span>
              </div>
              <h2 className="text-2xl font-bold gradient-text">
                Academic Background
              </h2>
            </div>

            <div className="space-y-6">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  className="glass-effect rounded-2xl p-6 border border-neutral-700/50"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                >
                  <h3 className="text-lg font-bold text-neutral-100 mb-2">
                    {edu.degree}
                  </h3>
                  <p className="text-amber-400 font-semibold mb-1">
                    {edu.institution}
                  </p>
                  <div className="flex justify-between items-center text-neutral-400 text-sm mb-2">
                    <span>{edu.period}</span>
                    <span>{edu.location}</span>
                  </div>
                  <p className="text-neutral-300 font-semibold mb-3">
                    GPA: {edu.gpa}
                  </p>
                  {edu.details && (
                    <p className="text-neutral-400 text-sm leading-relaxed">
                      {edu.details}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
          {/* Call to Action */}
          <motion.div
            className="text-center glass-effect rounded-3xl p-12 border border-neutral-700/50"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="w-16 h-16 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6"
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <FaDownload className="text-neutral-900 text-2xl" />
            </motion.div>

            <h3 className="text-3xl font-bold text-neutral-100 mb-4">
              Ready to collaborate?
            </h3>

            <p className="text-neutral-400 text-lg mb-8 max-w-2xl mx-auto">
              Download my full resume for detailed information about my experience, 
              projects, and technical skills. Let's build something amazing together!
            </p>

            <motion.button
              onClick={handleDownloadPDF}
              className="btn-primary inline-flex items-center gap-3 px-8 py-4 text-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              viewport={{ once: true }}
            >
              <FaDownload />
              Get My Resume
            </motion.button>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default Resume
