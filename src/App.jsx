// import {createRoot} from "react-dom/client";
import React, {useRef, useState} from "react";
import {Canvas, useFrame, useThree} from "@react-three/fiber";
import Model from "./Model";

function Box(props) {
  // This reference will give us direct access to the mesh
  const meshRef = useRef();
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const state = useThree();
  console.log("state: ", state);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  // useFrame((state, delta) => (meshRef.current.rotation.x += delta));
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh {...props} ref={meshRef} scale={active ? 1.5 : 1} onClick={(event) => setActive(!active)} onPointerOver={(event) => setHover(true)} onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "rgba(0, 255, 0, 0.1)" : "orange"} />
    </mesh>
  );
}

export default function AA() {
  return (
    <Canvas
      onCreated={(state) => {
        console.log("onCreated state", state);
      }}
    >
      <ambientLight intensity={Math.PI / 2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
      <Model />
    </Canvas>
  );
}

// 获取组件实例 ref
// useFrame
// 在父组件的props配置子主键的props 数据向下传递

// rotataion position 在mesh 上
