'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import {
  Text3D,
  Center,
  Preload,
  RenderTexture,
  MeshTransmissionMaterial,
} from '@react-three/drei';
import { RigidBody, RigidBodyProps } from '@react-three/rapier';

type Props = Partial<RigidBodyProps> & {
  char: string;
  stencilBuffer: boolean;
};

const Letter = ({ char, stencilBuffer = false, children, ...props }: Props) => {
  const main = useRef<any>();
  const contents = useRef<any>();
  const events = useThree((state) => state.events);
  const controls = useThree<any>((state) => state.controls);

  useFrame(() => {
    if (contents.current?.matrix) {
      contents.current.matrix.copy(main.current?.matrixWorld);
    }
  });
  return (
    <RigidBody restitution={0.1} colliders='cuboid' {...(props as any)}>
      <Center ref={main}>
        <Text3D
          bevelEnabled
          onDoubleClick={(e) => (
            e.stopPropagation(), controls.fitToBox(main.current, true)
          )}
          font='/fonts/bold.blob'
          smooth={1}
          scale={0.125}
          size={80}
          height={4}
          curveSegments={10}
          bevelThickness={10}
          bevelSize={2}
          bevelOffset={0}
          bevelSegments={5}
        >
          {char}
          <MeshTransmissionMaterial
            clearcoat={1}
            samples={3}
            thickness={40}
            chromaticAberration={0.25}
            anisotropy={0.4}
            distortionScale={0}
            temporalDistortion={0}
          >
            <RenderTexture
              attach='buffer'
              stencilBuffer={stencilBuffer}
              width={512}
              height={512}
              compute={events.compute as any}
            >
              <color attach='background' args={['#5CBFB0']} />
              <group ref={contents} matrixAutoUpdate={false}>
                {children}
              </group>
              <Preload all />
            </RenderTexture>
          </MeshTransmissionMaterial>
        </Text3D>
      </Center>
    </RigidBody>
  );
};

export default Letter;
