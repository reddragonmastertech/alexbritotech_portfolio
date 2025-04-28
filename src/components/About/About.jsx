import { useState, useEffect } from 'react'
import { FaServer, FaReact, FaDatabase } from 'react-icons/fa'
import { SiJavascript, SiTypescript, SiTailwindcss, SiNodedotjs, SiMongodb, SiExpress } from 'react-icons/si'
import GitHubCalendar from 'react-github-calendar'

function About() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <main className="section-padding pt-28">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="blue-gradient-text">Me</span>
          </h1>
          <div className="w-24 h-1 bg-sky-500 mx-auto"></div>
        </div>

        {/* About Me */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20 transition-all duration-700 ${
          isVisible ? 'opacity-100' : 'opacity-0 transform translate-y-10'
        }`}>
          {/* Left: Image */}
          <div className="relative">
            <div className="bg-sky-500/20 rounded-lg p-4">
              <div className="overflow-hidden rounded-lg border-2 border-sky-500">
                <img 
                  src="https://placehold.co/600x400/0f172a/0ea5e9?text=Gia+Si" 
                  alt="Profile" 
                  className="w-full h-auto object-cover transition-transform hover:scale-105 duration-500"
                />
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 border-4 border-sky-500 rounded-lg z-[-1]"></div>
            <div className="absolute -top-6 -left-6 w-24 h-24 border-4 border-sky-500 rounded-lg z-[-1]"></div>
          </div>
          
          {/* Right: Content */}
          <div>
            <h2 className="text-3xl font-bold mb-4">Web Developer & Designer</h2>
            <p className="text-slate-300 mb-6">
              I am a passionate full-stack developer with expertise in modern web technologies.
              My journey in programming started 5 years ago, and since then, I've been 
              continuously learning and improving my skills to create impactful digital solutions.
            </p>
            <p className="text-slate-300 mb-6">
              I enjoy building user-friendly interfaces and robust backend systems that work 
              seamlessly together. My goal is to create web applications that not only look 
              great but also provide exceptional user experience.
            </p>
            
            {/* Personal Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <p><span className="text-sky-400 font-medium">Name:</span> Gia Si</p>
                <p><span className="text-sky-400 font-medium">Email:</span> example@email.com</p>
              </div>
              <div>
                <p><span className="text-sky-400 font-medium">Location:</span> Vietnam</p>
                <p><span className="text-sky-400 font-medium">Experience:</span> 3+ Years</p>
              </div>
            </div>
            
            <a 
              href="/resume" 
              className="btn-primary inline-block"
            >
              View Resume
            </a>
          </div>
        </div>
        
        {/* Skills Section */}
        <div className={`mb-20 transition-all duration-700 delay-300 ${
          isVisible ? 'opacity-100' : 'opacity-0 transform translate-y-10'
        }`}>
          <h2 className="text-3xl font-bold mb-8 text-center">
            My <span className="blue-gradient-text">Skills</span>
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {/* Frontend */}
            <div className="card group hover:border hover:border-sky-500">
              <div className="text-sky-400 text-4xl mb-4 flex justify-center">
                <FaReact className="group-hover:animate-spin-slow" />
              </div>
              <h3 className="text-center font-medium">React</h3>
            </div>
            
            <div className="card group hover:border hover:border-sky-500">
              <div className="text-yellow-400 text-4xl mb-4 flex justify-center">
                <SiJavascript />
              </div>
              <h3 className="text-center font-medium">JavaScript</h3>
            </div>
            
            <div className="card group hover:border hover:border-sky-500">
              <div className="text-blue-500 text-4xl mb-4 flex justify-center">
                <SiTypescript />
              </div>
              <h3 className="text-center font-medium">TypeScript</h3>
            </div>
            
            <div className="card group hover:border hover:border-sky-500">
              <div className="text-sky-400 text-4xl mb-4 flex justify-center">
                <SiTailwindcss />
              </div>
              <h3 className="text-center font-medium">TailwindCSS</h3>
            </div>
            
            {/* Backend */}
            <div className="card group hover:border hover:border-sky-500">
              <div className="text-green-500 text-4xl mb-4 flex justify-center">
                <SiNodedotjs />
              </div>
              <h3 className="text-center font-medium">Node.js</h3>
            </div>
            
            <div className="card group hover:border hover:border-sky-500">
              <div className="text-slate-300 text-4xl mb-4 flex justify-center">
                <SiExpress />
              </div>
              <h3 className="text-center font-medium">Express.js</h3>
            </div>
            
            <div className="card group hover:border hover:border-sky-500">
              <div className="text-green-500 text-4xl mb-4 flex justify-center">
                <SiMongodb />
              </div>
              <h3 className="text-center font-medium">MongoDB</h3>
            </div>
            
            <div className="card group hover:border hover:border-sky-500">
              <div className="text-blue-500 text-4xl mb-4 flex justify-center">
                <FaDatabase />
              </div>
              <h3 className="text-center font-medium">SQL</h3>
            </div>
          </div>
        </div>
        
        {/* Experience Section */}
        <div className={`mb-20 transition-all duration-700 delay-500 ${
          isVisible ? 'opacity-100' : 'opacity-0 transform translate-y-10'
        }`}>
          <h2 className="text-3xl font-bold mb-8 text-center">
            My <span className="blue-gradient-text">Experience</span>
          </h2>
          
          <div className="relative border-l-2 border-sky-500 ml-4 md:ml-0 md:mx-auto max-w-3xl">
            {/* Experience 1 */}
            <div className="mb-12 relative pl-8">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-sky-500"></div>
              <div className="card">
                <h3 className="text-xl font-bold mb-1">Senior Frontend Developer</h3>
                <p className="text-sky-400 mb-3">TechCorp Inc. • 2021 - Present</p>
                <p className="text-slate-300">
                  Led development of responsive, interactive web applications using React and TypeScript.
                  Collaborated with designers to implement UI/UX improvements that increased user engagement by 25%.
                  Mentored junior developers and implemented code review processes.
                </p>
              </div>
            </div>
            
            {/* Experience 2 */}
            <div className="mb-12 relative pl-8">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-sky-500"></div>
              <div className="card">
                <h3 className="text-xl font-bold mb-1">Full Stack Developer</h3>
                <p className="text-sky-400 mb-3">WebSolutions • 2019 - 2021</p>
                <p className="text-slate-300">
                  Developed and maintained web applications using MERN stack.
                  Implemented REST APIs and database designs for various client projects.
                  Collaborated with cross-functional teams to deliver projects on time and within scope.
                </p>
              </div>
            </div>
            
            {/* Experience 3 */}
            <div className="relative pl-8">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-sky-500"></div>
              <div className="card">
                <h3 className="text-xl font-bold mb-1">Junior Web Developer</h3>
                <p className="text-sky-400 mb-3">DigitalCraft • 2018 - 2019</p>
                <p className="text-slate-300">
                  Assisted in development of client websites using HTML, CSS, and JavaScript.
                  Performed bug fixes and UI improvements based on client feedback.
                  Participated in daily stand-ups and sprint planning meetings.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* GitHub Calendar */}
        <div className={`transition-all duration-700 delay-700 ${
          isVisible ? 'opacity-100' : 'opacity-0 transform translate-y-10'
        }`}>
          <h2 className="text-3xl font-bold mb-8 text-center">
            My <span className="blue-gradient-text">GitHub Contributions</span>
          </h2>
          
          <div className="card p-6">
            <GitHubCalendar
              username="yourusername"
              colorScheme="dark"
              blockSize={15}
              blockMargin={5}
              fontSize={16}
              hideColorLegend={false}
            />
          </div>
        </div>
      </div>
    </main>
  )
}

export default About