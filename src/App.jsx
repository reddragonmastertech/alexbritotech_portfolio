import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import './App.css'

import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'
import ScrollToTop from './components/Layout/ScrollToTop'
import Preloader from './components/Layout/Preloader'
import PageTransition from './components/Layout/PageTransition'
import Particles3D from './components/Layout/Particles3D'

import Home from './components/Home/Home'
import About from './components/About/About'
import Projects from './components/Projects/Projects'
import Resume from './components/Resume/Resume'
import ResumeWithPDF from './components/Resume/ResumeWithPDF'
import Blog from './components/Blog/Blog'
import Contact from './components/Contact/Contact'

// AnimatePresence requires the location from useLocation
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
        <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/resume" element={<PageTransition><ResumeWithPDF /></PageTransition>} />
        <Route path="/resume-old" element={<PageTransition><Resume /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate assets loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <div className="App min-h-screen flex flex-col bg-light-gradient dark:bg-dark-gradient transition-colors duration-300">
          {loading ? (
            <Preloader />
          ) : (
            <>
              <Navbar />
              <Particles3D />
              
              <div className="flex-grow">
                <ScrollToTop />
                <AnimatedRoutes />
              </div>
              
              <Footer />
            </>
          )}
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App