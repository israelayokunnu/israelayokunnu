'use client';
import { Canvas } from '@react-three/fiber';
import {
  Preload,
  Lightformer,
  Environment,
  ContactShadows,
} from '@react-three/drei';
import { Physics, CuboidCollider } from '@react-three/rapier';
import Letter from './Letter';

const PortalShapeCanvas = () => {
  return (
    <Canvas
      dpr={[1.5, 2]}
      camera={{ position: [-20, 30, 150], fov: 9, near: 0.5, far: 300 }}
    >
      <Physics gravity={[0, -60, 0]}>
        <Letter
          char='I'
          position={[-10, 50, -1]}
          rotation={[0, 0, 0]}
          stencilBuffer={false}
        />
        <Letter
          char='A'
          position={[5, 50, -3]}
          rotation={[1, 0, 0]}
          stencilBuffer
        />

        {/** Invisible walls */}
        <CuboidCollider position={[0, -6, 0]} args={[100, 1, 100]} />
        <CuboidCollider position={[0, 0, -30]} args={[30, 100, 1]} />
        <CuboidCollider position={[0, 0, 10]} args={[30, 100, 1]} />
        <CuboidCollider position={[-30, 0, 0]} args={[1, 100, 30]} />
        <CuboidCollider position={[30, 0, 0]} args={[1, 100, 30]} />
      </Physics>
      {/** Environment (for reflections) */}
      <Environment
        files='https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/dancing_hall_1k.hdr'
        resolution={1024}
      >
        {/** On top of the HDRI we add some rectangular and circular shapes for nicer reflections */}
        <group rotation={[-Math.PI / 3, 0, 0]}>
          <Lightformer
            intensity={4}
            rotation-x={Math.PI / 2}
            position={[0, 5, -9]}
            scale={[10, 10, 1]}
          />
          {[2, 0, 2, 0, 2, 0, 2, 0].map((x, i) => (
            <Lightformer
              key={i}
              form='circle'
              intensity={4}
              rotation={[Math.PI / 2, 0, 0]}
              position={[x, 4, i * 4]}
              scale={[4, 1, 1]}
            />
          ))}
          <Lightformer
            intensity={2}
            rotation-y={Math.PI / 2}
            position={[-5, 1, -1]}
            scale={[50, 2, 1]}
          />
          <Lightformer
            intensity={2}
            rotation-y={-Math.PI / 2}
            position={[10, 1, 0]}
            scale={[50, 2, 1]}
          />
        </group>
      </Environment>
      {/** Contact shadows for naive soft shadows */}
      <ContactShadows
        smooth={false}
        scale={100}
        position={[0, -5.05, 0]}
        blur={0.5}
        opacity={0.75}
      />
      <Preload all />
    </Canvas>
  );
};

export default PortalShapeCanvas;
