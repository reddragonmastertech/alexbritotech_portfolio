import { useState, useEffect } from "react";
import {
  FaServer,
  FaReact,
  FaDatabase,
  FaJava,
  FaGithub,
  FaLock,
} from "react-icons/fa";
import {
  SiJavascript,
  SiSpring,
  SiTailwindcss,
  SiNodedotjs,
  SiSpringboot,
  SiHibernate,
} from "react-icons/si";
import { TbBrandVscode } from "react-icons/tb";
import GitHubContributions from "./GitHubContributions";

 
import { motion } from "framer-motion";
function About() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20 transition-all duration-700 ${
            isVisible ? "opacity-100" : "opacity-0 transform translate-y-10"
          }`}
        >
          {/* Left: Image */}
          <div className="relative">
            <div className="bg-sky-500/20 rounded-lg p-4">
              <div className="overflow-hidden rounded-lg border-2 border-sky-500">
                <img
                  src="/avatar.jpg"
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
            <h2 className="text-3xl font-bold mb-4 text-slate-800 dark:text-slate-100">
              Java Backend Developer
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              I am a passionate Java backend developer with expertise in Spring
              Boot and enterprise application development. My career in software
              development has been focused on building robust, scalable, and
              secure Java applications that deliver real business value.
            </p>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              I specialize in Java-based backend development with Spring
              ecosystem, RESTful API design, database design, and implementing
              security best practices with Spring Security and JWT. I also have
              experience with frontend technologies like React to build
              full-stack applications.
            </p>

            {/* Personal Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-slate-600 dark:text-slate-300">
                  <span className="text-sky-500 dark:text-sky-400 font-medium">
                    Name:
                  </span>{" "}
                  Nguyen Tran Gia Si
                </p>
                <p className="text-slate-600 dark:text-slate-300">
                  <span className="text-sky-500 dark:text-sky-400 font-medium">
                    Email:
                  </span>{" "}
                  giasinguyen@email.com
                </p>
              </div>
              <div>
                <p className="text-slate-600 dark:text-slate-300">
                  <span className="text-sky-500 dark:text-sky-400 font-medium">
                    Location:
                  </span>{" "}
                  Ho Chi Minh, Vietnam
                </p>
                <p className="text-slate-600 dark:text-slate-300">
                  <span className="text-sky-500 dark:text-sky-400 font-medium">
                    Experience:
                  </span>{" "}
                  1+ Years
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                const element = document.getElementById("resume");
                if (element) {
                  const offsetTop = element.offsetTop - 80;
                  window.scrollTo({
                    top: offsetTop,
                    behavior: "smooth",
                  });
                }
              }}
              className="btn-primary inline-block"
            >
              View Resume
            </button>
          </div>
        </div>

        {/* Skills Section */}
        <div
          className={`mb-20 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100" : "opacity-0 transform translate-y-10"
          }`}
        >
          <h2 className="text-3xl font-bold mb-8 text-center text-slate-800 dark:text-slate-100">
            My <span className="blue-gradient-text">Skills</span>
          </h2>

          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 flex items-center text-slate-700 dark:text-slate-200">
              <FaJava className="mr-2 text-red-500" /> Java Ecosystem
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {/* Java Core */}
              <motion.div
                whileHover={{ y: -5 }}
                className="card group hover:border hover:border-red-500"
              >
                <div className="text-red-500 text-4xl mb-4 flex justify-center">
                  <FaJava />
                </div>
                <h3 className="text-center font-medium text-slate-700 dark:text-slate-200">
                  Java
                </h3>
                <p className="text-center text-xs text-slate-500 dark:text-slate-400">
                  Core, JDK 8-17
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="card group hover:border hover:border-green-500"
              >
                <div className="text-green-500 text-4xl mb-4 flex justify-center">
                  <SiSpring />
                </div>
                <h3 className="text-center font-medium text-slate-700 dark:text-slate-200">
                  Spring
                </h3>
                <p className="text-center text-xs text-slate-500 dark:text-slate-400">
                  Framework, MVC, Security
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="card group hover:border hover:border-green-500"
              >
                <div className="text-green-500 text-4xl mb-4 flex justify-center">
                  <SiSpringboot />
                </div>
                <h3 className="text-center font-medium text-slate-700 dark:text-slate-200">
                  Spring Boot
                </h3>
                <p className="text-center text-xs text-slate-500 dark:text-slate-400">
                  API, Microservices
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="card group hover:border hover:border-purple-500"
              >
                <div className="text-slate-700 dark:text-slate-200 text-4xl mb-4 flex justify-center">
                  <SiHibernate />
                </div>
                <h3 className="text-center font-medium text-slate-700 dark:text-slate-200">
                  JPA / Hibernate
                </h3>
                <p className="text-center text-xs text-slate-500 dark:text-slate-400">
                  ORM, Data Persistence
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="card group hover:border hover:border-blue-500"
              >
                <div className="text-blue-500 text-4xl mb-4 flex justify-center">
                  <FaLock />
                </div>
                <h3 className="text-center font-medium text-slate-700 dark:text-slate-200">
                  JWT
                </h3>
                <p className="text-center text-xs text-slate-500 dark:text-slate-400">
                  Authentication, Security
                </p>
              </motion.div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 flex items-center text-slate-700 dark:text-slate-200">
              <FaDatabase className="mr-2 text-blue-500" /> Databases
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              <motion.div
                whileHover={{ y: -5 }}
                className="card group hover:border hover:border-blue-500"
              >
                <div className="text-blue-500 text-4xl mb-4 flex justify-center">
                  <FaDatabase />
                </div>
                <h3 className="text-center font-medium text-slate-700 dark:text-slate-200">
                  MySQL
                </h3>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="card group hover:border hover:border-blue-700"
              >
                <div className="text-blue-700 text-4xl mb-4 flex justify-center">
                  <FaDatabase />
                </div>
                <h3 className="text-center font-medium text-slate-700 dark:text-slate-200">
                  PostgreSQL
                </h3>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="card group hover:border hover:border-orange-500"
              >
                <div className="text-orange-500 text-4xl mb-4 flex justify-center">
                  <FaDatabase />
                </div>
                <h3 className="text-center font-medium text-slate-700 dark:text-slate-200">
                  Oracle DB
                </h3>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="card group hover:border hover:border-green-600"
              >
                <div className="text-green-600 text-4xl mb-4 flex justify-center">
                  <FaDatabase />
                </div>
                <h3 className="text-center font-medium text-slate-700 dark:text-slate-200">
                  MongoDB
                </h3>
              </motion.div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center text-slate-700 dark:text-slate-200">
              <FaReact className="mr-2 text-sky-400" /> Frontend & Other Tools
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              <motion.div
                whileHover={{ y: -5 }}
                className="card group hover:border hover:border-sky-500"
              >
                <div className="text-sky-400 text-4xl mb-4 flex justify-center">
                  <FaReact className="group-hover:animate-spin-slow" />
                </div>
                <h3 className="text-center font-medium text-slate-700 dark:text-slate-200">
                  React
                </h3>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="card group hover:border hover:border-yellow-400"
              >
                <div className="text-yellow-400 text-4xl mb-4 flex justify-center">
                  <SiJavascript />
                </div>
                <h3 className="text-center font-medium text-slate-700 dark:text-slate-200">
                  JavaScript
                </h3>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="card group hover:border hover:border-sky-400"
              >
                <div className="text-sky-400 text-4xl mb-4 flex justify-center">
                  <SiTailwindcss />
                </div>
                <h3 className="text-center font-medium text-slate-700 dark:text-slate-200">
                  TailwindCSS
                </h3>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="card group hover:border hover:border-green-500"
              >
                <div className="text-green-500 text-4xl mb-4 flex justify-center">
                  <SiNodedotjs />
                </div>
                <h3 className="text-center font-medium text-slate-700 dark:text-slate-200">
                  Node.js
                </h3>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="card group hover:border hover:border-slate-400"
              >
                <div className="text-slate-700 dark:text-slate-300 text-4xl mb-4 flex justify-center">
                  <FaGithub />
                </div>
                <h3 className="text-center font-medium text-slate-700 dark:text-slate-200">
                  Git/GitHub
                </h3>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="card group hover:border hover:border-blue-500"
              >
                <div className="text-blue-500 text-4xl mb-4 flex justify-center">
                  <TbBrandVscode />
                </div>
                <h3 className="text-center font-medium text-slate-700 dark:text-slate-200">
                  VS Code
                </h3>
              </motion.div>
            </div>
          </div>
        </div>

        {/* GitHub Contributions */}
        <div
          className={`transition-all duration-700 delay-700 ${
            isVisible ? "opacity-100" : "opacity-0 transform translate-y-10"
          }`}
        >
          <h2 className="text-3xl font-bold mb-8 text-center text-slate-800 dark:text-slate-100">
            My <span className="blue-gradient-text">GitHub Contributions</span>
          </h2>

          <GitHubContributions />
        </div>
      </div>
    </main>
  );
}

export default About;
