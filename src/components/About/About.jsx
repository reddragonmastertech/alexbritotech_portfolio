import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  FaCode,
  FaServer,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaBrain,
  FaRocket,
  FaCloud,
  FaLaptopCode,
  FaDatabase,
  FaMobileAlt,
  FaCogs,
  FaStar
} from "react-icons/fa";
import profileData from "../../data/profile.json";

// Icon mapping
const iconMap = {
  code: FaCode,
  server: FaServer,
  graduation: FaGraduationCap,
  location: FaMapMarkerAlt,
  brain: FaBrain,
  automation: FaRocket,
  cloud: FaCloud,
  design: FaLaptopCode,
  database: FaDatabase,
  mobile: FaMobileAlt,
  devops: FaCogs
};

function About() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isForStartups, setIsForStartups] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    const handleResize = () => {
      clearTimeout(window.resizeTimeout);
      window.resizeTimeout = setTimeout(checkMobile, 100);
    };
    
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(window.resizeTimeout);
    };
  }, []);

  // Get services based on toggle state
  const currentServices = isForStartups ? profileData.servicesForStartups : profileData.services;
  
  // Map services from JSON with icons
  const highlights = currentServices.map(item => {
    const IconComponent = iconMap[item.icon] || FaCode;
    return {
      ...item,
      icon: <IconComponent />
    };
  });

  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="text-amber-400">Me</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto"></div>
        </motion.div>

        {/* Main Content */}
        <div className="mb-16">
          {/* Avatar and Summary Row */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-end mb-8">
            
            {/* Left: Avatar */}
            <motion.div
              className="lg:col-span-2 flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="relative w-full flex flex-col items-center mb-6">
                {/* Avatar Container */}
                <div className="w-56 h-56 md:w-64 md:h-64 rounded-2xl overflow-hidden border-2 border-neutral-800 bg-neutral-900">
                  <img
                    src={profileData.personalInfo.avatar}
                    alt={profileData.personalInfo.fullName}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                
                {/* Decorative Elements - Stuck to corners */}
                <div className="absolute top-0 right-0 w-6 h-6 rounded-full bg-amber-500 -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 rounded-full bg-amber-400/60 translate-y-1/2 -translate-x-1/2"></div>
                
                {/* Status Badge */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-neutral-900 border border-neutral-700 rounded-full flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-xs text-neutral-300 whitespace-nowrap">{profileData.status.message}</span>
                </div>
              </div>
              
              {/* Personal Info - Aligned with Stats */}
              <motion.div
                className="flex flex-wrap gap-6 justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-neutral-800/50 border border-neutral-700/50 hover:bg-neutral-800/70 hover:border-amber-500/30 transition-all duration-300 group">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 group-hover:bg-amber-500/20 transition-colors">
                    <FaMapMarkerAlt className="w-5 h-5" />
                  </div>
                  <span className="text-sm text-neutral-300 group-hover:text-neutral-100 transition-colors">{profileData.personalInfo.location}</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right: About Text */}
            <motion.div
              className="lg:col-span-3 flex flex-col justify-end"
              initial={{ opacity: 0, x: isMobile ? 0 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div>
                <h3 className="text-2xl font-bold text-neutral-100 mb-2">
                  Hi, I'm <span className="text-amber-400">{profileData.personalInfo.alias}</span>
                </h3>
                <p className="text-amber-500/80 font-medium mb-4">{profileData.devProfile.title}</p>
              </div>
              
              <div className="text-neutral-400 leading-relaxed mb-6">
                <p>
                  {profileData.devProfile.summary}
                </p>
              </div>
              
              {/* Quick Stats - Just under summary */}
              <motion.div
                className="flex flex-wrap gap-[2.25rem]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="text-center">
                  <div className="text-4xl font-bold text-amber-400">{profileData.stats.projects.value}</div>
                  <div className="text-base text-neutral-500">{profileData.stats.projects.label}</div>
                </div>
                <div className="w-px h-[4.5rem] bg-neutral-800"></div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-amber-400">{profileData.stats.experience.value}</div>
                  <div className="text-base text-neutral-500">{profileData.stats.experience.label}</div>
                </div>
                <div className="w-px h-[4.5rem] bg-neutral-800"></div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-amber-400">{profileData.stats.dedication.value}</div>
                  <div className="text-base text-neutral-500">{profileData.stats.dedication.label}</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* What I Can Do Section */}
        <div className="mb-12">
          {/* Section Header with Toggle */}
          <motion.div
            className="flex flex-col items-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-4">
              <h3 className="text-2xl md:text-3xl font-bold text-neutral-100">
                What I <span className="text-amber-400">Can Do</span>
              </h3>
              
              {/* For Startups Toggle */}
              <motion.button
                onClick={() => setIsForStartups(!isForStartups)}
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all duration-300 overflow-hidden ${
                  isForStartups
                    ? "bg-gradient-to-r from-amber-500/20 to-amber-600/10 border-amber-500/50 text-amber-400 shadow-lg shadow-amber-500/20"
                    : "bg-neutral-800/50 border-neutral-700/50 text-neutral-400 hover:border-amber-500/30 hover:text-amber-400 hover:bg-neutral-800/70"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Animated star decoration */}
                <div className="relative">
                  <FaStar className={`w-4 h-4 ${isForStartups ? "text-amber-400 animate-pulse" : "text-amber-500/60"}`} />
                  {isForStartups && (
                    <motion.div
                      className="absolute inset-0"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <FaStar className="w-4 h-4 text-amber-400/30" />
                    </motion.div>
                  )}
                </div>
                <span className="text-sm font-semibold relative z-10">For Startups</span>
                {isForStartups && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/10 to-transparent"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                )}
              </motion.button>
            </div>
            <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-amber-600"></div>
          </motion.div>

          {/* Services Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={isForStartups ? "startups" : "default"}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {highlights.map((item, index) => {
                // IDs that change in startup mode: 2 (AI), 3 (Automation), 4 (SaaS/MVP)
                const isStartupSpecific = isForStartups && [2, 3, 4].includes(item.id);
                return (
                  <motion.div
                    key={item.id}
                    className={`group relative p-5 rounded-xl transition-all duration-300 ${
                      isStartupSpecific
                        ? "bg-gradient-to-br from-amber-500/10 to-amber-600/5 border-2 border-amber-500/30 shadow-lg shadow-amber-500/10"
                        : "bg-neutral-900/50 border border-neutral-800 hover:border-amber-500/30"
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    whileHover={{ y: -4, scale: isStartupSpecific ? 1.02 : 1 }}
                  >
                    {/* Special badge for startup-specific cards */}
                    {isStartupSpecific && (
                      <motion.div
                        className="absolute -top-2 -right-2"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-full p-1.5 shadow-lg shadow-amber-500/50">
                          <FaStar className="w-3 h-3 text-white" />
                        </div>
                      </motion.div>
                    )}
                    
                    <div className={`text-xl mb-3 group-hover:scale-110 transition-transform duration-300 ${
                      isStartupSpecific ? "text-amber-400" : "text-amber-400"
                    }`}>
                      {item.icon}
                    </div>
                    <h4 className={`font-semibold text-sm mb-2 ${
                      isStartupSpecific ? "text-amber-300" : "text-neutral-100"
                    }`}>{item.title}</h4>
                    <p className={`text-xs leading-relaxed ${
                      isStartupSpecific ? "text-neutral-300" : "text-neutral-500"
                    }`}>{item.description}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Startup Message - Only shown when startup mode is active */}
          <AnimatePresence>
            {isForStartups && (
              <motion.div
                className="mt-12 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="relative inline-block px-8 py-5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-amber-600/20 border-2 border-amber-500/30 backdrop-blur-sm max-w-3xl">
                  {/* Animated background glow */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-500/20 via-transparent to-amber-600/20 blur-xl -z-10"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                  
                  <p className="relative text-lg md:text-xl font-semibold text-neutral-100 leading-relaxed">
                    I help <span className="text-amber-400 font-bold">startups and businesses</span> turn <span className="text-amber-400 font-bold">ideas</span> into <span className="text-amber-400 font-bold">scalable, AI-powered digital products</span>.
                  </p>
                  
                  {/* Decorative stars */}
                  <motion.div
                    className="absolute -top-2 -left-2"
                    animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <FaStar className="w-4 h-4 text-amber-400/60" />
                  </motion.div>
                  <motion.div
                    className="absolute -bottom-2 -right-2"
                    animate={{ rotate: [360, 0], scale: [1, 1.2, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  >
                    <FaStar className="w-4 h-4 text-amber-400/60" />
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default About;
