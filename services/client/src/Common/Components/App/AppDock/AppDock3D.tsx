/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame } from '@react-three/fiber';
import React from 'react';
import * as THREE from 'three';

import { AppDock } from './AppDock';

const FloatingParticles: React.FC = () => {
  const pointsRef = React.useRef<THREE.Points>(null);

  const particles = React.useMemo(() => {
    const positions = new Float32Array(3000);
    for (let i = 0; i < 1000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = Math.random() * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, []);

  useFrame(() => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position
        .array as Float32Array;
      for (let i = 0; i < 1000; i++) {
        positions[i * 3 + 1] += 0.02;
        if (positions[i * 3 + 1] > 10) {
          positions[i * 3 + 1] = 0;
        }
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={particles}
          count={particles.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.3}
        color="#00bbff"
        transparent
        opacity={1}
        sizeAttenuation
      />
    </points>
  );
};

export const AppDock3D: React.FC = () => {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', margin: '30px' }}>
      <Canvas
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}
        camera={{ position: [0, 0, 15], fov: 75 }}
      >
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} />
        <FloatingParticles />
      </Canvas>
      <div style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }} />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          zIndex: 1,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <AppDock />
      </div>
    </div>
  );
};
