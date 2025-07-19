import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaHeart,
  FaArrowUp,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

function Footer() {
  const year = new Date().getFullYear();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    {
      icon: FaGithub,
      href: "https://github.com/giasinguyen",
      label: "GitHub",
      color: "hover:text-gray-400",
    },
    {
      icon: FaLinkedin,
      href: "https://linkedin.com/in/giasinguyen",
      label: "LinkedIn",
      color: "hover:text-blue-400",
    },
    {
      icon: FaTwitter,
      href: "https://twitter.com/giasinguyen",
      label: "Twitter",
      color: "hover:text-sky-400",
    },
    {
      icon: FaEnvelope,
      href: "mailto:giasinguyen@email.com",
      label: "Email",
      color: "hover:text-red-400",
    },
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
    { name: "Resume", href: "/resume" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* Main Footer */}
      <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-16 pb-8 mt-auto overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-grid-slate-100/[0.02] [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-3xl font-bold bg-gradient-to-r from-sky-400 to-purple-500 bg-clip-text text-transparent mb-4">
                  iamgiasi
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  Passionate Java Backend Developer building robust, scalable
                  applications with modern technologies. Turning ideas into
                  powerful digital solutions.
                </p>
                <div className="flex items-center text-slate-400 text-sm mb-2">
                  <FaMapMarkerAlt className="mr-2 text-sky-400" />
                  Ho Chi Minh City, Vietnam
                </div>
                <div className="flex items-center text-slate-400 text-sm">
                  <FaPhone className="mr-2 text-sky-400" />
                  +(84) 34 899 6487
                </div>
              </motion.div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="text-lg font-semibold text-white mb-6">
                  Quick Links
                </h4>
                <ul className="space-y-3">
                  {quickLinks.map((link, index) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <a
                        href={link.href}
                        className="text-slate-400 hover:text-sky-400 transition-colors duration-300 flex items-center group"
                      >
                        <span className="w-0 group-hover:w-4 h-0.5 bg-sky-400 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                        {link.name}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Services/Skills */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h4 className="text-lg font-semibold text-white mb-6">
                  Services
                </h4>
                <ul className="space-y-3 text-slate-400 text-sm">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-sky-400 rounded-full mr-3"></span>
                    Java Backend Development
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-sky-400 rounded-full mr-3"></span>
                    Spring Boot Applications
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-sky-400 rounded-full mr-3"></span>
                    RESTful API Design
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-sky-400 rounded-full mr-3"></span>
                    Database Design
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-sky-400 rounded-full mr-3"></span>
                    Microservices Architecture
                  </li>
                </ul>
              </motion.div>
            </div>

            {/* Connect Section */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h4 className="text-lg font-semibold text-white mb-6">
                  Let's Connect
                </h4>
                <p className="text-slate-400 text-sm mb-6">
                  Follow me on social media for updates on my latest projects
                  and tech insights.
                </p>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        className={`w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 ${social.color} transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-sky-500/25`}
                        aria-label={social.label}
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <IconComponent className="w-5 h-5" />
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-700 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <motion.p
                className="text-slate-400 text-sm mb-4 md:mb-0"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                &copy; {year} GiaSi Portfolio. 
              </motion.p>

              <motion.div
                className="flex items-center space-x-4 text-sm text-slate-400"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <a
                  href="/privacy"
                  className="hover:text-sky-400 transition-colors duration-300"
                >
                  Privacy Policy
                </a>
                <span>•</span>
                <a
                  href="/terms"
                  className="hover:text-sky-400 transition-colors duration-300"
                >
                  Terms of Service
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-sky-500 to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 z-50"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Scroll to top"
        >
          <FaArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </>
  );
}

export default Footer;
