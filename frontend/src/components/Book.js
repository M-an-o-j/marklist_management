import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import * as THREE from 'three';
import { TextureLoader } from 'three/src/loaders/TextureLoader';

export const Book = () => {
    const bookRef = useRef();

  // State for rotation animation
  const [rotation, setRotation] = useState(0);

  // Animation function
  useFrame(() => {
    setRotation(rotation + 0.01);
    bookRef.current.rotation.x = rotation;
    bookRef.current.rotation.y = rotation;
  });

  return (
    <mesh ref={bookRef} scale={[3,3,2]}>
      {/* Cover */}
      <meshBasicMaterial attach="material" color={0x3366ff} />
      <boxGeometry args={[1, 1.5, 0.2]} />

      {/* Pages */}
      <mesh position={[0, 0, 0.1]}>
        <meshBasicMaterial attach="material" color={0xffcc00} />
        <boxGeometry args={[1, 1.5, 0.2]} />
      </mesh>
    </mesh>
    );
  };