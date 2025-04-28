import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaBars, FaTimes, FaHome, FaUser, FaLaptopCode, FaFile } from 'react-icons/fa'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      if (offset > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const toggleNavbar = () => {
    setIsOpen(!isOpen)
  }

  // Close mobile navbar when clicking a link
  const closeNavbar = () => {
    if (isOpen) setIsOpen(false)
  }

  return (
    <nav className={`fixed w-full z-20 transition-all duration-300 ${scrolled ? 'bg-slate-900/90 backdrop-blur-sm shadow-md' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" onClick={closeNavbar} className="flex items-center">
              <span className="text-2xl font-bold blue-gradient-text">GiaSi</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link to="/" className="text-slate-300 hover:text-sky-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">Home</Link>
              <Link to="/about" className="text-slate-300 hover:text-sky-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">About</Link>
              <Link to="/projects" className="text-slate-300 hover:text-sky-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">Projects</Link>
              <Link to="/resume" className="text-slate-300 hover:text-sky-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">Resume</Link>
              <a 
                href="https://github.com/yourusername" 
                target="_blank" 
                rel="noreferrer" 
                className="btn-outline"
              >
                GitHub
              </a>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleNavbar}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-700 focus:outline-none"
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
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 invisible'
        } bg-slate-800 overflow-hidden`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            onClick={closeNavbar}
            className="flex items-center text-slate-300 hover:bg-slate-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            <FaHome className="mr-2" /> Home
          </Link>
          <Link
            to="/about"
            onClick={closeNavbar}
            className="flex items-center text-slate-300 hover:bg-slate-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            <FaUser className="mr-2" /> About
          </Link>
          <Link
            to="/projects"
            onClick={closeNavbar}
            className="flex items-center text-slate-300 hover:bg-slate-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            <FaLaptopCode className="mr-2" /> Projects
          </Link>
          <Link
            to="/resume"
            onClick={closeNavbar}
            className="flex items-center text-slate-300 hover:bg-slate-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            <FaFile className="mr-2" /> Resume
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar