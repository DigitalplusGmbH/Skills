'use client';

import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import type * as THREE from 'three';

function CoreMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    function onMove(e: PointerEvent) {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    }
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  useFrame((_, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    mesh.rotation.y += delta * 0.15;
    mesh.rotation.x += delta * 0.04;
    mesh.rotation.z += delta * 0.01;
    mesh.rotation.x += (pointer.current.y * 0.2 - mesh.rotation.x) * 0.02;
    mesh.rotation.y += (pointer.current.x * 0.2) * 0.01;
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1.15, 0.36, 220, 32]} />
      {/* No environment map: an opaque material either disappears (light base
          on a light page) or renders as a flat dark mass (unlit regions have
          nothing to reflect). Transmission sidesteps both — it samples
          whatever is actually behind it, so the shape stays tonally close to
          the page while iridescence and clearcoat still pop as colour. */}
      <meshPhysicalMaterial
        color="#ffffff"
        transmission={0.94}
        thickness={1.4}
        roughness={0.1}
        iridescence={1}
        iridescenceIOR={1.3}
        clearcoat={1}
      />
    </mesh>
  );
}

function AmbientParticles({ count = 140 }: { count?: number }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const r = 3.2 + Math.random() * 2.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#5b3fd6" transparent opacity={0.6} />
    </points>
  );
}

export default function DigitalCore() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={0.9} />
      <directionalLight position={[2, 4, 5]} intensity={0.8} />
      <pointLight position={[3, 3, 3]} intensity={6} color="#00a8ff" />
      <pointLight position={[-3, -2, 3]} intensity={6} color="#ff2bd6" />
      <pointLight position={[0, 3, -3]} intensity={4} color="#7c3aed" />
      <CoreMesh />
      <AmbientParticles />
    </Canvas>
  );
}
