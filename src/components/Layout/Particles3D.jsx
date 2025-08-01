import { useRef, useEffect, useState } from "react";
import * as THREE from "three";

// Hàm kiểm tra tương thích WebGL
function isWebGLAvailable() {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch (error) {
    console.log(error);
    return false;
  }
}

function Particles3D() {
  const mountRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Wait a bit to let the DOM fully render
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isReady || !mountRef.current) return;
    if (hasError) return;

    const mountNode = mountRef.current;

    // Check WebGL compatibility first
    if (!isWebGLAvailable()) {
      console.warn("WebGL is not available in this browser");
      setHasError(true);
      return;
    }

    let scene, camera, renderer, particles, animationId;

    try {
      // Scene setup
      scene = new THREE.Scene();
      
      // Beautiful gradient background for light mode
      const vertexShader = `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `;
      
      const fragmentShader = `
        varying vec2 vUv;
        void main() {
          vec3 color1 = vec3(0.667, 0.867, 0.918); // Light blue
          vec3 color2 = vec3(0.918, 0.941, 0.973); // Almost white
          vec3 color3 = vec3(0.812, 0.890, 0.976); // Light lavender
          
          float gradient = smoothstep(0.0, 1.0, vUv.y);
          vec3 finalColor = mix(color1, mix(color2, color3, vUv.x), gradient);
          
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `;
      
      const bgGeometry = new THREE.PlaneGeometry(2, 2);
      const bgMaterial = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader
      });
      const bgMesh = new THREE.Mesh(bgGeometry, bgMaterial);
      bgMesh.position.z = -10;
      scene.add(bgMesh);

      // Camera setup
      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 150;

      // Renderer setup with better quality
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance"
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      mountNode.appendChild(renderer.domElement);

      // Create beautiful floating particles
      const particleCount = 800;
      const particlesGeometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const sizes = new Float32Array(particleCount);

      for (let i = 0; i < particleCount; i++) {
        // Random positions in a sphere
        const radius = 80 + Math.random() * 120;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);

        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = radius * Math.cos(phi);

        // Beautiful light mode colors - blues and purples
        const colorVariant = Math.random();
        if (colorVariant < 0.33) {
          // Soft blue
          colors[i * 3] = 0.3 + Math.random() * 0.2;     // r
          colors[i * 3 + 1] = 0.6 + Math.random() * 0.3; // g  
          colors[i * 3 + 2] = 0.9 + Math.random() * 0.1; // b
        } else if (colorVariant < 0.66) {
          // Soft purple
          colors[i * 3] = 0.6 + Math.random() * 0.3;     // r
          colors[i * 3 + 1] = 0.3 + Math.random() * 0.2; // g
          colors[i * 3 + 2] = 0.9 + Math.random() * 0.1; // b
        } else {
          // Soft indigo
          colors[i * 3] = 0.4 + Math.random() * 0.2;     // r
          colors[i * 3 + 1] = 0.4 + Math.random() * 0.2; // g
          colors[i * 3 + 2] = 0.8 + Math.random() * 0.2; // b
        }

        // Random sizes
        sizes[i] = Math.random() * 2 + 0.5;
      }

      particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      particlesGeometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

      // Enhanced particle material
      const particlesMaterial = new THREE.PointsMaterial({
        size: 1.2,
        transparent: true,
        opacity: 0.4,
        vertexColors: true,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending,
      });

      particles = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particles);

      // Animation loop
      let mouseX = 0;
      let mouseY = 0;
      let targetRotationX = 0;
      let targetRotationY = 0;

      const animate = () => {
        animationId = requestAnimationFrame(animate);

        // Smooth rotation based on mouse
        particles.rotation.x += (targetRotationX - particles.rotation.x) * 0.02;
        particles.rotation.y += (targetRotationY - particles.rotation.y) * 0.02;

        // Gentle auto rotation
        particles.rotation.y += 0.002;
        particles.rotation.x += 0.001;

        // Floating motion
        const time = Date.now() * 0.001;
        particles.position.y = Math.sin(time * 0.5) * 2;

        renderer.render(scene, camera);
      };

      animate();

      // Mouse interaction
      const handleMouseMove = (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

        targetRotationX = mouseY * 0.2;
        targetRotationY = mouseX * 0.2;
      };

      // Window resize
      const handleResize = () => {
        if (!camera || !renderer) return;
        
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("resize", handleResize);

      // Cleanup function
      return () => {
        if (animationId) {
          cancelAnimationFrame(animationId);
        }

        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("resize", handleResize);

        if (mountNode && renderer && renderer.domElement) {
          mountNode.removeChild(renderer.domElement);
        }

        if (renderer) {
          renderer.dispose();
        }

        if (particlesGeometry) {
          particlesGeometry.dispose();
        }

        if (particlesMaterial) {
          particlesMaterial.dispose();
        }
      };

    } catch (error) {
      console.error("Error initializing Three.js:", error);
      setHasError(true);
    }
  }, [isReady, hasError]);

  if (hasError) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 -z-10" />
    );
  }

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 -z-10"
      style={{ pointerEvents: "none" }}
    />
  );
}

export default Particles3D;
