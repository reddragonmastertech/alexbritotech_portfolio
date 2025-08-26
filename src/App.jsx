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

// Core components (loaded immediately for better LCP)
import Home from './components/Home/Home'
import Contact from './components/Contact/Contact'

// Lazy load heavy components with better splitting
const About = lazy(() => 
  import('./components/About/About').then(module => ({ default: module.default }))
)
const Projects = lazy(() => 
  import('./components/Projects/Projects').then(module => ({ default: module.default }))
)
const Resume = lazy(() => 
  import('./components/Resume/Resume').then(module => ({ default: module.default }))
)
const Blog = lazy(() => 
  import('./components/Blog/Blog').then(module => ({ default: module.default }))
)
const BlogDetail = lazy(() => 
  import('./components/Blog/BlogDetail').then(module => ({ default: module.default }))
)
const PrivacyPolicy = lazy(() => 
  import('./components/Legal/PrivacyPolicy').then(module => ({ default: module.default }))
)
const TermsOfService = lazy(() => 
  import('./components/Legal/TermsOfService').then(module => ({ default: module.default }))
)

// Enhanced loading fallback with better UX
const LazyFallback = ({ message = 'Loading content...' }) => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="text-center">
      <LoadingSpinner size="lg" />
      <p className="text-slate-400 mt-4">{message}</p>
    </div>
  </div>
)

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Optimized preloader with faster loading
    const timer = setTimeout(() => {
      setLoading(false);
      // Performance monitoring after load
      requestIdleCallback(() => {
        performanceMonitor.logSummary();
      }, { timeout: 2000 });
    }, 800); // Reduced from 1000ms to 800ms

    // Preload critical resources
    const preloadCriticalResources = () => {
      // Preload projects data
      import('./data/projects.json').catch(() => {
        console.log('Projects data preload failed - will load on demand');
      });
    };

    // Start preloading after a short delay
    setTimeout(preloadCriticalResources, 100);

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
                            <Suspense fallback={<LazyFallback message="Loading about section..." />}>
                              <About />
                            </Suspense>
                          </section>

                          <section id="projects">
                            <Suspense fallback={<LazyFallback message="Loading projects..." />}>
                              <Projects />
                            </Suspense>
                          </section>

                          <section id="blog">
                            <Suspense fallback={<LazyFallback message="Loading blog..." />}>
                              <Blog />
                            </Suspense>
                          </section>

                          <section id="resume">
                            <Suspense fallback={<LazyFallback message="Loading resume..." />}>
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
