import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';

export const Node3D = ({ position, label, isSelected, onClick }) => {
  const meshRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
      if (isSelected || hovered) {
        meshRef.current.rotation.x += delta * 0.3;
      }
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <octahedronGeometry args={[isSelected ? 0.9 : 0.7, 0]} />
        <meshStandardMaterial
          color={isSelected ? '#818cf8' : hovered ? '#22d3ee' : '#475569'}
          emissive={isSelected ? '#4f46e5' : '#1e293b'}
          emissiveIntensity={isSelected ? 0.8 : 0.2}
          wireframe={!isSelected}
        />
      </mesh>

      <Html position={[0, -1.3, 0]} center>
        <button
          onClick={onClick}
          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all select-none whitespace-nowrap shadow-lg ${
            isSelected
              ? 'bg-brand-600 text-white ring-2 ring-brand-400'
              : 'bg-darkCard/90 text-slate-300 border border-slate-700 hover:text-white'
          }`}
        >
          {label}
        </button>
      </Html>
    </group>
  );
};
