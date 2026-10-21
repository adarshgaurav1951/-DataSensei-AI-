import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Network3DCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth || 450;
    const height = currentMount.clientHeight || 450;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 210;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // Warm terracotta colors matching the user screenshot
    const sphereRadius = 72;
    const nodeCount = 95;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(nodeCount * 3);

    // Fibonacci sphere distribution for uniform elegant spherical mesh
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden ratio angle

    for (let i = 0; i < nodeCount; i++) {
      const y = 1 - (i / (nodeCount - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      // Small jitter for organic constellation feeling
      const jitter = 1 + (Math.random() - 0.5) * 0.08;

      positions[i * 3] = x * sphereRadius * jitter;
      positions[i * 3 + 1] = y * sphereRadius * jitter;
      positions[i * 3 + 2] = z * sphereRadius * jitter;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Terracotta Node Points
    const pMaterial = new THREE.PointsMaterial({
      color: 0xD9532F,
      size: 4.5,
      transparent: true,
      opacity: 0.95
    });
    const pointsMesh = new THREE.Points(geometry, pMaterial);
    scene.add(pointsMesh);

    // Connection lines between nearby spherical points
    const linesMaterial = new THREE.LineBasicMaterial({
      color: 0xE8795A,
      transparent: true,
      opacity: 0.35,
      linewidth: 1
    });

    const linePositions = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        // Connect if close enough to form spherical lattice
        if (dist < 38) {
          linePositions.push(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
          linePositions.push(positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]);
        }
      }
    }

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const linesMesh = new THREE.LineSegments(lineGeo, linesMaterial);
    scene.add(linesMesh);

    // Mouse gentle interaction
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e) => {
      const rect = currentMount.getBoundingClientRect();
      mouseX = (e.clientX - rect.left - width / 2) * 0.001;
      mouseY = (e.clientY - rect.top - height / 2) * 0.001;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let frameId;
    const animate = () => {
      frameId = requestAnimationFrame(animate);

      pointsMesh.rotation.y += 0.003 + mouseX * 0.05;
      pointsMesh.rotation.x += 0.0015 + mouseY * 0.05;

      linesMesh.rotation.y = pointsMesh.rotation.y;
      linesMesh.rotation.x = pointsMesh.rotation.x;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!currentMount) return;
      const newWidth = currentMount.clientWidth || 450;
      const newHeight = currentMount.clientHeight || 450;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      geometry.dispose();
      lineGeo.dispose();
      pMaterial.dispose();
      linesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: '100%',
        maxWidth: '460px',
        height: '420px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto'
      }}
    />
  );
}
