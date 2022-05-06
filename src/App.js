import React from 'react';
import { Suspense } from "react";
import "./styles/style.css";
import { Ground } from "./Ground";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';

function CarShow() {
  return (
    <>
      { /*adding the orbit controls to move around*/ }
      <OrbitControls target={ [0,0.35,0] } maxPolarAngle={1.45} />

      { /*adding the camera*/ }
      <PerspectiveCamera makeDefault fov={50} position={[3,2,5]} />

      { /*adding a black background*/ }
      <color args={[0, 0, 0]} attach="background" />

      { /*adding a pink spotlight*/ }
      <spotLight
        color={[1, 0.25, 0.7]}
        intensity={1.5}
        angle={0.6}
        penumbra={0.5}
        position={[5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />

      { /*adding a blue spotlight*/ }
      <spotLight
        color={[0.14, 0.5, 1]}
        intensity={2}
        angle={0.6}
        penumbra={0.5}
        position={[-5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />

      { /*adding the ground*/ }
      <Ground />
    </>
  )
}

function App() {
  return (
    <Suspense fallback={null}>
      <Canvas shadows>
        <CarShow />
      </Canvas>
    </Suspense>
  );
}

export default App;
