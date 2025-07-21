import { useEffect, useState } from 'react'
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
                  {/* All sections in one page */}
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
                </ErrorBoundary>
              </main>

              <Footer />
            </>
          )}
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App
