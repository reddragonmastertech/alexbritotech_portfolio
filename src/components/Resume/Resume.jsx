import { useState } from 'react'
import { FaDownload, FaGraduationCap, FaBriefcase, FaCode, FaAward, FaCalendarAlt, FaMapMarkerAlt, FaStar } from 'react-icons/fa'
import { HiSparkles, HiAcademicCap, HiOfficeBuilding } from 'react-icons/hi'
import { motion, AnimatePresence } from 'framer-motion'

function Resume() {
  const [activeTab, setActiveTab] = useState('education')

  const resumeLink = "/documents/GiaSi_Resume.pdf"

  // Education data
  const education = [
    {
      id: 1,
      degree: "Master of Computer Science",
      institution: "University of Technology",
      period: "2018 - 2020",
      location: "Ho Chi Minh City, Vietnam",
      gpa: "3.8/4.0",
      description: "Specialized in Software Engineering with focus on web application development. Thesis: 'Scalable Architecture Patterns for Modern Web Applications'",
      achievements: ["Dean's List", "Outstanding Thesis Award", "Programming Contest Winner"],
      courses: ["Advanced Algorithms", "Software Architecture", "Machine Learning", "Database Systems"]
    },
    {
      id: 2,
      degree: "Bachelor of Information Technology", 
      institution: "University of Science",
      period: "2014 - 2018",
      location: "Ho Chi Minh City, Vietnam",
      gpa: "3.6/4.0",
      description: "Strong foundation in computer science fundamentals with emphasis on software development and system design.",
      achievements: ["Magna Cum Laude", "Best Final Project", "Tech Club President"],
      courses: ["Data Structures", "Web Development", "Object-Oriented Programming", "Computer Networks"]
    }
  ]

  // Experience data
  const experience = [
    {
      id: 1,
      title: "Senior Full-Stack Developer",
      company: "Tech Innovation Co.",
      period: "2021 - Present",
      location: "Ho Chi Minh City, Vietnam",
      type: "Full-time",
      description: "Lead development of scalable web applications serving 100K+ users. Architect and implement microservices using modern technologies.",
      responsibilities: [
        "Lead a team of 5 developers in building enterprise applications",
        "Design and implement RESTful APIs and microservices architecture",
        "Optimize application performance resulting in 40% faster load times",
        "Mentor junior developers and conduct code reviews"
      ],
      technologies: ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS", "Docker"],
      achievements: ["Employee of the Year 2023", "Successfully delivered 15+ projects"]
    },
    {
      id: 2,
      title: "Frontend Developer",
      company: "Digital Solutions Ltd.",
      period: "2019 - 2021",
      location: "Ho Chi Minh City, Vietnam",
      type: "Full-time",
      description: "Developed responsive web applications and collaborated with UX/UI teams to create intuitive user interfaces.",
      responsibilities: [
        "Built responsive web applications using React and Vue.js",
        "Collaborated with design team to implement pixel-perfect UI",
        "Integrated third-party APIs and payment systems",
        "Implemented automated testing with Jest and Cypress"
      ],
      technologies: ["React", "Vue.js", "JavaScript", "Sass", "Firebase", "Git"],
      achievements: ["Best UI Implementation Award", "Zero-defect delivery record"]
    },
    {
      id: 3,
      title: "Junior Developer",
      company: "StartUp Hub",
      period: "2018 - 2019",
      location: "Ho Chi Minh City, Vietnam",
      type: "Part-time",
      description: "Started career developing small-scale applications and learning modern web technologies.",
      responsibilities: [
        "Developed and maintained company website",
        "Created internal tools for team productivity",
        "Participated in agile development processes",
        "Learned and applied best coding practices"
      ],
      technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
      achievements: ["Quick learner award", "First successful project delivery"]
    }
  ]

  // Skills data
  const skills = {
    frontend: [
      { name: "React", level: 95, icon: "⚛️" },
      { name: "Vue.js", level: 90, icon: "🖖" },
      { name: "TypeScript", level: 88, icon: "📘" },
      { name: "Next.js", level: 85, icon: "▲" },
      { name: "Tailwind CSS", level: 92, icon: "🎨" },
      { name: "Framer Motion", level: 80, icon: "🌟" }
    ],
    backend: [
      { name: "Node.js", level: 90, icon: "🟢" },
      { name: "Express.js", level: 88, icon: "🚀" },
      { name: "Python", level: 85, icon: "🐍" },
      { name: "PHP", level: 75, icon: "🐘" },
      { name: "PostgreSQL", level: 82, icon: "🐘" },
      { name: "MongoDB", level: 80, icon: "🍃" }
    ],
    tools: [
      { name: "Git", level: 95, icon: "📚" },
      { name: "Docker", level: 85, icon: "🐳" },
      { name: "AWS", level: 80, icon: "☁️" },
      { name: "Vercel", level: 88, icon: "△" },
      { name: "Figma", level: 75, icon: "🎨" },
      { name: "VS Code", level: 98, icon: "💻" }
    ]
  }

  // Certifications data
  const certifications = [
    {
      id: 1,
      name: "AWS Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2023",
      credentialId: "AWS-SA-12345",
      icon: "☁️"
    },
    {
      id: 2,
      name: "Google Cloud Professional",
      issuer: "Google Cloud",
      date: "2022",
      credentialId: "GCP-PRO-67890",
      icon: "🌤️"
    },
    {
      id: 3,
      name: "Meta Frontend Developer",
      issuer: "Meta",
      date: "2021",
      credentialId: "META-FE-11111",
      icon: "⚛️"
    }
  ]

  const tabs = [
    { id: 'education', label: 'Education', icon: FaGraduationCap, color: 'from-blue-500 to-cyan-500' },
    { id: 'experience', label: 'Experience', icon: FaBriefcase, color: 'from-purple-500 to-pink-500' },
    { id: 'skills', label: 'Skills', icon: FaCode, color: 'from-green-500 to-teal-500' },
    { id: 'certifications', label: 'Certificates', icon: FaAward, color: 'from-orange-500 to-red-500' }
  ]

  return (
    <main className="min-h-screen pt-28">
      <div className="max-w-7xl mx-auto px-6">
        {/* Enhanced Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-sm border mb-8 bg-white/80 border-white/30"
          >
            <HiAcademicCap className="w-6 h-6 text-blue-500" />
            <span className="text-lg font-semibold text-slate-700">
              Professional Resume
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            My{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Journey
            </span>
          </h1>

          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mb-8 rounded-full" />

          <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto mb-6">
            Explore my educational journey, professional experience, and technical expertise that shape my development career.
          </p>
          <div className="flex items-center justify-center gap-2 text-gray-500 mb-8">
            <HiSparkles className="text-purple-500" />
            <span className="text-sm font-medium">Updated {new Date().toLocaleDateString()}</span>
          </div>
          
          <motion.a
            href={resumeLink}
            download="GiaSi_Resume.pdf"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            target="_blank"
            rel="noreferrer"
          >
            <FaDownload className="mr-2" /> Download Resume
          </motion.a>
        </motion.div>

        {/* Enhanced Tabs */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white/80 backdrop-blur-sm rounded-3xl p-2 border border-gray-200 shadow-xl">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                className={`relative py-4 px-6 rounded-2xl transition-all duration-300 font-medium flex flex-col items-center gap-2 ${
                  activeTab === tab.id
                    ? 'text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className={`absolute inset-0 bg-gradient-to-r ${tab.color} rounded-2xl`}
                    transition={{ type: "spring", duration: 0.6 }}
                  />
                )}
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <tab.icon className="text-xl" />
                  <span className="text-sm">{tab.label}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 shadow-xl"
            >
              {/* Education Tab */}
              {activeTab === 'education' && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                    <FaGraduationCap className="text-blue-600" />
                    Educational Background
                  </h2>
                  {education.map((edu) => (
                    <motion.div
                      key={edu.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: edu.id * 0.1 }}
                      className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-blue-50 to-indigo-50"
                    >
                      <div className="flex flex-col md:flex-row md:items-start gap-6">
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <FaGraduationCap className="text-white text-2xl" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900 mb-1">{edu.degree}</h3>
                              <p className="text-blue-600 font-semibold mb-2">{edu.institution}</p>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-2 text-gray-600 mb-1">
                                <FaCalendarAlt className="text-sm" />
                                <span className="font-medium">{edu.period}</span>
                              </div>
                              <div className="flex items-center gap-2 text-gray-600">
                                <FaMapMarkerAlt className="text-sm" />
                                <span className="text-sm">{edu.location}</span>
                              </div>
                            </div>
                          </div>
                          <div className="mb-4">
                            <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                              <FaStar className="mr-1 text-xs" />
                              GPA: {edu.gpa}
                            </span>
                          </div>
                          <p className="text-gray-700 leading-relaxed mb-4">{edu.description}</p>
                          
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">Achievements</h4>
                              <ul className="space-y-1">
                                {edu.achievements.map((achievement, index) => (
                                  <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                                    {achievement}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">Key Courses</h4>
                              <div className="flex flex-wrap gap-2">
                                {edu.courses.map((course, index) => (
                                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium">
                                    {course}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Experience Tab */}
              {activeTab === 'experience' && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                    <FaBriefcase className="text-purple-600" />
                    Professional Experience
                  </h2>
                  {experience.map((exp) => (
                    <motion.div
                      key={exp.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: exp.id * 0.1 }}
                      className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-purple-50 to-pink-50"
                    >
                      <div className="flex flex-col md:flex-row md:items-start gap-6">
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <HiOfficeBuilding className="text-white text-2xl" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900 mb-1">{exp.title}</h3>
                              <p className="text-purple-600 font-semibold mb-2">{exp.company}</p>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-2 text-gray-600 mb-1">
                                <FaCalendarAlt className="text-sm" />
                                <span className="font-medium">{exp.period}</span>
                              </div>
                              <div className="flex items-center gap-2 text-gray-600">
                                <FaMapMarkerAlt className="text-sm" />
                                <span className="text-sm">{exp.location}</span>
                              </div>
                            </div>
                          </div>
                          <div className="mb-4">
                            <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                              {exp.type}
                            </span>
                          </div>
                          <p className="text-gray-700 leading-relaxed mb-6">{exp.description}</p>
                          
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-3">Key Responsibilities</h4>
                              <ul className="space-y-2">
                                {exp.responsibilities.map((resp, index) => (
                                  <li key={index} className="text-sm text-gray-700 flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                                    {resp}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-3">Technologies Used</h4>
                              <div className="flex flex-wrap gap-2">
                                {exp.technologies.map((tech, index) => (
                                  <span key={index} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">Achievements</h4>
                              <ul className="space-y-1">
                                {exp.achievements.map((achievement, index) => (
                                  <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                                    <FaStar className="text-yellow-500 text-xs" />
                                    {achievement}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Skills Tab */}
              {activeTab === 'skills' && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                    <FaCode className="text-green-600" />
                    Technical Skills
                  </h2>
                  
                  {Object.entries(skills).map(([category, skillList]) => (
                    <motion.div
                      key={category}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-6 border border-gray-200"
                    >
                      <h3 className="text-xl font-bold text-gray-900 mb-6 capitalize">
                        {category} Technologies
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        {skillList.map((skill, index) => (
                          <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-xl p-4 shadow-sm"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <span className="text-2xl">{skill.icon}</span>
                                <span className="font-semibold text-gray-900">{skill.name}</span>
                              </div>
                              <span className="text-sm font-medium text-gray-600">{skill.level}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <motion.div
                                className="bg-gradient-to-r from-green-500 to-teal-500 h-2 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.level}%` }}
                                transition={{ duration: 1, delay: index * 0.1 }}
                              />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Certifications Tab */}
              {activeTab === 'certifications' && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                    <FaAward className="text-orange-600" />
                    Certifications & Awards
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certifications.map((cert) => (
                      <motion.div
                        key={cert.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: cert.id * 0.1 }}
                        className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
                      >
                        <div className="text-center">
                          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-4">
                            <span className="text-2xl">{cert.icon}</span>
                          </div>
                          <h3 className="text-lg font-bold text-gray-900 mb-2">{cert.name}</h3>
                          <p className="text-orange-600 font-semibold mb-2">{cert.issuer}</p>
                          <div className="flex items-center justify-center gap-2 text-gray-600 mb-3">
                            <FaCalendarAlt className="text-sm" />
                            <span className="text-sm">{cert.date}</span>
                          </div>
                          <div className="bg-white rounded-lg p-3 border border-gray-200">
                            <p className="text-xs text-gray-500 mb-1">Credential ID</p>
                            <p className="text-sm font-mono text-gray-700">{cert.credentialId}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </main>
  )
}

export default Resume