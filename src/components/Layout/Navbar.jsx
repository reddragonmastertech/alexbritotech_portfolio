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
} from "react-icons/fa";
import ThemeSwitcher from "./ThemeSwitcher";
import { motion } from "framer-motion";

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
      const sections = ["home", "about", "projects", "blog", "resume", "contact"];
      const sectionElements = sections.map(id => document.getElementById(id));
      
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

  // Navigate to home page and scroll to section
  const scrollToSection = (sectionId) => {
    // If we're not on the home page, navigate to home first
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.offsetTop - 80; // Account for navbar height
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
        const offsetTop = element.offsetTop - 80; // Account for navbar height
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth"
        });
      }
    }
    closeNavbar();
  };

  return (
    <nav
      className={`fixed w-full z-20 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm shadow-md border-b border-slate-200 dark:border-slate-800"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <button
              onClick={() => scrollToSection("home")}
              className="flex items-center"
            >
              <span className="text-2xl font-bold blue-gradient-text">
                GiaSi Portfolio
              </span>
            </button>
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

      {/* Mobile Menu */}
      <motion.div
        className={`md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 overflow-hidden`}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        initial={false}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <MobileNavLink
            sectionId="home"
            icon={<FaHome className="mr-2" />}
            label="Home"
            onClick={() => scrollToSection("home")}
            active={activeSection === "home"}
          />
          <MobileNavLink
            sectionId="about"
            icon={<FaUser className="mr-2" />}
            label="About"
            onClick={() => scrollToSection("about")}
            active={activeSection === "about"}
          />
          <MobileNavLink
            sectionId="projects"
            icon={<FaLaptopCode className="mr-2" />}
            label="Projects"
            onClick={() => scrollToSection("projects")}
            active={activeSection === "projects"}
          />
          <MobileNavLink
            sectionId="blog"
            icon={<FaBlog className="mr-2" />}
            label="Blog"
            onClick={() => scrollToSection("blog")}
            active={activeSection === "blog"}
          />
          <MobileNavLink
            sectionId="contact"
            icon={<FaEnvelope className="mr-2" />}
            label="Contact"
            onClick={() => scrollToSection("contact")}
            active={activeSection === "contact"}
          />
          <MobileNavLink
            sectionId="resume"
            icon={<FaFile className="mr-2" />}
            label="Resume"
            onClick={() => scrollToSection("resume")}
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
    </nav>
  );
}

// Desktop Nav Link with active state
function NavLink({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`relative px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
        active
          ? "text-blue-500 dark:text-blue-400"
          : "text-slate-700 dark:text-slate-300 hover:text-blue-500 dark:hover:text-blue-400"
      }`}
    >
      {label}
      {active && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 dark:bg-blue-400"
          layoutId="navbar-underline"
        />
      )}
    </button>
  );
}

// Mobile Nav Link
function MobileNavLink({ icon, label, onClick, active }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center px-3 py-3 rounded-md text-base font-medium ${
        active
          ? "bg-blue-50 text-blue-500 dark:bg-slate-800 dark:text-blue-400"
          : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 hover:text-blue-500 dark:hover:bg-slate-800 dark:hover:text-blue-400"
      }`}
    >
      {icon} {label}
    </button>
  );
}

export default Navbar;
