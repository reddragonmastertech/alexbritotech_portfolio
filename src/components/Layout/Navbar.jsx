import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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

// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
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
            <Link to="/" onClick={closeNavbar} className="flex items-center">
              <span className="text-2xl font-bold blue-gradient-text">
                GiaSi Portfolio
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <NavLink to="/" active={location.pathname === "/"} label="Home" />
            <NavLink
              to="/about"
              active={location.pathname === "/about"}
              label="About"
            />
            <NavLink
              to="/projects"
              active={location.pathname === "/projects"}
              label="Projects"
            />
            <NavLink
              to="/blog"
              active={location.pathname === "/blog"}
              label="Blog"
            />
            <NavLink
              to="/contact"
              active={location.pathname === "/contact"}
              label="Contact"
            />
            <NavLink
              to="/resume"
              active={location.pathname === "/resume"}
              label="Resume"
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
            to="/"
            icon={<FaHome className="mr-2" />}
            label="Home"
            onClick={closeNavbar}
          />
          <MobileNavLink
            to="/about"
            icon={<FaUser className="mr-2" />}
            label="About"
            onClick={closeNavbar}
          />
          <MobileNavLink
            to="/projects"
            icon={<FaLaptopCode className="mr-2" />}
            label="Projects"
            onClick={closeNavbar}
          />
          <MobileNavLink
            to="/blog"
            icon={<FaBlog className="mr-2" />}
            label="Blog"
            onClick={closeNavbar}
          />
          <MobileNavLink
            to="/contact"
            icon={<FaEnvelope className="mr-2" />}
            label="Contact"
            onClick={closeNavbar}
          />
          <MobileNavLink
            to="/resume"
            icon={<FaFile className="mr-2" />}
            label="Resume"
            onClick={closeNavbar}
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
function NavLink({ to, label, active }) {
  return (
    <Link
      to={to}
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
    </Link>
  );
}

// Mobile Nav Link
function MobileNavLink({ to, icon, label, onClick }) {
  const location = useLocation();
  const active = location.pathname === to;

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center px-3 py-3 rounded-md text-base font-medium ${
        active
          ? "bg-blue-50 text-blue-500 dark:bg-slate-800 dark:text-blue-400"
          : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 hover:text-blue-500 dark:hover:bg-slate-800 dark:hover:text-blue-400"
      }`}
    >
      {icon} {label}
    </Link>
  );
}

export default Navbar;
