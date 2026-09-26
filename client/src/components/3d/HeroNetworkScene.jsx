import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Line } from '@react-three/drei';
import { Node3D } from './Node3D';
import { CanvasContainer } from './CanvasContainer';

const SceneContent = ({ activeNode, onNodeSelect }) => {
  const nodes = [
    { id: 'discover', label: '1. Discover', pos: [-3.6, 0, 0] },
    { id: 'understand', label: '2. Understand', pos: [-1.2, 0.8, 0] },
    { id: 'check', label: '3. BarrierLens', pos: [1.2, -0.4, 0] },
    { id: 'apply', label: '4. Adaptive Apply', pos: [3.6, 0.4, 0] },
  ];

  const points = nodes.map((n) => n.pos);

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />

      <Line points={points} color="#6366f1" lineWidth={2} opacity={0.6} transparent />

      {nodes.map((n) => (
        <Node3D
          key={n.id}
          position={n.pos}
          label={n.label}
          isSelected={activeNode === n.id}
          onClick={() => onNodeSelect && onNodeSelect(n.id)}
        />
      ))}

      <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 3} />
    </>
  );
};

export const HeroNetworkScene = ({ activeNode = 'discover', onNodeSelect }) => {
  return (
    <CanvasContainer height="h-72 md:h-96" activeNode={activeNode} onNodeSelect={onNodeSelect}>
      <Canvas camera={{ position: [0, 0, 7], fov: 50 }}>
        <SceneContent activeNode={activeNode} onNodeSelect={onNodeSelect} />
      </Canvas>
    </CanvasContainer>
  );
};
