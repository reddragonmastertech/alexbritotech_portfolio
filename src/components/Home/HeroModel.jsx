import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'

function HeroModel() {
  const mountRef = useRef(null)
  
  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene()
    
    // Camera setup with wider field of view
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000)
    camera.position.z = 5
    
    // Renderer with improved quality
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    })
    renderer.setSize(500, 500) // Fixed size for the component
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0) // Transparent background
    mountRef.current.appendChild(renderer.domElement)
    
    // Improved Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambientLight)
    
    const pointLight1 = new THREE.PointLight(0x3b82f6, 1.2) // Bright Blue
    pointLight1.position.set(5, 5, 5)
    scene.add(pointLight1)
    
    const pointLight2 = new THREE.PointLight(0x8b5cf6, 1) // Purple
    pointLight2.position.set(-5, -5, 3)
    scene.add(pointLight2)
    
    const pointLight3 = new THREE.PointLight(0x60a5fa, 0.8) // Light Blue
    pointLight3.position.set(0, 5, -5)
    scene.add(pointLight3)
    
    // Collection for all objects
    const allObjects = []
    
    // Create a modernistic toroidal knot as the central element
    const geometry = new THREE.TorusKnotGeometry(1.2, 0.4, 128, 32, 2, 3)
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x3b82f6, // Blue
      metalness: 0.7,
      roughness: 0.2,
      clearcoat: 0.8,
      clearcoatRoughness: 0.2,
      reflectivity: 0.8,
      envMapIntensity: 1.2,
    })
    
    const torusKnot = new THREE.Mesh(geometry, material)
    scene.add(torusKnot)
    allObjects.push(torusKnot)
    
    // Create a wireframe overlay for the knot
    const wireframeGeometry = new THREE.TorusKnotGeometry(1.25, 0.42, 128, 32, 2, 3)
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    })
    const wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial)
    scene.add(wireframe)
    allObjects.push(wireframe)
    
    // Create a particle ring system that orbits the knot
    const createRings = () => {
      const NUM_RINGS = 3
      
      for (let i = 0; i < NUM_RINGS; i++) {
        // Create a ring of particles
        const ringGeometry = new THREE.BufferGeometry()
        const ringRadius = 2.5 + i * 0.5
        const numParticles = 80 + i * 20
        
        const positions = new Float32Array(numParticles * 3)
        const colors = new Float32Array(numParticles * 3)
        const sizes = new Float32Array(numParticles)
        
        const colorOptions = [
          new THREE.Color(0x3b82f6), // Blue
          new THREE.Color(0x8b5cf6), // Purple
          new THREE.Color(0x6366f1), // Indigo
          new THREE.Color(0x60a5fa), // Light Blue
        ]
        // Đảm bảo colorOptions luôn là mảng
        if (!Array.isArray(colorOptions) || colorOptions.length === 0) {
          throw new Error('colorOptions must be a non-empty array')
        }
        
        // Create particles in a ring
        for (let j = 0; j < numParticles; j++) {
          // Calculate position on the ring
          const angle = (j / numParticles) * Math.PI * 2
          const randomOffset = Math.random() * 0.2 - 0.1
          
          // Position
          positions[j * 3] = Math.cos(angle) * (ringRadius + randomOffset)
          positions[j * 3 + 1] = Math.sin(angle) * (ringRadius + randomOffset)
          positions[j * 3 + 2] = (Math.random() - 0.5) * 0.3
          
          // Color
          const color = colorOptions[Math.floor(Math.random() * colorOptions.length)]
          colors[j * 3] = color.r
          colors[j * 3 + 1] = color.g
          colors[j * 3 + 2] = color.b
          
          // Size
          sizes[j] = Math.random() * 0.2 + 0.05
        }
        
        // Set attributes
        ringGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        ringGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
        ringGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
        
        // Create a custom shader material for particles
        const ringMaterial = new THREE.ShaderMaterial({
          uniforms: {
            time: { value: 0 },
            size: { value: 0.1 },
          },
          vertexShader: `
            attribute float size;
            attribute vec3 color;
            varying vec3 vColor;
            uniform float time;
            
            void main() {
              vColor = color;
              
              // Calculate position with some animation
              vec3 pos = position;
              float angle = time * 0.2 * (1.0 + float(gl_VertexID % 4) * 0.05);
              
              // Add some subtle oscillation based on position and time
              pos.z += sin(time * 0.5 + pos.x * 2.0) * 0.15;
              
              vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
              
              // Size attenuation based on distance
              gl_PointSize = size * 30.0 * (1.0 / -mvPosition.z);
              gl_Position = projectionMatrix * mvPosition;
            }
          `,
          fragmentShader: `
            varying vec3 vColor;
            
            void main() {
              // Create a soft circle shape for each particle
              float distanceToCenter = length(gl_PointCoord - vec2(0.5));
              float strength = 1.0 - smoothstep(0.0, 0.5, distanceToCenter);
              
              // Apply color with soft edges
              gl_FragColor = vec4(vColor, strength * strength);
              
              // Discard pixels that are too transparent
              if (gl_FragColor.a < 0.05) discard;
            }
          `,
          blending: THREE.AdditiveBlending,
          depthTest: false,
          transparent: true,
          vertexColors: true,
        })
        
        const ring = new THREE.Points(ringGeometry, ringMaterial)
        ring.rotation.x = Math.PI * 0.3 + i * 0.2
        ring.userData = { isRing: true, ringIndex: i }
        
        scene.add(ring)
        allObjects.push(ring)
      }
    }
    
    createRings()
    
    // Create floating digital panels to represent code/tech
    const createTechPanels = () => {
      const panelData = [
        { 
          width: 0.8, 
          height: 0.5, 
          depth: 0.05, 
          color: 0x3b82f6,
          position: { x: 1.8, y: 1.2, z: -0.8 },
          rotation: { x: 0.2, y: -0.3, z: 0 }
        },
        { 
          width: 0.6, 
          height: 0.4, 
          depth: 0.05, 
          color: 0x8b5cf6,
          position: { x: -1.9, y: -1.0, z: -1.2 },
          rotation: { x: -0.1, y: 0.2, z: 0.1 }
        },
        { 
          width: 0.7, 
          height: 0.3, 
          depth: 0.05, 
          color: 0x60a5fa,
          position: { x: -1.5, y: 1.4, z: -0.9 },
          rotation: { x: -0.2, y: -0.1, z: -0.1 }
        }
      ]
      
      panelData.forEach(panel => {
        const geometry = new THREE.BoxGeometry(panel.width, panel.height, panel.depth)
        
        // Create glass-like material
        const material = new THREE.MeshPhysicalMaterial({
          color: panel.color,
          transparent: true,
          opacity: 0.7,
          roughness: 0.2,
          metalness: 0.8,
          clearcoat: 1,
          clearcoatRoughness: 0.1,
        })
        
        const panelMesh = new THREE.Mesh(geometry, material)
        panelMesh.position.set(panel.position.x, panel.position.y, panel.position.z)
        panelMesh.rotation.set(panel.rotation.x, panel.rotation.y, panel.rotation.z)
        
        // Add subtle light emission from the panel
        const panelLight = new THREE.PointLight(panel.color, 0.4, 3)
        panelLight.position.copy(panelMesh.position)
        scene.add(panelLight)
        
        // Create a wireframe outline for the panel
        const edges = new THREE.EdgesGeometry(geometry)
        const lineMaterial = new THREE.LineBasicMaterial({ 
          color: 0xffffff,
          transparent: true, 
          opacity: 0.8 
        })
        const wireframe = new THREE.LineSegments(edges, lineMaterial)
        
        panelMesh.add(wireframe)
        scene.add(panelMesh)
        
        // Add panels to objects collection
        panelMesh.userData = { isPanel: true }
        allObjects.push(panelMesh)
        allObjects.push(panelLight)
      })
    }
    
    createTechPanels()
    
    // Add some floating particles around the scene for depth
    const createFloatingParticles = () => {
      const particleCount = 50
      const particleGeometry = new THREE.BufferGeometry()
      const positions = new Float32Array(particleCount * 3)
      const colors = new Float32Array(particleCount * 3)
      
      for (let i = 0; i < particleCount; i++) {
        // Random position in a sphere around the origin
        const radius = 3 + Math.random() * 3
        const theta = Math.random() * Math.PI * 2
        const phi = Math.random() * Math.PI
        
        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
        positions[i * 3 + 2] = radius * Math.cos(phi)
        
        // Color - blue/purple palette
        const colorVal = Math.random()
        if (colorVal > 0.66) {
          colors[i * 3] = 0.23  // Blue (0x3b82f6)
          colors[i * 3 + 1] = 0.51
          colors[i * 3 + 2] = 0.96
        } else if (colorVal > 0.33) {
          colors[i * 3] = 0.54  // Purple (0x8b5cf6)
          colors[i * 3 + 1] = 0.36
          colors[i * 3 + 2] = 0.96
        } else {
          colors[i * 3] = 0.37  // Indigo (0x6366f1)
          colors[i * 3 + 1] = 0.40
          colors[i * 3 + 2] = 0.94
        }
      }
      
      particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
      
      const particleMaterial = new THREE.PointsMaterial({
        size: 0.15,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      })
      
      const particles = new THREE.Points(particleGeometry, particleMaterial)
      particles.userData = { isParticles: true }
      scene.add(particles)
      allObjects.push(particles)
      
      // Store original positions for animation
      particles.userData.originalPositions = positions.slice()
    }
    
    createFloatingParticles()
    
    // Animation variables
    const clock = new THREE.Clock()
    
    // Animation function
    const animate = () => {
      requestAnimationFrame(animate)
      
      const elapsedTime = clock.getElapsedTime()
      
      // Animate the main torus knot
      torusKnot.rotation.x = elapsedTime * 0.2
      torusKnot.rotation.y = elapsedTime * 0.3
      wireframe.rotation.x = elapsedTime * 0.2
      wireframe.rotation.y = elapsedTime * 0.3
      
      // Animate rings
      allObjects.forEach(obj => {
        if (obj.userData && obj.userData.isRing) {
          // Update shader time uniform
          if (obj.material.uniforms && obj.material.uniforms.time) {
            obj.material.uniforms.time.value = elapsedTime
          }
          
          // Rotate rings at different speeds
          const ringIndex = obj.userData.ringIndex
          const baseSpeed = 0.1 - (ringIndex * 0.02)
          obj.rotation.z += baseSpeed / 10
          
          // Make rings oscillate
          obj.position.z = Math.sin(elapsedTime * 0.5 + ringIndex * 0.5) * 0.2
        }
        
        // Animate panels
        if (obj.userData && obj.userData.isPanel) {
          // Subtle floating motion
          obj.position.y += Math.sin(elapsedTime + obj.position.x) * 0.001
          obj.rotation.z = Math.sin(elapsedTime * 0.3 + obj.position.y) * 0.05
          
          // Subtle pulsing effect
          const pulseScale = 1 + Math.sin(elapsedTime + obj.position.x * 2) * 0.03
          obj.scale.set(pulseScale, pulseScale, pulseScale)
        }
        
        // Animate particles
        if (obj.userData && obj.userData.isParticles) {
          const positions = obj.geometry.attributes.position.array
          const originalPositions = obj.userData.originalPositions
          
          // Make particles float around their original positions
          for (let i = 0; i < positions.length; i += 3) {
            positions[i] = originalPositions[i] + Math.sin(elapsedTime + i * 0.1) * 0.1
            positions[i+1] = originalPositions[i+1] + Math.cos(elapsedTime * 0.7 + i * 0.1) * 0.1
            positions[i+2] = originalPositions[i+2] + Math.sin(elapsedTime * 0.5 + i * 0.1) * 0.1
          }
          
          obj.geometry.attributes.position.needsUpdate = true
          obj.rotation.y = elapsedTime * 0.05
        }
      })
      
      renderer.render(scene, camera)
    }
    
    animate()
    
    // Add interactive rotation on mouse move using GSAP
    const handleMouseMove = (event) => {
      const rect = mountRef.current.getBoundingClientRect()
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1
      
      // Use GSAP for smooth rotation
      gsap.to(torusKnot.rotation, {
        x: torusKnot.rotation.x + y * 0.1,
        y: torusKnot.rotation.y + x * 0.1,
        duration: 1,
        ease: "power2.out"
      })
      
      gsap.to(wireframe.rotation, {
        x: wireframe.rotation.x + y * 0.1,
        y: wireframe.rotation.y + x * 0.1,
        duration: 1,
        ease: "power2.out"
      })
    }
    
    // Initial animation - make object appear with a GSAP animation
    gsap.from(torusKnot.scale, {
      x: 0.4,
      y: 0.4,
      z: 0.4,
      duration: 1.5,
      ease: "elastic.out(1, 0.3)"
    })
    
    gsap.from(wireframe.scale, {
      x: 0.4,
      y: 0.4,
      z: 0.4,
      duration: 1.5,
      ease: "elastic.out(1, 0.3)"
    })
    
    // Add event listeners
    mountRef.current.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', onWindowResize)
    
    function onWindowResize() {
      camera.updateProjectionMatrix()
      renderer.setSize(500, 500)
    }
    
    // Cleanup function
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement)
        mountRef.current.removeEventListener('mousemove', handleMouseMove)
      }
      
      window.removeEventListener('resize', onWindowResize)
      
      // Dispose of all geometries and materials
      allObjects.forEach(object => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
          if (object.geometry) object.geometry.dispose()
          
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose())
            } else {
              if (object.material.map) object.material.map.dispose()
              object.material.dispose()
            }
          }
        }
        
        if (object instanceof THREE.PointLight) {
          scene.remove(object)
        }
      })
      
      renderer.dispose()
      scene.clear()
    }
  }, [])
  
  return (
    <div 
      ref={mountRef}
      className="flex justify-center items-center h-[500px] w-full relative"
    />
  )
}

export default HeroModel