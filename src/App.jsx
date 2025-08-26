import { useEffect, useState, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'
import ScrollToTop from './components/Layout/ScrollToTop'
import Preloader from './components/Layout/Preloader'
import MobilePreloader from './components/Layout/MobilePreloader'
import MobileSafeSection from './components/Layout/MobileSafeSection'

// Only Home loaded immediately for faster initial render
import Home from './components/Home/Home'

// Lazy load everything else
const About = lazy(() => import('./components/About/About'))
const Projects = lazy(() => import('./components/Projects/Projects'))
const Resume = lazy(() => import('./components/Resume/Resume'))
const Blog = lazy(() => import('./components/Blog/Blog'))
const Contact = lazy(() => import('./components/Contact/Contact'))
const BlogDetail = lazy(() => import('./components/Blog/BlogDetail'))
const PrivacyPolicy = lazy(() => import('./components/Legal/PrivacyPolicy'))
const TermsOfService = lazy(() => import('./components/Legal/TermsOfService'))

function App() {
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      const mobile = window.innerWidth < 768 || 
                   /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(mobile);
      return mobile;
    };
    
    const mobile = checkMobile();
    
    // Ultra-fast loading for mobile devices
    const loadTime = mobile ? 150 : 500; // Extremely fast on mobile
    
    const timer = setTimeout(() => {
      setLoading(false);
    }, loadTime);

    const handleResize = () => checkMobile();
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Lightweight fallback for mobile
  const FastFallback = ({ message = 'Loading...' }) => (
    <div className="py-4 flex items-center justify-center min-h-[30vh]">
      <div className="text-center">
        <div className="w-4 h-4 border border-slate-600 border-t-blue-400 rounded-full animate-spin mx-auto mb-1"></div>
        <p className="text-slate-500 text-xs">{message}</p>
      </div>
    </div>
  );

  return (
    <ErrorBoundary fallbackMessage="Something went wrong. Please refresh the page.">
      <Router>
        <div className="App min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-slate-100">
          {loading ? (
            isMobile ? <MobilePreloader /> : <Preloader />
          ) : (
            <>
              <Navbar />
              <main className="relative">
                <ScrollToTop />
                <ErrorBoundary fallbackMessage="There was an error loading the page content.">
                  <Routes>
                    {/* Main Portfolio Page - Mobile Optimized */}
                    <Route path="/" element={
                      <>
                        {/* Home section - always priority */}
                        <MobileSafeSection id="home" priority={true}>
                          <Home />
                        </MobileSafeSection>

                        {/* About section - lazy load with intersection observer */}
                        <MobileSafeSection id="about" fallback={<FastFallback message="Loading about..." />}>
                          <Suspense fallback={<FastFallback message="Loading about..." />}>
                            <About />
                          </Suspense>
                        </MobileSafeSection>

                        {/* Projects section */}
                        <MobileSafeSection id="projects" fallback={<FastFallback message="Loading projects..." />}>
                          <Suspense fallback={<FastFallback message="Loading projects..." />}>
                            <Projects />
                          </Suspense>
                        </MobileSafeSection>

                        {/* Blog section */}
                        <MobileSafeSection id="blog" fallback={<FastFallback message="Loading articles..." />}>
                          <Suspense fallback={<FastFallback message="Loading articles..." />}>
                            <Blog />
                          </Suspense>
                        </MobileSafeSection>

                        {/* Resume section */}
                        <MobileSafeSection id="resume" fallback={<FastFallback message="Loading resume..." />}>
                          <Suspense fallback={<FastFallback message="Loading resume..." />}>
                            <Resume />
                          </Suspense>
                        </MobileSafeSection>

                        {/* Contact section */}
                        <MobileSafeSection id="contact" fallback={<FastFallback message="Loading contact..." />}>
                          <Suspense fallback={<FastFallback message="Loading contact..." />}>
                            <Contact />
                          </Suspense>
                        </MobileSafeSection>
                      </>
                    } />

                    {/* Individual Blog Posts */}
                    <Route path="/blog/:slug" element={
                      <Suspense fallback={<FastFallback message="Loading article..." />}>
                        <BlogDetail />
                      </Suspense>
                    } />

                    {/* Legal Pages */}
                    <Route path="/privacy" element={
                      <Suspense fallback={<FastFallback message="Loading privacy policy..." />}>
                        <PrivacyPolicy />
                      </Suspense>
                    } />

                    <Route path="/terms" element={
                      <Suspense fallback={<FastFallback message="Loading terms..." />}>
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
  )
}

export default App
