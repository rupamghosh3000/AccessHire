import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Line } from '@react-three/drei';
import { Node3D } from './Node3D';
import { CanvasContainer } from './CanvasContainer';

const BarrierPathContent = ({ currentStep = 1, onStepSelect }) => {
  const steps = [
    { id: 1, label: 'Job', pos: [-3, 0, 0] },
    { id: 2, label: 'Preview', pos: [-1.5, 0.5, 0] },
    { id: 3, label: 'Form', pos: [0, -0.2, 0] },
    { id: 4, label: 'Review', pos: [1.5, 0.6, 0] },
    { id: 5, label: 'Submit', pos: [3, 0, 0] },
  ];

  const points = steps.map((s) => s.pos);

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[3, 4, 5]} intensity={1} />
      <Line points={points} color="#06b6d4" lineWidth={2.5} />

      {steps.map((s) => (
        <Node3D
          key={s.id}
          position={s.pos}
          label={s.label}
          isSelected={currentStep === s.id}
          onClick={() => onStepSelect && onStepSelect(s.id)}
        />
      ))}
      <OrbitControls enableZoom={false} />
    </>
  );
};

export const JourneyPathScene = ({ currentStep = 1, onStepSelect }) => {
  return (
    <CanvasContainer height="h-64 md:h-80" activeNode={currentStep} onNodeSelect={onStepSelect}>
      <Canvas camera={{ position: [0, 0, 6.5], fov: 50 }}>
        <BarrierPathContent currentStep={currentStep} onStepSelect={onStepSelect} />
      </Canvas>
    </CanvasContainer>
  );
};
