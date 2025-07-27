import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

import { ThemeProvider } from './context/ThemeContext'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'
import ScrollToTop from './components/Layout/ScrollToTop'
import Preloader from './components/Layout/Preloader'
import Particles3D from './components/Layout/Particles3D'

import Home from './components/Home/Home'
import About from './components/About/About'
import Projects from './components/Projects/Projects'
import Resume from './components/Resume/ResumeWithPDF'
import Blog from './components/Blog/Blog'
import Contact from './components/Contact/Contact'
import PrivacyPolicy from './components/Legal/PrivacyPolicy'
import TermsOfService from './components/Legal/TermsOfService'

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
    <ErrorBoundary fallbackMessage="Something went wrong with the portfolio. Please refresh the page.">
      <ThemeProvider>
        <Router>
          <div className="App min-h-screen bg-light-gradient dark:bg-dark-gradient transition-colors duration-300">
            {loading ? (
              <Preloader />
            ) : (
              <>
                <Navbar />
                <Particles3D />

                <main className="relative">
                  <ScrollToTop />
                  <ErrorBoundary fallbackMessage="There was an error loading the page content.">
                    <Routes>
                      {/* Main Portfolio Page */}
                      <Route path="/" element={
                        <>
                          <section id="home">
                            <Home />
                          </section>

                          <section id="about">
                            <About />
                          </section>

                          <section id="projects">
                            <Projects />
                          </section>

                          <section id="blog">
                            <Blog />
                          </section>

                          <section id="resume">
                            <Resume />
                          </section>

                          <section id="contact">
                            <Contact />
                          </section>
                        </>
                      } />

                      {/* Legal Pages */}
                      <Route path="/privacy" element={<PrivacyPolicy />} />
                      <Route path="/terms" element={<TermsOfService />} />
                    </Routes>
                  </ErrorBoundary>
                </main>

                <Footer />
              </>
            )}
          </div>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App
