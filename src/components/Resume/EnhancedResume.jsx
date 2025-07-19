import { useState, useEffect } from 'react'
import { FaDownload, FaGraduationCap, FaBriefcase, FaCode, FaServer, FaPalette, FaCertificate, FaLanguage, FaEye } from 'react-icons/fa'
import PDFViewer from '../Layout/PDFViewer'
import { PDF_DATA, PDF_CONFIG, formatResumeSection } from '../../utils/pdfUtils'

function EnhancedResume() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  
  // Get resume data from PDF utils
  const resumeData = PDF_DATA.resume
  
  useEffect(() => {
    setIsVisible(true)
  }, [])

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FaCode },
    { id: 'experience', label: 'Experience', icon: FaBriefcase },
    { id: 'education', label: 'Education', icon: FaGraduationCap },
    { id: 'skills', label: 'Skills', icon: FaServer },
    { id: 'projects', label: 'Projects', icon: FaPalette },
    { id: 'certifications', label: 'Certifications', icon: FaCertificate },
    { id: 'pdf', label: 'PDF View', icon: FaEye }
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <Motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Personal Info */}
            <div className="card">
              <h3 className="text-2xl font-bold mb-4 blue-gradient-text">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-slate-300"><strong>Name:</strong> {resumeData.personalInfo.name}</p>
                  <p className="text-slate-300"><strong>Email:</strong> {resumeData.personalInfo.email}</p>
                  <p className="text-slate-300"><strong>Phone:</strong> {resumeData.personalInfo.phone}</p>
                </div>
                <div>
                  <p className="text-slate-300"><strong>Location:</strong> {resumeData.personalInfo.location}</p>
                  <p className="text-slate-300">
                    <strong>LinkedIn:</strong> 
                    <a href={`https://${resumeData.personalInfo.linkedin}`} 
                       className="text-sky-400 hover:text-sky-300 ml-2" 
                       target="_blank" 
                       rel="noreferrer">
                      {resumeData.personalInfo.linkedin}
                    </a>
                  </p>
                  <p className="text-slate-300">
                    <strong>GitHub:</strong>
                    <a href={`https://${resumeData.personalInfo.github}`} 
                       className="text-sky-400 hover:text-sky-300 ml-2" 
                       target="_blank" 
                       rel="noreferrer">
                      {resumeData.personalInfo.github}
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Professional Summary */}
            <div className="card">
              <h3 className="text-2xl font-bold mb-4 blue-gradient-text">Professional Summary</h3>
              <p className="text-slate-300 leading-relaxed">{resumeData.summary}</p>
            </div>

            {/* Languages */}
            <div className="card">
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <FaLanguage className="mr-2 text-sky-400" />
                Languages
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {resumeData.languages.map((language, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-slate-700 rounded-lg">
                    <span className="text-slate-300">{language.name}</span>
                    <span className="text-sky-400 text-sm">{language.level}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )

      case 'experience':
        return (
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {formatResumeSection(resumeData.experience, 'experience').map((exp) => (
              <div key={exp.id} className="card">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-sky-400">{exp.title}</h3>
                    <p className="text-lg text-slate-300">{exp.company}</p>
                    <p className="text-slate-400">{exp.location}</p>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <span className="bg-sky-500/20 text-sky-400 px-3 py-1 rounded-full text-sm">
                      {exp.duration}
                    </span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-slate-200 mb-2">Key Responsibilities:</h4>
                  <ul className="space-y-1">
                    {exp.responsibilities.map((resp, index) => (
                      <li key={index} className="text-slate-300 flex">
                        <span className="text-sky-400 mr-2">•</span>
                        {resp}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-200 mb-2">Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, index) => (
                      <span key={index} className="bg-slate-700 text-sky-400 px-2 py-1 rounded text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )

      case 'education':
        return (
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {resumeData.education.map((edu) => (
              <div key={edu.id} className="card">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-sky-400">{edu.degree}</h3>
                    <p className="text-lg text-slate-300">{edu.institution}</p>
                    <p className="text-slate-400">GPA: {edu.gpa}</p>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <span className="bg-sky-500/20 text-sky-400 px-3 py-1 rounded-full text-sm">
                      {edu.duration}
                    </span>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-slate-200 mb-2">Achievements:</h4>
                  <ul className="space-y-1">
                    {edu.achievements.map((achievement, index) => (
                      <li key={index} className="text-slate-300 flex">
                        <span className="text-sky-400 mr-2">•</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </motion.div>
        )

      case 'skills': {
        const skillsData = formatResumeSection(resumeData.skills, 'skills')
        return (
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Technical Skills */}
            <div className="card">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <FaCode className="mr-2 text-sky-400" />
                Technical Skills
              </h3>
              
              {Object.entries(skillsData.categorized).map(([category, skills]) => (
                <div key={category} className="mb-6">
                  <h4 className="text-lg font-semibold text-slate-200 mb-3 capitalize">
                    {category} Development
                  </h4>
                  <div className="space-y-3">
                    {skills.map((skill, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-1">
                          <span className="text-slate-300">{skill.name}</span>
                          <span className="text-sky-400">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div 
                            className="bg-sky-500 h-2 rounded-full transition-all duration-1000" 
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Soft Skills */}
            <div className="card">
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <FaPalette className="mr-2 text-sky-400" />
                Soft Skills
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {resumeData.skills.soft.map((skill, index) => (
                  <div key={index} className="bg-slate-700 p-3 rounded-lg text-center">
                    <span className="text-slate-300">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )
      }

      case 'projects':
        return (
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {formatResumeSection(resumeData.projects, 'projects').map((project) => (
              <div key={project.id} className="card">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-sky-400">{project.name}</h3>
                    <p className="text-slate-300 mt-2">{project.description}</p>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <a 
                      href={project.url} 
                      target="_blank" 
                      rel="noreferrer"
                      className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      View Project
                    </a>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-slate-200 mb-2">Key Highlights:</h4>
                  <ul className="space-y-1">
                    {project.highlights.map((highlight, index) => (
                      <li key={index} className="text-slate-300 flex">
                        <span className="text-sky-400 mr-2">•</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-200 mb-2">Technologies Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="bg-slate-700 text-sky-400 px-2 py-1 rounded text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )

      case 'certifications':
        return (
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {resumeData.certifications.map((cert) => (
              <div key={cert.id} className="card">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                  <div>
                    <h3 className="text-xl font-bold text-sky-400">{cert.name}</h3>
                    <p className="text-lg text-slate-300">{cert.issuer}</p>
                    <p className="text-slate-400">Credential ID: {cert.credentialId}</p>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <span className="bg-sky-500/20 text-sky-400 px-3 py-1 rounded-full text-sm">
                      {cert.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )

      case 'pdf':
        return (
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <PDFViewer 
              pdfPath={PDF_CONFIG.RESUME_PATH}
              title="GiaSi Resume"
              showControls={true}
              defaultScale={1.2}
              onLoadSuccess={(numPages) => console.log(`PDF loaded with ${numPages} pages`)}
              onError={(error) => console.error('PDF loading error:', error)}
            />
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <main className="section-padding pt-28">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="blue-gradient-text">Resume</span>
          </h1>
          <div className="w-24 h-1 bg-sky-500 mx-auto mb-8"></div>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Comprehensive overview of my professional experience, education, and skills.
            All data is dynamically loaded from structured PDF content.
          </p>
          <div className="mt-6">
            <a
              href={PDF_CONFIG.RESUME_PATH}
              download="GiaSi_Resume.pdf"
              className="btn-primary inline-flex items-center"
            >
              <FaDownload className="mr-2" /> Download Resume
            </a>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex flex-wrap justify-center mb-8 border-b border-slate-700">
          {tabs.map((tab) => {
            const IconComponent = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-6 flex items-center transition-colors ${
                  activeTab === tab.id
                    ? 'text-sky-400 border-b-2 border-sky-400'
                    : 'text-slate-400 hover:text-slate-300'
                }`}
              >
                <IconComponent className="mr-2" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Tab Content */}
        <div className={`max-w-4xl mx-auto transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {renderTabContent()}
        </div>
      </div>
    </main>
  )
}

export default EnhancedResume
