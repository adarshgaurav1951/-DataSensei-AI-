import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Cpu, Radio, Sparkles, Volume2 } from 'lucide-react';

export default function Network3DCanvas({ isSpeaking = false, isListening = false, onTriggerVoice }) {
  const mountRef = useRef(null);
  const [activeNodesCount, setActiveNodesCount] = useState(148);
  const [fps, setFps] = useState(60);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth || 460;
    const height = currentMount.clientHeight || 460;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 210;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // Group for all core elements
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 1. Fibonacci Sphere of Neural Nodes
    const sphereRadius = 70;
    const nodeCount = 140;
    const positions = new Float32Array(nodeCount * 3);
    const basePositions = new Float32Array(nodeCount * 3);
    const colors = new Float32Array(nodeCount * 3);

    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden ratio

    const colorCyan = new THREE.Color(0x00f0ff);
    const colorViolet = new THREE.Color(0x9d4edd);
    const colorEmerald = new THREE.Color(0x00f5a0);

    for (let i = 0; i < nodeCount; i++) {
      const y = 1 - (i / (nodeCount - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      const jitter = 1 + (Math.random() - 0.5) * 0.06;
      const px = x * sphereRadius * jitter;
      const py = y * sphereRadius * jitter;
      const pz = z * sphereRadius * jitter;

      positions[i * 3] = px;
      positions[i * 3 + 1] = py;
      positions[i * 3 + 2] = pz;

      basePositions[i * 3] = px;
      basePositions[i * 3 + 1] = py;
      basePositions[i * 3 + 2] = pz;

      // Color gradient across nodes
      const mixedColor = colorCyan.clone().lerp(i % 3 === 0 ? colorEmerald : colorViolet, (y + 1) / 2);
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const pMaterial = new THREE.PointsMaterial({
      size: 4.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending
    });
    const pointsMesh = new THREE.Points(geometry, pMaterial);
    coreGroup.add(pointsMesh);

    // 2. Synaptic Lattice Lines
    const linePositions = [];
    const connectionPairs = [];

    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < 34) {
          linePositions.push(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
          linePositions.push(positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]);
          connectionPairs.push({ i, j, dist });
        }
      }
    }

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const linesMaterial = new THREE.LineBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending
    });
    const linesMesh = new THREE.LineSegments(lineGeo, linesMaterial);
    coreGroup.add(linesMesh);

    // 3. Gyroscopic Orbital Holographic Rings
    const createRing = (radius, tiltX, tiltY, colorHex) => {
      const ringGeo = new THREE.BufferGeometry();
      const segments = 90;
      const ringPos = new Float32Array(segments * 3);
      for (let s = 0; s < segments; s++) {
        const angle = (s / segments) * Math.PI * 2;
        ringPos[s * 3] = Math.cos(angle) * radius;
        ringPos[s * 3 + 1] = Math.sin(angle) * radius;
        ringPos[s * 3 + 2] = 0;
      }
      ringGeo.setAttribute('position', new THREE.BufferAttribute(ringPos, 3));
      const ringMat = new THREE.LineBasicMaterial({
        color: colorHex,
        transparent: true,
        opacity: 0.45,
        blending: THREE.AdditiveBlending
      });
      const ring = new THREE.LineLoop(ringGeo, ringMat);
      ring.rotation.x = tiltX;
      ring.rotation.y = tiltY;
      return ring;
    };

    const ring1 = createRing(88, Math.PI / 3, 0, 0x00f0ff);
    const ring2 = createRing(98, -Math.PI / 4, Math.PI / 6, 0x9d4edd);
    const ring3 = createRing(108, Math.PI / 6, -Math.PI / 3, 0x00f5a0);
    coreGroup.add(ring1);
    coreGroup.add(ring2);
    coreGroup.add(ring3);

    // 4. Data Packet Traveling Pulses along Synapses
    const packetCount = 14;
    const packetGeo = new THREE.BufferGeometry();
    const packetPositions = new Float32Array(packetCount * 3);
    const packetProgress = new Float32Array(packetCount).fill(0);
    const packetEdges = [];

    for (let p = 0; p < packetCount; p++) {
      const edge = connectionPairs[Math.floor(Math.random() * connectionPairs.length)];
      packetEdges.push(edge);
      packetProgress[p] = Math.random();
    }

    packetGeo.setAttribute('position', new THREE.BufferAttribute(packetPositions, 3));
    const packetMaterial = new THREE.PointsMaterial({
      size: 5.5,
      color: 0xffffff,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending
    });
    const packetPoints = new THREE.Points(packetGeo, packetMaterial);
    coreGroup.add(packetPoints);

    // Mouse Interaction
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;

    const handleMouseMove = (e) => {
      const rect = currentMount.getBoundingClientRect();
      const mouseX = (e.clientX - rect.left - width / 2) / (width / 2);
      const mouseY = (e.clientY - rect.top - height / 2) / (height / 2);
      targetRotationY = mouseX * 0.6;
      targetRotationX = -mouseY * 0.6;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let frameId;
    const startTime = performance.now();
    let lastTime = performance.now();
    let frames = 0;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const elapsedTime = (performance.now() - startTime) / 1000;

      // FPS calculation
      frames++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        setFps(frames);
        frames = 0;
        lastTime = now;
      }

      // Smooth inertia rotation
      currentRotationX += (targetRotationX - currentRotationX) * 0.05;
      currentRotationY += (targetRotationY - currentRotationY) * 0.05;

      const baseSpeed = isSpeaking ? 0.016 : isListening ? 0.022 : 0.005;
      coreGroup.rotation.y += baseSpeed + currentRotationY * 0.02;
      coreGroup.rotation.x += baseSpeed * 0.4 + currentRotationX * 0.02;

      // Rotate orbital rings at distinct speeds
      ring1.rotation.z += 0.008;
      ring2.rotation.z -= 0.011;
      ring3.rotation.z += 0.006;

      // Audio reactive wave pulse on nodes
      const posAttr = pointsMesh.geometry.attributes.position;
      const posArr = posAttr.array;
      const pulseAmp = isSpeaking ? 8.0 : isListening ? 12.0 : 2.5;

      for (let i = 0; i < nodeCount; i++) {
        const bx = basePositions[i * 3];
        const by = basePositions[i * 3 + 1];
        const bz = basePositions[i * 3 + 2];

        const wave = Math.sin(elapsedTime * 4.0 + bx * 0.1) * Math.cos(elapsedTime * 3.0 + by * 0.1);
        const factor = 1 + (wave * pulseAmp) / sphereRadius;

        posArr[i * 3] = bx * factor;
        posArr[i * 3 + 1] = by * factor;
        posArr[i * 3 + 2] = bz * factor;
      }
      posAttr.needsUpdate = true;

      // Update traveling data packets
      const packPos = packetPoints.geometry.attributes.position.array;
      for (let p = 0; p < packetCount; p++) {
        const edge = packetEdges[p];
        if (!edge) continue;

        packetProgress[p] += isSpeaking ? 0.04 : 0.018;
        if (packetProgress[p] >= 1.0) {
          packetProgress[p] = 0;
          packetEdges[p] = connectionPairs[Math.floor(Math.random() * connectionPairs.length)];
        }

        const i1 = edge.i;
        const i2 = edge.j;
        const t = packetProgress[p];

        packPos[p * 3] = posArr[i1 * 3] * (1 - t) + posArr[i2 * 3] * t;
        packPos[p * 3 + 1] = posArr[i1 * 3 + 1] * (1 - t) + posArr[i2 * 3 + 1] * t;
        packPos[p * 3 + 2] = posArr[i1 * 3 + 2] * (1 - t) + posArr[i2 * 3 + 2] * t;
      }
      packetPoints.geometry.attributes.position.needsUpdate = true;

      // Dynamic glow opacity shift when speaking
      if (isSpeaking) {
        linesMaterial.opacity = 0.45 + Math.sin(elapsedTime * 8) * 0.15;
        pMaterial.size = 5.6 + Math.sin(elapsedTime * 6) * 1.2;
      } else if (isListening) {
        linesMaterial.opacity = 0.6 + Math.sin(elapsedTime * 12) * 0.2;
        pMaterial.size = 6.2;
      } else {
        linesMaterial.opacity = 0.28;
        pMaterial.size = 4.8;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!currentMount) return;
      const newWidth = currentMount.clientWidth || 460;
      const newHeight = currentMount.clientHeight || 460;
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
      ring1.geometry.dispose();
      ring2.geometry.dispose();
      ring3.geometry.dispose();
      packetGeo.dispose();
      pMaterial.dispose();
      linesMaterial.dispose();
      packetMaterial.dispose();
      renderer.dispose();
    };
  }, [isSpeaking, isListening]);

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '480px', height: '440px', margin: '0 auto' }}>
      {/* 3D WebGL Canvas */}
      <div
        ref={mountRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'grab'
        }}
      />

      {/* Floating Holographic Telemetry Badge */}
      <div style={{
        position: 'absolute',
        top: '12px',
        left: '12px',
        background: 'rgba(8, 12, 22, 0.75)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(0, 240, 255, 0.2)',
        borderRadius: '10px',
        padding: '6px 12px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '0.75rem',
        color: '#94A3B8',
        fontFamily: 'var(--font-mono)'
      }}>
        <span className="status-dot-active" />
        <span>NEURAL CORE 3.8</span>
        <span style={{ color: 'var(--neon-cyan)' }}>{fps} FPS</span>
      </div>

      {/* Audio Reactive State Pill */}
      {(isSpeaking || isListening) && (
        <div style={{
          position: 'absolute',
          bottom: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: isListening ? 'rgba(0, 245, 160, 0.15)' : 'rgba(0, 240, 255, 0.15)',
          backdropFilter: 'blur(12px)',
          border: `1px solid ${isListening ? 'var(--neon-emerald)' : 'var(--neon-cyan)'}`,
          borderRadius: '999px',
          padding: '6px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '0.8rem',
          color: '#FFFFFF',
          fontWeight: 600,
          boxShadow: isListening ? 'var(--shadow-emerald)' : 'var(--shadow-neon)'
        }}>
          {isListening ? (
            <>
              <Radio size={14} className="agent-aura-pulse" style={{ color: 'var(--neon-emerald)' }} />
              <span>Listening to your voice...</span>
            </>
          ) : (
            <>
              <Volume2 size={14} style={{ color: 'var(--neon-cyan)' }} />
              <span>Agent voice active (Audio Synced)</span>
            </>
          )}
        </div>
      )}

      {/* Quick Launch Voice Agent Button */}
      <button
        onClick={onTriggerVoice}
        style={{
          position: 'absolute',
          bottom: '12px',
          right: '12px',
          background: 'rgba(15, 20, 35, 0.85)',
          border: '1px solid rgba(0, 240, 255, 0.3)',
          color: 'var(--neon-cyan)',
          borderRadius: '8px',
          padding: '6px 10px',
          fontSize: '0.74rem',
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          cursor: 'pointer',
          fontFamily: 'var(--font-mono)'
        }}
      >
        <Sparkles size={12} />
        <span>Sync Voice</span>
      </button>
    </div>
  );
}
