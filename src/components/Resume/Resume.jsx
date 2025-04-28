import { useState, useEffect } from 'react'
import { FaDownload, FaGraduationCap, FaBriefcase, FaCode, FaServer, FaPalette } from 'react-icons/fa'

function Resume() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState('education')

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const resumeLink = "/your-resume.pdf" // Update with your actual resume PDF link

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
            Below you'll find my educational background, work experience, and technical skills.
            Feel free to download my complete resume for more details.
          </p>
          <div className="mt-6">
            <a
              href={resumeLink}
              download="GiaSi_Resume.pdf"
              className="btn-primary inline-flex items-center"
              target="_blank"
              rel="noreferrer"
            >
              <FaDownload className="mr-2" /> Download Resume
            </a>
          </div>
        </div>

        {/* Resume Content */}
        <div className={`max-w-4xl mx-auto transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {/* Tabs */}
          <div className="flex flex-wrap justify-center mb-8 border-b border-slate-700">
            <button
              className={`py-3 px-6 flex items-center ${
                activeTab === 'education'
                  ? 'text-sky-400 border-b-2 border-sky-400'
                  : 'text-slate-400 hover:text-slate-300'
              }`}
              onClick={() => setActiveTab('education')}
            >
              <FaGraduationCap className="mr-2" /> Education
            </button>
            <button
              className={`py-3 px-6 flex items-center ${
                activeTab === 'experience'
                  ? 'text-sky-400 border-b-2 border-sky-400'
                  : 'text-slate-400 hover:text-slate-300'
              }`}
              onClick={() => setActiveTab('experience')}
            >
              <FaBriefcase className="mr-2" /> Experience
            </button>
            <button
              className={`py-3 px-6 flex items-center ${
                activeTab === 'skills'
                  ? 'text-sky-400 border-b-2 border-sky-400'
                  : 'text-slate-400 hover:text-slate-300'
              }`}
              onClick={() => setActiveTab('skills')}
            >
              <FaCode className="mr-2" /> Skills
            </button>
          </div>

          {/* Tab Content */}
          <div className="bg-slate-800 rounded-lg p-6 shadow-lg">
            {/* Education Tab */}
            {activeTab === 'education' && (
              <div className="space-y-8">
                <div className="flex">
                  <div className="mr-4 pt-1">
                    <div className="h-12 w-12 rounded-full bg-sky-500/20 flex items-center justify-center">
                      <FaGraduationCap className="text-sky-400 text-xl" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Master of Computer Science</h3>
                    <p className="text-sky-400 font-medium mb-2">University of Technology • 2018 - 2020</p>
                    <p className="text-slate-300">
                      Specialized in Software Engineering with a focus on web application development.
                      Graduated with honors and completed a thesis on scalable architecture patterns for modern web applications.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="mr-4 pt-1">
                    <div className="h-12 w-12 rounded-full bg-sky-500/20 flex items-center justify-center">
                      <FaGraduationCap className="text-sky-400 text-xl" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Bachelor of Information Technology</h3>
                    <p className="text-sky-400 font-medium mb-2">Tech University • 2014 - 2018</p>
                    <p className="text-slate-300">
                      Studied computer science with a specialization in web technologies and software development.
                      Completed various projects including a library management system and e-commerce platform.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="mr-4 pt-1">
                    <div className="h-12 w-12 rounded-full bg-sky-500/20 flex items-center justify-center">
                      <FaGraduationCap className="text-sky-400 text-xl" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Web Development Certification</h3>
                    <p className="text-sky-400 font-medium mb-2">Online Academy • 2017</p>
                    <p className="text-slate-300">
                      Completed intensive training in modern web development practices, including
                      responsive design, JavaScript frameworks, and server-side programming.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Experience Tab */}
            {activeTab === 'experience' && (
              <div className="space-y-8">
                <div className="flex">
                  <div className="mr-4 pt-1">
                    <div className="h-12 w-12 rounded-full bg-sky-500/20 flex items-center justify-center">
                      <FaBriefcase className="text-sky-400 text-xl" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Senior Frontend Developer</h3>
                    <p className="text-sky-400 font-medium mb-2">TechCorp Inc. • 2021 - Present</p>
                    <p className="text-slate-300 mb-3">
                      Lead the frontend development team in creating responsive, interactive web applications using React, TypeScript and modern web technologies.
                    </p>
                    <ul className="list-disc list-inside text-slate-400 space-y-1">
                      <li>Architected and implemented the company's design system</li>
                      <li>Reduced application bundle size by 35% through code optimization</li>
                      <li>Mentored junior developers and led technical interviews</li>
                      <li>Collaborated with design and backend teams to deliver high-quality products</li>
                    </ul>
                  </div>
                </div>

                <div className="flex">
                  <div className="mr-4 pt-1">
                    <div className="h-12 w-12 rounded-full bg-sky-500/20 flex items-center justify-center">
                      <FaBriefcase className="text-sky-400 text-xl" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Full Stack Developer</h3>
                    <p className="text-sky-400 font-medium mb-2">WebSolutions • 2019 - 2021</p>
                    <p className="text-slate-300 mb-3">
                      Developed and maintained full-stack web applications for various clients using React, Node.js, and MongoDB.
                    </p>
                    <ul className="list-disc list-inside text-slate-400 space-y-1">
                      <li>Built RESTful APIs and integrated third-party services</li>
                      <li>Implemented authentication systems and database architectures</li>
                      <li>Conducted code reviews and implemented testing strategies</li>
                      <li>Participated in agile development processes with daily standups</li>
                    </ul>
                  </div>
                </div>

                <div className="flex">
                  <div className="mr-4 pt-1">
                    <div className="h-12 w-12 rounded-full bg-sky-500/20 flex items-center justify-center">
                      <FaBriefcase className="text-sky-400 text-xl" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Junior Web Developer</h3>
                    <p className="text-sky-400 font-medium mb-2">DigitalCraft • 2018 - 2019</p>
                    <p className="text-slate-300 mb-3">
                      Assisted in the development of websites and web applications for small to medium businesses.
                    </p>
                    <ul className="list-disc list-inside text-slate-400 space-y-1">
                      <li>Created responsive layouts using HTML, CSS, and JavaScript</li>
                      <li>Implemented website features and functionality as specified</li>
                      <li>Debugged issues across different browsers and devices</li>
                      <li>Collaborated with designers to ensure visual consistency</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Skills Tab */}
            {activeTab === 'skills' && (
              <div>
                {/* Frontend Skills */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <FaCode className="mr-2 text-sky-400" /> Frontend Development
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-slate-300">React.js</span>
                          <span className="text-sky-400">95%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div className="bg-sky-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-slate-300">JavaScript</span>
                          <span className="text-sky-400">90%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div className="bg-sky-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-slate-300">TypeScript</span>
                          <span className="text-sky-400">85%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div className="bg-sky-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-slate-300">HTML/CSS</span>
                          <span className="text-sky-400">95%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div className="bg-sky-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-slate-300">TailwindCSS</span>
                          <span className="text-sky-400">90%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div className="bg-sky-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-slate-300">Three.js</span>
                          <span className="text-sky-400">75%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div className="bg-sky-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Backend Skills */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <FaServer className="mr-2 text-sky-400" /> Backend Development
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-slate-300">Node.js</span>
                          <span className="text-sky-400">85%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div className="bg-sky-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-slate-300">Express.js</span>
                          <span className="text-sky-400">80%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div className="bg-sky-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-slate-300">MongoDB</span>
                          <span className="text-sky-400">80%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div className="bg-sky-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-slate-300">SQL</span>
                          <span className="text-sky-400">75%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div className="bg-sky-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Other Skills */}
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <FaPalette className="mr-2 text-sky-400" /> Design & Tools
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-slate-300">Git</span>
                          <span className="text-sky-400">90%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div className="bg-sky-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-slate-300">Figma</span>
                          <span className="text-sky-400">70%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div className="bg-sky-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-slate-300">Responsive Design</span>
                          <span className="text-sky-400">95%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div className="bg-sky-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-slate-300">UI/UX Principles</span>
                          <span className="text-sky-400">85%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div className="bg-sky-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Resume