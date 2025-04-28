import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'

function Particles3D() {
  const mountRef = useRef(null)

  useEffect(() => {
    let scene, camera, renderer
    let particles = []
    let cameraMovement = { x: 0, y: 0 }
    let mouseX = 0, mouseY = 0
    let windowHalfX = window.innerWidth / 2
    let windowHalfY = window.innerHeight / 2
    let time = 0
    
    // Colors in hex format - Modern blue and purple palette
    const colors = [
      0x3b82f6, // Blue
      0x4f46e5, // Indigo
      0x8b5cf6, // Violet
      0x6366f1, // Blue/Indigo
      0xa855f7, // Purple
    ]

    const init = () => {
      // Scene setup
      scene = new THREE.Scene()
      
      // Camera setup with wider field of view
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000)
      camera.position.z = 30
      
      // Renderer setup with antialiasing
      renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true,
        powerPreference: 'high-performance'
      })
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setClearColor(0x000000, 0) // Transparent background
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      mountRef.current.appendChild(renderer.domElement)
      
      // Create particle systems with different characteristics
      createParticleLayer(1800, 120, 0.6, 1.2, 'small')  // Far layer: more particles, larger area, smaller size
      createParticleLayer(600, 80, 0.7, 1.8, 'medium')   // Mid layer
      createParticleLayer(200, 40, 0.9, 2.5, 'large')    // Close layer: fewer particles, smaller area, larger size
      
      // Add a subtle ambient light
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.1)
      scene.add(ambientLight)
      
      // Event listeners
      document.addEventListener('mousemove', onDocumentMouseMove, { passive: true })
      window.addEventListener('resize', onWindowResize)
    }
    
    const createParticleLayer = (count, spread, opacity, maxSize, type) => {
      // Create texture for particles
      const texture = createParticleTexture(type)
      
      const positions = new Float32Array(count * 3)
      const scales = new Float32Array(count)
      const colorArray = new Float32Array(count * 3)
      
      const color = new THREE.Color()
      
      for (let i = 0; i < count; i++) {
        // Position particles in a spherical distribution with some randomness for natural look
        const radius = Math.random() * spread
        const theta = Math.random() * Math.PI * 2
        const phi = Math.random() * Math.PI
        
        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)     // x
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) // y
        positions[i * 3 + 2] = radius * Math.cos(phi) * Math.random()   // z
        
        // Random size variation for depth effect 
        scales[i] = Math.random() * maxSize + 0.5
        
        // Assign colors with variation from our palette
        const selectedColor = colors[Math.floor(Math.random() * colors.length)]
        color.set(selectedColor)
        
        // Add slight color variation for more natural look
        color.offsetHSL(0, (Math.random() - 0.5) * 0.3, (Math.random() - 0.5) * 0.2)
        
        colorArray[i * 3] = color.r
        colorArray[i * 3 + 1] = color.g
        colorArray[i * 3 + 2] = color.b
      }
      
      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      geometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3))
      geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1))
      
      // Custom shader material for more advanced visual effects
      const material = new THREE.ShaderMaterial({
        uniforms: {
          pointTexture: { value: texture },
          time: { value: 0.0 },
          opacity: { value: opacity },
        },
        vertexShader: `
          attribute float scale;
          attribute vec3 color;
          varying vec3 vColor;
          uniform float time;
          
          void main() {
            vColor = color;
            
            // Add subtle motion based on position and time
            vec3 pos = position;
            float waveX = sin(time * 0.3 + pos.x * 0.03) * 0.5;
            float waveY = cos(time * 0.2 + pos.y * 0.04) * 0.5;
            
            pos.x += waveX;
            pos.y += waveY;
            
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            
            // Size attenuation based on distance
            gl_PointSize = scale * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          uniform sampler2D pointTexture;
          uniform float opacity;
          varying vec3 vColor;
          
          void main() {
            // Apply the texture with soft edges
            vec4 texColor = texture2D(pointTexture, gl_PointCoord);
            gl_FragColor = vec4(vColor, opacity) * texColor;
            
            // Discard transparent pixels for better blending
            if (gl_FragColor.a < 0.05) discard;
          }
        `,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        transparent: true,
        vertexColors: true,
      })
      
      const particleSystem = new THREE.Points(geometry, material)
      
      // Add different initial rotation for each layer
      particleSystem.rotation.x = Math.random() * 6
      particleSystem.rotation.y = Math.random() * 6
      particleSystem.rotation.z = Math.random() * 6
      
      // Store the type to control animation behavior
      particleSystem.userData.type = type
      
      scene.add(particleSystem)
      particles.push(particleSystem)
    }
    
    // Create different textures for different sized particles
    const createParticleTexture = (type) => {
      const canvas = document.createElement('canvas')
      canvas.width = 128
      canvas.height = 128
      
      const context = canvas.getContext('2d')
      
      // Create gradient for glow effect
      const gradient = context.createRadialGradient(
        64, 64, 0, 64, 64, 64
      )
      
      let softness = 0.2
      if (type === 'medium') softness = 0.15
      if (type === 'large') softness = 0.1
      
      gradient.addColorStop(0, `rgba(255, 255, 255, 1)`)
      gradient.addColorStop(0.3, `rgba(255, 255, 255, 0.8)`)
      gradient.addColorStop(0.6, `rgba(255, 255, 255, ${softness})`)
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
      
      // Draw the particle
      context.fillStyle = gradient
      context.beginPath()
      context.arc(64, 64, 64, 0, Math.PI * 2, false)
      context.fill()
      
      const texture = new THREE.CanvasTexture(canvas)
      texture.needsUpdate = true
      
      return texture
    }
    
    const onDocumentMouseMove = (event) => {
      // Track mouse movement for interactive camera effect
      mouseX = (event.clientX - windowHalfX) * 0.05
      mouseY = (event.clientY - windowHalfY) * 0.05
    }
    
    const onWindowResize = () => {
      windowHalfX = window.innerWidth / 2
      windowHalfY = window.innerHeight / 2
      
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    
    const animate = () => {
      requestAnimationFrame(animate)
      
      time += 0.01
      
      // Smooth camera movement based on mouse position
      cameraMovement.x += (mouseX - cameraMovement.x) * 0.03
      cameraMovement.y += (mouseY - cameraMovement.y) * 0.03
      
      camera.position.x += (cameraMovement.x - camera.position.x) * 0.05
      camera.position.y += (-cameraMovement.y - camera.position.y) * 0.05
      camera.lookAt(scene.position)
      
      // Update each particle system differently
      particles.forEach(particleSystem => {
        const type = particleSystem.userData.type

        // Different rotation speeds based on particle type
        if (type === 'small') {
          particleSystem.rotation.y += 0.0005
          particleSystem.rotation.x += 0.0002
        } else if (type === 'medium') {
          particleSystem.rotation.y += 0.0003
          particleSystem.rotation.z += 0.0001
        } else {
          particleSystem.rotation.x += 0.0001
          particleSystem.rotation.z += 0.0002
        }
        
        // Update time uniform for shader animation
        if (particleSystem.material.uniforms && particleSystem.material.uniforms.time) {
          particleSystem.material.uniforms.time.value = time
        }
      })
      
      renderer.render(scene, camera)
    }
    
    init()
    animate()
    
    // Add a pulse animation to the particles on load
    gsap.to(particles, {
      duration: 2,
      ease: "power2.inOut",
      onUpdate: () => {
        particles.forEach((particle, i) => {
          particle.scale.set(
            1 + Math.sin(time + i * 0.2) * 0.05,
            1 + Math.sin(time + i * 0.2) * 0.05,
            1 + Math.sin(time + i * 0.2) * 0.05
          )
        })
      }
    })
    
    return () => {
      // Cleanup
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      
      window.removeEventListener('resize', onWindowResize)
      document.removeEventListener('mousemove', onDocumentMouseMove)
      
      // Dispose resources properly to prevent memory leaks
      particles.forEach(particle => {
        scene.remove(particle)
        if (particle.geometry) particle.geometry.dispose()
        if (particle.material) {
          if (particle.material.uniforms && particle.material.uniforms.pointTexture) {
            particle.material.uniforms.pointTexture.value.dispose()
          }
          particle.material.dispose()
        }
      })
      
      renderer.dispose()
      scene.clear()
    }
  }, [])
  
  return (
    <div
      ref={mountRef}
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
      aria-hidden="true"
    />
  )
}

export default Particles3D