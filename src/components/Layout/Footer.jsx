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
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  const location = useLocation();
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

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      // Navigate to home page first, then scroll
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth"
          });
        }
      }, 100);
    } else {
      // We're already on home page, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        const offsetTop = element.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth"
        });
      }
    }
  };

  const socialLinks = [
    {
      icon: FaGithub,
      href: "https://github.com/giasinguyen",
      label: "GitHub",
      color: "hover:text-gray-700",
    },
    {
      icon: FaLinkedin,
      href: "https://linkedin.com/in/giasinguyen",
      label: "LinkedIn",
      color: "hover:text-blue-600",
    },
    {
      icon: FaTwitter,
      href: "https://twitter.com/giasinguyen",
      label: "Twitter",
      color: "hover:text-sky-500",
    },
    {
      icon: FaEnvelope,
      href: "mailto:giasinelove96@gmail.com",
      label: "Email",
      color: "hover:text-purple-600",
    },
  ];

  const quickLinks = [
    { sectionId: "home", label: "Home" },
    { sectionId: "about", label: "About" },
    { sectionId: "projects", label: "Projects" },
    { sectionId: "blog", label: "Blog" },
    { sectionId: "contact", label: "Contact" },
  ];

  return (
    <footer className="relative bg-gradient-to-t from-blue-50 to-white border-t border-gray-200">
      {/* Scroll to top button */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:from-blue-600 hover:to-purple-700 transform hover:-translate-y-1"
          aria-label="Scroll to top"
        >
          <FaArrowUp className="text-lg" />
        </motion.button>
      )}

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                GiaSi Portfolio
              </h3>
              <p className="text-gray-600 mt-3 leading-relaxed">
                Passionate Full-Stack Developer creating digital experiences that matter. 
                Let's build something amazing together.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-500 transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-1 ${social.color}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.label}
                >
                  <social.icon className="text-lg" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.sectionId)}
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-300 flex items-center group text-left"
                  >
                    <span className="w-1 h-1 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Get In Touch</h4>
            <div className="space-y-3">
              <div className="flex items-center text-gray-600">
                <FaMapMarkerAlt className="text-blue-500 mr-3 flex-shrink-0" />
                <span>Ho Chi Minh City, Vietnam</span>
              </div>
              <div className="flex items-center text-gray-600">
                <FaPhone className="text-blue-500 mr-3 flex-shrink-0" />
                <span>+84 123 456 789</span>
              </div>
              <div className="flex items-center text-gray-600">
                <FaEnvelope className="text-blue-500 mr-3 flex-shrink-0" />
                <a href="mailto:giasinelove96@gmail.com" className="hover:text-blue-600 transition-colors">
                  giasinelove96@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 pt-8">
          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center text-gray-600 mb-4 md:mb-0">
              <span>Made with</span>
              <FaHeart className="text-red-500 mx-2 animate-pulse" />
              <span>by GiaSi</span>
            </div>

            <div className="text-center md:text-right">
              <p className="text-gray-500 text-sm">
                © {year} GiaSi Portfolio. All rights reserved.
              </p>
              <p className="text-gray-400 text-xs mt-1">
                Built with React & Tailwind CSS
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;