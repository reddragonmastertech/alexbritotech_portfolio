import { useEffect, useState, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import performanceMonitor from './utils/performanceMonitor'

import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'
import ScrollToTop from './components/Layout/ScrollToTop'
import Preloader from './components/Layout/Preloader'
import LoadingSpinner from './components/UI/LoadingSpinner'

// Core components (loaded immediately)
import Home from './components/Home/Home'
import Contact from './components/Contact/Contact'

// Lazy load heavy components to improve initial load time
const About = lazy(() => import('./components/About/About'))
const Projects = lazy(() => import('./components/Projects/Projects'))
const Resume = lazy(() => import('./components/Resume/Resume'))
const Blog = lazy(() => import('./components/Blog/Blog'))
const BlogDetail = lazy(() => import('./components/Blog/BlogDetail'))
const PrivacyPolicy = lazy(() => import('./components/Legal/PrivacyPolicy'))
const TermsOfService = lazy(() => import('./components/Legal/TermsOfService'))

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Reduced loading time for faster app startup
    const timer = setTimeout(() => {
      setLoading(false);
      // Log performance summary after app loads
      setTimeout(() => performanceMonitor.logSummary(), 1000);
    }, 1000); // Reduced from 2000ms to 1000ms

    return () => clearTimeout(timer);
  }, []);

  return (
    <ErrorBoundary fallbackMessage="Something went wrong with the portfolio. Please refresh the page.">
      <Router>
        <div className="App min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-slate-100">
          {loading ? (
            <Preloader />
          ) : (
            <>
              <Navbar />

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
                            <Suspense fallback={<LoadingSpinner />}>
                              <About />
                            </Suspense>
                          </section>

                          <section id="projects">
                            <Suspense fallback={<LoadingSpinner />}>
                              <Projects />
                            </Suspense>
                          </section>

                          <section id="blog">
                            <Suspense fallback={<LoadingSpinner />}>
                              <Blog />
                            </Suspense>
                          </section>

                          <section id="resume">
                            <Suspense fallback={<LoadingSpinner />}>
                              <Resume />
                            </Suspense>
                          </section>

                          <section id="contact">
                            <Contact />
                          </section>
                        </>
                      } />

                      {/* Individual Blog Posts */}
                      <Route path="/blog/:slug" element={
                        <Suspense fallback={<LoadingSpinner />}>
                          <BlogDetail />
                        </Suspense>
                      } />

                      {/* Legal Pages */}
                      <Route path="/privacy" element={
                        <Suspense fallback={<LoadingSpinner />}>
                          <PrivacyPolicy />
                        </Suspense>
                      } />
                      <Route path="/terms" element={
                        <Suspense fallback={<LoadingSpinner />}>
                          <TermsOfService />
                        </Suspense>
                      } />
                    </Routes>
                  </ErrorBoundary>
                </main>

                <Footer />
              </>
            )}
          </div>
        </Router>
    </ErrorBoundary>
  );
}

export default App
