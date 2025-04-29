import { useRef, useEffect, useState, useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import * as THREE from 'three'

// Hàm kiểm tra tương thích WebGL
function isWebGLAvailable() {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && 
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch (e) {
    return false;
  }
}

function Particles3D() {
  const mountRef = useRef(null)
  const [isReady, setIsReady] = useState(false)
  const [hasError, setHasError] = useState(false)
  const { darkMode } = useContext(ThemeContext)
  
  useEffect(() => {
    // Wait a bit to let the DOM fully render
    const timer = setTimeout(() => {
      setIsReady(true)
    }, 500)
    
    return () => clearTimeout(timer)
  }, [])
  
  useEffect(() => {
    if (!isReady || !mountRef.current) return
    if (hasError) return
    
    // Check WebGL compatibility first
    if (!isWebGLAvailable()) {
      console.warn("WebGL is not available in this browser");
      setHasError(true);
      return;
    }
    
    let scene, camera, renderer, particles;
    
    try {
      // Scene setup
      scene = new THREE.Scene()
      
      // Camera with good perspective
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
      camera.position.z = 50
      
      // Renderer setup with transparency
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'default' // Use 'low-power' for mobile devices
      })
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      
      // Add canvas to DOM
      mountRef.current.appendChild(renderer.domElement)
      
      // Create particles geometry - reduced count for better performance
      const particlesCount = 500 // Reduced from 1000
      const particlesGeometry = new THREE.BufferGeometry()
      const positions = new Float32Array(particlesCount * 3)
      const colors = new Float32Array(particlesCount * 3)
      
      // Set particle positions and colors
      for (let i = 0; i < particlesCount; i++) {
        // Random positions in a sphere
        const radius = 100 + Math.random() * 100
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(Math.random() * 2 - 1)
        
        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta) // x
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) // y
        positions[i * 3 + 2] = radius * Math.cos(phi) // z
        
        // Colors - use theme based colors
        if (darkMode) {
          // Dark theme - blue/purple
          colors[i * 3] = 0.2 + Math.random() * 0.2 // r (low for blue/purple)
          colors[i * 3 + 1] = 0.3 + Math.random() * 0.3 // g (medium for blue/purple)
          colors[i * 3 + 2] = 0.6 + Math.random() * 0.4 // b (high for blue/purple)
        } else {
          // Light theme - light blue/cyan
          colors[i * 3] = 0.2 + Math.random() * 0.2 // r (low)
          colors[i * 3 + 1] = 0.7 + Math.random() * 0.3 // g (high for cyan)
          colors[i * 3 + 2] = 0.5 + Math.random() * 0.5 // b (medium)
        }
      }
      
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
      
      // Use a basic PointsMaterial instead of custom shaders
      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.6,
        transparent: true,
        opacity: 0.6,
        vertexColors: true,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending
      })
      
      // Create particle system
      particles = new THREE.Points(particlesGeometry, particlesMaterial)
      scene.add(particles)
      
      // Store original positions for animation
      const originalPositions = positions.slice()
      
      // Animation - use requestAnimationFrame properly
      let animationFrameId;
      
      const animate = () => {
        const time = Date.now() * 0.0001
        
        // Slowly rotate particle system
        particles.rotation.y = time * 0.1
        
        // Gently move particles (but less often for better performance)
        if (Math.floor(time * 10) % 2 === 0) {
          for (let i = 0; i < particlesCount; i++) {
            const i3 = i * 3
            
            // Add subtle wave effect
            const x = originalPositions[i3]
            const y = originalPositions[i3 + 1]
            const z = originalPositions[i3 + 2]
            const sinOffset = Math.sin(time + x * 0.01) * 2
            const cosOffset = Math.cos(time + y * 0.01) * 2
            
            particlesGeometry.attributes.position.array[i3] = x + sinOffset
            particlesGeometry.attributes.position.array[i3 + 1] = y + cosOffset
            particlesGeometry.attributes.position.array[i3 + 2] = z + sinOffset * cosOffset * 0.5
          }
          
          particlesGeometry.attributes.position.needsUpdate = true
        }
        
        // Render scene
        renderer.render(scene, camera)
        
        // Call animate recursively
        animationFrameId = requestAnimationFrame(animate)
      }
      
      animate()
      
      // Handle window resize
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
      }
      
      window.addEventListener('resize', handleResize)
      
      // Handle mouse movement to create interactive effect - throttled for better performance
      let lastMoveTime = 0;
      const handleMouseMove = (event) => {
        const now = performance.now();
        if (now - lastMoveTime < 50) return; // throttle to 20fps
        lastMoveTime = now;
        
        const mouseX = (event.clientX / window.innerWidth) * 2 - 1
        const mouseY = -(event.clientY / window.innerHeight) * 2 + 1
        
        // Move camera slightly based on mouse position
        camera.position.x += (mouseX * 2 - camera.position.x) * 0.01
        camera.position.y += (mouseY * 2 - camera.position.y) * 0.01
        
        camera.lookAt(scene.position)
      }
      
      window.addEventListener('mousemove', handleMouseMove)
      
      // Clean up
      return () => {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
        
        if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
          try {
            mountRef.current.removeChild(renderer.domElement)
          } catch (e) {
            console.log('Error removing canvas', e)
          }
        }
        
        window.removeEventListener('resize', handleResize)
        window.removeEventListener('mousemove', handleMouseMove)
        
        // Dispose geometries and materials
        if (particlesGeometry) particlesGeometry.dispose()
        if (particlesMaterial) particlesMaterial.dispose()
        if (renderer) renderer.dispose()
      }
    } catch (error) {
      console.error('Error initializing 3D particles:', error);
      setHasError(true);
      return () => {}; // Return empty cleanup function
    }
  }, [isReady, darkMode, hasError])
  
  // If there's an error, render nothing
  if (hasError) {
    return null;
  }
  
  return (
    <div 
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  )
}

export default Particles3D