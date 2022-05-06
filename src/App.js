import React from 'react';
import { Suspense } from 'react';
import './styles/style.css';
import { Canvas } from '@react-three/fiber';
import { CubeCamera, Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Bloom, ChromaticAberration, EffectComposer } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { Ground } from './Ground';
import { Car } from './Car';
import { Rings } from './Rings';
import { Boxes } from './Boxes'
import { FloatingGrid } from './FloatingGrid';

function CarShow() {
  return (
    <>
      { /*adding the orbit controls to move around*/ }
      <OrbitControls target={ [0,0.35,0] } maxPolarAngle={1.45} />

      { /*adding the camera*/ }
      <PerspectiveCamera makeDefault fov={50} position={[3,2,5]} />

      { /*adding a black background*/ }
      <color args={[0, 0, 0]} attach="background" />

      { /*adding cube camera*/ }
      <CubeCamera resolution={256} frames={Infinity}>
        {(texture) => (
          <>
            <Environment map={texture} />

            { /*adding the car and excluding it from cube camera*/ }
            <Car />
          </>
        )}
      </CubeCamera>

      { /*adding the rings*/ }
      <Rings />
      
      { /*adding the boxes*/ }
      <Boxes />

      { /*adding grid*/ }
      <FloatingGrid />

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

      { /*adding post processing effects*/ }
      <EffectComposer>
        <Bloom
          blendFunction={BlendFunction.ADD}
          intensity={1.3} // The bloom intensity.
          width={300} // render width
          height={300} // render height
          kernelSize={5} // blur kernel size
          luminanceThreshold={0.15} // luminance threshold. Raise this value to mask out darker elements in the scene.
          luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL} // blend mode
          offset={[0.0005, 0.0012]} // color offset
        />
      </EffectComposer>
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
