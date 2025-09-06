import { useEffect, useState, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import Navbar from './components/Layout/Navigation/Navbar'
import Footer from './components/Layout/Navigation/Footer'
import ScrollToTop from './components/Layout/Utilities/ScrollToTop'
import Preloader from './components/Layout/Utilities/Preloader'
import MobilePreloader from './components/Layout/Mobile/MobilePreloader'
import MobileSafeSection from './components/Layout/Mobile/MobileSafeSection'

// Only Home loaded immediately for faster initial render
import Home from './components/Home/Home'

// Lazy load everything else
const About = lazy(() => import('./components/About/About'))
const Projects = lazy(() => import('./components/Projects/Projects'))
const Resume = lazy(() => import('./components/Resume/Resume'))
const TechStack = lazy(() => import('./components/TechStack/TechStack'))
const Contact = lazy(() => import('./components/Contact/Contact'))

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
        <div className="App min-h-screen relative">
          {/* Global Background */}
          <div className="fixed inset-0 bg-gradient-to-br from-gray-950 via-slate-950 to-black">
            {/* Seamless Background decoration */}
            <div className="absolute inset-0 w-full h-full">
              {/* Primary gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 via-purple-950/20 to-gray-950/40"></div>
              
              {/* Animated blur circles - darker and more subtle */}
              <div className="absolute top-0 -left-20 w-96 h-96 bg-gradient-to-br from-blue-600/8 to-cyan-600/5 rounded-full blur-3xl animate-pulse-slow"></div>
              <div className="absolute -top-20 right-0 w-80 h-80 bg-gradient-to-br from-purple-600/6 to-pink-600/4 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
              <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-gradient-to-br from-emerald-600/4 to-teal-600/3 rounded-full blur-3xl animate-pulse-slow delay-2000"></div>
              <div className="absolute -bottom-20 -right-20 w-88 h-88 bg-gradient-to-br from-violet-600/5 to-indigo-600/4 rounded-full blur-3xl animate-pulse-slow delay-3000"></div>
              <div className="absolute top-1/2 -left-10 w-64 h-64 bg-gradient-to-br from-teal-600/3 to-blue-600/2 rounded-full blur-3xl animate-pulse-slow delay-4000"></div>
              
              {/* Subtle texture overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/3 to-transparent"></div>
            </div>
          </div>

          {/* Content with relative positioning */}
          <div className="relative z-10 text-slate-100">{loading ? (
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

                        {/* Tech Stack section */}
                        <MobileSafeSection id="tech-stack" fallback={<FastFallback message="Loading tech stack..." />}>
                          <Suspense fallback={<FastFallback message="Loading tech stack..." />}>
                            <TechStack />
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
                  </Routes>
                </ErrorBoundary>
              </main>
              <Footer />
            </>
          )}
          </div>
        </div>
      </Router>
    </ErrorBoundary>
  )
}

export default App
