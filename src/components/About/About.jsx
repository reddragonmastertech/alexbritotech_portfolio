import { motion } from "framer-motion";
import { useState, useEffect, useMemo, lazy, Suspense } from "react";
import { 
  FaServer, 
  FaReact, 
  FaDatabase, 
  FaJava, 
  FaRocket,
  FaLightbulb,
  FaGraduationCap,
  FaCode
} from "react-icons/fa";
import {
  SiSpring,
  SiSpringboot,
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiDocker
} from "react-icons/si";

// Lazy load GitHubContributions component
const GitHubContributions = lazy(() => import('./GitHubContributions'));

function About() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Use passive listener for better performance
    const handleResize = () => {
      // Debounce resize events
      clearTimeout(window.resizeTimeout);
      window.resizeTimeout = setTimeout(checkMobile, 100);
    };
    
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(window.resizeTimeout);
    };
  }, []);

  // Memoize static data for better performance
  const skills = useMemo(() => [
    { icon: <FaJava />, name: "Java", level: 95, color: "from-red-500 to-orange-500" },
    { icon: <SiSpringboot />, name: "Spring Boot", level: 90, color: "from-green-500 to-emerald-500" },
    { icon: <SiSpring />, name: "Spring", level: 88, color: "from-green-400 to-green-600" },
    { icon: <FaReact />, name: "React", level: 85, color: "from-blue-400 to-cyan-400" },
    { icon: <SiTypescript />, name: "TypeScript", level: 82, color: "from-blue-600 to-blue-400" },
    { icon: <SiJavascript />, name: "JavaScript", level: 88, color: "from-yellow-400 to-yellow-600" },
    { icon: <FaDatabase />, name: "SQL/NoSQL", level: 80, color: "from-purple-500 to-pink-500" },
    { icon: <SiDocker />, name: "Docker", level: 75, color: "from-blue-500 to-blue-600" }
  ], []);

  const experiences = useMemo(() => [
    {
      icon: <FaRocket />,
      title: "Full-Stack Development", 
      description: "Building end-to-end applications with modern tech stack"
    },
    {
      icon: <FaServer />,
      title: "Backend Architecture",
      description: "Designing scalable microservices and RESTful APIs"
    },
    {
      icon: <FaLightbulb />,
      title: "Problem Solving",
      description: "Creating efficient solutions for complex business challenges"
    },
    {
      icon: <FaGraduationCap />,
      title: "Continuous Learning",
      description: "Always exploring new technologies and best practices"
    }
  ], []);

  return (
    <section className="section-padding py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-violet-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-violet-500 mx-auto mb-8"></div>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Passionate developer creating digital experiences that make a difference
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
          {/* Left: Avatar & About Text */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: isMobile ? 0 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: isMobile ? 0.4 : 0.8,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Avatar Section */}
            <motion.div
              className="flex justify-center lg:justify-start mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: isMobile ? 0.4 : 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <div className="w-48 h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden glass-effect p-1">
                  <img
                    src="/avatar.jpg"
                    alt="Nguyen Tran Gia Si"
                    className="w-full h-full object-cover rounded-full"
                    loading="lazy"
                  />
                </div>
                {/* Floating badges */}
                <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full flex items-center justify-center glass-effect">
                  <FaCode className="text-white text-xl" />
                </div>
                <div className="absolute -bottom-2 -left-2 w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center glass-effect">
                  <FaRocket className="text-white text-lg" />
                </div>
              </div>
            </motion.div>

            <div className="card">
              <h3 className="text-2xl font-bold text-slate-100 mb-4">Hello! I'm Gia Si</h3>
              <div className="space-y-4 text-slate-300 leading-relaxed">
                <p>
                  I'm a <span className="text-blue-400 font-semibold">Full-Stack Developer</span> with a passion for building 
                  enterprise-level applications using <span className="text-green-400 font-semibold">Java</span> and
                  <span className="text-green-400 font-semibold"> Spring Boot</span>.
                </p>
                <p>
                  With expertise in backend architecture, microservices, and modern frontend technologies, 
                  I create scalable solutions that drive business growth and enhance user experiences.
                </p>
                <p>
                  I believe in writing clean, maintainable code and staying up-to-date with the latest 
                  industry trends and best practices. My goal is to build applications that not only 
                  work flawlessly but also provide exceptional user experiences.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: Experience Cards */}
          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: isMobile ? 0 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: isMobile ? 0.4 : 0.8,
              delay: 0.2,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className="card text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5,
                  delay: index * 0.1 + 0.3,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                viewport={{ once: true }}
              >
                <div className="text-blue-400 text-3xl mb-4 flex justify-center">
                  {exp.icon}
                </div>
                <h4 className="font-semibold text-slate-100 mb-2">{exp.title}</h4>
                <p className="text-slate-400 text-sm">{exp.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Skills Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.h3 
            className="text-3xl font-bold text-center mb-12 gradient-text"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Technical Skills
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => {
              // Alternating animation from left and right
              const isEven = index % 2 === 0;
              const isLargeScreen = !isMobile && window.innerWidth >= 1024;
              
              return (
                <motion.div
                  key={index}
                  className="card group"
                  initial={{ 
                    opacity: 0, 
                    x: isLargeScreen ? (isEven ? -30 : 30) : 0,
                    y: isMobile ? 20 : 0
                  }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ 
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -8,
                    transition: { duration: 0.2 }
                  }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                <div className="text-center">
                  <div className={`text-3xl mb-4 bg-gradient-to-r ${skill.color} bg-clip-text text-transparent flex justify-center`}>
                    {skill.icon}
                  </div>
                  <h4 className="font-semibold text-slate-100 mb-3">{skill.name}</h4>
                  
                  {/* Skill Bar */}
                  <div className="w-full bg-slate-700 rounded-full h-2 mb-2">
                    <motion.div
                      className={`h-2 rounded-full bg-gradient-to-r ${skill.color}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ 
                        duration: 1.2, 
                        delay: index * 0.1 + 0.3,
                        ease: [0.25, 0.1, 0.25, 1]
                      }}
                      viewport={{ once: true }}
                    />
                  </div>
                  <span className="text-slate-400 text-sm">{skill.level}%</span>
                </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {[
            { number: "3+", label: "Years Experience" },
            { number: "50+", label: "Projects Completed" },
            { number: "100%", label: "Client Satisfaction" },
            { number: "24/7", label: "Support Available" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="card text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.5,
                delay: index * 0.1 + 0.2,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              whileHover={{ 
                scale: 1.05,
                y: -5,
                transition: { duration: 0.2 }
              }}
              viewport={{ once: true }}
            >
              <motion.div
                className="text-3xl font-bold gradient-text mb-2"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1 + 0.4,
                  ease: "backOut"
                }}
                viewport={{ once: true }}
              >
                {stat.number}
              </motion.div>
              <div className="text-slate-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default About;
