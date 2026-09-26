import React, { Suspense } from 'react';
import { use3DSupport } from '../../hooks/use3DSupport';
import { Fallback2DJourney } from './Fallback2DJourney';

export const CanvasContainer = ({
  children,
  fallback,
  height = 'h-64 md:h-80',
  activeNode,
  onNodeSelect,
}) => {
  const { is3DSupported } = use3DSupport();

  if (!is3DSupported) {
    return fallback || <Fallback2DJourney activeNode={activeNode} onNodeSelect={onNodeSelect} />;
  }

  return (
    <div className={`relative w-full ${height} rounded-3xl overflow-hidden bg-slate-950/80 border border-slate-800 shadow-2xl`}>
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center bg-slate-950 text-slate-400 text-xs font-medium">
            Loading Spatial 3D Scene...
          </div>
        }
      >
        {children}
      </Suspense>
    </div>
  );
};
