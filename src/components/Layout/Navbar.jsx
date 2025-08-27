import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaUser,
  FaLaptopCode,
  FaFile,
  FaEnvelope,
  FaCogs,
} from "react-icons/fa";
import { motion } from "framer-motion";
import ThemeSwitcher from "./ThemeSwitcher";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Determine active section based on scroll position
      const sections = [
        "home",
        "about",
        "projects",
        "tech-stack",
        "resume",
        "contact",
      ];
      const sectionElements = sections.map((id) => document.getElementById(id));

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    // Close mobile menu on escape key press
    const handleKeyPress = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    // Close mobile menu on resize (when switching to desktop)
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("keydown", handleKeyPress);
    window.addEventListener("resize", handleResize);
    
    // Prevent body scroll when mobile menu is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener("resize", handleResize);
      document.body.style.overflow = 'unset'; // Cleanup on unmount
    };
  }, [isOpen]);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  // Close mobile navbar when clicking a link
  const closeNavbar = () => {
    if (isOpen) setIsOpen(false);
  };

  // Enhanced mobile navigation handler
  const handleMobileNavClick = (sectionId) => {
    setIsOpen(false); // Close menu immediately for better UX

    // Small delay to allow menu close animation before scrolling
    setTimeout(() => {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            const offsetTop = element.offsetTop - 80;
            window.scrollTo({
              top: offsetTop,
              behavior: "smooth",
            });
          }
        }, 100);
      } else {
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      }
    }, 150);
  };

  // Navigate to home page and scroll to section
  const scrollToSection = (sectionId) => {
    // If we're not on the home page, navigate to home first
    if (location.pathname !== "/") {
      navigate("/");
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.offsetTop - 80; // Account for navbar height
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      }, 100);
    } else {
      // We're already on home page, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        const offsetTop = element.offsetTop - 80; // Account for navbar height
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    }
    closeNavbar();
  };

  return (
    <motion.nav
      className={`fixed w-full z-30 transition-all duration-500 ${
        scrolled
          ? "glass-effect shadow-xl border-b border-slate-700/50 backdrop-blur-xl"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <motion.button
              onClick={() => scrollToSection("home")}
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-violet-500 rounded-xl flex items-center justify-center p-1">
                <img 
                  src="/logo-bg.png" 
                  alt="GiaSi Dev Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-2xl font-bold gradient-text">
                GiaSi Dev
              </span>
            </motion.button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <NavLink
              sectionId="home"
              active={activeSection === "home"}
              label="Home"
              onClick={() => scrollToSection("home")}
            />
            <NavLink
              sectionId="about"
              active={activeSection === "about"}
              label="About"
              onClick={() => scrollToSection("about")}
            />
            <NavLink
              sectionId="projects"
              active={activeSection === "projects"}
              label="Projects"
              onClick={() => scrollToSection("projects")}
            />
            <NavLink
              sectionId="tech-stack"
              active={activeSection === "tech-stack"}
              label="Tech Stack"
              onClick={() => scrollToSection("tech-stack")}
            />
            <NavLink
              sectionId="contact"
              active={activeSection === "contact"}
              label="Contact"
              onClick={() => scrollToSection("contact")}
            />
            <NavLink
              sectionId="resume"
              active={activeSection === "resume"}
              label="Resume"
              onClick={() => scrollToSection("resume")}
            />

            <div className="ml-2">
              <ThemeSwitcher />
            </div>

            <a
              href="https://github.com/giasinguyen"
              target="_blank"
              rel="noreferrer"
              className="btn-outline"
            >
              GitHub
            </a>
          </div>

          {/* Mobile menu button with improved styling */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeSwitcher />

            <motion.button
              onClick={toggleNavbar}
              type="button"
              className="relative inline-flex items-center justify-center p-3 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 text-slate-300 hover:text-blue-400 hover:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all duration-300"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isOpen ? (
                  <FaTimes className="h-5 w-5" />
                ) : (
                  <FaBars className="h-5 w-5" />
                )}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Menu Overlay */}
      <motion.div
        className={`fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 md:hidden ${
          isOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        onClick={() => setIsOpen(false)}
      />

      {/* Redesigned Mobile Menu */}
      <motion.div
        className={`fixed right-4 top-20 w-80 max-w-[calc(100vw-2rem)] bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl shadow-black/50 z-50 md:hidden overflow-hidden`}
        initial={{ opacity: 0, scale: 0.95, x: 20, y: -20 }}
        animate={{ 
          opacity: isOpen ? 1 : 0,
          scale: isOpen ? 1 : 0.95,
          x: isOpen ? 0 : 20,
          y: isOpen ? 0 : -20,
          pointerEvents: isOpen ? 'auto' : 'none'
        }}
        transition={{ 
          duration: 0.3,
          ease: [0.25, 0.1, 0.25, 1]
        }}
        id="mobile-menu"
      >
        {/* Menu Header */}
        <div className="px-6 py-4 border-b border-slate-700/50 bg-slate-800/30">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-violet-500 rounded-lg flex items-center justify-center">
              <img 
                src="/logo-bg.png" 
                alt="Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-sm">Navigation</h3>
              <p className="text-slate-400 text-xs">Quick access to sections</p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="p-4 space-y-2">
          <MobileNavLink
            sectionId="home"
            icon={<FaHome />}
            label="Home"
            onClick={() => handleMobileNavClick("home")}
            active={activeSection === "home"}
          />
          <MobileNavLink
            sectionId="about"
            icon={<FaUser />}
            label="About"
            onClick={() => handleMobileNavClick("about")}
            active={activeSection === "about"}
          />
          <MobileNavLink
            sectionId="projects"
            icon={<FaLaptopCode />}
            label="Projects"
            onClick={() => handleMobileNavClick("projects")}
            active={activeSection === "projects"}
          />
          <MobileNavLink
            sectionId="tech-stack"
            icon={<FaCogs />}
            label="Tech Stack"
            onClick={() => handleMobileNavClick("tech-stack")}
            active={activeSection === "tech-stack"}
          />
          <MobileNavLink
            sectionId="resume"
            icon={<FaFile />}
            label="Resume"
            onClick={() => handleMobileNavClick("resume")}
            active={activeSection === "resume"}
          />
          <MobileNavLink
            sectionId="contact"
            icon={<FaEnvelope />}
            label="Contact"
            onClick={() => handleMobileNavClick("contact")}
            active={activeSection === "contact"}
          />
        </div>

        {/* Menu Footer */}
        <div className="px-4 py-4 border-t border-slate-700/50 bg-slate-800/20">
          <motion.a
            href="https://github.com/giasinguyen"
            target="_blank"
            rel="noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white text-sm font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
            onClick={closeNavbar}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaCogs className="text-xs" />
            GitHub Profile
          </motion.a>
        </div>
      </motion.div>
    </motion.nav>
  );
}

// Desktop Nav Link with active state
function NavLink({ label, active, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
        active
          ? "text-blue-400 bg-blue-500/10"
          : "text-slate-300 hover:text-blue-400 hover:bg-slate-800/50"
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {label}
      {active && (
        <motion.div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full"
          layoutId="navbar-indicator"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.button>
  );
}

// Enhanced Mobile Nav Link with modern design
function MobileNavLink({ icon, label, onClick, active }) {
  return (
    <motion.button
      onClick={onClick}
      className={`group w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
        active
          ? "bg-gradient-to-r from-blue-500/20 to-violet-500/20 text-blue-400 border border-blue-500/30 shadow-lg shadow-blue-500/10"
          : "text-slate-300 hover:bg-slate-800/50 hover:text-blue-300 border border-transparent hover:border-slate-600/30"
      }`}
      whileHover={{ scale: 1.02, x: 4 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Icon Container */}
      <motion.div
        className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
          active
            ? "bg-gradient-to-r from-blue-500 to-violet-500 text-white shadow-lg"
            : "bg-slate-800/50 text-slate-400 group-hover:bg-slate-700/70 group-hover:text-blue-400"
        }`}
        whileHover={{ rotate: active ? 0 : 5 }}
      >
        {icon}
      </motion.div>

      {/* Label */}
      <span className="flex-1 text-left">
        {label}
      </span>

      {/* Active Indicator */}
      {active && (
        <motion.div
          className="flex-shrink-0 w-2 h-2 bg-blue-400 rounded-full"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        />
      )}

      {/* Hover Arrow */}
      {!active && (
        <motion.div
          className="flex-shrink-0 w-4 h-4 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ x: -10 }}
          whileHover={{ x: 0 }}
        >
          →
        </motion.div>
      )}
    </motion.button>
  );
}

export default Navbar;
