import { useState, useCallback, useMemo } from 'react'
import { FaDownload, FaEye, FaFilePdf, FaSpinner, FaGraduationCap, FaBriefcase, FaCertificate, FaAward } from 'react-icons/fa'
import SEOHead from '../SEO/SEOHead'
import { SEO_CONFIGS } from '../SEO/seoConfigs'
import { motion, AnimatePresence } from 'framer-motion'

function Resume() {
  const [showPDF, setShowPDF] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Use useCallback to prevent unnecessary re-renders
  const handleViewPDF = useCallback(() => {
    setIsLoading(true)
    // Reduced loading time for better UX
    setTimeout(() => {
      setIsLoading(false)
      setShowPDF(true)
    }, 500)
  }, [])

  const handleDownloadPDF = useCallback(() => {
    const link = document.createElement('a')
    link.href = '/documents/GiaSi_Resume.pdf'
    link.download = 'GiaSi_Nguyen_Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }, [])

  // Memoize static data for performance
  const experiences = useMemo(() => [
    {
      title: "Senior Full Stack Developer",
      company: "TechCorp Solutions",
      period: "2022 - Present",
      location: "Ho Chi Minh City, Vietnam",
      achievements: [
        "Led development of 5+ enterprise applications using React and Node.js",
        "Improved system performance by 40% through code optimization",
        "Mentored junior developers and established coding best practices"
      ]
    },
    {
      title: "Full Stack Developer",
      company: "Digital Innovation Co.",
      period: "2020 - 2022",
      location: "Ho Chi Minh City, Vietnam",
      achievements: [
        "Developed responsive web applications for 20+ clients",
        "Implemented CI/CD pipelines reducing deployment time by 60%",
        "Collaborated with cross-functional teams to deliver projects on time"
      ]
    }
  ], []);

  // Education data - also memoized
  const education = useMemo(() => [
    {
      degree: "Bachelor of Computer Science",
      institution: "University of Technology",
      period: "2015 - 2019",
      location: "Ho Chi Minh City, Vietnam",
      gpa: "3.8/4.0"
    }
  ], []);

  // Certifications - memoized
  const certifications = useMemo(() => [
    {
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      year: "2023"
    },
    {
      name: "Google Cloud Professional Developer",
      issuer: "Google Cloud",
      year: "2022"
    },
    {
      name: "MongoDB Certified Developer",
      issuer: "MongoDB Inc.",
      year: "2021"
    }
  ], []);

  return (
    <>
      <SEOHead {...SEO_CONFIGS.resume} />
      <main className="section-padding pt-28 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-slate-100 min-h-screen relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-emerald-600/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header Section */}
          <div className="text-center mb-16">
            <motion.div
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-effect border border-slate-700/50 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <FaFilePdf className="w-6 h-6 text-emerald-400" />
              <span className="text-lg font-semibold text-slate-300">
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
              className="w-24 h-1.5 bg-gradient-to-r from-emerald-500 to-blue-500 mx-auto mb-8 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />

            <motion.p 
              className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Download my complete resume or view it online to learn more about 
              my professional experience, skills, and achievements.
            </motion.p>

            {/* Action Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.button
                onClick={handleViewPDF}
                disabled={isLoading}
                className="btn-primary inline-flex items-center gap-3 px-8 py-4 text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isLoading ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    <FaEye />
                    View Resume
                  </>
                )}
              </motion.button>

              <motion.button
                onClick={handleDownloadPDF}
                className="btn-secondary inline-flex items-center gap-3 px-8 py-4 text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaDownload />
                Download PDF
              </motion.button>
            </motion.div>
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
                <div className="glass-effect rounded-2xl p-8 border border-slate-700/50">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-slate-100">
                      Resume Preview
                    </h3>
                    <motion.button
                      onClick={() => setShowPDF(false)}
                      className="text-slate-400 hover:text-slate-200 text-2xl"
                      whileHover={{ rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      ×
                    </motion.button>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl p-4">
                    <iframe
                      src="/documents/GiaSi_Resume.pdf"
                      className="w-full h-[600px] rounded-lg"
                      title="Resume PDF"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Experience Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-effect border border-slate-700/50 mb-6">
                <FaBriefcase className="w-5 h-5 text-blue-400" />
                <span className="text-lg font-semibold text-slate-300">
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
                  className="glass-effect rounded-2xl p-8 border border-slate-700/50"
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
                      <h3 className="text-xl font-bold text-slate-100 mb-1">
                        {exp.title}
                      </h3>
                      <p className="text-blue-400 font-semibold">
                        {exp.company}
                      </p>
                    </div>
                    <div className="text-slate-400 text-sm mt-2 md:mt-0 text-right">
                      <p>{exp.period}</p>
                      <p>{exp.location}</p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <li
                        key={i}
                        className="text-slate-300 flex items-start gap-3"
                      >
                        <span className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education & Certifications */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Education */}
            <div>
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-effect border border-slate-700/50 mb-4">
                  <FaGraduationCap className="w-5 h-5 text-emerald-400" />
                  <span className="text-lg font-semibold text-slate-300">
                    Education
                  </span>
                </div>
                <h2 className="text-2xl font-bold gradient-text">
                  Academic Background
                </h2>
              </div>

              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  className="glass-effect rounded-2xl p-6 border border-slate-700/50"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                >
                  <h3 className="text-lg font-bold text-slate-100 mb-2">
                    {edu.degree}
                  </h3>
                  <p className="text-emerald-400 font-semibold mb-1">
                    {edu.institution}
                  </p>
                  <div className="flex justify-between items-center text-slate-400 text-sm mb-2">
                    <span>{edu.period}</span>
                    <span>{edu.location}</span>
                  </div>
                  <p className="text-slate-300 font-semibold">
                    GPA: {edu.gpa}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Certifications */}
            <div>
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-effect border border-slate-700/50 mb-4">
                  <FaCertificate className="w-5 h-5 text-yellow-400" />
                  <span className="text-lg font-semibold text-slate-300">
                    Certifications
                  </span>
                </div>
                <h2 className="text-2xl font-bold gradient-text">
                  Professional Certifications
                </h2>
              </div>

              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    className="glass-effect rounded-xl p-6 border border-slate-700/50"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      x: 5,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <FaAward className="text-yellow-400" />
                      <h3 className="font-bold text-slate-100">
                        {cert.name}
                      </h3>
                    </div>
                    <p className="text-slate-400 text-sm">
                      {cert.issuer} • {cert.year}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <motion.div
            className="text-center glass-effect rounded-3xl p-12 border border-slate-700/50"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6"
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <FaDownload className="text-white text-2xl" />
            </motion.div>

            <h3 className="text-3xl font-bold text-slate-100 mb-4">
              Ready to collaborate?
            </h3>

            <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
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
      </main>
    </>
  )
}

export default Resume
