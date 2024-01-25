import {useThree, extend, useFrame} from "@react-three/fiber";
import {useRef} from "react";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
import CustomObject from "./42CustomObject.jsx";

extend({OrbitControls});

export default function Experience() {
  const three = useThree();
  const cubeRef = useRef();
  const groupRef = useRef();
  const {camera, gl} = three;

  useFrame((state, delta) => {
    // cubeRef.current.rotation.y += delta;
    // 使用delta 避免了 不同刷新率下的旋转速度
    const angle = state.clock.elapsedTime;
    // console.log("state.clock.elapsedTime", state.clock.elapsedTime);
    // state.camera.position.x = Math.sin(angle) * 8;
    // state.camera.position.z = Math.cos(angle) * 8;
    // state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <orbitControls args={[camera, gl.domElement]} />

      <directionalLight position={[1, 2, 3]} intensity={1.5} />

      <ambientLight intensity={0.5} />

      <group ref={groupRef}>
        <mesh position-x={-2}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>

        <mesh ref={cubeRef} rotation-y={Math.PI * 0.25} position-x={2} scale={1.5}>
          <boxGeometry />
          <meshStandardMaterial color="mediumpurple" />
        </mesh>

        <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
          <planeGeometry />
          <meshStandardMaterial color="greenYellow" />
        </mesh>

        <CustomObject />
      </group>
    </>
  );
}
