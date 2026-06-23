"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";

export default function ThreeGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // Dimensions
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 210;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Create particles
    const particleCount = 180;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const radius = 90;
    for (let i = 0; i < particleCount; i++) {
      // Uniform distribution on sphere
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Color: tactical neon green (#39FF14)
      colors[i * 3] = 0.22;
      colors[i * 3 + 1] = 1.0;
      colors[i * 3 + 2] = 0.08;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Custom circular particle texture (using Canvas)
    const createCircleTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 16;
      canvas.height = 16;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.beginPath();
        ctx.arc(8, 8, 4, 0, 2 * Math.PI);
        ctx.fillStyle = "#39ff14";
        ctx.shadowColor = "#39ff14";
        ctx.shadowBlur = 4;
        ctx.fill();
      }
      return new THREE.CanvasTexture(canvas);
    };

    const material = new THREE.PointsMaterial({
      size: 4,
      vertexColors: true,
      map: createCircleTexture(),
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Create lines connecting nearby particles (Plexus/Constellation effect)
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x39ff14,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
    });

    let lineSegments: THREE.LineSegments | null = null;

    const updateConnections = () => {
      if (lineSegments) {
        scene.remove(lineSegments);
      }

      const linePositions: number[] = [];
      const posAttr = geometry.getAttribute("position");
      
      for (let i = 0; i < particleCount; i++) {
        const x1 = posAttr.getX(i);
        const y1 = posAttr.getY(i);
        const z1 = posAttr.getZ(i);

        for (let j = i + 1; j < particleCount; j++) {
          const x2 = posAttr.getX(j);
          const y2 = posAttr.getY(j);
          const z2 = posAttr.getZ(j);

          const dx = x1 - x2;
          const dy = y1 - y2;
          const dz = z1 - z2;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          // Connect if particles are close
          if (dist < 42) {
            linePositions.push(x1, y1, z1);
            linePositions.push(x2, y2, z2);
          }
        }
      }

      const lineGeometry = new THREE.BufferGeometry();
      lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
      lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
      scene.add(lineSegments);
    };

    updateConnections();

    // Mouse interaction variables
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - window.innerWidth / 2) * 0.05;
      mouseY = (event.clientY - window.innerHeight / 2) * 0.05;
    };

    window.addEventListener("mousemove", onMouseMove);

    // Scroll interaction variables
    let scrollYOffset = 0;
    const onScroll = () => {
      scrollYOffset = window.scrollY * 0.003;
    };
    window.addEventListener("scroll", onScroll);

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth mouse follow (interpolation)
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Base rotation + scroll influence + mouse influence
      particles.rotation.y = Date.now() * 0.00015 + scrollYOffset + targetX * 0.01;
      particles.rotation.x = scrollYOffset * 0.5 + targetY * 0.01;

      if (lineSegments) {
        lineSegments.rotation.y = particles.rotation.y;
        lineSegments.rotation.x = particles.rotation.x;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Outer grid boundary line overlay */}
      <div className="absolute inset-0 border border-white/5 pointer-events-none rounded-full scale-[0.82] border-dashed" />
      <div 
        ref={containerRef} 
        className="w-full h-full min-h-[350px] md:min-h-[480px] cursor-grab active:cursor-grabbing" 
      />
    </div>
  );
}
