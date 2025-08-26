import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaUser,
  FaLaptopCode,
  FaFile,
  FaBlog,
  FaEnvelope,
  FaCode,
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
        "blog",
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

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-violet-500 rounded-xl flex items-center justify-center">
                <FaCode className="text-white text-xl" />
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
              sectionId="blog"
              active={activeSection === "blog"}
              label="Blog"
              onClick={() => scrollToSection("blog")}
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

          {/* Mobile menu button and theme toggle */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeSwitcher />

            <button
              onClick={toggleNavbar}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-700 dark:text-slate-300 hover:text-blue-500 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <FaTimes className="block h-6 w-6" />
              ) : (
                <FaBars className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <motion.div
        className={`md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 overflow-hidden shadow-lg relative z-50`}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        initial={false}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <MobileNavLink
            sectionId="home"
            icon={<FaHome className="mr-2" />}
            label="Home"
            onClick={() => handleMobileNavClick("home")}
            active={activeSection === "home"}
          />
          <MobileNavLink
            sectionId="about"
            icon={<FaUser className="mr-2" />}
            label="About"
            onClick={() => handleMobileNavClick("about")}
            active={activeSection === "about"}
          />
          <MobileNavLink
            sectionId="projects"
            icon={<FaLaptopCode className="mr-2" />}
            label="Projects"
            onClick={() => handleMobileNavClick("projects")}
            active={activeSection === "projects"}
          />
          <MobileNavLink
            sectionId="blog"
            icon={<FaBlog className="mr-2" />}
            label="Blog"
            onClick={() => handleMobileNavClick("blog")}
            active={activeSection === "blog"}
          />
          <MobileNavLink
            sectionId="contact"
            icon={<FaEnvelope className="mr-2" />}
            label="Contact"
            onClick={() => handleMobileNavClick("contact")}
            active={activeSection === "contact"}
          />
          <MobileNavLink
            sectionId="resume"
            icon={<FaFile className="mr-2" />}
            label="Resume"
            onClick={() => handleMobileNavClick("resume")}
            active={activeSection === "resume"}
          />
        </div>

        <div className="px-5 pt-2 pb-6 border-t border-slate-200 dark:border-slate-700">
          <a
            href="https://github.com/giasinguyen"
            target="_blank"
            rel="noreferrer"
            className="w-full btn-outline flex justify-center"
            onClick={closeNavbar}
          >
            GitHub Profile
          </a>
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

// Mobile Nav Link with enhanced touch handling
function MobileNavLink({ icon, label, onClick, active }) {
  return (
    <motion.button
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl text-base font-medium transition-all duration-300 ${
        active
          ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
          : "text-slate-300 hover:bg-slate-800/50 hover:text-blue-400"
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
      {active && (
        <motion.div
          className="ml-auto w-2 h-2 bg-blue-400 rounded-full"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.button>
  );
}

export default Navbar;
