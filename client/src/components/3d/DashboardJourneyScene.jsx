import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Node3D } from './Node3D';
import { CanvasContainer } from './CanvasContainer';

const DashboardContent = () => {
  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight position={[2, 3, 4]} intensity={1} />
      <Node3D position={[-1.8, 0, 0]} label="Saved Jobs" isSelected={false} />
      <Node3D position={[0, 0.4, 0]} label="Active App" isSelected={true} />
      <Node3D position={[1.8, 0, 0]} label="Passport" isSelected={false} />
      <OrbitControls enableZoom={false} />
    </>
  );
};

export const DashboardJourneyScene = () => {
  return (
    <CanvasContainer height="h-48 md:h-56">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <DashboardContent />
      </Canvas>
    </CanvasContainer>
  );
};
