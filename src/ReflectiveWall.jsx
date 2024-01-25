import * as THREE from "three";
import {useLayoutEffect, useRef, useEffect} from "react";
import {applyProps, Canvas} from "@react-three/fiber";
import {useGLTF, useBoxProjectedEnv, CubeCamera, Environment, OrbitControls, BakeShadows} from "@react-three/drei";
import {useControls} from "leva";

export default function App() {
  const boxRef = useRef(null);
  const spotLightRef1 = useRef(null);
  useEffect(() => {
    console.log("boxRef", boxRef);
    console.log("spotLightRef1: ", spotLightRef1);
    console.log("spotLightRef1.current: ", spotLightRef1.current);
    // console.log("spotLightRef1.current.target.position: ", spotLightRef1.current.target.position);
  });

  const {x, y, z} = useControls({
    x: {value: 0, min: -10, max: 10},
    y: {value: 0, min: -10, max: 100},
    z: {value: 0, min: -10, max: 10},
  });
  useEffect(() => {
    console.log("xyz", x, y, z);
  });
  return (
    <Canvas frameloop="demand" dpr={[1, 1.5]} shadows camera={{near: 0.1, far: 40, fov: 75}}>
      <fog attach="fog" args={["purple", 0, 130]} />
      <ambientLight intensity={0.6} />
      {/* <ambientLight intensity={0.1} />
      <ambientLight intensity={0.1} /> */}
      {/* <ambientLight intensity={6} /> */}
      {/* <pointLight intensity={10} position={[-200, 220, -100]} /> */}
      {/* <pointLight intensity={1000} position={[x, y, z]} shadow-mapSize={[2048, 2048]} shadow-bias={-0.0001} /> */}
      {/* <directionalLight intensity={3} position={[x, y, z]} shadow-mapSize={[2048, 2048]} shadow-bias={-0.0001} /> */}
      {/* <spotLight
        castShadow
        intensity={100}
        angle={0.5}
        position={[x, y, z]}
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.001}
      >
        <mesh attach="target" ref={boxRef} position={[0, 2, 0]}>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial />
        </mesh>
      </spotLight> */}

      <group position={[0, -1, 0]}>
        {/* <spotLight
          castShadow
          intensity={1000}
          angle={1}
          position={[-20, 22, -10]}
          shadow-mapSize={[2048, 2048]}
          shadow-bias={-0.000001}
        ></spotLight> */}
        {/* <spotLight
          angle={0.1}
          position={[-250, 120, -200]}
          intensity={1}
          castShadow
          shadow-mapSize={[50, 50]}
          shadow-bias={-0.000001}
          // ref={spotLightRef1}
        >
          <mesh attach="target" position={[0, 0, 0]}>
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial />
          </mesh>
        </spotLight> */}
        {/* 错误写法 */}
        {/* <spotLightHelper
          args={[
            <spotLight
              angle={0.1}
              position={[250, 120, 200]}
              intensity={1}
              castShadow
              shadow-mapSize={[50, 50]}
              shadow-bias={-0.000001}
            />,
          ]}
        ></spotLightHelper> */}
        {/* 错误写法 */}
        <Court />
        <Floor />
      </group>
      {/* <OrbitControls minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} /> */}
      <OrbitControls />
      <Environment files="/hdr/noon_grass_1k.hdr" background />
      <BakeShadows />
    </Canvas>
  );
}

function Court(props) {
  const {scene} = useGLTF("/model/court.glb");
  useLayoutEffect(() => {
    scene.traverse((o) => {
      if (o.isMesh) {
        applyProps(o, {castShadow: true, receiveShadow: true, "material-envMapIntensity": 0.1});
      }
    });
    const floor = scene.getObjectByName("GymFloor_ParquetShader_0");
    if (floor) floor.parent.remove(floor);
  }, [scene]);
  return <primitive object={scene} {...props} />;
}

function Floor(props) {
  const {nodes, materials} = useGLTF("/model/court.glb");
  const {up, scale, ...config} = useControls({
    up: {value: -0.5, min: -10, max: 10},
    scale: {value: 27, min: 0, max: 50},
    roughness: {value: 0.06, min: 0, max: 0.15, step: 0.001},
    envMapIntensity: {value: 1, min: 0, max: 5},
  });
  const projection = useBoxProjectedEnv([0, up, 0], [scale, scale, scale]);
  return (
    <CubeCamera frames={1} position={[0, 0.5, 0]} rotation={[0, 0, 0]} resolution={2048} near={1} far={1000} {...props}>
      {(texture) => {
        // console.log("texture", texture);
        return (
          <mesh
            receiveShadow
            position={[-13.68, -0.467, 17.52]}
            scale={0.02}
            geometry={nodes.GymFloor_ParquetShader_0.geometry}
            dispose={null}
          >
            <meshStandardMaterial
              map={materials.ParquetShader.map}
              normalMap={materials.ParquetShader.normalMap}
              normalMap-encoding={THREE.LinearEncoding}
              // normalMap-encoding={THREE.sRGBEncoding}
              envMap={texture}
              metalness={0.0}
              normalScale={[0.25, -0.25]}
              color="#aaa"
              {...projection}
              {...config}
            />
          </mesh>
        );
      }}
    </CubeCamera>
  );
}
